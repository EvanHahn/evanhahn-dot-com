---
title: "Concept: making asynchronous loading look synchronous"
author: Evan Hahn
layout: post
path: /javascript-method_missing/
---

_Note: this post is outdated; try `async` and `await`._

[Callback Hell is a real place](http://callbackhell.com/), for better or worse. Asynchronous programming is _sweet_, though; it's not the asynchronicity that bothers me, but the syntax.

I wanted to solve the ugliness of asynchronous syntax in browser-based script loaders like [RequireJS](http://requirejs.org/) and [LABjs](http://labjs.com/). We can _barely_ solve it. And only in Firefox. Please be kind.

The basic idea of how this works requires a [Firefox-only property](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/noSuchMethod) called `__noSuchMethod__`. It works like this:

    var myObject = {
        __noSuchMethod__: function(id, args) {
            console.log("A method called " + id + " was called with the following arguments:");
            console.log(args);
        }
    };

    myObject.someMethod(1, 2, 3);
    // "A method called someMethod was called with the following arguments:"
    // [1, 2, 3]

Okay, so shelf that away for a minute.

Let's say I've written a _dead simple_ logging library. It looks like this:

    var logger = {
        log: function(message) {
            console.log(message);
        },
        version: function() {
            return "1.2";
        }
    };

So `logger` has two methods: `log` and `version`. Not too crazy.

Now, let's say we want to use this library. Here's the [dreamcode](http://nobackend.org/dreamcode.html) that we want:

    var logger = require("logger.js");
    logger.log("Hello world!");

    var version = logger.version();
    logger.log(version);

Having written [a simple asynchronous script loader](https://github.com/evanhahn/scriptinclude) myself, they basically work by injecting a `<script>` tag, and when that loads, they run a callback.

So here's how this works: `require` is going to _immediately_ return an object that has one method no it: `__noSuchMethod__`. It'll build up a queue of method calls, and once the script loads, it'll execute all the methods in that queue.

Here's what that looks like in imperfect code:

    // A lil' function that requires stuff.
    var require = function(src) {

        // Define a queue of methods which we'll run when we get things loaded.
        var methodQueue = [];

        // Load the script.
        var script = document.createElement("script");
        script.src = src;
        document.head.appendChild(script);

        // When the script loads, run everything in the method queue.
        script.onload = function() {
            var exported = logger;  // TODO: doesn't work for other libraries!
            methodQueue.forEach(function(method) {
                exported[method.id].apply(exported, method.args);
            });
        };

        // Return a dummy object which will throw methods into the queue.
        return {
            __noSuchMethod__: function(id, args) {
                methodQueue.push({
                    id: id,
                    args: args
                });
            }
        };

    };

We'd have to figure out some way of getting `exported` programmatically inside of the callback, probably with some overhead in the library like RequireJS needs. But this is the basic idea -- return an object that defers method calls.

When we [run the demo in Firefox](http://evanhahn.com/wp-content/uploads/2013/05/async/index.html) (you'll want to view the source of that page), it _sorta_ works. For the simplest of things -- a simple method call -- it works. But if a return value is needed, it doesn't work.

This is just a shoddy concept and it might be impossible, but I thought it was fun to explore!
