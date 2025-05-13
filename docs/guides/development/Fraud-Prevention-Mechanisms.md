---
title: Fraud prevention mechanisms
excerpt: Get familiar with fraud prevention mechanisms.
categorySlug: development
slug: fraud-prevention-mechanisms
type: basic
hidden: false
order: 330
---

## Fraud Prevention Mechanisms

While the Voucherify promotion engine has built-in fraud prevention mechanisms to ensure your digital safety, you can add your own protective layers or use external services. This guide provides several straightforward steps to improve your security.

### Built-in mechanisms

The built-in mechanisms in Voucherify can be divided into two categories:

- account-wide
- campaign-wide

#### Account-wide mechanisms

##### Account security 

You can take the following proactive steps to improve your account's defenses against potential threats:
- enable two-factor authentication,
- enable SAML authentication,
- use strong and unique passwords,
- regularly update the passwords.

Learn more in the [Account security](https://support.voucherify.io/article/437-account-security) guide.

##### IP whitelisting 

> 🚧
> This is an Enterprise feature available upon request

This feature provides an additional layer of security by filtering and allowing API requests exclusively from an authorized list of IP addresses.

Go to Project Settings > General > Application Keys, and edit a Key. There, you can restrict the API keys to a specific list of IP addresses. By default, when the list is empty, access to the API through the API keys is allowed from any IP address.

#### Campaign-wide mechanisms

Use Voucherify's campaign creation process and validation rules to restrict coupon usage and make redemptions a reliable measure of campaign success. Take a look at several examples that will help you fight the most common forms of coupon abuse in the ['How to Prevent Coupon Fraud and Abuse'](https://www.voucherify.io/blog/how-to-prevent-coupon-fraud-and-abuse) article.

### Additional protective layers

Add your own protective layers on top of Voucherify functionalities.

One way of preventing fraud can be achieved by setting thresholds for failed code redemption attempts. This way, you can automatically lock out or temporarily suspend users after a certain number of unsuccessful tries. This simple yet effective strategy helps safeguard against brute force attacks.

Another solution is to focus on email and customer verification, and it can be achieved by:
- disabling the use of aliases in email addresses during the registration process
- using lowercase only to rule out matching problems in your database and ensuring you do not have unintended duplicates
- blocking certain email domains
- requiring account verification via email or text messages

### External services

Third-party platforms, advanced artificial intelligence, and specialized tools are some of the methods for a robust fraud prevention strategy.

Voucherify lets you generate referral codes, allowing customers to refer others and earn rewards. To prevent abuse, you can set validation rules in the campaign to exclude specific customer groups from redeeming referral codes. However, the referral program can still be exploited by setting up fake accounts. This is why Voucherify explored methods and third-party tools to address this issue and enhance fraud prevention of your referral programs.

1. [Sift](https://www.sift.com) – provides a real-time machine-learning platform for online fraud prevention. Sift offers APIs with which you can add fraud detection to your applications. It can learn and predict fraudulent behavior based on past transactions.
2. [Seon](https://www.seon.io) – a fraud prevention tool offered to companies and other organizations that need help to reduce the costs and resources lost to fraudulent activities.
3. [Nethone](https://www.nethone.com) – an AI fraud detection solution that blocks fraudsters before they attack.
4. [Fingeprint.js](https://demo.fingerprint.com) – a fraud detection service that provides a visitor identification API.

>👍
> Voucherify investigated the above-mentioned tools and each solution has a similar integration process and usage. If you want to implement an external service into your fraud prevention mechanisms, visit the respective links.