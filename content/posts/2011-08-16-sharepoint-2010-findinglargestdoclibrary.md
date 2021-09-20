---
title: "SharePoint 2010: Finding the largest document library in a site collection"
date: "2011-08-16"
author: Jon Badgett
categories:
    - SysAdmin
    - Programming
tags:
    - PowerShell
    - SharePoint
draft: false
slug: sharepoint-2010-findinglargestdoclibrary
---

SharePoint 2007 came with a page (storman.aspx) dedicated to showing you how
much space each of the lists in your site collection were taking up. SharePoint
2010 removed this page. Luckily, SharePoint 2010 SP1 added it back in. But what
if you're still haven't updated to SP1 and you're getting warnings/errors about
running out of space?

Obviously - up the space so as to avoid additional noise from your users. Then -
figure out which libraries are taking up the most space. This can be done by
using the (now obsolete - but working)
[StorageManagementInformation
method off of SPSite](http://msdn.microsoft.com/en-us/library/microsoft.sharepoint.spsite.storagemanagementinformation.aspx). You can write some C# to use it, or you can use
PowerShell.

The required arguments for this method (listed below) can be found by looking at
the above MSDN link. I'll also include the potential values that can be found by
using Reflector to look at the Microsoft.SharePoint dll:

<ol>
	<li><strong>ltVar: </strong>What kind of storage management information to display
<ul>
	<li>List = 1</li>
	<li>DocumentLibrary = 2</li>
	<li>Document = 3</li>
</ul>
</li>
	<li><strong>sordVar: </strong>the direction in which the items are to be sorted
<ul>
	<li>Increasing = 0x10</li>
	<li>Decreasing = 0x11</li>
</ul>
</li>
	<li><strong>soVar</strong>: whether the items are sorted by size or by date
<ul>
	<li>Size=0</li>
	<li>Date = 1</li>
</ul>
</li>
	<li><strong>nMaxResults</strong>: the number of results to return</li>
</ol>

So if you want to find the top 5 largest document libraries in a specific site
collection, here's the PowerShell:

```posh
$site = Get-SPSite "http://yoursitecollection:portifneeded";
$dataTable = $site.StorageManagementInformation(2,0x11,0,5);
$dataTable | Select *
```

This is very helpful if you aren't yet on SP2010 SP1. A note though - the method
is marked as obselete with this description "SPSite.StorageManagementInformation
is expensive; avoid using it.". There's no further explanation on what is being
spooled up to execute the method or why it was OK in SP2007 but not SP2010. So
I'd consider this OK to use if you have to...but not in some kind of recurring
scheduled script. Your mileage may vary, I'm not responsible for what happens to
your farm, etc. etc.

Hope you found this useful. Let me know!
