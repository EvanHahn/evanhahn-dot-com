---
date: 2015-01-08
title: Install a list of Atom packages from a file
layout: post
url: /atom-apm-install-list/
---

Atom comes with [apm](https://github.com/atom/apm), the command-line Atom Package Manager. If you're like me, you like to keep your configuration files in a [dotfiles repo](https://dotfiles.github.io/), which means that you'd like to keep a list of Atom packages in a file somewhere. How do you do that?

First, you'll need a file that defines your desired packages. Let's say you want to install `language-c-sharp` and `seti-ui`. In order to do that, make a file that looks like this:

```
language-csharp
seti-ui
```

Each line is a package that Atom should install. You can also specify version numbers; for example, `language-csharp@0.3.0` is valid.

If you already have some packages installed, you can generate this file with the following shell command:

```sh
apm list --installed --bare > my_atom_packages.txt
```

The call to `apm list` will display all of your installed packages. The `--installed` flag only shows packages you've installed that aren't built into Atom, and the `--bare` flag removes formatting. This might generate a file like this:

```
language-csharp@0.3.0
seti-ui@0.5.1
```

If you're like me, you probably just want to install the _latest_ version of a package, whatever it is. You could write [a quick script](https://gist.github.com/EvanHahn/2b48b9c828af2c92fef9) to do it, or you could use grep to filter out the version information:

```sh
apm list --installed --bare | grep '^[^@]\+' -o > my_atom_packages.txt
```

Once you've generated the list of packages you want, it's time to install them. If your file is called `my_atom_packages.txt`, you can install it with the `--packages-file` flag:

```sh
apm install --packages-file my_atom_packages.txt
```

And you're in business! You can put `my_atom_packages.txt` in a Git repository or a Dropbox folder and keep your Atom packages in sync.
