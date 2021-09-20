---
title: "SharePoint 2010: Disable Feature on all Web Applications PowerShell"
date: "2011-07-21"
author: Jon Badgett
categories:
    - SysAdmin
tags:
    - PowerShell
    - SharePoint
draft: false
slug: sharepoint-2010-disable-feature-on-all-web-applications-powershell
---

Because it's easier to copy+paste this later... This will disable a feature on
all web applications in a farm. Very convenient for when you're removing a
feature from a solution.

```posh
Get-SPWebApplication | ForEach-Object {Disable-SPFeature "Solution.Name.FeatureName" -url $_.Url;}
```
