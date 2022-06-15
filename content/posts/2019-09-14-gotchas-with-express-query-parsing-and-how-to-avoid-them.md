---
date: 2019-09-14
lastmod: 2022-06-15
title: Gotchas with Express query parsing (and how to avoid them)
description: Express's default query parser has some edge cases that can cause unexpected behavior or errors. You can either handle these edge cases or change the default query string parser.
layout: post
url: /gotchas-with-express-query-parsing-and-how-to-avoid-them/
---

_This post assumes you're familiar with Express and the basics of query strings. It was last updated for Express 4.18.1._

_In short, Express's [default query string parser](https://www.npmjs.com/package/qs) has some edge cases that can cause unexpected behavior or errors. You can either handle these edge cases or change the default query string parser. TypeScript can really help._

Everything has its quirks. Even the best of us have our idiosyncrasies and rough edges. Express, a well-designed framework, is no exception.

In this post, we'll look at quirks in Express's query parser. I'll also make some recommendations for how to avoid problems. Its behavior isn't _wrong_, but it's not obvious to everyone. It certainly wasn't obvious to me when _I_ first started with Express!

## First, the happy path

By default, Express adds a property to every request, [`query`](https://expressjs.com/en/4x/api.html#req.query). Its value is a plain JavaScript object that represents the query string.

For example, consider this simple Express app:

```javascript
const app = express();

// NOTE: This code has some problems, which we'll see soon.
app.get("/", (req, res) => {
  const nameYelled = req.query.name.toUpperCase();
  res.send("Hello, " + nameYelled);
});

app.listen(3000);
```

If you make an HTTP request and set the `name` query parameter to `Moogie`, this should respond with `Hello, MOOGIE`. For example:

```sh
curl 'http://localhost:3000/?name=Moogie'
# => Hello, MOOGIE
```

Of course, you could set `name` to something else, too:

```sh
curl 'http://localhost:3000/?name=Rom'
# => Hello, ROM

curl 'http://localhost:3000/?name=Gaila'
# => Hello, GAILA
```

If you don't set the `name` parameter at all, you'll get an error because `req.query.name` is `undefined`.

```sh
curl 'http://localhost:3000/'
# => TypeError: Cannot read property 'toUpperCase' of undefined
#    ...
```

We're getting `Cannot read property 'toUpperCase' of undefined` because `req.query.name` isn't defined, so we can't call `toUpperCase` on it. I don't find this behavior is too surprising, but it's worth keeping in mind.

Let's update our code to handle the case where the `name` parameter is missing:

```javascript
// NOTE: This code also has some problems, which we'll see soon.
app.get("/", (req, res) => {
  if (req.query.name) {
    const nameYelled = req.query.name.toUpperCase();
    res.send("Hello, " + nameYelled);
  } else {
    res.status(400);
    res.send("No name provided!");
  }
});
```

Good! Now we should be able to make requests with and without the parameter.

```sh
curl 'http://localhost:3000/?name=Brunt'
# => Hello, BRUNT

curl 'http://localhost:3000/'
# => No name provided!
```

Unfortunately, we can still crash this code. Let's see how.

## The surprise

What if we send the `name` parameter not once, but twice?

```sh
curl 'http://localhost:3000/?name=Bing&name=Bong'
# => TypeError: req.query.name.toUpperCase is not a function
#    ...
```

A new error: `req.query.name.toUpperCase is not a function`. The same thing happens if we send the parameter three times, or four times, or twenty times. What's happening here?

Let's add a new route that just responds with the value of `req.query` as JSON. This will help us debug.

```javascript
// Set this Express option to format JSON nicely.
// This is just for our debugging.
app.set("json spaces", 2);

app.get("/log-query", (req, res) => {
  res.json({
    query: req.query,
  });
});
```

Now let's try making a request to see what `req.query` is:

```sh
curl 'http://localhost:3000/log-query?name=Bing&name=Bong'
# => {
#      "query": {
#        "name": ["Bing", "Bong"]
#      }
#    }
```

Notice that `name` is no longer a string, but an _array_! That explains why our call to `toUpperCase` didn't work—`toUpperCase` is for strings, not arrays.

You can also set the value to a one-element array by appending `[]` to the end of the name of the query parameter (like `name[]`):

```sh
curl 'http://localhost:3000/log-query?name[]=Moogie'
# => {
#      "query": {
#        "name": ["Moogie"]
#      }
#    }
```

That's not all—there are more weird cases to think about. For example, you can send nested objects:

```sh
curl 'http://localhost:3000/log-query?a[b][c]=cool'
# => {
#      "query": {
#        "a": {
#          "b": {
#            "c": "cool"
#          }
#        }
#      }
#    }
```

This is certainly powerful, but it's a double-edged sword: it creates more code paths than you might expect. This can cause unexpected behavior if you don't anticipate every case, and you'll have to remember to do that _every time_ you read from `req.query`.

We've shown that crashes are possible, but you could also cause unintended behavior with things like this. For example, let's say you only want to greet the user if their name is 12 characters or fewer. You might write something like this:

```javascript
// NOTE: This has problems!
app.get("/", (req, res) => {
  if (req.query.name && req.query.name.length <= 12) {
    res.send("Hello, " + req.query.name);
  } else {
    res.status(400);
    res.send("Invalid name.");
  }
});
```

If you pass strings, everything is fine:

```sh
curl 'http://localhost:3000/?name=Benjamin'
# => Hello, BENJAMIN

curl 'http://localhost:3000/?name=MyVeryLongName'
# => Invalid name.
```

But if you pass an array, you can trick the validation logic.

```sh
curl 'http://localhost:3000/?name[]=MyVeryVeryVeryVeryLongName'
# => Hello, MyVeryVeryVeryVeryLongName.
```

## What's happening here?

This behavior comes from Express's default query parser, which uses [the `qs` module](https://www.npmjs.com/package/qs) under the hood. If you read the documentation for that package, you'll see all of the above behavior reflected, and many more edge cases to think about.

In short, `qs` (and therefore Express's default query parser) does a whole bunch of fancy stuff.

So what do we do about all of these edge cases?

## How to avoid problems

The core of this issue, as with many programming issues, is that there are a lot of possible code paths, and we have to anticipate them all in order for our code to work correctly. Instead of the value of a query parameter being a string or `undefined`, it could be a lot of different things! You'll have to remember to check all of these, and if you forget, you risk unexpected behavior. Likely an error, but possibly an unintended side-effect.

We have several options to avoid these issues—I'll talk about five.

### Option 1: use TypeScript

You know what's good at this very problem? TypeScript.

If you're using TypeScript, make sure you install the latest version of [`@types/express`](https://www.npmjs.com/package/@types/express). Once it's installed, if you try to run things like `req.query.name.toUpperCase()` without any checks, you might get an error like this:

    Property 'toUpperCase' does not exist on type 'string | ParsedQs | string[] | ParsedQs[]'.

This error requires a little more work from us, but it helps prevent bugs. That's because the type definitions define query properties as a union of possible types, instead of something permissive like `any`, or something incorrect like `string`. (Older versions of `@types/express` _did_ use `any`, so update if you haven't!)

Once you've installed `@types/express`, you'll need to [narrow](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) the things you pull off of `req.query` before you can use them safely.

In our example above, instead of assuming `req.query.name` is a string, we should check that it's a string before using it, and handle the case where it's not:

```typescript
app.get("/", (req, res) => {
  if (typeof req.query.name === "string") {
    const nameYelled = req.query.name.toUpperCase();
    res.send("Hello, " + nameYelled);
  } else {
    res.status(400);
    res.send("No name provided, or name was invalid");
  }
});
```

These type definitions will help you handle the edge cases so that you don't accidentally introduce crashes or other bugs.

This is my preferred solution to this problem. It doesn't require changing any of your app's Express settings, and TypeScript is generally a good thing for the reliability of your code.

(Note for any Flow users out there: [Flow's definitions for `query`](https://github.com/flow-typed/flow-typed/blob/decb295d9bb14e0011489b48d398a7ac9091ee71/definitions/npm/express_v4.17.x/flow_v0.94.x-v0.103.x/express_v4.17.x.js#L57) are a little too permissive here.)

But if you don't want to use TypeScript, what else can you do?

### Option 2: carefully handle every edge case

If you want to use Express's default query parser, you'll need to handle strings, and `undefined`, and objects (which could be nested), and arrays (which could contain objects or arrays or strings). That could turn out to be a bit verbose, but it's usually not horrible.

For example, the code from before could be adapted to look like this:

```javascript
app.get("/", (req, res) => {
  if (typeof req.query.name === "string") {
    const nameYelled = req.query.name.toUpperCase();
    res.send("Hello, " + nameYelled);
  } else {
    res.status(400);
    res.send("No name provided, or name was invalid");
  }
});
```

Note that this is identical to the TypeScript code above! At runtime, this does the exact same thing. But TypeScript makes it harder to forget to do these checks, which is why I recommend it.

Depending on your use case, you'll need to do different validation of the incoming parameters.

### Option 3: disable query string parsing completely

Express has a few [app-level settings](https://expressjs.com/en/4x/api.html#app.settings.table). We already saw one earlier—`json spaces`. We can use the `query parser` option to configure—you guessed it—Express's query parser.

If you're lucky enough to not need to do _any query parsing at all_, you can just disable it. For example:

```javascript
app.set("query parser", false);
```

This will set `req.query` to an empty object (`{}`) every time. If you can get away with this, why wouldn't you?

If you're reading this, you probably _do_ need to do some query parsing. But this is a good option if you don't!

### Option 4: use Node's built-in, simpler query string parser

You might have some luck with the simple query parser, which is also configured with the `query parser` option:

```javascript
app.set("query parser", "simple");
```

This uses [Node's built-in `querystring` module](https://nodejs.org/api/querystring.html) under the hood instead of the default `qs` module. `querystring` doesn't parse nested objects or one-element arrays, which avoids a whole bunch of code paths, but it can still return an array if a key is passed multiple times. For example:

```javascript
querystring.parse("name=Bing&name=Bong");
// => { name: ['Bing', 'Bong'] }
```

Unlike Express's default parser, the `qs` module, suffixes don't mean anything. For example, `name[]=Brunt` parses as `['Brunt']` with `qs`, but it's nothing special with the built-in one:

```javascript
querystring.parse("name[]=Brunt");
// => { 'name[]': 'Brunt' }
```

This is certainly simpler, but you'll still need to remember to check the type of `name` before using it—a value could be a string, or `undefined`, or an array.

Wouldn't it be nice if there were a way to deal with query parameters very explicitly? And wouldn't it be _extra_ nice if this tool was standard JavaScript and built right into Node?

### Option 5: use `URLSearchParams`

`URLSearchParams` is a [standard JavaScript object](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) available in Node and in modern browsers. It has a clear interface for handling query parameters which should help us avoid some of the gotchas. If you need to deal with arrays, you can, but if you just need to deal with one string at a time, you can do that too—it's all made explicit.

For example, here's how you'd use it _without_ Express:

```javascript
// Note that this is standard JavaScript, so you can try it in your browser!
const query = new URLSearchParams("name=Bing&name=Bong");

query.has("name");
// => true

query.get("name");
// => 'Bing'

query.getAll("name");
// => ['Bing', 'Bong']
```

While it's more verbose, I generally like `URLSearchParams` because it's explicit. When you call `getAll`, you'll always get an array of strings, no matter what. When you call `get`, you'll always get the first parameter as a string, or `null` if it's not there. No funny business with magically-created objects or arrays, and nothing to remember every time.

Express lets you define a custom function for parsing query strings. Instead of passing `false` or `'simple'` as we've done before, we can pass a function:

```javascript
app.set("query parser", (queryString) => {
  return new URLSearchParams(queryString);
});
```

Now `req.query` will be an instance of `URLSearchParams`. We can now rewrite our route handler like this:

```javascript
app.get("/", (req, res) => {
  if (req.query.has("name")) {
    const nameYelled = req.query.get("name").toUpperCase();
    res.send("Hello, " + nameYelled);
  } else {
    res.status(400);
    res.send("No name provided!");
  }
});
```

Try passing in `name` multiple times, or as an object, or as an array—`URLSearchParams` won't buckle!

This isn't something that's typically done in Express—most people stick with the default or one of the built-ins—so it's a bit off the beaten path. I think that's the biggest problem with this approach. If you already have a codebase reliant on `req.query` being a plain object, you'll need to go through every instance and change it, which can be a pain. And if some third-party middleware happens to rely on `req.query` being a plain object, you'll need to do some fancy footwork to make this work properly. And if you're using TypeScript, you'll have to do even more work!

---

I love Express, but it's a complex piece of software, so it has its quirks. Hopefully this post shed some light on one of those gotchas and helps you have fewer problems in your Express apps!
