---
title: Jon's General SharePoint 2010 Development Tips
date: 2011-10-18 09:11
author: Jon Badgett
categories: [Programming, Programming, SharePoint]
draft: false
---
In the time I've been doing SharePoint development, and SharePoint 2010 development in particular, I've tried to blog about the snags or neat stuff I've come across. This post is for all those little pieces of knowledge that come from working with the platform that don't seem large enough for their own post. If you find it useful, let me know in the comments.
<h2>The Very Basics</h2>
The better understanding of the following resources you have as a SharePoint developer, the better. These are considered absolute must-knows.
<ul>
	<li><a href="http://blogs.msdn.com/b/rogerla/archive/2008/02/12/sharepoint-2007-and-wss-3-0-dispose-patterns-by-example.aspx">Roger Lamb's "Dispose Patterns by Example"</a> - The SharePoint object model has many objects that must be disposed of, or else you'll end up with slow, unresponse, crashing web applications. Follow the examples and be mindful of the resource usage of your code.</li>
	<li><a href="http://blogs.msdn.com/b/rogerla/archive/2009/11/30/sharepoint-2007-2010-do-not-dispose-guidance-spdisposecheck.aspx">Roger Lamb's "Do Not Dispose Guidance"</a> - Sometimes you <em>don't</em> want to dispose of the SharePoint object.</li>
</ul>
<h2>Deploying .WSP solution packages</h2>
<strong><em>Don't use Visual Studio 2010 to do this</em></strong>. "But Jon! They built it to do that! Why shouldn't I use it?" There are a few reasons why you shouldn't use VS to do your deployment. Here are a few I've learned:
<ul>
	<li><strong>You as a SharePoint developer need to be 100% comfortable with using PowerShell to do your deployments</strong>. You shouldn't be using stsadm anymore, and neither should your administrator(s). Learn the commandlets for every part of deployment through using them in your own development environment.</li>
	<li><strong>Visual Studio 2010 out of the box wants to activate all of your features on every web application in the farm</strong>. This isn't how you'll treat your production environment, so don't do it in your dev environment. You can disable this behavior, but then using VS for your deployment doesn't net you much time savings.</li>
	<li><strong>Bad things happen when developing content types and site columns</strong>. From my experience, Visual Studio keeps a connection to your application open to help you with developing content types and site columns - that's cool, but not always the best thing. Whenever you retract your solution, make some changes to content types or site columns and redeploy - you're very likely to end up with Visual Studio telling you that some of those content types and site columns already exist. You can either sort through getting rid of these through powershell/the UI and then continuing to use Visual Studio while trying to make it not have this behavior - or just use PowerShell for your solution/feature deployment and enablement. I chose PowerShell after 2 long days of fighting Visual Studio and haven't looked back (and haven't had the issue either!)</li>
</ul>
<h2>Debugging your deployed code</h2>
Deploying with PowerShell now? Good. You still need to debug your code. Here are some gotchas.
<ul>
	<li><strong>How to attach the Visual Studio debugger manually:</strong> If you're new to SharePoint 2010 and don't know how to debug without letting Visual Studio 2010 manager your deployment - here are the steps to attach the debugger manually:</li>
<ul>
	<li>Build and Package your latest solution package using Visual Studio (I use Ctrl + Shit + B to build, and then click Package in the Build menu).</li>
	<li>Deploy the solution package using PowerShell.</li>
	<li>Attach the debugger by clicking the "Debug" menu and "Attach to Process". Next make sure the "Show processes from all users" and "Show processes in all sessions" are selected. If you're debugging something running in a web application, select all w3wp processes. If you're debugging feature activation, attach to your powershell process. If you are debugging a timer job, attach to the owstimer.exe process.</li>
	<li>Set a breakpoint and debug as normal.</li>
</ul>
	<li><strong>Debugging Feature Receivers using PowerShell:</strong> PowerShell is really slick. It's not your normal commandline though. It acts like a .NET application. That means that the first time it loads a dll to run some code, it keeps it handy in memory and doesn't go and load that dll again. So - if you are testing a feature, checking your results, redeploying your code, and retesting...you're not going to get the results you want. Why? Because the first time you activated your feature and tested, PowerShell cached your code. It didn't reload it for your second test run. The solution? Close the PowerShell window and re-open. Repeat as necessary.</li>
	<li><strong>Debugging Timer Jobs: </strong>This has the same caveat as debugging a feature receiver. OWSTimer will cache your dll the first time it runs any code from it. Need to change something in a timer job and retest? Deploy your solution and then restart the "SharePoint 2010 Timer" service in Server Manager. Reattach your debugger if necessary. Retest.</li>
</ul>
<h2>Writing Console Applications against the SharePoint Object Model</h2>
This is a really handy way of proving out some application logic, or when you need to provide a utility to your administrator(s) that would just be too complex and hairy to write using PowerShell.
<ul>
	<li><strong>To use the SharePoint Object Model, your Console Application needs to be compiled for x64 processors</strong>. Go to your Project Properties, and under the Build tab change the "Platform Target" to x64. This setting is specific to the chosen build configuration (most likely "Debug" for your current app). So - if you change your build configuration to Release, you'll need to set the Platform Target to x64 again.</li>
	<li><strong>Certain actions in the Object Model require that you have an HttpContext</strong> open to the web you're working with. I ran into this when working with the webpart manager for a web. Google should be able to help you with establishing an HttpContext from within your console application.</li>
</ul>
<h2>Provisioning the User Profile Service Application</h2>
<ul>
	<li>The instructions on MSDN indicate that the service account running this service app should be a local administrator. In my experience, this means the account must be <em>directly in the Administrators group.</em> It's not enough to have it in a security group that is then nested in the Administrators group. If you do this, it will be stuck on "starting".</li>
</ul>
I'll add to this as I come across little snippets of knowledge. Have a quick tip for SP2010 to share? Let me know.
