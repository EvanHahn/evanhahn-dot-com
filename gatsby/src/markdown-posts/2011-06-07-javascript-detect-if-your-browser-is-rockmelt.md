---
title: "JavaScript: Detect if your browser is RockMelt"
author: Evan Hahn
layout: post
path: /javascript-detect-if-your-browser-is-rockmelt/
---

This is fairly trivial, but came in handy during my internship at [RockMelt](http://www.rockmelt.com). Hope it helps all you RockMelt developers.

    function isRockMelt() {
      return (navigator.userAgent.indexOf("RockMelt") !== -1);
    }
