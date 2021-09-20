---
title: >-
    SharePoint 2010 - MigrateUser Error 'Value cannot be null. Parameter name:
    userProfileApplicationProxy'
date: "2013-01-22"
author: Jon Badgett
categories:
    - SysAdmin
tags:
    - SharePoint
draft: false
slug: >-
    sharepoint-2010-migrateuser-error-value-cannot-be-null-parameter-name-userprofileapplicationproxy
---

When using the stsadm command:

stsadm.exe -o migrateuser oldlogin "domainusername" -newlogin
"domainnewusername"

We received this error message:

Value cannot be null. Parameter name: userProfileApplicationProxy

If you look in the ULS logs, you'll find that there is an Access Denied event
occuring. We were able to resolve this by going into Central Administration,
selecting the User Service Application, and ensuring that the administrator
account being used to run the above command has Full Control rights to the
Service Application. You can find this by going to the following in Central
Administration:

Application Management -&gt; Manage Service Applications -&gt; Select, but do
not follow the link for your User Profile Sync service -&gt; The "Permissions"
button in the ribbon
