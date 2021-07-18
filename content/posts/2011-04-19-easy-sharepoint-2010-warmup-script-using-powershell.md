---
title: Easy SharePoint 2010 warmup Script using PowerShell
date: 2011-04-19 14:17
author: Jon Badgett
categories: [Programming, SharePoint, PowerShell]
draft: false
---
|-
  This idea comes from <a href="http://kirkhofer.wordpress.com/2008/10/18/sharepoint-warm-up-script/">Kirk Hofer's blog</a>, but modfied to use the SharePoint 2010 powershell commandlets and not care about specifying credentials in the script. I figured most people would just keep using the credentials specified in their scheduled task.
  The script loads the SharePoint plugin, enumerates the zones, and sends a request to each one.
  ```powershell Add-PSSnapin Microsoft.SharePoint.PowerShell;
  function Get-WebPage([string]$url) { $wc = new-object net.webclient; $wc.credentials = [System.Net.CredentialCache]::DefaultCredentials; $pageContents = $wc.DownloadString($url); $wc.Dispose(); return $pageContents; }
  Get-SPAlternateUrl -Zone Default | foreach-object { write-host $_.IncomingUrl; $html = Get-WebPage -url $_.IncomingUrl; } ```
