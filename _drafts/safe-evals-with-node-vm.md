---
title: "Safe evals with Node's vm module"
layout: post
permalink: /node-vm-safe-evals/
---
Call me crazy, but sometimes you want to run JavaScript code. And sometimes (but far more rarely), you want to run a JavaScript string. But JavaScript programmers worldwide will tell you not to touch `eval`. I don't want to preach about that, because Node gives us an alternative: the [vm module](http://nodejs.org/api/vm.html).
