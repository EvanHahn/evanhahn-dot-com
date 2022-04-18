---
date: 2014-02-20
title: "Introducing cyborg.txt: robots.txt utilities for Node"
layout: post
url: /introducing-cyborg/
---

_In short: [cyborg.txt](https://github.com/EvanHahn/cyborg.txt) is a collection of robots.txt utilities for Node._

I've been experimenting with webcrawlers lately. I doubt I'll build the next great search engine, but it's fun to do things like [sentiment analysis](https://en.wikipedia.org/wiki/Sentiment_analysis) on the web. When you're a (polite) webcrawler, you quickly find that you'll need to parse [robots.txt](http://www.robotstxt.org/).

Node has [a few different libraries for dealing with robots.txt](https://www.npmjs.org/search?q=robots.txt), but I thought it'd be fun (and possibly useful) to make my own. [Go take a look at cyborg.txt](https://github.com/EvanHahn/cyborg.txt), my new library for parsing and generating robots.txt files!
