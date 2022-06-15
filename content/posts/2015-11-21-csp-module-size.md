---
date: 2015-11-21
title: The CSP module is the largest part of Helmet
layout: post
url: /csp-module-is-the-largest-part-of-helmet/
---

**This post is written for an old version of Helmet.**

_This post is aimed at people that have some familiarity with my [Helmet Node.js module](https://github.com/helmetjs/helmet/)._

[Helmet](https://github.com/helmetjs/helmet/) is a Node.js module that helps you secure your Express applications by setting various HTTP headers. It sets headers like `X-Frame-Options` to help prevent a kind of attack called "clickjacking" or `X-XSS-Filter` as a basic protection against cross-site scripting attacks. If you're writing an Express app (or a Connect or Koa app), I hope you'll give it a look!

The bulk of the module is pretty straightforward: just set nine HTTP headers. Some of the headers are set every time no matter what, while others have a small amount of logic associated with them. Eight of them are simple and one of them is a beast: the Content Security Policy (CSP) module. I'll spend this post talking about why that module is so much bigger than the rest.

Expect this to be boring.

## Stats

I certainly _feel_ like the CSP part of Helmet is the biggest. I spend the most time working on it and it's the hardest to wrap my head around. But how much bigger is it?

[cloc](https://github.com/AlDanial/cloc/) is a cool program that counts lines of code. I used it to see which module was the biggest, and made sure to exclude `node_modules`, `package.json`, and test files. To see how big each module was, I ran this command in each directory:

```sh
cloc --quiet --exclude-dir=node_modules,test --not-match-f='package\.json' --include-lang=Javascript,JSON .
```

It gave me the following stats:

- [helmetjs/helmet](https://github.com/helmetjs/helmet) - 47 lines
- **[helmetjs/csp](https://github.com/helmetjs/csp) - 199 lines**
- **[helmetjs/content-security-policy-builder](https://github.com/helmetjs/content-security-policy-builder) - 24 lines**
- [helmetjs/hide-powered-by](https://github.com/helmetjs/hide-powered-by) - 14 lines
- [helmetjs/hpkp](https://github.com/helmetjs/hpkp) - 44 lines
- [helmetjs/hsts](https://github.com/helmetjs/hsts) - 49 lines
- [helmetjs/ienoopen](https://github.com/helmetjs/ienoopen) - 6 lines
- [helmetjs/nocache](https://github.com/helmetjs/nocache) - 13 lines
- [helmetjs/dont-sniff-mimetype](https://github.com/helmetjs/dont-sniff-mimetype) - 6 lines
- [helmetjs/frameguard](https://github.com/helmetjs/frameguard) - 27 lines
- [helmetjs/x-xss-protection](https://github.com/helmetjs/x-xss-protection) - 20 lines

You can think of it this way:

- CSP code: 223 lines
- everything else combined: 226 lines

## Why is it so big?

In short, the size of the CSP module comes from browser sniffing.

Every browser supports a slightly different variation of Content Security Policy (or don't support it at all). The simplest example is the name of the header. Newer browsers call the header `Content-Security-Policy` and older ones choose `X-Content-Security-Policy` or `X-WebKit-CSP`. There are _loads_ of other browser differences that are much more difficult to deal with.

The CSP module has to inspect user agents to figure out what headers to set and how to set them. This is a nightmare. Without browser sniffing, this module would probably be about 30 lines; with browser sniffing, it's almost 200!

In my opinion, that's the real differentiator of Helmet. The rest of the library could be rewritten from scratch in a pretty short amount of time, but the amount of code and research that went into CSP-related browser quirks is pretty unique. It's the most frustrating to deal with, but it's the most important!
