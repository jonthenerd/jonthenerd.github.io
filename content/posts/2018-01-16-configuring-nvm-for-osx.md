---
title: Configuring Node Version Manager (NVM) for OS X
date: "2018-01-15"
author: Jon Badgett
categories:
  - Programming
draft: false
slug: configuring-nvm-for-osx
---

So, you have multiple projects and one or more of them have dependencies (or
just plain don't work) on certain versions of node? What to do?
[Node Version Manager (NVM) allows you to install and switch between them "with ease"](https://github.com/creationix/nvm)
(quotes added as I'm writing this blog post as I get it installed for the first
time myself... lets see just how easy it is!).

<!--more-->

## Before You Install - Uninstall Node!

Although it's optional to remove previous node installations, it's recommended.
There's a
[great post on Stack Overflow that describes how to remove nodejs manually and for this that used brew to originally install node](https://stackoverflow.com/questions/11177954/how-do-i-completely-uninstall-node-js-and-reinstall-from-beginning-mac-os-x).

## Ensure you have the Xcode command line tools.

The Xcode command line tools (which you may already have for other reasons) are
required. The easiest way to install them is to run the following in the
terminal:

```shell
xcode-select --install
```

## Run the NVM Install Script

You can either use cURL or Wget to install NVM. To test if you have either, just
type curl or wget into a terminal window and hit return. If you get some kind of
response that isn't an error, you know which to use. Otherwise, you can install
wget via brew:

```shell
brew install wget
```

Then you'll want to run the latest install script mentioned on the
[NVM repo](https://github.com/creationix/nvm). **Go there and copy+paste into
your terminal window**.

After it installs, you ought to be able to open a fresh terminal window and type
in **nvm** and see some kind of output, but not this:

```shell
$ nvm
-bash: nvm: command not found
```

If you got that, it means that your shell isn't configured to use nvm. What I
found after investigating is that NVM had added references to itself to the
.bashrc file directly in my home directory. You can see this by typing the
following in a terminal:

```shell
open $HOME/.bashrc
```

However, it hadn't added itself to the .bash_profile file.

```shell
open $HOME/.bash_profile
```

A kind user on Stack Exchange explains that
[on OS X, every time terminal is run it considers it a _login terminal_ which uses the .bash_profile file and not the .bashrc file](https://apple.stackexchange.com/questions/51036/what-is-the-difference-between-bash-profile-and-bashrc).
An easy fix for this though is to just consolidate all of the customizations to
the terminal load process into the .bashrc file.

Add the following to your .bash_profile and move its contents into .bashrc.

```shell
if [ -f $HOME/.bashrc ]; then
        source $HOME/.bashrc
fi
```

Fire up a fresh terminal and run the following, which should output **nvm** if
the install was successful.

```shell
command -v nvm
```

## Install Node Versions

We've got NVM, now let's install the versions of node we want to use across
ourprojects.

#### Latest node

```shell
nvm install node
```

#### Specific version of Node

[Version 6.11.5 of node.js is required for SharePoint Framework development](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-development-environment)
as of this writing.

```shell
nvm install 6.11.5
```

Note that you can list all available installed node versions using the following
commandline:

```shell
nvm ls
```

## Configure your project to use a specific version

For this, we're going to place a .nvmrc into the root of each project that
utilizes node which indicates which version to use.

1. Get to the target directory
2. Run one of the following:

   ```shell
   echo "5.9" > .nvmrc

   echo "lts/*" > .nvmrc # to default to the latest LTS version

   echo "node" > .nvmrc # to default to the latest version
   ```

3. Start using that node version using the following command:

   ```shell
   nvm use
   ```

4. (optional) You can configure auto-switching to the desired node version
   instead of having to type nvm use. This requires using
   [AVN (Automatic Version Switching for Node)](https://github.com/wbyoung/avn)
   which works in conjunction with the .nvmrc file.
