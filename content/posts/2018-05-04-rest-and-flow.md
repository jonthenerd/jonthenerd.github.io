---
title: "Microsoft Flow: Using the SharePoint REST API"
date: "2018-05-04"
author: Jon Badgett
categories:
    - Programming
tags:
    - SharePoint
draft: false
slug: rest-and-flow
---

This post will contain whatever handy information I come across for utilizing
the SharePoint REST APIs with Microsoft Flow.

<!--more-->

Why would you want to do this? Because there aren't enough actions to accomplish
all the things you'd want to do with SharePoint via Flow.

The first section of this guide comes from combining a few different blog posts,
but I found
[Calling the SharePoint Online API from within Microsoft Flow by ROBRECHT-VAN-CAENEGEM](https://blogs.u2u.be/u2u/post/calling-the-sharepoint-online-api-from-within-microsoft-flow)
to be the most useful. It's got pictures!

# How does this work?

-   Microsoft Flow can send generic HTTP requests, with custom headers, body, etc.
-   For Flow to authenticate to SharePoint during the REST calls, we'll make use
    of the access tokens typically used for SharePoint Addins/Apps

# Intial Setup

We're going to need four pieces of data:

-   **CLIENTID**: Unique id assigned to your add-in registration
-   **CLIENTSECRET**: Secret value used by your add-in registration
-   **REALM**: This is the unique id assigned to your SharePoint Online tenant.
-   **TENANT**: The hostname of your tenant (e.g. example.sharepoint.com)

## Obtain the CLIENTID and CLIENTSECRET values

1.  On the SharePoint site that you need to communicate with, navigate to
    AppRegNew page
    ```
    <your site's URL>/_layouts/15/appregnew.aspx
    ```
2.  Fill in the information.

    -   Client Id: <<Generate It!>>
    -   Client Secret: <<Generate It!>>
    -   Title: <<Project Name Flow>>
    -   App Domain: localhost
    -   Redirect URI: https:/localhost

3.  Store the Client Id and Secret. We're going to need it for the next step.
4.  Click the _Create_ button.
5.  Navigate to the AppInv page `<your site's URL>/_layouts/15/appinv.aspx`
6.  Put the _Client Id_ into the _App Id_ text box and look it up.
7.  Paste the following XML into the _Permission Request XML_ box
    ([modify as needed for what scope and right you need](https://docs.microsoft.com/en-us/sharepoint/dev/sp-add-ins/add-in-permissions-in-sharepoint)):
    ```xml
    <AppPermissionRequests AllowAppOnlyPolicy="true">
        <AppPermissionRequest Scope="http://sharepoint/content/sitecollection" Right="FullControl" />
    </AppPermissionRequests>
    ```
8.  Click the _Create_ button.

## Obtain the REALM value

1.  On the SharePoint site that you just finished app registration on, navigate
    to the AppPrincipals page
    ```
    /_layouts/15/AppPrincipals.aspx
    ```
2.  You should see your recently registered app principle along with an App
    Identifier. The last section of the App Identifier, after the @, is the
    REALM value.

## Setup Authentication in Flow

1.  In your created flow, directly after the trigger, do the following:
2.  Create a new **Parse JSON** action, renamed to _Authentication Values_,
    filling in your own values and using the below schema.
    -   Content:
        ```json
        {
            "realm": "{REALM}",
            "clientId": "{CLIENTID}",
            "clientSecret": "{CLIENTSECRET}",
            "principal": "00000003-0000-0ff1-ce00-000000000000",
            "tenant": "{TENANT}"
        }
        ```
    -   Schema:
        ```json
        {
            "type": "object",
            "properties": {
                "realm": { "type": "string" },
                "clientId": { "type": "string" },
                "clientSecret": { "type": "string" },
                "principal": { "type": "string" },
                "tenant": { "type": "string" }
            }
        }
        ```
3.  Create a new **Initialize variable** action, renamed to Initialize
    AccessTokenBody, with the following values: - Name: `AccessTokenBody` -
    Type: String - Value:
    `concat('grant_type=client_credentials&client_id=', body('Authentication_Values')?['clientId'], '@', body('Authentication_Values')?['realm'], '&client_secret=', body('Authentication_Values')?['clientSecret'], '&resource=', body('Authentication_Values')?['principal'], '/', body('Authentication_Values')?['tenant'], '@', body('Authentication_Values')?['realm']) `
4.  Create a new **HTTP - HTTP** action.
5.  Rename it _Get Access Token_
6.  Fill in the values:

    -   **Method**: POST
    -   **Uri**:
        `https://accounts.accesscontrol.windows.net/@{body('Authentication_Values')?['realm']}/tokens/oauth/2`
    -   **Headers**:
        ```json
        {
            "Content-Type": "application/x-www-form-urlencoded"
        }
        ```
    -   **Body**: the _AccessTokenBody_ variable

7.  Add a new **Parse JSON** action and rename it **Parse Access Token**.
8.  Content should be set to the Body parameter from the previuos step. Schema
    should be set to the following:
    ```json
    {
        "type": "object",
        "properties": {
            "token_type": { "type": "string" },
            "access_token": { "type": "string" }
        }
    }
    ```

With this setup, you should be able to test your FLOW and not have it error. You
can also check and see the token_type and access_token being parsed. Note that
the most tricky part of this is getting the Body variable of step 6 setup
correctly. Note that my value depends upon you having renamed the steps as I
instructed to work.

**You're now ready to start using SharePoint REST APIs in Flow!**

# Helpful Snippets

This section will be a hodge podge of useful snippets I plan to continue adding
to.

## General

### Headers

It's easiest to paste in the headers values of **HTTP - HTTP** actions if it's
in text mode. Here's what's needed (adjust the name of the action where mine
says **Parse Access Token** to match the name of your action that parses the
access tokens)

```json
{
    "Authorization": "@{body('Parse Access Token')?['token_type']} @{body('Parse Access Token')?['access_token']}",
    "Accept": "application/json;odata=verbose",
    "Content-Type": "application/json;odata=verbose"
}
```

## Groups and Permissions

### Set the Owner of a SharePoint Group to another SharePoint Group

So, this apparently has been broken via typical REST API method calls for quite
some time. There is a working alternative though - manually construct the call
that the CSOM library would have made. The best resource I found for this is
[Jason Lee's blog post: Custom Workflow Activity for Setting a SharePoint Group Owner](http://www.jrjlee.com/2014/01/custom-workflow-activity-for-setting.html),
which is specifically talking about doing this within a SharePoint 2013 model
workflow. We'll modify it slightly.

1.  Start with your standard **HTTP - HTTP** action.
2.  Method = POST
3.  Uri (adjust values for your environment) =
    `https://{TENANT}/{SPSITE_URL}/_vti_bin/client.svc/ProcessQuery`
4.  Headers are slightly different than the Headers helpful snippet.
    ```json
    {
        "Authorization": "@{body('Parse Access Token')?['token_type']} @{body('Parse Access Token')?['access_token']}",
        "Accept": "application/json;odata=verbose",
        "Content-Type": "text/xml"
    }
    ```
5.  Body gets fun. You've got a few values to substitute.
    ```xml
    <Request AddExpandoFieldTypeSuffix="true" SchemaVersion="15.0.0.0" LibraryVersion="15.0.0.0" ApplicationName="{YOUR_APP}" xmlns="http://schemas.microsoft.com/sharepoint/clientquery/2009">
        <Actions>
            <SetProperty Id="1" ObjectPathId="2" Name="Owner">
                <Parameter ObjectPathId="3" />
            </SetProperty>
            <Method Name="Update" Id="4" ObjectPathId="2" />
        </Actions>
        <ObjectPaths>
            <Identity Id="2" Name="740c6a0b-85e2-48a0-a494-e0f1759d4aa7:site:{SPSITE_ID}:g:{TARGET_GROUP_ID}" />
            <Identity Id="3" Name="740c6a0b-85e2-48a0-a494-e0f1759d4aa7:site:{SPSITE_ID}:g:{NEW_OWNER_GROUP_ID}" />
        </ObjectPaths>
    </Request>
    ```
    -   YOUR_APP = Identity your app. This isn't really that important.
    -   SPSITE_ID = this is the GUID of the site collection you're working with.
        Don't include the curly braces.
    -   TARGET_GROUP_ID = this is the integer of the group that needs an ownership
        change
    -   NEW_OWNER_GROUP_ID = this is the integer of the group that will be the
        owner

## Schemas

These are some helpful schemas to paste in to get values back from REST calls.

### Get Role Definition or Group Id

-   Example URLs:
    ```
    https://{TENANT}/{SPSITE_URL}/_api/web/roledefinitions/getbyname('Contribute')/id
    https://{TENANT}/{SPSITE_URL}/_api/web/sitegroups/getbyname('Some%20Group')/id
    ```
-   Schema:
    ```json
    {
        "type": "object",
        "properties": {
            "d": {
                "type": "object",
                "properties": {
                    "Id": { "type": "number" }
                }
            }
        }
    }
    ```

### Get List or Library Id

-   Schema:
    ```json
    {
        "type": "object",
        "properties": {
            "d": {
                "type": "object",
                "properties": {
                    "Id": { "type": "string" }
                }
            }
        }
    }
    ```
