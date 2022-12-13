---
title: Validation Rule Object
excerpt: Schema description
category: 636284b7e6b02c00a136e873
slug: the-validation-rule-object
stoplight-id: 81f9344c1b198
---

> :blue_book:
> 
> This entity stores the [validation rules](doc:validation-rules) used to limit your promo campaigns.

> :blue_book:
>
> You can configure Validation Rule to include your own custom error messages which are going to be returned from API upon validation / redemption failure. You can read more [here](https://docs.voucherify.io/reference/errors#section-custom-error-messages-with-validation-rules).

TABLE

```json Example Response
{
  "id": "val_BHMuN4ZGUsjF",
  "created_at": "2016-09-05",
  "voucher_code": "8ZY60Wtw",
  "id": "val_s3C0nDru7e",
  "name": "Redeemable Once for new Customers",
  "rules": {
    "1": {
      "name": "customer.segment",
      "conditions": {
        "$is": ["seg_n3vVcU5t0m3rs4rEPr3C1oU5"]
      }
    },
    "2": {
      "name": "redemption.count.per_customer",
      "conditions": {
        "$less_than_or_equal": [1]
      }
    },
    "logic": "1 and 2"
  },
  "object": "validation_rules"
}
```