---
title: Validation Rules
excerpt: 
categorySlug: building-blocks
slug: validation-rules
type: basic
hidden: false
order: 5
---

Validation rules enable you to run promo campaigns valid only for select scenarios. Voucherify offers a number of attributes you can tap into. The mechanics and details of all of them are described in the [Help Center](https://support.voucherify.io/article/529-validation-rules-campaign-limits). In this tutorial, we will guide you through defining and managing *validation* rules with the API.

> 📘 Object definition
>
> [Validation rule object reference](ref:get-validation-rule)

## Creating validation rules

> ❗ Important note
> 
> We highly recommend creating validation rules using the dashboard. The Rules Builder in the dashboard helps you configure desired limits in a convenient way. The API should not be used as a preferable way to create and manage validation rules.

A validation rule object can be attached (and detached) to a `campaign` or a standalone `voucher`/`promotion tier` at any time. Assuming you have any of these objects created, let's see how you can add some business restrictions. In the following example, we're going to allow for redemption only if the total order amount is greater than 100.

```curl Create Validation Rule
 curl -X POST \
    -H "X-App-Id: c70a6f00-cf91-4756-9df5-47628850002b" \
    -H "X-App-Token: 3266b9f8-e246-4f79-bdf0-833929b1380c" \
    -H "Content-Type: application/json" \
    -d '{
    	"name": "Order Amount more than 100$",
      "rules": {
        "1": {
            "name": "order.amount",
            "conditions": {
                "$more_than": [10000]
            }
        },
        "logic": "1"
      }
    }' "https://api.voucherify.io/v1/validation-rules"
```

As a result, the validation rule object is created and returned.

```json JSON
{
  "id": "val_269dXe4PYfqO",
  "name": "Order Amount more than 100$",
  "rules": {
    "1": {
      "name": "order.amount",
      "conditions": {
        "$more_than": [
          10000
        ]
      },
      "rules": {}
    },
    "logic": "1"
  },
  "createdAt": "2018-12-20T11:28:18Z",
  "updatedAt": null,
  "object": "validation_rules"
}
```

You can update and detach the validation rule object at any time. In this example, we attach it to a voucher.

```curl
curl -X POST \
-H "X-App-Id: c70a6f00-cf91-4756-9df5-47628850002b" \
-H "X-App-Token: 3266b9f8-e246-4f79-bdf0-833929b1380c" \
-H "Content-Type: application/json" \
-d '{
  "voucher": "6QfHomd2"
}' \
"https://api.voucherify.io/v1/validation-rules/val_269dXe4PYfqO/assignments"
```

As a result, the Validation Rules Assignment object is created and returned.

```json
{
  "id": "asgm_F8ckUWxH03PsZlSG",
  "rule_id": "val_269dXe4PYfqO",
  "related_object_id": "v_xQXXIOeKBUuFj9VbtvHjngQQ2MKupBT2",
  "related_object_type": "voucher",
  "created_at": "2018-12-20T11:31:36Z",
  "updated_at": null,
  "object": "validation_rules_assignment"
}
```

A voucher or a campaign can have only one validation rule entry assigned. However, you can update the rules later on.

```curl
 curl -X PUT \
    -H "X-App-Id: c70a6f00-cf91-4756-9df5-47628850002b" \
    -H "X-App-Token: 3266b9f8-e246-4f79-bdf0-833929b1380c" \
    -H "Content-Type: application/json" \
    -d '{
          "rules": {
            "1": {
              "name": "order.amount",
              "conditions": {
                "$more_than": [5000] 
              }
            },
            "logic": "1"
          }
        }' "https://api.voucherify.io/v1/validation-rules/val_269dXe4PYfqO"
```

Finally, you can detach the validation rule from the voucher.

```curl
 curl -X DELETE \
    -H "X-App-Id: c70a6f00-cf91-4756-9df5-47628850002b" \
    -H "X-App-Token: 3266b9f8-e246-4f79-bdf0-833929b1380c" \
    -H "Content-Type: application/json" \
    "https://api.voucherify.io/v1/validation-rules/val_269dXe4PYfqO/assignments/asgm_F8ckUWxH03PsZlSG"
```

## Validation rules with metadata

Payload format you should use to include [metadata (custom fields)](doc:metadata-custom-fields) when creating a validation rule. The "property" attribute is required for validation rules with metadata; i.e. the name is any of the following values: `customer_metadata`, `custom_event_metadata`, `order_items_metadata`, `order_metadata`, `product_metadata`, `redemption_metadata`.

```json
{
    "name": "A test rule",
    "rules": {
        "1": {
            "name": "redemption.metadata.",
            "property": "organizer",
            "conditions": { "$is": [ 4203 ] }
        },
        "logic": "1 and 2",
        "2": {
            "name": "redemption.metadata",
            "property": "serviceID",
            "conditions": { "$is": [ 46638 ] }
        }
    }
}
```

## Checking redemptions against validation rules

Voucherify automatically decides if a transaction matches your business criteria. All you need to do is pass all necessary objects (`customer`, `products`, `order`) within the redemption request.

```curl
curl -X POST \
    -H "X-App-Id: c70a6f00-cf91-4756-9df5-47628850002b" \
    -H "X-App-Token: 3266b9f8-e246-4f79-bdf0-833929b1380c" \
    -H "Content-Type: application/json" \
    -d '{
        "order": {
          "amount": 3000
        }
    }' "https://api.voucherify.io/v1/vouchers/6QfHomd2/redemption"
```

If it satisfies all validation rules, the redemption object will be set to `SUCCESS`. Otherwise, the API will return 400 and the redemption record will be marked as `FAILED` with a corresponding reason.

```json 400 Bad Request
{  
  "code":400,
  "message":"order does not match validation rules",
  "details":"6QfHomd2",
  "key":"order_rules_violated"
}
```

## Mixing validation rules

Validation rules are flexible – you can mix different limits taking into account segments, products, order sizes, or the total amount. Most probably, your marketing team will be creating them using the dashboard, but here is a reference for how to do it programmatically:

```json Combined validation rules
{
  "name": "Complex Validation Rule",
  "rules": {
    "1": {
      "name": "customer.segment",
      "conditions": {
        "$is": [ "seg_n3vVcU5t0m3rs4rEPr3C1oU5" ]
      }
    },
    "2": {
      "name": "product.id",
      "conditions": {
        "$is": [{ "id": "prod_ewGxJMm746Zvij", "source_id": "" }] 
      },
      "rules": {
  	    "1": {
          "name": "product.price",
          "conditions": {
            "$more_than_or_equal": [ 5000 ] 
          }
        },
        "logic": "1"
      }
    },
    "3": {
    	  "name": "order.amount",
      "conditions": {
        "$more_than": [10000] 
      }
    },
    "logic": "1 and 2 and 3"
  }
}
```

## Discount per product

Some validation rules are based on the structure of products in the cart. Sometimes you want to make a discount applicable only to particular items ([products](ref:get-product) and [skus](ref:get-sku)). This can be achieved with `discount_applicable` property. Once you define `applicable only to` rule by following [this guide](https://support.voucherify.io/article/148-how-to-build-a-rule#discount-specific-rule), the validation rule entity will look like this:

```json discount_applicable
{
  "name": "Discount Applicable To Product",
  "rules": {
    "1": {
      "name": "product.id",
      "conditions": {
        "$is": [{ "id": "prod_ewGxJMm746Zvij", "source_id": "" }] 
      },
      "rules": {
  	    "1": {
          "name": "product.discount_applicable",
          "conditions": {
            "$is": [ true ] 
          }
        },
        "logic": "1"
      }
    },
    "logic": "1"
  }
}
```

Now let's see how to implement a corresponding redemption request, let's assume we want to apply a 10% off discount to two products.

```json
{  
  "order":{  
    "items":[  
      {  
        "product_id":"prod_iGEzVplfJVolP3",
        "quantity":"1",
        "amount":12000
      },
      {  
        "product_id":"prod_RGFbFNXFxoGbJr",
        "quantity":"1",
        "amount":22000
      }
    ]
  }
}
```

The redemption response will store `items` section which has new, discounted amounts per product.

```json
"items":
[  
  {  
    "source_id":null,
    "object":"order_item",
    "product_id":"prod_iGEzVplfJVolP3",
    "sku_id":null,
    "quantity":1,
    "amount":12000,
    "discount_amount":1200
  },
  {  
    "source_id":null,
    "object":"order_item",
    "product_id":"prod_RGFbFNXFxoGbJr",
    "sku_id":null,
    "quantity":1,
    "amount":22000,
    "discount_amount":2200
  }
]
```

For more details visit the [endpoint reference](ref:get-validation-rule). 

> 📘 Postman
> 
> You can play around with this endpoint with our [Postman examples](doc:examples) – catalog `TC6 - Campaign with Validation Rules`.

## Product-specific rules without importing your catalog

You don't have to import your inventory to use product-specific rules. There is no need to store the product catalog in Voucherify up-to-date.

Voucherify enables you to assign custom attributes as metadata to products/SKUs from the order in the moment of invoking a redemption. 

> 📘 Note
>
> The same mechanism works for both Products and SKUs. Therefore, an application needs a clear definition of the order item type at the moment of invoking a request.

### How does it work?

1. Firstly, define **custom attributes for your products** (using UI or API request) which then, can be used while creating validation rules. In the Schema, you don't attach these attributes to specific products, you just define their names, types, and values (optional). The detailed guide on how to add custom product attributes with Metadata Schema is [here](https://support.voucherify.io/article/515-products).

2. When you have product metadata defined, you can **create a promo campaign with validation rules based on product metadata**. As a result, all the products in the order will be validated accordingly to the rules with product metadata. You can see how to add validation rules with product metadata in [this section](https://support.voucherify.io/article/148-how-to-build-a-rule#product-metadata).

3. When the campaign is live, your customers can start redeeming codes. When creating a redemption request via API, you can **add products with metadata from scratch**. When a redemption request gets to Voucherify, metadata assigned to ordered products will be compared to the validation rules with product metadata assigned to the code. 

While invoking the redemption, you can add a product(s) to the redemption request. These products aren't in Voucherify inventory, they are created from scratch.

```json POST Redemption request
{
  "customer": {
    "source_id": "source@voucherify.io"
  },
  "order": {
    "amount": 70000,
    "items": [
      {"quantity": 1, "source_id": "FOR-1", "related_object": "product", "price": 30000, "amount": 60000, "product": { "metadata": { "Category": "Electronics" } } }
    ]
  }
}
```

In the next step, Voucherify will verify if validation rules attached to this code (*Product metadata satisfy: Category is Electronics*) are met. In this case, Voucherify compares product metadata attached to the code (in a validation rules object) with product metadata attached to products in the order. You can see some code samples in the next paragraph.

### Exemplary API requests.

* Coupon Validation

Request Body:

```json POST /vouchers/{code}/validate
{
  "customer": {
    "source_id": "source@voucherify.io"
  },
  "order": {
    "amount": 70000,
    "items": [
      {"quantity": 1, "source_id": "GEN-1", "related_object": "product", "price": 10000, "amount": 10000 },
      {"quantity": 2, "source_id": "FOR-1", "related_object": "product", "price": 30000, "amount": 60000, "product": { "metadata": { "formulary": true } } }
    ]
  },
  "metadata": {
    "test": true,
    "pickup_date": "2018-11-01T23:00:01.000Z"
  }
}
```

or:

```json POST /vouchers/{code}/validate
{
  "customer": {
    "source_id": "source@voucherify.io"
  },
  "order": {
    "amount": 70000,
    "items": [
      {"quantity": 1, "product_id": "GEN-1", "price": 10000, "amount": 10000 },
      {"quantity": 2, "product_id": "FOR-1", "price": 30000, "amount": 60000, "product": { "metadata": { "formulary": true } } }
    ]
  },
  "metadata": {
    "test": true,
    "pickup_date": "2018-11-01T23:00:01.000Z"
  }
}
```

* Coupon Redemption

Request Body:

```json POST /vouchers/{code}/redemption
{
  "customer": {
    "source_id": "source@voucherify.io"
  },
  "order": {
    "amount": 70000,
    "items": [
      {"quantity": 1, "source_id": "GEN-1", "related_object": "product", "price": 10000, "amount": 10000 },
      {"quantity": 2, "source_id": "FOR-1", "related_object": "product", "price": 30000, "amount": 60000, "product": { "metadata": { "formulary": true } } }
    ]
  },
  "metadata": {
    "test": true,
    "pickup_date": "2018-11-01T23:00:01.000Z"
  }
}
```

or:

```json POST /vouchers/{code}/redemption
{
  "customer": {
    "source_id": "source@voucherify.io"
  },
  "order": {
    "amount": 70000,
    "items": [
      {"quantity": 1, "product_id": "GEN-1", "price": 10000, "amount": 10000 },
      {"quantity": 2, "product_id": "FOR-1", "price": 30000, "amount": 60000, "product": { "metadata": { "formulary": true } } }
    ]
  },
  "metadata": {
    "test": true,
    "pickup_date": "2018-11-01T23:00:01.000Z"
  }
}
```

* Optional parameter – override. By default it is set to false, so products and SKUs will not be updated in the Voucherify products catalog. For example:

```json POST /vouchers/{code}/redemption // override
{
    "customer": {
        "source_id": "tom+news_v2@voucherify.io"
    },
    "order": {
        "amount": 10000,
        "items": [
            {
                "quantity": 1,
                "product_id": "iphone_8_silver_256gb-1",
                "price": 10000,
                "amount": 10000,
                "product": {
                    "override": true,
                    "metadata": {
                        "lang": "eu"
                    }
                }
            }
        ]
    },
    "metadata": {
        "sales_channel": "page_1"
    }
}
```
