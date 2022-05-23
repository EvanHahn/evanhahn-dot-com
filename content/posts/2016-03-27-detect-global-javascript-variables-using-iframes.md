---
date: 2016-03-27
title: Detect global JavaScript variables with iframes
layout: post
url: /detect-global-javascript-variables-using-iframes/
---

_This post assumes you know about global variables in JavaScript and the basics of iframes. This post is meant for browser-based JavaScript, not other environments like Node._

It's pretty easy to accidentally leak global variables in JavaScript. Even the best of us accidentally find ways to fill the `window` object with variables we didn't intend to.

There are a lot of fancy tools that help you find these variables, but if you're looking for a simple oddball solution, you can use iframes.

Here's the finished, annotated code:

```javascript
(function () {
  // Create an iframe and put it in the <body>.
  const iframe = document.createElement("iframe");
  document.body.appendChild(iframe);

  // We'll use this to get a "pristine" window object.
  const pristineWindow = iframe.contentWindow.window;

  // Go through every property on `window` and filter it out if
  // the iframe's `window` also has it.
  console.log(
    Object.keys(window).filter(
      (key) => !Object.prototype.hasOwnProperty.call(pristineWindow, key)
    )
  );

  // Remove the iframe.
  document.body.removeChild(iframe);
})();
```

In short, this looks at all the global variables on _your_ `window` and compares it with the "pristine" `window` inside an iframe. If you have anything the iframe doesn't, it prints it out.

This is a bit of a hack and might not work in every weird edge case, but I've pasted this code snippet into the console and it's been useful!
