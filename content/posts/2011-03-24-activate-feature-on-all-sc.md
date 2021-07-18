---
title: Activate Feature on all Site Collections in a Web Application
date: "2011-03-24"
author: Jon Badgett
categories:
  - Programming
  - SharePoint
draft: false
slug: activate-feature-on-all-sc
---

This is pretty easy using powerhell with SharePoint 2010:

[powershell]Get-SPWebApplication
&quot;http://WebApplicationUrl:PortIfNeeded&quot; | Get-SPSite |
ForEach-Object{Enable-SPFeature &quot;Solution.Name*FeatureName&quot; -url
$*.Url}[/powershell]
