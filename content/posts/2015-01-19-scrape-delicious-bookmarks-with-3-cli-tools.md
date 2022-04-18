---
date: 2015-01-19
title: Scrape Delicious bookmarks with 3 command-line tools
layout: post
url: /scrape-delicious-bookmarks-with-3-cli-tools/
---

_I'm leaving this post up for posterity even though Delicious is long gone._

I use [Delicious](https://delicious.com/) for syncing my bookmarks. I wanted to have my bookmarks offline. I didn't want to wrestle the Delicious API, so I tried writing a Bash one-liner. Every problem can be solved by an unwieldy Bash one-liner, right?

First, you'll need to install three things.

1. `dels`, a [Delicious command-line interface](https://github.com/epitron/delicious-cli). It's a Ruby gem, so install it with `gem install delicious-cli`.
1. [jq](https://stedolan.github.io/jq/) for parsing JSON. [Check out its download instructions.](https://stedolan.github.io/jq/download/)
1. [wget](https://www.gnu.org/software/wget/) for grabbing URLs. `brew install wget` can install this on OSX, and [there are other ways for other systems](http://wget.addictivecode.org/FrequentlyAskedQuestions#download).

Once you've installed `dels`, you'll need to authenticate by just running `dels` with no arguments. To sync your bookmarks (whenever), type `dels -s`. You'll probably want to do this before you run your backup so that you have the latest from Delicious.

We'll combine these three commands, like this:

    dels -aj | jq '.[] | .href' | xargs -L 1 wget --page-requisites --convert-links --timestamping --adjust-extension --quiet --show-progress

That command above scrapes all of your bookmarks into the current directory. If you want to blindly trust me, just run that command. If you'd like an explanation, read on.

`dels -aj` will output all of your bookmarks as a JSON array. The `-a` flag outputs all links and the `-j` flag outputs the results as JSON. That's step 1; pretty easy! The result might look something like this:

```
[
  {
    "description": "Indie Game Jams",
    "extended": "",
    "hash": "f041d62bc96a7ee2bf02896ee8cb06e9",
    "href": "http://www.indiegamejams.com/",
    "private": "no",
    "shared": "yes",
    "tag": "indie competition contest game gamedev",
    "time": "2014-12-16T17:02:49+00:00",
    "time_string": "2014-12-16T17:02:49Z"
  },
  {
    "description": "burrito-eating champion",
    ...
```

Next, we pipe it to the `jq '.[] | .href'` bit. `.[]` will give you all of the results of an array, and then we grab all of the `href`s out of our response. Now we have all of our links! The output might now look something like this:

> http://www.indiegamejams.com/
>
> http://www.nydailynews.com/life-style/eats/man-wins-burrito-eating-championship-chowing-33-10-minutes-article-1.403877
>
> ...

Now we want to scrape all of these, and we'll use `wget` for that. We'll combine several of its command line flags:

- `--page-requisites` downloads all of the necessary files for an HTML page, from CSS to images.
- `--convert-links` converts "the links in the document to make them suitable for local viewing". In other words, if you downloaded `http://example.com/index.html` and it contains a link to a relative resource like `<a href="about.html">`, wget will rewrite the HTML and make it `<a href="http://example.com/about.html">`.
- `--timestamping` keeps you from redownloading everything if you run this command again—you'll only grab what you need to.
- `--adjust-extension` will add the `.html` extension to pages that don't have a file extension (where appropriate).
- `--quiet` and `--show-progress` will keep your terminal from overflowing with information, but you'll still have some.

To pipe each URL to wget, we'll use `xargs`. We'll pipe it like this:

    ... | xargs -L 1 wget --page-requisites ...

The `-L 1` runs `wget` on each line. And that's everything! Once again, here's the full command:

    dels -aj | jq '.[] | .href' | xargs -L 1 wget --page-requisites --convert-links --timestamping --adjust-extension --quiet --show-progress

Run this and scrape your Delicious bookmarks!
