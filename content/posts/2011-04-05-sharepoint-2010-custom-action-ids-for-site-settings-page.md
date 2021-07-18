---
title: SharePoint 2010 Custom Action IDs for Site Settings page
date: 2011-04-05 16:09
author: Jon Badgett
categories: [SharePoint, Programming]
draft: false
---
Since the <a href="http://msdn.microsoft.com/en-us/library/bb802730.aspx">MSDN documentation for Default Custom Action Loacations and IDs </a>is unreliable (they look to have copy+pasted the information from the SharePoint 2007 documentation), our only sure bet is to browse the file system and find the custom action IDs and groups ourselves.

I had need of this information today, and found the items from the site settings page located at:
C:\Program Files\Common Files\Microsoft Shared\Web Server Extensions\14\TEMPLATE\FEATURES\SiteSettings\SiteSettings.xml

For those looking specifically for it, here is the custom action for "Delete this site":

[xml]
&lt;CustomAction
        Id=&quot;DeleteWeb&quot;
        GroupId=&quot;SiteTasks&quot;
        Location=&quot;Microsoft.SharePoint.SiteSettings&quot;
        Rights=&quot;ManageWeb,BrowseUserInfo&quot;
        Sequence=&quot;40&quot;
        Title=&quot;$Resources:core,SiteSettings_DeleteWeb_Title;&quot;
        Description=&quot;$Resources:core,SiteSettings_DeleteThisSite_Tooltip;&quot;&gt;
        &lt;UrlAction
            Url=&quot;_layouts/deleteweb.aspx&quot; /&gt;
    &lt;/CustomAction&gt;
[/xml]

If you're looking for that custom action, you're probably wanting to hide it. Here's the xml you'll need in your elements file:

[xml]
&lt;HideCustomAction
    Id=&quot;HideDeleteWeb&quot;
    GroupId=&quot;SiteTasks&quot;
    HideActionId=&quot;DeleteWeb&quot;
    Location=&quot;Microsoft.SharePoint.SiteSettings&quot;&gt;
  &lt;/HideCustomAction&gt;
[/xml]
