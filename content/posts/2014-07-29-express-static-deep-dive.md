---
date: 2014-07-29
title: A deep dive into Express's static middleware
layout: post
url: /express-dot-static-deep-dive/
---

_This guide assumes you know how to use [Express](https://expressjs.com/) and have used its static middleware. No need to have done anything complex with it, though! If you need help, you can check out [my intro to Express](/understanding-express) or [my book on the topic][book]. This guide was last updated for Express 4.6.1._

**This guide is a little bit outdated; check out [the new docs](https://github.com/expressjs/serve-static).**

If you're like me, you like Express. And if you're like me, you've used its static middleware, `express.static`. And if you're like me, you thought it was that simple. But this feature is only mentioned offhandedly in the documentation and it has a _ton_ of not-well-documented features.

Get ready, maggots. We're going to go nerd spelunking.

## Explaining the stack

If you go looking for the word "static" in the Express source, you basically find it in one place: aliasing `express.static` to a module called [_serve-static_](https://github.com/expressjs/serve-static). If you go spelunking in _serve-static_, you'll find that it depends on another module, called [_send_](https://github.com/visionmedia/send).

At a high level, here's how the three modules are put together:

1. _send_ is at the lowest level. It's basically a function that sends a file over HTTP. To get a bit more technical, _send_ takes an HTTP request and a path, and it returns a stream that you pipe to your HTTP response. For a sense of scope, it's about 600 lines of code.
2. _serve-static_ wraps _send_ up into generic middleware and adds a couple of options. It's what you think of as `express.static`. It's smaller, at about 150 lines of code, but it still does a fair bit.
3. `express.static` is just an alias for _serve-static_; there's just one line of code here.

Worth noting that Express's [`res.sendFile`](https://expressjs.com/4x/api.html#res.sendFile) also uses _send_ (and never touches _serve-static_, because that's middleware!).

With these three parts, you can customize the hell out of your static middleware. Some of the options are dealt with in _serve-static_ while others get passed down into _send_. In any case, there are _way_ more options than I expected.

## Caching options

The static middleware does [no server-side caching](https://github.com/visionmedia/send#caching) (I thought that it did!), but it does let you do two methods of _client_-side caching: ETag and Max-Age. If you don't know what those are, get ready to learn.

### ETags

[ETag](https://en.wikipedia.org/wiki/HTTP_ETag) is a horrible name and is short for "entity tag", a name that is even worse. It's one way to do caching, and here's how it works:

Let's say I'm a web browser and I'm loading _jokes.edu/offensive.html_ for the first time. When I get the response back, I display it to the user. In addition to the content of the page, the server might also send an HTTP header that looks like this:

    ETag: 1234567

If the browser sees the ETag, it will cache _offensive.html_ and say that its corresponding ETag is "1234567".

The _next_ time the browser loads _jokes.edu/offensive.html_, the browser asks, "is the ETag still '1234567'?" It does this by setting the following header in the request:

    If-None-Match: 1234567

If nobody's edited _offensive.html_, then the file is exactly the same, and so is its ETag. Instead of sending _all the bytes_ again, the server responds with an HTTP 304 status code (which means "not modified") and saves a bunch of bandwidth.

But if someone has edited _offensive.html_, then the file will have a different ETag, and so everything will be sent over the wire.

Servers can recalculate ETags however they please, often by using a checksum or hash function or whatever you want to call it. For your reference, Express (_send_, really) uses the MD5 hash function, because those rarely have collisions and are fast to calculate.

By default, the static middleware has ETags enabled. It'll set the ETag header (unless you set them sometime beforehand, which I wouldn't recommend). To disable it, you can do something like this:

    app.use(express.static(myStaticPath, {
      etag: false
    }))

You might want to disable ETags for a few reasons:

1. You don't want _any_ kind of caching, even of static files. This caching is pretty reliable, though, so that shouldn't really be a concern.
1. You want strong ETags; _send_ only supports weak ones. If you don't know what these are, you probably don't need strong ETags.
1. You don't trust Express's implementation for some weird reason. Maybe you're worried about rare MD5 hash collisions?

I'd recommend that you leave this alone, because the above reasons aren't compelling (at least to me), but it's your call.

### Max-Age

Max-Age is another fun caching mechanism that Express supports, and it's a little different from ETags.

With ETags, we can _reduce_ the amount of bytes sent over the wire, but clients still have to make an HTTP request every time, just to make sure their cache is still valid. With Max-Age, the server basically says, "Here's a resource, which you can cache for a week" (or however long you'd like). On one hand, it saves bandwidth, but on the other hand, the people making the server had better be pretty sure that the content will be good for a certain amount of time!

Unlike ETags, Max-Age isn't itself an HTTP header. It tags along with a header called Cache-Control. If a server wanted to tell the client to cache something for one day (86,400 seconds), it'd send a header like this:

    Cache-Control: public, max-age=86400

Cache-Control turns out to be a pretty complicated HTTP header; it's got [a long spec](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9). But Express's static middleware only deals with a small subset of it, like so:

    var oneDay = 86400000; // in milliseconds
    app.use(express.static(myStaticPath, {
      maxage: oneDay
    }))

This code example will set the max-age to just one day, just like the header above. Now, a browser will only request that resource after one day has passed.

Notice that the time is in specified milliseconds, not seconds like the header above. This is because almost everything in JavaScript is millisecond-based, not second-based; _send_ will do the conversion for you.

You can also pass times as strings (which internally uses the [_ms_ module](https://github.com/guille/ms.js)):

    app.use(express.static(myStaticPath, {
      maxage: '2h'
    }))

This sets the max-age to two hours, as you might expect.

A couple of notes about this option:

- The maximum max-age that Express allows is 365 days.
- Passing a negative number will just set the max-age to 0.
- As you can see, you're passing a property called `maxage`. The static middleware also supports `maxAge` (note the capitalization difference). _send_, however, doesn't support capital-A `maxAge`. To be safe, I'd stick with the all-lowercase `maxage` for consistency.

If you're pretty sure resources won't be updated for an amount of time, I'd recommend adding a max-age to your files. There are asset helpers that modify the filenames so that browsers don't cache old assets; I won't cover those here, but things like [connect-assets](https://github.com/adunkman/connect-assets) can help with this.

Personally, I usually omit max-age. Leaving it out is _slightly_ less performant but much less developer headache. Once again: your call!

## The index

Ugh, caching is hard. Let's do something easy: serving the index.

You've undoubtedly encountered the wonderful world of `index.html` sometime in your life; when you visit a directory, it's often the case that `index.html` is served to you. _But did you know that the static middleware can change all that?_

By default, the static middleware (via _send_) serves up a file called `index.html` when you visit the folder's root. It's as if you did this:

    app.use(express.static(myStaticPath, {
      index: 'index.html'
    }))

As you might imagine, you can change it. Let's say you want the filename to be different:

    app.use(express.static(myStaticPath, {
      index: 'jokes.txt'
    }))

Now we'll load `jokes.txt` when we visit the root, instead of `index.html`.

You can also pass an array. If it finds the first file, it'll send that as the index. If not, it'll send the second file, and the third, and so on. If it never finds it, it'll continue to the next middleware.

    app.use(express.static(myStaticPath, {
      index: ['jokes.txt', 'index.html']
    })

You can also ignore the index completely. In that case, the only way to see a file called `index.html` is to visit `index.html` directly.

    app.use(express.static(myStaticPath, {
      index: false
    }))

In this case, trying to visit the root will give a 404 error.

Not too crazy, and pretty useful!

## Setting custom headers

The static middleware also supports a `setHeaders` property, which is a function that's called right before HTTP response headers are set. Let's quickly look at a couple of examples of its usage to see how it's used and why we'd want to use it.

If your browser sees `Content-Disposition: attachment` in the HTTP response headers, it'll open a download dialog rather than trying to display the response in the browser. If you've ever clicked "download this file", seen a download dialog, and wondered why your browser doesn't just try to render the file, it's because of Content-Disposition.

If you want to serve _all_ static files as attachments, you can combine that with Express's `res.attachment`, like so:

    app.use(express.static(myAttachmentsPath, {
      setHeaders: function(res, path) {
        res.attachment(path)
      }
    }))

This basically sets `Content-Disposition: attachment` for your files. This is perhaps the most common case.

You might also want to do this selectively. Let's say we want to send the file as an attachment if the word "download" is in the path. Here's how we might do that:

    app.use(express.static(myAttachmentsPath, {
      setHeaders: function(res, path) {
        if (path.indexOf("download") !== -1) {
          res.attachment(path)
        }
      }
    }))

You might also use this method to log things or set special debug headers, though I think the attachment recipe is the most common.

## Trailing slashes on directories

Imagine a world where you have your static files in a directory called `static`, and within _that_ directory is another folder called `comedy_pix`. If I visited `/comedy_pix/`, I'm obviously visiting the directory. But what if I'm visiting `/comedy_pix` without the trailing slash?

By default, the static middleware (not _send_ any more) will redirect you with a nice 303 "see other" HTTP request. If you want to disable that behavior, you can!

    app.use(express.static(myStaticPath, {
      redirect: false
    }))

Now, if you visit `/comedy_pix` without the trailing slash, the middleware will never happen.

I think this is a pretty obscure feature. You might want to do this if you have a folder called `comedy_pix` _and_ a separate route that maps to `comedy_pix`, for example. It's there in case you need it, but you likely don't.

It's probably not important, but this only works if you pass in false as `false`; you can't pass `0` or `null` or `new Boolean(false)` or other falsy values. There's no good reason that you should be doing this anyway!

## Exposing hidden dot files

You probably know about [hidden files](https://en.wikipedia.org/wiki/Hidden_file_and_hidden_directory): files considered "hidden" don't show up in most listings by default. On OS X and Linux, a file starting with a period is considered hidden, and is sometimes called a "dotfile" because it starts with a dot. On Windows, it's a little different, but the middleware doesn't support this.

The middleware supports sending these dotfiles. By default, though, they're ignored. It's as if you specified this option:

    app.use(express.static(myStaticPath, {
      dotfiles: 'ignore'
    }))

If you want to serve hidden files for some reason (which can put you in the Danger Zone, because these files are usually hidden for a reason):

    app.use(express.static(myStaticPath, {
      dotfiles: 'allow'
    }))

You can also choose to send a 403 Forbidden error when trying to access a dotfile. Clients will know that there's a dotfile there, but they won't be able to get inside:

    app.use(express.static(myStaticPath, {
      dotfiles: 'deny'
    }))

This is sensibly disabled by default, and I can't think of a great reason to change it.

## Some other Fun Facts™

- _send_ (and therefore everything else) will set a bunch of headers _if they're not already specified_: Accept-Ranges, Date, Cache-Control (for max-age stuff), Last-Modified, and ETag (unless you disable it). If you want to remove those headers, check out [this simple example](https://gist.github.com/EvanHahn/38f08f40a23e0cb9f4b0) which uses the [_on-headers_ module](https://github.com/jshttp/on-headers).

- _send_ supports a `root` property, but I wouldn't set it unless you're using _send_ directly. A `root` property in the options will override the previously-specified root. You can do horrible things this way:

        // don't do this!!
        app.use('/path-foo', express.static(myStaticPath, {
          root: '/path-bar'
        }))

- All three parts of this stack expose the [_mime_](https://github.com/broofa/node-mime) module as an alias, so `express.static.mime` will work.

## All done!

I don't know about you, but I didn't expect Express's static middleware to be so complicated! Luckily, I think they've done a good job choosing sensible defaults so that you don't have to worry about this stuff 99% of the time.

Hopefully you've enjoyed this little dive into the wonders of serving static files with Express!

[book]: https://www.manning.com/books/express-in-action?utm_source=express-in-action&utm_medium=affiliate&utm_campaign=book_hahn_express_4_7_16&a_aid=express-in-action&a_bid=fe3fcff7
