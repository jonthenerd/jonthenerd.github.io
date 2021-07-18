---
layout: post
title: SharePoint Content Query WebPart easy values
date: 2010-10-14 13:06
author: Jon Badgett

categories: [Programming, SharePoint]
---
Sometimes it's helpful to see exactly what your CQW is receiving. Put this into a style and see what properties and data you're receiving:

[sourcecode language="xslt"]&lt;xsl:for-each select=&quot;@*&quot;&gt;
P:&lt;xsl:value-of select=&quot;name()&quot; /&gt;&lt;br/&gt;
V:&lt;xsl:value-of select=&quot;.&quot; /&gt;&lt;br/&gt;
&lt;/xsl:for-each&gt;[/sourcecode]
