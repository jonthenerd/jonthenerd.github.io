---
title: >-
  Communicating with the Intermec IP30 RFID reader over bluetooth...hopefully
  with Android
date: "2012-10-05"
author: Jon Badgett
categories:
  - Android
  - Programming
draft: false
slug: >-
  communicating-with-the-intermec-ip30-rfid-reader-over-bluetooth-hopefully-with-android
---

|- I'm starting work on a project for my MBA program that involves using a
mobile RFID reader with an Android device. <!--more--> I've purchased a Nexus 7
for the project, and the school has loaned me an
<a href="http://www.intermec.com/products/ip30a/index.aspx">Intermec IP30 RFID
reader</a>. I'm going to detail my steps in getting this going here.

<h2>10/5/2012</h2> Acquired the IP30 from my university. This IP30 is attached
to the Intermec CN3 handheld computer, which is running some old version of
Windows Mobile. I've confirmed that the CN3 can actually communicate with the
IP30 and read tags - yay! I don't plan on using the CN3, but it's a nice
reference for how the communication is supposed to work. The IP30 is
communicated to from the CN3 by bluetooth. Intermec offers some libraries for C#
development, but I won't be using them as this will be an Android application.
I'll be using Xamarin's Mono for Android (C#), but the Intermec assembly uses
some Windows CE libraries so it's no help. Luckily, it looks like the IP30 works
with Intermec's "Basic Reader Interface" or BRI. This is an ASCII-based protocol
over serial/bluetooth. They even
have<a href="http://epsfiles.intermec.com/eps_files/eps_man/937-000.pdf"> a
handy doc</a> on all the relevant commands and how to structure your app if
going straight against BRI. At this point, my goal is to communicate with the
IP30 using a hyperterminal on my Windows 7 box. I wore the battery down on the
IP30 trying to use PUTTY to for communication and couldn't manage to get it to
respond to any command. I believe that I just wasn't sending the necessary CRLF
at the end of each command for the IP30 to respond, so I've downloaded a
different hyperterminal -
<a href="https://sites.google.com/site/terminalbpp/">Bray++'s Terminal</a>.
Whenever the battery charges up for the IP30, I'll start whittling at it again
:) Later... Couldn't get Bray's Terminal to connect to the IP30. It would cause
Windows to beep, then I'd not be able to connect to the IP30 with anything
(including Putty) until I reset the connection by pulling the battery out of the
IP30 and putting it back in. I downloaded Tera Term and have success! It was
indeed the newline setting for transmission. I had to change this setting in the
Terminal setup and also enable local echo so I could see what I was typing...
Luckily in my searching for IP30 related posts, I ran across
<a href="http://community.intermec.com/t5/General-Development-Developer/IP30-Serial-Connection-configuration/td-p/18394">a
page on Intermec's site where another developer was trying to do what I'm doing
through HyperTerminal and had an issue</a>. Issuing FACDFLT4 (which is issued in
the BRI manual I referenced earlier) reset the device to factory settings - so I
should be good to go! To be continued...
