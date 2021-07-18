---
title: Active Directory homeDrive (Home Folder)
date: "2008-06-19"
author: Jon Badgett
categories:
  - Active Directory
  - Programming
  - Windows
draft: false
slug: active-directory-homedrive-home-folder
---

If you're using an automated tool to create your user accounts and assign a Home
Folder (a mapped drive pointing to shared location on a server) - make certain
that the property has a colon after the drive letter (e.g.
<span style="color: rgb(0, 102, 0); font-weight: bold;">Z:</span> not
<span style="color: rgb(255, 0, 0); font-weight: bold;">Z</span>). Without the
colon, the drive will not be mapped on user log on. How do you know if this
property is set correctly? Active Directory Users and Computers won't show you.
Use
<a href="http://technet.microsoft.com/en-us/sysinternals/bb963907.aspx">ADExplorer</a>.
This tool will show you the properties, value types, and actual values of any
object in your Active Directory structure...very helpful for writing scripts and
apps that interface with LDAP.
