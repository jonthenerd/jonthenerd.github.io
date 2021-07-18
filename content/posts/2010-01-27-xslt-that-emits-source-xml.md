---
title: XSLT that emits source XML
date: 2010-01-27 10:43
author: Jon Badgett
categories: [Programming, SharePoint]
draft: false
---
? I got this from a friend and have found it very useful for debugging my XSLT from content query web parts and data view web parts in Visual Studio. The below XSLT will output the source XML given to it:<br /><br /><pre style="BORDER-BOTTOM
: #999999 1px dashed; BORDER-LEFT: #999999 1px dashed; PADDING-BOTTOM: 5px; LINE-HEIGHT: 14px; BACKGROUND-COLOR: #eee; PADDING-LEFT: 5px; WIDTH: 100%; PADDING-RIGHT: 5px; FONT-FAMILY: Andale Mono, Lucida Console, Monaco, fixed, monospace; COLOR: #000000; FONT-SIZE: 12px; OVERFLOW: auto; BORDER-TOP: #999999 1px dashed; BORDER-RIGHT: #999999 1px dashed; PADDING-TOP: 5px"><code>&lt;?xml version="1.0" encoding="utf-8"?&gt;<br />&lt;xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"<br />    xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl"&gt;<br />    &lt;xsl:output method="xml" indent="yes"/&gt;<br /><br />    &lt;xsl:template match="@*  node()"&gt;<br />        &lt;xsl:copy&gt;<br />            &lt;xsl:apply-templates select="@*  node()"/&gt;<br />        &lt;/xsl:copy&gt;<br />    &lt;/xsl:template&gt;<br />&lt;/xsl:stylesheet&gt;<br /><br /></code></pre>

