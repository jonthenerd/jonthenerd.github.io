---
title: ASP.NET Padding Oracle
date: "2010-09-22"
author: Jon Badgett
categories:
    - SysAdmin
    - Programming
    - Security
tags:
    - ASP.NET
    - Padding Oracle
draft: false
slug: asp-net-padding-oracle
---

I'm doing research to better understand the padding oracle attack that was
recently disclosed to affect ASP.NET and thought to provide a quick list of
links that I've found most helpful:

-   [Microsoft SharePoint Team Blog: Security Advisory 2416728 (Vulnerability in ASP.NET) and SharePoint](http://blogs.msdn.com/b/sharepoint/archive/2010/09/21/security-advisory-2416728-vulnerability-in-asp-net-and-sharepoint.aspx)
-   [Automated Padding Oracle Attacks with PadBuster](http://www.gdssecurity.com/l/b/2010/09/14/automated-padding-oracle-attacks-with-padbuster/)
-   [How to check if your application is vulnerable to the ASP.NET Padding Oracle Vulnerability](http://www.acunetix.com/blog/news/check-application-vulnerable-asp-net-padding-oracle-vulnerability/)
-   [Duncan Smart's post on ASP.NET detailing how to check if your application masks the oracle](http://forums.asp.net/p/1604549/4090643.aspx)
-   [Duncan Smart's blog entry on the matter (with link to a wsh script to use for testing)](http://blog.dotsmart.net/2010/09/22/asp-net-padding-oracle-detector/)
-   [ASP.NET forum post dealing with classic ASP. Guess what - your ASP site may be vulnerable if you haven't disabled some ASP.NET features](http://forums.asp.net/t/1604739.aspx)

The ASP Classic is the most unexpected bit to me, but makes perfect sense.

Update: Patch your servers, as the padding oracle is
[no longer needed](http://blog.mindedsecurity.com/2010/10/breaking-net-encryption-with-or-without.html).
Thanks Matt!
