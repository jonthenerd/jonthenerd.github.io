---
layout: post
title: 'GIMP How to make fuzzy border transparent'
date: 2010-06-13 19:02
author: Jon Badgett
categories: [Software]
---

* Do not use the "Flatten Image" option. A new layer will be created  containing only the border (this layer will be the active layer).
* Perform  "Layer-&gt;Transparency-&gt;Alpha to Selection"
* Perform  "Layer-&gt;Delete". (you don't need this layer any more)
* Perform  "Layer-&gt;Transparency-&gt;Add Alpha Channel" (if possible)
* Perform  "Edit-&gt;Clear"
* Note: the "Layer" commands are also available  on the context menu accessed by right-clicking on the layer's thumbnail  preview in the Layer Dialog.
