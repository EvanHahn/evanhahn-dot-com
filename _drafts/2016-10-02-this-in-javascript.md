---
title: '"this" in JavaScript'
layout: post
permalink: /this-in-javascript/
---
*This post assumes you know the basics of JavaScript. That includes variables, objects, and functions. It's aimed at JavaScript beginners looking to learn a more advanced concept.*

I love JavaScript, but it can be really weird. I find parts of the language downright confusing. The `this` keyword is one of those tricky parts, which I'd like to try to demystify in this post. Let's see how well I do!

Our quest to understand `this` begins with a different JavaScript keyword: `arguments`.

# `arguments`

JavaScript functions can take arguments. Here's a simple example of a function that takes an argument:

```javascript
function yellName (name) {
  console.log(name.toUpperCase());
}
```

You can try typing this into a JavaScript console. You can open the console in your web browser ([here's how to do it in Chrome](https://developers.google.com/web/tools/chrome-devtools/debug/console/console-ui?hl=en#opening-the-console)), use [jsconsole.com](https://jsconsole.com/), or open up a Node.js console by typing the `node` command on your computer. I'd recommend the first option (and if you don't know what Node is, don't worry!)

When you call this function with an argument, the `name` variable gets populated and things happen.

```javascript
yellName('Nicki Minaj'); // logs "NICKI MINAJ"
```

You can also call functions with a different number of arguments than they expect—the *caller* of the function has complete control here. For example, they could pass too many arguments to the function, and the extras are ignored:

```javascript
yellName('Nicki', 'Minaj'); // logs "NICKI"
```

They can also pass too *few* arguments, too:

```javascript
yellName(); // throws an error
```

This is different in many other programming languages, which require the number of arguments to match the definition. Not so in JavaScript! You can call function with as few arguments as you want or [as many arguments](http://stackoverflow.com/a/22747272) as you want.

Why am I telling you this?

In addition to the arguments a function asks for (`name` in the example above), all JavaScript functions have access to a magical variable called `arguments`. It is a list of all of the arguments to a function.

Here's a simple function that prints the number of arguments a function is called with:

```javascript
function howManyArguments () {
  console.log(arguments.length);
}
```

When you call it, `howManyArguments` will log the number of arguments passed.

```javascript
howManyArguments('hi');               // logs 1
howManyArguments('be', 'respectful'); // logs 2
howManyArguments();                   // logs 0
```

Even though you never explicitly created `arguments`, it appears magically inside of functions. This allows you to write functions that take any number of arguments, which is sometimes useful. (You can [read more about `arguments`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments) if you wish.)

Why am I telling you this?

Just like `arguments`, `this` is a magical word that appears inside of JavaScript functions. Just like `arguments`, the value of `this` changes depending on how that function is called. So how does it work?

# What is `this`?

Conceptually, `this` is a magical keyword. Its value changes depending on how the function is called. This is just like `arguments`.

Unlike `arguments`, however, `this` can take a lot of different shapes. Turns out that there are a _lot_ of different ways to call a function in JavaScript, many of which set `this` differently. Get ready for a wacky ride.

Let's say you have a function that logs the value of `this`. Might look something like:

```javascript
function logThis () {
  console.log(this);
}
```

Let's see how to get different values out of that function.

## Explicitly setting `this`

There are three ways to set `this` explicitly: `apply`, `call`, and `bind`. Let's look at each one of these.

### `apply`

You can call `logThis` and set the value of `this` to any value you want. Let's try setting it to the string "purple".

```javascript
logThis.apply('purple'); // logs "purple"
```

What's happening here?

- `logThis` is the function that we created up above.
- We grab *another* function off of it; this function is named `apply`. This is a special function that has a superpower: it can change `logThis`'s value of `this`. (A pretty boring superpower, but a superpower.)
- We call this superpower function with whatever we want `this` to be.

We can do it again with other values:

```javascript
logThis.apply('yas'); // logs "yas"
logThis.apply(8);     // logs 8
```

`apply` lets us explicitly change the value of `this`.

`apply` can also explicitly change the value of `arguments`, if we want!

Take a look at this example:

```javascript
function logThisAndArguments () {
  console.log('this is', this);
  console.log('arguments is', arguments);
}

logThisAndArguments.apply('cool', [4, 5, 6]);
// logs the following:
// this is cool
// arguments is [4, 5, 6]
```

### `call`

There's another superpower function called `call` that works in the _exact same way_ as `apply` for setting `this`. Here's how it works:

```javascript
logThis.call('yas'); // logs "yas"
logThis.call(8);     // logs 8
```

`call` can also set `arguments` just like `apply`. The only difference: you pass each argument in as a new argument rather than one array of arguments.

```javascript
function logThisAndArguments () {
  console.log(this, arguments);
}

logThisAndArguments.apply('from apply', [4, 5, 6]); // logs "from apply [4, 5, 6]"
logThisAndArguments.call('from call', 4, 5, 6); // logs "from call [4, 5, 6]"
```

# Outside of functions

One last thing: what happens when you use `this` outside
