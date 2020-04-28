---
title: How to fix Pandora + Chrome + Ghostery
author: Evan Hahn
layout: post
path: /how-to-fix-pandora-chrome-ghostery/
---

I was having issues with [Pandora.com](http://www.pandora.com), but only in Chrome, and I have [Ghostery](http://www.ghostery.com/) installed.

Thanks to [a tweet by @KyleMaxwell](http://twitter.com/kylemaxwell/status/180391900338073601), I figured out two ways to fix it, neither of which are totally ideal.

- **Method 1: Unblock ScoreCard Research.** Go into Chrome's preferences (`chrome://extensions`), then Extensions, then click on Ghostery's Options link. In Blocking Options, find ScoreCard Research Beacon. Finally, hit Save at the very bottom.

- **Method 2: Whitelist Pandora.com.** Like the above, go into Chrome's preferences (`chrome://extensions`), then Extensions, then click on Ghostery's Options link. Scroll to the bottom, and type "pandora.com" as a URL to whitelist, and click Add. Finally, hit Save at the very bottom.

Personally, I simply whitelist Pandora.com because I don't want ScoreCard tracking me on other sites, but I'm okay with Pandora being the only site that tracks me.
