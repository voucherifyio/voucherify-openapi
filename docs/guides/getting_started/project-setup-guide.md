---
title: Getting Started
excerpt: Set up your Voucherify project 
categorySlug: getting-started
slug: getting-started
type: basic
hidden: false
order: 3
---

## Creating an Account

Create an [account](http://app.voucherify.io/#/signup).

Provide all the necessary details and select your preferred region. The selected region affects where your data is stored. To decrease the latency time, setting the region in your operating region is advised.

> 📘 Europe region
>
> Remember that if your organization sells products or services to customers based in the EU, you must adhere to the General Data Protection Regulation (GDPR).
>
> Learn more in the [security and data protection article](https://support.voucherify.io/article/125-security-data-protection "Voucherify, GDPR and CCPA compliance").

Once you click sign up, you should receive a verification email. If you do not receive the email or if you have lost it, [contact our support](https://support.voucherify.io/article/125-security-data-protection "Voucherify support").

## Managing Roles and Inviting Users

Manage your team roles and invite your team members:
1. Click your name in the upper tab.
2. Go to **Team Settings**.
3. Go to **Roles** to manage the roles.
4. Go to **Team** to invite members and assign roles to them. <!-- I'm leaving this as simple as that because a new V% user won't have many projects -->

## Get Your API Keys

To access Voucherify API, the client application needs to pass `Application ID` and `Application Secret Key`. To find your keys, head to the Project Settings and in the General tab, scroll down to the Application Keys section. Below that section, you can generate your integration keys and see the client-side keys.

By default, there are two pairs of authentication keys. The first, Application Keys, are meant to authorize your requests to Voucherify API. You can create more Application Keys for each user. The second, Client-Side Keys, are meant for publicly available client applications (mobile apps and web applications).

A generated pair of Application ID and Application Secret Key must be attached to every HTTP request as custom headers: `X-App-Id`, `X-App-Token`.

> 🚧 API Key Visibility
>
> The primary secret key is visible for 14 days only when it is generated for the first time and for 15 minutes when the token is regenerated. Secondary secret keys are visible for 15 minutes when they are generated for the first time or regenerated.
>
> Write your secret keys down and keep them in a safe place.
>
> **Please note that the API keys in the Sandbox Project are never hidden.**

## Testing Your First Campaign

Take a look at the [Sandbox project and the Demo Shop](https://support.voucherify.io/article/538-sandbox) to test your first campaigns. Use the already created test campaigns with pre-defined validation rules to learn Voucherify possibilities or create your campaigns and experiment with the platform.

<!-- Add links in this section -->

## Postman Collection

Take a look at the Voucherify [Postman collection](https://www.postman.com/voucherify/workspace/voucherify-s-public-workspace/collection/31663208-927de30f-b9ba-4723-a7ad-9984d835d939), where you can test examples of the basic processes required to integrate Voucherify with your system, advanced interactions, and industry-specific cases.

## Enabling Distributions

If you want to test the distribution of vouchers, your account must be verified as part of our [anti-spam policy](https://www.voucherify.io/legal/anti-spam-policy-v1-1 "Voucherify anti-spam policy"). You can send 10 messages per day, per month, and no emails from an unverified account.

To unlock the limits for trial accounts, [set up brand details](#setting-up-brand-details) and [contact our support](https://support.voucherify.io/article/125-security-data-protection "Voucherify support").

### Setting up Brand Details

To set up your brand details:
1. Click your name in the upper tab.
2. Go to **Team Settings**.
3. Go to **Brand details**.
4. Provide the necessary details. You can also provide your logo, a link to your privacy policy or your website.

### Distribution Limits

The limits for verified trial accounts are 10 messages per day and 100 messages per month. Note that these limits do not apply to third-party email distribution services.

Learn more about distribution limits in our [fair use policy](https://www.voucherify.io/legal/fair-use-policy-v2-1).