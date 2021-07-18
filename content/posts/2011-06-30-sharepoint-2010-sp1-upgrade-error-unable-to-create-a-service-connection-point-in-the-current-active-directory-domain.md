---
title: >-
  SharePoint 2010 SP1 Upgrade Error "Unable to create a Service Connection Point
  in the current Active Directory domain."
date: "2011-06-30"
author: Jon Badgett
categories:
  - Programming
  - SharePoint
draft: false
slug: >-
  sharepoint-2010-sp1-upgrade-error-unable-to-create-a-service-connection-point-in-the-current-active-directory-domain
---

Full error: "Unable to create a Service Connection Point in the current Active
Directory domain. Verify that the SharePoint container exists in the current
domain and that you have rights to write to it."

After installing SP2010 SP1, PSConfig failed and the log had the above error. I
found that the timer service was stopped and restarted it. Retried install - no
error.
