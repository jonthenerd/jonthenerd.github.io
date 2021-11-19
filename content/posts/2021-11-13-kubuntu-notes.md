---
title: "Kubuntu Notes"
date: 2021-11-13
draft: false
---

These are my notes while configuring Kubuntu 21.10 to my liking after first install. Mainly for my own future reference on other distribution installs.

<!--more-->

# Install
While installing Kubuntu, I clicked the checkbox to have it install proprietary drivers and codecs, assuming this would be best for my nVidia GPU. However, upon reboot after install all I got was a black screen after GRUB.

I repeated the installation, this time leaving the box unchecked and made it all the way to the KDE desktop, where I could perform updates and install the proprietary nVidia driver.


# Gaming
## Steam
After Steam is installed, it will not automatically start making use of Proton to play Windows-only games. To enable it:

1. Open `Settings`
2. Navigate to `Steam Play`
3. Under `Advanced`, enable `Steam Play for all other titles`
4. Click `OK`

## Skyrim (Special Edition)
My installation started Skyrim okay, but I was unable to hear sound effects, music, or NPC voices during gameplay. The simple fix that I found [on the Steam Forums](https://steamcommunity.com/app/489830/discussions/0/3441214221459912300/?ctp=2#c3038229380336710200) is the following:

1. Open `Steam`
2. Navigate to the `Skyrim (Special Edition)` game.
3. Click the gear icon on the right and select `Properties`
4. Under the main `General` tab, under `Launch Options`, place  the following:

```sh
WINEDLLOVERRIDES="xaudio2_7=n,b" %command%
```
