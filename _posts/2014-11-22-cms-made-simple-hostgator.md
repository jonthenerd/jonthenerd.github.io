---
layout: post
title: CMS Made Simple & HostGator - Can't upload files
date: 2014-11-22 21:15
author: Jon Badgett

categories: [CMS Made Simple]
---
<!--more-->

I administer a CMS Made Simple site that runs on HostGator. I got a report from a user that they couldn't upload any files. Strange! I checked it out, and neither could I (through the web interface). I could upload a file straight to the /uploads directory, but I couldn't delete the file. It would complain about my actions being limited to the uploads folder... so it thought I wasn't in it?

Logged into HostGator's cPanel and found that my root path had changed from /home to /home4 ... no notice from HostGator about this, it just changed.

Changed the config.php of the CMS Made Simple site to have /home4 wherever /home was before - all is working now.
