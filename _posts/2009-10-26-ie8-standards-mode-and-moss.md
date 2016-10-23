---
layout: post
title: IE8 Standards Mode and MOSS
date: 2009-10-26 16:03
author: Jon Badgett

categories: [SharePoint]
---
Using IE8 Standards Mode with MOSS has been fairly trouble-free so far. However, the richhtmlfield editor throws javascript errors when the page is in IE8 Standards mode. Without switching to the <a href="http://www.telerik.com/">Telerik</a> control or defaulting <em>all </em>of my pages to IE7 mode - there is a simpler fix!<br /><br />Enable IE7 compatability mode only on your edit pages. My master page had the IE8 meta tag:<br /><br />&#60;meta equiv="X-UA-Compatible" content="IE=8"&#62;<br /><br />right under the head element. To force your edit pages into IE7 mode, use the PublishingWebControls:EditModePanel to conditionally display it.  Directly under the head element should now look like:<br /><br />&#60;publishingwebcontrols:editmodepanel id="EditModePanel1" runat="server" suppresstag="true"&#62;<br/>&#60;meta equiv="X-UA-Compatible" content="IE=7"&#62;<br/>&#60;/PublishingWebControls:EditModePanel&#62;<br/>&#60;meta equiv="X-UA-Compatible" content="IE=8"&#62;<br /><br />Yay.
