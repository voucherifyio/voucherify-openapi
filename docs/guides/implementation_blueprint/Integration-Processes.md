---
title: Integration Processes
excerpt: 
categorySlug: implementation-blueprint
slug: integration-processes
type: basic
hidden: false
order: 40
---

## Introduction

To integrate Voucherify into your system, you need to incorporate Voucherify's API requests and handle the information that is returned in response. Voucherify is a promotion engine designed with both marketers and developers in mind, using an API-first approach. This means that data can be seamlessly exchanged between the Voucherify database and your system database, enabling smooth and real-time synchronization.

Typically, the customer journey unfolds through the following key steps:

- **[Qualification](ref:check-eligibility)** - occasionally, you may wish to display to a customer vouchers, promotions, and campaigns they qualify for, considering customer attributes and the current contents of their shopping cart. Voucherify's Qualifications API assists in suggesting relevant promotions and coupons within the specific customer and order context, offering filtering options based on campaign category and hierarchy.

- **[Publication](ref:create-publication)** - it involves associating a code with a specific customer. Typically, code distribution occurs through publications to your customers. Once the code is delivered to a customer, it becomes visible in their profile in Voucherify.

- **[Validation](ref:validate-stacked-discounts)** - verifies the eligibility of the selected discounts and calculates the final price.

- **[Redemption](ref:redeem-stacked-discounts)** - redeems a combination of vouchers, promotion tiers, and promotion stacks.

**The described process applies to any type of discount, regardless of voucher type or discount effect.**

## Use Cases

We will guide you through the most commonly used scenarios that involve the API calls mentioned above:

1. Redeeming voucher codes,
2. Checking promotion eligibility during checkout,
3. Publishing a voucher code in a wandering customer scenario,
4. Rewarding customers with points for purchases.

### Redeeming voucher codes

In this scenario a customer will be reedeming voucher codes that they received via one of the distribution methods. The codes can be chosen from the list by the customer or added manually. After this step, validity of codes is checked by the validation API. When a customer is happy with the result he pays for the order and codes are consumed during redemption API.

1. Distribution - A customer can acquire voucher codes by various means. Codes can come from a distribution, be part of a referral program (code from a friend), be bought as a gift voucher, or acquired offline (standaone code printed out on a shopping window). Codes that are assigned to the customer's profile will be returned by the Qualification endpoint. If codes are not assigned to the customer's profile then it is best to let a customer input codes themselves.

2. Shopping experience - A customer is at the checkout and wants to use some discount coupons. A request is sent to Voucherify (Qualification API) and information regarding the available discount coupons are returned. Depending on your flow, you can skip this step as it is optional. After a customer chooses or manually adds discount coupons that interest them, a validation request is sent to Voucherify to check whether codes are applicable and appropriate results are returned. When a customer pays for the order, Voucherify receives a redemption request and consumes the discount coupons.

>During the shopping process there is no need to send any API requests to Voucherify when a customer adds or removes any products from their cart. API requests are only needed if you want to verify whether a customer qualifies for the discount or to calculate the discount itself.

### Checking promotion eligibility during checkout

In this scenario promotion eligibility is going to be verified during the checkout step. A customer did not receive any voucher codes beforehand, instead all discounts and promotions will be displayed at the checkout screen. 

1. Shopping experience - A customer is at the checkout and you want to inform them about all the discounts and promotions they are eligible for. A request is sent to Voucherify (Qualification API) and information regarding the available discount coupons and promotions are returned. You can decide whether discounts and promotions are applied automatically or let the customer choose themselves. In this case this step is mandatory. After discount coupons and promotions are applied, a validation request is sent to Voucherify to check whether they are applicable and appropriate results are returned. When a customer pays for the order, Voucherify receives a redemption request and consumes the discount coupons and promotions.

### Publishing a voucher code in a wandering customer scenario

In this scenario a customer is going to receive a voucher code during their visit in the store. The distribution will trigger after the specific action takes place.

1. Distribution - When a customer visits your store, adds products to the cart but does not go to checkout for a while, the distribution is triggered to give a customer the coupon code to encourage them to finish the purchase.

2. Shopping experience - After a customer types the discount code, a validation request is sent to Voucherify to check whether code is applicable and appropriate result is returned. When a customer pays for the order, Voucherify receives a redemption request and consumes the discount coupon.

### Rewarding customers with points for purchases.

In this scenario a customer is going to receive points for their purchase. We can decide whether we want a customer to apply any discount codes or not. This will slightly change our API requests. Distribution will have slighlty different purposes compared to previous scenarios as it will inform a customer about points they have received for the transaction.

1. Distribution - After the purchase is complete, a customer is informed via a distribution about the points they received. Sources of the distribution can vary between mail, webhook, or one of our integrations.

2. Shopping experience - When a customer is at the checkout you can decide if you want any discounts to be applied or not. If yes, redemptions API will be used. If not, create order API will be used. Regardless of your choice, the following step is exactly the same as the customer is going to be rewarded with points according to earning rules. 
