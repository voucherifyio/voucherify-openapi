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

In this scenario a customer will be reedeming voucher codes.

The customer is given voucher codes using different methods. You can use [Voucherify's Distributions](doc:distributions) or a standalone voucher that the customer received in many different ways.

![Distributions in Voucherify](https://raw.githubusercontent.com/voucherifyio/voucherify-openapi/mk/integration-processes/docs/assets/img/guides_implementation_blueprint_integration_processes_distributions.png "Distributions in Voucherify") <!-- Obrazek do poprawy -->

The process of applying the codes can be different depending on the customer experience that you designed. This image shows the proposition of a customer experience:

![Customer experience in Voucherify](https://raw.githubusercontent.com/voucherifyio/voucherify-openapi/mk/integration-processes/docs/assets/img/guides_implementation_blueprint_integration_processes_customer_experience.png "Customer experience in Voucherify")

Step 1: A typical scenario is presented where the customer browses products, adds them to their cart, and proceeds to checkout.

>During the shopping process there is no need to send any API requests to Voucherify when a customer adds or removes any products from their cart. API requests are only needed if you want to verify whether a customer qualifies for the discount or to calculate the discount itself.

Step 2: Qualifications - Optional step - you can choose to get a list of applicable discounts for the customer from Voucherify. If you don't choose this option, the customer has to input the codes by themselves.

Step 3: Apply the coupon codes. If you use the qualification request you can show the discounts for the customer to choose from, or apply some discounts automatically. You can also allow the customer to input code acquired from a different source.

Step 4: Validations - a validation request is sent to Voucherify to check whether codes are applicable and appropriate results are returned.

Step 5: Exposing the calculated discount based on the combination of coupon codes validated on the order. Expecting the customer to pay for the order.

Step 6: Redemptions - when the customer pays for the order, Voucherify receives a redemption request and consumes the discount coupons.

### Checking promotion (discount without a code) eligibility during checkout

In this scenario promotion eligibility is going to be verified during the checkout step. A customer did not receive any voucher codes beforehand, instead all discounts and promotions will be displayed at the checkout screen. 

![Customer experience in Voucherify case 2](https://raw.githubusercontent.com/voucherifyio/voucherify-openapi/mk/integration-processes/docs/assets/img/guides_implementation_blueprint_integration_processes_customer_experience_case_2.png "Customer experience in Voucherify case 2")

Step 1: A typical scenario is presented where the customer browses products, adds them to their cart, and proceeds to checkout.

>During the shopping process there is no need to send any API requests to Voucherify when a customer adds or removes any products from their cart. API requests are only needed if you want to verify whether a customer qualifies for the discount or to calculate the discount itself.

Step 2: Qualifications - List applicable discounts for the customer from Voucherify. In this scenario this step is mandatory.

>The Qualifications request can return just the promotions or a combination of discount codes, campaigns, and promotion tiers according to the "options" from the Qualifications request.

Step 3: You can decide whether discounts and promotions are applied automatically or let the customer choose themselves. 

Step 4: Validations - a validation request is sent to Voucherify to check whether promotion tiers are applicable and appropriate results are returned.

Step 5: Exposing the calculated discount based on the combination of promotions validated on the order. Expecting the customer to pay for the order.

Step 6: Redemption - when the customer pays for the order, Voucherify receives a redemption request and consumes the discount coupons.

>The Validations and Redemptions requests can validate and redeem a combination of different discount types and redeemables. With one request you can verify how promotion tiers and voucher codes affect the customer's cart.

### Publishing a voucher code in a wandering customer scenario

In this scenario a customer is going to receive a voucher code during their visit in the store. The distribution will trigger after the specific action takes place.

![Customer experience in Voucherify case 3](https://raw.githubusercontent.com/voucherifyio/voucherify-openapi/mk/integration-processes/docs/assets/img/guides_implementation_blueprint_integration_processes_customer_experience_case_3.png "Customer experience in Voucherify case 3")

Step 1: The customer visits your store, adds products to the cart but does not go to checkout for a while.

Step 2: Publications - The publication is triggered to give a customer the coupon code to encourage them to finish the purchase.

>This step is triggered on demand.

Step 3: The customer uses the discount code that they have just received.

Step 4: Validations - a validation request is sent to Voucherify to check whether the code is applicable and appropriate results are returned.

Step 5: Exposing the effect of the coupon code to the customer. Expecting the customer to pay for the order.

Step 6: Redemptions - when the customer pays for the order, Voucherify receives a redemption request and consumes the discount coupon.

### Rewarding customers with points for purchases.

In this scenario a customer is going to receive points for their purchase. The customer may or may not use discounts during the purchase. The redemption request will create an order in Voucherify, but if the customer does not have any eligible discounts, you have to send an API request to synchronize the new order so that Voucherify can reward the customer with points. Voucherify can inform the customer how many points the customer earned.

![Customer experience in Voucherify case 4](https://raw.githubusercontent.com/voucherifyio/voucherify-openapi/mk/integration-processes/docs/assets/img/guides_implementation_blueprint_integration_processes_customer_experience_case_4.png "Customer experience in Voucherify case 4")

Step 1: A typical scenario is presented where the customer browses products, adds them to their cart, and proceeds to checkout.

Step 2: The customer can be eligible for a discount.

Step 3: This step has two possible outcomes depending on your previous choice:

- If the customer used a discount - the Redemptions API is used

- If the customer was not eligible for a discount - the Create order API is used

Step 4: The customer is rewarded with points. The points are calculated by Voucherify according to the Earning Rules.

Step 5: Optional - The marketing team can decide whether the customer should be informed about the earned points and how. The list of possible distribution options is available here <!-- Link -->

Step 6: The customer received a notification.