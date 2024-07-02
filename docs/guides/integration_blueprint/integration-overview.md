---
title: Integration Overview
excerpt: What does the integration entail?
categorySlug: integration-blueprint
slug: integration-overview
type: basic
hidden: false
order: 2
---

## Integration overview

Voucherify offers **a business-agnostic API to model any promotion case**. You can start with a single campaign type and expand to other types later. Thanks to modularity, you can choose which building blocks you need at the moment. This way, you can start small and run bigger projects later without large upfront costs.

A pivotal factor for evaluating the total cost of integration is to understand how Voucherify can be connected to your e-commerce and marketing infrastructure that runs your business. There are three angles to consider.

![How Voucherify works with your system and our rules engine](https://files.readme.io/494bc1a-guides_getting_started_welcome_to_voucherify_voucherify_workflow_scheme_01.png "How Voucherify works with your system and our rules engine")

## Ecommerce engine

### Front-end decoupled from the order management logic

This is offered by headless commerce solutions or mobile apps and makes the integration swift. Voucherify [fits well](https://machalliance.org/newsroom/voucherify-io-joins-the-mach-alliance "Voucherify joins the MACH alliance") in the composable commerce ecosystem and has been [successfully deployed](https://www.voucherify.io/customers/breville "How Breville is Winning Digital Transformation with Voucherify and Friends") on a global scale, in both digital and brick-and-mortar scenarios. In addition, Voucherify provides numerous native plugins to the top ecommerce providers such as [commercetools](https://www.voucherify.io/integrations/commercetools "Next-gen promotions for modern commerce"), [Bigcommerce](https://www.voucherify.io/integrations/bigcommerce "Supercharge your online store with personalized promotions"), or [Emporix](https://www.voucherify.io/integrations/emporix "Enhance the Emporix Digital Commerce Platform with targeted promotions and loyalty programs").

### Monolithic commerce solution

The integrated frontend and backend may require extra work to ensure a bi-directional sync with Voucherify. Our professional services team together with [SI partners](https://www.voucherify.io/partners-directory "Partners who trust Voucherify") gained experience in estimating the total cost of integration and are open to consult your business case. Our joint case studies include success stories of **connecting Voucherify to various ecommerce platforms from Shopify to SAP Hybris**.

## Marketing ecosystem

The promotion experience comes next. If we learn what **CDP**, **CEP**, and **CMS** platforms you use, we can suggest how to streamline the implementation of customer-facing touchpoints, including offer placements and messages. We can work at scale thanks to **integrations with CDP/CEPs** and **stream processing systems like Kafka**. CMS integrations on the other hand help us localize promotions and adjust their format to meet distribution channels’ requirements.

## Data ownership

The data transfer between Voucherify and martech platforms should be considered with respect to **volume** and **data privacy**. Voucherify offers two modes of operations here.

### Use synchronized data

Our API can **ingest** and **egress** data like product information or customer attributes from and to other systems in real-time, at scale. This combined with **a flexible schema editor** and **auto-complete inputs** in the Dashboard makes creating new promotion scenarios less error-prone. It will help you ensure data integrity if you have a lot of product-specific discounts or you want to trigger incentives based on aggregated customer attributes.

### Evaluate data at runtime

For security reasons, you may not want to synchronize and maintain customer attributes or product information in Voucherify. In this case, you can send the business context with a validation request and Voucherify will calculate the discount – the “meaning” will be offloaded to the “source of truth” system.

> 📘 Voucherify Partners
> 
> Voucherify partners with leading Solution Integrators that can help you build and 
maintain promotions and loyalty programs.
>
> Learn more about [our partners](https://www.voucherify.io/partners-directory "Voucherify Partners").