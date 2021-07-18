---
title:
  "SharePoint 2010: Remove existing reusable content items using PowerShell"
date: "2011-07-06"
author: Jon Badgett
categories:
  - PowerShell
  - Programming
  - SharePoint
draft: false
slug: sharepoint-2010-remove-existing-reusable-content-items-using-powershell
---

|- This same PowerShell could be used for any other list to remove all of the
items. I just needed it to remove the OOB reusable content. [ps]
$siteColTemp = Get-SPSite &quot;http://yourSiteCollectionUrl&quot;; $reusableContentList = $siteColTemp.RootWeb.Lists[&quot;Reusable Content&quot;]; $reusableContentItems = $reusableContentList.Items; $reusableContentItemsCount = $reusableContentItems.Count; for($x=$reusableContentItemsCount-1;$x
-ge 0; $x--){$reusableContentItems[$x].Delete();} [/ps]
