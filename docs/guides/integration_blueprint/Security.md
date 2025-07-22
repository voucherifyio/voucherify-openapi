---
title: Security
excerpt: Voucherify data security
categorySlug: integration-blueprint
slug: security
type: basic
hidden: false
order: 16
---

> 📘 **Goals**
> 
> * Learn how Voucherify guarantees campaign security.
> * Identify PII data to be shared with Voucherify.
> * Analyze your distribution processes in relation to GDPR and Data Privacy laws. 				

> 👍 **Outcome**
>
> Data security assessment of integration.

---

As an **ISO-27001-certified product**, Voucherify implements several security standards and practices to protect your and your customers' data:

* AWS cloud security (Virtual Private Cloud) implemented according to the AWS Best Practices.
* Encryption (AWS KMS, TLS 1.2, data encryption at rest with AES-256).
* Regular PCI scans, security audits, and penetration tests performed by a third party IT security company.
* Web Application Firewall with active blocking rules
* DDOS protection (connection limiting, WAF).
* Login brute-force protection.
* Logging and monitoring systems, along with alerting and anomaly detection (Prometheus, Grafana, NewRelic, CloudWatch, PagerDuty).
* Role-based access and policy enforcement (AWS IAM, VPN, access logs, periodic permission reviews).
* All critical systems secured with multi-factor authentication and/or authenticating through SSO (enforced).
* Disaster Recovery Plan and custom disaster recovery protocols defined in the SLA. 
* [GDPR & CCPA compliance](https://support.voucherify.io/article/125-security-data-protection).
* Redundancy of all underlying services for High Availability.
* Reliability and backup (RAID class hardware, AWS S3).
* Two-factor authentication, strong password policies, SAML- Voucherify prioritizes account security by implementing features like strong password policies, session management, and access monitoring. These measures help protect user accounts and prevent unauthorized access. For more details, read the [Account Security article](https://support.voucherify.io/article/437-account-security).
* OAuth 2.0 authorization for generating access tokens. Voucherify can generate [OAuth 2.0 tokens](doc:authentication#oauth-20) to be temporarily used with API clients. The tokens can have a limited scope to access specific parts of the Voucherify server-sde or client-side API.
* Automated daily data backups; additionally, snapshots copied over to a separate AWS account with limited access as an extra layer of security. We continuously check whether automated backups succeed and are available. Moreover, the procedure of recovering data from snapshots is tested regularly.
* [User roles](https://support.voucherify.io/article/40-how-does-the-access-control-work-in-voucherify "User roles and access control") – Voucherify's Team Management enhances account security by offering features like role-based access control, user permissions, and activity tracking. These tools ensure only authorized team members can access or modify sensitive data, reducing the risk of unauthorized actions. For more details, read the [Team Management](doc:team-management) documentation. 
* Security and Data Protection - Voucherify ensures robust security and data protection through measures like encryption, GDPR compliance, and secure API communication. These practices safeguard sensitive data and maintain compliance with legal standards. For more information, read the [Security & Data Protection](https://support.voucherify.io/article/125-security-data-protection) article.
* Multi-Factor Authentication - Voucherify supports Multi-Factor Authentication (MFA) to enhance account security. MFA adds an extra layer of protection by requiring users to verify their identity through an additional factor beyond their password. For detailed guidance, read the [MFA article](https://support.voucherify.io/article/469-multi-factor-authentication-mfa).
* Fraud Prevention - Voucherify offers tools for Fraud Prevention to safeguard your campaigns, including setting redemption limits, monitoring suspicious activity, and defining usage rules to prevent abuse. For more information, read the [Fraud Prevention Mechanisms](doc:fraud-prevention-mechanisms) and [Fraud Prevention and Tracking](https://support.voucherify.io/article/516-fraud-prevention#account-security) articles.

Contact [Voucherify Customer Success](https://www.voucherify.io/contact-support) team for a complete **Security Architecture Model** or the recent pentest report.

> 📘 Voucherify built-in messaging
>
> If you plan to use Voucherify's built-in messaging, go to a dedicated [GDPR guide](https://support.voucherify.io/article/125-security-data-protection "Security and Data Protection – GDPR and CCPA compliance"). It showcases how Voucherify implements requirements from the Directive.