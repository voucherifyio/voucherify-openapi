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
> The primary secret key is visible for 14 days only when it is generated for the first time and for 15 minutes when the token is
> regenerated. Secondary secret keys are visible for 15 minutes when they are generated for the first time or regenerated.
>
> Write your secret keys down and keep them in a safe place.

```markdown App Keys
X-App-Id: 3XXXXXXa-125l-XXXr-qXXX-3XXXX8092e70    
X-App-Token: 4XX1XD-2X3X-XXXX-3X59-8XXXXXXX23y3
```

Most likely, you will not have to send your keys manually. See [SDKs](doc:sdks) that know how to handle them, so no extra code is needed.

> ❗ Security threat
> 
> It is essential that you keep your keys secure and not share them with others. Treat it as your application's password to Voucherify.

### Integrations Keys

To generate integrations keys, head to the Project Settings and in the General tab scroll down to the Integrations Keys section. Select the plus icon on the right to add new keys. Choose the name and select the user role for the integration. 

Available inbound integrations:

- Braze
- Commercetools
- MoEngage
- Iterable
- mParticle
- Segment
- Bloomreach
- Contentful
- Amplience
- Airship
- Bloomreach Engagement

> 🚧
> API Keys for following integrations: ActiveCampaign, BigCommerce, Shopify are automatically managed by Voucherify therefore you can
> not create them manually.

If you wish to add integrations keys from other platforms to Voucherify, go to the Home section and select Integrations tab. Choose the integration from the list and paste your key.

These keys enable an outbound integration which provides a continuous data flow from a given platform to Voucherify.

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