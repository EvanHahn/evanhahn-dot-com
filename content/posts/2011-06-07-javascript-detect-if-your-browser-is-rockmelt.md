---
date: 2011-06-07
title: Detect the RockMelt browser from JavaScript
author: Evan Hahn
layout: post
url: /javascript-detect-if-your-browser-is-rockmelt/
---

This is fairly trivial, but came in handy during my internship at [RockMelt](https://en.wikipedia.org/wiki/Rockmelt). Hope it helps all you RockMelt developers.

```js
function isRockMelt() {
  return navigator.userAgent.indexOf("RockMelt") !== -1;
}
```
