---
title: The comprehensive guide to disabling selection on the web
author: Evan Hahn
layout: post
path: /how-to-disable-copy-paste-on-your-website/
---

Somebody asked me if I could figure out how to disable copy-paste on their website. I did some sleuthing and figured out that the internet really has no complete answer; here's the most comprehensive way to do it that I found.

_I don't really think that you should do this, nor does it work perfectly._ These are simply my findings.

_Update, January 9, 2013: Added a ton of stuff and made many corrections._

_Update, June 22, 2014: Added IE6 toolbar info and some library version changes._

## In short: disabling _all_ copy-paste, for the non-technical

You can't do it perfectly, but you can stop some people. To do so, add the following somewhere inside your `<head>` tag:

    <style>
    .nonselectable{-webkit-user-select:none;-khtml-user-drag:none;-khtml-user-select:none;-moz-user-select:none;-moz-user-select:-moz-none;-ms-user-select:none;user-select:none}
    .selectable{-webkit-user-select:auto;-khtml-user-drag:auto;-khtml-user-select:auto;-moz-user-select:auto;-ms-user-select:auto;user-select:auto}
    </style>
    <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script>
    $('html').addClass('nonselectable');
    $.fn.ready(function(){var b=$(".nonselectable"),c=$(".selectable");b.on("dragstart, selectstart",function(a){a.preventDefault()});c.on("dragstart, selectstart",function(a){a.stopPropagation()});b.find("*").andSelf().attr("unselectable","on");c.find("*").andSelf().removeAttr("unselectable")});
    </script>

This will keep some people from copy-pasting things off of your site, but it _won't stop everyone_ and might annoy some people!

## In short, for the technical

My recommended solution: add the class `nonselectable` to anything you want to be nonselectable, and include [this CSS](/wp-content/uploads/2011/08/nonselect.css) and [this JavaScript](/wp-content/uploads/2011/08/nonselect.js) (requires jQuery). If you want a sub-element of a nonselectable element to be selectable, give it the class `selectable`. And use it sparingly!

Let's explore how this solution is achieved.

## CSS for some browsers

There's a CSS property called `user-select` that lets you do this with CSS (awesome!). Because it's not fully compatible, it's got a bunch of vendor-prefixed declarations. Adding the following to your CSS will make `.my-element` unselectable:

    .my-element {
      -webkit-user-select: none;
      -khtml-user-drag: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -moz-user-select: -moz-none;
      -ms-user-select: none;
      user-select: none;
    }

Here's what I can piece together about the compatibility of this:

- Chrome: Compatible with all versions because all versions are built on WebKit, but requires the prefix.

- Firefox: Compatible with Firefox 1+, according to [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/user-select).

