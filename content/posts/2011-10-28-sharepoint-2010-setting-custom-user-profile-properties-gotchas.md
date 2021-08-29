---
title: "SharePoint 2010: Setting custom User Profile properties Gotchas"
date: "2011-10-28"
author: Jon Badgett
categories:
    - Programming
    - SharePoint
draft: false
slug: sharepoint-2010-setting-custom-user-profile-properties-gotchas
---

<h2>The Goal</h2>
The goal is to create a custom User Profile property and then set and retrieve its value using C#.
<h2>The resources</h2>
Here's the best resources on the net for creating, modifying, etc.
<ul>
	<li>Peter Holpar's <a href="http://pholpar.wordpress.com/2010/03/17/creating-profile-properties-and-sections-the-sharepoint-2010-way-part-2-the-code/">Creating profile properties and sections the SharePoint 2010 way - part 2, the code</a></li>
	<li>MSDN's <a href="http://msdn.microsoft.com/en-us/library/ms518939(v=office.14).aspx">How to: Modify User Profile Data</a></li>
</ul>
<h2>The Gotchas</h2>
Using the above resources, you can piece together how to programatically create custom user profile properties (and sections), set their value(s), and get their value(s). As a developer, you've probably only configured enough of your dev farm to get done what you need to do...which isn't nearly enough to set the values on a custom user profile property.

What else do you need?

Custom User Profile Properties (and several of the Out of Box ones) depend on a
Managed Metadata Service Application being setup and associated with the
application you're working with. This is fairly trivial to setup. Just remember
that after you set it up via the UI, you'll need to start it on the "Manage
services on this server" page, and then perform an IIS reset. Forgetting these
will keep your Managed Metadata service from working.
