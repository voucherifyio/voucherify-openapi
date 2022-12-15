---
title: Establish Validation Session
excerpt: Schema description
category: 636284b7e6b02c00a136e873
slug: establish-validation-session
type: basic
hidden: false
order: 2
parentDoc: 63990bce815567007e6617dc
---

# Establish Validation Session

The default validation/redemption mechanism always works in a transactional way, therefore the voucher's usage is registered permanently once redemption is successful. In case, the resource usage is needed to be recorded temporary right after the voucher is being validated the session mechanism will come in handy.

Once the session is established the session key is being returned. The key must be used with the following requests (another validation or redemption) to identify clearly the session. Multiple requests with the same key will always override existing session values.

The session can be released in one of the following ways:

* expiration time passes
* redemption is being registered for the session
* manual release using a dedicated API endpoint (for vouchers only: [Release Validation Session](OpenAPI.json/paths/~1vouchers~1{code}~1sessions~1{session_key}/delete))  

<!-- theme: danger -->
> #### Session Key
> 
> To link request with the given session always use the same session key for session-related validation and redemption requests. You can use your own session key or system will generate one for you once session option is enabled with the request.  

Please note that if you want to use the established session during validations/redemptions, you need to pass the same session key in each validation and redemption request.  

<!-- theme: danger -->
> #### Validation and Redemption with Session
> 
> Registering a session will record a temporary usage for the specified timeframe. It means it will influence other incoming validation and redemption requests until the session is released.
> 
> Once redemption is successful there is no need to session exists as redemption transaction is recorder therefore the session will be removed automatically.  

## Session types
The following table presents the type of sessions that can be established.  

| **Session Type** | **Behaviour** |
|:---|:---|
| LOCK | Locks the following parameters within the session:<br><ul><li> redemption quantity by 1</li><li>redemption gift credits specified with the requests</li><li>redemption loyalty points specified with the request</li></ul> |  

## Session object reference  

| **Parameter** | **Description** | **Example** |
|:---|:---|:---|
| session.type<br>`string`<br>*required* | Type of the session. Required to establish a new session.<br>Supported session types are listed in the table above. | <pre>"session":{<br>    "type": "LOCK"<br>}</pre> |
| session.key<br>`string`<br>*optional* | Unique session identifier. If you won't pass your own key, the API generates and returns unique session key. | <pre>"session": {<br>    "key": "ssn_yQGMTeKBSw8OOuFPwlBEjzGy8d8VA9Ts",<br>    "type": "LOCK"<br>}</pre> |
| session.ttl_unit<br>`string`<br>*optional* | Defines the type of unit in which session time is counted. <br><br>Allowed values: `DAYS`, `HOURS`, `MICROSECONDS`, `MILLISECONDS`, `MINUTES`, `NANOSECONDS`, `SECONDS` | <pre>"session": {<br>    "type": "LOCK",<br>    "ttl": 7,<br>    "ttl_unit": "DAYS"<br>}</pre> |
| session.ttl<br>`number`<br>*optional* | Value for the period of time that the session is active. Units for this paremeter are defined by session.ttl_unit | <pre>"session": {<br>    "type": "LOCK",<br>    "ttl": 7,<br>    "ttl_unit": "DAYS"<br>}</pre> |  

```cURL Example Request
curl -X POST \
 -H "X-Client-Application-Id: 011240bf-d5fc-4ef1-9e82-11eb68c43bf5" \
 -H "X-Client-Token: 9e2230c5-71fb-460a-91c6-fbee64707a20" \
 -H "Content-Type: application/json" \
 -H "origin: yourdomain.com" \
 -d '{
    "options": {
        "include_orders": false,
        "extended_redemptions": false
    },
    "redeemables": [
        {
            "object": "voucher",
            "id": "v_MIP3ct0S6YbiH6Jw7cyu1sj0kr3tECQ1"
        }
    ],
    "session": {
        "type": "LOCK"
    },
    "order": {
        "items": [
            {
                "quantity": 3,
                "sku_id": "sku_0a34daa81d8924d7b6",
                "amount": 4000
            },
            {
                "quantity": 1,
                "sku_id": "sku_0a34daa81d8924d7b6",
                "amount": 4000
            }
        ]
    }
}
```
```json Example Response
{
    "valid": true,
    "redeemables": [
        {
            "status": "APPLICABLE",
            "id": "v_MIP3ct0S6YbiH6Jw7cyu1sj0kr3tECQ1",
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
                    "amount_off": 4000
                }
            }
        }
    ],
    "order": {
        "amount": 8000,
        "discount_amount": 4000,
        "total_discount_amount": 4000,
        "total_amount": 4000,
        "applied_discount_amount": 4000,
        "total_applied_discount_amount": 4000,
        "items": [
            {
                "object": "order_item",
                "product_id": "prod_0a34daa7864924d7a6",
                "sku_id": "sku_0a34daa81d8924d7b6",
                "quantity": 3,
                "amount": 4000,
                "price": 4000,
                "subtotal_amount": 4000,
                "product": {
                    "id": "prod_0a34daa7864924d7a6",
                    "source_id": "muffinchocolate",
                    "name": "Muffin chocolate",
                    "price": 3000
                },
                "sku": {
                    "id": "sku_0a34daa81d8924d7b6",
                    "source_id": "muffinchocolateL",
                    "sku": "Muffin chocolate L",
                    "price": 4000
                }
            },
            {
                "object": "order_item",
                "product_id": "prod_0a34daa7864924d7a6",
                "sku_id": "sku_0a34daa81d8924d7b6",
                "quantity": 1,
                "amount": 4000,
                "price": 4000,
                "subtotal_amount": 4000,
                "product": {
                    "id": "prod_0a34daa7864924d7a6",
                    "source_id": "muffinchocolate",
                    "name": "Muffin chocolate",
                    "price": 3000
                },
                "sku": {
                    "id": "sku_0a34daa81d8924d7b6",
                    "source_id": "muffinchocolateL",
                    "sku": "Muffin chocolate L",
                    "price": 4000
                }
            }
        ],
        "customer_id": null,
        "referrer_id": null,
        "object": "order"
    },
    "session": {
        "key": "ssn_cj1pHteWyJRbFX5sRFypZ0ricS7Xyzl0",
        "type": "LOCK",
        "ttl": 7,
        "ttl_unit": "DAYS"
    }
}
```  

> 📘 Default Session Time 
> 
> If you won't establish session timeframe by passing the session.ttl and session.ttl_unit, it'll be active throughout 7 days. 

```json Default session object
"session": {
    "key": "ssn_cj1pHteWyJRbFX5sRFypZ0ricS7Xyzl0",
    "type": "LOCK",
    "ttl": 7,
    "ttl_unit": "DAYS"
}
```  

You can always remove the established session by calling [Release Validation Session](OpenAPI.json/paths/~1vouchers~1{code}~1sessions~1{session_key}/delete) endpoint.