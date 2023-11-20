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

Every customer has unique identification data in the `source_id` field. The `source_id` can be a customer ID or email from a CRM system, database, or a third-party service.  It can be imported into Voucherify from your [CRM database]() or a CSV file <!-- link when ready! -->

> 🚧 Customer data synchronization and `source_id`
>
> If your data is to be synchronized based on the `source_id` of the customer, you need to import the `source_id` when the customer is uploaded for the first time. You will not be able to change or update `source_id` later on.

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

<!-- do we clarify what `upsert` means: `update` + `insert`? -->

If the customer does not exist in Voucherify, they are created automatically in a request that includes the customer object. If the customer exists, their data will be upserted. In this case, the response also includes the `updated_at` object. <!-- these are objects, right? -->

The following actions upsert customer data:
- order creation
- voucher publication
- validation <!-- IMO should be here-->
- redemption

<!-- Redemption... but this is to be deprecated, right? so should we actually link/mention those

I need clarification – we want customers to use qualification endpoint or the stackable discounts endpoint, and these do redeem, so is this info `redemption` all right?

Anything else that MUST be here? I don't mean everything

-->

<!-- ##### Order creation

##### Voucher publication

##### Redemption

-->

#### Importing customers

You can import your customer database to Voucherify with a CSV file. If you use a CRM system, use its unique ID as a `source_id` field.

Read our [customer import guide](https://support.voucherify.io/article/67-how-to-import-my-customers#csv-import "How to import my customers?") to learn more.

<!-- Should I write a full step-by-step manual for this? -->

#### Creating and updating customers via the API

If you want to keep your customers database in up to date with Voucherify, create a customer in Voucherify every time a new user is added to your database. Use the [Create customer API method](ref:create-customer) to upsert customer data.

<!-- Simply repeat the endpoints? -->

#### Synchronizing with connectors

Customer data can be upserted with integrated platforms that support outbound traffic:
- Batch
- Bloomreach Engagement
- Intercom
- Klaviyo
- MoEngage
- mParticle
- Salesforce
- Segment
- ZOHO

<!-- Again, clarification: do we want to add only those platforms that send customer 
data to Voucherify, right? 

I'll update the links once these get clarified

Also: how to know which platform sends data to V% and which receives V% data?

-->

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