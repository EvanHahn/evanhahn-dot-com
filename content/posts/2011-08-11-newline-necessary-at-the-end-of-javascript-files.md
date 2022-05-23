---
date: 2011-08-11
title: Newline necessary at the end of JavaScript files?
description: "When in doubt: yes."
author: Evan Hahn
layout: post
url: /newline-necessary-at-the-end-of-javascript-files/
---

_In short: When in doubt, end your JavaScript files with a newline._

I committed some JavaScript code to GitHub. In the commit page, GitHub said "No newline at end of file". I did some research -- why are things this way?

It comes from the [C standard](http://c0x.coding-guidelines.com/5.1.1.2.html) where you're tasked to end all files with a newline (and you're not allowed to escape that newline with a `\`). It makes sense; when the preprocessor concatenates files (or whatever the hell it does), a newline prevents two instructions from piling up on the same line.

There are cases in JavaScript where it can be an issue as well, but not as many. For example, this is perfectly valid JavaScript, which could happen in file concatenation:

```javascript
return 12; }var x = 10;
```

But don't worry -- bad things can still happen. For example, I once had a file that ended in a comment. It broke everything when I combined them. This could happen, and it's no good:

```javascript
x = 0; // x is now 0function doStuff() {
```

Or you could forget to end your file with a semicolon (or a `}`). JavaScript won't be able to figure _this_ one out:

```javascript
x = 0function doStuff() {
```

So, to conclude: When in doubt, end your JavaScript files with newlines. If the last line is an instruction that has an obvious end (ends in a `;` or a `}`), you don't have to end it in with a newline. If the last line is a comment or has no ending, you should put a newline. And if you only have one JavaScript file, you don't have to worry at all.
