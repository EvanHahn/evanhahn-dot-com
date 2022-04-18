---
date: 2012-04-30
title: Doing without jQuery
author: Evan Hahn
layout: post
url: /doing-without-jquery/
---

**Edit: [You Might Not Need jQuery][1] is a great resource that's probably better than mine.**

I don't have to tell you that jQuery is fantastic and saves tons of time.

In some cases, you only need a small subset of its features and don't need to load the whole thing. Below is a quick reference for how to do things without jQuery -- sometimes in vanilla JavaScript, sometimes with smaller libraries. This reference is not comprehensive; I omit things because (1) I feel they should be left to jQuery (2) I am lazy.

## In general

- [Zepto][2] is a much smaller version of jQuery that is almost indistinguishable, but it drops support for older browsers and IE.

- jQuery is made with compatibility in mind. Some of these options might not be -- use at your own risk.

- It might not make sense to load smaller libraries if jQuery is already cached via a CDN like Google's. Upsides of smaller libraries: shorter load if not cached, faster execution time. Downsides: slower load if jQuery is cached, less thinking for you as the developer. Your call.

- This guide is also [available as plain text][3] (because that's how I keep it!).

## Selectors

Selecting by ID:

    $('#foo')
    document.getElementById('foo')

Selecting by class ([not compatible with IE6-8][4], but good with everything else):

    $('.bar')
    document.getElementsByClassName('bar')

Selecting by tag name:

    $('span')
    document.getElementsByTagName('span')

Selecting sub-elements:

    $('#foo span')
    document.getElementById('foo').getElementsByTagName('span')

Selecting "special" elements:

    $('html')
    document.documentElement

    $('head')
    document.head

    $('body')
    document.body

There are a number of libraries that have jQuery's selector functionality; my favorite is the tiny [Qwery][5].

## Attributes

Getting/setting HTML:

    $('#foo').html()
    document.getElementById('foo').innerHTML

    $('#foo').html('Hello, world!')
    document.getElementById('foo').innerHTML = 'Hello, world!'

Dealing with classes:

    $('#foo').addClass('bar')
    document.getElementById('foo').className += ' bar '

    $('#foo').removeClass('bar')
    document.getElementById('foo').className = document.getElementById('foo').className.replace(/\bbar\b/gi, '')

    $('#foo').hasClass('bar')
    document.getElementById('foo').className.search(/\bbar\b/gi) !== -1

Getting an input's value:

    $('#foo').val()
    document.getElementById('foo').value

## Effects

Showing and hiding:

    $('#foo').show()
    document.getElementById('foo').style.display = ''

    $('#foo').hide()
    document.getElementById('foo').style.display = 'none'

Changing CSS:

    $('#foo').css('background-color', 'red')
    document.getElementById('foo').style.backgroundColor = 'red'

For animation, use the [Morpheus library][6].

## Events

### Document ready

If you're like me, the most common event you use is jQuery's `$(document).ready` (or some version of it). Two ways to do this.

First, do it the way MDN does it:

    document.onreadystatechange = function() {
        if (document.readyState === 'complete') {
            // DOM is ready!
        }
    };

Second, use [domReady][7], a tiny library that's used like this:

    domready(function() {
        // DOM is ready!
    });

### Clicks

    $('#foo').click(function() { ... })
    document.getElementById('foo').onclick = function() { ... }

### All other events

If you don't want to use jQuery, use [Bean][8]. It's good stuff.

## AJAX

If you don't want to use jQuery, use the [Reqwest library][9].

## Utilities

Parsing JSON:

    jQuery.parseJSON(json)
    JSON.parse(json)
    // The JSON object isn't in older browsers, so you can include it if it's not there.
    // https://github.com/douglascrockford/JSON-js/blob/master/json2.js

## Conclusion

If this shows you anything, it's that jQuery saves you from a fair bit of headache. If you've thought about it and you still want to avoid jQuery, I hope this reference can help you!

[1]: http://youmightnotneedjquery.com/
[2]: http://zeptojs.com/
[3]: https://evanhahn.com/wp-content/uploads/2012/04/doing-without-jquery.txt
[4]: https://caniuse.com/#feat=getelementsbyclassname
[5]: https://github.com/ded/qwery
[6]: https://github.com/ded/morpheus
[7]: https://github.com/ded/domready
[8]: https://github.com/fat/bean
[9]: https://github.com/ded/reqwest
