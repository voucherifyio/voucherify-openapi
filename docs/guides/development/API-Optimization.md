---
title: API Optimization
excerpt: API calls optimization
categorySlug: development
slug: api-optimization
type: basic
hidden: false
order: 150
---

## API calls optimization

Voucherify follows the usage-based pricing model. This means that we charge you for the number of API calls that you make to our platform. What is noteworthy is that we operate on a fixed quota model, which means that you should be able to predict the average number of API calls that you will need per month.

Besides working out the scenarios that Voucherify can help you achieve, the sooner you start to think about your platform usage optimization, the better. This short guide will give a quick rundown of the most popular ways to scale down your platform usage and save money in the long run.

### Stackable discounts API

Voucherify API for stackable discounts lets you validate and redeem multiple objects using a single API request. You can combine coupons, gift cards, promotion tiers, loyalty, and referral codes.

In the redemption request, you need to provide a list of redeemables that define what discounts or codes will be redeemed/validated. By integrating stackable discount API into your app, you can make a single call with multiple redeemables, instead of separate redemption calls for each of them.

Read more about the [Stackable Discounts API.](doc:manage-stackable-discounts)

### Data import

When you are getting started with Voucherify and decide to import customer data or legacy vouchers into our platform, you can do so in two ways -- using API or a CSV import. To limit the number of API calls consumed, it is best to use CSV import which you can initiate via API or manually with the Dashboard.

-   [Import customer data via CSV](ref:import-customers-using-csv)

-   [Import legacy vouchers via CSV](ref:import-vouchers-using-csv)

-   [Import vouchers into an existing campaign via a CSV](ref:import-vouchers-to-campaign-using-csv)

For more information on preparing a CSV file for data import, [go here](https://support.voucherify.io/article/67-how-to-import-my-customers).

### Data update

As developers ourselves, we know which tasks are the most time-consuming and repetitive. That's why we have automated them for you. With the use of API, you can update the following properties in bulk:

-   [Update customer data in bulk](ref:update-customers-in-bulk)

-   [Update customers' metadata in bulk ](ref:update-customers-metadata-in-bulk)

-   [Update vouchers in bulk](ref:update-vouchers-in-bulk)

-   [Update vouchers' metadata in bulk](ref:update-vouchers-metadata-in-bulk)

-   [Update products in bulk](ref:update-products-in-bulk)

-   [Update products' metadata in bulk](ref:update-products-metadata-in-bulk)

By using these endpoints, you can update multiple entities (customers, vouchers, products) in a single asynchronous operation. It is possible to update a maximum of 100 records in a single request. In the response body, you get a unique async action identifier. To check the status of the operation, you can use the [GET Async Actions API](ref:get-async-action).

The biggest benefit of using asynchronous actions for big updates is that you can maintain platform stability (as the action is spread over time) and consume fewer API calls in the long run.

### Validation and redemption

Voucherify supports both incentive validation and redemption. The validation process checks if the incentive (promo code) can be used (redeemed) in a given context and returns an updated price which can be displayed at the checkout to motivate customers to finish the purchase before actually utilizing the code.

On the other hand, redemption is the promo code usage, therefore if a code is placed at the checkout, it will be marked as used by Voucherify. If a customer changes their mind about the purchase and comes back later, they won't be able to use the code again (unless the code doesn't have any redemption limits attached).

If you are looking for a quick way to limit the number of API calls, you can call the redemption API endpoint without sending the preceding validation request. It is safe in the sense that the same validation will be applied as a first step. However, using it that way may offer a worse customer experience.

### Validation rules and Dashboard usage

Validation rules define the eligibility conditions for your incentives. It is possible to build them manually in the Dashboard or via API. We highly recommend creating validation rules using the Dashboard. The Rules Builder in the Dashboard helps you configure desired limits in a convenient way. The API should not be used as a preferable way to create and manage validation rules due to the bigger complexity and additional resources it would consume.

Learn more in [our validation rules article](https://support.voucherify.io/article/529-validation-rules-campaign-limits).

Generally speaking, the more activities you perform via Dashboard the better as they do not consume your API calls limit this way.

### Webhooks

Webhooks enable Voucherify to send real-time updates to your app or URL endpoints. In some cases (e.g., code publication), you can use a webhook to avoid calling our API. 

Also, instead of polling data from some endpoints, you can configure webhooks to get notified about triggered events, distribution channels, loyalty programs, and referral programs.

Read more [in our webhook article](https://support.voucherify.io/article/68-webhooks-notifications).