---
title: "Semantic URLs"
date: 2022-12-15
categories: [programming]
draft: false
---

# Introduction to URLs

A Uniform Resource Locator, or URL, is a unique location given to each resource on the web. In the web browser, this URL can be found in the address bar at the top of the screen.

## URL Structure
A URL has multiple parts. Let's disect the following URL:

```
https://www.example.com/america/recipes?containing=apple&gluten=false#ingredients
```

 - `https` - this is the **scheme** or network protocol. It tells the web browser how to connect to the location
 - `www.example.com` - this is the **host**, often referred to as the domain name. It is always preceded by `//`. It maps to an IP address, which is effectively the address on the network that your web browser needs to make contact with to retreive the web page. The hostname is translated into an IP address using what's called DNS resolution.
 - `/america/recipes` - this is the **path**. It's everything *before* a `?` or `#` character (if they are present in the URL at all). It may contain multiple **segments**, each separated by the `/` character.
 - `?containing=apply&gluten=false` - this is the **query** and is optional in a URL. It is made up of several parts itself:
    - `?` - the question mark starts the query
    - `containing` - this is the name of the first **parameter**
    - `=` - the equal sign separates the name of the parameter from its value
    - `apple` - the value of the *containing* parameter
    - `&` - the ampersand separates parameter/value pairs.
    - `gluten=false` - another parameter/value pair, just like the containing=apple before
 - `#ingredients` - this is a **fragment** and is optional. It is always preceded by the `#` character and directs the web browser to scroll the page to a specific location in the page. The characters after the `#` correspond to the id of an anchor tag on the page.

# The Bare Minimum

It takes very little effort to come up with a unique location to guide web browsers to your web page. Using the path portion, here are some examples:

 - `/1` - every page gets a new number. Add a page? Go up one number.
 - `/76831245-79a9-4abc-ba2d-063edd6b031c` - every page gets a unique guid.
 - ... if you're writing a web application maybe you can just expect everyone to navigate from the home page of your app to everywhere else? Technically there are ways to _never have more than your host_ in the URL.

Seems simple enough. Now the web browser can get to the page. What more should we care about? Maybe we should ask Santa Claus?

{{< tweet user="jcolman" id="673243648255852544" >}}

It turns out that the URL _can be_ more than just the location your web browser uses to load a web page. The URL itself can have immense value. How so?

 - **SEO** - Search Engines prioritize pages that avoid the `query` portion to ensure uniqueness. Wikipedia defines this as a [Clean URL](https://en.wikipedia.org/wiki/Clean_URL).
 - **Ease of Use** - A url which can be _read_ can be easily remembered, written, read, and reused.
 - **Discoverability** - If done well, the URL can be used as a map by people to explore the content of the full site or application. Segments and paramaters become collections, identifiers, and filter capabilities.
 - **Stickiness** - When people can read a URL and use it as a map to your site, and your site provides structured data that relates to other bodies of structured data, then people will naturally build links between sites/applications for ease of navigation. This in turn increases the usage of your site/app and its usefulness.

# Semantic URLs
UX/UI Designers, Product Owners, and Web Developers all have a vested interest in their site or app having a great user experience, providing value to those who use it, and having those users desire to continue using the app. One powerful, yet often overlooked, way of moving the needle in this direction is by ensuruing your URLs are _semantic_. These URLs are _human readable_ and _easy to understand_. They lay out a map for your users to not only follow, but depend upon as they build their own systems which depend on yours.

## The parts of a Semantic URL
Semantic URLs pay close attention to how their `path` and `query` portions are used and when possible, make use of the `fragment` as well. This is all geared toward giving the user a mental map of the domain model being presented through the site. This is not the same as the underlying database model, which may be a good bit more complicated.

### Path Usage
Here are some rules for what goes into the `path` portion:
 - **All path segments should be navigable**. If the user is on the page with path `/america/recipes`, they should be able to change the URL directly in their browser and land on an actual `/america` page.
 - **Plurality matters**. Path segments should use `singular` nouns for when the page is about `1 thing` and `plural nouns` when the page is a `collection of things`.
    - `/america` should just be about one country.
    - `/recipes` (if by itself) should be `all the recipes on the site`.
    - `/america/recipes` should be `all the recipes from america`.
 - **Path segments may be identifiers**. If a path segment acts as an identifier, use either human-readable or well-known values. Here are two examples:
    - `/america/recipes/apple-pie` - in this case we would expect that `apple-pie` is an identifier that happens to be _human-readable_. In a backend database, this may may to a row with id 1845, but since such an id is not _well known_ then a lookup-id or `stub` will be used to make the URL more human readable.
    - `/invoices/123456` - in this case, `123456` is an identifer that is _well-known_. Both the business and the customer both expect to lookup invoices by a provided invoice number. Whether this is an actual database ID or not depends upon whether you've prioritized [obfuscating your internal IDs](https://dev.to/anwar_nairi/do-not-expose-database-ids-in-your-urls-567), which provides some (small) obfuscation in the event your authorization logic is faulty.

### Query Usage
 - **Preventing unnavigable path segments** -  Regarding navigable paths, this does get more difficult to achieve when 1 page actually contains a listing of related children (e.g. an order which lists all products purchased on the page), yet wants to have a sub-page which provides details unique to that parent/child combination (e.g. the shipping status of only one of the product purchased). Such a path structure ends up looking like `/orders/12345/items/5`, but creating a page at `/orders/12345/items` just ends up recreating a portion of the parent page's content. In such a case, the related child identifier should use a `query paremeter` instead, yielding the url `/orders/12345?item=5`. In this way, all parts of the path are navigable and the path + query is human readable.
  - **Filtering** - On a collection path segment (e.g. `/america/recipes`), query parameters are the appropriate way to filter what is displayed (e.g. `/america/recipes?contains=apple`).
  - **Customize Page State** - On a single valued path segment, query parameters should be used to customize the appearance of the page (e.g. show a particular tab as selected and display it's tabpanel - `/america/recipes/apple-pie?cooking-methods=oven`). Doing so allows users to share _their exact view_ of a page with others, which is particularly important in information-dense business web applications.
  - **Searching** - Search result pages come in 2 forms - an empty page with a search box, and a page of results with the search box populated with the search query. It is customary to use the `q` search parameter as shorthand for query (e.g. `/search?q=apple`)
