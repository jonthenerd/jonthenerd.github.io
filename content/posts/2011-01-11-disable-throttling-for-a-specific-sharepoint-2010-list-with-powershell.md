---
title: Disable Throttling for a specific SharePoint 2010 list with PowerShell
date: "2011-01-11"
author: Jon Badgett
categories:
    - SysAdmin
tags:
    - SharePoint
draft: false
slug: disable-throttling-for-a-specific-sharepoint-2010-list-with-powershell
---

The following can be used to disable throttling on a specific list (must be run
as an account with enough priv.):

```powershell
$web = Get-SPWeb "http://whateverWeb";
$list = $web.Lists["List Title"];
$list.enablethrottling = $false;
$list.update();
```
