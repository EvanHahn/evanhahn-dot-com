---
title: A decade of dotfiles
url: /a-decade-of-dotfiles
date: 2022-05-29
publishDate: 2022-05-29
---

My first commit to [my dotfiles repository][0] was ten years ago. Here are a few things I've learned about maintaining a system configuration in that time.

(This will mostly be for macOS and Linux. I don't have experience configuring Windows or FreeBSD machines, for example.)

## Tools I like

- [`entr`](https://eradman.com/entrproject/) lets you run commands when files change. For example, `ls | entr make` will run `make` whenever any of the files from `ls` change. Many tools have flags like `--watch` which are usually better if available, but `entr` comes to the rescue in a number of situations. I use it to get rapid feedback on quick-and-dirty scripts (for example, `ls my_script.rb | entr ruby my_script.rb`) or when `--watch` flags don't exist or don't work (which happens to me a lot).
- [`ffmpeg`](https://ffmpeg.org/) is well-known, but I love it. I use it to convert audio and video files a few times per week. I often forget the arguments so I [built a small tool to interactively set up `ffmpeg` commands](https://evanhahn.github.io/ffmpeg-buddy/).
- [`shellcheck`](https://www.shellcheck.net/) is a linter for shell scripts. Without it, I fear I'll introduce some subtle computer-destroying bug into my Bash scripts. (I'll probably introduce one anyway.)
- [`stow`](https://www.gnu.org/software/stow/) makes it easy to pull in configuration files piecemeal, and it's what I use to "move" my dotfiles out of a repository folder and into a configuration folder.
- [`tig`](https://jonas.github.io/tig/) is an interactive ncurses-based interface for Git. I usually use it to navigate Git history. I prefer its UI to `git log` most of the time.
- [`youtube-dl`](https://youtube-dl.org/)'s name is a bit of a misnomer: it downloads audio and video from a variety of different websites, including YouTube. It's great for downloading audio and video for offline usage.
- [`z`](https://github.com/rupa/z) watches where you `cd` and learns the directories you frequent. Later, you can quickly jump from anywhere to one of these directories. For example, after a little while, `z dotfiles` takes me to my dotfiles directory.

## Tools I made

- [`boop`](https://gitlab.com/EvanHahn/dotfiles/-/blob/ece393e625bb8254fe05774df33bb5af8a73d7e7/home/zsh/.config/zsh/aliases.zsh#L48-56) plays a happy sound if the previous command exited successfully (i.e., exited with status code 0) and a sad sound otherwise. For example, if I'm running a long-running test, I might run `npm test ; boop`. It helps me know whether something finished, and whether something went wrong.
- [`jsproj`](https://gitlab.com/EvanHahn/dotfiles/-/blob/ece393e625bb8254fe05774df33bb5af8a73d7e7/home/bin/bin/jsproj) isn't something I expect anyone else to use, but it's useful to quickly scaffold a project. I've got a few similar scripts, like [`lilvagrant`](https://gitlab.com/EvanHahn/dotfiles/-/blob/ece393e625bb8254fe05774df33bb5af8a73d7e7/home/bin/bin/lilvagrant), which are the same idea: create a few files and run some common commands.
- [`murder`](https://gitlab.com/EvanHahn/dotfiles/-/blob/ece393e625bb8254fe05774df33bb5af8a73d7e7/home/bin/bin/murder) is just an easier-to-use `kill`. It offers me two main features: (1) I don't have to know the pid; `murder ruby`, for example, saves you a step (2) it starts by asking nicely with `SIGTERM`, waits a bit, and then gets more and more "aggressive" before eventually sending `SIGKILL`. It's a simple script but I use it whenever a process really needs to be shut down.
- [`running`](https://gitlab.com/EvanHahn/dotfiles/-/blob/ece393e625bb8254fe05774df33bb5af8a73d7e7/home/bin/bin/running) is sugar on top of `ps aux | grep $PROCESS`, which I find a little hard to read sometimes.
- [`theme`](https://gitlab.com/EvanHahn/dotfiles/-/blob/ece393e625bb8254fe05774df33bb5af8a73d7e7/home/bin/bin/theme) lets me change the whole system from light to dark theme. It also updates configuration files. [There exist more elegant solutions](https://arslan.io/2021/02/15/automatic-dark-mode-for-terminal-applications/) which I wanna try.

In another decade, I bet I'll learn that half of these are already covered by built-ins that have been around since 1970.

## Prefer scripts over aliases

Let's say I want to have a custom command called `foo`. I could do this in one of three ways:

1. Add an alias to my shell configuration, like `alias foo=...`
1. Add a function in my shell configuration, like `foo () { ... }`
1. Write a full shell script, and add it to my `$PATH`

I usually prefer to do the last option: a full shell script. It's a bit more heavyweight, but it has a couple of advantages:

- You don't need to reload your shell when you work on it. If you decide you want `foo` to behave a little differently, just edit the script and you're done. You can even add new scripts to the folder and they'll automatically be available. With functions and aliases, you need to reload things before they're available.
- You have more choices of programming language. If you're using Bash, aliases and functions have to be written in Bash. But scripts can be written in whatever you want, because they're just executables like any other. I avoid writing scripts in compiled languages because I don't want the complexity of a build step, but I could do it.

I do this by having a folder, `bin/` which I add to my `$PATH`.

It doesn't work for everything. For example, I have a `boop` command (which I mentioned above) that needs access to the previous command's exit status—as far as I know, that's impossible with a script.

## Every computer is different

I've stopped trying to make my configuration work effortlessly on any computer. Some amount of manual work is required to scaffold a new machine. In other words, I don't have a fancy provisioning script any more.

What works well on macOS may not work well on Ubuntu, and what works well on your modern laptop might not work well on some old server. And don't get me started on Windows—for better or worse, that's a very different environment.

I used to have setup scripts that would provision a new machine with a single command. These scripts got complicated and rarely worked exactly right. Instead, I try to organize things to be customizable per machine.

There are several parts to this:

- I pull in configuration files piecemeal. For example, if I want to use my standard Vim configuration but not my standard tmux configuration, I can. I use [Stow](https://www.gnu.org/software/stow/) for this, and only stow configurations I need for that particular system.
- I usually want per-machine configuration. For example, I use [the common `vimrc_local` pattern](https://gitlab.com/EvanHahn/dotfiles/-/blob/ece393e625bb8254fe05774df33bb5af8a73d7e7/home/vim/.config/nvim/init.vim#L296-300). These files aren't checked into my main dotfiles repository. It's useful for things you might only want on, say, your work computer.
- I jump between macOS and Linux frequently, and there are many subtle differences to smooth out. Sometimes I try to make the experience consistent. [Installing the GNU versions of tools like `grep` on macOS](https://apple.stackexchange.com/a/69332) helps, as do aliases. The rest of the time, I don't—making the experience perfectly seamless feels like a losing battle.
- I try to add fallbacks where relevant. For example, [my `$EDITOR` environment variable](https://gitlab.com/EvanHahn/dotfiles/-/blob/ece393e625bb8254fe05774df33bb5af8a73d7e7/home/zsh/.config/zsh/env.zsh#L18-24) tries `nvim` first, then `vim`, then `vi`. And, in my Vim configuration, I try to [gracefully handle cases where I can't enable some option](https://gitlab.com/EvanHahn/dotfiles/-/blob/ece393e625bb8254fe05774df33bb5af8a73d7e7/home/vim/.config/nvim/init.vim#L133-137).

The stuff above is certainly helpful, but I'd be lying if I said it was seamless. However, this piecemeal approach is simpler and is _way_ less of a headache than trying to have fancy setup scripts. (For me, anyway!)

This probably wouldn't work if I were provisioning machines frequently. I only provision a new machine a handful of times a year, and most of the time those are virtual machines. I'd probably want something more automatic if I did this more often.

## Every person is different

Saying that I've been maintaining my dotfiles for a decade is like saying that I've been decorating my home for a decade. I probably know what works for me, but that doesn't mean I know what you'll like!

## Another ten years?

Who knows what computing will look like in ten years? People are improving every part of the developer stack, from the operating system to the terminal to the editor, and my work changes a little bit every day. Maybe I won't have _any_ dotfiles in 2032, or maybe I'll still be tweaking my `.vimrc`.

In any case, it's been a lot of fun!

[0]: https://gitlab.com/EvanHahn/dotfiles
