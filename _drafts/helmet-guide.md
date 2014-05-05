---
title: Securing your Express apps with Helmet
layout: post
permalink: /node-helmet-tutorial
---
_This guide is aimed at people who've written an Express app before and get the basics of HTTP. You want to understand Helmet and not just use it. If you need help understanding Express.js, I wrote [a guide](http://evanhahn.com/understanding-express-js/) that you might love or hate. This guide was last updated for Helmet version 0.1.0. Things might've changed since then!_

I don't know how to put this, but...security is kind of a big deal.

[Helmet](https://github.com/evilpacket/helmet) is a npm package that helps secure your Express.js app by applying some sensible HTTP headers. It's not a silver bullet -- *an inclusion of Helmet doesn't magically make you safe* -- but it helps. If you want to understand just _how_ it helps and what headers it applies, read on.

Before we start, it's worth noting that Helmet also works with Connect, because it's just middleware. If your app is built on Connect, Helmet can be your friend. If you're just using Express, don't worry. (I _technically_ should've called this "Securing your Connect app".)

Grammar note: the [Helmet readme](https://github.com/evilpacket/helmet/blob/master/README.md) never actually capitalizes the word "helmet", which is _obnoxious_; it's a proper noun. At least [npm is explicitly defiant](https://npmjs.org/doc/faq.html#Is-it-npm-or-NPM-or-Npm). In this post, I'm going to write "Helmet" and y'all can _shut up_.

What does Helmet give us?
=========================

There are a number of HTTP headers that can give us extra security, and Helmet gives us those. They're all somewhat unrelated but for the fact that they're all different HTTP headers. I'll explore all of them.

Helmet comes with a bunch of sensible defaults, too.

Content Security Policy (CSP)
=============================

http://youtu.be/pocsv39pNXA

> A relatively new feature in browsers, Content Security Policy is a tool that protects your web application against Cross-Site Scripting (XSS) vulnerabilities. By declaring to the browser the location where scripts and other resources are supposed to come from, the browser knows to block resources coming from anywhere else.

> Adam Barth spends his days as a Software Engineer on Google's Chrome team. In addition to that, when he's not giving talks at SF HTML5, he's an editor for the W3C's Content Security Policy spec and is the chair on the W3C's Web Security Interest Group.

> This talk shows you how you can use Content Security Policy 1.0 to help secure your web app today. He also gives a preview of what's on the horizon in 1.1.

HSTS (HTTP Strict Transport Security)
=====================================

http://www.hacksparrow.com/node-js-https-ssl-certificate.html
http://nodejs.org/api/https.html

X-Frame-Options
===============

Most of the time, you don't want your page to be in a `<frame>` or an `<iframe>`. Why not?

There's this kinda-cool thing called [clickjacking](https://en.wikipedia.org/wiki/Clickjacking). Basically, it involves overlaying a malicious frame (or an iframe) over a "real" page. When you think you're clicking something in the malicious frame, you're actually clicking a button on the "real" page. This leads to things like "likejacking", where I trick you into liking something on Facebook that you never intended to like. I could also trick you into approving things you didn't approve. (I'm saying "I could trick you", but you're smarter than me, so this is just in theory.) The IE blog has [a bunch of screenshots](http://blogs.msdn.com/b/ie/archive/2009/01/27/ie8-security-part-vii-clickjacking-defenses.aspx) that visually show this problem.

And so the `X-FRAME-OPTIONS` header was born. If you want to keep your site out of frames completely, then you can:

    app.use(helmet.xframe('deny'));

I'd recommend this option, and it's also Helmet's default. But you can also let anyone from the same origin in:

    app.use(helmet.xframe('sameorigin'));

And you can also let your buddies from channel4newsteam dot org put you in a frame:

    app.use(helmet.xframe('allow-from', 'http://channel4newsteam.org'));

While enabling this header doesn't protect _everyone_ from clickjacking, it does protect modern browsers (and even IE8!).

X-XSS-Protection
================

This one is just a header. [Helmet's source file](https://github.com/evilpacket/helmet/blob/master/lib/middleware/iexss.js) is only six lines of code; even _I_ could write this. But what does it protect from?

I made [a simple page](http://evanhahn.com/wp-content/uploads/2013/09/xss-type1.php?name=world) that demonstrates this problem. When you visit this URL:

    xss-type1.php?name=world

It'll say the following to you:

> Hello, world

And here's the PHP code that spits out your name:

    Hello, <?php echo $_GET['name']; ?>

You might already see where this can go wrong -- I'm trusting user input. Let's say I'm evil, and I want the information stored in your cookies. I could tell you to visit this URL:

    xss-type1.php?name=<script>doSomethingEvilWith(document.cookie)</script>

Suddenly, we're doing something evil with `document.cookie`, and I can do Bad Stuff. Because I was trusting of user input, I'm potentially putting _all users_ at risk.

While it's the server programmer's responsibility to fix this, browsers are clever and can help stop these, catching careless server programmers. To simplify a bit, if the browser sees `<script>` somewhere in the URL, the browser can say "don't execute any JavaScript that looks like this". And that's exactly what Helmet's `X-XSS-Protection` header will explicitly say: don't execute those things!

To use it:

    app.use(helmet.iexss());

Some browsers (Chrome, for example) act as if this is enabled even if it isn't, but some don't. Not all browsers respect this.

X-Content-Type-Options
======================

This is another IE one, although Chrome extensions [deal with it too](https://developer.chrome.com/extensions/hosting.html).

The "MIME-Handling: Sniffing Opt-Out" section on [this post in the IE Blog](http://blogs.msdn.com/b/ie/archive/2008/07/02/ie8-security-part-v-comprehensive-protection.aspx) does a good job explaining this one, but I'll give it a shot: let's say I build a photo-sharing site like Flickr. A malicious user named Wes Mantooth uploads a .jpg file, but he embeds some evil JavaScript inside. Now, when I'm loading Wes's image, I see the `Content-Type` is a JPEG, but the content of the file really looks a lot like JavaScript.

You might expect it to just fail -- JavaScript is garbage as far as JPEGs are concerned. But Internet Explorer will say "woah, this looks an awful lot like JavaScript", and run it as JavaScript. This is bad news!

To fix that, the `X-Content-Type-Options` header was born. When you set it to `nosniff`, Internet Explorer won't decide it's JavaScript -- it'll trust the `Content-Type` given by the server.

I can't imagine why you'd want to serve files with mismatched content types, so you should let Helmet do its thing:

    app.use(helmet.contentTypeOptions());

Cache-Control
=============

https://blog.httpwatch.com/2008/10/15/two-important-differences-between-firefox-and-ie-caching/
http://palpapers.plynt.com/issues/2008Jul/cache-control-attributes/

Like many of the others, [the source for this one](https://github.com/evilpacket/helmet/blob/master/lib/middleware/cacheControl.js) is pretty short. The relevant line is here:

    res.header('Cache-Control', 'no-store, no-cache');

This does two things:

1. `no-store`. If I download an image, I could save it on my computer. If it appears again, I won't have to redownload it...unless I'm not allowed to cache it. `no-store` says "hey browsers -- don't save this at all". This protects people from hacking into your cache and stealing sensitive data.

2. `no-cache`. You can think of this as "don't cache the page", although it's a bit more nuanced than that. [The spec](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9.1) says the following:

   > If the no-cache directive does not specify a field-name, then a cache MUST NOT use the response to satisfy a subsequent request without successful revalidation with the origin server.

   This doesn't mean "never use the cache", it just means "never trust the cache". A client could ask the server if its cache is valid, and if it is valid, we could use the cache.

    In this case, this doesn't matter -- we're never allowed to store anything (see above), so it's as if we said "never use the cache". This is still specified, though -- this invalidates any existing caches that might've existed before we enabled this header.

To use it:

    app.use(helmet.cacheControl());

Sometimes, you're serving things that are okay to cache. You can set the header to `private` to allow special things to be cached.

    app.get('/kind-of-a-big-file', function(res, res) {
      res.header('Cache-Control', 'private');
      res.send('one day, Veronica and I are gonna to get married on top of a mountain');
    });

Putting the helmet on
=====================

I should copy-paste what I said in the intro: Helmet is "not a silver bullet -- *an inclusion of Helmet doesn't magically make you safe* -- but it helps." Think of Helmet like a real helmet: it helps to make you safe, but someone could still throw a burrito at you while you're riding your motorcycle and you'd get hurt.

[Grab your Helmet](https://npmjs.org/package/helmet), friend.
