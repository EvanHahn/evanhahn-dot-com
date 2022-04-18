---
date: 2018-03-29
title: 'My entry to JS1k 2018: "Zap"'
layout: post
url: /my-entry-to-js1k-2018-zap/
---

_In short: check out [my entry to JS1k 2018](https://js1k.com/2018-coins/demo/3159)._

[JS1k](https://js1k.com/) is a contest where developers must build something impressive using only one kilobyte of JavaScript. I like coding with constraints so I always enjoy entering.

My final submission to 2018's JS1k contest was my third idea. I originally made a coin-collecting game (source [here](https://gitlab.com/EvanHahn/js1k-2018/blob/63ef27abb6dd267229676fa411a3ba20f8f4ec67/src/js1k.js)) that was inspired by [Kirby Air Ride](https://wikirby.com/wiki/Kirby_Air_Ride), an old GameCube game I love. I couldn't quite get it to fit in the 1 kilobyte limit, but more importantly, I couldn't make it fun! I also abandoned a simple spreadsheet program (source [here](https://gitlab.com/EvanHahn/js1k-2018/blob/spreadsheet/src/js1k.js))—I found it hard to make an impressive spreadsheet at any file size!

I settled on an interactive page where you could control lightning bolts by moving the mouse. [Check it out here!](https://js1k.com/2018-coins/demo/3159)

## The "game loop"

I start a lot of my [code doodles](https://evanhahn.github.io/code-doodles/) with a skeleton that looks something like this:

```javascript
// Create an array of entities (populated elsewhere).
const entities = [];

// This function will be called on every frame.
let lastTime;
function tick(t) {
  // Calculate ∆t, the number of milliseconds since the last frame.
  const dt = lastTime ? lastTime - t : 0;
  lastTime = t;

  // `tick` each entity with ∆t.
  entities.forEach((entity) => {
    entity.tick(dt);
  });

  // Request the next tick.
  requestAnimationFrame(tick);
}

// Request the first tick.
requestAnimationFrame(tick);
```

This is effectively a [game loop](http://gameprogrammingpatterns.com/game-loop.html), whether you're making a game or a visualization.

I modified some of the specifics of this design (shortening names and things) to keep my code under 1K, but it's conceptually the same in my submission.

A key component of this design is the `dt` variable. Every bit of movement is relative to this variable in some way. For example, when a ball moves across the screen, you should write something like this:

```javascript
this.x += (this.velocityX * dt) / 1000;
this.y += (this.velocityY * dt) / 1000;

// Instead of something like this:
// this.x += this.velocityX
```

This means that the velocity isn't bound to the framerate—it works on a fast computer and a slow computer. This idea prevents slowdown on slower machines, but it has another interesting property: you can play with the pace of time much more easily.

For example, you can trivially introduce a `timeSpeed` variable to half the speed of the entire world:

```
// ...
let timeSpeed = 0.5
const dt = (lastTime ? lastTime - t : 0) * timeSpeed
// ...
```

Now everything will slow way down! To double the speed, you could set `timeSpeed` to `2` and you're done—no need to update anything else.

I used this design in my JS1k demo. The user can press Up or Down on the arrow keys and the equivalent of the `timeSpeed` variable (called `x` in my example to save bytes) will be moved up or down to change the whole visualization.

## Staying under the limit

This is JS1k, so everything has to be hyper-compressed. I accomplished this in two ways: with tooling and some coding tricks.

### Tooling

The bulk of the work was done with two tools: [babel-minify](https://github.com/babel/minify) and [RegPack](https://github.com/Siorki/RegPack).

2017 was the first year that JS1k allowed ES6 code, but popular minifiers like Uglify lacked ES6 support. babel-minify came on the scene and let you minify ES6 code as, well, ES6! I chose this minifier to help crush my code down.

RegPack is a crazier tool. It compresses your code as a string, includes decompressor code, and then runs the decompressed code with `eval`. (That is about where my understanding of the tool ends.) The babel-minified code is barely readable, but the RegPack-compressed code is impossible to read. This tool is invaluable when trying to making something substantial fit under 1 kilobyte.

I wrote [a file](https://gitlab.com/EvanHahn/js1k-2018/blob/594c807f75a9a9e7a3755c6935569d7de2ee8985/src/minify.js) which takes in the raw source and spits out minified output using the above tools.

### Code tricks

I typically use [JavaScript Standard Style](https://standardjs.com/) and this submission was no different. I only disabled one of its rules! But there were plenty of cut corners all the same.

At a high level, I endeavored to use single-letter identifiers unless I was declaring local variables. I maintained a comment at the top that noted the mapping—`t` was the current time, `e` was the array of entities, and so on.

I also had a fair number of local variables. Because I knew that babel-minify would rewrite these, I knew I could give them full, descriptive names. This made my life a lot easier!

Here's a grab bag of other tricks I employed:

- Use `0` and `1` instead of `false` and `true`
- Use `myNumber | 0` instead of `Math.floor`
- Use `map` instead of `forEach`
- Use backticks for strings everywhere to compress better with RegPack

There are several spots where I could've done more to compress the code, but I was 13 bytes under the limit and didn't feel the need. For example, my code still has `===` instead of `==`, which is a waste of bytes.

## Making it fun

My brother isn't a developer but he sat with me while I worked on this. We iterated on the "doodle" for a couple of hours before we eventually got to the lightning bolts in the final scene. Initially, we had colorful triangles flying around on the screen. Sometimes it hurt our eyes. We experimented with changing the colors as a function of time (cycling slowly through the rainbow) and many other tricks. Eventually we noticed that we were building something that looked like lightning bolts, and we were off to the races.

## ❤︎ JS1k

Thanks to everyone who runs JS1k—the judges, Peter van der Zee, and the sponsors. I've enjoyed entering in past years and this one was no exception!
