---
title: What does "brew cask update" actually do?
layout: post
permalink: /brew-cask-update-versus-brew-update/
---
*In short: `brew cask update` just calls `brew update`.*

I found myself confused by the `brew cask update` command in [Homebrew Cask](http://caskroom.io/). Its docs say "a synonym for 'brew update'", but that left me a bit confused. Does it update the Homebrew Cask list, or does it call `brew update` and do nothing else? It turns out that it's the latter.

To find this out, I went spelunking in [the source code](https://github.com/caskroom/homebrew-cask). I found `update.rb`, which contained the following lines:

```
def self.run(*_ignored)
  result = Hbc::SystemCommand.run(Hbc.homebrew_executable,
                                  :args => %w{update})
  # ...
          print result.stdout
  $stderr.print result.stderr
  exit result.exit_status
end
```

This means that when you call `brew cask update`, you're really just deferring to `brew update`.