- Safari: [According to the Safari documentation](https://developer.apple.com/library/safari/#documentation/AppleApplications/Reference/SafariCSSRef/Articles/StandardCSSProperties.html#//apple_ref/css/property/-webkit-user-select), `-webkit-user-select` is compatible with Safari 3+, and it was called `-khtml-user-drag` in Safari 2.

- IE: It looks like [IE10](https://blogs.msdn.com/b/ie/archive/2012/01/11/controlling-selection-with-css-user-select.aspx) is the first version to support `-ms-user-select`. I tried it in IE9 and it doesn't support it.

You might notice that the Mozilla solution is `-moz-none`. It also supports the regular `none`, but [Mozilla's documentation](https://developer.mozilla.org/en-US/docs/CSS/user-select) notes an important distinction: this prevents sub-elements from being able to be selectable. The reason that I put both `none` and `-moz-none` is because some browsers (like Netscape 6) _won't_ pick up the `-moz-none` definition, but they _will_ pick up the `none` declaration. (Look at me, all caring about Netscape 6 users.)

Worth noting that these don't pass W3C validations. The prefixed declarations make the W3C Validator only give a warning, not an error.

Solved so far: Chrome, Firefox, Safari, IE10.

### Mixins!

I made `user-select` mixins for SCSS, LESS, and Stylus. Many things already have these mixins without that (to name a few: [Compass](http://compass-style.org/reference/compass/css3/user_interface/#mixin-user-select), [Bourbon](http://bourbon.io/#user-select), [Bootstrap](https://github.com/twbs/bootstrap/blob/master/less/mixins/vendor-prefixes.less), [LESS Elements](https://github.com/dmitryf/elements/blob/master/elements.less#L123), [LESSHat](https://github.com/madebysource/lesshat/blob/master/README.md#user-select), and [Nib](https://github.com/tj/nib/blob/master/lib/nib/vendor.styl#L64), but mine are _ever so slightly_ more thorough than theirs. Ha!

- [LESS](/wp-content/uploads/2011/08/user-select.less)
- [SCSS](/wp-content/uploads/2011/08/user-select.scss)
- [Stylus](/wp-content/uploads/2011/08/user-select.styl)

They're pretty straightforward mixins. Usage instructions are found inside.

## JavaScript events for IE, Safari, and Chrome

There are two JavaScript events called `onselectstart` and `ondragstart`, which are apparently compatible with IE4+ and all versions of Safari, and Chrome, from what I can tell.

If you're using jQuery, here's how you use it:

    $('.nonselectable').on('dragstart, selectstart', function(evt) {
      evt.preventDefault();
    });

You can do this without jQuery, too. It's even more of a nightmare, and I wouldn't recommend it. Go spend time with your family or something.

Solved so far: Chrome, Firefox, Safari, IE10, IE4+ with JavaScript.

## Solving things in Opera and IE 5.5+

We still haven't solved Opera or JavaScript-free IE 5.5+. Prepare to die.

There's an HTML attribute called `unselectable` that's compatible with Opera and Internet Explorer (and others, but we've solved them). Here's how you use it:

    <div unselectable="on">This text is unselectable by IE users!</div>

That's all good and dandy, but it's got one major issue: the property isn't inherited. (It's also worth noting that it's not W3C valid.) If your parent is unselectable, you are selectable by default. For example:

    <p unselectable="on">
      This text is unselectable in IE! Unfortunately, <b>this bold stuff IS selectable</b>.
    </p>

So, in order to make `unselectable` work, you have to make sure to apply it on _every element_ that you don't want to be selected. This is _incredibly_ tedious, but might be alright if you have a small number of unselectable elements.

### A JavaScript solution to this tedium

You could use JavaScript to go through each HTML element and apply the `unselectable` property. This is _only_ useful for targeting Opera -- we have a shorter, faster, and more compatible version in the "JavaScript events for IE" section above.

If you're using jQuery (or Zepto):

    // change this selector if you don't want to kill all elements
    $('*').attr('unselectable', 'on');

If you aren't using jQuery, here's a solution that [looks like](http://www.aptana.com/reference/api/Document.html#Document.getElementsByTagName) it hits any version above Opera 7:

    var elements = document.getElementsByTagName('*');  // change this if you don't want to kill all elements
    for (var i = 0, l = elements.length; i < l; i ++) {
      elements[i].setAttribute('unselectable', 'on');
    }

If you don't care about Opera but _do_ care about IE, use the solutions above.

Solved so far: Chrome, Firefox, Safari, IE10, IE4, Opera. The last two either require JavaScript or a headache.

## My proposed solution

And now I shall explain my solution I skimmed over in the "in short" section.

First, add this CSS:

    .nonselectable {
      -webkit-user-select: none;
      -khtml-user-drag: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -moz-user-select: -moz-none;
      -ms-user-select: none;
      -o-user-select: none;
      user-select: none;
    }

This will cover Chrome, Firefox, Safari, and IE10. All you have to do is add the class `nonselectable` to elements that shouldn't be selectable. You can also use one of the preprocessor mixins in sections above.

I _usually_ stop there and forget about old IE and Opera. If you don't want to do that, you'll need to add `unselectable="on"` to any element (and any of its sub-elements) that shouldn't be selectable. You can do this manually for a small number of elements or use JavaScript (with jQuery):

    $('.nonselectable').find('*').andSelf().attr('unselectable', 'on');

This covers Opera and all of IE, though it _does_ require JavaScript.

My complete solution adds one extra feature: any sub-element marked `selectable` is selectable, even if it's a child of a nonselectable element.

So here it is, my masterpiece:

- [The CSS](/wp-content/uploads/2011/08/nonselect.css), covering Chrome, Firefox, Safari, IE10
- [The JavaScript](/wp-content/uploads/2011/08/nonselect.js), covering Opera, IE4+

Finally, _use this stuff sparingly_ and remember that it won't work too often. I mostly use this on logos and buttons, not paragraphs!

## Other notes

- Nothing stops people from viewing the page's source and lifting your text. There are also a bunch of other ways it could be copied -- web inspectors are in all modern browsers; [OCR](https://en.wikipedia.org/wiki/Optical_character_recognition); working around these admittedly shoddy-at-best hacks.

- You might want to change the cursor with CSS (`cursor: default`). Depends on how you want things.

- IE6 has a toolbar when you hover over images. This toolbar lets you do things like saving the image. [You can disable it.](http://www.thesitewizard.com/webdesign/imagetoolbar.shtml)

- You could make your text hard to copy-paste in other ways. You could make your text into an image. You could render the text inside a canvas. A crazy idea for a crazy person: you could _make_ a font that copy-pastes badly (the character code is the one for capital A but it renders a lowercase R). These are all horrible ideas and you should forget that I even brought them up.

- You can make no-JavaScript IE9 have an invisible selection (that is, highlighting text looks like it does nothing), so users will think they don't have the ability to copy-paste. _This will break functionality in other browsers_, but if you _only_ care about IE for some mad reason, you can do something like this:

        .nonselectable::selection { background: transparent; }

## Phew!

After a lot of research, I think I've compiled all the ways you could possibly suppress selection and copy-paste. I think it's pretty clear that it's a big mess, and I would recommend doing this as little as possible.

(PS: If you want to copy-paste things from _my_ website, go right ahead! As long as you give credit under the [Creative Commons Attribution License](https://creativecommons.org/licenses/by/3.0/), it's all yours. And if it's code, it's free for any use, no credit needed.)
