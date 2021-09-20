---
title: Occasional SPException from GetListItemDataWithCallback
date: "2010-02-26"
author: Jon Badgett
categories:
    - Programming
tags:
    - SharePoint
draft: false
slug: occasional-spexception-from-getlistitemdatawithcallback
---

Wrote a new field control today (SharePoint) that queried a specific list in
another site collection based on the value of a field from the current list
item. This worked great each time I'd test it out and add some additional
functionality. When I finished the control, I did a little harder testing by
hitting the refresh button in my browser over and over again. Randomly, my
control wouldn't render. Other times it would be fine. What's up with
that?

If you Google it enough, you'll find that this message
generally appears when your CAML is malformed. Well - I used an XmlWriter to
build my CAML query (that way my inserted value from the item would be escaped
properly for XML), so surely my CAML must be fine if it's working most times???
Right??? Nope. The XmlWriter by default puts in a processing instruction on the
first line:

```xml
<xml version="1.0" encoding="UTF-8" ?>
```

Remove this first line and the field controls render each time without error. The specific error I was receiving was:

> > Microsoft.SharePoint.SPException was caught
> > Message="Exception occurred. (Exception from HRESULT: 0x80020009
> > (DISP_E_EXCEPTION))"
> > Source="Microsoft.SharePoint"
> > ErrorCode=-2147352567
> > StackTrace:
> > at Microsoft.SharePoint.Library.SPRequest.GetListItemDataWithCallback(String bstrUrl, String bstrListName, String bstrViewName, String bstrViewXml, SAFEARRAYFLAGS fSafeArrayFlags, ISP2DSafeArrayWriter pSACallback, ISPDataCallback pPagingCallback, ISPDataCallback pSchemaCallback)
