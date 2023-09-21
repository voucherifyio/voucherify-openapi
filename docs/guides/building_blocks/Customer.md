---
title: Customers
excerpt: 
categorySlug: building-blocks
slug: customers
type: basic
hidden: false
order: 2
---

> 👍 GDPR-ready
>
> Voucherify is a GDPR-compliant platform. To learn more about how we protect the data of your customers, visit our [Security & Data Protection article](https://www.voucherify.io/legal/security-policy).

> 📘 Before you start
> 
> - Learn more about [managing Customers using the dashboard](https://support.voucherify.io/article/67-how-to-import-my-customers).    
> - Here's the [Customer object reference](ref:get-customer) that helps you create and manage customers using API.

Syncing your customer base with Voucherify can lead to multiple benefits. You can:

- Define which customers are eligible for a particular discount based on their attributes.
- Send customers emails/SMS/push notifications with personalized promotions.
- Track redemption history to understand customer behavior.

Let's see how you can quickly integrate and manage customers with our building blocks.

## Import

There are two ways you can add customer profiles to Voucherify:

- The initial import can be achieved with a [CSV file](https://support.voucherify.io/article/67-how-to-import-my-customers).
- If you want to keep your customers database in sync with Voucherify, you should create a customer every time a new user signs up in your shop. This comes down to invoking this [create a customer](ref:create-customer).

To help you identify and update customer profiles later on, you can pass your CRM unique id in the `source_id` field.  You can also identify any customer with `id` generated for every new customer, see the customer object. To help you keep data in sync, Voucherify stores `created_at` and `updated_at` date fields.

If you create a customer providing an already existing `source_id`, the profile details will be **upserted**.

Learn more by browsing the API reference for customers:

- [Create Customer](ref:create-customer)
- [Update Customer](ref:update-customer)
- [Get Customer](ref:get-customer)
- [Delete Customer](ref:delete-customer)

## Customer Tracking

You can also add new customers while they're redeeming a voucher. You just need to pass the customer entity as in the following example.

> 📘 Upsert
>
> A customer is created (upserted) automatically with every redeem call.

```curl cURL
    curl -X POST \
      -H "X-App-Id: c70a6f00-cf91-4756-9df5-47628850002b" \
      -H "X-App-Token: 3266b9f8-e246-4f79-bdf0-833929b1380c" \
      -H "Content-Type: application/json" \
      -d '{
        "customer": {
          "source_id": "alice@morgan.com",
          "name": "Alice Morgan",
          "email": "alice@morgan.com",
          "metadata": {
            "locale": "en-GB",
            "shoeSize": 5,
            "favourite_brands": ["Armani", "L’Autre Chose", "Vicini"]
          }
        },
        "order": {
          "amount": 20050,
          "items": [
            { "product_id": "prod_anJ03RZZq74z4v", "quantity": "2", "price": 10000 },
            { "sku_id": "sku_0KtP4rvwEECQ2U", "quantity": "1" }
          ]
        },
        "metadata": {
          "locale": "en-GB"
        }
      }' \
      "https://api.voucherify.io/v1/vouchers/Testing7fjWdr/redemption"
```

Voucherify can help you track anonymous customers too. Once you integrate [JS SDK] (doc:sdks#js) into your web app and call the [validate](ref:validate-voucher-client-side) method for the first time in a web session, Voucherify will return a `tracking id` which will be stored in a cookie. Every next call to Voucherify will be attached to this id. When you have all data to fully identify the customer and complete the order, you can pass the `tracking id` to the redeem method and the anonymous data will be merged into a newly created profile. Note that tracking id and cookies are supported in both [Validate Voucher](ref:validate-voucher) and [Validate Stackable Discounts](ref:validate-stacked-discounts) APIs. 

This is how an example workflow looks like:

**Client-side:**

- A customer visits your website.
- He/she validates her voucher code. This triggers [JS](doc:client-side-api) to send a [validate request](ref:validate-voucher-client-side). As a result, it returns a `tracking_id`. Example client-side request:

```markdown Example
GET https://api.voucherify.io/client/v1/validate?code=uWaf3gVG&amount=1000&item[0][sku_id]=sku_dSbRQfbyUMyHnt&item[0][quantity]=1&item[1][product_id]=prod_anJ03RZZq74z4v&item[1][quantity]=1
```

```json Example response with tracking ID
{
    "valid": true,
    "redeemables": [
        {
            "status": "APPLICABLE",
            "id": "5R4Sf3zO",
            "object": "voucher",
            "applicable_to": {
                "data": [],
                "total": 0,
                "data_ref": "data",
                "object": "list"
            },
            "inapplicable_to": {
                "data": [],
                "total": 0,
                "data_ref": "data",
                "object": "list"
            },
            "result": {
                "discount": {
                    "type": "AMOUNT",
                    "effect": "APPLY_TO_ORDER",
                    "amount_off": 1000
                }
            },
            "metadata": {
                "code": "5R4Sf3zO"
            }
        }
    ],
    "order": {
        "amount": 200000,
        "discount_amount": 1000,
        "total_discount_amount": 1000,
        "total_amount": 199000,
        "applied_discount_amount": 1000,
        "total_applied_discount_amount": 1000,
        "customer_id": null,
        "referrer_id": null,
        "object": "order"
    },
    "tracking_id": "track_DMKGAJMrjR+Whjqon8FIkmoO8+INY0Pp" // customer tracking id
}
```

- Once the customer finishes the checkout process, your website passes the `tracking_id` to your backend during a [redemption](ref:redeem-voucher). Tracking id is passed in the cookie so customer is identified without adding his/her data to the payload.

- A [customer object](ref:get-customer) object is created and it stores all previously tracked data. You'll get `customer id` as part of the redemption response.
- You can use the `customer_id` to [fetch](ref:get-customer) or [modify](ref:update-customer) the customer details.

> 📘 Custom tracking ID
> 
> You can use your own client-side tracking identifier. If you call Voucherify.setIdentity("alice.morgan@domain.com"), you'll get a hashed value of your customer tracking token in the validate response. Using Voucherify tracking ids is recommended though.

> 📘 Secure redemption request
>
> For security reasons, we can link a customer who validates a voucher with a customer who consumes it. Therefore, if you want to have a more secure integration with Voucherify API, please use customer `tracking id` in the redemption request.

## Segments

Segments are the key feature of Voucherify because they allow you to define target-specific campaigns and therefore achieve better marketing personalization.

There are two types of segments in Voucherify:

- **Static** – always contains the same number of customers.
- **Auto-update** – customers dynamically join or leave if they match a given filter (e.g., if you [update a customer's property](ref:update-customer) and it matches the filter, the customer will automatically join the segment).

## Static

This is how you can create a static segment programmatically. Add [customer ids](ref:get-customer) in `customers`. 

> ❗ Limit
>
> There is a cap on the number of customers that you can assign to a static segment: **20,000**. If you would like to create a bigger segment, then you can use the unlimited auto-update segment instead and use some customer metadata to build this segment.

```curl cURL
curl -X POST \
      https://api.voucherify.io/v1/segments \
      -H 'content-type: application/json' \
      -H 'x-app-id: c70a6f00-cf91-4756-9df5-47628850002b' \
      -H 'x-app-token: 3266b9f8-e246-4f79-bdf0-833929b1380c' \
      -d '{
      "name": "test segment",
      "customers": ["cust_EkqCdCA7JyIDlFBvkOMTnceJ"],
      "type": "static"
    }'
```

## Dynamic 

Dynamic segments offer filters to select given customers.

```curl cURL
curl -X POST \
    https://api.voucherify.io/v1/segments \
    -H 'content-type: application/json' \
    -H 'x-app-id: c70a6f00-cf91-4756-9df5-47628850002b' \
    -H 'x-app-token: 3266b9f8-e246-4f79-bdf0-833929b1380c' \
    -d '{
        "name": "Berlin",
        "metadata": {},
        "filter": {
            "junction": "and",
            "address.city": {
                "conditions": {
                    "$is": [
                        "Berlin"
                    ]
                }
            }
        }
    }'
```

To get more complex scenarios you can use multiple modifiers. If you're not sure about the syntax, try creating a segment using the Dashboard first and then [get](ref:get-segment) it using a segment id from the URL. An example of more advanced segment filters:

```curl cURL
    "filter": {
            "junction": "and",
            "email": {
                "conditions": {
                    "$ends_with": [
                        "voucherify.io"
                    ]
                }
            },
            "address.city": {
                "conditions": {
                    "$is": [
                        "Warsaw"
                    ]
                }
            },
            "summary.redemptions.total_succeeded": {
                "conditions": {
                    "$less_than": [
                        5
                    ]
                }
            }
```

## Segment operators reference

Filters allow you to group customers by:
- Name	
- Phone	
- Email	
- Created date	
- Postal code	
- City	
- Country	
- System attributes: Source ID, Source metadata, Source
- Gift cards
- Events and custom attributes: Metadata, Events
- Total count of customer orders
- Total amount of customer orders
- The last order total amount
- The last purchased order
- Referred customers
- Redemptions

Each filter gives you a list of operators which you can use to create specific criteria: 
- is
- is not
- has any value
- starts with
- ends with
- contains
- is unknown
- is less than
- is more than
- is exactly
- before
- after

```curl cURL
	{
    "id": "seg_DZvSsr7yDA8sjrTYircSuqb1",
    "name": "Berlin customers",
    "created_at": "2018-08-09T11:39:22Z",
    "metadata": {},
    "filter": {
        "junction": "and",
        "name": {
            "conditions": {
                "$has_value": true
            }
        },
        "email": {
            "conditions": {
                "$ends_with": [
                    ".com"
                ]
            }
        },
        "phone": {
            "conditions": {
                "$starts_with": [
                    "48"
                ]
            }
        },
        "created_at": {
            "conditions": {
                "$before": [
                    "2018-09-01T00:00:00.000Z"
                ]
            }
        },
        "address.postal_code": {
            "conditions": {
                "$is_not": [
                    "32-857"
                ]
            }
        },
        "address.city": {
            "conditions": {
                "$is": [
                    "Berlin"
                ]
            }
        },
        "address.country": {
            "conditions": {
                "$is_unknown": true
            }
        },
        "source_id": {
            "conditions": {
                "$starts_with": [
                    "746"
                ]
            }
        },
        "system_metadata.source": {
            "conditions": {
                "$is": [
                    "web_widget"
                ]
            }
        },
        "system_metadata.web_widget.widgets": {
            "conditions": {
                "$is": [
                    "general"
                ]
            }
        },
        "metadata.pick_up_date": {
            "conditions": {
                "$is_not": [
                    "3 am"
                ]
            }
        },
        "events.cart_abandoned.count": {
            "conditions": {
                "$is": [
                    "1"
                ]
            }
        },
        "summary.orders.total_amount": {
            "conditions": {
                "$more_than": [
                    40000
                ]
            }
        },
        "summary.orders.total_count": {
            "conditions": {
                "$more_than": [
                    1
                ]
            }
        },
        "summary.orders.last_order_date": {
            "conditions": {
                "$less_than": [
                    30
                ]
            }
        },
        "summary.orders.last_order_amount": {
            "conditions": {
                "$more_than": [
                    5000
                ]
            }
        },
        "summary.redemptions.total_succeeded": {
            "conditions": {
                "$is": [
                    3
                ]
            }
        },
        "summary.redemptions.gift.redeemed_amount": {
            "conditions": {
                "$has_value": true
            }
        },
        "loyalty.referred_customers": {
            "conditions": {
                "$more_than": [
                    1
                ]
            }
        }
    },
    "customers": null,
    "type": "auto-update",
    "object": "segment"
	}
  ```


## Export

Customers can be exported in four ways:

- [List customers with the API](ref:list-customers).
- [Get single customer with the API](ref:get-customer).
- [Request CSV export with the API](ref:create-export).
- [With CSV export tool](https://support.voucherify.io/article/67-how-to-import-my-customers#data-export).


