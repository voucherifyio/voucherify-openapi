---
title: Modeling Voucherify Integration
excerpt: Elements in Voucherify integrations
categorySlug: integration-blueprint
slug: modeling-voucherify-integration
type: basic
hidden: false
order: 3
---

## Sample integration

As a developer-first tool, Voucherify exposes several integration paths:

- **REST API** – a rich set of **granular REST APIs** that help you deliver personalized incentives to any channel, device, and commerce solution while keeping your data in secure, highly available environments in a multi-tenant or dedicated cluster near you.

    [Check our interactive API Reference](https://docs.voucherify.io/reference/introduction-1 "Voucherify interactive API reference") 

- **Webhooks** – allow Voucherify to send instant updates to your app or URL endpoints when specific events occur. Rather than constantly checking endpoints for new data, you can **set up webhooks to receive notifications** about critical campaign-related events. 
  
  [Learn more about webhooks](https://support.voucherify.io/article/68-webhooks-notifications "Webhooks notifications in Voucherify")

- **Event-bus (Kafka)** – Voucherify can work with event buses as **producers** and **subscribers**.

- **CDP integrations** – Voucherify integrates with popular Customer Data Platforms, such as [Twilio Segment](https://www.voucherify.io/integrations/segment "Make customer data easy to manage and a pleasure to use with Segment"), [mParticle](https://www.voucherify.io/integrations/mparticle "Use granular customer data to build better promotions"), allowing you to stream data.

- **CEP integrations** – Voucherify provides ready connectors with Customer Engagement Platforms, such as [Bloomreach Engagement](https://support.voucherify.io/article/613-bloomreach-engagement-integration "Bloomreach Engagement Integration with Voucherify"), [Braze](https://www.voucherify.io/integrations/braze "Omnichannel incentives to grow customer engagement"), [Klaviyo](https://www.voucherify.io/integrations/klaviyo "Maximize customer engagement"), or [MoEngage](https://www.voucherify.io/integrations/moengage "Engage customers with cross-channel promotions"). 

- **Accelerators** – to accelerate time to value, Voucherify offers pre-built accelerators with** the most popular commerce and marketing tools**, such as [commercetools](https://www.voucherify.io/integrations/commercetools "Next-gen promotions for modern commerce"), [BigCommerce](https://www.voucherify.io/integrations/bigcommerce "Supercharge your online store with personalized promotions"), or [Braze](https://www.voucherify.io/integrations/braze "Omnichannel incentives to grow customer engagement").

    [Discover our Technology Partners](https://www.voucherify.io/integrations "Supercharge promotions with powerful Voucherify integrations")

To learn more, get familiar with our [Open Source Loyalty Accelerator for Omnichannel Retail](https://www.voucherify.io/blog/open-source-loyalty-accelerator-for-omnichannel-retail).

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

> 📘 Universality of Voucherify API
> 
> Voucherify API is **universal**. This means that if you already integrated the Redemption or Validation endpoints into your checkout for promo codes, **you can effortlessly run other campaign types**, such as gift cards or referrals, without any additional input from the tech team, significantly lowering the costs associated with extending Voucherify usage risk-free.
>
>The same goes for various discount types and effects – **your technical team does not need to introduce any changes to the integration if you are interested in running new discount types** (e.g., absolute instead of percentage).

![Diagram of how Voucherify is integrated with a store](https://files.readme.io/2c7eff2-guides_integration_blueprint_modeling-voucherify-integration-01.png "How Voucherify is integrated with a store")

![Responses from Voucherify](https://files.readme.io/00967ba-guides_integration_blueprint_modeling-voucherify-integration-02.png "Responses from Voucherify")