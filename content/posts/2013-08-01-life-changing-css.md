---
date: 2013-08-01
title: Four CSS tips that have changed me as a man
author: Evan Hahn
layout: post
url: /life-changing-css/
---

CSS is impossibly weird. These four tricks have helped me mitigate its weirdness and have saved me _hecka time_:

## The reset

The first thing in your CSS should be a CSS reset, which helps keep pages more consistent across browsers by overriding their default styles. [Eric Meyer's CSS reset](http://meyerweb.com/eric/tools/css/reset/) is the one I use. I'd also recommend [normalize.css](http://necolas.github.io/normalize.css/), which sets up a bunch of sensible defaults and fixes a bunch of subtle browser inconsistencies.

## border-box

The CSS box model is funky. If I give something a width of 400px and a 10px padding, its rendered width will be 420px. That's no way to live. That's _hell_.

Enter `box-sizing: border-box`. My website has the following code, at [Paul Irish's recommendation](http://www.paulirish.com/2012/box-sizing-border-box-ftw/):

    * {
      box-sizing: border-box;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      -ms-box-sizing: border-box;
    }

I add padding _recklessly_, not worrying that my element's going to be destroyed. Very helpful when you want to size things _like you're sane_. This little bit of CSS has probably saved me _millenia_.

For more, check out [CSS Tricks's article about box sizing](http://css-tricks.com/box-sizing/). If you need support in IE6 and 7, [there's a polyfill](https://github.com/Schepp/box-sizing-polyfill).

## display: table

_Update: The "right way" to do this stuff is now with [flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)._

It's pretty well-known that you don't use tables for layout; you use CSS. But let's be real: table-based layouts were _easier_. Want two things to be the same height _and_ aligned horizontally? Don't want to use tables? _Welcome to hell._

Enter `display: table` and its buddies. This allows you to make a container element act like a table and inner elements act like table cells. [Anup Shah has a great piece on his blog about its use](http://www.onenaught.com/posts/201/use-css-displaytable-for-layout), which I'd recommend reading.

Most notably, it lets you do vertical centering _real nice_ ([here's a demo](http://dabblet.com/gist/6107450)):

The HTML:

    <div class="outer-container">
      <div class="inner-container">
        This text is going to be vertically <em>and</em> horizontally centered. Get on this level
      </div>
    </div>

The CSS:

    .outer-container {
      display: table;
    }

    .outer-container .inner-container {
      display: table-cell;
      vertical-align: middle;
      text-align: center;
    }

_Sweet damn._ Don't tell me that CSS doesn't _cut you to the core_.

## There's a polyfill for that

You can't read about web development without seeing _oceans_ of new HTML5/CSS3 features. They're supported in modern browsers, but not in old Internet Explorer, or old Firefox, or odd-numbered versions of Opera. If you want a feature that's not in a target browser of yours, you can _frequently_ apply a polyfill to recreate the feature in old browsers.

For those who don't know, a polyfill is some code you include on your page that "fills in" old browsers. If IE6 doesn't support `border-radius`, include [a polyfill](http://css3pie.com/) and you'll have it on old IE. Go take a look at [Modernizr's huge list of polyfills](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills) if you need one.

While this isn't really a CSS trick, it _does_ give you "permission" to use _Super Cool CSS3 Features_ and not fear that older browsers will buckle.

## Cool Bonus Tip™: use a preprocessor

If you aren't using [SASS](http://sass-lang.com/) or [LESS](http://lesscss.org/) or [Stylus](http://learnboost.github.io/stylus/) or [Roole](http://roole.org/), start _today_. I don't even...I don't even want to talk about it. Trust me. It will save you more time than any of the other tips.

Happy CSSing, my friend.
