---
title: Publishing a simple package to npm
description: Learn how to publish an npm package.
layout: post
path: /make-an-npm-baby/
---

_This guide expects you to have used Node and npm before, but you don't have to be an expert! You should also know how to publish an open source repository on GitHub and a bit about testing._

It's time. You've been mooching off of [npm](https://npmjs.com/) for awhile now, and you want to make an open source package. Let me be your guide.

[Go check out the finished source](https://github.com/EvanHahn/startInterval) if you'd like to see all of this together. Unfortunately, you won't be able to publish a package called "startinterval" because I've already done it. It might be best to follow along but to avoid polluting npm with example packages.

## What we'll build

JavaScript has had `setInterval` for a long time. It runs a function every so often. Frequently, I find myself doing something like this:

    setInterval(myFunction, 1000);
    myFunction();

I'd like to build a nearly-identical function that does the same thing as `setInterval` but also runs the function immediately. It'll turn the above code into this:

    startInterval(myFunction, 1000);

This is a pretty simple package, so it'll be helpful when we learn all of the complexities of a npm module.

## A first version

There's a _lot_ of stuff you can do for an npm package. Let's start with a respectable first version.

### package dot json

Every npm module has a file called `package.json` inside. It's a simple JSON document that's got [a lot of options](https://docs.npmjs.com/files/package.json).

(Oh hey: make sure you've made a new directory when you're doing this stuff.)

You can make this file yourself, or let `npm init` do it for you. Personally, I think `npm init` adds a lot of stuff, so let's just put this inside for now (I'll explain in a minute):

    {
      "name": "startinterval",
      "description": "setInterval but also calls the function immediately",
      "author": "Your Name <yourname@example.com> (https://example.com)",
      "version": "0.1.0",
      "main": "index.js"
    }

So there are four keys:

- **name** is the name of your package. Pretty straightforward, but it doesn't allow spaces or capitals, otherwise I would've capitalized the I.
- **author** is you! Mine is `"Evan Hahn <me@evanhahn.com> (https://evanhahn.com)"` but that's probably not yours.
- **version** is the semantic version. You can [read a lot about semantic versioning](https://semver.org/), but here's a quick rundown: there are three positive integers, `A.B.C`. Increment `C` when you fix bugs or make performance improvements. Increment `B` when you add features but don't break old code. Increment `A` when you'll break old code. And when `A` is 0, _there are no rules_. For now, there are no rules.
- **main** is the entry point. When you say `require('startinterval')` from another file, it'll point to `index.js`.

That's a really basic `package.json`. Let's write the code.

### The code

The first version of our code is just 5 lines.

    function startInterval(fn) {
      fn(); // do the function right now
      return setInterval.apply(this, arguments); // defer to setInterval
    }

    module.exports = startInterval; // let me be required

Drop this into `index.js`, like we specified in `package.json`.

An aside: there's nothing too special about `index.js`—you could've called it `squigglebutt.js`, and as long as you changed it in `package.json`, you're good. (`index.js` is a _tiny bit_ special, though -- if you `require('/some/folder/')`, it'll be as if you did `require('/some/folder/index.js')`.)

### Associate an npm account

If you've already done these two steps, you don't need to do them again:

1. [Sign up for an npm account](https://npmjs.com/signup) if you haven't already
2. Run `npm adduser` and log in on your computer

Feel the thrill.

### Publish it!

We're ready to publish a first version! My body quivers with excitement.

    npm publish . # where . is just the path to this package

If all goes well, npm will spit out some HTTP information...and then, without much fanfare, your package will appear on the npm website! I've experienced a delay of a few minutes, so you can frantically refresh the homepage until your package appears (or until npm crashes).

And you've made a first version! Try making a new project, installing it, and using it with `require('startinterval')`...and be amazed.

It's not finished, though. Read on to make a more "mature" npm package.

## The little things in life

There are a lot of little things we can do right now to make our project _really special_.

### Add a readme

npm will give you (and anyone who installs your package) a warning if you don't have a file in your root directory called `README.md`. It's a [Markdown](https://daringfireball.net/projects/markdown/)-formatted readme. Go ahead and make one to describe your package!

### Add a license

You'll want to license your code so that people can legally use it (unless your intended users are _the hardest of criminals_). If you need help choosing a license, I'd recommend GitHub's [ChooseALicense dot com](http://choosealicense.com/) (although I should add the disclaimer that I'm not a lawyer and nothing I say is legal advice).

npm packages seem to like the [MIT License](http://opensource.org/licenses/MIT) but you can choose whatever you want.

Two things you'll want to do:

1.  Add the license to a file called `LICENSE` in the root directory.
2.  Add the license to `package.json`:

        // ...
        "license": "MIT"
        // ...

### Put the source code somewhere

Nearly every npm package hosts its source somewhere. Microsoft's GitHub is the most popular choice, but [GitLab](https://gitlab.com/) and [Bitbucket](https://bitbucket.org) are two other popular ones.

It's a good practice to publish your package as an open source project. It'll help other people see the source code of your package, make contributions if they wish to, and ask questions.

I'm going to assume you know how to do this, so here's some npm-specific stuff:

- You don't want certain things getting in your GitHub repository (log files and included dependencies, for example), so make a [gitignore](https://help.github.com/articles/ignoring-files). I use [GitHub's Node.js gitignore file](https://github.com/github/gitignore/blob/master/Node.gitignore), and you should too!

- In addition to your gitignore, you might also want to make a file called `.npmignore`. It's a similar idea, but when people install your package from npm, they don't need all your unit tests. We'll keep them for such a small package, but you should [read more about it](https://docs.npmjs.com/misc/developers) when you have tons of non-essential files. (Thanks to [brtt3000 of Reddit](http://www.reddit.com/user/brtt3000) for reminding me about this!)

- Now that your package is on GitHub, you should add a repository field to your `package.json`. It'll look something like this:

        "repository": {
          "type": "git",
          "url": "https://github.com/EvanHahn/startInterval.git"
        }

- If you have a bug in your software, it'd be great for people to know where to submit it! You can add this information under the "bugs" field in `package.json`. I'd recommend the GitHub issue tracker URL for your repository. Mine looks like this:

        "bugs": "https://github.com/EvanHahn/startInterval/issues"

  You can also add more information like an email address if you want.

### Making it work in browsers

Someone could come across your package outside of the Node world -- maybe they're in a browser. To let them, wrap your `module.exports` line in an `if` statement that will only use `module.exports` if it can.

    if (typeof module !== 'undefined') {
      module.exports = startInterval;
    }

Now, without any extra work (like having to use [Browserify](http://browserify.org/)), someone can drop `startinterval.js` on their website. If you're in a browser environment, `startInterval` will be in the global namespace. But if you're in Node, it'll export the function.

## Testing with Mocha and Chai and Sinon

I'm not going to preach the benefits of testing your code. There are already enough assholes in the world making you feel bad. But let's test it.

Just like a lot of things in JavaScript, there are a million different libraries that do what we want. There's [Jest](https://jestjs.io/) and [Ava](https://github.com/avajs/ava) for running tests, or [Assert](http://nodejs.org/api/assert.html) and [Should](https://github.com/tj/should.js) for doing assertions. Know that there are other options out there, and if you don't like the options I outline below, there's a lot of good shopping to do.

Today, we're going to use three testing libraries: [Mocha](https://mochajs.org/), [Chai](https://www.chaijs.com/), and [Sinon](https://sinonjs.org/).

### What are these things?

Testing in a nutshell: basically, your code will have a bunch of functions and classes and whatnot. You want to make sure that, no matter what you throw at them, they'll perform how you want them to. For example, this function should always return a string that says `"hello"` in it. Testing ensures that everything goes down exactly how you planned.

_Mocha_ is a testing framework. At the end of the day, it's the thing that actually runs your tests. It's the syntax you use to say "here's what I'm testing, let me set it up, blah blah, blah".

_Chai_ is an assertion library. While Mocha lays out the test, Chai (almost literally) says "I expect this function to return 'hello'". The actual syntax is `expect(thisFunction()).to.equal('hello')`, which reads a lot like English.

_Sinon_ does "spies". This basically lets us define functions that know how many times they've been called (which, for this library, is very useful). It also lets us make fake clocks and _fast-forward time_. We'll get to that in a bit.

### Getting set up

The first thing to do is to install Mocha, Chai, and Sinon.

    npm install mocha chai sinon --save-dev

This installs the packages and saves them under the "devDependencies" field of `package.json`. "Regular" dependencies are things that you _need_ to run the package, and they're specified under the "dependencies" key. "devDependencies" are needed when _developing_ the package. Testing usually falls under the latter category, because end users won't need to run your tests.

Now that we've installed Mocha, let's add a script to our package. Add this to `package.json` (I'll explain in a moment):

    // ...
    "scripts": {
      "test": "mocha"
    }
    // ...

Basically, this allows you to type `npm test` in your terminal and run the tests! (If you're curious how this works, npm temporarily injects all the `bin`s from `node_modules` into your PATH. So even if you don't have Mocha globally installed on your system, this will still work.)

Now, make a folder called `test` and put `test.js` inside. We'll make a simple example test for now. Fill it with this code (which the in-line comments hopefully explain):

    // First, we require `expect` from Chai.
    const { expect } = require('chai');

    // `describe` makes a "suite" of tests; think of them as a group.
    describe('fake suite of tests', function() {
      // The tests have an English description...
      it('has 2 equal to be greater than 0', function() {
        // ...and a code assertion.
        expect(2).to.be.above(0);
      });

      // You can have multiple tests in a suite.
      it('has 1 equal to 1', function() {
        expect(1).to.equal(1);
      });
    });

When you go into your project's root directory and type `npm test`, you should see some green text that says "2 passing"! This is because you have two tests and they both pass.

I won't show it here, but I'd recommend making a _failing_ test (`expect(1).to.equal(2)` or something) to see what that looks like.

### Writing the real tests

Our project doesn't need to test whether numbers are equal to each other. That's silliness. What we _do_ need to test is our function, `startInterval`! It's been awhile since we talked about that.

Let's write a first _real_ test!

    // Require everything we need (including our function!)
    const { expect } = require('chai');
    const sinon = require('sinon');
    const startInterval = require('..');

    describe('startInterval', function() {
      it('calls the function immediately', function() {
        const fn = sinon.spy(); // make a spy function
        const interval = startInterval(fn, 1000);
        expect(fn.calledOnce).to.be.true; // we can call this on the spy
        clearInterval(interval); // make sure we "clean up" the test
      });
    });

Run `npm test` and see what happens! Our function works...well, only the stuff we've tested! Let's add a second test:

    it('calls the function many times over time', function() {
      // Set up the things we need. Most notably, use Sinon's "fake clock".
      const fn = sinon.spy();
      const clock = sinon.useFakeTimers();
      const interval = startInterval(fn, 100);

      // Should've been called once in the first 99 ms...
      clock.tick(99);
      expect(fn.callCount).to.equal(1);

      // But then we get "pushed over" into having called it again.
      clock.tick(2);
      expect(fn.callCount).to.equal(2);

      // Test that a few more times.
      clock.tick(100);
      expect(fn.callCount).to.equal(3);
      clock.tick(100);
      expect(fn.callCount).to.equal(4);

      // Teardown
      clock.restore();
      clearInterval(interval);
    });

Try running `npm test` to see that things work!

### Cleaning up the tests

This is a pretty simple function with only two tests, but you can see that we have repeated code. `fn` is identical each time, and we're calling `clearInterval` at the end of every test. Let's use Mocha's `beforeEach` and `afterEach` features to clean that up. Here's what the code looks like now:

    describe('startInterval', function() {
      // Before each spec, make the fake spy and clock.
      beforeEach(function() {
        this.fn = sinon.spy();
        this.clock = sinon.useFakeTimers();
      });

      // After each spec, cancel the interval we start and restore the clock.
      afterEach(function() {
        clearInterval(this.interval);
        this.clock.restore();
      });

      it('calls the function immediately', function() {
        // Notice how our code is much shorter!
        this.interval = startInterval(this.fn, 1000);
        expect(this.fn.calledOnce).to.be.true;
      });

      it('calls the function many times over time', function() {
        this.interval = startInterval(this.fn, 100);
        this.clock.tick(99);
        expect(this.fn.callCount).to.equal(1);
        this.clock.tick(2);
        expect(this.fn.callCount).to.equal(2);
        this.clock.tick(100);
        expect(this.fn.callCount).to.equal(3);
        this.clock.tick(100);
        expect(this.fn.callCount).to.equal(4);
      });
    });

It's much shorter and clearer now! Well done.

## Continuous integration (CI) with Travis

There are a lot of people named Travis, but the one we care about today is named [Travis CI](https://travis-ci.org/). Travis lets you run your tests on every push and every pull request, so you'll quickly know whether your tests are failing. Turns out that this isn't too hard to set up!

1.  Set up a Travis account on [travis-ci.org](https://travis-ci.org/).

2.  Visit [your profile](https://travis-ci.org/profile), find your repository and switch it to "on".

3.  Create a file called `.travis.yml` in the root of your project and add the following to it, which will test your code on Node version 14:

        language: node_js
        node_js:
          - "14"

4.  Add that file to GitHub (add, commit, and push).

It'll take a few minutes, but if everything goes well, you'll get an email from Travis saying that your build passed! You can then see the output of everything on the homepage. CI is set up!

### Adding the status to your readme

On the Travis page for your package, there's an image at the top right that says "build passing". It's _very fashionable_ and very easy to put that image in your readme, so let's do that. Click on the image to see a popup with a bunch of inputs. You'll want to copy the Markdown text and paste it into `README.md`.

Now the build status is in your README!

## All done!

We've seen that a even simple function can become a big npm package pretty quickly! Let's do a final update of your package and push it to npm. If you're all ready to "lock in" the API for version 1, update the version in `package.json`:

    // ...
    "version": "1.0.0",
    // ...

And publish again!

    npm publish .

Welcome to npm, my friend.
