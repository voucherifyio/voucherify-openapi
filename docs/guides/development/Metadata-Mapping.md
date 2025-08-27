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

Here are some examples of metadata (custom attributes) that can be added to different Voucherify objects:

| Object Type                                 | Attributes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Customer](ref:customer-object)             | First\_name, Second\_name, Gender, Age, Martial\_status (string), subscribed (boolean), Education, Occupation, Income, URL, Language, Source, Keyword, Shoe\_size, Size, Favorite\_brand, Children\_collection (true/false), Favourite\_service, Reviews\_words, Review\_count, Buying\_frequency, Preferred\_channel, Subscription\_plan, Sign\_up\_date, Internal\_id, Customer\_lifetime\_value, Acquisition\_channel, braze\_segment (string), Community\_member (true/false), Loyalty\_program\_id, Referral\_program\_id, Promo\_status\_points, Total\_order\_number, First\_order\_date, Last\_order\_date, Billing\_name, Billing\_address (nested), Billing\_city, Billing\_postal\_code, Billing\_country |
| [Redemption](ref:redemption-object)         | Booking\_time, Booking\_channel, Store\_id, Payment\_method, Payment\_channel, Payment\_date, voucher\_deep\_linked (boolean)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| [Product](ref:product-object)               | product\_category, Manufacturer\_id, Origin, brand, flight\_destination, Service\_time, Service\_date, booking\_date\_time, Short\_expiration\_date (true/false), expiration\_date (true/false), Ordered\_bulk\_only (true/false)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| [Order](ref:order-object)                   | First\_order (true/false), Order\_source, order\_channel, Order\_time, Order\_date, Takeaway (true/false), Shipping\_city, Shipping\_postal\_code, shipping\_country, payment\_method, currency, store\_id                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| [Publication](ref:publication-object)       | Request\_source, Trigger, Additional\_conditions, File\_uploaded (file URL)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| [Voucher](ref:voucher-object)               | PIN, Terms\_and\_conditions, Stacking\_allowed (true/false), Category, Currency, success\_banner\_url, failure\_banner\_url, contentful\_entities                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| [Campaign](ref:campaign-object)             | Terms\_and\_conditions, Category, Target\_audience, Location, Market, Currency, campaign\_owner                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Order line item                             | Category, Manufacturer\_id, Origin, Flight\_number, Service\_time, Service\_date, Short\_expiration\_date (true/false), Ordered\_bulk\_only (true/false)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| [Loyalty tier](ref:loyalty-tier-object)     | Points\_expiration (true/false), Level\_name, Audience\_restricted (true/false), exposed\_tier\_name, tier\_banner\_URL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| [Promotion tier](ref:promotion-tier-object) | Level\_name, exposed\_tier\_name, Audience\_restricted (true/false), Stack\_name, Stacking\_allowed (true/false), Priority, tier\_banner\_URL, Location, Market, campaign\_owner                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| [Earning rule](ref:earning-rule-object)     | Terms\_and\_conditions, Merchant\_id, Audience\_restricted (true/false), earning\_rule\_splash\_screen\_url                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| [Reward](ref:reward-object)                 | Place\_of\_collection, Merchant\_id, Additional\_restrictions, Pickup\_code, Terms\_and\_conditions                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |


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