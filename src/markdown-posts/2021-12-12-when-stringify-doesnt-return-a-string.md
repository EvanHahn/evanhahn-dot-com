---
title: When stringify doesn't return a string
description: "JavaScript's JSON.stringify() doesn't always return a string."
path: /when-stringify-doesnt-return-a-string
---

_This post is for developers who are familiar with JavaScript's [`JSON.stringify`][mdn]._

[`JSON.stringify`][mdn] is an often-used part of JavaScript's standard library. As its name suggests, it converts JavaScript values and objects to strings. For example:

```js
JSON.stringify({ foo: "bar" });
// => '{"foo":"bar"}'

JSON.stringify(123);
// => '123'
```

But many parts of JavaScript have gotchas, and this function is no exception. You might imagine a function called "stringify" to always return a string...but it doesn't!

For example, if you try to stringify `undefined`, it returns `undefined`—not a string!

```js
JSON.stringify(undefined);
// => undefined
```

I've broken this post into two parts. In part 1, we'll enumerate the cases where `JSON.stringify` doesn't return a string. In part 2, we'll talk about how to avoid these pitfalls.

## When doesn't stringify return a string?

_In short: it returns `undefined` if serializing `undefined`, a function, or a symbol at the top level. It throws errors if trying to serialize circular references or BigInts. There are also a few other edge cases. TypeScript doesn't help us here._

### When it returns `undefined`

I think it's surprising that `JSON.stringify` can ever return anything other than a string. But it can return `undefined` in 5 cases:

1. Trying to serialize `undefined` at the top level returns `undefined`.

   ```js
   JSON.stringify(undefined);
   // => undefined
   ```

2. Trying to serialize functions also returns `undefined`. This is true for "regular" functions, arrow functions, async functions, and generator functions. It's even true for functions that have properties dangling off of them.

   ```js
   JSON.stringify(function foo() {});
   // => undefined

   JSON.stringify(() => {});
   // => undefined

   function bar() {}
   bar.someProperty = 123;
   JSON.stringify(bar);
   // => undefined
   ```

3. Trying to serialize symbols also returns `undefined`.

   ```js
   JSON.stringify(Symbol("computers were a mistake"));
   // => undefined
   ```

4. Objects with a `toJSON` function will be run instead of trying to serialize them normally. But if `toJSON` returns one of the values above, trying to serialize it at the top level will cause `JSON.stringify` to return `undefined`.

   ```js
   JSON.stringify({ toJSON: () => undefined });
   // => undefined

   JSON.stringify({ ignored: true, toJSON: () => undefined });
   // => undefined

   JSON.stringify({ toJSON: () => Symbol("heya") });
   // => undefined
   ```

