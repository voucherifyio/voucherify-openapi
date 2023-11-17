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
- [Customers](#customer-synchronization)
- [Products](#product-synchronization)
- [Orders](#order-synchronization)
<!-- - [Campaigns and vouchers](#campaigns-and-vouchers) -->

When you have [created your Voucherify account](doc:getting-started), you can import your existing data and then synchronize it for future use in campaigns.

> 📘 **Goals**:
>
> - Learn why data synchronization is important
> - Learn how to synchronize your data through data import and updates

**Outcome**:

Your data is synchronized with Voucherify.

<!-- Trying this approach for a test. If it's liked, we can add it throughout the docs. Otherwise, I'll delete it. -->

## Customer synchronization

Voucherify uses the [customer object](ref:customer-object) for [validation](ref:validation-object), [redemption](ref:redemption-object), and [distribution](https://support.voucherify.io/article/19-how-does-the-distribution-manager-work "How does the distribution manager work?") purposes.

<!-- instead of distribution - publication? -->

The customer data does not have to be stored in Voucherify before a validation or redemption request is made. Voucherify can use the customer data from the request to create a new customer with a unique `id` field.

However, the customer data must exist in Voucherify before a distribution is made.

<!-- distribution as meant by distribution channels, not publication, as in the postman collection? -->

<!-- this bit must be moved someplace

Every customer has unique identification data in the `source_id` field. The `source_id` can be a customer ID or email from a CRM system, database, or a third-party service.  It can be imported into Voucherify from your [CRM database]() or a CSV file <!-- link when ready! -->.

-->

> 🚧
>
> Note that if your data are to be synchronized based on the `source_id` of the customer, you need to import the `source_id` when the customer is uploaded for the first time. You will not be able to change or update `source_id` later on.

### Synchronization options

<!-- https://success.voucherify.io/article/430-crm-playbook
Adding customers

These are the ways you can add customer profiles to Voucherify:

API
Webhooks
The import with a CSV file. 
You can integrate your CRM platform with Voucherify.

 -->

#### Upserting customers

If the customer does not exist in Voucherify, they are created (upserted) automatically in a request that includes the customer object. If the customer exists, their data will be updated. In this case, the response also includes the `created_at` and `updated_at` objects. <!-- these are objects, right? -->

The following actions upsert customer data:
- order creation
- voucher publication
- redemption


<!-- Redemption... but this is to be deprecated, right? so should we actually link/mention those -->

##### Order creation

##### Voucher publication

##### Redemption

#### Importing customers

#### Creating and updating customers via the API

#### Synchronizing with connectors

### Customer API endpoints

<!-- TBChecked which are still supported and if this list is still up-to-date; taken from https://success.voucherify.io/article/430-crm-playbook -->

Create Customer
Get Customer
Update Customer
Delete Customer
List Customers
Delete Customer Permanently
Update Customer’s Metadata in bulk
Update Customers in bulk
Update Customers’ consents
Update Customers’ consents (client)
List Customers Activities

<!-- do we also list all other endpoints that have a customer object that can upsert data, e.g. redeem stackable discount, check eligibility? -->

## Product synchronization

## Order synchronization

<!-- ## Campaigns and vouchers -->