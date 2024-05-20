---
title: Loyalty Program
excerpt: null
categorySlug: campaigns-recipes
slug: loyalty-program
type: basic
hidden: false
order: 5
---

In this tutorial, you’ll learn how to use Voucherify API to build a loyalty program.

> 👍 Recommended
>
> Read the [loyalty program user guide](https://support.voucherify.io/article/177-how-to-create-loyalty-program-step-by-step) to get an overview of this campaign type.
>
> You can also check out our [Loyalties scenario Postman Collection](https://www.postman.com/voucherify/workspace/voucherify-s-public-workspace/folder/31663208-c89902a3-6211-48dc-8844-103249c92177).

## Prerequisites
To create a `loyalty campaign`, you need two prerequisites:
* **Custom Events**
* **Orders**

Synchronizing `orders` allows the use of the `Order Paid Earning Rule`, and synchronizing `custom events` allows us to reward customers with points for the custom events.

## Creating Rewards

In Voucherify’s dashboard, you have access to a [rewards catalog](https://app.voucherify.io/#/app/core/rewards) where you can add new rewards and see all the current rewards that are being used throughout your campaigns. Voucherify offers the following options when it comes to rewards:

* Digital rewards - this can be a unique discount coupon or gift card credits,
* Material rewards - available only in referral/ loyalty programs
* Pay with points reward - available only in loyalty programs

While creating a new loyalty campaign in the dashboard, you can tap into existing discount coupons and gift cards or you can create a new one during the campaign creation process. 

With the API, you can first create a reward object with a dedicated [endpoint](https://www.postman.com/voucherify/workspace/voucherify-s-public-workspace/request/699307-ee3bedd0-981b-4dfc-baee-42e9b311f6bd) and then you can assign it to a specific campaign using another dedicated [endpoint](https://www.postman.com/voucherify/workspace/voucherify-s-public-workspace/request/699307-136170a1-ebd3-49d7-92b0-f5de31e5261d).

## Create Loyalty Campaign

Loyalty Campaigns consist of several key elements:

1. **Earning Rules** - earning rules define actions that customers must take to receive loyalty points and, as a result, redeem points for loyalty rewards. Using validation rules, you can extend each earning rule with metadata and additional constraints.

2. **Rewards** - the rewards catalog collects all rewards that your customers can exchange points for. To define your catalog, prepare rewards beforehand in the Rewards tab or add new rewards on the spot while creating a loyalty campaign.

3. **Tiers** - The tiering functionality allows you to create different membership levels in your loyalty program. Customers have two options for qualifying for a tier: points-based and time-based. Each tier has its rewards and earning rules mapping. It means that the same earning rules and rewards can be assigned to a different points value.

The first step is to [create a loyalty](https://www.postman.com/voucherify/workspace/voucherify-s-public-workspace/request/699307-9858c31e-13bf-453e-aa18-647184c3395a) definition that defines the code structure, loyalty card assignment behavior, and name a few of the most important parameters.

## Create Earning Rules

You can create eight types of [earning rules](https://www.postman.com/voucherify/workspace/voucherify-s-public-workspace/request/699307-e52569c9-7b88-4638-a1f3-b8bebe8ee58a?tab=body) in Voucherify based on: 

* customer segments, 
* paid orders, 
* custom events that customers perform in your application/website,
* customer joining the loyalty tier structure,
* customer leaving the loyalty tier structure,
* customer's loyalty tier upgrade,
* customer's loyalty tier downgrade,
* customer's loyalty tier prolongation.

Here are some ideas of the earning rules that you can use in your loyalty campaigns:

1. 100 points for customer's birthday,
2. 250 points after not making any orders in the last 365 days (to encourage customers to make a purchase),
3. 500 points for joining the Gold Loyalty Tier,
4. 10 points for every 10$ spent if your purchase is below $50,
5. 5 points for every $1 spent on the new collection,
6. 10 points for leaving a 5/5 star review.

## Assigning Rewards

You can assign multiple rewards to a loyalty program by using the [Create Reward Assignment](https://www.postman.com/voucherify/workspace/voucherify-s-public-workspace/request/699307-c3e60c24-99c8-4236-9f0e-11dd4a43bc98?tab=body) API call. 

## Tiers 

You can create tiers during the campaign creation process in the dashboard or by using the [Create Loyalty Tiers](https://www.postman.com/voucherify/workspace/voucherify-s-public-workspace/request/699307-5361f9d7-fa58-4ef5-b1e3-e1dac5be5913?tab=body) API call.

## Customer Experience

The customer experience flow will be based on our new Loyalties scenario Postman Collection.

1. Assign customers to a Loyalty Campaign

You can add customers manually via the dashboard from a selected campaign view or via the [Add Member](https://www.postman.com/voucherify/workspace/voucherify-s-public-workspace/request/31663208-1a9eb97d-3d6c-49af-9642-2749d35bf6ef) API endpoint. Customers can also join loyalty program automatically after fulfilling any earning rule.

2. Earn points

Depending on your choice, points can be earned in multiple ways. In our Loyalties scenario, we are rewarding the customer 10 points for every $10 spent. It is an `order paid` event so we have to [create an order](https://www.postman.com/voucherify/workspace/voucherify-s-public-workspace/request/31663208-11e7ce18-1501-4d74-a67c-039da0dbac68).

3. Show the details of the program:

a) Show Earning Rules - you can use the [List Earing Rules](https://www.postman.com/voucherify/workspace/voucherify-s-public-workspace/request/31663208-f1af855a-9095-4239-9ecb-196cea530b5d?tab=body) API endpoint to display all available actions that will reward them with points. 

b) Show Rewards - when it comes to displaying rewards, you can either show [all available rewards](https://www.postman.com/voucherify/workspace/voucherify-s-public-workspace/request/31663208-9d395784-64b0-4465-98f0-7c1086b3335d), or only the [currently affordable rewards](https://www.postman.com/voucherify/workspace/voucherify-s-public-workspace/request/31663208-796277fc-2e37-4fa1-a542-54cbe8638fcc).

c) Show Tiers - using the [List Member's Loyalty Tiers](https://www.postman.com/voucherify/workspace/voucherify-s-public-workspace/request/31663208-535ac8dc-a91c-4836-92e4-3a972219e6d2?tab=body) API endpoint, you can inform your customer about tier/s they are currently in. Another possibility is to [List Loyalty Tiers](https://www.postman.com/voucherify/workspace/voucherify-s-public-workspace/request/699307-d744a047-ff33-4e0d-b3a4-0db6923bbe02?tab=body) from a given campaign.

d) Paying with Points - if the `pay with points` reward is active in the loyalty program, you can use the [Redeem Reward](https://www.postman.com/voucherify/workspace/voucherify-s-public-workspace/request/699307-80ca2389-7b89-4d2f-b0b0-843e52d4f126) API endpoint to specify how many points are going to be used.

e) Reedeming Points for Rewards - you can use the [Redeem Reward](https://www.postman.com/voucherify/workspace/voucherify-s-public-workspace/request/31663208-36b2ab68-a684-4d85-97f7-e628e39b42da?tab=body) API endpoint to spend loyalty points on different rewards available in the loyalty program.