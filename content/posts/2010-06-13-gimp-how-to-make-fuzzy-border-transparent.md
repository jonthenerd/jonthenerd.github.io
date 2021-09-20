---
title: GIMP How to make fuzzy border transparent
date: "2010-06-13"
author: Jon Badgett
categories:
    - Software
tags:
    - Open Source
    - Gimp
draft: false
slug: gimp-how-to-make-fuzzy-border-transparent
---

-   Do not use the "Flatten Image" option. A new layer will be created containing
    only the border (this layer will be the active layer).
-   Perform "Layer->Transparency->Alpha to Selection"
-   Perform "Layer->Delete". (you don't need this layer any more)
-   Perform "Layer->Transparency->Add Alpha Channel" (if possible)
-   Perform "Edit->Clear"
-   Note: the "Layer" commands are also available on the context menu accessed by
    right-clicking on the layer's thumbnail preview in the Layer Dialog.
