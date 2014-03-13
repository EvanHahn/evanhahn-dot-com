---
title: '&#8220;Hack Facebook&#8221; talk notes'
author: Evan Hahn
layout: page
---
*These notes are from [this event][1].*

The code is on GitHub at <https://github.com/michiganhackers/Hack-FB-talk-template>.

* * *

*   Go to <http://developers.facebook.com/apps> and sign up for an app. You'll need the **app ID** and the **app secret**. Fill this shit out
*   [Facebook's Graph Explorer][2] is useful for some reason

*   This demo uses the [PHP SDK][3], but there are [other SDKs too][4].

*   The `fb` folder...

    *   `auth.php` logs you in, don't change it much
        *   `scope` lists your permissions
        *   `$loginUrl` is the URL to log in, made by `auth.php`
    *   `config.php` is where you put your app ID and app secret

*   At the top of each page, you wanna include `auth`:

        require_once 'fb/auth.php';


* * *

*   To get 100 statuses, for example:

        $statuses = $facebook->api("/me/statuses", "GET", array("limit"=>"100"));


*   There are some limitations (for example, it limits the number of likes it sends back as JSON, and there are "see more" links)

* * *

*   FQL is a SQL-esque language for Facebook

*   To get all photos of me, for example:

        $query = "select like_info, src_big from photo where object_id in (select object_id from photo_tag where subject=me())";
        $photos = $facebook->api(array('method' => 'fql.query', 'query' => $query));


*   There's a lot of stuff you can query!

* * *

*   Multiquery (get all events my friends are attending, for example)

        $multiquery = '{
            "getFriends":"select uid2 form friend where uid1 = me()",
            "getEventIds":"select eid from event_member where uid in (select uid2 from #getFriend) and rsvp_status=\'attending\'",
            "getEventInfo":"select pic_small, eid, name from event where eid in (select eid from #getEventIds)"
        }';
        $events = $facebook->api(array('method'=>'fql.multiquery','queryies'=>$multiquery));


*   In the above case, returns an array of size 3: response from query 1, response from query 2, response from query 3

 [1]: https://www.facebook.com/events/295140433893135/
 [2]: http://developers.facebook.com/tools/explorer
 [3]: https://developers.facebook.com/docs/reference/php
 [4]: https://developers.facebook.com/docs/sdks/
