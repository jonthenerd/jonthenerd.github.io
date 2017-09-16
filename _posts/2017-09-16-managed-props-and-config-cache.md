---
title: "SharePoint: Search Managed Properties missing after full crawl"
date: 2017-09-16
author: Jon Badgett
categories: [SharePoint]
---

Scenario:

* SharePoint 2013
* You've created some site columns, added them to a content type, then added that content type to a list/library.
* You add some test data.
* Run a full crawl. 
* Create managed properties, mapping them to the crawled properties.
* Run another full crawl (to populate the managed properties)
* Managed properties on search results are missing.

What do you do now?
<!--more-->

* Run another full crawl and check again.
* Wonder why it's still not working.

What else has worked for me? Clear the SharePoint Config Cache. This is referenced in a [Stack Overflow Question](https://sharepoint.stackexchange.com/questions/122486/new-managed-properties-dont-contain-values) and it references a [Technet article](https://blogs.technet.microsoft.com/sp/?p=373). However, the SO question is out of date with the article and the article has some incorrect quotes, making copy+paste fail. Here's the technet article code cleaned up a bit.

After clearing the config cache, run a full crawl. I've had success in this allowing Managed Properties to be populated with data and present when the above steps didn't work.

```powershell
Add-PSSnapin -Name Microsoft.SharePoint.PowerShell -ErrorAction SilentlyContinue;

write-host "CLEAR CONFIG CACHE ON FARM" -F Green;

$servers = get-spserver | ?{$_.role -eq "Application"}
foreach ($server in $servers)
{
    $servername = $server.Address;
    write-host "Stop Timer Service on server $servername" -F Yellow;
    (Get-WmiObject Win32_Service -filter "name='SPTimerV4'" -ComputerName $servername).stopservice() | Out-Null;
}

foreach ($server in $servers)
{
    $servername = $server.Address;
    $folders = Get-ChildItem ("\\" + $servername + "\C$\ProgramData\Microsoft\SharePoint\Config");

    foreach ($folder in $folders)
    {
        $items = Get-ChildItem $folder.FullName -Recurse;
        foreach ($item in $items)
        {
            if ($item.Name.ToLower() -eq "cache.ini")
            {
                $cachefolder = $folder.FullName;
            }
        }
    }

    write-host "Found CacheFolder on Server $servername = $cachefolder" -F Yellow;
    $cachefolderitems = Get-ChildItem $cachefolder -Recurse;

    write-host "Delete all XMQL Files inside this CacheFolder" -F Yellow;
    foreach ($cachefolderitem in $cachefolderitems)
    {
        if ($cachefolderitem -like "*.xml")
        {            
            $cachefolderitem.Delete();
        }
    }

    $a = Get-Content $cachefolder\cache.ini;
    $a = 1;
    write-host "Creating a new Cache.ini File on server $servername" -F Yellow;
    Set-Content $a -Path $cachefolder\cache.ini;
}

foreach ($server in $servers)
{
    $servername = $server.Address;
    write-host "START Timer Service on server $servername" -F Yellow;
    (Get-WmiObject Win32_Service -filter "name='SPTimerV4'" -ComputerName $servername).startservice() | Out-Null;
}
```