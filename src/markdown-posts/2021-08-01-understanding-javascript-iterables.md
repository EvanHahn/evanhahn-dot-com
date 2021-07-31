---
title: Understanding JavaScript iterables, iterators, and generators
description: This post aims to explain iterables, iterators, and generators in the JavaScript language.
path: /understanding-javascript-iterables-iterators-and-generators
---

_This is written for programmers who know some JavaScript. No need to be an expert, but you should be comfortable with the language._

_If you're familiar with iterators in Python, a lot of this be familiar._

This post is going to explore three related JavaScript concepts: iterators, iterables, and generators.

But first, there's one piece of prerequisite knowledge we'll need.

## Prerequisite: Symbols

_If you already know how Symbols work in JavaScript, you can skip this section._

Before we can learn about iterables, we need to understand [Symbols][mdn symbols] in JavaScript.

Symbols are a [primitive type](https://developer.mozilla.org/en-US/docs/Glossary/Primitive), just like numbers, strings, booleans, and so on. Symbols are, in my opinion, the weirdest primitive type.

To make one, call the global `Symbol` function:

```js
const mySymbol = Symbol();
```

You can use `typeof` to see that they are, indeed, a primitive type:

```
console.log(typeof mySymbol);
// => "symbol"
```

Already, we're exposed to one weird thing about Symbols: the `Symbol` function is just a function, not a constructor. Usually, if the function starts with a capital letter, you can put `new` in front of it and get a new object—not so with Symbols.

```js
const doesntWork = new Symbol();
// => TypeError: Symbol is not a constructor
```

But the weird (special?) part of symbols is the way they work once you make them.

Symbols are _unique_. That means that no two symbols are the same.

For example, let's try creating two symbols and comparing them:

```js
const symbol1 = Symbol();
const symbol2 = Symbol();

console.log(symbol1 === symbol2);
// => false
```

In the above example, `symbol1` and `symbol2` look _very_ similar, but because they're unique, they're not equal. This is kinda like how `{} !== {}` and `[1, 2] !== [1, 2]`; they might _look_ the same, but they're not.

To be clear, Symbols are equal with themselves (they're not like `NaN`):

```js
const mySymbol = Symbol();

console.log(mySymbol === mySymbol);
// => true
```

Symbols are also _opaque_, which means that you can't get at any underlying data behind them. Just like JavaScript doesn't let you get the memory address of an object, it doesn't let you see beyond the Symbol in front of you.

You can "describe" a Symbol with a string value, but that's only intended for debugging. Descriptions don't really affect how the symbol actually works.

```js
console.log(Symbol("foo") === Symbol("foo"));
// => false
```

([ESLint has a rule](https://eslint.org/docs/rules/symbol-description) that lets you require Symbol descriptions for debugging purposes, which I recommend turning on if you start to use them.)

Okay, so when do you use these weird things? Typically, they're used when you want a truly unique value. (We'll also see how the JavaScript language uses them with iterables soon.)

For example, in [Signal Desktop](https://github.com/signalapp/Signal-Desktop), we want to show a toast when someone starts screensharing in a video call. We wanted a special case in the UI when _you_ were the one screensharing, and we used a `Symbol` to achieve this. Here's a simplified version of what the code looks like:

```js
// NOTE: This is an abbreviated example.
const ME = Symbol("me");

function getCurrentPresenter(activeCall) {
  if (activeCall.isPresenting) {
    return ME;
  } else {
    return activeCall.otherParticipants.find(
      (participant) => participant.isPresenting
    );
  }
}
```

(You can [see the real code here](https://github.com/signalapp/Signal-Desktop/blob/efe5d8642487d9ee0ba04d29c7f3efd1473dfb0e/ts/components/CallingToastManager.tsx#L39).)

There's another special thing about Symbols: you can use them as object keys.

Most of the time, object keys are strings. And when you use a non-string as an object key, it gets turned into a string.

```js
const foo = {};
foo["bar"] = "baz";
foo[123] = 456;

console.log(foo["bar"]);
// => "baz"

console.log(foo["123"]);
// => 456
```

There's one exception to this: Symbols. In addition to strings, you can use Symbols as object keys.

```js
const mySymbol = Symbol("hi");
const foo = {};
foo[mySymbol] = "bar";

console.log(foo[mySymbol]);
// => "bar"

// As you can see, Symbols are not converted to strings.
console.log(foo["hi"]);
// => undefined
```

One last thing and then we're done talking about Symbols: there are many symbols in the standard library. Most (all?) of these Symbols are just properties of the global `Symbol` function.

Just like you can find some numbers like `Math.PI` or `Number.MAX_SAFE_INTEGER`, you can also find things like `Symbol.iterator` or `Symbol.species`.

Typically, these "well-known symbols" are used in tandem with JavaScript language features. For example, [`Symbol.toPrimitive`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive) is used when you want to convert an object to a primitive value. Here's a really simple example of how that's used:

```js
const boringObject = {};
console.log(1 + boringObject);
// => "1[object Object]"

const numberyObject = {
  [Symbol.toPrimitive]() {
    return 2;
  },
};
console.log(1 + numberyObject);
// => 3
```

As you can see, the JavaScript runtime looks at the `Symbol.toPrimitive` function of an object, and calls it when trying to convert something to a primitive value. In a way, this lets you "hook into" part of how the language works.

And because Symbols are unique, there won't be naming collisions. You could imagine an alternate reality where a string property called `"toPrimitive"` was used. But then, if I happened to make a property called `"toPrimitive"` for some other purpose, there might be unintended side-effects. With Symbols, JavaScript gives me a "safe place" to put these functions.

There's more to learn about Symbols, but I think that's everything you need to know about them before we dive into the main topic. If you want to learn even more, [check out MDN][mdn symbols].

## Iterators

Now that we've gotten the prerequisite out of the way, we can begin with our first concept: iterators.

_Iterators_ are just a kind of object. They have to look a certain way, and you can make iterators all by yourself.

In English, an object is an iterator if it has a function called `next`. That function returns an iterator result, which is an object that returns (1) whether the iteration has finished (2) if not finished, a value for that particular iteration.

If you're a TypeScript fan, here's a miminal definition of an iterator interface:

```ts
// NOTE: This is not the full definition.
interface Iterator<T> {
  next():
    | {
        done: false;
        value: T;
      }
    | {
        done: true;
        value: undefined;
      };
}
```

(In practice, there are a few optional things about iterators, which you can see in [TypeScript's official definitions](https://github.com/microsoft/TypeScript/blob/582e404a1041ce95d22939b73f0b4d95be77c6ec/lib/lib.es2015.iterable.d.ts#L43-L480). They won't be relevant for this post.)

Unlike Symbols, iterators are not a new language feature. It's been possible to build iterators since the very early days of JavaScript. They're just an interface that the JavaScript language uses. (Sometimes you'll hear this called the "iterator protocol".) And like most interfaces, someone made them up.

Typically, you don't make your own iterators; you'll use iterables or generators instead—we'll explore those soon. But let's make one, just to prove that we can do it.

Let's make a function that returns a new iterator each time. When we call `next` on this iterator, we'll get a value of `1`, then `2`, then `3`, and so on.

```js
function makeIterator() {
  let value = 0;
  return {
    next() {
      value += 1;
      return {
        done: false,
        value,
      };
    },
  };
}

const iterator1 = makeIterator();
console.log(iterator1.next().value);
// => 1
console.log(iterator1.next().value);
// => 2
console.log(iterator1.next().value);
// => 3

const iterator2 = makeIterator();
console.log(iterator2.next().value);
// => 1
```

I want to restate that _there's nothing special about the way iterators work_. Someone just made this up.

[mdn symbols]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol
