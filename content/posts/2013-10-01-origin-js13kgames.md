---
date: 2013-10-01
title: "Origin: my entry to js13kgames 2013"
author: Evan Hahn
layout: post
url: /origin-js13kgames/
---

_In short: [click here](https://js13kgames.com/games/origin/index.html) to play my 7th-place entry to [js13kgames 2013](https://2013.js13kgames.com)._

I'm no good at it, but I've always enjoyed making video games as hobby. When [js13kgames](https://js13kgames.com/) rolled around, I decided to give it a try. I'd been kicking around a simple game idea in my head, and I figured this was the perfect time to implement it.

So I built [Origin](https://js13kgames.com/games/origin/index.html). Go give it a play! If you're interested, you can also [take a look at the source code](https://github.com/EvanHahn/js13kgames-2013).

The game [won 7th place](https://2013.js13kgames.com/#winners)! I was honored and surprised and confused.

There are some parts of the game that I thought notable:

## Polar, not Cartesian

Most games I've seen take place on the [Cartesian coordinate plane](https://en.wikipedia.org/wiki/Cartesian_coordinate_system) -- X, Y, and sometimes Z. Things move up and down, in and out, left and right. Origin, on the other hand, is [polar](https://en.wikipedia.org/wiki/Polar_coordinate_system) -- everything is relative to the center. That means nearly everything in the game is a circle, or an arc, or something. I like the idea of changing that up, and I think that's _just about the only thing_ that makes Origin interesting.

Polar coordinates let you build a game that's über-responsive: no matter what size the window is, Origin will be playable.

## The concatenation server

I wanted to be able to have all my files concatenated and spat out, and I wanted a development version and a production version. So I hacked together [a horrible Express web server](https://github.com/EvanHahn/js13kgames-2013/tree/master/server) that really could've been done much better with something like [Grunt](https://gruntjs.com/). I had a bugger of a time finding something that would properly do the minification, and I finally settled on [html-minify](https://npmjs.org/package/html-minify), which worked quite nicely.

Eventually, I had it set up so that I could say `npm start` and it'd run the server. I could visit localhost:8000 and it'd give me an uncompressed build, and I could visit localhost:8000/prod and it'd give me a compressed build. I kept an eye on the size of the production file, because I only had 13 kilobytes to build the game.

## MiniClass

I'd written something called "Classy" in the past, but nobody used it (even me). It was a simple implementation of classical inheritance in JavaScript, and while it worked, it didn't really solve any problems. I removed some features, changed some tests, and rebranded it as [MiniClass](https://github.com/EvanHahn/MiniClass), which aims to implement tiny classical inheritance. I used MiniClass as the foundation for the classical inheritance I used in the project.

## The sounds of screams

I put a _ton_ of effort into one part of the project, and I never even used it: [sounds.js](https://github.com/EvanHahn/js13kgames-2013/blob/master/src/lib/sounds.js).

I dug into the Web Audio API, a new spec for playing oscillators in the browser. The first sound-related commit was pretty calm:

> add intro bloop sound

Soon after that:

> rewrite Sound -- breaks unsupported browsers, better API

The next two commits:

> 1. rewrite sound stuff AGAIN. i think we got it this time
> 2. minor changes to...yeah, sound. i keep messing with this

And then:

> REAL AUDIO FOR EXPLOSIONS

I found a real-life audio file in WAV format, and went through a _hell_ of a time compressing it and getting it to play. For a full description of my toil, [see my commit](https://github.com/EvanHahn/js13kgames-2013/commit/63182d32ee1beae22f27445615181cda95239774), but I think the last line of the commit sums it up nicely:

> phew. i hate sound

While I (finally) got the damn browser to play sounds, the bleeps and bloops always sounded weird and out of place. If my game had been in an 8-bit style, it might've been appropriate, but they sounded too much like a NES to fit, so I disabled my hard work in the end.

## Pool's closed

I did some crappy [object pooling](https://en.wikipedia.org/wiki/Object_pool_pattern) for performance reasons. When bombs explode in the game, they [generate 100 particles](https://github.com/EvanHahn/js13kgames-2013/blob/master/src/bomb.js#L74) that fly all over the screen. Garbage collecting this stuff would be a _nightmare_, and writing an efficient object pool was not my idea of fun.

Instead of doing the "right" thing, I gave every in-game object a boolean value called `destroyed`. The pool continues to expand and _never stops_, but it skips over objects that are `destroyed`. Not the most efficient way in terms of performance, but it was certainly efficient in terms of my development time and happiness.

## And it's done

I had a lovely time working on Origin. It wasn't a big enough commitment that I couldn't work on it, but it wasn't simple enough that I didn't learn anything. Maybe I'll use the nightmarish sound stuff in another project.

I hope you enjoy the game! Go [play the others, too](https://2013.js13kgames.com/#winners) -- they're amazing.
