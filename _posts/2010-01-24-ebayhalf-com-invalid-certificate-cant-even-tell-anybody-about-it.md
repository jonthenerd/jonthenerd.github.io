---
layout: post
title: Ebay/Half.com invalid certificate - can't even tell anybody about it.
date: 2010-01-24 17:12
author: Jon Badgett

categories: [General IT]
---
I'm writing this out of pure frustration. I went to login to half.com (great for selling textbooks btw) and found that the login page was giving off a bad certificate belonging to another domain (opendns). This could be a major security problem not just for ebay, but for anybody logging in.<br /><br />Being the nice guy I am, I looked around the site for a way to contact their support team and alert them to the issue. I dug for 15 minutes through their convoluted help-desk system just to find <a href="http://pages.half.ebay.com/help/wizard/result_6_1_3.html?tier0=Technical+Issues&amp;tier1=[object+Object]&amp;tier2=result_6_1_3&amp;item=&amp;dsturl=http%3A%2F%2Fpages.half.ebay.com%2Fhelp%2Fhandbook%2Fbestways.html&amp;ContinueBtn=Continue#">this page</a> mentioned to contact customer service. I thought I found a winner here...even though it was by clicking through several different more appropriate pages to place this information that I found the link. Clicking on the link takes you to a login page..... [cough] [cough].<br /><br /><span style="color: rgb(153, 0, 0);"><span style="font-weight: bold;">Hey EBAY! Your login page is returning an invalid certificate!</span></span><br /><br />This is the best I can do apparently. Maybe Google-hunting for problems with their website is how they discover they need to add things to their not-quite-complete help desk system.<br /><br /><span style="font-weight: bold;">Update:</span><br />My dns provider (OpenDNS) was sending the bad cert. The real problem is that account.ebay.com can't be found. OpenDNS is no longer my DNS provider.
