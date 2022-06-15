---
date: 2014-12-02
title: Disable the beer emoji in Homebrew
layout: post
url: /disable-homebrew-emoji/
---

I'm like almost every other programmer who uses OSX: I love the [Homebrew](https://brew.sh/) package manager. When I use Linux, I wish I had something as good (and I'm afraid to try [Linuxbrew](https://brew.sh/linuxbrew/) for some reason). It's a delight to use.

There was a _very_ minor annoyance that I had with Homebrew: it displays a [beer emoji](https://emojipedia.org/beer-mug/) in a few places. This wasn't a big bother, but I found out that you can disable it! Add the following to your `bashrc` (or to your `zshrc`, as the case may be):

```sh
export HOMEBREW_NO_EMOJI=1
```

This environment variable will, as you might expect, disable emoji in Homebrew! Nice to know that I can fix a miniscule annoyance.
