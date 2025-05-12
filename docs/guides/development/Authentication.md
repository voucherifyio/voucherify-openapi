---
title: Authentication and authorization
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
> **The API keys in the Sandbox Project are never hidden.**


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

## OAuth 2.0

Voucherify supports also OAuth 2.0 authorization method.

You can use a Voucherify API key to generate OAuth tokens for the authorization of an API client. The tokens can access the whole server-side or client-side API, or you can limit its access to specific parts, like campaigns, vouchers, or validations, by using the `scope` parameter.

The OAuth token inherits all the permissions and IP whitelists of the API key that is used to generate it. The token is valid for 15 minutes.

If the API key that is used to generate the OAuth token is deleted or blocked, you cannot generate new OAuth tokens and the existing ones will stop working after one minute. However, regenerating the API key used to generate an OAuth token does not affect the token.

The OAuth 2.0 is supported with the following endpoints:
- [Generate OAuth token](ref:generate-oauth-token)
- [Introspect OAuth token](ref:introspect-oauth-token)
- [Revoke OAuth token](ref:revoke-oauth-token)

### Use Case Ideas

You can use Voucherify OAuth 2.0 in the following ways.

For example, you can generate OAuth tokens inside each application with a Voucherify API key and token delivered to them directly. Such app should monitor the expiration time to create a new token, so that it works without interruptions. Also, you can limit the access of the token to specific parts of the Voucherify API with the `scope` parameter.

Alternatively, you can have a dedicated app or service to generate OAuth tokens with a Voucherify API key and token. This app serves the OAuth tokens to other apps, for example with a limited access as defined with the `scope` parameter. This way, you can restrict the access  to the Voucherify API key and token to this service and ensure better security and dedicated log tracking.

By using OAuth 2.0, you can lower the risk of a negative impact on your organization if such token is exposed or leaked, as they:

- can be limited with the `scope` parameter,
- expire in 15 minutes,
- can be revoked at any time.