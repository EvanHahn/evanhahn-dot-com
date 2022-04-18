---
date: 2019-09-14
title: Gotchas with Express query parsing (and how to avoid them)
description: Express's default query parser has some edge cases that can cause unexpected behavior or errors. You can either handle these edge cases or change the default query string parser.
layout: post
url: /gotchas-with-express-query-parsing-and-how-to-avoid-them/
---

_This post assumes you're familiar with Express and the basics of query strings. It was last updated for Express 4.17.1._

_In short, Express's [default query string parser](https://www.npmjs.com/package/qs) has some edge cases that can cause unexpected behavior or errors. You can either handle these edge cases or change the default query string parser._

Everything has its quirks. Even the best of us have our idiosyncrasies and rough edges. Express, a well-designed framework, is no exception.

In this post, we'll look at quirks in Express's query parser. We'll also make some recommendations for how to avoid problems. Its behavior isn't _wrong_, but it's not obvious to everyone. It certainly wasn't obvious to me when _I_ first started with Express!

## First, the happy path

Express adds a property to every request, [`query`](https://expressjs.com/en/4x/api.html#req.query). Its value is a plain JavaScript object that represents the query string.

For example, consider this simple Express app:

    const app = express()

    // NOTE: This code has some problems, which we'll see soon.
    app.get('/', (req, res) => {
      const nameYelled = req.query.name.toUpperCase()
      res.send('Hello, ' + nameYelled)
    })

    app.listen(3000)

If you make an HTTP request and set the `name` query parameter to `Moogie`, this should respond with `Hello, MOOGIE`. For example:

    curl 'http://localhost:3000/?name=Moogie'
    # => Hello, MOOGIE

Of course, you could set `name` to something else, too:

    curl 'http://localhost:3000/?name=Rom'
    # => Hello, ROM

    curl 'http://localhost:3000/?name=Gaila'
    # => Hello, GAILA

If you don't set the `name` parameter at all, you'll get an error because `req.query.name` is `undefined`.

    curl 'http://localhost:3000/'
    # => TypeError: Cannot read property 'toUpperCase' of undefined
    #    ...

We're getting `Cannot read property 'toUpperCase' of undefined` because `req.query.name` isn't defined, so we can't call `toUpperCase` on it. I don't find this behavior is too surprising, but it's worth keeping in mind.

Let's update our code to handle the case where the `name` parameter is missing:

    // NOTE: This code also has some problems, which we'll see soon.
    app.get('/', (req, res) => {
      if (req.query.name) {
        const nameYelled = req.query.name.toUpperCase()
        res.send('Hello, ' + nameYelled)
      } else {
        res.status(400)
        res.send('No name provided!')
      }
    })

Good! Now we should be able to make requests with and without the parameter.

    curl 'http://localhost:3000/?name=Brunt'
    # => Hello, BRUNT

    curl 'http://localhost:3000/'
    # => No name provided!

Unfortunately, we can still crash this code. Let's see how.

## The surprise

What if we send the `name` parameter not once, but twice?

    curl 'http://localhost:3000/?name=Bing&name=Bong'
    # => TypeError: req.query.name.toUpperCase is not a function
    #    ...

A new error: `req.query.name.toUpperCase is not a function`. The same thing happens if we send the parameter three times, or four times, or twenty times. What's happening here?

Let's add a new route that just responds with the value of `req.query` as JSON. This will help us debug.

    // Set this Express option to format JSON nicely.
    // This is just for our debugging.
    app.set('json spaces', 2)

    app.get('/log-query', (req, res) => {
      res.json({
        query: req.query
      })
    })

Now let's try making a request to see what `req.query` is:

    curl 'http://localhost:3000/log-query?name=Bing&name=Bong'
    # => {
    #      "query": {
    #        "name": ["Bing", "Bong"]
    #      }
    #    }

Notice that `name` is no longer a string, but an _array_! That explains why our call to `toUpperCase` didn't work—`toUpperCase` is for strings, not arrays.

You can also set the value to a one-element array by appending `[]` to the end of the name of the query parameter (like `name[]`):

    curl 'http://localhost:3000/log-query?name[]=Moogie
    # => {
    #      "query": {
    #        "name": ["Moogie"]
    #      }
    #    }

That's not all—there are more weird cases to think about. For example, you can send nested objects:

    curl 'http://localhost:3000/log-query?a[b][c]=cool
    # => {
    #      "query": {
    #        "a": {
    #          "b": {
    #            "c": "cool"
    #          }
    #        }
    #      }
    #    }

This is certainly powerful, but it's a double-edged sword: it creates more code paths than you might expect. This can cause unexpected behavior if you don't anticipate every case, and you'll have to remember to do that _every time_ you read from `req.query`.

We've shown that crashes are possible, but you could also cause unintended behavior with things like this. For example, let's say you only want to greet the user if their name is 12 characters or fewer. You might write something like this:

    // NOTE: This has problems!
    app.get('/', (req, res) => {
      if (req.query.name && req.query.name.length <= 12) {
        res.send('Hello, ' + req.query.name)
      } else {
        res.status(400)
        res.send('Invalid name.')
      }
    })

If you pass strings, everything is fine:

    curl 'http://localhost:3000/?name=Benjamin'
    # => Hello, BENJAMIN

    curl 'http://localhost:3000/?name=MyVeryLongName'
    # => Invalid name.

But if you pass an array, you can trick the validation logic.

    curl 'http://localhost:3000/?name[]=MyVeryVeryVeryVeryLongName'
    # => Hello, MyVeryVeryVeryVeryLongName.

Why is all of this happening?

## What's happening here?

This behavior comes from Express's default query parser, which uses [the `qs` module](https://www.npmjs.com/package/qs) under the hood. If you read the documentation for that package, you'll see all of the above behavior reflected, and many more edge cases to think about.

(Note that type checkers like TypeScript and Flow don't help you here, even if you pull in their type definitions. As of this writing, [TypeScript's type definitions for Express](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/7172b31badc3df45f4386400606dbe24437e3d5a/types/express-serve-static-core/index.d.ts#L441) use the permissive `query: any`, though you can [extend the Express types](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/21044#issuecomment-353970472). [Flow's are incomplete and should debatably be marked `mixed`](https://github.com/flow-typed/flow-typed/blob/c4396be32b212ae20855ef66655c385d97bafc32/definitions/npm/express_v4.16.x/flow_v0.94.x-/express_v4.16.x.js#L30).)

So what do we do about all of these edge cases?

## How to avoid problems

The core of this issue, as with many programming issues, is that there are a lot of possible code paths, and we have to anticipate them all in order for our code to work correctly. Instead of the value of a query parameter being a string or `undefined`, it could be a lot of different things! You'll have to remember to check all of these, and if you forget, you risk unexpected behavior. Likely an error, but possibly an unintended side-effect.

We have several options to avoid these issues—I'll talk about four.

### Option 1: handle every edge case

If you need all the features that Express's default query parser provides, then you'll need to handle strings, and `undefined`, and objects (which could be nested), and arrays (which could contain objects or arrays or strings). That could turn out to be a lot of code, but if you need the power that `qs` provides, you should do this to avoid errors.

For example, the code from before could be adapted to look like this:

    app.get('/', (req, res) => {
      if (typeof req.query.name === 'string') {
        const nameYelled = req.query.name.toUpperCase()
        res.send('Hello, ' + nameYelled)
      } else {
        res.status(400)
        res.send('No name provided!')
      }
    })

Depending on your use case, you'll need to do different validation of the incoming parameters, possibly using a validation library.

But what if you don't need all of those bells and whistles?

### Option 2: disable query string parsing completely

Express has a few [app-level settings](https://expressjs.com/en/4x/api.html#app.settings.table). We already saw one earlier—`json spaces`. We can use the `query parser` option to configure—you guessed it—Express's query parser.

If you're lucky enough to not need to do _any query parsing at all_, you can just disable it. For example:

    app.set('query parser', false)

This will set `req.query` to an empty object (`{}`) every time. If you can get away with this, why wouldn't you?

But if you're reading this, you probably _do_ need to do some query parsing. So what can you do?

### Option 3: use Node's built-in, simpler query string parser

You might have some luck with the simple query parser, which is also configured with the `query parser` option:

    app.set('query parser', 'simple')

This uses [Node's built-in `querystring` module](https://nodejs.org/api/querystring.html) under the hood instead of the default `qs` module. `querystring` doesn't parse nested objects or one-element arrays, which avoids a whole bunch of code paths, but it can still return an array if a key is passed multiple times. For example:

    querystring.parse('name=Bing&name=Bong')
    // => { name: ['Bing', 'Bong'] }

Unlike Express's default parser, the `qs` module), suffixes don't mean anything. For example, `name[]=Brunt` parses as `['Brunt']` with `qs`, but it's nothing special with the built-in one:

    querystring.parse('name[]=Brunt')
    // => { 'name[]': 'Brunt' }

This is certainly simpler, but you'll still need to remember to check the type of `name` before using it—a value could be a string, or `undefined`, or an array.

Wouldn't it be nice if there were a way to deal with query parameters very explicitly? And wouldn't it be _extra_ nice if this tool was standard JavaScript and built right into Node?

### Option 4: use `URLSearchParams`

`URLSearchParams` is a [standard JavaScript object](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) available in Node and in modern browsers. It has a clear interface for handling query parameters which should help us avoid some of the gotchas. If you need to deal with arrays, you can, but if you just need to deal with one string at a time, you can do that too—it's all made explicit.

For example, here's how you'd use it without Express:

    // Note that this is standard JavaScript, so you can try it in your browser!
    const query = new URLSearchParams('name=Bing&name=Bong')

    query.has('name')
    // => true

    query.get('name')
    // => 'Bing'

    query.getAll('name')
    // => ['Bing', 'Bong']

While it's more verbose, I generally like `URLSearchParams` because it's explicit. When you call `getAll`, you'll always get an array of strings, no matter what. When you call `get`, you'll always get the first parameter as a string, or `null` if it's not there. No funny business with magically-created objects or arrays, and nothing to remember every time.

Express lets you define a custom function for parsing query strings. Instead of passing `false` or `'simple'` as we've done before, we can pass a function:

    app.set('query parser', (queryString) => {
      return new URLSearchParams(queryString)
    })

Now `req.query` will be an instance of `URLSearchParams`. We can now rewrite our route handler like this:

    app.get('/', (req, res) => {
      if (req.query.has('name')) {
        const nameYelled = req.query.get('name').toUpperCase()
        res.send('Hello, ' + nameYelled)
      } else {
        res.status(400)
        res.send('No name provided!')
      }
    })

Try passing in `name` multiple times, or as an object, or as an array—`URLSearchParams` won't buckle!

This isn't something that's typically done in Express—most people stick with the default or one of the built-ins—so it's a bit off the beaten path. I think that's probably the biggest problem with this approach. If you already have a codebase reliant on `req.query` being a plain object, you'll need to go through every instance and change it, which can be a pain. And if some third-party middleware happens to rely on `req.query` being a plain object, you'll need to do some fancy footwork to make this work properly.

You can go "halfway there" by instantiating `URLSearchParams` objects as needed. You'll need to use the `'simple'` query parser, but that lets you write code like this:

    app.set('query parser', 'simple')

    app.get('/', (req, res) => {
      const query = new URLSearchParams(req.query)

      if (query.has('name')) {
        const nameYelled = query.get('name').toUpperCase()
        res.send('Hello, ' + nameYelled)
      } else {
        res.status(400)
        res.send('No name provided!')
      }
    })

`URLSearchParams` works with objects returned by Express's simple query string parser (in other words, an object returned by `querystring.parse`). This "hybrid approach" still preserves traditional `req.query` behavior but gives you the explicitness of `URLSearchParams`. You'll still need to remember to do this every time, though!

I love Express, but it's a complex piece of software, so it has its quirks. Hopefully this post shed some light on one of those gotchas and helps you have fewer problems in your Express apps!
