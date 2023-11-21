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

> 👍 **Outcome**:
> 
> Your data is synchronized with Voucherify.

<!-- Trying this approach for a test. If it's liked, we can add it throughout the docs. Otherwise, I'll delete it. -->

## Customer synchronization

Voucherify can store and act on collected customer data. The most common customer data operation is to create customer groups that can be used to understand customer behavior, build promotion limits, or trigger automatic incentive delivery.

<!-- ^ the WHY of importance -->

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

### Customer synchronization options

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

The following actions <!-- or activities? --> upsert customer data:
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

If you want to keep your customers database up to date with Voucherify, create a customer in Voucherify every time a new user is added to your database. Use the [Create customer](ref:create-customer) API endpoint to create customer data.

To update customer data, use [Update customer](ref:update-customer) API endpoint. The [Create customer](ref:create-customer) API endpoint can be also used to update customer data.

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

The following endpoints can be used to synchronize customer data:

- [List Customers](ref:list-customers)
- [Get Customer](ref:get-customer)
- [List Customer Activities](ref:list-customer-activities)
- [List Customer's Segments](ref:list-customer-segments)
- [Create Customer](ref:create-customer)
- [Import and Update Customers using CSV](ref:import-customers-using-csv)
- [Update Customer](ref:update-customer)
- [Update Customer's Consents](ref:update-customers-consents)
- [Update Customer’s consents (client-sde)](ref:update-customers-consents-client-side)
- [Update Customers in bulk](ref:update-customers-in-bulk)
- [Update Customers' Metadata in bulk](ref:update-customers-metadata-in-bulk)
- [Delete Customer](ref:delete-customer)
- [Delete Customer Permanently](ref:delete-customer-permanently)

For reference, see also [the customer object](ref:customer-object) and [customer activity object](ref:customer-activity-object).

<!-- do we also list all other endpoints that have a customer object that can upsert data, e.g. redeem stackable discount, check eligibility? -->

## Product synchronization

Products can be stored in Voucherify but it is not required. The product validation <!-- validation? --> takes place during the following actions:
- Qualification
- Validation
- Redemption

The product validation is based on the API payload and the data stored in Voucherify's product catalog. However, if a product does not exist in Voucherify, the validation will take into consideration the payload alone.

> 🚧 Product data in the payload alone
>
> Unlike customer data, product data provided in the payload alone do not create a new product in Voucherify. Products need to be created or imported.

The products in Voucherify can be grouped into static or dynamic collections based on their parameters. Collections can be used in validation rules to model product-specific limits and loyalty-earning rules.

### Product synchronization options

#### Importing products

You can [import your product database](https://support.voucherify.io/article/515-products#import-products-skus "Import Products and SKUs by CSV") to Voucherify with a CSV file. This method can also be used to update the names of existing products.

#### Creating and updating products via API

You can create and update your products via the following API endpoints:
- [Create product](ref:create-product)
- [Update product](ref:update-product)

#### Overriding product data

The override set to `true` is used to store the product information in the system. If the product does not exist, it will be created with a `source_id`. If the product does exist, the provided values for the name, price, and metadata will replace those already stored in Voucherify.

<!-- I don't get it; how does it work? Why is it in response? Also, in the HS article on products, we read 

> Override/Update products' names in Voucherify using this method. Data will be updated for each product included in the CSV file whose source_id matches a Source id in Voucherify. No other data can be updated other than the product name.

How to understand the two?
-->



## Order synchronization

<!-- ## Campaigns and vouchers -->