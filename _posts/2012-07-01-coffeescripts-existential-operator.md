---
title: 'CoffeeScript&#8217;s existential operator'
author: Evan Hahn
layout: post
permalink: /coffeescripts-existential-operator/
---
I was perusing CoffeeScript's documentation when I found a bit I'd overlooked: it's got an existential operator. The existential operator that allows you to access a variable but *only if it exists*. Without it, you'd write code like this:

    if player and player.hat?
        hatColor = player.hat.color
    else
        hatColor = undefined

With CoffeeScript's existential operator, you can avoid that.

    hatColor = player?.hat?.color

This can shorten your code by a fair bit.
