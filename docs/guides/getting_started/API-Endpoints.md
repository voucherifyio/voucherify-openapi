---
title: API Endpoints
excerpt: 
categorySlug: getting-started
slug: api-endpoints
type: basic
hidden: false
order: 6
---

Voucherify is shipped from shared clusters located on three continents, as well as from dedicated clusters for enterprise customers.

If you want to get the best performance from Voucherify, it is advised to create a project in the region (cluster) closest to your customers.

When creating the project you can choose where it should be located. It is possible to have projects located in different regions within one organization.

If your project is not created in Europe and your organization has a dedicated cluster, you must configure your application to use the appropriate API endpoint. Otherwise, your HTTP requests will be rejected.

The default API endpoint for the shared cluster in Europe is [https://api.voucherify.io](https://api.voucherify.io). Other API endpoints are created by the following pattern: [https://<region>.api.voucherify.io](https://<region>.api.voucherify.io).

## Shared Clusters

| **Shared Cluster** | **Endpoint** |
|:---|:---|
| Europe (default) | https://api.voucherify.io |
| United States | https://us1.api.voucherify.io |
| Asia (Singapore) | https://as1.api.voucherify.io |

## SDK

Each SDK provided by Voucherify has a method to override the default API endpoint:
  * [https://github.com/rspective/voucherify.js#api-endpoint](https://github.com/rspective/voucherify.js#api-endpoint)
  * [https://github.com/voucherifyio/voucherify-nodejs-sdk#api-endpoint](https://github.com/voucherifyio/voucherify-nodejs-sdk#api-endpoint)
  * [https://github.com/voucherifyio/voucherify-java-sdk#api-endpoint](https://github.com/voucherifyio/voucherify-java-sdk#api-endpoint)
  * [https://github.com/voucherifyio/voucherify-ruby-sdk#api-endpoint](https://github.com/voucherifyio/voucherify-ruby-sdk#api-endpoint)
  * [https://github.com/voucherifyio/voucherify-php-sdk#custom-api-url](https://github.com/voucherifyio/voucherify-php-sdk#custom-api-url)
  * [https://github.com/voucherifyio/voucherify-python-sdk#api-endpoint](https://github.com/voucherifyio/voucherify-python-sdk#api-endpoint)
  * [https://github.com/voucherifyio/voucherify-dotNET-sdk#api-endpoint](https://github.com/voucherifyio/voucherify-dotNET-sdk#api-endpoint)    
    [https://github.com/voucherifyio/voucherify-dotNET-sdk#api-endpoint-1](https://github.com/voucherifyio/voucherify-dotNET-sdk#api-endpoint-1)
  * [https://github.com/voucherifyio/voucherify-android-sdk#configuration](https://github.com/voucherifyio/voucherify-android-sdk#configuration)
  * [https://github.com/voucherifyio/voucherify-ios-sdk#api-endpoint](https://github.com/voucherifyio/voucherify-ios-sdk#api-endpoint)
  * [https://github.com/voucherifyio/voucherify-rust-sdk#api-endpoint](https://github.com/voucherifyio/voucherify-rust-sdk#api-endpoint)
