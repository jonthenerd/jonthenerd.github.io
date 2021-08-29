---
title: Muhimbi PDF Converter Services & InfoPath Error
date: "2016-04-04"
author: Jon Badgett
categories:
    - Muhimbi PDF Converter Services
draft: false
slug: Muhimbi-PDF-Converter-Services-and-InfoPath-Error
---

Ran across an error while proving out a new Muhimbi PDF Converter Services
install. I haven't seen it's like anywhere online, but managed to find a
resolution.

<!--more-->

This is most easily demonstrated if you're running the Muhimbi Document
Converter Diagnostics tool from the server performing conversions:

-   Author a new InfoPath form template and save it to C:\TEMP as form1.xsn
-   Fill out an instance of the form and save it to C:\TEMP as form1.xml
-   Use the diagnostics tool to attempt a conversion of the xml file.

Here's the error:

> FaultException occurred: ExceptionType: Unknown
> System.ServiceModel.FaultException`1[TestHarness.DocumentConverterService.WebServiceFaultException]:
> Muhimbi.DocumentConverter.WebService.Data.WebServiceInternalException:
> Exception of type
> 'Muhimbi.DocumentConverter.WebService.Data.WebServiceInternalException' was
> thrown. - Details: "Access is denied."

However, all other conversions attempted were successful (tested Word and
PowerPoint). What's going on here?

For grins, I removed the additional Authentication settings I had applied in the
configuration file for converter services. Low and behold, the InfoPath
conversions started working. I added the authentication settings back, and I got
the same results as before...

The fix? You must add the account used to run the Muhimbi service to the group
you created that should be allowed to perform conversions. My bet is there is
some logic where the service calls itself through the port exposed, and there
the WCF service checks permissions and calls Access Denied.
