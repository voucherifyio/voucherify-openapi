---
title: Data synchronization
excerpt: Learn what kind of data you can synchronize with Voucherify and how you can do this
categorySlug: implementation-blueprint
slug: data-synchronization
type: basic
hidden: false
order: 60
---

In Voucherify, you can synchronize the following data:
- [Customer synchronization](#customer-synchronization)
- [Product synchronization](#product-synchronization)
- [Order synchronization](#order-synchronization)
<!-- - [Campaigns and vouchers](#campaigns-and-vouchers) -->

When you have [created your Voucherify account](doc:getting-started), you can import your existing data to use them in campaigns.

> 📘 **Goals**:
>
> - Learn why data synchronization is important
> - Learn how to synchronize your data through data import and updates

**Outcome**:

Your data is synchronized with Voucherify.

<!-- Trying this approach for a test. If it's liked, we can add it throughout the docs. Otherwise, I'll delete it. -->

## Customer synchronization

Voucherify uses the [customer object](ref:customer-object) for [validation](ref:validation-object), [redemption](ref:redemption-object), and distribution purposes.

The customer data does not have to be stored in Voucherify before a validation or redemption request is made. Voucherify can use the customer data from the request to create a new customer.

However, the customer data must be stored in Voucherify before a [distribution](https://support.voucherify.io/article/19-how-does-the-distribution-manager-work "Getting started with distributions") is made.

## Product synchronization

## Order synchronization

<!-- ## Campaigns and vouchers -->