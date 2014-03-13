---
title: '&#8220;The Materialist&#8221; feedback, 11 April 2012'
author: Evan Hahn
layout: page
---
*   A little unclear on what the app is actually supposed to do.

*   I'd do a little visual cleanup, but I like the minimal design thus far.

*   Flickr images are squished square even when they're not square. I'd suggest making them the CSS `background-image` and positioning them depending on their size. I can help you with this.

*   Change:
    
        <input type="text" name="christmaslist" class="textbox" value="What do you want for your birthday?">
        
    
    To:
    
        <input type="text" name="christmaslist" class="textbox" placeholder="What do you want for your birthday?">
        

*   Remove the `name` property from the submit button -- it gets sent as extra `GET` data (you'll see it in the URL on the following page).

*   I've gotten [a few Python errors][1]. Not sure what they are, but I suspect they happen because some site has no data for them -- they appear on my somewhat obscure searches.

*   If you can get referral cash from eBay (or Amazon), you should do that. Money!

 [1]: http://evanhahn.com/wp-content/uploads/2012/04/materialist_errors.txt