---
title: Filter out University of Michigan spam
author: Evan Hahn
layout: page
---
The University of Michigan emails a lot of garbage to their students. There are surveys, useless announcements, and other spam. I've received thousands of these emails while here. I don't like them.

In the spirit of [Sam Soffes's "Awful Recruiters"][1], I made some Gmail filters that catch and archive *thousands* of messages sent to me. And now, you can copy-paste these searches, make a filter out of them, and enjoy less spam from Michigan.

**These may filter things that you want! I'd run through these and make sure that you're okay never seeing these. I filter out job postings and even emails from Mary Sue!**

These have to be split into a few filters because (1) you can't just paste the filter into the search bar and click "Create filter" (2) Gmail filters have a maximum length.

I recommend further refining these filters so that you only catch messages addressed to `*@umich.edu`. This means that these messages won't be caught if you're in some other email client like I am.

# "From" filter

<pre><code class="no-highlight">postmaster@collegiatelink.mail.campuslabs.com OR sustainability-news@umich.edu OR umstix@umich.edu OR malumni@umich.edu OR centerforentrepreneurship@umich.edu OR noreply@collegiatelink.net OR mpowered-marketing@umich.edu OR uminterns2013@yahoo.com OR collegepromo@oncampuspanels2011.info OR affordableapt@aol.com OR um_evaluations@umich.edu OR scrang@umich.edu OR "S. Moore" OR robertmk@umich.edu OR eecs-comm@umich.edu OR noreply@qemailserver.com OR marysc@umich.edu OR illumemail@umich.edu OR ipe-office@umich.edu OR U-SHAPEinfo@umich.edu OR notification@email.studentvoice.com OR caen-software@umich.edu OR targetemail@umich.edu</code></pre>

# "To" filter

<pre><code class="no-highlight">ipe-networkW2013@umich.edu OR coe-students-announce@umich.edu OR coe-students-official@umich.edu OR coe-undergrad-students-announce@umich.edu OR cse-undergrads@umich.edu OR coe-undergrad-students-official@umich.edu</code></pre>

# "Subject" filter

<pre><code class="no-highlight">"EECS Student Announcements" OR "Job Postings - Computer Science" OR "Grader Needed for EECS" OR "Tech Day" OR "MHappy"</code></pre>

 [1]: http://awfulrecruiters.com/