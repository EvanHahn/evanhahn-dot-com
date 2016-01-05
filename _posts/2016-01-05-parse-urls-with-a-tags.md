---
title: Parse URLs with &lt;a&gt; tags in JavaScript
layout: post
permalink: /parse-urls-with-a-tags/
---
I've needed to use JavaScript to parse URLs while working at [Braintree](https://www.braintreepayments.com/). In Node, this is easy; just use the built-in [URL module](https://nodejs.org/api/url.html). Before I started at Braintree, I thought browser-based URL parsing would require pulling in a third-party library or writing some tricky string parser. It turns out that there's an easy way that's built into browsers.

You can use `<a>` tags to parse out various attributes of a URL. For example, to get the hostname of a URL, you could do something like this:

```
var a = document.createElement('a')
a.href = 'http://evanhahn.com/parse-urls-with-a-tags/'

a.hostname  // => 'evanhahn.com'
```

You can grab things like `hostname`, `protocol`, `hash`, and much more. Take a look:

```
var a = document.createElement('a')
a.href = 'http://user:pass@evanhahn.com:8080/p/a/t/h?query=string#hash'

a.hash      // => '#hash'
a.host      // => 'evanhahn.com:8080'
a.hostname  // => 'evanhahn.com'
a.origin    // => 'http://evanhahn.com:8080'
a.password  // => 'pass'
a.pathname  // => '/p/a/t/h'
a.port      // => '8080'
a.protocol  // => 'http:'
a.search    // => '?query=string'
a.username  // => 'user'
```

This is really useful as a lightweight way to parse URLs!
