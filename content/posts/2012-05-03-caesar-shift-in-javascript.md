---
date: 2012-05-03
title: Caesar shift in JavaScript and CoffeeScript
author: Evan Hahn
layout: post
url: /caesar-shift-in-javascript/
---

_In short: I made a Caesar shift [in JavaScript](https://gist.github.com/2587465) and [in CoffeeScript](https://gist.github.com/2626784)._

For small occasions (like month-anniversaries), I like to make little websites for people that only "unlock" on the right day.

Foolproof security would unlock the page with the server, but I don't want to go through all the effort. I just want to prevent people from opening up "View Source" and seeing what I've written, so I wrote a [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher) to obfuscate the text a bit, which will then reverse when I want the page to unlock.

Go check out my [JavaScript implementation](https://gist.github.com/2587465) and my [CoffeeScript solution](https://gist.github.com/2626784).

Call it like this:

```javascript
caesarShift("Attack at dawn!", 12);
// Returns "Mffmow mf pmiz!"
```

And reverse it like this:

```javascript
caesarShift("Mffmow mf pmiz!", -12);
// Returns "Attack at dawn!"
```

Easy peasy! Enjoy.
