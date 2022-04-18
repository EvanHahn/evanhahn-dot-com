---
date: 2012-06-19
title: Make console methods work in Internet Explorer
author: Evan Hahn
layout: post
url: /make-console-methods-work-in-internet-explorer/
---

**Update: use [Paul Miller's solution][1], not mine.**

_In short: if you want the console to work in IE, use [Firebug Lite][2]. If you just want it not to crash, see the files at the bottom._

The web console is really useful, but it's not supported in (surprise) Internet Explorer. While you probably don't want to have `console.log` in your production code, you don't want to have your site break in IE because you use the console. In this case, you have two options.

_If you want it to actually work_, [Firebug Lite][2] is the way to go. This makes the console actually show up and work.

_If you just want it to not crash_ (like I do), use some code I wrote. I wrote some simple code that makes any non-existing console methods a no-op. I made a bunch of different versions. The terse versions only fix the common `log`, `info`, `warn`, and `error`; the "complete" versions are more thorough. There are JavaScript and CoffeeScript versions.

- [JavaScript version, terse][3]
- [JavaScript version, complete][4]
- [CoffeeScript version, terse][5]
- [CoffeeScript version, complete][6]

Enjoy!

[1]: https://github.com/paulmillr/console-polyfill
[2]: http://getfirebug.com/firebuglite
[3]: https://gist.github.com/2955643
[4]: https://gist.github.com/2955637
[5]: https://gist.github.com/2955704
[6]: https://gist.github.com/2955696
