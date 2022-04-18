---
date: 2014-12-13
title: Firefox preferences in dotfiles with Vimperator
layout: post
url: /configure-firefox-with-vimperator/
---

_Note: this post is now out of date._

I'm a big fan of syncing my preferences with my [dotfiles Git repository](https://gitlab.com/EvanHahn/dotfiles). It lets me sync my `.vimrc`, my `.bashrc`, and more. [Vimperator](http://www.vimperator.org/vimperator) is a Firefox extension that puts Vim-style keybindings into the browser (much like Chrome's [Vimium](https://vimium.github.io/)), but it has another great feature: the `.vimperatorrc` file.

If you're a hardcore Firefox user, you've likely seen `about:config`. If you type that into your Firefox address bar, you'll see a _ton_ of options and flags. Some of its settings are in Firefox's user-facing settings, like `browser.startup.homepage`. Other options are hidden from the menus, like `browser.tabs.closeButtons` to control where the tab close buttons appear. You can even use it to configure your extensions!

Vimperator's `.vimperatorrc` lets you configure these settings. For example, to set your browser's homepage, add this to `~/.vimperatorrc`:

```
set! browser.startup.homepage=https://duckduckgo.com/
```

You can check out [my Vimperator config](https://github.com/EvanHahn/dotfiles/blob/master/resources/vimperatorrc) if you're looking for a huge slew of options; I've found a lot of really helpful tweaks to make Firefox my own.
