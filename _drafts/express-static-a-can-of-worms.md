---
title: "Express's static middleware: a whole can of worms"
layout: post
permalink: /express-dot-static-is-worms/
---
*This guide assumes you know how to use [Express](http://expressjs.com/) and have used its static middleware. No need to have done anything complex with it, though! This guide was last updated for Express 4.3.0.*

If you're like me, you like Express. And if you're like me, you've used its static middleware, `express.static`. And if you're like me, you thought it was *easy peasy*. But this feature is only mentioned offhandedly in the documentation and it has a *ton* of not-well-documented features. Get ready, maggots. We're going to go nerd spelunking.

First, the stack
================

If you go grepping for the word "static" in the Express source, you basically find it in [one place](https://github.com/visionmedia/express/blob/master/lib/express.js#L60), and it looks like this:

    exports.static = require('serve-static');

That means that `express.static` is really an alias for the [*serve-static*](https://github.com/expressjs/serve-static) module. If you go spelunking in *serve-static*, you'll find that it depends on another module, called [*send*](https://github.com/visionmedia/send).

At a high level, here's how it's all put together:

1. *send* is basically a function that takes an HTTP request, an HTTP response, a file that you requested, and a folder to send it from. (It's a little more than a simple function, but not much more.) For a sense of scope, it's about 600 lines of code.
2. *serve-static* wraps *send* up into generic middleware and adds a couple of options. It's what you think of as `express.static`. It's smaller, at about 150 lines of code, but it still does a fair bit.
3. `express.static` is just an alias for *serve-static*; there's one line of code here.

Also worth noting that [`res.sendfile`](http://expressjs.com/4x/api.html#res.sendfile) also uses *send* (and never touches *serve-static*, because that's middleware!).

With these three parts, you can customize the hell out of your static middleware. Some of the options are dealt with in *serve-static* while others get passed down into *send*.

Cache money dollars
===================

The static middleware does [no server-side caching](https://github.com/visionmedia/send#caching) (this is at the *send* level) (I thought that it did!), but it does let you do two methods of *client*-side caching: ETag and Max-Age. If you don't know what those are, get ready to learn.

ETag
----

[ETag](https://en.wikipedia.org/wiki/HTTP_ETag) is a horrible name and is short for "entity tag", a name that is even worse. It's one way to do caching, and here's how it works:

Let's say I'm a web browser and I'm loading *jokes.edu/offensive.html* for the first time. When I get the response back, I display it to the user. If the server does the whole ETags thing, it sends an ETag HTTP header that might look something like this:

    ETag: 1234567

The *next* time I load *jokes.edu/offensive.html*, things have changed. I have a cached version that I loaded before, and I have the ETag for it. I send an HTTP header with my request that looks like this:

    If-None-Match: 1234567

Nobody's edited *offensive.html*, so it's exactly the same. Instead of sending *all the bytes* again, it just sends an HTTP 304 status code (which means "not modified") and saves a bunch of bandwidth.

But if we change *offensive.html* (maybe it's about an event considered "not funny to even joke about"), then the server recalculates the ETag and sends a new one. Then, if the client's cached ETag isn't the same, it'll

Servers can recalculate ETags however they please, often by using a checksum or hash function or whatever you want to call it. Express (*send*, really) uses a checksum standard called CRC32, but [that may change](https://github.com/visionmedia/send/issues/44).

By default, the static middleware has ETags enabled. It'll set the ETag header (unless you set them sometime beforehand). To disable it, you can do something like this:

    app.use(express.static(myStaticPath, { etag: false }))

You might not want this for a few reasons:

1. You don't want any kind of caching, even of assets.
2. You don't trust Express's implementation.
3. You want strong ETags; *send* only supports weak ones ([which may change](https://github.com/visionmedia/send/issues/45)).

I'd recommend that you leave this alone, because the above reasons aren't compelling (at least to me), but it's your call.

Max-Age
-------

[Max-Age](TODO) is another fun caching mechanism that Express supports. TODO

Setting this property to `Infinity` sets the max-age to 365 days.

A note: *send* doesn't support capital-A `maxAge` as an option, but *send-static* does. To be safe, I'd stick with the all-lowercase `maxage`.

The index
=========

Ugh, caching is hard. Let's do something easy: serving the index.

You've undoubtedly encountered the wonderful world of `index.html` sometime in your career; when you visit a directory, it's often the case that `index.html` is served to you. *But did you know that the static middleware can change all that?* Call it shocking, call it terrifying, call it exciting; we're going to change all that.

By default, *send* serves up a file called `index.html`. It's as if you did this:

    app.use(express.static(myStaticPath, { index: 'index.html' })

As you might imagine, you can change it. Let's say you want the filename to be different:

    app.use(express.static(myStaticPath, { index: 'jokes.txt' })

You can also make an array. If it finds the first file, it'll send that as the index. If not, it'll send the second file, and the third, and so on. If it never finds it, it'll forge ahead.

    app.use(express.static(myStaticPath, { index: ['jokes.txt', 'index.html'] })

You can also ignore the index completely. In that case, the only way to see a file called `index.html` is to visit `index.html` directly.

    app.use(express.static(myStaticPath, { index: false })

Not too crazy, and pretty useful!

Classic misdirection
====================

Imagine a world where you have your static files in a directory called `static`, and within *that* directory is another folder called `comedy_pix`. If I visited `/comedy_pix/`, I'm obviously visiting the directory. But what if I'm visiting `/comedy_pix` without the trailing slash?

By default, the static middleware (not *send* any more) will redirect you with a nice 303 "see other" HTTP request. If you want to disable that behavior, you can!

    app.use(express.static(myStaticPath, { redirect: false })

Now, if you visit `/comedy_pix` without the trailing slash, the middleware will never happen.

It's probably not important, but this only works if you pass in false as `false`; you can't pass `0` or `null` or `new Boolean(false)` or other falsy values. There's no good reason that you should be doing this anyway!

Exposing hidden files
=====================

You probably know about *hidden files*. On OS X and Linux, a file starting with a period is hidden. On Windows, it's a little different, but *send* only supports the POSIX-style way. This property could be renamed to "showFilesThatStartWithPeriod", because it's not necessarily hidden files on Windows. TODO

If you want to serve hidden files for some reason (which can put you in the Danger Zone):

    app.use(express.static(myStaticPath, { hidden: true })

This is sensibly disabled by default.

Some other Fun Facts
====================

- *send* (and therefore everything else) will set a bunch of headers *if they're not already specified*: Accept-Ranges, Date, Cache-Control (for max-age stuff), Last-Modified, and ETag (unless you disable it). You can't disable them elegantly.

- A `root` property in the options will override the previously-specified root (in the first argument to the middleware). This is probably not what you meant to do, anyway.

- All three parts of this stack expose the [*mime*](TODO) module as an alias, so `express.static.mime` will work.
