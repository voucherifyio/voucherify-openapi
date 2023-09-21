---
title: Campaigns
excerpt: 
categorySlug: building-blocks
slug: campaigns
type: basic
hidden: false
order: 6
---

To have full control and overview of `promo codes` and `promotion tiers` you should use campaigns. Because this is one of the must-use components, Voucherify offers several endpoints and attributes to help you integrate promo campaigns with your infrastructure.

> 📘 Object definition
> 
> [Campaign object reference](ref:get-campaign)

## Bulk update

The update method allows you to change multiple vouchers or promotion tiers in a single request. The fields you can update in this mode: `start_date`, `expiration_date`, `metadata`, `description`, `type`.

Keep in mind that in the case of promo code campaigns the change will be propagated only to **unpublished** and **unredeemed** vouchers. You can still edit such a voucher [directly](ref:update-voucher).

## Performance monitoring

If you use the [list endpoint](ref:list-campaigns), you'll get the redemption count for all of your campaigns. You can additionally filter them out with `campaign_type`  Possible options: `DISCOUNT_COUPONS`, `PROMOTION`, `GIFT_VOUCHERS`, `REFERRAL_PROGRAM`.

## Promo code-based campaigns utils

Usually, voucher campaigns are created in the dashboard by marketers. But sometimes you might want to interact with them programmatically. Apart from standard CRUD methods, you can:

- [Extend](ref:add-vouchers-to-campaign) campaigns with new codes according to campaign attributes.
- Import vouchers to a campaign with [JSON](ref:import-vouchers-to-campaign) and [CSV](ref:import-vouchers-to-campaign-using-csv) payloads.


## Promotion tier-based campaigns utils

When it comes to auto-applied promotion discounts, you can use campaigns to [stack](ref:add-promotion-tier-to-campaign) multiple tiers together.
