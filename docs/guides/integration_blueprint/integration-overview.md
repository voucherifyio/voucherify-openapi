---
title: Integration blueprint
excerpt: What does Voucherify integration entail?
categorySlug: integration-blueprint
slug: integration-overview
type: basic
hidden: false
order: 2
---

Voucherify offers a business-agnostic API to model any promotion case. You can start with a single campaign type, for example, a discount campaign, and expand to other types later, such as gift card campaigns. Thanks to its modular API, you can choose the specific building blocks you need at the moment. This approach allows you to start small and scale to larger projects without significant upfront costs.

A key factor in evaluating the total cost of integration is understanding how Voucherify connects to your existing e-commerce and marketing infrastructure.

![How Voucherify works with your system and our rules engine](https://files.readme.io/494bc1a-guides_getting_started_welcome_to_voucherify_voucherify_workflow_scheme_01.png "How Voucherify works with your system and our rules engine")

## Scenario discovery

Before you start your integration with Voucherify, work with your team to:
- Identify a campaign type for your scenario,
- Learn key capabilities for each campaign type.

### Choose between available campaign types

Voucherify supports the following campaign types:
- Coupon campaigns (generic and bulk promo codes) – [Read the discount coupon guide](https://support.voucherify.io/article/514-coupons "Coupons Ultimate Guide")
- Cart-level discounts (strike-through promotions and bundling) – [Read the promotion guide](https://support.voucherify.io/article/519-create-cart-level-promotions "Cart-level Promotion")
- Gift cards – [Read the gift card guide](https://support.voucherify.io/article/47-prepaid-gift-cards-campaign "Gift Cards Campaign")
- Loyalty programs (earn and burn points, tiers, cashback, paid membership, and more) – [Read the loyalty program guide](https://support.voucherify.io/article/491-getting-started-with-loyalty-programs "Getting Started with Loyalty Programs")
- Referral programs (affiliate programs) – [Read the referral program guide](https://support.voucherify.io/article/48-referral-program-basics "Getting Started with Referral Program")

Each campaign type has a different operational flow, but all of them can be parametrized with customer attributes, order structure, or any custom data (metadata). 

Voucherify supports your team throughout the entire promotion lifecycle:
- Selecting campaign type and defining eligibility conditions (*if* conditions).
- Defining discount or reward values and effects (*then* effects).
- Distributing incentives and rewards via a built-in engine or third-party solutions. 
- Validating and redeeming offers. 
- Managing campaigns and monitoring real-time performance across channels.

After selecting the promotion type for the pilot campaign, the next step is to define the precise promotion scenario (use case) you want to model.

### How to write a use case?

A use case should specify the scenario you want to launch using Voucherify, covering the following aspects:
- **Campaign type**: Determine the type of campaign, such as discount coupons, automatic promotions, gift cards, a referral program, a loyalty program, or a combination of them.
- **Campaign effect**: Define the primary goal and intended outcome of the campaign.
- **Target audience**: Identify the specific customers the campaign should target, including any groups to be excluded. This involves defining all customer-level rules.
- **Promotion distribution**: Outline how incentives will be distributed. Specify when customers should receive the promotional message or qualify for the promotion.
- **Time constraints**: Determine if the promotion requires time limitations, such as specific days, hours, or recurring events.
- **Qualifying orders and products**: Establish any order- and product-level restrictions. For instance, whether the promotion applies to a minimum order value or excludes specific items.
- **Other limitations**:  Detail any additional restrictions or limits that should apply to the campaign.
- **Customer journey**: Map out where the promotion will be displayed and the entire workflow across various customer touchpoints.
- **Budget limits**: Specify if the campaign should automatically conclude upon reaching a predefined redemption threshold or if other budget constraints are necessary.

### Sample campaigns based on industry

Here are some of the popular use cases that Voucherify clients have launched.

#### Ecommerce

The most popular ecommerce use cases are:
- Generic (standalone) promo codes with robust redemption limits. 
- One- and two-sided referrals. 
- Before- and after-churn promo codes. 
- Behavior-based campaigns, for example, a promo code for orders above $500.
- Upselling and cross-selling scenarios.
- Volume-based cart promotions with levels.

#### Travel

The most popular travel use cases are:
- Book in advance scenarios, for example, use the promo by the end of month for a cruise next year.
- After-trip promotions, for example, send a promo 2 days after the trip.
- Gift card refunds.

#### Services

The most popular services use cases are:
- Booking a service during dead hours, for example, a taxi service between 10 AM and 2 PM.
- Sustainability promotions.

## Customer experience (CX)

After defining your pilot campaign, the next step is deciding where and how to use the Voucherify API in your customer journey. Think about which customer touchpoints need to connect to Voucherify APIs to make your scenario happen.

Your integration can combine qualification, validation, and redemption mechanisms.

You can use the [qualification mechanism](doc:checking-eligibility) to show customers relevant offers as recommendations at any point of their journey. For example, you can show vouchers that apply to the items in their cart.

![Qualification with Voucherify](https://files.readme.io/6203025-guides_integration_blueprint_modeling-voucherify-integration-07.png "Qualification API example")

You can also use [validation](ref:validate-stacked-discounts) on its own, without qualification, as the initial check for eligibility. Validation can show the discount amount, letting customers see the effect of an applied incentive.

[Redemption](ref:redeem-stacked-discounts) is when the incentive is actually used. If an incentive can be applied, it's consumed. For single-use discount codes, this means they can't be used again.

You can even use redemption by itself, as it also checks a customer's eligibility.

Each incentive (`redeemable` in the API) generated by Voucherify can be validated against [validation rules](https://support.voucherify.io/article/529-validation-rules-campaign-limits "Validation rules limiting customer eligibility"). These rules determine if a customer's incentive is eligible for an offer and if it can lead to a successful validation or redemption.

Here are some popular ways to improve customer experience with Voucherify APIs:
- **Various validation and redemption methods**: You have several options for validating and using incentives, including API calls, e-commerce plugins, offline mobile app scanning, widgets, landing pages, and manual redemption.
- **Strikethrough pricing**: Use the qualification API to display product and SKU prices.
- **Customer wallets**: Use Voucherify's GET API requests to get important customer information, such as their assigned incentives, status, and other details. These can be used to build customer-facing tools like progress trackers or digital wallets.
- **Discount stacking**: Customers can redeem multiple incentives based on defined stacking rules. The [Stackable discount API](doc:manage-stackable-discounts "Stackable discounts API in Voucherify") supports validation and redemption of all types of incentives with one endpoint for redeeming promo codes, applying loyalty points, counting successful referrals, or updating gift card balances.
![Stackable discounts API and order](https://files.readme.io/ee30b2e-guides_integration_blueprint_modeling-voucherify-integration-05.png "Stackable discounts API and order")
- **Dynamic discounts**: Run [dynamic promotions](https://support.voucherify.io/article/568-how-to-create-dynamic-discount-value "Dynamic Discount Value Builder") with different effects based on context.  For example, a promo code might give all users 20% off, but loyalty members get an extra 10% off.

Voucherify handles the backend logic and maintenance of digital promotions. By using the headless approach, which separates the back- and frontend, you can achieve faster integration, have complete control over your offer's appearance, and reduce the risk of backend errors disrupting your frontend applications.

To make prototyping easier, you can use [client-side APIs](doc:client-side-api).

For inspiration on the frontend promotion experience, refer to Voucherify UX kits:
- [Coupons and promotions UI kit](https://www.figma.com/community/file/1100356622702326488/ecommerce-coupons-promotions-ui-kit "Ecommerce coupons and promotions UI kit"),
- [Referral programs UI kit](https://www.figma.com/community/file/1039555483777372722/referral-programs-ui-kit "Referral programs UI kit"),
- [Loyalty programs UI kit](https://www.figma.com/community/file/1162414825186962172/loyalty-programs-ui-kit "Loyalty programs UI kit").

Your customer experience can be further improved with the way your integration is made with other tools.

## Integration method

As a developer-first tool, Voucherify exposes several integration paths.

### REST API

Voucherify provides granular REST APIs to deliver personalized incentives across any channel, device, or commerce solution. Your data remains secure in highly available environments, whether in a multi-tenant or dedicated cluster, located conveniently in a cluster close to you.

Learn more by exploring Voucherify's interactive [API reference](https://docs.voucherify.io/reference/introduction-1 "Voucherify interactive API reference").

### Webhooks

With Voucherify, you can set up webhooks to receive instant updates directly to your app or URL endpoints when specific events happen. This means you don't have to constantly check for new data; instead, you'll get notifications about critical campaign-related events as they occur.
  
Learn more about Voucherify's [webhooks](https://support.voucherify.io/article/68-webhooks-notifications "Webhooks notifications in Voucherify").

### Event-bus – Kafka

Voucherify can work with event buses as producers and subscribers.

## Integration with an ecommerce engine

Voucherify can be integrated with both headless and monolithic ecommerce solutions.

### Frontend decoupled from order management logic

Headless commerce solutions allow decoupling the frontend from order management logic, so you can quickly integrate your platforms. Voucherify [fits well](https://machalliance.org/newsroom/voucherify-io-joins-the-mach-alliance "Voucherify joins the MACH alliance") in the composable commerce ecosystem and has been [successfully deployed](https://www.voucherify.io/customers/breville "How Breville is Winning Digital Transformation with Voucherify and Friends") on a global scale, in both digital and physical stores. In addition, Voucherify provides numerous native accelerator plugins to the top ecommerce providers such as:
- [commercetools](https://www.voucherify.io/integrations/commercetools "Next-gen promotions for modern commerce"),
- [Bigcommerce](https://www.voucherify.io/integrations/bigcommerce "Supercharge your online store with personalized promotions"),
- [Emporix](https://www.voucherify.io/integrations/emporix "Enhance the Emporix Digital Commerce Platform with targeted promotions and loyalty programs").
- [Open Source Loyalty Accelerator for Omnichannel Retail](https://www.voucherify.io/blog/open-source-loyalty-accelerator-for-omnichannel-retail "Open Source Loyalty Accelerator for Omnichannel Retail blog post").

### Monolithic commerce solution

An integrated frontend and backend setup may require additional effort to ensure bi-directional synchronization with Voucherify. Voucherify's professional services team, along with together with [SI partners](https://www.voucherify.io/partners-directory "Partners who trust Voucherify"), has extensive experience in estimating total integration costs and is available to consult on your business case. Joint case studies with Voucherify's partners highlight successful integrations with various e-commerce platforms, from Shopify to SAP Hybris.

## Integration with a marketing ecosystem

Next, define the promotion experience. Voucherify's team can suggest ways to improve how you implement customer-facing touchpoints, including offer placements and messages, depending on the CDP, CEP, CMS, and CRM platforms you use.

Voucherify scales effectively thanks to its integrations with CDP or CEPs and stream processing systems like Kafka. On the other hand, CMS integrations help us localize promotions and adapt their format to meet the specific requirements of your distribution channels.

### CDP integrations

Voucherify integrates with popular Customer Data Platforms, such as:
- [mParticle](https://www.voucherify.io/integrations/mparticle "Use granular customer data to build better promotions"),
- [Twilio Segment](https://www.voucherify.io/integrations/segment "Make customer data easy to manage and a pleasure to use with Segment").

### CEP integrations

Voucherify provides ready connectors with Customer Engagement Platforms, such as:
- [ActiveCampaign](https://support.voucherify.io/article/165-activecampaign "Meet customers' needs with multi-channel engagement")
- [Airship](https://support.voucherify.io/article/617-airship-integration "Turbocharge personalized promotions")
- [Batch](https://support.voucherify.io/article/614-batch-integration "Leverage customer data for personalized messaging")
- [Bloomreach Engagement](https://support.voucherify.io/article/613-bloomreach-engagement-integration "Bloomreach Engagement Integration with Voucherify"),
- [Braze](https://www.voucherify.io/integrations/braze "Omnichannel incentives to grow customer engagement"),
- [CleverTap](https://support.voucherify.io/article/626-clevertap "Promotions and loyalty to engage customers at scale")
- [Intercom](https://support.voucherify.io/article/104-intercom-send-in-app-messages-from-voucherify-dashboard-to-intercom-customers "https://support.voucherify.io/article/104-intercom-send-in-app-messages-from-voucherify-dashboard-to-intercom-customers")
- [Iterable](https://support.voucherify.io/article/594-iterable-integration "Coordinate promotional & loyalty efforts with customer-focused messaging")
- [Klaviyo](https://www.voucherify.io/integrations/klaviyo "Maximize customer engagement"),
- [MoEngage](https://www.voucherify.io/integrations/moengage "Engage customers with cross-channel promotions"),
- [Wyng](https://support.voucherify.io/article/622-wyng-integration "Enhance promotion and loyalty experiences through gamification") ,

### CMS integrations

Voucherify provides ready connectors with Customer Management Systems, such as:
- [Amplience](https://support.voucherify.io/article/607-amplience-integration "Elevate digital promotions with personalized content"),
- [Bloomreach](https://support.voucherify.io/article/600-bloomreach-cms-integration "Show customers the right promotion data at the right time"),
- [Contentful](https://support.voucherify.io/article/599-contentful-integration "Unlock the power of timely promotion data").

## Data modeling and handling

The data transfer between Voucherify and marketing technology platforms should be considered with respect to:
- [Data model](#data-model),
- [Volume to be synchronized](#use-synchronized-data),
- [Data privacy](#data-privacy).

To achieve the desired scope of campaign flexibility and personalization, you have to send appropriate data to Voucherify.

That's why a data model is needed. Once it's created, you can move on to build a promotion experience on top of your user journey and lead customers to validate and redeem incentives.

Most Voucherify implementations are built on top of the following workflow.

### Data model

A Voucherify integration requires a business-appropriate data model for customer traits, custom events, and even custom incentives.

With Voucherify's modular API, it's possible to run different types of incentives with any data. This means Voucherify supports brands across diverse industries and business models, including e-commerce, subscription-based brands, and those operating in B2C, B2B, or D2C sectors.

To ensure high flexibility, the Voucherify data model can be extended with [custom fields and objects (metadata)](https://support.voucherify.io/article/99-schema-validation-metadata "Getting stared with Metadata"). Metadata allow you run fully custom campaigns with the support of arrays and nesting for deeper targeting.

You can also track [custom events](https://support.voucherify.io/article/111-custom-events) to run campaigns that are relevant to your business model and audience.

#### IDs in Voucherify

Voucherify operates on top of two types of identifiers:
- External master ID (`source_id`), provided by, for example, a Customer Data Platform,
- Unique identifier assigned by Voucherify.

This approach lets you sync various pieces of information under a unified ID.
<!-- I DON'T UNDERSTAND FULLY – ASK FOR SOMEONE'S REVIEW -->

#### Modelling your data

To quickly map your data model, consider ready connectors with [Segment](https://voucherify.io/integrations/segment "Integration with Segment") and [mParticle](https://voucherify.io/integrations/mparticle "Integration with mParticle") CDPs.

For the initial data migration, use different [data import options](https://support.voucherify.io/article/574-data-import "Data Import"), like Voucherify dashboard or asynchronous bulk API import endpoints.

For custom events, read the [custom event documentation](ref:custom-event-object)

See the table below to find examples of modelled data:

|               |                                    Ecommerce                                     |                                      Services                                       |                                    Travel                                    |                                                QSR & Food Delivery                                                |
| :-----------: | :------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------: | :--------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------: |
|  User traits  |                  locale, currency, lifetime value, order count                   | device, app version, session duration, subscription group, notification preferences | traveler status, age range, destinations, travel companions, booking channel | order history, favorite items, delivery address, dietary preferences, favorite restaurants, delivery instructions |
| Custom events | product_viewed, product_added, checkout_started, order_completed, cart_abandoned |                  account_set, user_login, searches, feature_usage                   |          destination_search, car_rental, booking_type, booking_date          |                    menu_item_view, app_rating, menu_search, order_tracking, delivery_completed                    |

### Use synchronized data

In a successful integration, Voucherify needs access to any relevant information at the right time. That's why it's important to set up the data scope and sync policies.

The Voucherify API can ingest and egress data, like product information or customer attributes to and from other systems in real-time and at scale. This, together with a flexible schema editor and auto-complete inputs in the Dashboard, makes creating new promotion scenarios less error-prone. It'll help you ensure data integrity if you have many product-specific discounts or want to trigger incentives based on aggregated customer attributes.

The next step is to plan the frequency of data synchronization. Since Voucherify can work with real-time traffic, this may affect your subscription plan's monthly API call usage.

### Data volume estimation

Voucherify works in a [pay-as-you-grow pricing model](https://www.voucherify.io/pricing "Fair plans that scale with you"): the price grows with the API usage. If you want to estimate the total cost of ownership in the long run, you may want to calculate API usage with assumptions about your growth.

Initial data migration might be an API-heavy operation. To reduce the impact on pricing, Voucherify provides bulk API endpoints.

Depending on your data volume or security policies, your account may require additional activities from the Voucherify team. One of them is setting up a dedicated cluster near your customers. This can impact the pricing significantly, so remember to provide this information to your Technical Account Manager.

> 📘 API usage and availability
>
> Besides API usage, you should define your minimum availability requirements. These will be included in a custom SLA.
> 
> [Check system status for historical performance](https://status.voucherify.io/)

### Data privacy

For security reasons, you may not want to synchronize and maintain customer or product details in Voucherify. In this case, you can send the necessary business context with a validation request and Voucherify will calculate the discount. As a result, the "meaning" will be offloaded to the "source of truth" system.

### Universal approach of Voucherify

Voucherify's API is universal. If you've already integrated the redemption or validation endpoints into your checkout for discount codes, you can easily run other campaign types, like gift cards or referrals. This requires no additional input from your tech team, significantly lowering the costs of extending Voucherify's use.

The same applies to various discount types and effects. Your technical team won't need to make any changes to the integration if you want to run new discount types, such as amount-based instead of percentage-based discounts.

![Diagram of how Voucherify is integrated with a store](https://files.readme.io/2c7eff2-guides_integration_blueprint_modeling-voucherify-integration-01.png "How Voucherify is integrated with a store")

## Voucherify partners

Voucherify partners with leading [Solution Integrators](https://www.voucherify.io/partners-directory "Voucherify Partners") that can help you build and maintain promotions and loyalty programs.