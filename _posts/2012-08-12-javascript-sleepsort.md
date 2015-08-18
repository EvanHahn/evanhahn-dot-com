---
title: JavaScript/CoffeeScript sleepsort
author: Evan Hahn
layout: post
permalink: /javascript-sleepsort/
---
I came across the sleepsort today, which is a humorous sort. [A genius on 4chan made it.](http://dis.4chan.org/read/prog/1295544154) Basically, it sleeps for *n* milliseconds, where *n* is each number. Smaller numbers will only sleep briefly and larger ones will sleep longer, so it outputs in the right order!

I was "inspired" and [implemented it in JavaScript](https://gist.github.com/3330517):

    function sleepsort() {
      var i = arguments.length;
      while (i --) {
        setTimeout(function(n) {
          console.log(n);
        }, i, arguments[i]);
      }
    }

I also implemented it in CoffeeScript:

    sleepsort = ->
      setTimeout ((n) => console.log n), number, number for number in arguments

Perhaps it's obvious that it's not a "real" sort -- it's clearly very slow for large numbers and doesn't even work for negative numbers. Still a fun little exercise!
