---
title: Metadata (custom fields)
excerpt: 
categorySlug: building-blocks
slug: metadata-custom-fields
type: basic
hidden: false
order: 13
---

Metadata enables you to extend Voucherify objects with custom attributes. You can use them for customer segment filters, validation rules, and reporting purposes. Metadata works with `campaigns`, `vouchers`, `customers`, `SKUs`, `products`, `redemptions`, `publications`, `loyalty tier`, `promotion tier`, `orders`.

## Schema validator

Voucherify will take care of metadata integrity. This is achieved by [metadata schema validator](https://support.voucherify.io/article/99-schema-validation-metadata). It allows you to define fields types, including:

- text
- number
- boolean
- date
- date time
- image URL
- object

Additionally, each field can be marked as `optional`. Also, `text` and `number` can be restricted by the following filters:

- Text – min/max/exact length, is equal to.
- Number – less than, less than or equal to, greater than, greater or equal to, equal to, not equal to.

> 📘 
>
> Each project can have a separate metadata schema. You can also clone Metadata Schema between different projects.

## Nested Metadata

To extend the customization capabilities of Voucherify, you can also use nested metadata properties. If your business logic does not match any of the predefined Voucherify objects, you can create a new custom object. For example, you may create a new metadata `Payment` and add to it several nested properties, such as `payment_method`, `payment_channel`, or `payment_tax`. To customize these properties further, you can decide about the type of the given metadata property and optionally set different conditions, e.g., payment method has to be either credit card or wire transfer. 

```json
{
    "source_id":"your-tracking-id", 
    "name": "John Doe",
    "email": "email@example.com",
    "address": {
      "city": "Melbourne",
      "state": "FL",
      "line_1": "226 E Fee Ave",
      "line_2": null,
      "country": "Australia",
      "postal_code": "32901"
    },
    "description":"Premium user, ACME Inc.",
    "metadata": {
      "payment": {
             "payment_method" : "Visa",
              "payment_channel" : "online",
              "payment_tax":"deduced"
    }
  }
}
```

If you would like to pass more metadata properties per single metadata object, choose "Is Array" box while creating metadata schema.

```json
{
    "source_id":"your-tracking-id", 
    "name": "Julia Stane",
    "email": "email@example.com",
    "address": {
      "city": "Warsaw"
    },
    "metadata": {
      "favorite_products": [ "chococlate_box","red baloons", "dog t-shirt" ]
    }
}
```

## Bulk updates

Modify up to 100 objects with a single request:

- [Update Vouchers' metadata in bulk](ref:update-vouchers-metadata-in-bulk). 
- [Update Products' metadata in bulk](ref:update-products-metadata-in-bulk).
- [Update Customers' metadata in bulk](ref:update-customers-metadata-in-bulk). 

## Use cases

Metadata enables you to create flexible promotion scenarios with data from your CRM/e-commerce infrastructure:

- Validate redemptions based on custom attributes.
- Filter out customers in segments (e.g., users who `signed up for the newsletter` before a given date) and use them for validation rules.
- Run distributions based on custom customer attributes.
- Enforce that new campaigns to have proper identifiers provided for reporting.

For more inspiration, visit [Metadata Library](https://support.voucherify.io/article/461-what-kind-of-metadata-attributes-can-i-create).

