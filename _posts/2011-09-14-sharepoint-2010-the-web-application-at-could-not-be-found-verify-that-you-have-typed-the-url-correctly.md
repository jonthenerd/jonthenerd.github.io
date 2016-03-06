---
layout: post
title: "SharePoint 2010: The web application at ... could not be found. Verify that you have typed the URL correctly."
date: 2011-09-14 16:30
author: Jon Badgett

categories: [Programming, SharePoint]
---
and so on with the error message. Do these also fit your situation?
1) The error happens when running a console application
2) Using PowerShell works to access the SPSite, SPWeb, or SPWebApplication that you're accessing in your console application

How do you fix this?
Change your build platform target to x64 instead of x86. Also keep in mind that this is a per build configuration setting (so you have the setting for Debug and Release compile modes).

Why did I post this?
Because every few months this bites me in some way. Normally for at least an hour at a time. It's extremely confusing at first and a 'doh moment when you figure it out.
