---
title: "SharePoint Framework: Extensions - Application Customizer"
date: "2018-01-17"
author: Jon Badgett
categories:
    - SharePoint
    - Programming
draft: false
slug: learning-spfx-pt-2
---

Next in this series on the SharePoint Framework are extensions.
[According to docs.microsoft.com, SPFx Extensions allow for the customization of multiple facets of the SharePoint experience](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/extensions/overview-extensions).
I'll focus on differences I made while following the online tutorial and my
observations on capabilities and impacts of SPFx Application Customizer
extensions.

<!--more-->

The best way to get started learning about these types of SharePoint
customization is to read the relevant docs.mocrosoft.com documentation:

-   [Overview of SharePoint Framework Extensions](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/extensions/overview-extensions)
-   [Build your first SharePoint Framework Extension (Hello World part 1)](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/extensions/get-started/build-a-hello-world-extension)

For the most part, the above instructions work just fine. However, there are a
couple modifications that I made:

-   Use [Node Version Manager](https://github.com/creationix/nvm) to ensure that
    you're using the supported version of node and npm that go with the SharePoint
    Framework (node 6.11.5 at the time of this writing).
    [Here's a post I wrote on how to set it up on MacOS](/2018/01/16/configuring-nvm-for-osx).
    This will avoid HTTP2/SSL issues when launching the workbench.

-   Modify the package.json scripts to include the necessary gulp commands such
    that you don't have to have gulp installed globally. Here's what that section
    should look like:

    ```json
    "scripts": {
        "build": "gulp bundle",
        "clean": "gulp clean",
        "test": "gulp test",
        "bundle": "gulp bundle",
        "bundle:ship": "gulp bundle --ship",
        "package": "gulp package-solution",
        "package:ship": "gulp package-solution --ship",
        "trust-dev-cert": "gulp trust-dev-cert",
        "serve:nobrowser": "gulp serve --nobrowser"
    }
    ```

    You'll then run the gulp commands listed in the tutorial using npm run \<scriptname\> :

    ```shell
    npm run trust-dev-cert		# To trust the dev cert
    npm run serve:nobrowser		# To start hosting the extension without launching workbench
    ```

## Observations on Application Customizer Extensions

Working through the online tutorials, I had a number of items I wanted
clarification on that aren't spelled out in the documentation that I've run
across. Here are my notes.

### Which placeholders are available?

At the time of this wring, Top and Bottom.

### How do these different placeholder areas appear and function in desktop web browsers, mobile web browsers, and the SharePoint mobile app?

-   **On a desktop web browser**, these appear directly underneath the app
    launcher (and above the site icon) and attached to the bottom of the browser
    window (the main site area is then placed within a div that has a vertical
    scrollbar).
-   **On a mobile web browser**, placement is the same as the desktop web browser.
    However, the behavior when scrolling is different. When scrolling down the
    page, the top placeholder content as well as the site title/global nav area
    scroll with the page and are removed from view. However, the content of the
    bottom placeholder is _always visible_.
-   **On the SharePoint mobile app (IOS tested, v3.7.0)** The good news? the
    content of the top and bottom placeholder make an appearance. Now here's
    what's not so great:
    -   The placement of the content within the Top placeholder is different. It now
        appears beneath the site title / global navigation area.
    -   The bottom placeholder is not initially visible when loading a site within
        the app. After scrolling down a bit, the content of the bottom placeholder
        appears.
    -   The SharePoint app doesn't load the necessary css to alow the ms- classes to
        work (like ms-bgColor-themeDark ms-fontColor-white used in the HelloWorld
        Demo). This causes the background of the HelloWorld extension to appear
        transparent. I added hard coded background-color and color style values and
        these appeared fine in the application.
    -   At least with the code used from the tutorial, the customizations only
        appeared for me on initial load of the application and site. If I browsed to
        something else and then came back to app, the content of the top and bottom
        placeholders was not present. I'm hopeful that this is just a bug with the
        HelloWorld code.
        [Issue #1069, SPFx Application Customizer, placeholder not re-rendering on page load](https://github.com/SharePoint/sp-dev-docs/issues/1069)
        looks like it could be related, but the advised fix didn't address the issue
        within the app. Either there's something missing that's needed to keep it
        working, or there is a bug with the mobile app.

### How do the above observations affect the buildout of a modern intranet on O365?

#### _On Global Navigation_

There is sample code available for creating an aplication customizer extension
to add a mega menu at the top of pages. The thought being that you could deploy
this customization to all of the sites you wanted to be a part of your intranet
portal and you'd have consistent navigation.

If you're going to be using the SharePoint mobile app, and the above noted
disappearing act has been fixed in either the sample code or the mobile app, the
placement of the top element placeholder is different than that in mobile or
desktop web browsers, which could cause confusion for users. **As such, if usage
of the SharePoint mobile app is desired, think critically about how the
navigation would be displayed to end users in the app / web browsers to ensure
it's not confusing. If you can't do this, avoid putting a menu here.**

What I'd advise doing as an alternative to this involves Hub Sites (which aren't
released yet). They purport to allow for the establishment of consistent global
navigation for all sites joined to the hub. You'd then use the left (current)
navigation for within-site navigation purposes.

#### _On Consistent Footers_

In my mind, the bottom placeholder area has been where I wanted to put
consistent footer information (a company logo, contact information for the
page/site, social media links, etc.). This kind of thing tends to take up a
decent amount of vertical space, which is ok because the user has to scroll to
the bottom to see it anyway. It's not in the way.

With the current implementation though, significant caution is warranted. Would
you want half of the screen real-estate occupied with the same footer
information? No. As a user, I'd find it annoying if anything was attached to the
bottom of my screen blocking valuable reading space, particularly if it appears
page after page, throughout my entire usage of a site/app. **Advice - don't use
the bottom placeholder to load your consistent footer.**

What's the alternative? Think of the places in your Intranet portal that
_really_ need a footer. You've got the main landing page and probably another
handful of pages that see really high traffic. Outside of this, if you have some
logic to display contact info for a given page, you might want that on
additional pages but probably also want the ability for the information not to
be shown if a page author opts out. So - build 1 or 2 SPFx WebParts for footer
usage. One would be your _big footer_ for your main landing page. The second
you'd advise page authors use so they can show page contact information. If they
want the info, they'll add the WebPart. If they want to opt out, they'll omit
it.

#### _What do we use these Placeholders for anyway?!_

I think the big usage of the placeholders is for context-sensitive
notifications, _not branding_.

Let's take our page footer example above. You could present a notification to a
page author (while they're authoring) advising them to add the footer WebPart
(and allow them to dismiss the notification until their next browser session or
something).

Obviously, there are plenty of usages for notifications...

In order to leverage O365 and avoid over-customization that causes upgrade _fun_
down the road, it requires stepping back from our typical approaches (like
adding mega menus and footers) and thinking about (1) what are we trying to have
the user see or do, (2) when this is really necessary and when it's not, and (3)
how do we guide them to see the items or take the actions we want in the most
supported fashion. In this way we'll minimize our development costs, maximize
our investment in the O365/SharePoint platform, and focus more on extracting
business value than simply re-implementing the same old thing atop the latest
SharePoint release.
