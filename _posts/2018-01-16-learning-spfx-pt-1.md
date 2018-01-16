---
title: "SharePoint Framework: Getting Started"
date: 2018-01-16
author: Jon Badgett
categories: [SharePoint]
---

Today I decided that it was time I learned how to build [SharePoint Framework (SPFx)](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/sharepoint-framework-overview) webparts. Easy enough right? Find the right tutorial online, follow instrucitons, hello world! Let's get started.
<!--more-->

First, you'll need to [set up your SharePoint Framework development environment](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-development-environment). Then you'll want to follow the tutorial to [build your first web part](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/build-a-hello-world-web-part).

Of course, this all depends upon you having [node js w/npm](https://nodejs.org/en/) installed and your code editor of choice ready to go.

Seeing as I had the latest version of node and a code editor ready, I just started at the tutorials. Quickly ran into an issue though, where neither Safari or Chrome were able to connect to the workbench site running on localhost. Here's the exact error from Safari:

> Safari can't open the page "https://localhost:4321/temp/workbench.html" because Safari can't establish a secure connection to the server "localhost".

[Issue #1002 on the sp-dev-docs repo](https://github.com/SharePoint/sp-dev-docs/issues/1002) seems to describe what's occurring here but no amount of setting the environment variable NODE_NO_HTTP2=1 would help me get past the error message.

Reading back through [how to setup your SharePoint Framework development environment](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-development-environment), there is a note that says:

> The SharePoint Framework build pipeline doesn't currently support the LTS version of Node.js. Instead, download Node.js version 6.11.5. This installs npm 3.10.10. Note that if you have a v5.x version of npm, you need to downgrade to an older npm version by using the following command: npm install -g npm@3.

A couple observations on this, as I'm writing this blog post as I try to get this all working:
 * Embracing the open source ecosystem and modern development tooling is great. Requiring that in order to use your framework you must be running a version of node.js that is 3 major versions behind current (9.4.0) and 2 major versions behind LTS (8.9.4) is **lame**. It means that most guides out there for how to quickly get started will only work if you're just stepping into modern web dev *for the first time*... If you've been using node and NPM, etc. for a while you're likely running much newer versions of these tools and they're likely installed globally. It also makes it appear there is a lack of commitment to bringing development practices and patterns for SharePoint up to date and keeping it there.
 * Let's hope that if we follow the instructions exactly things actually work. As it's going to mean making some serious changes to the configuration of my dev box and going outside the 1, 2, 3 hello world box.
 * Maybe there's some way to manage multiple versions of Node.js without struggling...

At this point, I've got projects that use much later node and NPM versions. I can't justify unintalling them just to have to do the same dance at a later point to get them reinstalled. What to do? Let's look into [Node Version Manager (NVM), which allows you to manage and switch between different Node versions "with ease"](https://github.com/creationix/nvm). There's also [nvm-windows for Windows users](https://github.com/coreybutler/nvm-windows). Interested in how to get this setup? Read my post on [configuring NVM for Mac OS X](/2018/01/16/configuring-nvm-for-osx/). 

Now that I've got NVM working and this project directory is using 6.11.5 ... let's continue on with the hello worlding.

1. Browse to the directory for the project in terminal.
2. Initialize the project with NPM (to get our package.json)
```shell
npm init
```

3. Intall the npm package for the Yeoman SharePoint generator (locally).
```shell
npm install @microsoft/generator-sharepoint --save-dev
```

4. Open our project using our code editor of choice (have you tried Visual Studio Code yet?)
```shell
code .
```

5. Notice that we've got our .nvmrc file, our package.json file, and a directory for node_modules. Things are looking good so far.

6. Let's run the Yeoman generator now.
```shell
yo @microsoft/sharepoint
```

7. We can't follow the next instruction to just run gulp serve, as gulp isn't installed globally (I'm not a fan of installing things globally as it makes projects harder to get going on new workstations or by new developers). As such, we need to change our package.json to handle running gulp for us. 

    We're going to add a script to trust the dev cert and another to serve.
    
    1. Open your package.json
    2. Change the scripts section to be the following:
    ```json
    "scripts": {
        "build": "gulp bundle",
        "clean": "gulp clean",
        "test": "gulp test",
        "trust-dev-cert": "gulp trust-dev-cert",
        "serve": "gulp serve"
    },
    ```

8. Trust the Dev Cert used by workbench
```shell
npm run trust-dev-cert
```

9. Fire up the workbench
```shell
npm run serve
```

10. Marvel at it working and don't think about future version dependency conflicts :)