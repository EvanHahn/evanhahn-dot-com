---
title: Gender breakdowns in Super Smash Brothers
layout: post
permalink: /super-smash-bros-gender-data/
---
I am not _the_ biggest Super Smash Brothers fan, but I'm a big one. I've owned every game, watched [the documentary](http://www.eastpointpictures.com/documentary), and embarrassed myself in front of non-nerds. I'm not a hardcore smasher, but I really enjoy the series.

I was curious: how many of the characters are female? I'd hardly call this a "big data" problem, but I took a crack at it.

First, I took a look at the character counts; how many characters are there per game?

![Character counts graph](/uploads/smashdata/character_counts.gif)

Based on this, there are an average of 15 new characters per game, and if that trend continues, the next game will have 65 characters! A second-order polynomial curve of best fit gives an estimate of 61.25 characters. I've found myself overwhelmed by the latest game's offering of 50 characters; what will a number in the 60s feel like?

Next, I split characters into four groups: unambiguously male (henceforth referred to as "male"), unambiguously female (henceforth referred to as "female"), androgenous (like Pokémon), and characters whose gender you could choose (like Villager). There are more males in the series than any of the other groups combined:

![Gender breakdown for all games](/uploads/smashdata/genders_total.png)

This looks a bit bleak. Perhaps things have been getting better over the years? If you break things down by game, though, it's unclear what's going on:

![Gender breakdown by game](/uploads/smashdata/genders_by_game.png)

You see a different trend depending on what numbers you look at. On one hand, the number of female characters increased from 1 to 8 and the number of "choose" characters increased from 0 to 5. On the other hand, the first game was 75% male, Melee was 65% male, Brawl was back up to 76%, and Smash 4 was 62% male. It's hard to see a strong positive trend.

Nintendo should rename the game to "Smash" and make things more diverse. Nobody calls it "Super Smash Brothers" anyway; it's Smash.

## Footnotes

I made a number of assumptions while going through this data. Unless you're quite interested in the minute details of this post, I'd skip this:

- Duck Hunt: The [Smash Wiki entry](http://www.ssbwiki.com/Duck%20Hunt) says that the off-screen hunter "is supposed to represent the player" and therefore varies with gender, so I placed Duck Hunt in the androgenous category. The dog is male, so you could argue that I mis-categorized.
- Ice Climbers: players can choose which character is controlled, so I placed Ice Climbers in the "choose" category. This could be in the androgenous category, or its very own category.
- Mewtwo: I didn't include Mewtwo for Smash 4 because it is not released at the time of this writing. This would add one more androgenous character to Smash 4.
- Pokémon: while some Pokémon are considered masculine or feminine by some, their genders are unspecified in the Smash games.
- Pokémon Trainer: I counted Brawl's Pokémon Trainer as one male character, but one could consider this three androgenous characters.
- R.O.B.: I didn't think R.O.B. had a gender but [the SmashWiki says he's male](http://www.ssbwiki.com/R.O.B.).
- Rosalina & Luma: I sorted the pair as "female", but one could debate that the Luma is male and should be sorted elsewhere.
- Sheik: There's [debate about Sheik's gender](http://zeldawiki.org/Sheik#Gender). I chose Sheik to be female throughout this post because the Smash series refers to Sheik as female, but there are plenty of interpretations, all of which are probably offensive to somebody. I apologize to anyone offended by this choice.
- I didn't include data from the [Project M](http://projectmgame.com/en/) fan mod.

I wrote some code, made some CSVs, and used Apple's Numbers program when writing this post. You can find all of those files [here](https://github.com/EvanHahn/evanhahn-dot-com/tree/master/_poststuff/super-smash-character-data).
