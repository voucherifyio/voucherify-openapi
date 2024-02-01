---
title: Fraud Prevention Mechanisms
excerpt: Get familiar with fraud prevention mechanisms.
categorySlug: development
slug: fraud-prevention-mechanisms
type: basic
hidden: false
order: 330
---

## Fraud Prevention Mechanisms

In Voucherify, your digital safety matters. While our promotion engine has built-in fraud prevention mechanisms, you can add your own protective layers or tap into external services. This guide provides straightforward steps to boost your security, making your Voucherify experience not only seamless but also secure. Let's dive into easy ways to keep your digital journey worry-free.

### Built-in mechanisms

The built-in mechanisms in Voucherify can be divided into two categories:

- account-wide
- campaign-wide

1. Account-wide mechanisms

a) Account security 

Take proactive steps such as enabling two-factor authentication, SAML authentication, use strong and unique passwords, and regularly update them. These simple yet effective measures will significantly bolster your account's defenses against potential threats. We encourage you to get familiar with the [account security](https://support.voucherify.io/article/437-account-security) guide. 

b) IP whitelisting 

> 🚧
> Enterprise feature available upon request

This functionality, available only upon request for customers on the Enterprise plan, provides an additional layer of security by filtering and allowing API requests exclusively from an authorized list of IP addresses.

Navigate to Project Settings→General→Application Keys and edit a Key. This will allow you to restrict the API keys to a specific list of IP addresses. By default, when the list is empty, access to the API through the API keys is allowed from any IP address.

2. Campaign-wide mechanisms

Use Voucherify's campaign creation process and validation rules to restrict coupon usage and make redemptions a reliable measure of campaign success. Take a look at several examples that will help you fight the most commmon forms of coupon abuse in our ['How to Prevent Coupon Fraud and Abuse'](https://www.voucherify.io/blog/how-to-prevent-coupon-fraud-and-abuse) article.

### Own protective layers

Add your own protective layers on top of what Voucherify has to offer.

One way of preventing fraud can be achieved by setting thresholds for failed code redemption attempts, you can automatically lock or temporarily suspend the user after a certain number of unsuccessful tries. This simple yet effective strategy helps safeguard against brute force attacks.

### External services

Leveraging third-party platforms, advanced artificial intelligence, and specialized tools is crucial for a robust fraud prevention strategy. These technologies provide enhanced security measures, real-time threat detection, and proactive risk management, ensuring organizations stay ahead in safeguarding against evolving fraudulent activities.

1. [Sift](https://www.sift.com) - provides a real-time machine-learning platform for online fraud prevention. Ift offer APIs that allow you to add fraud detection to your applications. It can learn and predict fraudulent behavior based on past transactions.

2. [Seon](https://www.seon.io) - a fraud prevention tool offered to companies and other organizations that need help to reduce the costs and resources lost to fraudulent activities.

3. [Nethone](https://www.nethone.com) - an AI fraud detection solution that blocks fraudsters before they attack.

4. [Fingeprint.js](https://demo.fingerprint.com) - a fraud detection service that provides a visitor identification API. 