---
layout: post
title: Activation could not be completed because the InfoPath Forms Services support feature is not present.
date: 2011-02-28 14:15
author: Jon Badgett

categories: [Programming, Programming, SharePoint]
---
Got this error after migrating a SP2007 application to SP2010. 

<img src="http://www.jonthenerd.com/wp-content/uploads/2011/02/InfoPathError.png" alt="Activation could not be completed because the InfoPath Forms Services support feature is not present." title="InfoPathError" class="aligncenter size-medium wp-image-172" />

The feature it is complaining about is a hidden feature with displayname "IPFSSiteFeatures". This feature was already enabled on the migrated application...but resolving the error was as simple as disabling and then re-enabling the feature. Here's the PowerShell to do that:

[powershell]Disable-SPFeature &quot;IPFSSiteFeatures&quot; -url &quot;http://yourwebapp&quot;
Enable-SPFeature &quot;IPFSSiteFeatures&quot; -url &quot;http://yourwebapp&quot;
[/powershell]
