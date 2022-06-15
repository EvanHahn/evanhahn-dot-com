---
date: 2014-05-05
title: Bitcoin prices with a shell one-liner
layout: post
url: /bitcoin-shell-one-liner/
---

I wanted to use my intermediate-at-shell skills to get the latest bitcoin price from [Coinbase](https://coinbase.com/?r=5150e82a9e19b7f80c000003). So I wrote this nasty thing:

```sh
curl -sSL https://coinbase.com/api/v1/prices/historical | head -n 1 | sed "s|^.*,|$|" | sed "s|\(\.[0-9]$\)|\10|"
```

I aliased it to `btc` and can now do this in my terminal:

```sh
btc
# $420.69
```

Kind of cool! If you're interested in how I made this work...

1.  First, we grab [the bitcoin prices from Coinbase](https://coinbase.com/api/v1/prices/historical) with curl.

         curl -sSL {{coinbase_url}} | ..

    We pass three arguments to curl. The lowercase `s` runs curl silently, and the capital `S` shows errors if any happen. The `L` flag tells curl to follow redirects, should any appear.

2.  The prices from Coinbase are in a long-ass file, so we only want the first line:

         .. | head -n 1 | ..

    Now we'll have an output like `2014-04-20T04:20:69-07:00,420.0`. The price is in there, but we need to clean it up to make it readable.

3.  Next, we use `sed` to remove everything up until the first comma and replace it with a dollar sign (because these prices are in USD).

         .. | sed "s|^.*,|$|" | ..

    Now we'll have something like `$420.0` -- really close! If the price has two digits after the decimal (like `$420.69`), then the next step doesn't do anything. But if so...

4.  We have to make sure the decimal has two digits after it.

         .. | sed "s|\(\.[0-9]$\)|\10|"

    This again uses `sed` to find something that ends in ".1", or ".2", or whatever. If it finds that, it appends a zero.

I'm not an expert with scripting and pipes and all of these, so I'm sure there's a better way to do this. But it was a fun exercise!

Happy bitcoining, nerds.
