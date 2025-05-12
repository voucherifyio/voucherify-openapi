---
title: Integration processes
excerpt: Integrate Voucherify with your system and apply different scenarios
categorySlug: development
slug: integration-processes
type: basic
hidden: false
order: 40
---

## Introduction

To integrate Voucherify into your system, you need to incorporate Voucherify's API requests and handle the information that is returned in response. Voucherify is a promotion engine designed with both marketers and developers in mind, using an API-first approach. This means that data can be seamlessly exchanged between the Voucherify database and your system database, enabling smooth and real-time synchronization.

Typically, the customer journey unfolds through the following key steps:

- **[Qualification](ref:check-eligibility)** – occasionally, you may want your customers see vouchers, promotions, and campaigns they qualify for, based on customer attributes and the current contents of their shopping cart. Voucherify's Qualifications API suggests relevant promotions and coupons within the specific customer and order context and offers filtering options based on campaign category and hierarchy.

- **[Publication](ref:create-publication)** – it involves associating a code with a specific customer. Typically, code distribution occurs through publications to your customers. Once the code is delivered to a customer, it becomes visible in their profile in Voucherify.

- **[Validation](ref:validate-stacked-discounts)** – it verifies the eligibility of the selected discounts and calculates the final price.

- **[Redemption](ref:redeem-stacked-discounts)** – it redeems a combination of vouchers, promotion tiers, and promotion stacks.

**The described process applies to any type of discount, regardless of the voucher type or discount effect.**

## Use cases

In this section, you will learn the most commonly used scenarios that involve the API calls mentioned above:

