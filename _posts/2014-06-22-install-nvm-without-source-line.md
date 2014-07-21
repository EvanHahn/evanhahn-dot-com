---
title: Install Node Version Manager without the source line
layout: post
permalink: /install-nvm-without-source-line/
---
I like the [Node Version Manager](https://github.com/creationix/nvm) for, well, managing Node.js versions. When you install it, it adds a `source` to the bottom of your profile (effectively `source nvm.sh`). I didn't want it to do that during installation, though. I found myself pondering, "How do I disable that?"

It's pretty easy, it turns out; you just tell it to redirect that source line elsewhere, like so:

    curl https://raw.githubusercontent.com/creationix/nvm/{{LATEST NVM VERSION HERE}}/install.sh | PROMPT=/dev/null sh

The install script looks for a variable called "PROMPT" and adds the `source` line to that, so setting it to `/dev/null` adds the line to nothing!

You could also install it by cloning it from Git and doing it manually, but I prefer this because I can be sure I'm getting a stable version without doing a lot of commands.
