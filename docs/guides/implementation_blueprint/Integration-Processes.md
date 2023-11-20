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

- **[Qualification](ref:qualification-object)** - occasionally, you may wish to display to a customer the coupons they qualify for, considering their attributes and the current contents of their shopping cart. Voucherify's Qualifications API assists in suggesting relevant promotions and coupons within the specific customer and order context, offering filtering options based on campaign category and hierarchy.

- **[Publication](ref:publication-object)** - it involves associating a code with a specific customer. Typically, code distribution occurs through publications to your customers. Once the code is delivered to a customer, it becomes visible in their profile in Voucherify.

- **[Validation](ref:validation-object)** - verifies the eligibility of the selected discounts and calculates the final price.

- **[Redemption](ref:redemption-object)** - redeems a combination of vouchers, promotion tiers, and promotion stacks.

**The described process applies to any type of discount, regardless of voucher type or discount effect.**