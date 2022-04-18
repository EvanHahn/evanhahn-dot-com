---
date: 2012-08-08
title: On my internship at UniversityNow
author: Evan Hahn
layout: post
url: /on-my-internship-at-universitynow/
---

I'm sitting on the Caltrain coming back from San Francisco after doing a "my internship is over" presentation. The presentation had me reflecting on what I'd done during the internship and what I'd learned.

A quick summary of [UniversityNow][1]: they aim to create a high-quality, low-cost online university. They're still fairly new (I was there when they gave their first degree), but they're growing very quickly. I was a developer on their product team of around 15 people.

On my first day, I was walking to lunch with some of the developers and one of them asked me how many bees are in a pound of bees. I was not prepared for this question. I guessed 400. The actual answer was 4500 bees. This set the tone for my internship in a weird way: I had a lot to learn, but it was a quirky atmosphere and I was going to like it.

I spent the first few weeks learning the system -- whiteboards of database schemas, digging through [Rails for Zombies][2], and making small changes to the site to learn how the code was put together.

And then I was tasked with a project: realtime chat. Students should be able to have a realtime conversation with their faculty (and later on, other students). So I got started.

It was going to integrate with their existing messages system; it was going to use [Backbone.js][3]; it was going to poll the server every five seconds and check for new messages and online buddies.

I spent about a week deep in Backbone's documentation. For whatever reason, I couldn't find a good tutorial online that explained how things worked. I come from an [Ember.js][4] background and I assumed Backbone was as powerful -- I was _very wrong_. Backbone basically doesn't do anything for you.

In the meantime, I was learning about not-coding stuff. I learned my way around the [Clipper card][5] (and figured out that [you should never try to cheat Caltrain][6]); I learned the [SoMa area][7] of San Francisco; I learned what it means to be a young developer in a big city. I learned lots and lots of people's names.

I learned how UniversityNow's dev team gets stuff done. They subscribe to the [agile philosophy][8] -- I had to learn that "good enough and released" is better than "perfect and never released". Sometimes this concession would come back to bite them, but the team iterated very quickly most of the time. They use [Pivotal Tracker][9], they have an almost-daily production push, they have a support calendar.

On the technical side, I was credited with knowing Backbone better than anyone at UniversityNow, so I think I can safely say I learned that! I learned some more advanced Rails features and I wrote some specs with Rspec. I also learned my way around Vim, which is one of the coolest things ever. I learned about [git-flow][10], a very useful plugin.

After awhile, I'd done most everything on chat except for the important part: talking to the server. I paired up with a more experienced coder and we got it talking to the server. We had a first version! Because of some existing issues, we had to pull it because it was destroying our servers (so we fixed that!).

In my opinion, the code we (mostly I) produced wasn't very good. It didn't feel "Backboney". To geek out: views were handling server polls and "global" variables. Values in local storage looked nothing like the values in memory, which looked nothing like the values from the server. Views handled much of the behavior that models and collections should've. The code was kind of a quagmire and hard to add new features to. There were exactly zero specs.

I approached my manager about this and got the okay to do a rewrite of the whole thing. I didn't do a great job with this. The code was better, but it took forever. I had fancy diagrams and API documentation, hundreds of tests, but nothing fully functional. I learned that I should've rewritten bits and pieces of it rather than rewriting the entire thing from scratch. The process would've been less painful and less really-really slow. After a few weeks, impatience (rightly) started to set in -- I needed to get this done!

A couple of guys got onto the project and helped me get The Great Rewrite into the world. I learned some things about my code during this time. First of all, I had functions like `findConversation()` that accepted a bunch of different things: a Conversation model, a Message model, an ID, et cetera. Functions like this ended up being huge because they worked completely differently depending on what was passed in. In a weakly-typed language like JavaScript, this turned out to be a big headache rather than a helpful simplfication. I also learned that "good enough" is better than perfect, and sometimes I should stop worrying that I could make a better API. Done is often better than perfect.

I also learned that I _really_ don't like Backbone. I know it pretty well now (I think I could ace a quiz on the API), but I don't like it. Sorry!

I remember being very sad when I had to give my laptop and key card back -- I had a fantastic time. I learned a ton, loved the people I worked with, and was sad to go!

[1]: http://unow.com/
[2]: http://railsforzombies.org/
[3]: http://backbonejs.org/
[4]: http://emberjs.com/
[5]: https://www.clippercard.com/
[6]: /is-it-worth-cheating-caltrain
[7]: https://en.wikipedia.org/wiki/South_of_Market%2C_San_Francisco
[8]: http://www.agilemanifesto.org/
[9]: http://www.pivotaltracker.com/
[10]: https://github.com/nvie/gitflow
