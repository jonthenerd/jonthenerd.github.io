---
title: SharePoint 2010 Custom Action IDs for Site Settings page
date: "2011-04-05"
author: Jon Badgett
categories:
    - Programming
tags:
    - SharePoint
draft: false
slug: sharepoint-2010-custom-action-ids-for-site-settings-page
---

Since the [MSDN
documentation for Default Custom Action Loacations and IDs](http://msdn.microsoft.com/en-us/library/bb802730.aspx) is unreliable
(they look to have copy+pasted the information from the SharePoint 2007
documentation), our only sure bet is to browse the file system and find the
custom action IDs and groups ourselves.

I had need of this information today, and found the items from the site settings
page located at:

`C:\Program Files\Common Files\Microsoft Shared\Web Server Extensions\14\TEMPLATE\FEATURES\SiteSettings\SiteSettings.xml`

For those looking specifically for it, here is the custom action for "Delete
this site":

```xml
<CustomAction
    Id="DeleteWeb"
    GroupId="SiteTasks"
    Location="Microsoft.SharePoint.SiteSettings"
    Rights="ManageWeb,BrowseUserInfo"
    Sequence="40"
    Title="$Resources:core,SiteSettings_DeleteWeb_Title;"
    Description="$Resources:core,SiteSettings_DeleteThisSite_Tooltip;">
    <UrlAction Url="\_layouts/deleteweb.aspx" />
</CustomAction>
```

If you're looking for that custom action, you're probably wanting to hide it.
Here's the xml you'll need in your elements file:

```xml
<HideCustomAction
    Id="HideDeleteWeb"
    GroupId="SiteTasks"
    HideActionId="DeleteWeb"
    Location="Microsoft.SharePoint.SiteSettings">
</HideCustomAction>
```
