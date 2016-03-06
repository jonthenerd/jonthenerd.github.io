---
layout: post
title: Getting rid of errors
date: 2007-02-24 23:40
author: Jon Badgett

categories: [gmplayer, Linux, ubuntu]
---
I've been getting an odd error ever since I started wanting to play anime subs with gmplayer.  Specifically - this error says:<br /><code><br />Error<br />Requested audio codec family<br />[mp3] (afm=mp3lib) not available<br />Enable it at compilation.</code><br /><br />So, I did a little searching and found that there is a <span style="font-style: italic;">very</span> easy fix for this!  Simply go into your gmplayer preferences and select the <span style="color: rgb(0, 102, 0);">Codecs and Demuxer <span style="color: rgb(0, 0, 0);">tab.  From there, change your Audio codec family to <span style="color: rgb(0, 102, 0);">FFmpeg</span>.  That's it!  No more annoying error!</span></span>
