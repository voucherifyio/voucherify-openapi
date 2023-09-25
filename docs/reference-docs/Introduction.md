---
title: Introduction
excerpt: What is Voucherify API?
categorySlug: introduction
slug: introduction-1
type: basic
hidden: false
order: 1
---

The Voucherify API is organized around REST.  Our API has predictable, resource-oriented URLs, and uses HTTP response codes to indicate API errors. We use built-in HTTP features, such as HTTP authentication and HTTP verbs, which are understood by off-the-shelf HTTP clients.  

We support cross-origin resource sharing, allowing you to interact securely with our API from a client-side web application (though you should never expose your secret API key in any public website's client-side code).  

JSON is returned by all API responses, including errors, although our API libraries convert responses to appropriate language-specific objects.

To make the API as explorable as possible, this documentation has a test mode. You can test all methods at no cost.

In general the API consists of 2 sets: 

* **application API** - full capability, designed to be accessed from your server application
* **client API** - limited capability, designed to be accessed from your website or mobile application

> 📘 Your API keys
>
> Find out more about how to [authenticate your application](doc:authentication) to access the API. 
