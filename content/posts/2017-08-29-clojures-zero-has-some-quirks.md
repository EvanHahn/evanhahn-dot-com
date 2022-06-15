---
date: 2017-08-29
title: Clojure's "zero?" has some quirks
layout: post
url: /clojures-zero-has-some-quirks/
---

_In short, Clojure's `zero?` isn't exactly like `nil?` and `true?` and others. It checks different numeric types and throws if given a non-numeric type._

_This post was written about Clojure 1.8.0._

Clojure has a few functions that do equality checks, like `nil?`, `true?`, `false?`, and `zero?`. The docs all look about the same for these functions. `nil?` "returns true if x is nil, false otherwise" and the rest look similar.

But despite similar documentation, `zero?` is a little bit different from the rest.

Let's start by looking at `true?`. It accepts anything as an argument; a boolean, a string, whatever.

```clojure
(true? true)   ;; true
(true? false)  ;; false
(true? "str")  ;; false
```

In contrast, `zero?` throws an error if the argument isn't a number.

```clojure
(zero? 0)      ;; true
(zero? 42.0)   ;; false
(zero? "str")  ;; throws java.lang.ClassCastException
```

This was a little surprising to me! It's not documented and it also doesn't match the other equality checkers.

`zero?` is also a little smarter about different numeric types. `zero?` handles cases that a simple equality check doesn't.

```clojure
(= 0 0)      ;; true
(= 0 0.0)    ;; false
(= 0 "str")  ;; false

(zero? 0)    ;; true
(zero? 0.0)  ;; true
(zero? "0")  ;; throws java.lang.ClassCastException
```

You could write a version of `zero?` that works like `nil?`, which won't throw on non-numeric input but will still work for various number types.

```clojure
(defn safe-zero? [x]
  (and (number? x) (zero? x)))

(safe-zero? 0)      ;; true
(safe-zero? 0.0)    ;; true
(safe-zero? "str")  ;; false
```

`zero?` isn't vastly more complicated than I expected, but it's a little more nuanced than I thought at first glance.
