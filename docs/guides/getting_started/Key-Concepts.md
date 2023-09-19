---
title: Key concepts
excerpt: Voucherify offers several building blocks to help you implement promotional campaigns and integrate it with your stack. 
category: 639ba16d677235008f80043f
slug: key-concepts
type: basic
hidden: false
order: 4
---

Voucherify splits each campaign into 5 stages:

1. Defining which customers, products, and order structures are eligible for the promotion.
2. Defining a discount/reward value.
3. Notifying customers about the promotion.
4. Validating and redeeming the discount/reward.
5. Monitoring promotion performance across channels.

Voucherify supports six basic campaign types which you can further adjust to your needs: [coupon campaigns](doc:discount-effects), [referral programs](doc:referral-program), [gift cards](doc:prepaid-gift-cards), [cart-level promotions](doc:stacking-promotion-tiers), [loyalty programs](doc:loyalty-program), [giveaways](doc:give-item-for-free-unit-discount).

Every promotion type implements these five stages in a slightly different way, but the general approach is the same – Voucherify validates if a customer at the checkout is eligible to get a discount/reward. 

They are eligible if at least one of two conditions is met:

* They have a code (e.g. coupon, referral code, a gift card) and they match predefined eligibility conditions
* They match predefined promotion conditions (e.g. in-cart promotions based on cart structure and customer attributes, earning enough loyalty points to be rewarded, or drawn in a giveaway lottery).

Let's take a look at how Voucherify objects come into play when implementing a campaign workflow.

The general idea is that the more often you stick to our conventions, the less time you need to build your promo software. But, we said "often," not without a reason. 

Voucherify doesn't want to enforce any rigid structures. After all, the only required action is to call the redemption method and provide something to redeem. We believe this approach should give your team the freedom and flexibility to respond to opportunities and changing demands.

## Voucherify objects

When you visit Voucherify [API reference](ref:introduction-1), you'll notice that the platform provides CRUD endpoints for every object which takes part in the promotion workflow. Let's run through the most important ones.


## Redemption

Let's start off with the most important. Irrespective of the campaign type, every time you want to apply an incentive to a customer's cart, you need to invoke the [redemption](ref:redeem-voucher). 

This does two things: first, it validates if a customer and the current context (customer, order structure, metadata) are eligible for a discount. Second, it stores a redemption object with details about successful or failed redemption attempts. 

