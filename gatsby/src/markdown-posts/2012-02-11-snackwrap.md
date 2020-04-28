---
title: SnackWrap!
layout: post
path: /snackwrap/
---

_In short: [SnackWrap](https://github.com/EvanHahn/SnackWrap) lets you run shell scripts whenever files changed. It's like a "watch" flag on steroids._

Let's say that, every time you modify a JavaScript file in your project, you want to concatenate it with all the other JavaScript files. You don't want to have to manually run a shell script every time you hit Save -- it should be automatic.

Enter SnackWrap, which is my solution to this issue. You run SnackWrap and then it watches any file you choose, and when a file changes, you can run a command.

For example, let's say I want to concatenate all of my JavaScript every time I save a file. I have a shell script that does it:

    cat js/libs/jquery.js js/namespace.js js/config.js js/functions.js > scripts.js

So we make a config file for SnackWrap that looks like this:

    js/namespace.js     ./js.sh
    js/config.js        ./js.sh
    js/functions.js     ./js.sh
    js/libs/jquery.js   echo Why are you changing jQuery?

And then we run it in the command line like this:

    ./snackwrap config.txt

And that's it. Now, whenever any of those files change, you can execute the shell command.

You can learn more and download it at the [SnackWrap GitHub page](https://github.com/EvanHahn/SnackWrap).
