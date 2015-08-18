---
title: JavaScript functions have string names
author: Evan Hahn
layout: post
permalink: /javascript-functions-have-string-names/
---
JavaScript functions have a member called `name` that's a string of their name. Take a look at this example:

    var unnamed = function() {};
    unnamed.name;  // ""

    var named = function iAmNamed() {};
    named.name;    // "iAmNamed"

Just thought it was worth noting briefly, internet.
