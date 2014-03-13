---
title: Simple EECS 370 LC-2K tricks
author: Evan Hahn
layout: page
---
These are some tricks for LC-2K, the fake assembly language in EECS 370 (at University of Michigan). This is only for the fall semester in 2012; it might be different for other LC-2Ks.

# Replacing register 3 with register 4

<pre><code class="no-highlight">  add 0 4 3</code></pre>

# Comments

<pre><code class="no-highlight">  noop This is a block comment. You'll probably want
  noop to remove these in a final submission, though.

  noop You can also comment lines out:
  noop add 1 2 3</code></pre>

# Simple debugging

I wanted to stop and print the state when register 1 was 3. Register 6 was temporary.

<pre><code class="no-highlight">  lw 0 6 pos3
  beq 1 6 debug
...
debug halt
...
pos3 .fill 3</code></pre>

Of course, this should be removed.

# Some things I've noticed

These are some things that weren't obvious to me because I'm hardly an assembly programmer:

*   When you have a subroutine, assume no local variables. Anything that you want to persist through, say, recursion, you need to put onto the stack. I had trouble with "variable scope" in my projects.
*   When doing recursion, you don't need to put things onto the stack in the base case. It can shorten your code which can shorten your headache.
*   Assembly is hard.