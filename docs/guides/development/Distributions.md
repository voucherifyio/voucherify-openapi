---
title: Distributions
excerpt: Distribute incentives through preferred channels
categorySlug: development
slug: distributions
type: basic
hidden: false
order: 95
---

> 📘 **Goals**
> 
> * Identify which channels should be used for distribution.
> * Learn how Voucherify publication works.
> * Discover Voucherify integrations for messaging.
> * For more info, read the [Distributions article](https://support.voucherify.io/article/19-how-does-the-distribution-manager-work).

> 👍 **Outcome** 
>
> Connect Voucherify with your preferred communication channels.

---

Evaluate your customer journey and **think of places and times the information about the deal should be displayed**: website, product pages, emails, SMS, push, print, partners, or social media. Think of how you want to remind customers about the deals they’re eligible to use. Voucherify offers **two distribution modes**

* **Pull** – you can use API to get promotions in front of customers (for example, list all active coupons for John Doe).
* **Push** – an integral distribution mechanism that you can use to define a trigger for the message send-out (for example, if John Doe signs up for a newsletter, send him a 10% off promo code).

Both push and pull modes can be used with third party platforms:
- [Braze](https://support.voucherify.io/article/588-braze-integration "Voucherify and Braze integration article")
- [Twilio](https://support.voucherify.io/article/110-twilio "Voucherify and Twilio integration article")
- [Klaviyo](https://support.voucherify.io/article/598-klaviyo-integration "Voucherify and Klaviyo integration article")
- [MoEngage](https://support.voucherify.io/article/596-moengage-integration "Voucherify and MoEngage integration article")
- [Iterable](https://support.voucherify.io/article/594-iterable-integration "Voucherify and Iterable integration article")
- [Airship](https://support.voucherify.io/article/617-airship-integration "Voucherify and Airship integration article")
- [ActiveCampaign](https://support.voucherify.io/article/165-activecampaign "Voucherify and ActiveCampaign integration article")
- [Batch](https://support.voucherify.io/article/614-batch-integration "Voucherify and Batch integration article")

## Publication

Publication is an assignment of a voucher. Typically, a publication is performed by sharing codes with customers [through the Publication API](ref:publication-object).

## Webhooks

Webhooks allow external services to be notified when certain events happen. You can use a webhook as a distribution channel and push a message with a webhook every time a distribution is triggered. Learn more about [webhook distributions](https://support.voucherify.io/article/68-webhooks-notifications#response).