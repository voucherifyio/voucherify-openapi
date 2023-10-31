---
title: Modeling Voucherify integration
excerpt:
categorySlug: integration-blueprint
slug: modeling-voucherify-integration
type: basic
hidden: false
order: 2
---

## Sample integration

As a developer-first tool, Voucherify exposes several integration paths:

- **REST API** – a rich set of **granular REST APIs** that help you deliver personalized incentives to any channel, device, and commerce solution while keeping your data in secure, highly available environments in a multi-tenant or dedicated cluster near you.


    [Check our interactive API Reference](https://docs.voucherify.io/docs "Voucherify interactive API reference") 

- **Webhooks** – allow Voucherify to send instant updates to your app or URL endpoints when specific events occur. Rather than constantly checking endpoints for new data, you can **set up webhooks to receive notifications** about critical campaign-related events. 
  
  [Learn more about webhooks](https://support.voucherify.io/article/68-webhooks-notifications "Webhooks notifications in Voucherify")

- **Event-bus (Kafka)** – Voucherify can work with event buses as **producers** and **subscribers**.

- **CDP integrations** – Voucherify integrates with popular Customer Data Platforms, such as [**Twilio Segment**](https://www.voucherify.io/integrations/segment "Make customer data easy to manage and a pleasure to use with Segment"), [mParticle](https://www.voucherify.io/integrations/mparticle "Use granular customer data to build better promotions"), allowing you to stream data.

- **CEP integrations** – Voucherify provides ready connectors with Customer Engagement Platforms, such as [Bloomreach Engagement](https://support.voucherify.io/article/613-bloomreach-engagement-integration "Bloomreach Engagement Integration with Voucherify"), [Braze](https://www.voucherify.io/integrations/braze "Omnichannel incentives to grow customer engagement"), [Klaviyo](https://www.voucherify.io/integrations/klaviyo "Maximize customer engagement"), or [MoEngage](https://www.voucherify.io/integrations/moengage "Engage customers with cross-channel promotions"). 

<!-- Bloomreach Engagement link to be changed to marketingese once they do their duty -->

- **Accelerators** – to accelerate time to value, Voucherify offers pre-built accelerators with** the most popular commerce and marketing tools**, such as [commercetools](https://www.voucherify.io/integrations/commercetools "Next-gen promotions for modern commerce"), [BigCommerce](https://www.voucherify.io/integrations/bigcommerce "Supercharge your online store with personalized promotions"), or [Braze](https://www.voucherify.io/integrations/braze "Omnichannel incentives to grow customer engagement").

    [Discover our Technology Partners](https://www.voucherify.io/integrations "Supercharge promotions with powerful Voucherify integrations")

---

The scope of campaign flexibility and personalization you can achieve with Voucherify is made possible by feeding Voucherify with appropriate data. 

Once the data model is set, you can move on to build a promotion experience on top of your user journey to lead customers to validate and redeem offers.

Most Voucherify implementations are built on top of the following workflow:

- **Data model**: Defining the business-appropriate data model for customer traits, custom events, and even custom incentives (e.g., free e-scooter unlocks or subscription periods).

    [See Data Model for more information](https://docs.voucherify.io/docs/data-model "Data model")

- **Data sync**: Setting up the data scope and sync policies to ensure that Voucherify can access any relevant information when needed. 

- **Experience**: Creating a qualification process to hint and share relevant offers to customers at any journey stage. 

    [See Promotion Experience for more information](#promotion-experience "Promotion experience")

- **Redemption**: Each Voucherify-generated incentive can be validated against a set of predefined limits and redeemed if a customer is eligible for the offer. 

> :blue_book: Universality of Voucherify API
> 
> Voucherify API is **universal**. This means that if you already integrated the Redemption or Validation endpoints into your checkout for promo codes, **you can effortlessly run other campaign types**, such as gift cards or referrals, without any additional input from the tech team, significantly lowering the costs associated with extending Voucherify usage risk-free.
>
>The same goes for various discount types and effects – **your technical team does not need to introduce any changes to the integration if you are interested in running new discount types** (e.g., absolute instead of percentage).

![Diagram of how Voucherify is integrated with a store](https://files.readme.io/2c7eff2-guides_integration_blueprint_modeling-voucherify-integration-01.png "How Voucherify is integrated with a store")

![Responses from Voucherify](https://files.readme.io/00967ba-guides_integration_blueprint_modeling-voucherify-integration-02.png "Responses from Voucherify")

---

## Scenarios discovery

> :blue_book: **Goals**:
>
> - Identify a campaign for your pilot project. 
> - Learn key capabilities for each campaign type.
> - Uncover roadblocks and 3rd-party integrations.

**Outcome**:

Creation of an initial POC for Voucherify integration.

---

**Choose between available campaign types**:

- Coupon campaigns (generic and bulk promo codes) – [See tutorial](https://support.voucherify.io/article/514-coupons "Coupons Ultimate Guide")
- Referral programs (affiliate programs) – [See tutorial](https://support.voucherify.io/article/48-referral-program-basics "Getting Started with Referral Program")
- Loyalty programs (earn & burn points, tiers, cashback, paid membership, and more) – [See tutorial](https://support.voucherify.io/article/491-getting-started-with-loyalty-programs "Getting Started with Loyalty Programs")
- Cart-level discounts (strike-through promotions and bundling) – [See tutorial](https://support.voucherify.io/article/519-create-cart-level-promotions "Cart-level Promotion")
- Gift cards – [See tutorial](https://support.voucherify.io/article/47-prepaid-gift-cards-campaign "Gift Cards Campaign")
- Giveaways – [See tutorial](https://support.voucherify.io/article/187-how-to-create-a-giveaways-program "Getting Started with Giveaways Campaign")

---

Each campaign type follows a different flow, but all of them can be **parametrized with customer attributes, order structure, or any custom data (metadata)**. 

Voucherify supports your team across **the entire promotion lifecycle**:

- Selecting campaign type and defining eligibility conditions (*if* condition).
- Defining discount/reward value and effect (*then* effect).
- Distributing incentives and rewards via a built-in engine or third parties. 
- Validating and redeeming offers. 
- Managing campaigns and monitoring performance across channels in real-time.

After selecting the promotion type for the pilot campaign, you should come up with **an exact promotion scenario** (use case) you want to model:

### How to write a use case?

A use case should **specify the scenario you want to launch using Voucherify**. You should specify the following:

- **Promotion type** – would it be a discount coupon, automatic promotion, gift card, referral program, loyalty program, or a combination of some?
- **Promotion effect** – what should the promotion do? What is the end goal of the campaign?
- **Target audience** – which customers should it target? Should it exclude some groups? You should define all customer-level rules.
- **Promotion distribution** – how do you plan to distribute the incentives? When should customers get the promotional message or qualify for the promotion?
- **Time constraints** – should the promotion have time limits? Should it be certain days, hours, or a recurring event?
- **Qualifying orders and products** – you should specify all order- and product-level limits, for example, the minimum order value or decide if the campaign should exclude specific items.
- **Other limitations** – you should specify any other restrictions or limits you can think of.
- **Customer journey** – you should analyze where the promotion will be displayed and what the entire workflow should look like across touchpoints. 
- **Budget limits** – should the campaign end automatically if a specific redemption threshold is reached? Do you need any other budget limits?

---



## Sample campaigns based on industry

Here are some of the popular use cases we have helped clients launch:

**Ecommerce**:

- Generic (standalone) promo codes with robust redemption limits. 
- One- and two-sided referrals. 
- Before- and after-churn promo codes. 
- Behavior-based campaigns (e.g., a promo code for orders above $500).
- Upselling and cross-selling scenarios.
- Volume-based cart promotions with levels.

<!-- ![Beanz.com coupon generated with Voucherify](https://files.readme.io/c1f82f3-guides_integration_blueprint_modeling-voucherify-integration-03.png "Beanz.com coupon generated with Voucherify")

![easyJet holidays coupon generated with Voucherify](https://files.readme.io/4d8cf4f-guides_integration_blueprint_modeling-voucherify-integration-04.png "easyJet holidays coupon generated with Voucherify") -->

**Travel**:

- Book in advance scenarios (e.g., use the promo till the end of month for a 2024 cruise).
- After-trip promotions (e.g., send a promo 2 days after the trip).
- Gift card refunds.

**Services**:

- Booking a service during dead hours (e.g., a taxi service between 10 AM and 2 PM).
- Sustainability promotions.

---

## Promotion experience

> :blue_book: **Goals**:  
>
> - Learn more about campaign recommendations and qualification API. 
> - Discover touchpoints for embedding Voucherify APIs to enhance CX. 
> - Identify where and how the codes (e.g., promo code, referral code, gift card, loyalty card) will be validated and redeemed.


Outcome: 

Ability to embed Voucherify APIs for building custom promotion experiences across touchpoints.

---

After you define your pilot campaign, the next step is to **choose where and how to embed Voucherify API in your customer journey flow**. Consider what touchpoints must be connected to Voucherify APIs to execute your scenario.

> :blue_book: Validation and redemption 
> 
> Validation is the initial eligibility check. It also returns the discount, allowing customers to see the effect of the incentive. Redemption refers to the actual usage of the offer. Your integration can include both requests or use redemption only, as it also validates the customer’s eligibility.

**Here are some of the most popular ways to enhance CX with Voucherify APIs**:
- **Various validation and redemption methods** – choose between API, ecommerce plugins, offline mobile app scanning, widgets, landing pages, and manual redemption methods.
- **Customer wallets** – pull relevant customer data, such as assigned promo codes or loyalty scores, to build fully custom user dashboards. 
    > :blue_book: How to get customer wallets?
    > Voucherify API comes with a selection of **GET APIs to pull information about the customer status and assigned incentives**. Use these endpoints to create customer-facing UIs such as progress trackers or wallets. 
- **Discount stacking** – let customers redeem multiple incentives and define combinability rules. The Stacking API is **universal**, meaning that you can validate and redeem all types of incentives with the same interface – use the same endpoint for redeeming promo codes, applying loyalty points, counting successful referrals, or updating the gift card balance. Learn more about [Stackable discounts API](https://docs.voucherify.io/docs/manage-stackable-discounts "Stackable discounts API in Voucherify").
![Stackable discounts API and order](https://files.readme.io/ee30b2e-guides_integration_blueprint_modeling-voucherify-integration-05.png "Stackable discounts API and order")
- **Dynamic discounts** – run dynamic promotions with variable effects based on context. For example, a promo code grants a 20% discount to all users but a bonus 10% off to loyalty program members. [Learn more about dynamic discounts](https://support.voucherify.io/article/568-how-to-create-dynamic-discount-value "Dynamic Discount Value Builder").
![Dynamic discount formula](https://files.readme.io/94e74fe-guides_integration_blueprint_modeling-voucherify-integration-06.png "Dynamic discount formula builder in Voucherify")
- **Qualification** – use the qualification mechanisms to pull relevant campaigns and display them to eligible customers as recommendations. Learn more about. 
  ![Qualification with Voucherify](https://files.readme.io/6203025-guides_integration_blueprint_modeling-voucherify-integration-07.png "Qualification API example")
- **Strikethrough pricing** – use the qualification API to display product- and SKU-level discounts. 

Voucherify is responsible for the **backend logic** and **maintenance** of digital promotions. Following **the headless approach**, we believe in separating the back and front end. This way, you make the integration faster, have total control over the final look of your offers, and minimize the risk that a back-end error will cause disruption to your front-end applications.

To make prototyping easier, you can use **client-side APIs**.

For inspiration on the front-end promotion experience, refer to Voucherify UX kits:

- [Coupons & Promotions UI Kit](https://www.figma.com/community/file/1100356622702326488/ecommerce-coupons-promotions-ui-kit "Ecommerce Coupons & Promotions UI Kit")
- [Referral Programs UI Kit](https://www.figma.com/community/file/1039555483777372722/referral-programs-ui-kit "Referral Programs UI Kit")
- [Loyalty Programs UI Kit](https://www.figma.com/community/file/1162414825186962172/loyalty-programs-ui-kit "Loyalty Programs UI Kit")