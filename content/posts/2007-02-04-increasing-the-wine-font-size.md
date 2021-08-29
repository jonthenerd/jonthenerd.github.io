---
title: Increasing the Wine font size
date: "2007-02-04"
author: Jon Badgett
categories:
    - Linux
    - ubuntu
draft: false
slug: increasing-the-wine-font-size
---

Thus far in using Ubuntu, I've been able to use only Linux applications. I'll
admit that some of them were just ports of their Windows or Mac OS X
counterparts...but I never had to install wine (a compatibility layer for
running Windows programs). Well you know that torrent app I recommended?
kTorrent? It's crashed on me several times in the last couple days...and ate up
every bit of memory the system had this morning. I went looking for a better
alternative and my only choice was to use uTorrent under wine. No
problem!<br /><br />Wine is only a synaptic click away. Running utorrent under
it is a simple affair too. I found this tutorial
<span style="font-style: italic;">very </span>helpful:
<a href="http://www.ubuntuforums.org/showthread.php?t=191161">Using utorrent
with wine - Ubuntu Forums</a><br /><br />However, since my primary monitor is a
32" LCD and I'm at about an 8-10 foot distance from it - the font size needs to
be increased. Under windows this is a simple task...but under Wine = not so
much. I think this is something that NEEDS to be put into the wine configuration
app. Anyway - here's how it's done.<br /><br />First - close any applications
that are running under wine.<br /><br />To change the size of any menu font -
you'll need to edit the win.ini under the following
folder:<br /><br /><span style="color: rgb(0, 153, 0);">/home/yourusername/.wine/</span><br /><br />Add
the following information to the win.ini
file:<br /><span style="color: rgb(0, 153, 0);font-family:courier new;" >[Desktop]</span><br /><span style="color: rgb(0, 153, 0);font-family:courier new;" >MenuFontSize=18</span><br /><br />You
can change the 18 to whatever size you need - but that worked for me. Now we
need to change font size of the rest of the application. To do so, use the
terminal and launch wine's
regedit:<br /><br /><span style="color: rgb(0, 153, 0);">wine
regedit</span><br /><br />You'll want to browse to this
value:<br /><br /><span style="color: rgb(0, 153, 0);">HKEY_CURRENT_CONFIG\Software\Fonts\LogPixels</span><br /><br />and
change it to something larger. Make sure to change the selection to "Decimal",
as you probably don't natively speak hex. It's default in decimal is 96. I upped
mine to 120 and it worked nicely.<br /><br />When you're done doing that, close
out regedit and restart your wine application. Enjoy your larger font sizes and
lack of squinting!<br /><br />Here's the best resource I found on this matter
after a bit of
searching:<br /><a href="http://www.winehq.com/pipermail/wine-users/2005-April/017810.html">http://www.winehq.com/pipermail/wine-users/2005-April/017810.html</a>
