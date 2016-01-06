---
title: How to transfer Android Neko Atsume saves using adb
layout: post
permalink: /transfer-android-neko-atsume-saves/
---
*This post assumes you have `adb` installed on your computer and can use it to communicate with your Android phone. You should have basic familiarity with a command-line terminal.*

I've been playing [Neko Atsume](http://nekoatsume.com/games/neko/) for months. It is almost frustrating that someone else discovered such a charming concept that could be so simple.

I recently got a new phone and couldn't find an easy way to back up my in-game spoils, so I did a little searching and found that you can use Android's `adb` tool to transfer your save between two Android phones by doing a simple backup/restore. And it doesn't require root privileges!

Here's how I did it:

1. Install `adb`.
2. Open up a terminal.
3. Plug in the phone that you want to take data from.
4. Make sure [USB debugging is enabled](https://developer.android.com/tools/device.html#setting-up) on both devices.
5. Run this command, which creates a backup file in your home folder:

        adb backup -f ~/back.ab -noapk 'jp.co.hit_point.nekoatsume'

6. When that's done, unplug the first phone and plug in the next one (the one you want to transfer your save to).
7. Make sure the game is installed on this phone. Launch it to make sure it runs, then close the app.
8. Run this command to transfer your backup to the new phone:

        adb restore back.ab

That's it! Your nekos should be safe.

This should, in theory, work on many apps. I only tried it on Neko Atsume but I'm sure it will work with many other apps.