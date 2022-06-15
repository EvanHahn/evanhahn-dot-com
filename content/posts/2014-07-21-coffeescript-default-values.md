---
date: 2014-07-21
title: A quick romp through default values in CoffeeScript
layout: post
url: /default-values-in-coffeescript/
---

_This was last updated for CoffeeScript 1.7.1._

Imagine that this sentence is a beautifully-crafted, flowing intro paragraph. "Wow, what a great introduction to this CoffeeScript guide," you whisper. Now, let's quickly explore all of CoffeeScript's ways to set default values.

_Before you start, make sure you know about undefined, null, and falsy values in JavaScript. [Check this out](http://www.sitepoint.com/javascript-truthy-falsy/) if you need help._

## As a function parameter

To quote the CoffeeScript documentation, functions can have "default values for arguments, which will be used if the incoming argument is missing (`null` or `undefined`)." Here's how you might use it:

```coffeescript
shootLaserBeam = (color = "red") ->
  # ...
```

Now, if the first parameter is `undefined` or `null`, it'll be defined as the string "red". If it's anything else (even falsy values like 0 and the empty string), it won't be set to the default value.

## Using the existential operator

CoffeeScript's existential operator can be used to set default values.

```coffeescript
sendThreateningMessageFromUFO = (options) ->
  options.message ?= "I will hold your pathetic planet hostage"
  # ...
```

You can also set another variable using a sexier version of a ternary operator.

```coffeescript
# this...
message = evilMessage ? "Exterminate!"

# ...is equivalent to this:
if evilMessage?
    message = evilMessage
else
    message = "Exterminate!"

# ...or this:
message = if evilMessage? then evilMessage else "Exterminate!"
```

The ternary operator makes sure that the variable isn't `undefined` and isn't `null`.

You'll get a compile error for if you try to define not-yet-defined variables. For example, this gives a compiler error:

```coffeescript
someUndefinedVariable ?= "I will destroy your worlds"
```

This makes sense, right? Why set a default value for something that's totally undefined? If you, for some reason, need to do this, you can use the existential operator on the variable:

```coffeescript
someUndefinedVariable = "Flee, puny humans" unless someUndefinedVariable?
```

## Discarding falsy values, too

If you want to set defaults for _any_ falsy value (not just `undefined` and `null`), you can use `or=`.

```coffeescript
angryAliens = false
angryAliens or= true
# angryAliens is now true

# ||= is totally equivalent to or=
ufoCount = 0
ufoCount ||= 50
# ufoCount is now 50

# compare it to the existential operator:
numberOfAliens = 0
numberOfAliens ?= 1000
# numberOfAliens is still zero
```

The important takeaway here: `?=` only discards `null` and `undefined`, where `or=` filters any falsy value.

## For undefined only

Most of CoffeeScript either tests against falsy values or "is it `null` or `undefined`". You might want to set things _only_ if it's `undefined` and nothing else, not even `null`. Here's how you might do that:

```coffeescript
cropCircleCount = 69 if cropCircleCount is undefined
```

Now, if `cropCircleCount` is `null` or anything falsy other than `undefined`, it'll stay that way.

While this isn't as built-into-the-language as some of the features above, the fact that it's on one line is a _little_ nicer than regular JavaScript. `undefined` is an undefined keyword in ECMAScript 3 and below. This means that this JavaScript fails on older browsers:

```javascript
var isUndefined = window.myFunVariable === undefined;
// This fails on older browsers because "undefined" is, well, undefined.
```

CoffeeScript makes sure that this works in older browsers (by compiling `undefined` to `void 0` to reliably produce an undefined value).

## A summary

And now, a summary.

- Use default parameters if it's a function parameter. Only sets to default if the value is `null` or `undefined`.
- Use `?=` to set a value to a default if the value is `null` or `undefined`.
- Use `or=` (or `||=`) to reject other falsy values like 0 and the empty string.

Go forth and set your CoffeeScript defaults, friend.
