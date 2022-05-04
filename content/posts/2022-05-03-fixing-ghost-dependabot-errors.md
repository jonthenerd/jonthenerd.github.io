---
title: "Fixing Ghost Dependabot Errors"
date: 2022-05-03
categories: [blogging]
draft: false
---

In a previous post, I wrote about how I moved this blog to Hugo. Since then, I've been receiving notifications from GitHub's Dependabot about dependencies needing to be addressed... in the `Gemfile` and `Gemfile.lock`. These are two files that don't exist in the repo or any branches.

I got tired of the emails and large yellow banner at the top of the repo. Time to hunt for a fix.

<!--more-->

Some brief Googling later, I found that others have reported something similar to the Dependabot maintainers (see [#2041, Dependabot reporting on deleted files](https://github.com/dependabot/dependabot-core/issues/2041)). User wigsofoz [posted a workaround](https://github.com/dependabot/dependabot-core/issues/2041#issuecomment-747799414), which worked for me overall. Here's my modified steps:

1. On the repo in question, navigate to the dependency graph (tack `/network/dependencies` onto the end of the repo URL).
2. Note the dependencies GitHub thinks you have from the non-existent dependency files.
3. Create files in your repo matching those that need to be deleted. For me, this was `Gemfile`, `Gemfile.lock`, and `yarn.lock`
4. Populate each file with some text (I put a line of text in the Gemfile ones, and an empty JSON object in the yarn.lock)
5. Stage, commit, and push your changes.
6. Refresh the dependency graph screen. Note how the Gemfiles now don't have any listed dependencies.
7. Delete all of you created junk files.
8. Stage, commit, and push your changes.
9. Refresh the dependency graph screen. Note that now the ghost dependency files have been removed.
10. Navigate back to your main repo page, observe how the giant Dependabot yellow banner is now gone (or it should be, unless you have legit dependencies that need some work).

This should result in a few less emails and a few less swipes to delete them. Worth it.
