---
date: 2017-01-05
title: Prevent Homebrew from gathering analytics
layout: post
url: /prevent-homebrew-from-gathering-analytics/
---

[Homebrew gathers anonymous analytics about its users.](https://github.com/Homebrew/brew/blob/master/docs/Analytics.md) The Homebrew maintainers explain that they use the anonymous data to help the project, but you might want to disable this for two reasons:

1. You don't want any of your data being shared at all.
2. You want to avoid an unnecessary analytics network request.

You can disable Homebrew's analytics in one of two ways:

With a command:

```sh
brew analytics off
```

Or with an environment variable:

```sh
export HOMEBREW_NO_ANALYTICS=1
```

You can set this in your shell startup (your `.bashrc`, for example).

To see whether Homebrew is gathering data, you can run this command to print whether it's enabled:

```sh
brew analytics
```
