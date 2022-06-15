---
date: 2012-10-14
title: Smoothing out setTimeout in CoffeeScript
author: Evan Hahn
layout: post
url: /smoothing-out-settimeout-in-coffeescript/
---

_In short: I'd recommend that you define your own function. See solution 3._

CoffeeScript's syntax is mostly cleaner than JavaScript's, but it's a tad uglier in some spots. One of these blemishes happens with the `setTimeout` function:

```coffeescript
setTimeout ->
  # multi-line callbacks
  # make the next line a little ugly
, 5000
```

In this post, I'll quickly explore a few solutions. Note that these problems and solutions also happen with similar functions, like `setInterval`.

## Solution 1: make them one-liners

This doesn't work in all cases, but if your callback is a one-liner, the code isn't so bad:

```coffeescript
setTimeout (-> say("hello world")), 5000
```

Of course, this only happens if your callback is one line. And it's not _that_ pretty.

## Solution 2: define callback variables

You can also define a callback variable, like so:

```coffeescript
callback = ->
  # multi-line callbacks
  # are less ugly now!
setTimeout(callback, 5000)
```

## Solution 3: make a new function

One could simply define a function that does the same thing but switches the arguments.

```coffeescript
delay = (time, fn, args...) ->
  setTimeout fn, time, args...
```

Then you can call it like this:

```coffeescript
delay 5000, ->
  # multi-line callbacks aren't
  # ugly with a new function!
```

Some libraries (such as [Underscore](https://underscorejs.org/#delay) and [Sugar](https://sugarjs.com/api/Function/delay)) already define such a function, which you can use if you like how that looks. Because defining your own function is so easy, I'd recommend doing that, because it probably looks better than whatever the library supports.

As always, when passing arguments to the callback, you need [a shim](https://developer.mozilla.org/en-US/docs/DOM/window.setTimeout#Callback_arguments) if you want things to work in pesky Internet Explorer.

## Solution 4: mess with the existing setTimeout function

This one is a little weird and I kind of don't recommend it...but here it is anyway.

You can modify `setTimeout` and allow _either order_ of arguments. You can do `setTimeout(fn, 5000)` _or_ `setTimeout(5000, fn)`. Either order works. To do that, we save a reference to the "old" `setTimeout` and then redefine `setTimeout`. In our new `setTimeout`, we swap the first and second arguments if it's in the "new" style. Check this out:

```coffeescript
setTimeoutOld = setTimeout

@setTimeout = ->
  if typeof arguments[1] is 'function'  # swap if we should
    [arguments[0], arguments[1]] = [arguments[1], arguments[0]]
  return setTimeoutOld.apply(this, arguments)
```

This can then be called however you like:

```coffeescript
setTimeout ->
  # old method
, 5000

setTimeout 5000, ->
  # new method
```

I don't love this solution because it'll confuse people who aren't familiar with your redefinition, which will likely create more problems than it'll solve. It's also worse than defining `delay` in terms of both memory and speed.

## My recommendation

I'd recommend that you make your own function and call it something like `delay`.
