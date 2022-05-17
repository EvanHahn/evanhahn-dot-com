---
date: 2015-12-05
title: Disable ESLint for a file
description: "Put /* eslint-disable */ at the top of the file."
url: /disable-eslint-for-a-file/
---

I love [ESLint](https://eslint.org/) but sometimes you want it to completely ignore a whole file. Add this to the top of your file:

```js
/* eslint-disable */
```

It needs to be in `/* this kind */` of comment, not `// this kind`.

And ESLint won't complain about your file any more!

There are other ways to ignore files with ESLint, too. Check out the ["Ignoring Code" page on ESLint's docs](https://eslint.org/docs/user-guide/configuring/ignoring-code).
