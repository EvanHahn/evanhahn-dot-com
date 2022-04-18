---
date: 2011-06-07
title: Detect the RockMelt browser from JavaScript
author: Evan Hahn
layout: post
url: /javascript-detect-if-your-browser-is-rockmelt/
---

This is fairly trivial, but came in handy during my internship at [RockMelt](http://www.rockmelt.com). Hope it helps all you RockMelt developers.

    function isRockMelt() {
      return navigator.userAgent.indexOf("RockMelt") !== -1;
    }