5. You can pass a second argument, called the "replacer", which changes the serialization logic. If this function returns one of the values above for the top level, `JSON.stringify` will return `undefined`. (As an aside, I've never seen the replacer argument used outside of documentation.)

   ```js
   JSON.stringify({ ignored: true }, () => undefined);
   // => undefined

   JSON.stringify(["ignored"], () => Symbol("hello"));
   // => undefined
   ```

Note that many of these really only affect serialization at the top level. For example, `JSON.stringify({foo: undefined})`, returns the string `"{}"`, which is less surprising.

I also want to mention that [TypeScript's type definitions][tslib] are incorrect here. For example, [the following code snippet compiles just fine](https://www.typescriptlang.org/play?ts=4.4.4#code/MYewdgzgLgBBAWICuAbAJgORFAwiAtgA4CWKApgFxxQBOxYA5jALwwBSAygPIYB00dRsQBmATwAUSMGjLD6ZNAEoA3EA):

```ts
// This shouldn't work, but it does!
const result: string = JSON.stringify(undefined);
```

In part 2, we'll discuss how to update TypeScript's definitions for correctness.

### When it throws an error instead

`JSON.stringify` can also run into problems which can cause it to throw an error. There are four times this can happen under normal conditions:

1. Circular references cause a `TypeError` to be thrown.

   ```js
   const a = {};
   const b = { a };
   a.b = b;

   JSON.stringify(a);
   // => TypeError: cyclic object value
   ```

   (Note that these error messages might look slightly different depending on where you're running this. For example, Firefox's error message is different from Chrome's.)

1. [BigInts][bigint] cannot be serialized with `JSON.parse`. These also cause a `TypeError`.

   ```js
   JSON.stringify(12345678987654321n);
   // => TypeError: BigInt value can't be serialized in JSON

   JSON.stringify({ foo: 456n });
   // => TypeError: BigInt value can't be serialized in JSON
   ```

1. Objects with a `toJSON` function will be run. If those functions throw an error, that will bubble up to the caller.

   ```js
   const obj = {
     foo: "ignored",
     toJSON() {
       throw new Error("Oh no!");
     },
   };

   JSON.stringify(obj);
   // => Error: Oh no!
   ```

1. You can pass a second argument, called the "replacer". If this function throws an error, it will bubble up.

   ```js
   JSON.stringify({}, () => {
     throw new Error("Uh oh!");
   });
   // => Error: Uh oh!
   ```

Personally, I don't think these are _too_ surprising—lots of stuff in JavaScript throws errors. But these are cases where it doesn't return a string.

Now that we've seen when `JSON.stringify` doesn't return a string, let's talk about what we can do to avoid the problems.

## How to avoid the pitfalls

There's no generic advice about how to address these pitfalls, so I'll cover a few common cases.

### Handle circular references

From my personal experience, `JSON.stringify` is most likely to throw an errors when passed circular references.

If this is a common issue for you, I recommend the [json-stringify-safe](https://www.npmjs.com/package/json-stringify-safe) package, which handles this case well.

```js
const stringifySafe = require("json-stringify-safe");

const a = {};
const b = { a };
a.b = b;

JSON.stringify(a);
// => TypeError: cyclic object value

stringifySafe(a);
// => '{"b":{"a":"[Circular ~]"}}'
```

### Wrap it

You may want to wrap `JSON.stringify` with your own custom function. You can decide what you want it to do. Should errors bubble up? What should happen if `JSON.stringify` returns `undefined`?

For example, [Signal Desktop has a function called `reallyJsonStringify`][really] that always returns a string for debugging, no matter what. It looks like this:

```js
// Note: this is modified slightly from the original source.
function reallyJsonStringify(value) {
  let result;
  try {
    result = JSON.stringify(value);
  } catch (_err) {
    // If there's any error, treat it like `undefined`.
    result = undefined;
  }

  if (typeof result === "string") {
    // It's a string, so we're good.
    return result;
  } else {
    // Convert it to a string.
    return Object.prototype.toString.call(value);
  }
}
```

Again, you can decide how you want your wrapper to work.

### A note on TypeScript's types

If you're a TypeScript user, you might be surprised to know that [TypeScript's official definitions for `JSON.stringify`][tslib] are incorrect here. They effectively look like this:

```ts
// Note: this is simplified.
interface JSON {
  // ...
  stringify(value: any): string;
}
```

Unfortunately, this is [a long-standing issue](https://github.com/microsoft/TypeScript/issues/18879) without a perfect solution.

You can try to patch `JSON.stringify`'s types, but every solution has drawbacks in some way. I would recommend defining your own wrapper with custom types and using that. For example, here's what [Signal Desktop's `reallyJsonStringify`][really] looks like:

```ts
function reallyJsonStringify(value: unknown): string {
  // ...
```

## Summary

In summary:

- `JSON.stringify` can sometimes return `undefined`, not a string
- `JSON.stringify` can sometimes throw an error
- You can get around this by wrapping the function in different ways

I hope this post helped you learn about another one of JavaScript's quirks!

[mdn]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
[tslib]: https://github.com/microsoft/TypeScript/blob/7615547d426d9e9a633326937e8936b1083638c0/src/lib/es5.d.ts#L1089-L1102
[bigint]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
[really]: https://github.com/signalapp/Signal-Desktop/blob/0da0b5fb3add8f2c969ff213baab90f9dae1a92b/ts/util/reallyJsonStringify.ts
