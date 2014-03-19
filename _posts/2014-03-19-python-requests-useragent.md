---
title: "Dealing with the useragent of Python's Requests library"
layout: post
permalink: /python-requests-library-useragent
---
I'm new to the Python world. I found out about the [Requests](http://docs.python-requests.org/) library, and I like it. What useragent does it provide?

By default, it looks like this:

    python-requests/{package version} {runtime}/{runtime version} {uname}/{uname -r}

"uname" is the output of the uname command. Here's the useragent on my Mac:

    python-requests/2.2.1 CPython/2.7.5 Darwin/13.1.0

And on a Linux box with an older version:

    python-requests/1.1.0 CPython/2.6.6 Linux/2.6.32-431.3.1.el6.x86_64

To change the useragent, you can specify it when you make a request:

    requests.get("http://example.com", headers={ "user-agent": "The Coolest Useragent" })

And that's it!
