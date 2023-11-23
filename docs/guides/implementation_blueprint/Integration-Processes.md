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

- **[Qualification](ref:check-eligibility)** - occasionally, you may wish to display to a customer the coupons they qualify for, considering their attributes and the current contents of their shopping cart. Voucherify's Qualifications API assists in suggesting relevant promotions and coupons within the specific customer and order context, offering filtering options based on campaign category and hierarchy.

- **[Publication](ref:create-publication)** - it involves associating a code with a specific customer. Typically, code distribution occurs through publications to your customers. Once the code is delivered to a customer, it becomes visible in their profile in Voucherify.

- **[Validation](ref:validate-stacked-discounts)** - verifies the eligibility of the selected discounts and calculates the final price.

- **[Redemption](ref:redeem-stacked-discounts)** - redeems a combination of vouchers, promotion tiers, and promotion stacks.

**The described process applies to any type of discount, regardless of voucher type or discount effect.**

## Use Cases

We will guide you through the most commonly used scenarios that involve the API calls mentioned above:

1. Redeeming voucher codes,
2. Checking promotion eligibility during checkout,
3. Publishing voucher code for a wandering customer,
4. Rewarding customers with points for purchases.

### Redeeming Voucher Codes

1. You provide customers with voucher codes. If a customer didn't receive a code directly, they should be able to enter a code themselves.

2. A customer is at the checkout and wants to use some discount coupons. A request is sent to Voucherify (Qualification API) and information regarding the available discount coupons are returned. Depending on your flow, you can skip this step as it is optional.

3. After a customer chooses discount coupons that interest them, a validation request is sent to Voucherify to check whether codes are applicable and appropriate results are returned.

4. When a customer pays for the order, Voucherify receives a redemption request and uses the discount coupons.
