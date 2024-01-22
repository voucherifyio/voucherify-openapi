---
title: Campaign Limits
excerpt:
categorySlug: integration-blueprint
slug: campaign-limits
type: basic
hidden: false
order: 10
---

> 📘 **Goals**
>
> - Identify how the lack of limits impacted the ROI of previous campaigns.
> - Learn the built-in validation rules of Voucherify.
> - Discover how to extend your campaigns with custom limits built on top of business-specific restrictions. 

> 👍 **Outcome**
> 
> Ability to build advanced promotion limits to personalize your campaigns and prevent fraud.

---


You now must zoom in on **who can and who cannot use your promotions**. There are four key verticals you should examine:

- **Customers & customer attributes**
- **Cart structure & product information**
- **Campaign budget and redemption limits**
- **Custom attributes & events**

For each campaign, **you can mix and match more validation rules from each vertical** using a Boolean logic and define the eligibility timeframe for individual campaign objects, such as incentive, promotion tier, or loyalty earning rule.

![Validation rule builder](https://files.readme.io/df4c130-guides_integration_blueprint_campaign_limits-01.png "The rule builder for campaign validation")

## Customers and customer attributes

Voucherify can be used to **collect**, **update**, **store**, and **export customer data**. With data synced to Voucherify, you can [build segments](https://support.voucherify.io/article/51-customer-segments "Customer segments") or build limits on top of customer data. You must decide what data is important for your campaigns. You can use any data for segmentation, targeting, or messaging.

![](https://files.readme.io/5668eba-guides_integration_blueprint_campaign_limits-02.png "Validation rule UI")

## Cart structure and product information

Integrating Voucherify with your inventory allows you to launch **product-specific campaign**s and **add physical rewards to your loyalty and referral programs**. When the product data is synced, you can quickly:

- Restrict promotions to apply to certain products or develop “buy X get Y” scenarios
- Exclude products and SKUs from campaigns. 
- Create earning rules based on cart structure for loyalty programs.
- Build static and dynamic product collections to use in validation.
- Define product attributes using metadata.

> 📘 Identifiers
>
> Syncing customer and product data is optional. Instead of syncing data, you can use an external customer or product identifier to provide relevant attributes during validation.

## Promotion budget

Voucherify offers **safety switch limits** that work hand in hand with customer profile- and cart-based validation rules. You can configure a campaign in a way that automatically stops when the campaign target is satisfied, for example:

- Redemptions per customer in a specific timeframe.
- Redemptions per code in a specific time frame.
- Maximum discount for a percentage deal.
- Total order value, discounted amount, and total number of redemptions.


## Custom attributes and events

Custom attributes (also called metadata) allows you to add custom fields to Voucherify. The schema configuration ensures custom data integrity by supporting various data types, including **arrays**, **data limits**, and **nesting**. You can also map [custom events](https://docs.voucherify.io/reference/track-custom-event "Track custom events")  that can trigger promotion-related  activities, such as promo code send-out.

![Custom attributes and events](https://files.readme.io/50b1ea8-guides_integration_blueprint_campaign_limits-03.png "Metadata and events")