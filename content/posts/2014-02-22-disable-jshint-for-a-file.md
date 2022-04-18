---
date: 2014-02-22
title: Disable JSHint for a file
description: 'Put "// jshint ignore: start" at the top of the file.'
layout: post
url: /disable-jshint-for-a-file/
---

I like [JSHint](http://jshint.com/), but [sometimes](http://js1k.com/) you just want it to _completely_ shut up. Add this to the top of your file:

```js
// jshint ignore: start
```

And you're done! JSHint won't complain about your file any more. (Don't take this as an excuse to write bad code!)

See also: [how to disable ESLint for a file](/disable-eslint-for-a-file/).
