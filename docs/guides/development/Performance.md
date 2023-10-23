---
title: Performance
excerpt: Average response rates
categorySlug: development
slug: performance
type: basic
hidden: false
order: 9
---

As developers, we understand how important it is to have performant 3rd party APIs. Especially when it comes to the sales funnel process. That's why we put effort to make sure that Voucherify responds fast. Here are average response rates from our recent tests.

| **API call**                                              | **Average response rate** |
|:----------------------------------------------------------|:--------------------------|
| [Code Validation](ref:validate-voucher)                   | 120 ms                    |
| [Code Redemption](ref:redeem-voucher)                     | 200 ms                    |
| [Stackable Validation](ref:validate-stacked-discounts)    | 150 ms                    |
| [Stackable Redemption](ref:redeem-stacked-discounts)      | 350 ms                    |
| [Qualifications API](ref:check-eligibility)               | 400 ms                    |
| [Create Campaign](ref:create-campaign) (100 000 vouchers) | 60 sec                    |

> 👍 Enterprise plan
>
>[Contact us](https://www.voucherify.io/contact-sales) to discuss how Voucherify can meet your requirements, including:
> * SLA
> * Premium support
> * Dedicated infrastructure

## What happens in the background?

Every time you send a request to Voucherify, Voucherify reacts synchronously and asynchronously. This approach was taken to return the results as fast as possible, making the customer experience as seamless as it can be.


When requesting a redemption, Voucherify synchronously validates the voucher, returns the result, and you can expose the result to the customer. However, this does not mean that the complete processing of the request is finished.


Even though you have already received the result of the redemption, part of the processing is still ongoing. Voucherify is:

- Saving the redemption, order, and updates to the customer in the database,
- Updating the customer's Customer Segment assignment,
- Running Loyalty Earning Rules,
- Running Distributions.

If you expect a customer to receive an email right after making the purchase or a change in the number of Loyalty Points on his or her card, you'll see the effect after a couple of seconds.

[Read more here](https://support.voucherify.io/article/524-project-logs#background-tasks-overview) about background tasks and how you can monitor their processing time.

Below you will find a list of operations that explicitly occur asynchronously. 

| **Types by Context** | **Endpoint** |
|:---|:---|
| **CAMPAIGN** |  |
| CAMPAIGN.VOUCHERS_IMPORT | **POST**   <!-- [/campaigns/{campaignId}/import](OpenAPI.json/paths/~1campaigns~1{campaignId}~1import/post) -->[/campaigns/{campaignId}/import](ref:import-vouchers-to-campaign) |
| CAMPAIGN.VOUCHERS_IMPORT_CSV | **POST**   <!-- [/campaigns/{campaignId}/importCSV](OpenAPI.json/paths/~1campaigns~1{campaignId}~1importCSV/post) -->[/campaigns/{campaignId}/importCSV](ref:import-vouchers-to-campaign-using-csv) |
| CAMPAIGN.VOUCHERS_UPDATE | **PUT** [/campaigns/{campaignId}](ref:update-campaign) |
| CAMPAIGN.VOUCHERS_DELETE | **DELETE** <!-- [/campaigns/{campaignId}](OpenAPI.json/paths/~1campaigns~1{campaignId}/delete}) -->[/campaigns/{campaignId}](ref:delete-campaign) |
| CAMPAIGN.VOUCHERS_GENERATE | <ul><li>**POST** <!-- [/campaigns](OpenAPI.json/paths/~1campaigns/post) -->[/campaigns](ref:create-campaign): asynchronous for campaigns with more than 1 voucher, synchronous for campaign with 1 voucher</li><li>**POST**    <!-- [/campaigns/{campaignId}/vouchers](OpenAPI.json/paths/~1campaigns~1{campaignId}~1vouchers/post) -->[/campaigns/{campaignId}/vouchers](ref:add-vouchers-to-campaign)</li><ul> |
| **CUSTOMERS** |  |
| CUSTOMERS.IMPORT_CSV | **POST** <!-- [/customers/importCSV](OpenAPI.json/paths/~1customers~1importCSV/post) -->[/customers/importCSV](ref:import-customers-using-csv) |
| CUSTOMERS.BULK_UPDATE | **POST** <!-- [/customers/bulk/async](OpenAPI.json/paths/~1customers~1bulk~1async/post) -->[/customers/bulk/async](ref:update-customers-in-bulk) |
| CUSTOMERS.METADATA_UPDATE | **POST** <!-- [/customers/metadata/async](OpenAPI.json/paths/~1customers~1metadata~1async/post) -->[/customers/metadata/async](ref:update-customers-metadata-in-bulk) |
| **PRODUCTS** |  |
| PRODUCTS.BULK_UPDATE | **POST** <!-- [/products/bulk/async](OpenAPI.json/paths/~1products~1bulk~1async/post) -->[/products/bulk/async](ref:update-products-in-bulk)<br> |
| PRODUCTS.METADATA_UPDATE | **POST** <!-- [/products/metadata/async](OpenAPI.json/paths/~1products~1metadata~1async/post) -->[/products/metadata/async](ref:update-products-metadata-in-bulk) |
| PRODUCTS.IMPORT_CSV | **POST** <!-- [/products/importCSV](OpenAPI.json/paths/~1products~1importCSV/post) -->[/products/importCSV](ref:import-products-using-csv) |
| SKUS.IMPORT_CSV | **POST** <!-- [/skus/importCSV](OpenAPI.json/paths/~1skus~1importCSV/post) -->[/skus/importCSV](ref:import-skus-using-csv) |
| **VOUCHERS** |  |
| VOUCHERS.IMPORT | **POST** <!-- [/vouchers/import](OpenAPI.json/paths/~1vouchers~1import/post) -->[/vouchers/import](ref:import-vouchers) |
| VOUCHERS.IMPORT_CSV | **POST** <!-- [/vouchers/importCSV](OpenAPI.json/paths/~1vouchers~1importCSV/post) -->[/vouchers/importCSV](ref:import-vouchers-using-csv) |
| VOUCHERS.BULK_UPDATE | **POST** <!-- [/vouchers/bulk/async](OpenAPI.json/paths/~1vouchers~1bulk~1async/post) -->[/vouchers/bulk/async](ref:update-vouchers-in-bulk)<br> |
| VOUCHERS.METADATA_UPDATE | **POST** <!-- [/vouchers/metadata/async](OpenAPI.json/paths/~1vouchers~1metadata~1async/post) -->[/vouchers/metadata/async](ref:update-vouchers-metadata-in-bulk) | 
| **ORDERS** |  |
| ORDERS.IMPORT | **POST** [/orders/import](ref:import-orders) |
| **METADATA KEY PURGE** |  |
| CAMPAIGNS.METADATA_KEY_PURGE<br>CUSTOMERS.METADATA_KEY_PURGE<br>PRODUCTS.METADATA_KEY_PURGE<br>VOUCHERS.METADATA_KEY_PURGE<br>ORDERS.METADATA_KEY_PURGE | No API endpoint equivalent. You can perform this action through the Dashboard. See Dashboard documentation: Dashboard > [Project Settings](https://support.voucherify.io/article/99-schema-validation-metadata#maintenance) |
