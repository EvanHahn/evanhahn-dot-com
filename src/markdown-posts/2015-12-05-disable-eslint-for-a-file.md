---
title: Disable ESLint for a file
description: "Put /* eslint-disable */ at the top of the file."
layout: post
path: /disable-eslint-for-a-file/
---

I love [ESLint](https://eslint.org/) but sometimes you want it to completely ignore a whole file. Add this to the top of your file:

    /* eslint-disable */

It needs to be in `/* this kind */` of comment, not `// this kind`.

And ESLint won't complain about your file any more!
