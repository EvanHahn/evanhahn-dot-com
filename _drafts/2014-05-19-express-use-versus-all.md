---
title: app.use versus app.all in Express
layout: post
permalink: /express-use-versus-all/
---
*This post assumes you know how to use Express, and explains a somewhat subtle difference, and might be completely useless to you.*

You may recall `app.router` from the days of Express 3, but Express 4 said ["begone, beast!"](https://github.com/visionmedia/express/wiki/New-features-in-4.x#no-more-appuseapprouter) and so it was gone. Express 4 changed a lot about the behavior of routing, and one of the subtler things that changed was the relationship between two methods: `app.use` and `app.all`.

You've undoubtedly used `app.use` for middleware, but you might not have touched `app.all`. If you find yourself doing something like this:

    app.get("/im-so-fancy", function(req, res) { /* ... */ })
    app.post("/im-so-fancy", function(req, res) { /* ... */ })
    app.put("/im-so-fancy", function(req, res) { /* ... */ })
    app.delete("/im-so-fancy", function(req, res) { /* ... */ })
    app.head("/im-so-fancy", function(req, res) { /* ... */ })
    // ...and so on, for all the HTTP verbs

Then you should be using `app.all`.

    app.all("/im-so-fancy", function(req, res) { /* ... */ })

But if you're like me, a question might arise: if `use` matches all HTTP verbs and `all` matches all HTTP verbs...what's the difference?

I did a little digging, and I found out that they're pretty similar. The main difference is how URLs are matched and how they appear inside the function.

Difference 1: how URIs are matched
==================================

To quote the Express documentation, `app.all` "functions just like the `app.VERB()` methods, however it matches all HTTP verbs." That means you _have_ to supply a route, that route can have pattern matching, et cetera et cetera. Here are a couple of examples:

    app.all("*", /* ... */)
    // matches everything

    app.all("/you-already-know", /* ... */)
    // matches /you-already-know
    // matches /you-already-know/ unless strict routing is enabled

    app.all("/im-in-the-fast-lane/*", /* ... */)
    // does NOT match /im-in-the-fast-lane
    // matches /im-in-the-fast-lane/
    // matches /im-in-the-fast-lane/from-la
    // matches /im-in-the-fast-lane/from-la/to-tokyo

`app.use`, on the other hand, is a little different. The most common case is to mount middleware without a path, but you can mount it with a path if you want. The mounted path can have pattern matching, too.

    app.use(/* ... */)
    // matches everything

    app.use("*", /* ... */)
    // matches everything

    app.use("/im-so-fancy", /* ... */)
    // matches /im-so-fancy
    // matches /im-so-fancy/
    // matches /im-so-fancy/can-you-taste
    // matches /im-so-fancy/can-you-taste/this-gold

    app.use("/remember-my-name/*", /* ... */)
    // does NOT match /remember-my-name
    // matches /remember-my-name/
    // matches /remember-my-name/bout-to
    // matches /remember-my-name/bout-to/blow

Notice the key difference. `app.all` functions pretty much as you'd expect; you can think of it as a simple equality check or regular expression adventure. `app.use`, on the other hand, allows you to mount a prefix.

Difference 2: grabbing the route
================================

At the end of the day, `app.all` is basically a route. It functions exactly like one. That means it has

Difference 3: the URL is different
==================================

There are properties that are available to the other routing functions (`app.all` included) that aren't available to `app.use`.

The two methods are _very_ similar in some cases.

What should you do?
===================

Time to exit the realm of fact and enter the realm of my opinion. When should you use one and when should you use the other?

1. If you're not using any path at all, use `use`.
