---
date: 2012-03-16
title: Evil sum and average of a JavaScript array
author: Evan Hahn
layout: post
url: /sum-and-average-of-a-javascript-array/
---

_It's a hack and you shouldn't use it_, but you can use only one line to sum all the values in a JavaScript array.

```javascript
var sum = eval(arrayToSum.join("+"));
```

Basically, this creates a string expression of all of the array values added up (eg, `1+2+3`) and then evaluates it with `eval`. Note that using `eval` is evil if you're not sure what's being passed in—bad things could happen!

You can also use this to calculate an average, which was how I discovered this method:

```javascript
var average = eval(arrayToAverage.join("+")) / arrayToAverage.length;
```
