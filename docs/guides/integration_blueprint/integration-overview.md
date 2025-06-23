---
title: Integration Overview
excerpt: What does the integration entail?
categorySlug: integration-blueprint
slug: integration-overview
type: basic
hidden: false
order: 2
---

Voucherify offers **a business-agnostic API to model any promotion case**. You can start with a single campaign type and expand to other types later. Thanks to the modular API, you can choose which building blocks you need at the moment. This way, you can start small and run bigger projects later without large upfront costs.

A key factor for evaluating the total cost of integration is to understand how Voucherify can be connected to your e-commerce and marketing infrastructure that runs your business. A successful integration is based on the following aspects:
- [Integration method](#integration-method)
  - [REST API](#rest-api)
  - [Webhooks](#webhooks)
  - [Event-bus – Kafka](#event-bus--kafka)
- [Ecommerce engine](#ecommerce-engine)
  - [Frontend decoupled from the order management logic](#frontend-decoupled-from-the-order-management-logic)
  - [Monolithic commerce solution](#monolithic-commerce-solution)
- [Marketing ecosystem](#marketing-ecosystem)
  - [CDP integrations](#cdp-integrations)
  - [CEP integrations](#cep-integrations)
  - [CMS integrations](#cms-integrations)
  - [CRM integrations](#crm-integrations)
- [Data handling](#data-handling)
  - [Use synchronized data](#use-synchronized-data)
  - [Evaluate data at runtime](#evaluate-data-at-runtime)

![How Voucherify works with your system and our rules engine](https://files.readme.io/494bc1a-guides_getting_started_welcome_to_voucherify_voucherify_workflow_scheme_01.png "How Voucherify works with your system and our rules engine")

## Integration method

As a developer-first tool, Voucherify exposes several integration paths.

### REST API

A rich set of granular REST APIs that help you deliver personalized incentives to any channel, device, and commerce solution while keeping your data in secure, highly available environments in a multi-tenant or dedicated cluster near you.

> 📘 API reference
>
> Check Voucherify's interactive [API Reference](https://docs.voucherify.io/reference/introduction-1 "Voucherify interactive API reference").

### Webhooks

Allow Voucherify to send instant updates to your app or URL endpoints when specific events occur. Rather than constantly checking endpoints for new data, you can **set up webhooks to receive notifications** about critical campaign-related events. 
  
> 📘 Webhook documentation

Learn more about [webhooks](https://support.voucherify.io/article/68-webhooks-notifications "Webhooks notifications in Voucherify").

### Event-bus – Kafka

Voucherify can work with event buses as producers and subscribers.

## Ecommerce engine

Voucherify can be integrated with both headless and monolithic ecommerce solutions.

### Frontend decoupled from the order management logic

This is offered by headless commerce solutions or mobile apps and makes the integration swift. Voucherify [fits well](https://machalliance.org/newsroom/voucherify-io-joins-the-mach-alliance "Voucherify joins the MACH alliance") in the composable commerce ecosystem and has been [successfully deployed](https://www.voucherify.io/customers/breville "How Breville is Winning Digital Transformation with Voucherify and Friends") on a global scale, in both digital and brick-and-mortar scenarios. In addition, Voucherify provides numerous native accelerator plugins to the top ecommerce providers such as:
- [commercetools](https://www.voucherify.io/integrations/commercetools "Next-gen promotions for modern commerce"),
- [Bigcommerce](https://www.voucherify.io/integrations/bigcommerce "Supercharge your online store with personalized promotions"),
- [Emporix](https://www.voucherify.io/integrations/emporix "Enhance the Emporix Digital Commerce Platform with targeted promotions and loyalty programs").
- [Open Source Loyalty Accelerator for Omnichannel Retail](https://www.voucherify.io/blog/open-source-loyalty-accelerator-for-omnichannel-retail "Open Source Loyalty Accelerator for Omnichannel Retail blog post").

### Monolithic commerce solution

The integrated frontend and backend may require extra work to ensure a bi-directional sync with Voucherify. Voucherify's professional services team together with [SI partners](https://www.voucherify.io/partners-directory "Partners who trust Voucherify") gained experience in estimating the total cost of integration and are open to consult your business case. Voucherify's and partners' joint case studies include success stories of connecting Voucherify to various ecommerce platforms from Shopify to SAP Hybris.

## Marketing ecosystem

The promotion experience comes next. Depending on the CDP, CEP, CMS, and CRM platforms you use, Voucherify's team can suggest how to improve the implementation of customer-facing touchpoints, including offer placements and messages. Voucherify can work at scale thanks to integrations with CDP or CEPs and stream processing systems like Kafka. CMS integrations on the other hand help us localize promotions and adjust their format to meet distribution channels’ requirements.

### CDP integrations

Voucherify integrates with popular Customer Data Platforms, such as:
- [Twilio Segment](https://www.voucherify.io/integrations/segment "Make customer data easy to manage and a pleasure to use with Segment"),
- [mParticle](https://www.voucherify.io/integrations/mparticle "Use granular customer data to build better promotions"), allowing you to stream data.

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

### CRM integrations

## Data handling

The data transfer between Voucherify and marketing technology platforms should be considered with respect to **volume** and **data privacy**. Voucherify offers two modes of operations here.

### Use synchronized data

The Voucherify API can **ingest** and **egress** data like product information or customer attributes from and to other systems in real-time, at scale. This, together with **a flexible schema editor** and **auto-complete inputs** in the Dashboard, makes creating new promotion scenarios less error-prone. It will help you ensure data integrity if you have a lot of product-specific discounts or you want to trigger incentives based on aggregated customer attributes.

### Evaluate data at runtime

For security reasons, you may not want to synchronize and maintain customer attributes or product information in Voucherify. In this case, you can send the business context with a validation request and Voucherify will calculate the discount – the “meaning” will be offloaded to the “source of truth” system.

> 📘 Voucherify Partners
> 
> Voucherify partners with leading Solution Integrators that can help you build and maintain promotions and loyalty programs.
>
> Learn more about [our partners](https://www.voucherify.io/partners-directory "Voucherify Partners").