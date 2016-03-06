---
layout: post
title: Unable to delete field in SharePoint library
date: 2010-02-25 16:04
author: Jon Badgett

categories: [SharePoint]
---
Trying to delete a field in a SharePoint library and get the message "Cannot complete this action. Pleast try again."? This drove me nuts, as even invoking the delete method via the object model gives this message. What I found to allow a delete was pushing down changes via the content type gallery in the site collection (if the field was ever a part of that content type). This can be found by going to the following:<br />* Site Settings<br />* Site Content Type Gallery<br />* Choose Content Type<br />* Advanced Settings<br />* Make sure radio button "Update all content types inheriting from this type" is checked<br />* Click OK<br /><br />I had several libraries with several fields that had this issue (all fields used to be a part of the content type but had since been orphaned due to changing the definition of the content type in the elements.xml) and now they are all clean and free of these unneeded fields.<br /><br />If only the error would have told me something meaningful...because trying again was surely never going to fix it.
