---
date: 2018-02-01
title: Show only production dependencies with npm
layout: post
url: /show-only-production-dependencies-with-npm/
---

_In short, `npm ls --prod` will show the tree of your non-development dependencies._

I try to limit the number of dependencies I use in my open source modules for security and simplicity. I wanted to see the tree of dependencies while working on [Helmet](https://helmetjs.github.io/) to make sure I wasn't pulling in more than I needed, but `npm ls` gave me _all_ of my dependencies, including development dependencies like my testing framework, which I didn't need to see.

Luckily, npm has a `--prod` flag for this! Run `npm ls --prod` to only see your "regular" dependencies, not your `devDependencies`.

If you want to do the opposite and only see `devDependencies`, give `npm ls --dev` a try.

Hope this little tip helps!