[Redemption](doc:redemption) reference
[Redemptions in dashboard](https://support.voucherify.io/article/20-how-can-i-track-redemptions)
[Stacking discounts](doc:manage-stackable-discounts) 

There are three things you can redeem:

* [Redeem Voucher](ref:redeem-voucher)  use for coupons, gift cards, referral programs
* [Redeem Promotion](ref:redeem-promotion) use for cart-level promotions
* [Redeem Reward](ref:redeem-reward) use for loyalty programs


## Voucher

A [voucher](ref:get-voucher) represents a voucher/coupon/referral/gift certificate code. The core feature of a voucher is its unique code and discount value. Each voucher also has (optionally) a start and expiration date, a validity timeframe, a code pattern, a redemption count limit, a status (active/inactive), and a link to the respective QR and barcode. A voucher can exist as a standalone instance (e.g. “BLCKFRDY”) or as part of a [campaign](doc:campaigns) (bulk unique codes sharing the same properties).

[Voucher](doc:vouchers) reference
[Vouchers in dashboard](https://support.voucherify.io/article/512-complete-user-guide-on-discounts)


## Promotion tier

This [object](ref:list-promotion-tiers) represents a discount that is automatically applied to eligible customers. To define `conditions` when the promotion should be applied, you can use customer attributes and history as well as information about the order structure. The tier also comes with a `banner` you can display on your web and mobile apps to entice customers to put more items into their carts. 

[Promotion tier](doc:promotion-tier) reference
[Promotions in dashboard](https://support.voucherify.io/article/519-create-cart-level-promotions)


## Earning rules and rewards

These two objects are relevant for [loyalty programs](doc:loyalty-program). The [Earning Rule object](ref:get-earning-rule) defines an action (event) that assigns a particular number of loyalty points to a customer's account. There are three types of events that you can use in earning rules: a customer entered a segment, an order paid event, or a custom event.

Whereas the Reward object enables you to add coupons, gift cards, material products, or a “pay with points” option as rewards in your program. Each reward is defined in a separate [Reward object](ref:get-reward) and can be mapped to a specific amount of loyalty points with the [Reward Assignment object](ref:list-reward-assignments).

[Earning rules](doc:earning-rules) and [Rewards](doc:rewards) reference
[Earning rules and rewards in dashboard](https://support.voucherify.io/article/491-getting-started-with-loyalty-programs)


## Campaign

Both vouchers and promotion tiers can be grouped into a [campaign](ref:get-campaign). In the case of vouchers, the campaign can be used to control and monitor them in bulk. For example, define the number and pattern of generated codes, set expiration dates, deactivate all codes in one click, etc. In the case of promotion tiers, it's a collection of tiers that you can use when listing active promotions. Besides coupon and promotion tiers, you can create gift card, referral, loyalty, and giveaway campaigns.

[Campaigns](doc:campaigns) reference
[Campaigns in dashboard](https://support.voucherify.io/article/64-maintenance)


## Validation rules

The heart of Voucherify is the rules engine which you can use to set up promotion limits. They can include various constraints, e.g.:


* Audience – [customer](doc:customers) object stores customer’s attributes and behavior; customers can be grouped into [segments](doc:customers#segments)  (e.g., customers: from London who made a redemption at least once, who made a purchase for more than $1000, etc.).
* Order structure – [products](doc:products) provide abstraction for your product catalog structure (products, SKUs, lines, manufacturers, etc.). This also includes the product prices directory which allows for validation rules based on a particular price tag (e.g., give 10% if a product costs more than $100). [Order](ref:orders) stores the context of the transaction (status, total amount, products in the cart).
* Campaign budget – controls the current promotion performance, e.g., you can stop the campaign automatically if the overall value of discounted orders exceeds a given amount.
* Metadata – checks if any custom attribute passed to the redemption endpoint matches predefined criteria. An example would be to accept orders only from the mobile app.

[Validation rules](doc:validation-rules) reference
[Validation rules in dashboard](https://support.voucherify.io/article/529-validation-rules-campaign-limits)

## Metadata

Voucherify allows you to enhance default objects with custom attributes. You can attach a set of key-value pairs, nested objects, and arrays to objects. Additionally, you can define their schema and validate data sent to the platform.

Voucherify supports the following types for the custom fields: `text`, `number`, `flag`, `date`, `date time`, `image URL`, `object`, `geopoint`. Additionally, `text` and `number` can be restricted by rules like `is less than`, `is equal to`, `max length` etc.

[Metadata](doc:metadata-custom-fields) reference
[Metadata in dashboard](https://support.voucherify.io/article/99-schema-validation-metadata)

## Events & Webhooks

If you want to build validation rules around the recency and frequency of a given behavior, you can use custom [events](ref:track-custom-event). These are objects best suited for tracking high-value customer interactions with your application. [Webhooks](doc:webhooks) on the other hand can be used to notify external systems about any relevant actions performed with Voucherify.

[Events](ref:track-custom-event) reference
[Events in dashboard](https://support.voucherify.io/article/111-custom-events)

## Distributions & Publication

Voucherify offers tools for sending out codes (unique coupons, referral codes, gift cards, loyalty cards) and other promotional messages like (“you earned 10 loyalty points”) to customers. The possible channels include but are not limited to: email, SMS, live chat, push notifications.

You can trigger a message [automatically](doc:automatic-delivery) in response to a predefined event (e.g., somebody signs up for your newsletter or abandons a cart or it's the 10th time they make a purchase in your store). Or, you can define a static segment and send manual messages to all members at once.

Distribution triggers a publication request behind the scenes. [Publication](doc:distribution#publish-with-the-api) is the process of assigning a promo code to a particular customer. Each unique code can be published to one customer only. Using this feature, you can track who received the code already and who hasn't. You can call the publication endpoint manually as well.

[Distribution](doc:distribution) reference
[Distribution in dashboard](https://support.voucherify.io/article/19-how-does-the-distribution-manager-work)