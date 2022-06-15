---
date: 2012-08-12
title: JavaScript/CoffeeScript sleepsort
author: Evan Hahn
layout: post
url: /javascript-sleepsort/
---

I came across the sleepsort today, which is a humorous sorting algorithm. Basically, it sleeps for _n_ milliseconds, where _n_ is each number. Smaller numbers will only sleep briefly and larger ones will sleep longer, so it outputs in the right order!

I was "inspired" and [implemented it in JavaScript](https://gist.github.com/3330517):

```javascript
function sleepsort() {
  var i = arguments.length;
  while (i--) {
    setTimeout(
      function (n) {
        console.log(n);
      },
      i,
      arguments[i]
    );
  }
}
```

I also implemented it in CoffeeScript:

```coffeescript
sleepsort = ->
  setTimeout ((n) => console.log n), number, number for number in arguments
```

Perhaps it's obvious that it's not a "real" sort. It's clearly very slow for large numbers and doesn't even work for negative numbers. Still a fun little exercise!
