---
layout: post
title: "SharePoint 2010: Disable Feature on all Web Applications PowerShell"
date: 2011-07-21 13:42
author: Jon Badgett

categories: [PowerShell, Programming, SharePoint, Software]
---
Because it's easier to copy+paste this later... This will disable a feature on all web applications in a farm. Very convenient for when you're removing a feature from a solution.

[code lang="ps"]
Get-SPWebApplication | ForEach-Object {Disable-SPFeature &quot;Solution.Name_FeatureName&quot; -url $_.Url;}
[/code]
