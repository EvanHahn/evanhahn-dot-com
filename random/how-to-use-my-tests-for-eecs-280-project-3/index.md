---
title: How to use my tests for EECS 280 project 3
author: Evan Hahn
layout: page
---
Here are some instructions for use on CAEN (or any other Unix/Linux environment):

1. I'm gonna give you three things: `specrunner.cpp`, `test.sh`, and a folder called `spec_stuff`. Copy those into the same directory as `p3.cpp` and `p3.h`. Download them below.

2. `cd` into this directory.

3. Type the following command: `chmod -R 775 test.sh`.

4. You're all set up now! To run the tests, type `./test.sh`. This will compile and test your code. No need to compile it yourself!

If I have new tests, you'll need to update `specrunner.cpp` and possibly the `spec_stuff` folder.

[Download a version of the tests. Should be much closer to "complete".][1]

If you want to show successful tests, go to line 124 of `specrunner.cpp` and change it from false to true.

 [1]: http://cl.ly/1S1o2v0i3U3H0F1P282K