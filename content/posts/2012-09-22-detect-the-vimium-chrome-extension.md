---
date: 2012-09-22
title: Detect the Vimium Chrome extension
author: Evan Hahn
layout: post
url: /detect-the-vimium-chrome-extension/
---

**Update: The API has changed since this post.**

_In short: I made [some code](https://github.com/EvanHahn/Detect-Vimium) to detect Vimium._

[Vimium](http://vimium.github.com/) is among my favorite Google Chrome extensions, and if you're not using it, stop reading this post and go get it! If you're a web developer and you want to do something when a user has Vimium installed, I whipped up a bit of code.

I add two methods to the `document` object: `hasVimium` and `onDetectVimium`. `hasVimium` returns whether the extension is detected, and `onDetectVimium` takes a function and will execute it when Vimium is detected. That's pretty much it.

[Check out the GitHub repository](https://github.com/EvanHahn/Detect-Vimium) for more info.

Detecting Vimium isn't foolproof (and can't be done [with existing methods](http://blog.kotowicz.net/2012/02/intro-to-chrome-addons-hacking.html)). My code looks for an HTML element with the class `vimiumReset`. If it's there, you have Vimium. (This, of course, doesn't work if you have an element classed with `vimiumReset` for some reason.)

It's a tiny bit of code (263 characters when minified)—[go and give it a try](https://github.com/EvanHahn/Detect-Vimium) if you're looking to add Vimium-specific behavior.
