---
layout: post
title: Disable Throttling for a specific SharePoint 2010 list with PowerShell
date: 2011-01-11 11:46
author: Jon Badgett

categories: [Programming, Programming, SharePoint]
---
The following can be used to disable throttling on a specific list (must be run as an account with enough priv.):
[powershell]
$web = Get-SPWeb http://whateverWeb
$list = $web.Lists[“List Title”]
$list.enablethrottling = $false
$list.update()
[/powershell]
