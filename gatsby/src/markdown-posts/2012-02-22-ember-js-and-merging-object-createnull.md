---
title: Ember.js and merging Object.create(null)
author: Evan Hahn
layout: post
path: /ember-js-and-merging-object-createnull/
---

_In short: [Ember.js](http://emberjs.com) doesn't play nice with `Ember.Object.create(Object.create(null))` -- make sure objects are declared as `{}` rather than `Object.create(null)`._

I was coding in Ember.js today and got this error:

    Uncaught TypeError: Object #<error> has no method 'hasOwnProperty'

It was because of this code (modified slightly to make sense here):

    window.Namespace = Object.create(null);
    window.Namespace = Ember.Application.create(window.Namespace);

I changed it to this and everything worked:

    window.Namespace = {};
    window.Namespace = Ember.Application.create(window.Namespace);

So I found out that Ember doesn't play nice if you try to merge with objects that don't have the `hasOwnProperty()` method. Slightly less memory-efficient, but 100% more "it actually works".
