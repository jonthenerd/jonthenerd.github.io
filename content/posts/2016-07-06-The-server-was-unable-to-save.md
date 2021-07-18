---
title: "SharePoint: The server was unable to save the form at this time"
date: 2016-07-06
author: Jon Badgett
categories: [SharePoint]
draft: false
---
We ran across an issue in a test environment where we were unable to add items to a list, or a document
library. However, you could use Windows explorer view to upload a document.

The specific error message seen was:

```
The server was unable to save the form at this time. Please try again.
```
<!--more-->

Looking in the ULS log, there were odd messages dealing with authentication that seemed
to indicate that the Javascript CSOM was unable to process my request due to conversion of Windows to Claims...
but we're using Kerberos. What's up?

```
Claims Windows Sign-In: Redirecting successfully signed-in user '<user here>' for request url 'https://your-sharepoint/_windows/default.aspx?ReturnUrl=/_vti.bin/client.svc/ProcessQuery'
```

There are several claimed ways to fix this error. They range from restarting your server to
enabling anonymous access (why anyone would resort to this is beyond me). Luckily, I found
a voice of sanity - [Volker @ isrichtig.de's blog post "
ERROR on Newform.aspx in some Lists"](http://blog.isrichtig.de/Lists/Beitraege/Post.aspx?ID=128).
Here are his steps, which worked in our case as well:

* Open the SharePoint Central Administration Web site, click Application Management.
* On the Application Management page, in the SharePoint Web Application Management section, click Web application list.
* On the Web Application List page, select your Web application.
* Select Authentication providers from the ribbon.
* Click Default.
* Click Ok to save the provider again.

Effectively, it looks like this resets your authentication settings for a particular zone
to what they're believed to be in the configuration database. Why this got broke, I'm not sure, but this
was an easy fix that was only enforcing the known settings anyway.
