---
title: Finding the last login date for all profiles
date: "2008-06-12"
author: Jon Badgett
categories:
    - Programming
tags:
    - Windows
    - .NET
draft: false
slug: finding-the-last-login-date-for-all-profiles
---

By day I am but an humble IT worker - currently tasked with maintaining and
improving scripts and tools that keep our enterprise workstations humming. My
largest project thus far has been an ever growing inventory script (now a .NET 2
app) that reports information back to a SQL database. This app is run on a
schedule by a service I wrote. The script collects great pieces of information -
everything from the screen resolution being used to information on SQL Server
instances on the device (yep - inventories servers too!).

Anyway - one area that posed an issue was reporting back all profiles present on a
computer and when they were last used. This can be done a number of ways - the
simplest of which being to enumerate the folders in the Documents and Settings
folder and then get the last modified date off of the ntuser.dat.log file within
each directory. This file is a log (wow, couldn't have guessed that!) of all
registry actions for that specific user's registry hive - think everything under
HKEY_CURRENT_USER while you're logged in. This works great - and has for a long
time. Recent developments have changed some of that though...

What happens when AntiVirus crawls each user's registry hive? It updates that file.
Suddenly the inventory app was reporting each profile to be current as of the
day the app was run...not good. I searched a long time via the Internet - and
just poking around the registry for days. WMI didnt' help any - and neither did
a hunch I had about using the local computer as an Active Directory forest to
find the last login time. I came across another file you can check - and I
believe I'm the first on the net to post this.

Check the file date on this file:

```
C:\Documents and Settings\<user>\Local Settings\Application Data\Microsoft\Windows\UsrClass.dat.LOG
```

This has proved to be a reliable way of getting the last login time for each profile when
the other log file isn't reliable. I suspect that it may be updated on certain
software installations - so beware. But in my case - this was a life saver. Have
fun and let me know if it helps!
