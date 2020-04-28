---
title: Disable ESLint for a file
layout: post
path: /disable-eslint-for-a-file/
---

I love [ESLint](http://eslint.org/) but sometimes you want it to completely ignore a whole file. Add this to the top of your file:

    /* eslint-disable */

It needs to be in `/* this kind */` of comment, not `// this kind`.

And ESLint won't complain about your file any more!
