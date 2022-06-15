---
date: 2012-07-01
title: CoffeeScript's existential operator
author: Evan Hahn
layout: post
url: /coffeescripts-existential-operator/
---

I was perusing CoffeeScript's documentation when I found a bit I'd overlooked: it's got an existential operator. The existential operator that allows you to access a variable but _only if it exists_. Without it, you'd write code like this:

```coffeescript
if player and player.hat?
  hatColor = player.hat.color
else
  hatColor = undefined
```

With CoffeeScript's existential operator, you can avoid that.

```coffeescript
hatColor = player?.hat?.color
```

This can shorten your code by a fair bit.
