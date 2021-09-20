---
title: IE8 Standards Mode and MOSS
date: "2009-10-26"
author: Jon Badgett
categories:
    - Programming
tags:
    - SharePoint
    - Internet Explorer
draft: false
slug: ie8-standards-mode-and-moss
---

Using IE8 Standards Mode with MOSS has been fairly trouble-free so far. However,
the richhtmlfield editor throws javascript errors when the page is in IE8
Standards mode. Without switching to the Telerik control or defaulting **all**
of my pages to IE7 mode - there is a simpler fix!

Enable IE7 compatability mode only on your edit pages. My master page had the IE8 meta
tag:

```html
<meta equiv="X-UA-Compatible" content="IE=8" />
```

right under the head element. To force your edit
pages into IE7 mode, use the `PublishingWebControls:EditModePanel` to
conditionally display it. Directly under the head element should now look
like:

```html
<publishingwebcontrols:editmodepanel
    id="EditModePanel1"
    runat="server"
    suppresstag="true">
    <meta equiv="X-UA-Compatible" content="IE=7" />
</PublishingWebControls:EditModePanel/>
<meta equiv="X-UA-Compatible" content="IE=8" />
```

Yay.
