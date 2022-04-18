---
date: 2011-06-01
title: Randomly generate either -1 or 1 in JavaScript
author: Evan Hahn
layout: post
url: /randomly-generate-either-1-or-1/
---

I was coding something and wanted to generate either `-1` or `1`, and nothing else. I was trying to find a quick way to do it, and I think this is the best way (example is in JavaScript):

```js
const foo = 1 - 2 * Math.round(Math.random());
```

While this example is in JavaScript, it shouldn't be too complicated to translate into whatever other language you're using, so long as it has a `round()` function and a `random()` function. (Keep in mind that `Math.random()` generates a number between 0 and 1; this is probably the only difference between languages.)

Hope it helps!
