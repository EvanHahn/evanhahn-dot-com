---
title: How many guests on DevChat.tv podcasts are women?
layout: post
path: /devchattv-female-guests/
---

_In short: about 11% of all guests on the [DevChat.tv](http://devchat.tv/) podcasts are women, and only 8% of all episodes had a female guest._

I was listening to the [JavaScript Jabber](http://devchat.tv/js-jabber) podcast and I realized that everyone I heard talking was a man for several episodes. I wondered: how many of their guests are women?

I discovered that JavaScript Jabber is part of a larger network of podcasts called [DevChat.tv](http://devchat.tv/), where they talk to loads of programmers about various topics from freelancing to Ruby. I decided to look at that larger set of podcast episodes.

I'm doing this post for two reasons. First, I wanted to try my hand at number-crunching some data. Second, and more importantly, I care about improving diversity in tech and [think data is helpful](http://www.vogue.com/4537369/pinterest-tracy-chou-silicon-valley/). I don't expect this post to do much on either front, so [contact me](mailto:me@evanhahn.com) if you have suggestions!

# The results and my interpretation

Let me get straight to the results:

- There are a total of 573 episodes, 47 (8.2%) of which contain at least one woman
- There were 371 unique guests, 39 (10.5%) of which were women
- There were 435 total guests, 49 (11.3%) of which were women

Tracy Chou made [a big 7,267-engineer spreadsheet](https://docs.google.com/a/evanhahn.com/spreadsheet/ccc?key=0AlZH8QBl60oodEJTdFA5TlZOcDJCMU02RkZoSHF5SHc#gid=0) with data from lots of companies, big and small. That spreadsheet shows that 15.3% of the industry is female.

DevChat.tv has smaller percentage of women than that. I was surprised that it was _lower_ than the industry average; I expected it to be about the industry average. I was disheartened—it's too bad that women's voices are literally less heard.

I'd encourage the folks at DevChat to try to find more female guests!

# The method

In short, I wrote a little script, and you can see it [here](https://github.com/EvanHahn/evanhahn-dot-com/tree/master/_poststuff/devchat-tv-women).

Fun fact: DevChat.tv has [a secret API](https://api.devchat.tv/)! You can get a list of shows as JSON, among other things. Each show has classic things like titles and permalinks, even everybody's Picks (a staple on the show where guests talk about cool things they've found that week). They also have the names of every guest per episode, which I used for this project.

Once I had the list of guests, I ran them through the [Gender Detector](https://github.com/bmuller/gender_detector) Ruby library. It returns "male", "female", or "andy" (for androgynous or unknown). I looked at those cases manually (there were only 29) and hard-coded them into my script.

From there, it was a simple iteration through every guest in every episode. I'm no Ruby expert so I doubt I did things the "Ruby way", but it worked and I got my data!

This was a quick way to dip my toes into data crunching. It was both fun from a coding perspective and interesting from a real life/diversity perspective!
