---
title: Get started
excerpt: Get started with your Voucherify project 
categorySlug: getting-started
slug: getting-started
type: basic
hidden: false
order: 3
---

## Creating an account

Create an [account](http://app.voucherify.io/#/signup).

Provide all the necessary details and select your preferred region. The selected region affects where your data is stored. To decrease the latency time, it's good to set the region in your operating area.

Once you sign up, you'll receive a verification email. If you don't receive the email or if you have lost it, [contact Voucherify support](https://www.voucherify.io/contact-support "Voucherify support").

> 📘 Europe
>
> If your organization sells products or services to customers based in the EU, you must adhere to the General Data Protection Regulation (GDPR).
>
> Learn more in the [security and data protection article](https://support.voucherify.io/article/125-security-data-protection "Voucherify, GDPR and CCPA compliance").


## Get your API keys

To access the Voucherify API, the client application needs to pass Application ID and Application secret key. They must be attached to every HTTP request as custom headers `X-App-Id`, `X-App-Token`, respectively.

To find your keys, go to Project settings and in the General tab, scroll down to the Application keys section.

There are two pairs of authentication keys. The first, Application keys, are meant to authorize your requests to Voucherify API. You can create more Application Keys for each user. The second, Client-side keys, are meant for publicly available client applications, such as mobile apps and web applications.

In Project settings, below Application keys, you can generate your integration keys and see the client-side keys. Integration keys are used to integrate with other platforms.

> 🚧 API key visibility
>
> **The API keys in the Sandbox project are never hidden.**
> 
> In other projects, the primary secret key is visible for 14 days when it is generated for the first time and for 15 minutes when the token is regenerated. Secondary secret keys are visible for 15 minutes when they are generated for the first time or regenerated.
>
> Write your secret keys down and keep them in a safe place.

## Making your first API call

Your Sandbox project comes with several test campaigns and codes.

One of the most frequent API calls is validation, which checks if incentives, such as codes, can be applied by the customer to their order.

Make your first validation call:
1. Log in with your Voucherify account details in the top right corner here in this page. Your Sandbox API keys will be used as credentials in the interactive documentation to make API calls.
2. Go to [Validate stackable discounts](ref:validate-stacked-discounts).
3. In Base URL, select your region depending on the region you've chosen when creating a new account:
   - `api` for Europe
   - `us1.api` for North America
   - `as1.api` for Asia
4. Unroll EXAMPLES and select Sandbox onboarding validation.
5. Click `Try it!` to send the request.

Check the response in the window below the request.

You can use the interactive documentation on the left to add more details to the request.

Alternatively, you can use Voucherify [Postman collection](#postman-collection) to make your first API call.

As the next step, take a look at the [Sandbox project and the Demo shop](#exploring-the-voucherify-api-in-the-sandbox-project) to test your first campaigns. In the Demo shop, use the test campaigns with pre-defined validation rules to learn Voucherify possibilities or create your campaigns and experiment with the platform. You can also check the payloads of the API calls.

## Voucherify API Postman collection

Start exploring the Voucherify API with minimum effort.

You can view all of the Voucherify API endpoints with the public collection available in [Postman](https://www.postman.com/), which is an app you can use to test and work with APIs. Check out the examples of the basic processes required to integrate Voucherify with your system, advanced interactions, and industry-specific cases.

1. Go to [Voucherify Postman collection](https://www.postman.com/voucherify/voucherify-s-public-workspace/overview).
2. Fork the collection to create a copy in your own Postman workspace. For onboarding, fork [Voucherify API – Onboarding](https://www.postman.com/voucherify/voucherify-s-public-workspace/collection/iut4une/voucherify-api-onboarding).
3. Provide the required credentials in the Environments.
4. Make your first [validation request](https://www.postman.com/voucherify/voucherify-s-public-workspace/request/m646u4g/onboarding-validations-request?tab=body)!


The Voucherify public workspace in Postman work includes:
- [Core API endpoints](https://www.postman.com/voucherify/voucherify-s-public-workspace/collection/z8gcn5w/voucherify-api-core-api-endpoints): Lists all Voucherify endpoints.
- [Integration examples](https://www.postman.com/voucherify/voucherify-s-public-workspace/collection/ymwnigh/voucherify-api-integration-examples): Shows examples of integrations and business scenarios.
- [Sandbox onboarding](https://www.postman.com/voucherify/voucherify-s-public-workspace/collection/iut4une/voucherify-api-onboarding): Contains API requests that help you with learning about Voucherify.

## Managing roles and inviting users

Manage your team roles and invite your team members:
1. In Voucherify, click your name in the lower left corner.
2. Go to **Team Settings**.
3. Go to **Team** to invite members and assign [roles](https://support.voucherify.io/article/40-how-does-the-access-control-work-in-voucherify).

> 👍 Advanced feature – Management API
>
> Enterprise clients can use the [Management API](doc:management-api) to perform account-related activities regarding projects, users, and other settings through the API.

## Exploring the Voucherify API in the Sandbox project

You can learn more about Voucherify API also through the dashboard in the [Sandbox project](https://support.voucherify.io/article/538-sandbox) even if you explore the Voucherify API by sending requests and analyzing responses through the interactive API reference or the Postman collection.

### Audit log

You can track more API details in the [Audit log](https://support.voucherify.io/article/524-project-logs).

In Voucherify:
1. Go to **Audit log** in the left bar.
2. Click **Add filter**.
3. Click **Channel**.
4. Select condition `in` and select `API` to filter the logs.

The log list show the status, method, URL, log ID, channel, and creation date.

Log details show more information, including the request and response bodies, query parameters, and related events.

### Demo shop

The Demo shop shows how the integration between Voucherify and customer touchpoints works in practice. You can use the Demo shop to test the campaigns and check how they work for test customers. In particular, you can monitor API calls and their payloads made during customer journey.

In Voucherify:
1. Go to **Marketer hub** in the left bar.
2. Click **Demo shop**.
3. In the bottom of the screen, unroll the **API calls** bar.

The API calls section shows details about particular endpoints and methods. You can also copy the JSON payload or go the API documentation of a given method.