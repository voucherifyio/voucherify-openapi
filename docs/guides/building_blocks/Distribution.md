---
title: Distribution
excerpt: 
category: 636284b7e6b02c00a136e87b
slug: distribution
---

Before you read this tutorial, learn the `distribution` and `publication` concepts [here](https://docs.voucherify.io/docs/key-concepts#section-distributions).

Voucherify gives you several ways of delivering promotions to customers. The key concept of Voucherify delivery is not to send the same incentive twice. To achieve this, you have to mark the code as `published` each time you send something out. While Voucherify takes care of this when you run [distributions in the dashboard](https://docs.voucherify.io/docs/automatic-delivery), you should remember to ensure this with the API when you implement delivery with your custom channels.

## Publish with the API

Voucherify provides the endpoint to help you distribute codes to your customers. [Create Publication](https://docs.voucherify.io/reference/create-publication) does two things:
- Randomly selects a non-published code from a campaign (if you choose to publish from a campaign).
- Marks this code as `published`.

A few things are essential here:

- A voucher is suitable for publication when it's active and hasn't been published yet.
- You have to clearly define which source you want to publish a voucher code from. It can be either a code from a `campaign` or a specific `voucher` identified by code.
- If you want to publish multiple vouchers within a single publication you need to specify the campaign name and number of vouchers you want to publish.
- If you want to ensure the number of publishable codes increases automatically with the number of customers, you should use the `auto-update` campaign.

Let's imagine two scenarios:

- You want to publish a specific code to a specific customer.
- You want to publish any code from a given [campaign](https://docs.voucherify.io/reference#the-campaign-object) and then make sure that **the same** code won't be published **ever** again.

Handling both of these scenarios comes down to calling the endpoint in a slightly different way.

## Specific voucher code

In the following example, we publish `BmkocdXu` code to the specific [customer](ref:the-customer-object)  (`cust_hOA02xicf72GZYsYko4y1CMc`). As you can see, we defined a channel which is an optional parameter but can be used for reporting in the future.  

```curl
curl -X POST \
	-H "X-App-Id: c70a6f00-cf91-4756-9df5-47628850002b" \
	-H "X-App-Token: 3266b9f8-e246-4f79-bdf0-833929b1380c" \
	-H "Content-Type: application/json" \
	-d '{
	  "voucher": "ycs2AnLT",
		"customer": "cust_RZa0oS7qUT9giVISFVJhKlMq",
		"channel": "newsletter_October"
	}' \
	https://api.voucherify.io/v1/publications
```

This creates the following publication object.

```curl 200 OK
{
   "id":"pub_r5jzJLCnKW3JIKrMcGsZhjmf",
   "object":"publication",
   "created_at":"2018-07-31T12:10:40Z",
   "customer_id":"cust_RZa0oS7qUT9giVISFVJhKlMq",
   "tracking_id":"12344",
   "channel":"newsletter_October",
   "voucher":{
      "code":"ycs2AnLT",
      "campaign":null,
      "category":null,
      "type":"DISCOUNT_VOUCHER",
      "discount":{
         "type":"PERCENT",
         "percent_off":10.0
      },
      "gift":null,
      "start_date":null,
      "expiration_date":null,
      "validity_timeframe":null,
      "validity_day_of_week":null,
      "publish":{
         "object":"list",
         "count":1,
         "url":"/v1/vouchers/ycs2AnLT/publications?page=1&limit=10"
      },
      "redemption":{
         "object":"list",
         "quantity":1,
         "redeemed_quantity":0,
         "url":"/v1/vouchers/ycs2AnLT/redemptions?page=1&limit=10"
      },
      "active":true,
      "additional_info":null,
      "metadata":null,
      "is_referral_code":false,
      "updated_at":"2018-07-31T12:10:40Z"
   }
}
```

## Dynamic code

So, now imagine you want to publish code from a predefined pool (campaign). You don't care about which code is delivered to a customer unless it's unique. For example, you want to send coupons to the first 1000 users who sign up for a newsletter. 

The first thing is to create a respective campaign with 1000 codes. Once you do it, you can start to use the publish method. This time you pass the campaign name and provide a customer profile.

> :blue_book: Auto_update option
> 
> If you don't know the number of codes to be published, the AUTO-UPDATE campaign might be helpful. Such a campaign will be auto-extended with new, unique codes after the original pool of codes has been used.

```curl
curl -X POST \
  -H "X-App-Id: c70a6f00-cf91-4756-9df5-47628850002b" \
  -H "X-App-Token: 3266b9f8-e246-4f79-bdf0-833929b1380c" \
  -H "Content-Type: application/json" \
  -d '{
    "campaign": { 
      "name": "100k-test", 
      "count": 2 
    },
		"customer": {
      "email": "erlich@bachmanity.com",
      "name": "Erlich Bachman"
    },
    "metadata": {
      "test": true,
      "provider": "Shop Admin"
    }
  }' \
  https://api.voucherify.io/v1/publications
```

In the previous example, we assigned the publication to an existing customer (identified with the `cust_id`), in this case, we're using the `customer` section to create a new [customer](ref:the-customer-object) entity.

```curl 200 OK Response
{
   "id":"pub_b03zI1AVaBHjDl4QSjs3Drve",
   "object":"publication",
   "created_at":"2018-07-31T12:12:52Z",
   "customer_id":"cust_lDnTN0zZfoXJDdgZRV0DzDP6",
   "channel":"API",
   "metadata":{
      "test":true,
      "provider":"Shop Admin"
   },
   "vouchers":[
      "pNAtHYW8",
      "8tOtXQQa"
   ]
}
```

## List Publications

Every time coupon code is published either from the distribution or a referral campaign, Voucherify stores a corresponding `publication` entry. When you [get](ref:vouchers-get) the voucher, its `publish` section of the response body will show the publication details.

```json Get Voucher response part
publish":{  
      "object":"list",
      "count":1,
      "data_ref":"entries",
      "entries":[  
         {  
            "customer_id":"cust_RZa0oS7qUT9giVISFVJhKlMq",
            "customer":"12344",
            "channel":"newsletter_October",
            "published_at":"2018-07-31T12:10:41Z",
            "metadata":null,
            "object":"publication"
         }
      ],
      "total":1,
      "url":"/v1/vouchers/ycs2AnLT/publications?page=1&limit=10"
   }
```

This table lists built-in publication channels.

TABLE

If you want to track which customers got their codes so far, you can use the [list](https://docs.voucherify.io/v2017-04-20/reference#list-publications) endpoint. The publications are returned in sorted order, with the most recent ones appearing first.

`filters` query param allow for joining multiple parameters with logical operators. The syntax looks as follows:

`filters[<field_name>][conditions][<operator>][<index>]=<value>`

Operators:  
- "$in"  
- "$not_in"  
- "$is" 
- "$is_not"  
- "$has_value"  
- "$is_unknown"  
- "$contains"  
- "$starts_with"  
- "$ends_with"  
- "$more_than"  
- "$less_than" 
- "$more_than_equal" 
- "$less_than_equal"

*Example 1 – list publications of a given customer*

    GET /v1/publications?filters[customer_id][conditions][$is][0]=cust_lUET6gRpO5Wxlg5p2j2gRCgL

*Example 2 – list publications of two customers*

    GET /v1/publications?filters[customer_id][conditions][$in][0]=cust_lUET6gRpO5Wxlg5p2j2gRCgL&filters[customer_id][conditions][$in][1]=cust_aR7NfHusxT7PdTMAKMfWDXnc

or with the `junction` operator

    GET /v1/publications?filters[customer_id][conditions][$is][0]=cust_lUET6gRpO5Wxlg5p2j2gRCgL&filters[customer_id][conditions][$is][1]=cust_aR7NfHusxT7PdTMAKMfWDXnc&filters[junction]=OR
