---
title: XSLT that emits source XML
date: "2010-01-27"
author: Jon Badgett
categories:
    - Programming
tags:
    - SharePoint
draft: false
slug: xslt-that-emits-source-xml
---

I got this from a friend and have found it very useful for debugging my XSLT
from content query web parts and data view web parts in Visual Studio. The below
XSLT will output the source XML given to
it:

```xslt
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt"
    exclude-result-prefixes="msxsl">
    <xsl:output method="xml" indent="yes"/>
    <xsl:template match="@ node()">
        <xsl:copy>
            <xsl:apply-templates select="@ node()"/>
        </xsl:copy>
    </xsl:template>
</xsl:stylesheet>
```
