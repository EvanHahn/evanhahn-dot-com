---
title: 'How to: edit the HTML of Evernote notes on Mac'
author: Evan Hahn
layout: post
permalink: /how-to-edit-the-html-of-evernote-notes-on-mac/
---
*In short: Navigate to where your notes are stored (see below) and you can change the HTML.*

I’ve been using <a href="http://www.evernote.com/" target="_blank">Evernote</a> for some time now, but only recently have I found that I need more powerful formatting. For example, I cannot do superscripts and subscripts for my chemistry class notes.

I knew there was a way around this.

Evernote notes are stored as HTML, and if you can get to the HTML, you can do anything, right? So I figured out how to do it.

Unfortunately, this cannot be done on Windows as far as I can tell. You can find where your notes are stored, but you can not find them as HTML.
1.  **Modify the note** (even just a little bit). This is so that the note’s “Date Modified” in your filesystem is updated.
2.  **Close the note in Evernote.** You can have Evernote open, but don’t have the note open. It makes the editing wonky.
3.  **Navigate to where your notes are.** This is a bit tricky. You first need to find the data Evernote stores. On Mac, it’s located at */Users/Evan/Library/Application Support/Evernote/* (replace “Evan” with your name). After you get there, sort by modified time and find the most recently updated folders. Eventually, you will find your note’s folder.
4.  **Edit content.html.** Once you’re in the note’s folder, you can edit `content.html` with your favorite editor. It’s standard HTML. Don’t worry about any other files.
5.  After you finish editing, save and quit your editor and open the note back up in Evernote. This should update the other parts of your note (like the thumbnail). It will also tell you if there are errors in your HTML in a big red box.

If you need that kind of formatting, that’s how it’s done.
