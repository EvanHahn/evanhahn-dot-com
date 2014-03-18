---
title: Load JavaScript asynchronously with ScriptInclude
author: Evan Hahn
layout: post
permalink: /load-javascript-asynchronously-with-scriptinclude/
categories:
  - Uncategorized
---
When I code in browser-based JavaScript, I often miss the `#include` statements of C and other languages. I decided I'd implement it in JavaScript!

ScriptInclude is a little JavaScript library that allows you to include files. It works like this:

    ScriptInclude.include('backbone.js', 'jquery.js', function() {
        // Backbone and jQuery are loaded in, let's go for it
    });
    

There are a couple of other things that you can do with it; you can see those in [the readme on GitHub][1].

There are a number of package managers for JavaScript already. I can't claim that ScriptInclude is the best, but it's really simple and that's where I hope it shines.

[Go take a look!][2] Let me know what you think.

 [1]: http://github.com/EvanHahn/ScriptInclude/blob/master/README.md
 [2]: http://github.com/EvanHahn/ScriptInclude
