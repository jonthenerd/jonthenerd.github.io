---
layout: post
title: "SharePoint 2010: Unable to delete site/web after SP1"
date: 2011-08-11 10:32
author: Jon Badgett
categories: [PowerShell, Programming, SharePoint]
draft: false
---
While doing some testing after upgrading my dev machine to SP1, I ran into two separate issues when trying to delete a web through the UI by using the "Sites and Workspaces" link in Site Settings. Deleting through powershell worked fine.

<!--more-->

<strong>Issue #1: Specified method is not supported<a href="http://social.msdn.microsoft.com/Forums/en-ZA/sharepoint2010general/thread/897f2c01-aebb-449d-bda9-2e6fda81a897?outputAs=rss" rel="nofollow"><img src="http://i2.social.s-msft.com/Forums/resources/images/trans.gif?cver=1864.923%0d%0a" alt="" /></a></strong>

This specific error was occurring only on one of my web applications. I had just attached the database for this application to my existing SharePoint 2010 SP1 environment. The error will appear if the database for your web application needs to be updated.

To check if your database needs to be updated, open Central Administration and navigate to "Upgrade and Migration" -&gt; "Review database status". All of your databases should show a status of "No action required". If the application you are experiencing the error on is running in compatibility mode, you'll need to update it using PowerShell. To do this, first get the GUID ID of the database in question by running the following powershell and then copying the ID of the database you wish to upgrade:

[code lang="ps"]Get-SPContentDatabase[/code]

Then run the following powershell to upgrade the database using the ID you just copied.

[code lang="ps"]Upgrade-SPContentDatabase -Identity YourDatabaseIDGoesHere[/code]

<strong>Issue #2: There is no Web named "/YourWebName"</strong>

Once my above issue was resolved on the one misbehaving web application, I had consistent behavior across all web applications when trying to delete a web... or so I thought. Turns out - if I create a web right off of the site collection (the RootWeb), then I can successfully delete it using the "Sites and Workspaces" page. Also - I can delete the web successfully if I navigate to the web I want to delete and then use the "Delete this Site" link. This behavior was consistent in a SharePoint 2010 SP1 environment <strong>and</strong> SharePoint 2010 SP1 + June Cumulative Update. What's going on here?

Time to open up Reflector. The offending code comes from the Microsoft.SharePoint.ApplicationPages dll located in the virtual directory/_app_bin of your web application. Specifically, the DeleteWebPage class.

The offending line, using the OpenWeb function, gets passed "/DeleteMe" if your web's name is "DeleteMe". This will work fine if the web's url starting from the site collection is "/DeleteMe". But if your web is a subweb of a subweb (e.g. http://yoursite/someweb/DeleteMe) then it will fail and throw the exception. This looks to be a bug in SP1 and June CU... so we'll have to wait for MS to fix the issue before we can go this route to delete a web. Instead - use PowerShell to delete the web or navigate to the web you wish to delete and use the "Delete this Site" link.
