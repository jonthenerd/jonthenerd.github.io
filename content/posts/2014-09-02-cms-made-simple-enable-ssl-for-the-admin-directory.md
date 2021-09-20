---
title: CMS Made Simple - Enable SSL for the Admin Directory
date: "2014-09-02"
author: Jon Badgett
categories:
    - SysAdmin
tags:
    - CMS Made Simple
draft: false
slug: cms-made-simple-enable-ssl-for-the-admin-directory
---

Recently updated a site I maintain that uses the great
<a href="http://www.cmsmadesimple.org/">CMS Made Simple</a> and had to
reconfigure SSL (https) for the administrative areas of the site. I've done this
previously, but had forgotten exactly what I did.

<!--more-->

Here's all it takes:

1.  Get an SSL certificate configured on your domain. You can find instructions for that somewhere else.
2.  Modify the config.php file in the base directory. Find the line that's setting up the "root_url" variable. Replace it with the following, replacing <hostname> with your site's host name:

    ```php
    $config['root_url'] = 'http://<hostname>';
    if(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS']=='on') {
        $config['root_url'] = 'https://<hostname>';
    }
    ```

3.  Create an .htaccess file and place it in the admin directory (or whatever you've renamed it to). This file should contain the following:

    ```
    # force all access to /admin to SSL protected page
    RewriteEngine On
    RewriteCond %{HTTPS} off
    RewriteRule (.*) https://%{HTTP_HOST}%{REQUEST_URI}
    ```

Done! Your admin directory should now require HTTPS. This works as of CMS Made
Simple version 1.11.11.
