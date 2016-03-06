---
layout: post
title: Weird GNome issue gone
date: 2007-01-27 21:39
author: Jon Badgett

categories: [HDTV, Linux, ubuntu]
---
Happy to report that using the non-beta drivers (8776) stopped that odd issue from happening again.  Hope those beta drivers get that issue fixed.  Suppose I'll look for a place to report the bug. :)<br /><br />Also - if you're using an HDTV with a PC...you'll soon find out that <span style="font-style: italic;">everything</span> looks washed out. You can fix some of that using the nvidia-settings tool. To access it, run this in the terminal:<br /><br /><code>sudo nvidia-settings</code><br /><br />You'll soon find out that your great settings aren't being applied when you log out and back in (or reboot, etc.).  You'll need to load this utility's settings when ubuntu starts.  To do so, add this line to the System->Preferences->Sessions->Startup Programs area:<br /><br /><code>nvidia-settings --load-config-only</code><br /><br />That should do it!  Soure: <a href="http://ubuntuforums.org/showthread.php?p=2038131">Ubuntuforums</a>
