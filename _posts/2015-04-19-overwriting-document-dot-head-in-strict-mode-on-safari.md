---
title: Overwriting document.head in strict mode on Safari
layout: post
permalink: /document-dot-head-on-safari-strict-mode/
---
_In short: you can't overwrite `document.head` in strict mode if you're on Safari, so be careful with your polyfills._

This is a _pretty niche_ post, but I ran into this problem today.

`document.head` is a convenient reference to the `<head>` element that you can reference from JavaScript. Unfortunately, like many convenient features, [not all browsers support it](https://developer.mozilla.org/en-US/docs/Web/API/Document/head#Browser_compatibility).

Luckily, it's an easy fix. Mathias Bynens has [a helpful post](https://mathiasbynens.be/notes/document-head) where he shows how to polyfill it. It's a one-liner:

```
// Credit to Mathias Bynens for this line!
document.head = document.head || document.getElementsByTagName('head')[0];
```

This has the nice benefit that it works in all browsers, old and new..._except for Safari when you're in strict mode_.

Safari (both on desktop and on iOS) will throw an error when you try to overwrite `document.head` if you're in strict mode. This means that the following function will always throw an error:

```
function polyfillDocumentHead() {
  'use strict';
  document.head = document.head || document.getElementsByTagName('head')[0];
}
```

Now that we know that this is an issue, we have a couple of options.

1. We can use a second example from the original blog post:

        // Credit to Mathias Bynens again!
        document.head || (document.head = document.getElementsByTagName('head')[0]);
   This will only reassign it if it isn't defined, which shouldn't happen on Safari. Unfortunately, linters will complain about this line by default (that includes JSLint, JSHint, and ESLint). You can use your favorite linter's "don't lint this line" feature or disable the checks for that entirely.

2. You can never reassign `document.head` and simply assign it to a new variable.

        var head = document.head || document.getElementsByTagName('head')[0];
   If you're encountering this problem in a CommonJS environment (like Browserify or Webpack), you can use my new [document.head npm module](https://github.com/EvanHahn/document.head). It works just like the above, but it might save you from having to write the line above every single time. You use it like this:

        var head = require('document.head');
   The whole module is one line!

3. We could sidestep this problem entirely by using a selector library like jQuery.

And there you have it: properly shimming `document.head` when you're in strict mode and on Safari! I do not expect this niche post to make it to the front page of anything other than this blog.