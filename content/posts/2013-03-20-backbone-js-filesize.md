---
date: 2013-03-20
title: Backbone.js is larger than you think
author: Evan Hahn
layout: post
url: /backbone-js-filesize/
---

_In short: Backbone.js is bigger than you think._

Backbone.js advertises itself as 6.3 kilobytes, but that's a little misleading. Its dependencies can make it one of the _largest_ libraries.

I would imagine that most folks use Backbone with Underscore (4 KB) and jQuery (32 KB). This makes for about 42 kilobytes of JavaScript. (To be fair, jQuery is often cached. If you don't care about parse time, then Backbone is the smallest.) You can swap jQuery for Zepto for a total of about 19 kilobytes.

To compare, there are many libraries that have no dependencies and are smaller, _and_ they do data binding to boot. [Knockout.js](https://knockoutjs.com/) is 14 KB, [Angular.js](http://angularjs.org/) comes in at 29, and [Funnyface.js](https://weepy.github.com/o_O/) is just below the 10 kilobyte mark. [Ember.js](http://emberjs.com/) is larger, at 49 kilobytes. All of these libraries do data binding, so you don't have to code that yourself.

I think worrying about filesizes is often a premature optimization, but for how little Backbone does, it's surprising that it's so large.
