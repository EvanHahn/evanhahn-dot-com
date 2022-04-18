---
date: 2011-08-10
title: How to code Tic-Tac-Toe (and a Lua implementation)
author: Evan Hahn
layout: post
url: /how-to-code-tic-tac-toe-and-a-lua-implementation/
---

After installing Lua, I had to write Tic-Tac-Toe in Lua for a job interview awhile ago. It seems like a trivial technical problem, but it's not actually that easy. Here's how I did it (which is _not_ the only method):

The board is represented by a 2D table of spaces. They are empty to start (`nil` in Lua's case). When you play, you put an "x" or an "o" into the table. The board is used to keep track of piece locations and to display them. It does not calculate wins.

The board also has "regions." A region is a place where a player may win (horizontal, vertical, or diagonal). It holds pointers to the board table. Player 1 is represented by `+`, and Player 2 by `-`. Each piece in the region increments or decrements the checking of the region. Basically, two X's returns as `2`. Two O's returns as `-2`. `3` or `-3` is a winning region.

My Lua implementation is [available right here](https://gist.github.com/1135851) and is free license. I hope it helps you tic-tac-toe programmers! I'm sure there are _billions_ of you.