1. [Redeeming voucher codes](#redeeming-voucher-codes),
2. [Checking promotion eligibility during checkout,](#checking-promotion-discount-without-a-code-eligibility-during-checkout)
3. [Publishing a voucher code in a wandering customer scenario,](#publishing-a-voucher-code-in-a-wandering-customer-scenario)
4. [Rewarding customers with points for purchases](#rewarding-customers-with-points-for-purchases).

### Redeeming voucher codes

In this scenario, a customer will redeem voucher codes.

The customer is given voucher codes using different methods. You can use [Voucherify's Distributions](doc:distributions) or a standalone voucher that the customer received in many different ways.

![Distributions in Voucherify](https://files.readme.io/8236eff-guides_implementation_blueprint_integration_processes_distributions.png "Distributions in Voucherify")

Code application can be different depending on the customer experience that you designed. This image shows an example of a customer experience:

![Customer experience in Voucherify](https://files.readme.io/1ee38e4-guides_development_integration_processes_customer_experience_case_1.png "Customer experience in Voucherify")

**Step 1**: A typical scenario is presented where the customer browses products, adds them to their cart, and proceeds to checkout.

> 📘 
> When the customer is shopping and adds products to or removes them from the cart, there is no need to send API requests to Voucherify. API requests are only needed if you want to verify whether a customer qualifies for the discount or to calculate the discount itself.

**Step 2**: Qualifications (optional) – you can choose to get a list of applicable discounts for the customer from Voucherify. If you do not choose this option, the customer has to input the codes by themselves.

> 📘
> The Qualifications request can return just the promotions or a combination of discount codes, campaigns, and promotion tiers according to the "options" from the Qualifications request.

**Step 3**: Apply the coupon codes. If you use the qualification request, you can show the discounts for the customer to choose from or apply some discounts automatically. You can also allow the customer to input code acquired from a different source.

**Step 4**: Validation – a validation request is sent to Voucherify to check whether codes are applicable and appropriate results are returned.

**Step 5**: The calculated discount is displayed to the customer and it is based on the combination of coupon codes validated on the order. The customer is expected to pay for the order.

**Step 6**: Redemption – when the customer pays for the order, Voucherify receives a redemption request and consumes the discount coupons.

> 📘
> The validation and redemption requests can validate and redeem a combination of different discount types and redeemables. You can verify with one request how promotion tiers and voucher codes affect the customer's cart.

>👍
> Take a look at new Voucherify [Postman collection](https://www.postman.com/voucherify/workspace/voucherify-s-public-workspace/folder/31663208-a4e501ba-0e14-48b7-94c3-b66893e26c5a) that will lead you through the entire process flow of a voucher (coupon code) in Voucherify.

### Checking promotion (discount without a code) eligibility during checkout

In this scenario, promotion eligibility is going to be verified during the checkout step. A customer did not receive any voucher codes beforehand. Instead, all discounts and promotions will be displayed on the checkout screen. 

![Customer experience in Voucherify case 2](https://files.readme.io/3718f77-guides_development_integration_processes_customer_experience_case_2a.png "Customer experience in Voucherify case 2")

**Step 1**: A typical scenario is presented where the customer browses products, adds them to their cart, and proceeds to checkout.

> 📘
> When the customer is shopping and adds products to or removes them from the cart, there is no need to send API requests to Voucherify. API requests are only needed if you want to verify whether a customer qualifies for the discount or to calculate the discount itself.

**Step 2**: Qualifications (mandatory) – lists applicable discounts for the customer from Voucherify.

> 📘
> The Qualifications request can return just the promotions or a combination of discount codes, campaigns, and promotion tiers according to the "options" from the Qualifications request.

**Step 3**: You can decide whether discounts and promotions are applied automatically or let the customer choose themselves. 

**Step 4**: Validation – a validation request is sent to Voucherify to check whether promotion tiers are applicable and appropriate results are returned.

**Step 5**: The calculated discount is displayed to the customer and it is based on the combination of promotions validated on the order. The customer is expected to pay for the order.

**Step 6**: Redemption – when the customer pays for the order, Voucherify receives a redemption request and consumes the discount coupons.

> 📘
> The validation and redemption requests can validate and redeem a combination of different discount types and redeemables. You can verify with one request how promotion tiers and voucher codes affect the customer's cart.

> 👍
> Take a look at new Voucherify [Postman collection](https://www.postman.com/voucherify/workspace/voucherify-s-public-workspace/folder/31663208-d838a14e-5494-4206-b07a-0a667d6535e4) that will lead you through the entire process flow of a voucher and promotion redemption scenario in Voucherify.

### Publishing a voucher code in a wandering customer scenario

In this scenario, a customer is going to receive a voucher code during their visit to the store. The distribution will trigger after the specific action takes place.

![Customer experience in Voucherify case 3](https://files.readme.io/0729f90-guides_development_integration_processes_customer_experience_case_3a.png "Customer experience in Voucherify case 3")

**Step 1**: The customer visits the store and adds products to the cart but does not go to checkout for a while.

> 📘
> When the customer is shopping and adds products to or removes them from the cart, there is no need to send API requests to Voucherify. API requests are only needed if you want to verify whether a customer qualifies for the discount or to calculate the discount itself.

**Step 2**: Publication – the publication is triggered to give the customer the coupon code to encourage them to finish the purchase.

> 📘
> This step is triggered on demand.

**Step 3**: The customer uses the discount code that they have just received.

**Step 4**: Validation – a validation request is sent to Voucherify to check whether the code is applicable and appropriate results are returned.

**Step 5**: The effect of the coupon code is displayed to the customer. The customer is expected to pay for the order.

**Step 6**: Redemption – when the customer pays for the order, Voucherify receives a redemption request and consumes the discount coupon.

> 📘
> The validation and redemption requests can validate and redeem a combination of different discount types and redeemables. You can verify with one request how promotion tiers and voucher codes affect the customer's cart.

> 👍
> Take a look at new Voucherify [Postman collection](https://www.postman.com/voucherify/workspace/voucherify-s-public-workspace/folder/31663208-94f1af65-f69b-4810-899e-8f5eeafa03f8) that will lead you through the entire process flow of a wandering customer scenario in Voucherify.

### Rewarding customers with points for purchases.

In this scenario, a customer will receive points for their purchase. The customer may, but does not have to, use discounts during the purchase. The redemption request will create an order in Voucherify but if the customer does not have any eligible discounts, you have to send an API request to synchronize the new order so that Voucherify can reward the customer with points. Voucherify can inform the customer how many points the customer earned.

![Customer experience in Voucherify case 4](https://files.readme.io/334ae9f-guides_development_integration_processes_customer_experience_case_4.png "Customer experience in Voucherify case 4")

**Step 1**: A typical scenario is presented where the customer browses products, adds them to their cart, and proceeds to checkout.

> 📘
> When the customer is shopping and adds products to or removes them from the cart, there is no need to send API requests to Voucherify. API requests are only needed if you want to verify whether a customer qualifies for the discount or to calculate the discount itself.

**Step 2**: The customer can be eligible for a discount.

**Step 3**: This step has two possible outcomes depending on previous choices:

- If the customer uses a discount – the Redemption API is used

- If the customer is not eligible for a discount – the Create order API is used

**Step 4**: The customer is rewarded with points. The points are calculated by Voucherify according to the Earning Rules.

**Step 5**: Optional – the marketing team can decide whether the customer should be informed about the earned points and which [distribution channel](https://support.voucherify.io/article/19-how-does-the-distribution-manager-work#channels) will be used.

**Step 6**: The customer receives a notification.

>👍
> Take a look at new Voucherify [Postman collection](https://www.postman.com/voucherify/workspace/voucherify-s-public-workspace/folder/31663208-d4e5ae80-049a-4502-9c6b-57cb5f504c03) that will lead you through the entire process flow of a rewarding customers with points for purchases scenario (loyalty program).
