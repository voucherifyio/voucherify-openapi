---
title: Authentication
excerpt: Authorization methods and principles used to access the Voucherify platform HTTP APIs.
categorySlug: development
slug: authentication
type: basic
hidden: false
order: 30
---

## Authorization Overview

Voucherify uses two pairs of keys — one for server applications (*back-end*) and one for publicly available client applications (*mobile apps* and *web applications*).

> 📘 API endpoints
>
> In addition to the keys, you will need to choose suitable [API endpoints](doc:api-endpoints).

## Application Authentication

To access Voucherify API, the client application needs to pass `Application ID` and `Application Secret Key`. To find your keys, head to the Project Settings and in the General tab scroll down to the Application Keys section. Below that section, you can generate your integration keys and see the client-side keys.

By default, there are two pairs of authentication keys. The first, Application Keys, are meant to authorize your requests to Voucherify API. You can create more Application Keys for each user. The second, Client-Side Keys, are meant for publicly available client applications (mobile apps and web applications).

A generated pair of Application ID and Application Secret Key must be attached to every HTTP request as custom headers: `X-App-Id`, `X-App-Token`.

> 🚧 API keys visibility
>
> The primary secret key is visible for 14 days only when it is generated for the first time and for 15 minutes when the token is regenerated. Secondary secret keys are visible for 15 minutes when they are generated for the first time or regenerated.
>
> Write your secret keys down and keep them in a safe place.
>
> **Please note that the API keys in the Sandbox Project are never hidden.**


```markdown App Keys
X-App-Id: 3XXXXXXa-125l-XXXr-qXXX-3XXXX8092e70    
X-App-Token: 4XX1XD-2X3X-XXXX-3X59-8XXXXXXX23y3
```

Most likely, you will not have to send your keys manually. See [SDKs](doc:sdks) that know how to handle them, so no extra code is needed.

> ❗ Security threat
> 
> It is essential that you keep your keys secure and not share them with others. Treat it as your application's password to Voucherify.

### Integration Keys

Voucherify can be integrated with different platforms, which receive data from Voucherify or which send data to Voucherify.

#### Platforms That Send Data to Voucherify

To generate keys for integration platforms that send data to Voucherify, head to the Project Settings and in the General tab, scroll down to the Integration Keys section. Select the plus icon on the right to add new keys. Choose the name and select the user role for the integration. 

Available integration platforms:

- [Airship](https://support.voucherify.io/article/617-airship-integration "Airship Integration")
- [Amplience](https://support.voucherify.io/article/607-amplience-integration "Amplience Integration")
- [Bloomreach](https://support.voucherify.io/article/600-bloomreach-cms-integration "Bloomreach CMS Integration")
- [Bloomreach Engagement](https://support.voucherify.io/article/613-bloomreach-engagement-integration "Bloomreach Engagement Integration")
- [Braze](https://support.voucherify.io/article/588-braze-integration "Braze Integration")
- [commercetools](https://support.voucherify.io/article/581-commercetools "commercetools integartions")
- [Contentful](https://support.voucherify.io/article/599-contentful-integration "Contentful Integration")
- [Iterable](https://support.voucherify.io/article/594-iterable-integration "Iterable Integration")
- [MoEngage](https://support.voucherify.io/article/596-moengage-integration "MoEngage Integration")
- [mParticle](https://support.voucherify.io/article/590-mparticle "mParticle Integration")
- [Segment](https://support.voucherify.io/article/272-segment "Segment Integration")

> 🚧
> The API keys for the integration platforms are visible for 15 minutes when they are generated for the first time or regenerated.

#### Platforms That Receive Voucherify Data

To add integration keys from the platforms that receive data from Voucherify, go to the Home section and select the Integrations tab. Choose the integration from the list and paste your key. The following platforms are supported:
- [ActiveCampaign](https://support.voucherify.io/article/165-activecampaign "ActiveCampaign Integration")
- [Batch](https://support.voucherify.io/article/614-batch-integration "Batch Integration")
- [BigCommerce](https://support.voucherify.io/article/141-bigcommerce "BigCommerce Integration")
- [Bloomreach Engagement](https://support.voucherify.io/article/613-bloomreach-engagement-integration "Bloomreach Engagement Integration")
- [Braze](https://support.voucherify.io/article/588-braze-integration "Braze Integration")
- [CM Telecom](https://support.voucherify.io/article/89-integrations-for-distributions#CM-telecom "CM Telecom Integration")
- Google Analytics
- [Intercom](https://support.voucherify.io/article/104-intercom-send-in-app-messages-from-voucherify-dashboard-to-intercom-customers "Intercom Integration")
- [Klaviyo](https://support.voucherify.io/article/598-klaviyo-integration "Klaviyo Integration")
- [Mailchimp](https://support.voucherify.io/article/43-mailchimp-distribution "Mailchimp Integration")
- [Mailgun](https://support.voucherify.io/article/89-integrations-for-distributions#mailgun "Mailgun Integration")
- [Mandrill](https://support.voucherify.io/article/89-integrations-for-distributions#mandrill "Mandrill Integration")
- [mParticle](https://support.voucherify.io/article/590-mparticle "mParticle Integration")
- [Segment](https://support.voucherify.io/article/272-segment "Segment Integration")
- [SendGrid](https://support.voucherify.io/article/578-sendgrid "SendGrid Integration")
- [Textlocal](https://support.voucherify.io/article/89-integrations-for-distributions#textlocal "Textlocal Integration")
- [Twilio](https://support.voucherify.io/article/89-integrations-for-distributions#twilio "Twilio Integration")

## Client-Side Authentication

The other authentication mechanism uses publishable keys. They are meant to be used by the public (web and mobile) clients to access a subset of the API (labeled with `(client-side)` in the [API reference](doc:api-reference)).

See [voucherify.js](doc:client-side-api) as an example.

> 🚧 Domain whitelist
> 
> Remember to whitelist your domain/mobile app origin in the Project settings > Client-side Settings to allow client-side connections.

### Client-Side Request Headers

For client-side HTTP requests, you need to provide the following headers:

```curl Client-side request headers
  -H "X-Client-Application-Id: YOUR-CLIENT-SIDE-APPLICATION-ID" \
  -H "X-Client-Token: YOUR-CLIENT-SIDE-TOKEN" \
  -H "Content-Type: application/json" \
  -H "origin: yourdomain.com" \ 
```

Here is an example of a client-side request ([Validate Voucher (client-side)](ref:validate-voucher)) authorized using client-side API keys.

```curl Client-side redemption
curl -X GET \
  -H "X-Client-Application-Id: YOUR-CLIENT-SIDE-APPLICATION-ID" \
  -H "X-Client-Token: YOUR-CLIENT-SIDE-TOKEN" \
  -H "Content-Type: application/json" \
  -H "origin: yourdomain.com" \
  -d '{
    "order" : {
        "amount" : 20000
    }
  }' \
  "https://api.voucherify.io/client/v1/validate?code=BLCKFRDY"
```