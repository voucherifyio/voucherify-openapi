---
title: Data Model
excerpt:
categorySlug: integration-blueprint
slug: data-model
type: basic
hidden: false
order: 8
---

> 📘 **Goals**
> 
> * Learn more about metadata. 
> * Choose which attributes and events you would like to share with Voucherify.

> 👍 **Outcome**
>
> Data model PoC that is based on your use cases and business model.

---

Personalized offers are a top focus for brands. However, moving data to **manage targeted incentives at scale** is a major operational challenge.

With native integrations and robust API connectivity across the customer data & experience stack, **Voucherify empowers marketers to run any incentive using any data.** 

Voucherify **supports brands operating in various models and industries** – from ecommerce to subscription-based brands in B2C, B2B, or D2C models. For maximum flexibility, the Voucherify data model can be easily extended with [custom fields and objects (metadata)](https://support.voucherify.io/article/99-schema-validation-metadata "Getting stared with Metadata") that let you run fully custom campaigns with the support of **arrays** and **nesting** for deeper targeting. 

By verifying and defining the data model early by translating data and actions into attributes and events that Voucherify can consume, **you can run campaigns relevant to your business model and audience.**

The next step is to **plan the frequency of data sync.** Voucherify can work with real-time traffic, which might impact your subscription plan's monthly API call usage.

> 📘 IDs in Voucherify
>
> Voucherify operates on top of an external master ID (source_id), which lets you sync various pieces of information under a unified ID. 

To quickly map out your data model, consider using the ready connectors with [Segment](https://voucherify.io/integrations/segment "Integration with Segment") and [mParticle](https://voucherify.io/integrations/mparticle "Integration with mParticle") CDPs. 

For the initial data migration, use asynchronous bulk API import endpoints or upload CSV files in the Dashboard. [Learn more about data integration](https://support.voucherify.io/article/574-data-import "Data Import").

> 📘 Data synchronization with Voucherify
> 
> Voucherify gives you complete control over **how and when to [synchronize data](doc:data-synchronization)** needed for incentive validation and redemption. You can sync the data before the final stage of the checkout process or send us relevant customer, product, order, and other data right in the validation and redemption requests on the fly. 

### Customer story – TIER Mobility

TIER Mobility uses free unlocks and free minutes as incentives. The custom attributes 
(metadata) let TIER attach minutes and unlocks to a given customer for a predefined period of time.

[Discover the full story](https://voucherify.io/ebooks/tier-mobility-case-study "Tier mobility case study")

# Sample data models

| Industry      | Ecommerce    | Services    | Travel    | QSR & Food Delivery   |
| :---:         |    :---:     |     :---:   |    :---:  |       :---:           |
| User traits   | locale, currency, lifetime value, order count | device, app version, session duration, subscription group, notification preferences | traveler status, age range, destinations, travel companions, booking channel | order history, favorite items, delivery address, dietary preferences, favorite restaurants, delivery instructions |               
| Custom events | product_viewed, product_added, checkout_started, order_completed, cart_abandoned | account_set, user_login, searches, feature_usage | destination_search, car_rental, booking_type, booking_date | menu_item_view, app_rating, menu_search, order_tracking, delivery_completed |

Learn more about [tracking custom events](ref:custom-event-object) 

![Sample Data Models](https://files.readme.io/c1910d6-guides_integration_blueprint_data_model_sample_data_models.png)
