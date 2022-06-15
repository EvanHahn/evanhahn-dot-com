---
date: 2013-08-12
title: Gribbagrab your resources
author: Evan Hahn
layout: post
url: /gribbagrab-your-resources/
---

**This project is outdated.**

_In short: I built [Gribbagrab](https://github.com/EvanHahn/Gribbagrab) to asynchronously load JavaScript and CSS._

I'm going to be honest: I respectfully dislike RequireJS. Nobody _likes_ AMD, they just accept it. It's fugly. It requires extra work when loading non-AMD modules. It's big and powerful.

CommonJS implementations like Browserify are cool, but sometimes you _want_ to load your resources asynchronously. I'd rather load jQuery from a CDN than from something I concatenated. I'd also like fallback support in case the CDN is inaccessible for some reason.

And then there are simple loaders like [Toast](https://github.com/pyrsmk/toast) or my very own [ScriptInclude](https://github.com/EvanHahn/ScriptInclude). They're useful for small projects, but not ones with big dependencies. In ScriptInclude's case, for example, dependencies throw you into Callback Hell. Ain't nobody got time for that.

And then there's my favorite: _script tags_. The old-fashioned way. They're okay too, but (1) `async` and `defer` are a nightmare (2) you can't load CSS asynchronously (3) it's nowhere near as cool, let's face facts.

So, in a belligerent rage, I built Gribbagrab. [Go give it a whirl.](https://github.com/EvanHahn/Gribbagrab)
