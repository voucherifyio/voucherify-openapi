---
title: Test Mode (Sandbox)
excerpt: Run integration tests of your promotions before going to production
categorySlug: development
slug: testing
type: basic
hidden: false
order: 180
---

Each Voucherify account has a Sandbox project which is not included in your project limit. You can use it to run your use cases and try out Voucherify capabilities. 

Sandbox projects have their unique API keys for authorization.

## How to use the Sandbox project

Sandbox is the default project when you create a new Voucherify account. 

If you upgrade to a paid plan, Sandbox will be visible in your projects list and it won't be counted to your limit.

In **Project settings > Application keys**, you can see API keys necessary to [authorize](doc:authentication) API requests. 

> 📘 API calls limit
> 
> Sandbox has a fixed API calls limit set to 100 calls per hour. Sandbox API requests are not counted into your account limits of API calls.

### Demo shop

Sandbox is connected to a showcase demo shop. The demo shop presents how the integration between Voucherify and customer touchpoints might look in practice. 

With this setup, you can create campaigns and immediately see how they work at the checkout. For example, you can validate and redeem codes from created campaigns to test different promo scenarios and validation rules. Each redemption will be tracked in the dashboard.

To access the demo shop, go to your Sandbox project and click the Demo Shop button in the top bar.

### Test data

Sandbox is populated with test campaigns, standalone codes, customers, and products. For example:

| **Campaigns:** |  |
|:---|:---|
| 15% off for Illy - Arabica (Discount coupons) | 15% off Illy Arabica (test product) |
| Referral Reward - 15% Discount (Discount coupons) | 15% off applied to whole cart |
| **Standalone codes:** |  |
| 50%UPTO100 | 50% off, the maximum discount amount per order is $100 |
| 15%VISA | 15% off if order is paid with Visa Card (order metadata: card is Visa). |
| 50%OFF | 50% off, no validation rules |
| BLCKFRDY | $10 off, no validation rules |

| **Test Customers** |
|:---|
| Jane Doe |
| John Doe |

<!-- TO BE CHECKED ONCE THE NEW SHOP IS LIVE-->