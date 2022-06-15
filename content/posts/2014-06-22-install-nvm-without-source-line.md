---
date: 2014-06-22
title: Install Node Version Manager without the source line
layout: post
url: /install-nvm-without-source-line/
---

I like the [Node Version Manager](https://github.com/nvm-sh/nvm) for, well, managing Node.js versions. When you install it, it adds a `source` to the bottom of your profile (effectively `source nvm.sh`). I didn't want it to do that during installation, though. I found myself pondering, "How do I disable that?"

It's pretty easy, it turns out; you just tell it to redirect that source line elsewhere, like so:

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/{{LATEST NVM VERSION HERE}}/install.sh | PROFILE=/dev/null bash
```

The install script looks for a variable called "PROFILE" and adds the `source` line to that, so setting it to `/dev/null` adds the line to nothing!

You could also install it by cloning it from Git and doing it manually, but I prefer this because I can be sure I'm getting a stable version without doing a lot of commands.
