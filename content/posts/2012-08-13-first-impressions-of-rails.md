---
date: 2012-08-13
title: First impressions of Rails
author: Evan Hahn
layout: post
url: /first-impressions-of-rails/
---

My [internship at UniversityNow][1] had me using Ruby on Rails, but I was mostly working with Backbone.js and fixing small Rails bugs. I had never sat down and built anything from scratch before. Today, I spent about six hours learning my way through starting a Rails app.

I thought it'd be interesting to catalog my first impressions of Rails. Please keep in mind that _I have no bloody clue what I'm talking about_, this is just my reflection.

- Rails is crazy. It seems like a nice (and extendable) collection of good server-side libraries ("gems", I should say). It also seems to force rigidity on you, and when you begrudgingly comply, that part of your app is finished in two minutes. I haven't built anything exciting yet (mostly just user signup), but this simpler stuff takes longer to learn than to implement. It seems.

- It seems like the clever Rails programmer writes the most important code in his or her [gemfile][2]. There are _so many gems out there_ that you basically never have to write any code. A gem's readme will have sections like "Using Capybara with Cucumber" where a JavaScript framework will have "dependency injection and inversion of control". Rails seems like it's all about gems, where JavaScript seems like it's all about...well, JavaScript is a wild land of chaos.

- [RailsCasts][3] is really well-done and even more helpful.

- I've known about Twitter's Bootstrap for awhile now, but I finally tried it for the first time [with the help of RailsCasts][4]. I don't think I'm going to stick with vanilla Bootstrap long term, but it makes your site look not-butt-ugly really fast.

- [Devise][5] is wild. I had a full user authentication process _complete_ in 30 minutes and I had no idea what I was doing. Imagine how quickly I could do it now!

- I find it a little disconcerting that, in many cases, I have no idea what Rails is doing. As of this writing, I have 12 gems in my gemfile and with dependencies, that becomes 71 gems. It seems fast. It also seems suspicious that 71 different gems aren't going to explode. I know I'm wrong -- people love Rails -- but something about that freaks me out.

- I feel like I'm walking on a tightrope when I'm doing migrations. I wanted to rename two columns -- that was it -- and I was nervous that if I screwed up, databases would come crashing down. Certainly false, what with version control and the "down" migration and Them Internets, but I was much more careful with those than with, say, ERB.

- I'm glad I'm learning it because it's an important skill to have, both for my own personal projects and because (selfishly) it's employable.

[1]: /on-my-internship-at-universitynow
[2]: http://gembundler.com/gemfile.html
[3]: http://railscasts.com/
[4]: http://railscasts.com/episodes/328-twitter-bootstrap-basics
[5]: https://github.com/plataformatec/devise
[6]: http://www.reddit.com/r/smashbros/comments/y29q1/i_wanna_build_never_smash_alone_a_way_to_meet_up/
