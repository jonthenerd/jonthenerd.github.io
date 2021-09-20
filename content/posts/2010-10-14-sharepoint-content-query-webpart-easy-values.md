---
title: SharePoint Content Query WebPart easy values
date: "2010-10-14"
author: Jon Badgett
categories:
    - Programming
tags:
    - SharePoint
draft: false
slug: sharepoint-content-query-webpart-easy-values
---

Sometimes it's helpful to see exactly what your CQW is receiving. Put this into
a style and see what properties and data you're receiving:

```xslt
<xsl:for-each select="@*">
    P:<xsl:value-of select="name()" /><br/>
    V:<xsl:value-of select="." /><br/>
</xsl:for-each>
```
