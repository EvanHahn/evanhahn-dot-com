---
title: 'JavaScript gets a fat arrow and I&#8217;m not a fan'
author: Evan Hahn
layout: post
permalink: /javascript-gets-a-fat-arrow-and-im-not-a-fan/
categories:
  - Uncategorized
---
According to [Angus Croll's post on "JavaScript, JavaScript..."][1], ECMAScript 6 will have the fat arrow to define functions, based on CoffeeScript's syntax. It'll look like this:

    var add = (a, b) => a + b;
    

I think that this is a step in the wrong direction.

Angus Croll writes something that I strongly agree with:

> I can't shake a nagging feeling that this proposal (in its current form) is flawed to the extent that it might actually make new developers more confused than they already were.

One of my biggest issues with JavaScript (and [other languages][2]) isn't *exactly* JavaScript's fault -- the online documentation is all over the place. Do a search for "JavaScript preload image" and you'll get a bunch of results that look similar, but aren't the same. [Some][3] say that you need to specify size; [some][4] declare an Image object in the global namespace but [others don't][5]. Which one is right?

Part of this problem stems from the idea that JavaScript is popular and starting a blog is easy, so it's easy to spread false knowledge (I hope I don't do it here!).

But there's a more important part: this stems from the fact that JavaScript's syntax (not the language itself) is poor. After using languages with significant spacing, brackets and semicolons seem archaic and don't enforce well-written code; strict mode is just *weird*; being able to redefine `undefined` is a *bug*; the fact that everything is an object except primitive types *except* when they're defined as objects is impenetrable. JavaScript having the bad syntax that it does, it's unclear what to do much of the time, so people publish faulty code samples.

I also think that the `=>` syntax is confusing. These functions can't be constructors, nor can they have names, nor can they touch the `arguments` variable, and the context is different. So...people will think of them as mini-functions. If it were purely a syntactic shorthand, fine. But these differences will confuse people, I guarantee it.

I will probably not be using the `=>` when it comes to JavaScript (but I'll keep using it in CoffeeScript).

 [1]: http://javascriptweblog.wordpress.com/2012/04/09/javascript-fat-city/
 [2]: http://evanhahn.com/?p=45
 [3]: http://www.pageresource.com/jscript/jpreload.htm
 [4]: http://www.techrepublic.com/article/preloading-and-the-javascript-image-object/5214317
 [5]: http://www.javascriptkit.com/javatutors/image3.shtml
