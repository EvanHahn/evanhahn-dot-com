---
date: 2012-06-27
title: Cancel a git-flow branch
description: Just delete it like a normal branch.
author: Evan Hahn
layout: post
url: /cancel-a-git-flow-branch/
---

To trash a branch using [git-flow](https://github.com/nvie/gitflow), simply delete it like you'd normally delete a Git branch:

```sh
git branch -D whatever/branch/you/wanna/delete
```

Note that this does a _forced_ delete, so anything you did on that branch will be lost. You can be safer with the lowercase `-d` flag instead.

How this came about: I made a release branch but didn't need it. Git-flow doesn't let you have more than one release branch out at a time. I thought that there might be some issue with residual git-flow files laying around, but (force) deleting the branch was actually safe.
