---
date: 2015-05-05
title: How to clear all inline styles from an HTML element
layout: post
url: /clear-all-inline-styles-from-an-element/
---

_In short: set the styles to the empty string to clear all styles (for example, `myElement.style.cssText = "";`)._

As a front-end developer at [Braintree](https://www.braintreepayments.com/), I deal with the DOM a lot. For reasons I could bore you with, I needed to use JavaScript to clear all inline styles (but not styles applied from CSS) from an HTML element.

After trying a few less-than-ideal solutions, I found a one-liner that solved the problem: all I had to do was set its `cssText` to the empty string, like this:

```javascript
myElement.style.cssText = "";
```

That cleared all inline styles! As far as I can tell, this worked in every browser I tested (though I didn't test less than IE8).

Hopefully this little trick can help you.
