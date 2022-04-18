---
date: 2020-06-11
title: Should you use semicolons in JavaScript?
description: JavaScript doesn't seem to require them. Are they needed?
url: /should-you-use-semicolons-in-javascript
---

_In short: if you forget semicolons, JavaScript will try its best to figure out what you meant. It will usually get it right but not always, so the general consensus is to include them._

_This post was written for JavaScript beginners. No need to be a language expert!_

In JavaScript, you should end most statements with semicolons. This isn't just my stylistic preference—it's right there in the [official language specification document](https://www.ecma-international.org/ecma-262/#sec-automatic-semicolon-insertion):

> Most [JavaScript] statements and declarations must be terminated with a semicolon.

You "must" end most statements with semicolons!

But the spec goes on:

> For convenience, however, such semicolons may be omitted from the source text in certain situations. These situations are described by saying that semicolons are automatically inserted into the source code token stream in those situations.

So they're basically saying that you have to end statements with a semicolon...but if you don't, they'll try to put semicolons in there for you.

When Brendan Eich built JavaScript, he added this kind of error correction to the language. In other words, if you don't do things quite right, the language will do its best to figure out what you really meant. You can see this ethos across JavaScript's foundation. You see it here, in the process of "automatic semicolon insertion".

"Automatic semicolon insertion", sometimes shortened to "ASI", is the process JavaScript uses to append semicolons. Most of the time, it will get it right:

```
// This...
console.log("Hello...")
console.log("...world!")

// ...gets "transformed" to this:
console.log("Hello...");
console.log("...world!");
```

But sometimes, it will do something that you probably didn't mean.

```
// This...
function myFunction() {
  return
    'Hello world!'
}

// turns into this, which is probably not what you meant!
function myFunction() {
  return;
    'Hello world!';
}
```

The rules for ASI are pretty complicated. If you don't understand them perfectly, you might accidentally introduce a bug in your code! In contrast, if you always remember to put semicolons, the rules are pretty simple and your code will be more predictable.

Because of this variability, most JavaScript developers use semicolons. There are tools that can [check your code automatically](https://eslint.org/docs/rules/semi) so that you don't have to remember to do this yourself.

Just like the [debate of "tabs versus spaces"](https://softwareengineering.stackexchange.com/questions/57/tabs-versus-spaces-what-is-the-proper-indentation-character-for-everything-in-e), there is [some controversy here](https://blog.izs.me/2010/12/an-open-letter-to-javascript-leaders-regarding). Most people (including me) think you should use semicolons, but a [minority](https://news.ycombinator.com/item?id=1547647) of developers omit them and rely on ASI. I can't recommend the no-semicolons approach, but I want to point out that some people disagree with my preference.

[This blog post](https://2ality.com/2011/05/semicolon-insertion.html) does a great job explaining the technical details.

In summary: if you omit semicolons, JavaScript will try to automatically insert them. But it might guess wrong, so you should probably just use semicolons.
