---
title: CMS Made Simple - Post-Upgrade to v1.11.11
date: 2014-09-05 21:08
author: Jon Badgett
categories: [CMS Made Simple, Programming]
draft: false
---
After finishing an upgrade of another site's CMS Made Simple to version 1.11.11, I found that in certain areas I was seeing warning messages at the top of the screen after editing calendar events within CGCalendar.

<!--more-->
They looked like this:

[code]
Warning: Cannot modify header information - headers already sent by (output started at /home4/user/public_html/admin/moduleinterface.php:99) in /home4/user/public_html/include.php on line 96

Warning: Cannot modify header information - headers already sent by (output started at /home4/user/public_html/admin/moduleinterface.php:99) in /home4/user/public_html/include.php on line 99

Warning: Cannot modify header information - headers already sent by (output started at /home4/user/public_html/admin/moduleinterface.php:99) in /home4/user/public_html/include.php on line 102

Warning: Cannot modify header information - headers already sent by (output started at /home4/user/public_html/admin/moduleinterface.php:99) in /home4/user/public_html/include.php on line 103

Warning: Cannot modify header information - headers already sent by (output started at /home4/user/public_html/admin/moduleinterface.php:99) in /home4/user/public_html/include.php on line 106

Warning: Cannot modify header information - headers already sent by (output started at /home4/user/public_html/admin/moduleinterface.php:99) in /home4/user/public_html/include.php on line 109
[/code]

<strong>The Solution</strong>
The solution I found was to change my Administration Theme preference from the older "NCleanGrey" to the newer "OneEleven". This option is under My Preferences -> My Account -> User Preferences.

<strong>Tracing it down</strong>
I'm fairly new to PHP, having developed C# primarily the last few years. However, I believe what's causing this is that within the moduleinterface.php file (line 99), it's calling a "ShowMessage" function that's supposed to exist within your preferred theme. The NCleanGrey theme has no such function, while the newer OneEleven theme does. Why this lack of a function causes it to yield these particular error messages, I have no idea. I'm trying to post a bug report on this, so perhaps it can be fixed in the next version of CMSMS. Until then, I'd suggest just using the new theme.
