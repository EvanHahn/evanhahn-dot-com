---
title: Doctype should hold the layout engine
author: Evan Hahn
layout: post
permalink: /doctype-should-hold-the-layout-engine/
---
Every web developer knows the following pain: your site looks great in Firefox, but when you take it to Internet Explorer, everything is ruined. You shed a single tear of hatred.

We should blame Internet Explorer, but if the past is any indication, they’re not going to make it all better. Here’s how I would fix it.

(Disclaimer: I have no idea if this would be feasible but it doesn’t seem ridiculous to me.)

My crazy idea: put the layout engine in the `<doctype>` tag.

This means that Firefox would not be built on the Gecko layout engine, nor Chrome on WebKit, nor Opera on Presto. They would simply look at each page and see that the engine was WebKit (for example), and they’d render the page that way.

# How it would work

Firefox loads a webpage’s HTML. They see something like this:

    <!DOCTYPE engine="http://www.w3.org/layout/webkit_2.1.eng">

They load WebKit 2.1 from W3.org, and render the page with it. Firefox would have no notion of Gecko nor WebKit -- it would load the rendering engine each time.

# Why it would be so awesome:

First of all, it would fix compatibility problems. No longer would web developers be putting Internet Explorer logos on punching bags. No longer would Firefox render shadows *a little bit differently* from Chrome.

Second, people wouldn’t need to upgrade their browsers. If you understand this post, you probably have the most up-to-date browser you can think of. But most people don’t, and they don’t want to update their browser (or don’t know how). So why make them when web developers want to add new features?

Third: a person could also, potentially, make their own layout engine. This could mean that HTML gets itself fixed — in my opinion, HTML, CSS, and JavaScript are poorly thought-out. An “HTML has been made awesome" engine would be *lovely*.

# Something to keep in mind

It might not go in the doctype, but it should go *somewhere*.

# Some little issues and how to fix them

Problem: Big download! Solution: Your internet speed can handle it, don’t be such a pansy. Actual solutions: Browsers would cache them. Browsers would come pre-loaded with a few rendering engines. Layout engine files could be made smaller…though I have no idea about that last one.

Problem: New browsers would break if an old page didn’t support this! Solution: Browsers can have a fallback. If they don’t see this new thing, they default to WebKit, or Gecko, or whatever.

Problem: Old browsers would break if a new page relied on this! Solution: There isn’t a great one. But keep in mind that these problems also exist with things like HTML5, and are largely mitigated over time.

Problem: Doesn’t this make browsers redundant? Solution: They should already be. Pages *should* look the same in Safari as they do in Internet Explorer. This would just make it easier for web developers and not have to code special pages for certain browsers.

# In conclusion

I think something like this might make web development *crazy cool*. Your thoughts?
