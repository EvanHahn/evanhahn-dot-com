---
date: 2016-12-26
title: Automatically ls when changing directories in zsh
layout: post
url: /automatically-ls-when-changing-directories-in-zsh/
---

The first thing I do when changing directories in the terminal is `ls` to get my bearings. I usually do it without thinking.

I used to do this manually, but then I learned that zsh has a way to do this for me. Zsh offers ["hook functions"](http://zsh.sourceforge.net/Doc/Release/Functions.html#Hook-Functions), which can be defined and are executed when certain events happen. One of these functions, `chpwd`, will be "executed whenever the current working directory is changed."

Add something like this to your `.zshrc`:

```sh
chpwd() {
  ls
}
```

Now you'll `ls` whenever you `cd` (or `pushd`)!
