---
title: >-
  SharePoint WebPart implementing ICallbackEventHandler does not work properly
  in Web Part Gallery
date: "2010-12-07"
author: Jon Badgett
categories:
  - Programming
  - SharePoint
draft: false
slug: >-
  sharepoint-webpart-implementing-icallbackeventhandler-does-not-work-properly-in-web-part-gallery
---

In migrating some WebParts from SP2007 to SP2010, I came across a webpart that
implements ICallbackEventHandler. This webpart was working fine when placed on
the page, but did not work correctly in the webpart gallery. The specific error
message being received was "The target 'ctl00$PlaceHolderMain$ctl00' for the
callback could not be found or did not implement ICallbackEventHandler". This
error is due to the webpart being added to the preview page dynamically at
runtime. Everything online I've seen assumes that pages doing this can be
modified to load controls dynamically either in the Init event or on each Load
event. Since SharePoint developers can't affect the Web Part preview page - the
best I could come up with is to prevent the registratration for callback by
checking the ID of the control in the Load event. This will tell you if the
control is being loaded dynamically, or if it has been placed on a page.

Here's the code to use in the OnLoad event: [sourcecode language="csharp"] if
(this.ID == null) { // This occurs in the webpart gallery and causes it to throw
a javascript error. Controls.Add(new LiteralControl(&quot;This webpart does not
function correctly in the webpart gallery. Please test on a page within a
webpart zone.&quot;)); } else { // Do what you normally do. } [/sourcecode]

Have a better idea on how to get this to work in the web part preview page? Let
me know. At this point I'm content not throwing the javascript error.
