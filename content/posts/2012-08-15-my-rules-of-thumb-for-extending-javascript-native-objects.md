---
date: 2012-08-15
title: My rules of thumb for extending JavaScript native objects
author: Evan Hahn
layout: post
url: /my-rules-of-thumb-for-extending-javascript-native-objects/
---

I have the following rules of thumb for extending JavaScript's native objects:

1.  Don't extend things if you're making a library.
2.  Shims are okay in the browser.
3.  Don't touch `Object.prototype`.

Let's explore these in a little more depth.

- _Don't extend things if you're making a library._ Libraries should be self-contained within a namespace (unless you're explicitly extending the native objects; [Sugar][1] and [Prototype][2] are good examples).

- _Shims are okay in the browser._ You usually want to use native methods, but old browsers might not have support for newer JavaScript features. If you define `Array.forEach` if it's not defined, that's okay. If you're not in a browser environment, why aren't you on the latest version of JavaScript?

- _Don't touch `Object.prototype`._ You can break enumeration [as detailed here][3].

Those are my rules!

[1]: http://sugarjs.com/
[2]: http://prototypejs.org/
[3]: http://erik.eae.net/archives/2005/06/06/22.13.54/
