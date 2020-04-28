---
title: "Chrome and Node have a method called &#8220;Object.is&#8221;"
author: Evan Hahn
layout: post
path: /chrome-and-nodes-have-a-method-called-object-is-and-its-weird/
---

**Update: I found that this is part of the ECMAScript 6 standard. [Firefox 22 supports this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) too. Some of the stuff in this post is wrong.**

_In short: `Object.is` is an undocumented method only supported by V8 JavaScript engines, so don't use it in the browser. `Object.is(a, b)` is identical to `a === b`, except that `Object.is(NaN, NaN)` is true where `NaN === NaN` is not._

I'm the kind of person that goes into Chrome's Web Inspector, types `window` into the console, and pokes through the massive list to see what he can find. Today, I found an interesting method in `Object`: a method called `is`. I'd never heard of it before and it's on a very important object in JavaScript, so I did some sleuthing.

The first thing I found (or, rather, _didn't_ find) was that it's undocumented. It's not in [MDN's reference](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object), it's not in the [ECMAScript 5.1 spec](http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf), it's not in the [ECMAScript 6 draft](http://wiki.ecmascript.org/lib/exe/fetch.php?id=harmony%3Aspecification_drafts&cache=cache&media=harmony:working_draft_ecma-262_edition_6_9-27-12-nomarkup.pdf), nor could I find anything when searching around.

The second thing I found was that it's nonstandard. It's in [Chrome](https://evanhahn.com/wp-content/uploads/2012/10/objis_chrome.png) and in [Node](https://evanhahn.com/wp-content/uploads/2012/10/objis_node.png), but not in [Firefox](http://evanhahn.com/wp-content/uploads/2012/10/objis_firefox.png) or [Opera](http://evanhahn.com/wp-content/uploads/2012/10/objis_opera.png) or [IE8](http://evanhahn.com/wp-content/uploads/2012/10/objis_ie8.png) (I didn't try anything higher than IE8). It's not just some seemingly-undiscovered feature. It also _won't work_ a lot of the time.

I started poking around with how it works, and I realized pretty quickly that it looked a lot like the `===` operator. The function would return `true` given 5 and 5, or "hello" and "hello". It would return `false` given two arrays, or two objects, or 5 and 8. It looked a lot like a functional equivalent of `===`, so I decided to test it.

I started by writing a function that would test my hypothesis. It looked like this:

    // Test my hypothesis that Object.is(a, b) is the same as a === b.
    // Log an error if they're different.
    function test(a, b) {
      if ((Object.is(a, b)) !== (a === b)) {
        console.error('Object.is is different from === for ' + a + ' and ' + b);
      }
    }

I then hit it with [4,009,043 tests](https://gist.github.com/3873495). I tried throwing pairs of numbers at it, random strings, booleans, objects, arrays, and the "weird" types: `undefined`, `null`, `Infinity`, and `NaN`. The output was just this:

<pre><span style="color:red">Object.is is different from === for NaN and NaN</span>
Ran 4009043 tests.</pre>

Only one difference in over four million tests. In hindsight, it's kind of the one to expect. Here's the difference:

    NaN === NaN;          // => false
    Object.is(NaN, NaN);  // => true

From my findings, that's the only difference. If you'd like [grab my tests](https://gist.github.com/3873495) and give them a run.

So...when should you use `Object.is`? Almost never.

You should use `Object.is` if you're _only_ using Chrome or Node and you need to check the equivalence of two variables _and_ they could be `NaN`. But because nobody's ever heard of this function (it seems), you should find a different solution.

Of course, I could be wrong about a lot of this; after all, it's undocumented!
