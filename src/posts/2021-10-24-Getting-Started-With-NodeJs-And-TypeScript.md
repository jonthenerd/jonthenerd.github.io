---
title: "Getting Started With Node.js and TypeScript"
date: 2021-10-24T12:48:55-05:00
categories: [Programming]
draft: false
---

Interested in getting started with Node.js and TypeScript? Let's jump right in.

<!--more-->

## Node.js

[Node.js](https://nodejs.org/) is "a JavaScript runtime built on Chrome's V8 JavaScript engine." Effectively, some clever developers have separated the part of Google Chrome that runs JavaScript and made it available for people to use outside of the web browser. Node.js is open-source, cross-platform, and used by many small and large groups. Beyond just web applications, it may be used to write console-style applications, services, simple utility scripts, and much more.

### Node.js Installation

If you're in a corporate environment, you may have Node.js packaged for easier distribution - so look into that first. If you're free to install it on your own though, start by downloading either the latest long term service (LTS) or current release [at the Node.js website](https://nodejs.org/en/download/) if you're on Windows or MacOS. If you're on Linux, check your distribution's prefered method for Node.js installation. For this post, I'll be using the latest LTS release (currently v14.18.1).

Once you've run the download and install, fire up a terminal (or Windows PowerShell) and check which version of Node.js you have installed:

```sh
node --version
```

It should match what you elected to download. If it doesn't and you're on Windows, check your `PATH` environment variable to ensure the `node` executable path is in it (the MSI installer of Node.js installs to `C:\Program Files\nodejs\`, which needs to be either in your system or user `PATH` environment variable).

### Hello World!

With the runtime installed, you're ready to write your first program using it.

{% aside "tip" %}
You're going to need a text editor of some kind to write code. While `Notepad.exe` in Windows will work, I'd recommend using [Visual Studio Code](https://code.visualstudio.com/). It's free and has some nice features for JavaScript development.
{% endaside %}
