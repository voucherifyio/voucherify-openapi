---
title: Key Concepts
excerpt: Learn the key concepts to help you implement promotional campaigns and integrate Voucherify with your stack.
categorySlug: getting-started
slug: key-concepts
type: basic
hidden: false
order: 6
---

Voucherify operates on fundamental building blocks that you can use to create your promotional campaigns and integrate them with your system.

## Project

A project is an environment for managing promotion activities in Voucherify. A project can be used to run those activities concerning a brand, region, or currency or for development or staging purposes.

Each project has a set of different API keys.

<!--I think this is too detailed at this stage:

Here are some project-specific settings:
- unique API keys
- currency
- time zone
- case sensitive or insensitive voucher codes
- team structure
- email domain and webhooks
- metadata and event schema  -->

> 📘 Learn more
> - [Team and project settings](https://support.voucherify.io/article/120-account-settings#project-settings) article

## Campaigns and vouchers

### Campaign

A campaign is a basic entity in Voucherify that is used to carry out promotional activities. 

There are five basic campaign types, which create:
- [discount coupons](doc:discount-effects),
- [gift vouchers](doc:prepaid-gift-cards),
- [referral codes](doc:referral-program),
- [promotions](doc:stacking-promotion-tiers),
- [loyalty cards](doc:loyalty-program).

> 📘 Learn more
> - [Campaign](ref:campaign-object) API reference

### Voucher

A voucher is an entity in Voucherify that is used as an incentive for end customers. Every voucher has a unique code.

Vouchers can be grouped under one campaign to serve the same purpose, e.g. a campaign that assigns vouchers to customers who have a birthday.

A voucher can be also used outside of a campaign as a **standalone voucher**. Standalone vouchers can be shared with a large group of customers or made public for big promotional activities, e.g. Black Friday.

A voucher is used in the following types of campaigns:
- [discount coupons](doc:discount-effects),
- [gift vouchers](doc:prepaid-gift-cards),
- [referral codes](doc:referral-program),
- [loyalty cards](doc:loyalty-program),
- [giveaways](https://support.voucherify.io/article/187-how-to-create-a-giveaways-program).

> 📘 Learn more
> - [Voucher](ref:voucher-object) API reference

### Promotions and promotion tiers

A promotion is a campaign that groups specific discounts and it does not require a voucher to be applied to a customer's cart. When a customer or their cart qualifies for a promotion, the discount is automatically applied to the cart or it can be shown to the customer as a part of the [qualification](#qualification) process.

A promotion tier is a specific discount with conditions. The discount is automatically applied to the customers and carts that meet the conditions.

Promotion tiers can be applied together as a promotion stack or arranged in a hierarchy of an application in one promotion campaign.

> 📘 Learn more
> - [Promotion tier](ref:promotion-tier-object) API reference

## Customer

A customer is an entity in Voucherify that represents an end customer of a store. A customer can be assigned vouchers or be eligible for promotions.

A customer object can have many parameters, e.g.:
- name,
- email,
- birthdate,
- metadata.

> 📘 Learn more
> - [Customer object](ref:customer-object) API reference

### Customer segments

A segment is a customer group that shares the same parameters.

There are two types of segments in Voucherify:
- **static**: it contains the same group of customers,
- **auto-update**: customers are dynamically added to or removed from the segment if they match a given filter, e.g., the customer's birthday is today.

> 📘 Learn more
> - [Customer segments](https://support.voucherify.io/article/51-customer-segments) article

## Incentivization rules and processes <!-- TBD -->

In Voucherify, you can set rules that govern how incentives, such as vouchers or discounts, are applied. Also, the incentives can be managed under several processes related to their application. 

### Validation rules

Validation rules are conditions that are applied to campaigns, standalone vouchers<!--, Earning Rules – but then we need to define what earning rules are -->, promotion tiers, or distributions. For example, the customer or their cart must meet the conditions for the incentive to be applied.

A validation rule can be created in advance. It is an independent object which can be attached to or detached from the above-mentioned objects to be reused in the future.

> 🚧 Managing validation rules
> 
> It is recommended to create validation rules in the Voucherify dashboard. The rule builder in the dashboard helps configuring the desired conditions in a convenient way. The API should not be used as a preferable way to create and manage validation rules.

> 📘 Learn more
> - [Validation rule](ref:validation-rule-object) API reference
> - [Validation rules and campaign limits](https://support.voucherify.io/article/529-validation-rules-campaign-limits#reference) article

### Qualification

Qualification is the process that validates which incentives (e.g. products, vouchers, or promotions) can be used in the customer's cart.

> 📘 Learn more
> - [Qualification](ref:check-eligibility) API reference
> - [Qualification – checking eligibility](doc:checking-eligibility) article

### Validation

Validation is the process that checks if a combination of vouchers or promotion tiers together with the applied validation rules are valid to the customer. On the basis of validation, the final price is calculated. Validation checks up to 30 vouchers or promotion tiers.

> 📘 Learn more
> - [Validate stackable discounts](ref:validate-stacked-discounts) API reference

<!-- https://docs.voucherify.io/reference/validate-stacked-discounts-client-side -->

### Redemption

Redemption is the process of applying vouchers or promotion tiers to the customer's order. Redemption checks if a voucher or promotion tier together with the applied validation rules is valid to the customer. Redemption checks up to 30 vouchers or promotion tiers.

> 📘 Learn more
> - [Redeem stackable discounts](ref:redeem-stacked-discounts) API reference

<!-- https://docs.voucherify.io/reference/redeem-stacked-discounts-client-side -->

### Rollback

Rollback is the process in which redemption is reverted. Rollback withdraws the incentive from the customer's order and updates its status.

> 📘 Learn more
> - [Rollback stackable discounts](ref:rollback-stacked-redemptions) API reference

## Communication <!-- TBD -->

### Distribution

Distribution is a process of sending vouchers and other promotional messages to end customers.

There are two types of distributions:
- **automatic**: it is triggered by an event,
- **manual**: the message is sent to all end customers or a specified group.

<!-- Examples of automatic distribution events?
(e.g., somebody signs up for your newsletter or abandons a cart or it's the 10th time they make a purchase in your store)
-->

Distribution channels include, among others:
- emails,
- text messages,
- live chat,
- push notifications. <!-- anything else worth mentioning?-->

> 📘 Learn more
> - [Getting started with distributions](https://support.voucherify.io/article/19-how-does-the-distribution-manager-work) article

### Publication

Publication is the process of assigning a voucher to an end customer. Distribution triggers a publication API request.

> 📘 Learn more
> - [Publication](ref:publication-object) API reference

### Webhooks

A webhook is an HTTP callback that is triggered by an event rather than a request. Webhooks can be used to notify external systems about any events or relevant actions performed with Voucherify.

The events can be custom. Custom events are objects that can be used to track end-customer interactions with a system.

> 📘 Learn more
> - [Custom event](ref:custom-event-object) API reference
> - [Webhook notifications](https://support.voucherify.io/article/68-webhooks-notifications) article
> - [Custom events](https://support.voucherify.io/article/111-custom-events) article

## Custom attributes (metadata)

Custom attributes (metadata) are customizable data that can be added to default Voucherify objects. A custom attribute consists of a key and value pair.

> 📘 Learn more
> - [Metadata schema](ref:metadata-schema-object) API reference
> - [Metadata mapping](doc:metadata-mapping) article
> - [Getting started with metadata](https://support.voucherify.io/article/99-schema-validation-metadata) article

<!--

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
-->
