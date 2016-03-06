---
layout: post
title: IP30 Programming - Part 2
date: 2012-10-07 15:12
author: Jon Badgett

categories: [Android, IP30, Programming, Programming]
---
The batteries on the IP30 and CN3 are fully charged and ready for some tinkering.
<h2>Upgrading the Firmware from 3.01 to 3.16</h2>
I looked into upgrading the firmware on the IP30 and it looks to require a MiniSD card. MiniSD is the never-mentioned step brother of SD and MicroSD... meaning stores don't carry it anymore. I've got a MiniSD card and reader on order from Amazon... so updating the IP30 will have to wait.
<h2>Available Commands</h2>
To receive the available commands on the IP30, the HELP command can be issued. Here's the response for BRI 3.01 on the IP30:

<img class="aligncenter size-full wp-image-343" title="IP30 Help Response" src="http://www.jonthenerd.com/wp-content/uploads/2012/10/IP30-Help-Response.jpg" alt="" width="525" height="64" />
<h2>Reading Tags</h2>
Issuing a READ command causes the IP30 to read all tags in the vicinity and report them back in one shot. Tested and this works. Turns out the 8 tags that I have for testing all have the same ID... not optimal but it will work for now.
<h2>Next</h2>
This is probably it for testing the IP30 with Windows and Tera Term. I'm going to activate my license to Xamarin (have to purchase just to deploy to the device...wish they had some better pricing for education) and get to programming.
