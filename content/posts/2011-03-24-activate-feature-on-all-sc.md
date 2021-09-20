---
title: Activate Feature on all Site Collections in a Web Application
date: "2011-03-24"
author: Jon Badgett
categories:
    - SysAdmin
tags:
    - SharePoint
draft: false
slug: activate-feature-on-all-sc
---

This is pretty easy using powerhell with SharePoint 2010:

```powershell
Get-SPWebApplication "http://WebApplicationUrl:PortIfNeeded" | Get-SPSite | ForEach-Object{Enable-SPFeature "Solution.Name.FeatureName" -url $_.Url}
```
