---
title: Disable JSHint for a file
author: Evan Hahn
layout: post
permalink: /disable-jshint-for-a-file/
---
I like [JSHint](http://jshint.com/), but [sometimes](http://js1k.com/) you just want it to *completely* shut up. Add this to the top of your file:

    // jshint ignore: start

And you're done! JSHint won't complain about your file any more. (Don't take this as an excuse to write bad code!)
