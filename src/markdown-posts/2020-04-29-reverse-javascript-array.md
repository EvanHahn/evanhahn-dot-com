---
title: How to reverse an array in JavaScript
path: /how-to-reverse-an-array-in-javascript
---

To reverse an array in JavaScript, clone it with [`concat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat) and then reverse the clone with [`reverse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse).

```
const myArray = [1, 2, 3];
const reversed = myArray.concat().reverse();

console.log(reversed);
// => [3, 2, 1]
```

If you want to reverse the array in place, don't call `concat`.

```
const myArray = [1, 2, 3];
myArray.reverse();

console.log(myArray);
// => [3, 2, 1]
```

That's it!
