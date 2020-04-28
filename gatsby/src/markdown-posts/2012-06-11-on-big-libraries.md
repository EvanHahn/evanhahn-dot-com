---
title: On big libraries
author: Evan Hahn
layout: post
path: /on-big-libraries/
---

_In short: it's not about big or small frameworks as much as it is about extensibility._

From [a Tom Dale blog post][1]:

> If choice was more important than well-tested integration, the majority of attendees at last week’s CodeConf would have been carrying ThinkPads instead of MacBook Pros.

In this post, Mr. Dale argues that micro-frameworks aren't as useful as full-stack ones. I agree with a lot of his points; better to let an _integrated_ framework do the work you'd do yourself. A bunch of non-integrated frameworks is chaos. The success of relatively larger libraries like jQuery and Ruby on Rails seem to back this up.

But take things to an extreme. An _enormous_, do-everything framework would be ridiculous for obvious reasons. The reason why smaller frameworks are nice is because they fill in the cracks of what you need, but the reason big frameworks are nice is because they are most of what you need in an integrated way. What if you could have the integration while still having lots of little pieces?

Well, you can.

The reason that I feel jQuery and Rails are successful is the same reason Backbone is -- they provide not-quite-barebones frameworks that are _extensible_. There are _countless_ Backbone plugins and gems to supplement Rails. Extensible frameworks seem to be winners, and relative size is irrelevant. Frameworks with fewer extensions (think SproutCore) don't seem to do as well.

A final disclaimer: this is a mostly unsubstantiated thought.

[1]: http://tomdale.net/2011/04/imagine-a-beowulf-cluster-of-javascript-frameworks/
