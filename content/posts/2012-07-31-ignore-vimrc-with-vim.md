---
date: 2012-07-31
title: Start Vim and temporarily ignore your .vimrc
description: '"vim -u NONE" starts Vim without a .vimrc.'
author: Evan Hahn
layout: post
url: /ignore-vimrc-with-vim/
---

To start Vim without looking at your vimrc file:

```sh
vim -u NONE
```

It also works with `mvim` (I didn't test with `gvim` but I assume it works). This also ignores your `.vim` directory.

I wanted to teach Vim to some people and wanted to temporarily disable my vimrc, so I looked at the man page and found this out.
