---
date: 2011-10-11
title: '"Traditional" for loops in CoffeeScript'
author: Evan Hahn
layout: post
url: /traditional-for-loops-in-coffeescript/
---

[CoffeeScript][1]'s for-in loops iterate over all of the elements in an array. I wanted to do a "traditional" loop, where I went through the loop by number. CoffeeScript has no way to do this using its `for` statement, but you can do it:

```coffeescript
i = 0
while (i <= 10)
  console.log("#{i} is a great number.")
  i += 1
```

This just requires that you remember that `for` is just syntactic sugar for `while`.

[1]: https://coffeescript.org
