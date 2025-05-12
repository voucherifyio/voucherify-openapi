---
title: Metadata mapping
excerpt: Custom attributes (metadata) and their use in Voucherify
categorySlug: development
slug: metadata-mapping
type: basic
hidden: false
order: 50
---

##  Custom attributes (metadata)

Custom attributes can be added to your project as metadata. A metadata attribute is a set of key/value pairs that you can use to customize your campaigns, vouchers, customers, SKUs, products, redemptions, publications, loyalty tiers, promotion tiers, and orders.

Here are some exemplary scenarios that can be achieved by using metadata:

- Validate redemptions based on custom attributes,
- Filter out customers in segments (e.g., users who signed up for a newsletter before a given date) and use them for validation rules,
- Run distributions based on custom customer attributes,
- Enforce that new campaigns have proper identifiers provided for reporting.

> 📘 Voucherify Management API
> 
> Voucherify [Management API](doc:management-api "Management API"), available as an Enterprise feature, enables you to manage metadata schemas via API. For instance, you can set up new or modify standard metadata schemas under a specific configuration between projects. You can conveniently list metadata schemas, retrieve a specific metadata schema, update, or delete the schemas within a project as needed.

### Validation purposes

You can use validation rules and apply them to codes or loyalty-earning rules in your campaigns and can encourage customers to specific behaviors, allowing them to redeem the discount only if:

- A customer is subscribed to a newsletter,
- A customer chooses a specific payment method or currency,
- A customer buys an item from a specific brand,
- A customer is using a mobile application to make the purchase.

### Targeting purposes

You can target certain products or collections to be eligible for the discount. In this scenario, products share some common features, such as category, brand, or manufacturing date:

- Products that are about to expire,
- Products from the last season,
- Discount targeting a product category/collection.

### Distribution

You can reward your customers for certain behaviors that, in turn, will trigger the distribution of a voucher code or add points to their loyalty card balance:

- Reward a customer with a coupon code for subscribing to a newsletter,
- Reward a customer with loyalty points if the customer buys items from a specific brand,
- Give a customer a gift voucher if they leave a 5-star review.

### Enhancing the customer experience

You can enhance your customer experience and control the custom attributes exposed to them directly from Voucherify:

- Campaigns/vouchers – terms and conditions, link to a banner,
- Rewards – reward details, how to retrieve the reward,
- Earning Rules – terms and conditions.

## Metadata Library

Voucherify will take care of metadata integrity. This is achieved by a [metadata schema validator](https://support.voucherify.io/article/99-schema-validation-metadata). It allows you to define field types, including:

- text
- number
- boolean
- date
- date time
- image URL
- Object (nested)

|                   Object                    |                                                             Metadata                                                              |
| :-----------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------: |
|       [Customer](ref:customer-object)       | marital_status (string), subscribed (boolean), billing information (nested), acquisition_channel (string), braze_segment (string) |
|     [Redemption](ref:redemption-object)     |                                                   voucher_deep_linked (boolean)                                                   |
|        [Product](ref:product-object)        |           product_category, expiration_date (true/false), manufacturer_id, brand, flight_destination, booking_date_time           |
|          [Order](ref:order-object)          |                                shipping_country, order_channel, payment_method, store_id, currency                                |
|    [Publication](ref:publication-object)    |                                                      request_source, trigger                                                      |
|        [Voucher](ref:voucher-object)        |                         terms_and_conditions, success_banner_url, failure_banner_url, contentful_entities                         |
|       [Campaign](ref:campaign-object)       |                                         target_audience, location, market, campaign_owner                                         |
|               Order line item               |                                         category, manufacturer_id, origin, flight_number                                          |
|   [Loyalty tier](ref:loyalty-tier-object)   |                                                exposed_tier_name, tier_banner_URL                                                 |
| [Promotion tier](ref:promotion-tier-object) |                               exposed_tier_name, tier_banner_URL, location, market, campaign_owner                                |
|   [Earning rule](ref:earning-rule-object)   |                                       terms_and_conditions, earning_rule_splash_screen_url                                        |
|         [Reward](ref:reward-object)         |                                             place_of_collection, terms_and_conditions                                             |

## Customer PII

Sending any kind of Personally Identifiable Information (PII) to Voucherify is not mandatory. However, passing such data enables additional features, but our promotion engine can be used without any PII from your customers. You can just send the technical ID of the customer to enable some specific discounts to the customer. 

While using external tool segments, e.g., from Braze, Iterable, Salesforce, etc., segmentation is based on the PII. During the send-out process, the tool sends a request to Voucherify to assign a voucher code to a specific customer ID, thus not passing any PII. Such a solution enables the following scenarios:

- Showing the list of vouchers for a customer (based on the customer’s ID alone),
- Enabling the customer wallet scenario for qualification (targeted discounts based on the previous distribution),
- Validating whether the customer using the voucher is the person to whom the voucher code was assigned. 

## Nested metadata

To extend the customization capabilities of Voucherify, you can also use nested metadata properties. For example, you may create a new metadata billing_information and add several nested properties, such as billing_address, billing_country, or billing_postal_code. To customize these properties further, you can decide the type of the given metadata property and optionally set different conditions, e.g., billing_country has to be a European country.

Example for a billing address:

```json
"metadata": {
      "billing_information": {
              "billing_address": "Porcelanowa 23",
              "billing_city": "Katowice",
              "billing_country": "Poland",
              "billing_postal_code": "40-246",
              "billing_recipient": "John Smith",
    }
  }
```