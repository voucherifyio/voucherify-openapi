---
title: Versioning
excerpt: What is the latest version?
categorySlug: introduction
slug: versioning
type: basic
hidden: false
order: 3
---

When we make **backwards-incompatible** changes to the API, we release new, dated versions. The current version is `v2018-08-01`. Read our API [changelog](doc:api-version-upgrades) to learn more about Voucherify API versions. The changelog lists every available version. 

All requests will use the API version listed in your account **Project settings** unless you override the API version. 

To set the API version for a specific request, send a `X-Voucherify-API-Version` header.  

```cURL Example Request
curl -X GET \
  -H "X-App-Id: c70a6f00-cf91-4756-9df5-47628850002b" \
  -H "X-App-Token: 3266b9f8-e246-4f79-bdf0-833929b1380c" \
  -H "Content-Type: application/json" \
  -H "X-Voucherify-API-Version: v2017-04-20" \
  https://api.voucherify.io/v1/vouchers/VoucherCode
```

## API Upgrades

Keep track of changes and [upgrades to the Voucherify API](doc:api-version-upgrades). If you need help, talk to [support](https://www.voucherify.io/contact-support) or write to us on our [Slack channel](https://www.voucherify.io/community).
