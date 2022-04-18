---
date: 2020-04-29
title: How to reverse an array in JavaScript
description: "myArray.concat().reverse() should work."
url: /how-to-reverse-an-array-in-javascript
---

To reverse an array in JavaScript, clone it with [`concat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat) and then reverse the clone with [`reverse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse).

```js
const myArray = [1, 2, 3];
const reversed = myArray.concat().reverse();

console.log(reversed);
// => [3, 2, 1]
```

If you want to reverse the array in place, don't call `concat`.

```js
const myArray = [1, 2, 3];
myArray.reverse();

console.log(myArray);
// => [3, 2, 1]
```

That's it!
