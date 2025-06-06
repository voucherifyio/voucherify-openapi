---
title: Voucherify overview
excerpt: Learn about Voucherify and its possibilities
categorySlug: getting-started
slug: welcome-to-voucherify
type: basic
hidden: false
order: 2
---

## What is Voucherify?

Voucherify is an API-first promotions and loyalty engine. This means you can integrate your platform with a solution that runs personalized campaigns covering:
- coupons – offer your customers code coupons with different discount options,
- auto-applied promotions – apply discounts automatically to customer orders depending on specific conditions,
- gift cards – offer gift cards with defined amounts that can be topped up,
- loyalty programs – create extensive loyalty programs to keep your customer base come back to earn points and get rewards,
- referral programs – engage your customers in referring their friends and family.

<!-- EXPAND WITH LINKS TO NEW IN-DEPTH ARTICLES LATER ON! -->

If you're a marketer and you want to learn more, explore [Voucherify possibilities in general](https://www.voucherify.io/).

<!-- Some better page? TBD! -->

![How Voucherify works with your system and our rules engine](https://files.readme.io/494bc1a-guides_getting_started_welcome_to_voucherify_voucherify_workflow_scheme_01.png "How Voucherify works with your system and our rules engine")

## Who uses Voucherify, why, and how?

Voucherify can be successfully adopted across industries in B2C and B2B contexts: e-commerce, travel, or mobile on-demand services.

Applying targeted promotions at every stage of the customer lifecycle can help you maximize engagement. This way, you can acquire customers through social media promotion, convert them with a welcome offer, grow them as customers with referrals, and ultimately, build better retention tactics with loyalty campaigns and re-engage them with incentives that match their profiles. This ideal scenario is possible with proper integration.

![Promotion lifecycle](https://files.readme.io/bebe00d-guides_getting_started_welcome_to_voucherify_acquisition_to_re-activation_diagram-02.png "Promotion lifecycle showing acquisition, conversion, growth, retention, and re-activation")

At its core, the integration of Voucherify with your system relies on passing relevant context to the Voucherify API, which validates and redeems incentives and rewards in accordance with the rules you set up with the Rules Engine. For more about integrating with Voucherify, explore [Integration overview](ref:integration-overview).

![Integration example](https://files.readme.io/259371c0c8bc05e57bfb6ff42f4184174ffaefad0ce69154071a8c33c0d214b8-guides_getting_started_welcome-to-voucherify-03.png "A schema of an integration between a store and Voucherify, showing the flow of cart and promo code changes between the customer behavior and Voucherify.")

As a [MACH-certified vendor](https://machalliance.org/), Voucherify follows the principles of composability, giving you flexibility and decreasing the time needed for [integration with different tools](https://www.voucherify.io/integrations "Powerful integrations with Voucherify"). This way, you can more easily combine Voucherify with your existing tech-stack that may include:
- Customer Data Platform (CDP)
- Customer Engagement Platform (CEP)
- Customer Relationship Management (CRM) solutions
- Customer Management System (CMS)
- Distribution tools
- Marketing automation platforms

## What problems does Voucherify solve?

Thanks to Voucherify, you can solve the following problems:
- Integrating promotions with external tools and dynamic customer touchpoints.
- Paying too much for promotion maintenance and real-time monitoring of all digital offers.
- Generating unsatisfactory ROI caused by generic offers, simplistic loyalty programs, and promotional fraud.
- Continuously mediating between marketing and development teams' priorities.
- Wasting development time to write extra code to keep multiple promotion and loyalty platforms in sync across applications, brands, and teams.
- Struggling to build branded customer-facing UIs using legacy and monolithic services. <!-- Is this still true since we've removed LP and are about to get rid of cockpits?-->
- Failing to effectively manage traffic spikes and priority changes.
- [Many different promotion cases and issues](https://www.voucherify.io/promotion-examples "Voucherify recipes").
<!-- Anything else? -->

You can achieve this thanks to Voucherify's promotion and loyalty **REST API endpoints** and **a visual Dashboard** to help you with configuration.

## REST API

Thanks to the [Voucherify API](ref:introduction-1), you can support your system or tech-stack with a platform that creates different promotional campaigns. In a basic scenario, Voucherify can show your customers if they are eligible to the incentives you offer them with qualification, check if they can apply them through validation, and then handle incentive use with redemption.

As the Voucherify API is unopinionated, you can pick whatever you need and build your integration in a smart and flexible way.

Additionally, you can use webhooks to track customer activity or even how your promotional campaigns are managed.

<!-- Mention configurable webhooks when it's done -->

## Visual dashboard

You can manage your promotional campaigns with a visual dashboard. There, you can set up your marketing and development team, configure projects, run campaigns, define rules, and more.

Developers use Voucherify dashboard to get API keys, manage integrations with other platforms, check logs, and configure integration-sensitive details, like metadata schemas. Marketers, on the other hand, use the dashboard to create and manage promotional campaigns.

If you want to learn more about the Voucherify dashboard, visit [the support documentation](https://support.voucherify.io/ "Voucherify support documentation").