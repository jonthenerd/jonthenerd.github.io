---
title: >-
    Activation could not be completed because the InfoPath Forms Services support
    feature is not present.
date: "2011-02-28"
author: Jon Badgett
categories:
    - Programming
    - Programming
    - SharePoint
draft: false
slug: >-
    activation-could-not-be-completed-because-the-infopath-forms-services-support-feature-is-not-present
---

Got this error after migrating a SP2007 application to SP2010.

<!--more-->

> Activation could not be completed because the InfoPath Forms Services support
> feature is not present.

The feature it is complaining about is a hidden feature with displayname
"IPFSSiteFeatures". This feature was already enabled on the migrated
application...but resolving the error was as simple as disabling and then
re-enabling the feature. Here's the PowerShell to do that:

```powershell
Disable-SPFeature "IPFSSiteFeatures" -url "http://yourwebapp";
Enable-SPFeature "IPFSSiteFeatures" -url "http://yourwebapp";
```
