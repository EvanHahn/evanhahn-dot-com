---
title: "Parse URLs with <a> tags in JavaScript"
layout: post
path: /parse-urls-with-a-tags/
---

I've needed to use JavaScript to parse URLs. If you're in a modern environment with access to [the standard `URL` object](https://developer.mozilla.org/en-US/docs/Web/API/URL), you're all set. But what if you're in an old browser that doesn't have that, and you don't want to pull in a new library?

You can use `<a>` tags to parse out various attributes of a URL. For example, to get the hostname of a URL, you could do something like this:

```
var a = document.createElement('a')
a.href = 'https://evanhahn.com/parse-urls-with-a-tags/'

a.hostname  // => 'evanhahn.com'
```

You can grab things like `hostname`, `protocol`, `hash`, and much more. Take a look:

```
var a = document.createElement('a')
a.href = 'https://user:pass@evanhahn.com:8080/p/a/t/h?query=string#hash'

a.hash      // => '#hash'
a.host      // => 'evanhahn.com:8080'
a.hostname  // => 'evanhahn.com'
a.origin    // => 'http://evanhahn.com:8080'
a.password  // => 'pass'
a.pathname  // => '/p/a/t/h'
a.port      // => '8080'
a.protocol  // => 'https:'
a.search    // => '?query=string'
a.username  // => 'user'
```

This is really useful as a lightweight way to parse URLs!
