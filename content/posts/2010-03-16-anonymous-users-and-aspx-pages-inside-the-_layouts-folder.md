---
title: Anonymous users and aspx pages inside the _layouts folder
date: 2010-03-16 11:14
author: Jon Badgett
categories: [Programming, SharePoint]
draft: false
---
I ran smack into an issue that was looking to be a serious problem yesterday. One of my development projects (SharePoint) is an anonymous access public-facing website. This site using built-in SharePoint web services and the download.aspx page in the _layouts directory to facilitate lookup of related documents and provide download capability. The issue? Anonymous users can't use any of the application pages in the _layouts folder. <br /><br />Lots of head scratching and some creative Google searches led me to the "DotNetIdeas" blog, specifically <a href="http://dotnetideasblog.blogspot.com/2009/07/sharepoint-security-for-contents-in.html">this post</a>. It details how the _layouts, _controltemplates, and _vti_bin directories are affected by allowing access to anonymous users. I recommend you go read their post, but the key excerpt is this:<br /><blockquote>Anonymous users can never load pages inheriting from  Microsoft.SharePoint.WebContorls.LayoutsPageBase</blockquote>The answer to my issue is to create my own download.aspx page (not overwriting the original) without inheriting from this class. I'd still be hunting whatever setting was keeping anonymous users from these pages if not for that helpful post though.
