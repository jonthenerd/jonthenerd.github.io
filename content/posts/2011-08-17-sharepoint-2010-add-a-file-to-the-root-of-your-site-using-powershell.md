---
title: "SharePoint 2010: Add a file to the root of your site using PowerShell"
date: 2011-08-17 11:10
author: Jon Badgett
categories: [PowerShell, Programming, SharePoint]
draft: false
---

  This can be useful when you need a file to be right off the root of your Internet facing site - files like robots.txt, sitemap.xml, or the verification file for Google Webmaster tools. We'll take advantage of PowerShell's ability to use any .NET methods along with the Files collection on each SPWeb in SharePoint.
  ``` $fileBytes = [system.io.file]::ReadAllBytes("c:\the\full\path\to\your\file.txt"); $site = Get-SPSite "http://yourdomain:portifneeded"; $site.RootWeb.Files.Add("file.txt", $fileBytes, $true); ```
  This will result in a file.txt located at "http://yourdomain:portifneeded/file.txt". Sweet!
