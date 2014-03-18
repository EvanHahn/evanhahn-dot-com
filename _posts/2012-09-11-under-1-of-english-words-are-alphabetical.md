---
title: Under 1% of English words are alphabetical
author: Evan Hahn
layout: post
permalink: /under-1-of-english-words-are-alphabetical/
---
*386 out of [58,115 English words](http://www.mieliestronk.com/wordlist.html) (about 0.66%) are alphabetical. Words like "abs" are alphabetical, and words like "cab" are not.*

For some reason, I've wondered for a long time (about a year): how many words in the English dictionary are alphabetical? That is, if you were to reorder all the letters in a word alphabetically, how many wouldn't change? For example, "Abs" and "ghost" are alphabetical. "Cab" is not.

How many do you think there'd be? I thought the number would be pretty low -- my guess was less than 5%.

I'm in the process of learning C, and I figured it'd be faster for parsing 58,115 words. So I downloaded a [list of 58,115 English words](http://www.mieliestronk.com/wordlist.html) and got started. I started by writing a function called `isAlphabetic`, which takes a string of lowercase letters and returns whether it's alphabetic. I wrote [a few tests](https://github.com/EvanHahn/Alphabetical-words/blob/2cd988e2dc5f4a56e68021f6c610d8f827c6c5de/alpha.c#L19) to make sure it worked, and then [I was all done](https://github.com/EvanHahn/Alphabetical-words/blob/master/alpha.c). When I ran it, I got the following output:

> 386 are alphabetical out of 58114 (0 percent).

I plugged it into a calculator for a little more precision, and got about 0.66%. Lower than I expected!

I figured that a version in a scripting language would be slow, but after I saw how trivial it was to write, I made [a CoffeeScript version](https://github.com/EvanHahn/Alphabetical-words/blob/master/alpha.coffee) to see. When I ran it, it was noticeably slower, but it still took under a second and gave me the same result.

After thinking about it at it, 58,000 words isn't _that_ many; I should've realized that it was okay to use a slower language. I also learned a bit more about C. And most importantly, I put to rest my question: there are only 386 alphabetical words.

_Update: This has now been [posted as a challenge](http://www.reddit.com/r/dailyprogrammer/comments/101m7y/9172012_challenge_99_easy_words_with_letters_in/) on the dailyprogrammer subreddit. Go there to see other solutions!_
