---
title: "Yet another JavaScript class library: Classy"
author: Evan Hahn
layout: post
path: /yet-another-javascript-class-library-classy/
---

**Update: this is now called [MiniClass](https://github.com/EvanHahn/MiniClass).**

JavaScript's prototypical nature can be confusing. Even [fantastic explanations](http://sporto.github.com/blog/2013/02/22/a-plain-english-guide-to-javascript-prototypes/) can take a couple of read-throughs before it's clear. I've felt confident in it for awhile, but I wanted to test myself, so I wrote [Classy](https://github.com/EvanHahn/MiniClass).

Here's an example of how Classy works:

    var MagicalPerson = Classy.extend({
      initialize: function(first) {
        this.firstName = first;
      },
      introduce: function() {
        return "I'm a " + this.type + " and my name is " + this.firstName + "!";
      }
    });

    var Wizard = MagicalPerson.extend({
      type: "wizard"
    });

    var merlin = new Wizard("Merlin");
    merlin.introduce();  // => "I'm a wizard and my name is Merlin!"

It was also a chance for me to learn [Mocha](http://mochajs.org/), the up-and-coming JavaScript testing framework.

[Go give it a look](https://github.com/EvanHahn/MiniClass), and tell me if I didn't understand something about prototypes!
