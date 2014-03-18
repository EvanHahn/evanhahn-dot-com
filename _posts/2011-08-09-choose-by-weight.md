---
title: Choose by weight
author: Evan Hahn
layout: post
permalink: /choose-by-weight/
---
*In short: Sum up the weights. Pick a random number between 0 and the total weight. Iterate. [Click here for a JavaScript solution.](https://gist.github.com/1135646)*

I was writing some code for my internship at [RockMelt](http://www.rockmelt.com/) that required me to choose by weight in JavaScript. The problem: you're given an array of objects that have weights. Let's say their weights are 4, 1, 2, and 1. You need to choose three at random, but higher-weighted items will come first.

Here's how that might look:

<!-- Table diagram -->

<table style="margin: 0 auto; width: 75%; text-align: center; font-weight: bold; color: #fff; font-family: sans-serif;">
  <tr>
    <td style="background-color: #900; padding: 1em;" width="50%">
      4
    </td>

    <td style="background-color: #090;" width="12.5%">
      1
    </td>

    <td style="background-color: #009;" width="25%">
      2
    </td>

    <td style="background-color: #090;" width="12.5%">
      1
    </td>
  </tr>
</table>

Imagine that you're standing at the left end of the strip with a stone. You throw the stone randomly so that it lands *somewhere* on the strip. If your throw is completely random, it's most likely to land on the 4, right? It might not -- it might land on any of the others -- but it's "weighted" to land on the 4.

This is basically what we're gonna do in code. Here's how you do it:

1.  Sum up the total weights. In the above example, it'll be 8.
2.  Pick a random number that's between 0 and the total weight. In the example, this will be a number between 0 and 8.
3.  Figure out where that random number "lands". Let's say you picked 5.5. Iterate through the array until the total weight up to that point is less than 5.5; this will have you land at the third spot from the left: the 2.
4.  If you haven't already chosen that space, choose it.
5.  Repeat steps 2 through 4 until you've chosen them all.

I implemented the solution in JavaScript. [Check it out, if you like!](https://gist.github.com/1135646) The code is meant to be modified slightly, but it gets the point across.

If you used this logic in another language, let me know!
