---
title: "Safer evals with Node's vm module"
layout: post
permalink: /node-vm-safe-evals/
---
*This guide was last updated for Node 0.10.26.*

Call me crazy, but sometimes you want to run JavaScript code. And sometimes (but far more rarely), you want to run a JavaScript *string*. But JavaScript programmers worldwide will tell you not to touch `eval`.

The core issue of `eval` is that it can wreak havoc. Here's an example:

    var food = "bagel";
    eval("food = 'burrito';");
    console.log("You're eating a " + food + "!");
    // You're eating a burrito!

Now, I *love* burritos, but this is dangerous. The stuff inside `eval` has access to `food`, which you'd love to be out of scope.

Node provides us with an alternative to `eval`: the [`vm` module](http://nodejs.org/api/vm.html). The `vm` module lets us safely evaluate JavaScript strings! There's one thing we need to understand before we can use it, though...

Understanding contexts
======================

The confusing part of using the `vm` module is the concept of a *context*.

One of the pain points of JavaScript is that it's easy to accidentally declare global variables. We've all forgotten the `var` keyword and done something like this:

    function myFunFunction() {
      notSupposedToBeGlobal = "whoops, it's global!";
    }

Suddenly, we have a variable called `notSupposedToBeGlobal` attached to the global object (called `global` in Node and `window` in browsers)!

The trick: we're running that function in something called a *context*, and that context happens to be the global object. The context is usually a global object, unless you wrap it in a `with`:

    var burrito = { sourCream: false };
    with (burrito) {
      // `burrito` is the current context!
      sourCream = true;
    }
    // burrito.sourCream is now true!

I like to think of a context as the implicit global object.

(JavaScripters will tell you to avoid `with` too, so don't think I'm advocating its use here -- but I think it's a helpful example.)

Now that we understand contexts (hopefully!), let's learn how to use them to run our code safely.

Using vm to run code in a context
=================================

`vm` basically gives us three methods to run JavaScript code: `runInThisContext`, `runInNewContext`, and `runInContext`. Let's start with the last one and work our way backwards.

runInContext
------------

I think of `vm.runInContext` as the core of the `vm` module. It's like the tortilla of a burrito, holding the whole thing together.

First, you have to build a context for the code to run in.

    var context = vm.createContext({
      flour: "tortilla"
    });

Then you'll run the code! That simple.

    vm.runInContext("flour = 'corn'", context);
    context.flour; // "corn"

Look at that!

The code inside has access to everything in `context`, but not everything:

    // This throws an error:
    vm.runInContext("global.taqueria = 'Chipotle'", context);

When you try to access `global`, it'll be undefined, and this throws an error! You won't be able to go to Chipotle, which is good. That's not a real burrito and you know it.

runInNewContext
---------------

`vm.runInNewContext` is basically a shorthand. Conceptually, it's nearly identical to `runInContext`.

Here's what the code can basically look like:

    function runInNewContext(code, sandbox) {
      var context = vm.createContext(sandbox || {});
      vm.runInContext(code, context);
    }

If you don't give it a sandbox, it just becomes an empty object. If you _do_ give it an object, it will use that.

Compiling scripts
=================
