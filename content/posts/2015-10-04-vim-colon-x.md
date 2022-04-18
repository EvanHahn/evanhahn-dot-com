---
date: 2015-10-04
title: "Vim's :x command"
description: "Vim has :x which is basically the same as :wq but slightly less typing."
layout: post
url: /vim-colon-x-command/
---

_In short: Vim has `:x` which is basically the same as `:wq` but slightly less typing._

The first time I opened Vim, it was an accident. In a mad panic, I started smashing keys. What was this wretched program? Soon, Vim presented me with a message telling me to type `:quit` to exit Vim. This was the first Vim command I ever learned.

After spending more time with Vim, I learned the `:q` shorthand. This is an example of Vim users' hatred of the extra keystroke. Instead of typing `:write` and then `:quit` to save and quit, you can type `:wq`.

Most Vim users I've met know about `:wq`, but a big slew of people (including me, until recently) don't know they can trim a keystroke with the (nearly) equivalent `:x` command. To quote Vim's documentation on the command:

> Like `:wq`, but write only when changes have been made.

I use `:x` instead of `:wq` every time and haven't encountered a problem—it's rare that you need to update the modification time of a file with no other changes.

This has saved me thousands of keystrokes throughout my Vim career. I thought it was worth sharing with the world!
