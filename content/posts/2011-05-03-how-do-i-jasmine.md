---
date: 2011-05-03
title: "How do I Jasmine: a tutorial"
author: Evan Hahn
layout: post
url: /how-do-i-jasmine/
---

_[Jasmine](https://jasmine.github.io/) is a behavior-driven testing framework for JavaScript. This tutorial is intended for people that are familiar with some more advanced JavaScript features (callbacks, basic object-oriented programming) and want to start testing. This tutorial was last updated for Jasmine version 1.2.0, which means **this tutorial is fairly out of date**._

_I also wrote a book about this! If you want more detail, take a look at [*JavaScript Testing with Jasmine*](https://shop.oreilly.com/product/0636920028277.do)._

## What is Jasmine?

Jasmine is an automated testing framework for JavaScript.

Testing in a nutshell: basically, your program will have a bunch of functions and classes. You want to make sure that, no matter what you throw at them, they'll perform how you want them to. For example, this function should always return a string that says `"hello"` in it. Testing ensures that everything goes down exactly how you planned. It's like you're a god...but it's probably a little more boring because it's code.

Jasmine is a testing framework for JavaScript. Let's learn all of its secrets.

## Get Jasmine

First thing you need to do is get Jasmine on your computer. Easy peasy. [Grab the latest standalone version](https://github.com/jasmine/jasmine/releases), unzip it, and empty out the `/spec` and `/src` directories. They're examples, you don't need 'em.

Bam. It's Jasmine time.

## Beginner's example: hello world

### What you want to test

Let's say you're making a program that has one function, which says hello to the _entire world_. It would look like this:

```javascript
function helloWorld() {
  return "Hello world!";
}
```

### The spec

Alright. You're pretty sure this works, but you want to run it by Jasmine to see what she thinks. How do we do that?

Easy peasy. First, put this lovely file into the `src` directory. Let's call it `HelloWorld.js`. For this example, that's all you need to put in the `src` directory.

Okay, next is the spec. Easy peasy. It's gonna look like this; I'll explain it in just a minute.

```javascript
describe("Hello world", function () {
  it("says hello", function () {
    expect(helloWorld()).toEqual("Hello world!");
  });
});
```

Okay, so this is a little less easy peasy, but it's not awful. Lemme explain:

`describe('Hello world'`... is what we call a **suite**. This is basically a component of your application; this could be a class or just a slew of functions. This suite is called "Hello world"; it's English, not code.

Inside of that (technically inside of the anonymous function, _nerd_), you've got the `it()` function. This is called a **spec**. It's a JavaScript function that says what some piece of your program should do. It says it in plain English ("says hello") and in code. For each suite, you can have a bajillion specs for the bajillion tests you want to do.

In this case, we're testing if `helloWorld()` does indeed equal `'Hello world!'`. This check is called a **matcher**. There a bunch of them and you can also define your own if you please.

Save this file as `HelloWorldSpec.js` in the `/spec` directory.

### The spec runner

Okay, that was the hard part. This next bit is easy peasy.

Go edit `SpecRunner.html`. This file just does the tests. No big deal. It should include Jasmine's code and then it should include the source files, and then the spec files. Just edit the `SpecRunner.html` that's included. Put your source files under "include source files here" and your spec under "include spec files here".

When you open this page, it'll be like, "YOU GOT THIS! _Nice._" Except it's a bit more technical.

Go into the `helloWorld()` function and make it say something else (like curse words). When you open the spec runner page, Jasmine will be _furious_. That's what you want; Jasmine should tell you when you've done something you didn't want to.

## More matchers

In the previous example, I was checking to see if `helloWorld()` was indeed equal to `'Hello world!'`. I used the function `toEqual()`. It was all fine and dandy.

But what if I wanted to expect it to contain the word "world", but I don't give a damn what else is in there? I just want it to say "world". Easy peasy: I just need to use a different matcher. Have yourself a look.

```javascript
describe("Hello world", function () {
  it("says world", function () {
    expect(helloWorld()).toContain("world");
  });
});
```

Instead of expecting something to be exactly "Hello world!", I'm now just expecting it to contain "world". Easy peasy. It even reads like English!

There a [few other built-in matchers](https://github.com/pivotal/jasmine/wiki/Matchers) as well: `toBeNull()` expects a variable to be null, `toBeTruthy()` expects something to be `true`, et cetera. The documentation talks about them. Let's talk about a couple of them:

`expect(x).not.toEqual(y)` is how you check non-equivalency. It's not its own function (anymore). The `.not` operator thing does all of that for you.

`toBe()` versus `toEqual()`: `toEqual()` checks equivalence. `toBe()`, on the other hand, makes sure that they're the _exact same object_.

## Make me my own matcher

So it's nice that Jasmine has all of these built-in matchers, but you're not a slave -- you wanna make your _own_ matchers. Easy peasy.

Let's use some `beforeEach()` magic to make things happen for us. This example ain't too bad. Here's an example suite:

```javascript
describe("Hello world", function () {
  beforeEach(function () {
    this.addMatchers({
      toBeDivisibleByTwo: function () {
        return this.actual % 2 === 0;
      },
    });
  });

  it("is divisible by 2", function () {
    expect(gimmeANumber()).toBeDivisibleByTwo();
  });
});
```

You can see that I defined a matcher called `toBeDivisibleByTwo`, which just returns if something is divisible by 2. I put it in `beforeEach()` because I wanted it to be defined _before each spec_. And so it was. Notice that I use it exactly like I used the built-in ones. Easy peasy.

Keep in mind that you often have to say `this.actual` instead of just `this` -- you're usually referring to the content of the object, not the instance of the object.

## Before and after

We just took a look at `beforeEach()` thing; there's also an `afterEach()`. And these are not that bad.

Let's say that you want some code to be run before every spec; maybe you want a variable set, maybe you want a function defined, maybe you want to make your computer do a dance. You can do that; just put it in `beforeEach()`.

Similarly, if you want something to run _after_ each spec, Jasmine has got you covered. Just plop that code right inside `afterEach()` and you got this.

I don't really want to go too into detail with this bit, but if you're looking for more, the <a href="https://github.com/pivotal/jasmine/wiki/Before-and-After">Jasmine documentation</a> has a bunch of examples which are sure to make you have a nerdgasm.

## Spies

Jasmine and James Bond. Time for awesome.

As we've learned, Jasmine will let us test if variables are how we want them. But you and I both know that there's more to it. We want to be able to check if functions have been called, and if they've been called how we want them to.

In Jasmine, a **spy** does pretty much what it says: it lets you spy on pieces of your program (and in general, the pieces that aren't just variable checks). Less exciting than James Bond. Still good.

### Example: spying on an existing function that you don't touch, with `spyOn()`

So let's say you have a class called a Person. It can say hello in general, and it can also say hello to someone. Here's what that might look like:

```javascript
var Person = function () {};

Person.prototype.helloSomeone = function (toGreet) {
  return this.sayHello() + " " + toGreet;
};

Person.prototype.sayHello = function () {
  return "Hello";
};
```

Pretty simple. We've got a couple of methods that do a couple of things. Easy peasy. Now, let's say we want to make sure it calls the `sayHello()` function when we call the `helloSomeone()` function. Here's what our suite will look like:

```javascript
describe("Person", function () {
  it("calls the sayHello() function", function () {
    var fakePerson = new Person();
    spyOn(fakePerson, "sayHello");
    fakePerson.helloSomeone("world");
    expect(fakePerson.sayHello).toHaveBeenCalled();
  });
});
```

Let's go through this, line by line:

This will make a fake person, for testing purposes. This will spy on this fake person's `sayHello()` method. Then we will do something that _should_ trigger what we're spying on. Then we should tell Jasmine what we expect.

Throwing this through the spec runner should give you positive results; your program should have indeed called `fakePerson.sayHello()`.

Okay, maybe that's not all we want. Maybe we want to make sure that `helloSomeone` is called with `'world'` as its argument. Jasmine has got your back. She knows what she's doing. Take a look at this example spec:

```javascript
describe("Person", function () {
  it("greets the world", function () {
    var fakePerson = new Person();
    spyOn(fakePerson, "helloSomeone");
    fakePerson.helloSomeone("world");
    expect(fakePerson.helloSomeone).toHaveBeenCalledWith("world");
  });
});
```

As you may be able to read (it looks a lot like English!), this spy makes sure that `helloSomeone()`'s argument is `'world'`. Run that through Jasmine and she'll tell you everything is good.

If you want to ensure that something _isn't_ called, it's a lot like when you're making sure a variable isn't something: use `.not`. So, for example, if you want to make sure that a function isn't called with a particular argument...

```javascript
expect(fakePerson.helloSomeone).not.toHaveBeenCalledWith("foo");
```

There are a number of other spy arguments <a href="https://github.com/pivotal/jasmine/wiki/Spies">in the documentation</a>.

### Example: spying on an existing function that you modify: use of `jasmine.createSpy()`

In the previous example, we were spying on a function. We weren't doing anything weird to it; we let it function normally and we were just spying on it.

Here's the same person from before. I haven't touched it. I promise.

```javascript
var Person = function () {};

Person.prototype.helloSomeone = function (toGreet) {
  return this.sayHello() + " " + toGreet;
};

Person.prototype.sayHello = function () {
  return "Hello";
};
```

In some cases, you don't even care if something functioned _properly_, you just care that it called a function at all. (This might be because you are testing it elsewhere, or maybe just because you're lazy.) With Jasmine, you "empty" the contents of the function while you're testing. Let's take a look at an example and go through it line-by-line:

```javascript
describe("Person", function () {
  it("says hello", function () {
    var fakePerson = new Person();
    fakePerson.sayHello = jasmine.createSpy("Say-hello spy");
    fakePerson.helloSomeone("world");
    expect(fakePerson.sayHello).toHaveBeenCalled();
  });
});
```

Okay, so here's what's going on:

Same as before, we make a fake person. But now we're going to turn `sayHello()` into a dummy function; we create a spy. Then we test it (with `helloSomeone()`) and then we make sure the dummy `sayHello()` has been called.

Okay. What if you don't want it to be empty, you actually want it to return something? Jasmine to the rescue. You can specify that a spy function return something (in this case, `'ello ello'`):

```javascript
fakePerson.sayHello = jasmine
  .createSpy('"Say hello" spy')
  .andReturn("ello ello");
```

But there's no pleasing you. You always need more. You can even give your spy functions something to do. This example does a little and then says some French:

```javascript
fakePerson.sayHello = jasmine
  .createSpy('"Say hello" spy')
  .andCallFake(function () {
    document.write("Time to say hello!");
    return "bonjour";
  });
```

That was a lot less interesting than James Bond, but probably more useful to you as a programmer in the end. Still, you should help yourself to a Vodka Martini. Shaken, not stirred. Because you are now a master of the spies.

## Wrangling some asynchronous stuff

To quote Jasmine's documentation: "You may be thinking, 'That's all very nice, but what's this about asynchronous tests?'" You probably weren't thinking that, but I'll tell you about Jasmine's support for asynchronicity anyway.

There are two Jasmine functions that help you with asynchronicity: `run()` and `waitsFor()`.

`run()` blocks execute procedurally, so you don't have to worry about asynchronous code screwing everything up. This is some code that runs one after the other.

```javascript
it("is a test of run()", function () {
  runs(function () {
    var foo = 1;
    expect(foo).toEqual(1);
  });

  runs(function () {
    var bar = 2;
    bar++;
    expect(bar).toEqual(3);
  });
});
```

Without asynchronous stuff, I'm pretty sure that `run()` is useless. If everything is sequential, everything is _kinda sorta_ just in a `run()` block anyway, right?

So now let's go into `waitsFor()`, which is the exciting part.

Okay, tiger. Let's say you want to make sure your calculator class can find the greatest common factor between any two numbers. It'll do it asynchronously, because some numbers are _ginormous_. Here's an example of something that **would not work**:

```javascript
describe("Calculator", function () {
  it("should factor two huge numbers asynchronously", function () {
    var calc = new Calculator();
    var answer = calc.factor(18973547201226, 28460320801839);
    expect(answer).toEqual(9486773600613); // DANGER ZONE: This doesn't work if factor() is asynchronous!!
    // THIS DOESN'T WORK
  });
});
```

So how would you get it to work? You'd use `waitsFor()`. `waitsFor()` waits for some condition to be true, and then it continues on. You can also specify an optional timeout; if it waits for longer than that, it'll fail with an optional message.

```javascript
describe("Calculator", function () {
  it("should factor two huge numbers asynchronously", function () {
    var calc = new Calculator();
    var answer = calc.factor(18973547201226, 28460320801839);

    waitsFor(
      function () {
        return calc.answerHasBeenCalculated();
      },
      "It took too long to find those factors.",
      10000
    );

    runs(function () {
      expect(answer).toEqual(9486773600613);
    });
  });
});
```

The above code waits for the calculator to return `true` on `calc.answerHasBeenCalculated()`. Once it does, it goes on to the next block. If it doesn't succeed after 10 seconds, it'll pull the plug and give you an error.

_Note: older versions of Jasmine had a third asynchronous helper: `waits()`. It was stupid so it was deprecated and then removed._

## Bam. Jasmine.

And that's my Jasmine tutorial. If this wasn't enough and you're itching for more Jasmine, take a look at my book [_JavaScript Testing with Jasmine_](https://shop.oreilly.com/product/0636920028277.do) or [explore the Jasmine docs](https://jasmine.github.io/1.3/introduction.html).
