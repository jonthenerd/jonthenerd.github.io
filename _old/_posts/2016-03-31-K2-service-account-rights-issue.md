---
title: "K2 - Service Account Rights Issue"
date: 2016-03-31
author: Jon Badgett

categories: [K2]
---
In two scenarios, errors wer observed when using K2 designer within SharePoint 2013.

Working with K2 support, a resolution was found to this. 

<!--more-->
First, when trying to call a sub-workflow, the following error was observed:

> Unable to retrieve a list of sub-workflows from the server
>
> User K2:[your service account here] has insufficient rights to perform
> action GetProcSets. Minimum of Export rights are required to perform this action.

Second, when attempting to delete a workflow from within the SharePoint-integrated 
designer (after you click "Application" from the ribbon) and you have one or both of 
the checkboxes ticket, the following error appears:

> User K2:[your service account here] does not have Administrator rights.

The issue found was that the service account used to run the application pool for the 
SmartForms designer did not have sufficient rights on the K2 server. This looks to be 
a bug/edge-case with the installer, as it was consistently present in multiple environments installed
in the same fashion.

The easy fix? Go to your K2 Workspace, and open the Server Rights area. Add the service account
with Admin and Export rights. Done.