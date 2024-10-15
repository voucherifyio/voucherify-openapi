---
title: How to set up a custom domain for your landing page
excerpt: Learn how to set up a custom domain for yout landing page.
categorySlug: landing-pages
slug: custom-domain-for-landing-pages
type: basic
hidden: true
order: 5
---

> ❗ Deprecated Feature
>
> The Landing Pages feature is deprecated and it will not be supported or developed.

Voucherify allows you to link custom domains to your landing pages.

In order to successfully create a new custom domain, you will need SSL certificates and a little technological know-how or a friendly developer willing to help you.

Let's take a look at the step-by-step tutorial:

1. Go to Project Settings

Choose Project Settings and go to the Custom Domains tab. Select Add Custom Domain option. Here you will be asked to provide details for your domain such as:

- Domain Name - you can provide any name of your choice (e.g. `subscribe.voucherify.io` or `bestlandingpage.mybrand.com`)

> 🚧 
> Keep in mind that you need to be the owner of the domain if you want to use it.

All of the following details should be provided by your Administrator or IT services provider:
- Private Key
- Certificate
- Certificate Chain 

2. Type in the configuration of SSL certificate

The next step is to type in the details. When ready, hit Add. 

> 🚧 
> Keep in mind that you can provide these details later and only set up the domain name first. But these details are indispensable if you want to launch your landing page on a custom domain.

3. Set up DNS configuration

Now we need to set up a DNS to point to your domain. In order to do so, download the DNS Configuration. Here you can also configure the SSL if you haven't done so in the previous step.

Other options include page configuration and delete. 

The page configuration option allows you to see the domain's name and modify its target resource - i.e. what the domain is pointing to. 

Given that you already typed in your SSL data, download the DNS Configuration. 

Proceed to configure the DNS or ask your IT team to do it for you - you need to add new CNAME to your DNS records.

A correctly configured DNS allows users to find your domain. 

> 🚧 
> Note that after setting up the DNS configuration, you cannot delete the domain from this view if it's connected to a target in Voucherify - first remove the connection by setting the Target resource to "none".

4. Create a landing page and connect it to your domain

Go to the Landing Page Creator and design a page – here you can find more information on the customization possibilities. Choose Release to give an alias to your landing page. Then Save & Exit.

Go to the Landing Pages manager, choose the landing page from the list, and go to the Releases tab.

Click the cloud icon to launch your landing page.

Now if you select the Open option (globe icon) or type in the domain's address, you will see your newly created landing page in your own domain.

## Other Guides on Landing Pages

Check out our other guides on landing pages to fully tap into the potential of Voucherify Landing Pages Creator: 

1. [Types of Landing Pages](doc:types-of-landing-pages)
2. [Creating a Landing Page](doc:creating-a-landing-page)
3. [Landing Page Fraud Protection](doc:landing-page-fraud-protection)
4. [Landing Pages Releases and Maintenance](doc:releases-and-maintenance-of-landing-pages)
5. [How can customers upload photos on my landing page](doc:upload-photos-to-a-landing-page)