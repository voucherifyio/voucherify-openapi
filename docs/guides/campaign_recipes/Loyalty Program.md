---
title: Loyalty Program
excerpt: Learn how to use Voucherify API to build a loyalty program
categorySlug: campaigns-recipes
slug: loyalty-program
type: link
hidden: false
order: 5
link_url: https://support.voucherify.io/article/491-getting-started-with-loyalty-programs
---

<!-- IT'S A REDIRECT UNTIL WE GET BACK TO THIS WITH A MORE DEV-ORIENTED CONTENT -->

> 👍 Before you start
>
> Read the [loyalty program user guide](https://support.voucherify.io/article/177-how-to-create-loyalty-program-step-by-step) to get an overview of this campaign type.
>
> You can also check out the Voucherify [Loyalties scenario Postman Collection](https://www.postman.com/voucherify/workspace/voucherify-s-public-workspace/folder/31663208-c89902a3-6211-48dc-8844-103249c92177).

## Prerequisites
To create a loyalty campaign, you need to:
- [Track Custom Events](ref:track-custom-event "Track Custom Event Endpoint") in Voucherify,
- [Synchronize Orders](doc:data-synchronization#order-synchronization "Order Synchronization").

By synchronizing orders, you can use the Order Paid Earning Rule. 

By tracking custom events, you can reward customers with points for custom actions.

## Creating Rewards

In the Voucherify dashboard, go to the [rewards catalog](https://app.voucherify.io/#/app/core/rewards). There, you can add new rewards and see all the current rewards that are used throughout your campaigns. Voucherify offers the following reward options:

- Digital rewards - this can be a unique discount coupon or gift card credits,
- Material rewards - available only in referral and loyalty programs,
- Pay with points reward - available only in loyalty programs.

While creating a new loyalty campaign in the dashboard, you can use existing discount coupons and gift cards or you can create a new one when you create the campaign.

With the API, you can first create a reward object with a dedicated [Create Reward endpoint](https://www.postman.com/voucherify/workspace/voucherify-s-public-workspace/request/699307-ee3bedd0-981b-4dfc-baee-42e9b311f6bd "Create Reward in the Voucherify Postman Collection"). Then, you can assign the reward to a specific campaign with the [Create Reward Assignment endpoint](https://www.postman.com/voucherify/workspace/voucherify-s-public-workspace/request/699307-136170a1-ebd3-49d7-92b0-f5de31e5261d "Create Reward Assignment in the Voucherify Postman Collection").

## Create Loyalty Campaign

Loyalty campaigns consist of several key elements:

1. **Earning Rules** - earning rules define actions that customers must take to receive loyalty points and, as a result, redeem points for loyalty rewards. Using validation rules, you can extend each earning rule with metadata and additional constraints.

2. **Rewards** - the rewards catalog collects all rewards that your customers can exchange points for. To define your catalog, prepare rewards beforehand in the Rewards tab in the Voucherify dashboard, use the [Create Reward API endpoint](ref:create-reward "Create Reward API Endpoint Documentation"), or add new rewards on the spot while creating a loyalty campaign.

3. **Tiers** - with the tier functionality, you can create different membership levels in your loyalty program. Customers have two options for qualifying for a tier: points-based and time-based. Each tier has its rewards and earning rules mapping. It means that the same earning rules and rewards can be assigned to a different point value.

The first step is to [create a loyalty campaign](https://www.postman.com/voucherify/workspace/voucherify-s-public-workspace/request/699307-9858c31e-13bf-453e-aa18-647184c3395a "Create Loyalty Campaign Endpoint in the Voucherify Postman Collection") that defines the code structure, loyalty card assignment behavior, and name a few of the most important parameters.

## Create Earning Rules

You can create eight types of [earning rules](https://www.postman.com/voucherify/workspace/voucherify-s-public-workspace/request/699307-e52569c9-7b88-4638-a1f3-b8bebe8ee58a?tab=body "Create Earning Rule Endpoint in the Voucherify Postman Collection") in Voucherify based on: 

- customer segments, 
- paid orders, 
- custom events that customers perform in your application or website,
- customer joining the loyalty tier structure,
- customer leaving the loyalty tier structure,
- customer's loyalty tier upgrade,
- customer's loyalty tier downgrade,
- customer's loyalty tier prolongation.

Here are some ideas of the earning rules that you can use in your loyalty campaigns:

1. 100 points on the customer's birthday,
2. 250 points after not making any orders in the last 365 days to encourage customers to make a purchase,
3. 500 points for joining the Gold Loyalty Tier,
4. 10 points for every $10 spent if your purchase is above $50,
5. 5 points for every $1 spent on the new collection,
6. 10 points for leaving a 5/5 star review.

> 🚧 Maximum number of earning rules
>
> You can create up to 100 earning rules per project. The limit can be customized for clients with a single-tenant setup.

## Assigning Rewards

You can assign multiple rewards to a loyalty program by using the [Create Reward Assignment](https://www.postman.com/voucherify/workspace/voucherify-s-public-workspace/request/699307-c3e60c24-99c8-4236-9f0e-11dd4a43bc98?tab=body "Create Reward Assignment Endpoint in the Voucherify Postman Collection") API call. 

## Tiers 

You can create tiers during the campaign creation process in the dashboard or by using the [Create Loyalty Tiers](https://www.postman.com/voucherify/workspace/voucherify-s-public-workspace/request/699307-5361f9d7-fa58-4ef5-b1e3-e1dac5be5913?tab=body "Create Loyalty Tier Endpoint in the Voucherify Postman Collection") API call.

## Point and tier calculation on a new day

Loyalty points and tiers are recalculated on a midnight of a new day according to an internal Voucherify mechanism. This occurs every day on a midnight in the timezone set in Project settings.

This mechanism works as follows:

1. Pending point activation  
   At a pending point bucket level, the activation date is set by specifying when the points are going to be activated. For example, a 2026-01-01 activation date means that points will be activated on 2026-01-01 00:00.
2. Auto-redeem  
   After the pending points have been activated, there is a check if the points have to be automatically spent on a reward, so no other effect occurs, like a tier upgrade.
3. Loyalty tier recalculation  
   Based on tier settings, the following actions are performed:
   - Recalculation of expiring tiers: an expiration date is set by specifying when the tier will expire. For example, a 2025-12-31 expiration date means that tier will expire on 2026-01-01 00:00 (this is the same date and time as pending point buckets). As a result, the customer can upgrade, downgrade, leave, or prolong their tier.
   - Recalculation of tiers if a new calculation period starts.
4. Loyalty point expiration  
   At an expiration bucket level, the expiration date is set by specifying when the points are going to be deducted. For example, a 2025-12-31 expiration date means that points will be deducted on 2026-01-01 00:00 (this is the same date and time as pending point buckets).
5. Loyalty tier recalculation based on the point balance after point expiration  
   Once the points are deducted, the balance changes so that the balance-based tiers are updated accordingly.

## Customer Experience

The customer experience flow is based on the [Loyalties Scenario Postman Collection](https://www.postman.com/voucherify/workspace/voucherify-s-public-workspace/folder/31663208-e54d9b37-8d0b-4e2e-8ca6-47878e52daba "Loyalties Scenario in the Voucherify Postman Collection").

1. Assign Customers to a Loyalty Campaign

You can add customers manually in the Voucherify dashboard from a selected campaign view or with the [Add Member](https://www.postman.com/voucherify/workspace/voucherify-s-public-workspace/request/31663208-1a9eb97d-3d6c-49af-9642-2749d35bf6ef "Add Member Endpoint in the Voucherify Postman Collection") API endpoint. Customers can also join loyalty program automatically after fulfilling any earning rule.

2. Earn Points

Points can be earned in multiple ways. In the above-mentioned Loyalties Scenario, the customer is rewarded 10 points for every $10 spent. It is an `order paid` event so it is necessary to [create an order](https://www.postman.com/voucherify/workspace/voucherify-s-public-workspace/request/31663208-11e7ce18-1501-4d74-a67c-039da0dbac68 "Create Order Endpoint in the Voucherify Postman Collection").

3. Show the details of the program:
   1. Show Earning Rules - you can use the [List Earing Rules](https://www.postman.com/voucherify/workspace/voucherify-s-public-workspace/request/31663208-f1af855a-9095-4239-9ecb-196cea530b5d?tab=body "List Earning Rules Endpoint in the Voucherify Postman Collection") API endpoint to display all available actions that will reward customers with points. 
   2. Show Rewards - when it comes to displaying rewards, you can either show [all available rewards](https://www.postman.com/voucherify/workspace/voucherify-s-public-workspace/request/31663208-9d395784-64b0-4465-98f0-7c1086b3335d "List Member Rewards – All Endpoint in the Voucherify Postman Collection"), or only the [currently affordable rewards](https://www.postman.com/voucherify/workspace/voucherify-s-public-workspace/request/31663208-796277fc-2e37-4fa1-a542-54cbe8638fcc "List Member Rewards – Affordable Only Endpoint in the Voucherify Postman Collection").
   3. Show Tiers - using the [List Member's Loyalty Tiers](https://www.postman.com/voucherify/workspace/voucherify-s-public-workspace/request/31663208-535ac8dc-a91c-4836-92e4-3a972219e6d2?tab=body "List Member's Loyalty Tiers Endpoint in the Voucherify Postman Collection") API endpoint, you can inform your customer about tier(s) they are currently in. Another possibility is to [List Loyalty Tiers](https://www.postman.com/voucherify/workspace/voucherify-s-public-workspace/request/699307-d744a047-ff33-4e0d-b3a4-0db6923bbe02?tab=body "List Loyalty Tiers Endpoint in the Voucherify Postman Collection") from a given campaign.
   4. Paying with Points - if the `pay with points` reward is active in the loyalty program, you can use the [Redeem Reward](https://www.postman.com/voucherify/workspace/voucherify-s-public-workspace/request/699307-80ca2389-7b89-4d2f-b0b0-843e52d4f126 "Redeem Reward Endpoint in the Voucherify Postman Collection") API endpoint to specify how many points are going to be used.
   5. Reedeming Points for Rewards - you can use the [Redeem Reward](https://www.postman.com/voucherify/workspace/voucherify-s-public-workspace/request/31663208-36b2ab68-a684-4d85-97f7-e628e39b42da?tab=body "Redeem Reward – Voucher Endpoint in the Voucherify Postman Collection") API endpoint to spend loyalty points on different rewards available in the loyalty program.