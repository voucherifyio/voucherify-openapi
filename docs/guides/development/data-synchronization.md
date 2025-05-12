---
title: Data synchronization
excerpt: Learn what kind of data you can synchronize with Voucherify and how you can do this
categorySlug: development
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

> 📘 **Goals**
>
> - Learn why data synchronization is important
> - Learn how to synchronize your data through data import and updates

> 👍 **Outcome**
> 
> Your data is synchronized with Voucherify.

## Customer synchronization

Voucherify can store and act on collected customer data. The most common customer data operation is to create customer segments based on customer attributes. Customer segments can be used to understand customer behavior, build promotion limits, or trigger automatic incentive delivery.

Voucherify uses the [customer object](ref:customer-object) for [validation](ref:validation-object), [redemption](ref:redemption-object), and [distribution](https://support.voucherify.io/article/19-how-does-the-distribution-manager-work "How does the distribution manager work?") purposes.

The customer data does not have to be stored in Voucherify before a validation or redemption request is made. Voucherify can use the customer data from the request to create a new customer with a unique `id` field.

However, the customer data must exist in Voucherify before a distribution is made. Also, distribution can be made on the basis of the customer's attributes and sent out to customers from a given segment. If the customer data is not up to date, the distribution messages sent manually can reach the wrong audience.

<!-- this bit must be moved someplace

Every customer has unique identification data in the `source_id` field. The `source_id` can be a customer ID or email from a CRM system, database, or a third-party service.It can be imported into Voucherify from your [CRM database]() or a CSV file <!-- link when ready! -->

> 🚧 Customer data synchronization and `source_id`
>
> If your data is to be synchronized based on the `source_id` of the customer, you need to import the `source_id` when the customer is uploaded for the first time. You will not be able to update `source_id` later on.

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

If the customer does not exist in Voucherify, they are created automatically in a request that includes the customer object. If the customer exists, their data will be upserted. In this case, the response also includes the `updated_at` object. <!-- these are objects, right? -->

The following actions upsert customer data:
- [Order creation](ref:create-order)
- [Stackable discount redemption](ref:redeem-stacked-discounts)
- [Stackable discount redemption (client side)](ref:redeem-stacked-discounts-client-side)
- [Track custom event](ref:track-custom-event)
- [Voucher publication](ref:create-publication)

#### Importing customers

You can import your customer database to Voucherify with a CSV file. If you use a CRM system, use its unique ID as a `source_id` field.

Read our [customer import guide](https://support.voucherify.io/article/67-how-to-import-my-customers#csv-import "How to import my customers?") to learn more.

#### Creating and updating customers with the API

If you want to keep your customers database up to date with Voucherify, create a customer in Voucherify every time a new user is added to your database. Use the [create customer](ref:create-customer) API endpoint to create customer data.

To update customer data, use the [update customer](ref:update-customer) API endpoint. The [create customer](ref:create-customer) API endpoint can be also used to update customer data.

#### Synchronizing with connectors

Customer data can be upserted with integrated platforms that support outbound traffic:
- [Bloomreach Engagement](https://support.voucherify.io/article/613-bloomreach-engagement-integration "Voucherify-Bloomreach Engagement integration article")
- [Braze](https://support.voucherify.io/article/588-braze-integration "Voucherify-Braze integration article")
- [mParticle](https://support.voucherify.io/article/590-mparticle "Voucherify-mParticle integration article")
- [Salesforce](https://support.voucherify.io/article/140-salesforce "Voucherify-Salesforce integration article")
- [Segment](https://support.voucherify.io/article/272-segment "Voucherify-Segment integration article")
- [Zapier](https://support.voucherify.io/article/269-zapier "Voucherify-Zapier integration article")

### Customer API endpoints

Go to the API reference to see the [customer endpoints](ref:customer-object) that can be used to synchronize customer data.

## Product synchronization

Products can be stored in Voucherify but it is not required. The product validation takes place during the following actions:
- Qualification
- Validation
- Redemption

<!-- Links to key concepts once they're done  -->

The product validation is based on the API payload and the data stored in Voucherify's product inventory.

However, if a product does not exist in Voucherify, the validation will use the product data included in the payload. Even if the product does exist in Voucherify, the payload data is used instead of those stored in the system. This method can be used to avoid frequent API calls to keep the product inventory up to date.

> 🚧 Product data in the request
>
> Unlike customer data, product data provided in the request payload alone do not create a new product in Voucherify. If you want to store products in Voucherify, they need to be created manually in the dashboard or imported with a CSV file.
> 
> Also, even though Voucherify uses the payload data instead of the data stored in the system, the product data is not upserted through requests. Products can be updated through product edit function or by importing a CSV file.
>
> To enable product updates through the payload, use the [override attribute](#overriding-product-data).

The products in Voucherify can be grouped into static or dynamic collections based on their parameters. Collections can be used in validation rules to model product-specific limits and loyalty-earning rules.

### Product synchronization options

#### Importing products

You can [import your product database](https://support.voucherify.io/article/515-products#import-products-skus "Import Products and SKUs by CSV") to Voucherify with a CSV file. This method can be also used to update the names of existing products.

#### Creating and updating products with the API

You can create and update your products with the following API endpoints:
- [Create product](ref:create-product)
- [Update product](ref:update-product)

#### Overriding product data

In a request payload, you can add an attribute `override` with value `true` to the product object.

The `override` attribute is used to enable storing the product data in Voucherify. If the product does not exist, it will be created with a `source_id`. If the product does exist, the provided values for the name, price, and metadata will replace those already stored in Voucherify.

## Order synchronization

Orders are synchronized with Voucherify automatically during redemption. They can be viewed through the [Orders view](https://support.voucherify.io/article/263-how-can-i-track-customer-orders "How can I track customer orders?") in the dashboard.

If you want to synchronize the orders that have not been included in any redemption, you need to use the [import order](#import-orders) method.

### Order synchronization options

#### Create order

The [create order](ref:create-order) endpoint creates an [order object](ref:order-object) and triggers an order creation event.

The endpoint can be also used to upsert order data if the order `id` or `source_id` are provided.

#### Update order

The [update order](ref:update-order) endpoint updates the specified order with the values of the parameters in the payload.

#### Import orders

The [import orders](ref:import-orders) endpoint is used to import only historical orders into Voucherify. For on-going synchronization, the [create order](ref:create-order) and  [update order](ref:update-order) endpoints should be used. Importing orders in bulk does not trigger distributions or earning rules.

<!-- ## Campaigns and vouchers -->