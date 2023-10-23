---
title: Loyalty Program
excerpt: null
categorySlug: campaigns-recipes
slug: loyalty-program
type: basic
hidden: false
order: 5
---

In this tutorial, you’ll learn how to use Voucherify API to build a loyalty program.

> 👍 Recommended
>
> Read the [loyalty program user guide](https://support.voucherify.io/article/177-how-to-create-loyalty-program-step-by-step) to get an overview of this campaign type.


# Prerequisites
To create a `loyalty campaign`, you need two prerequisites:
* **Events** that enable customers to collect points. 
* **Campaigns** or **Products**, which will serve as rewards.

We’ll use `events` to describe earning rules (how your `customers` can collect points) and `campaigns` to define available `rewards`.  

## Earning events
Voucherify accepts three event types of earning rules:
* Customer entered a segment.
* Order paid event.
* Custom event.

The loyalty campaign will detect the first two events automatically when a customer enters a segment or when **any** of customer’s [orders](doc:orders) will be changed to `PAID`. 

Trigger the third option with [Track Custom Event](ref:track-custom-event) endpoint.

```json
{
  "event":"submit_review",
  "customer":{
    "source_id":"alice@morgan.com"
  },
  "metadata":{
    "url":"http://example.com/reviews/ACM3",
    "rank":5
  }
}
```

> 📘 Event schema
> 
> To use a custom event in a loyalty program, you need to define it in the [Schema](https://support.voucherify.io/article/163-how-to-track-custom-events-and-use-them-in-referral-campaigns-events-schema) beforehand.

## Creating rewards

While creating a new loyalty campaign with the dashboard, you can tap into existing discount coupons and gift cards or you can create a new one on the fly. 

With the API, you can first create a reward object with a dedicated [endpoint](ref:create-reward) and then you can assign it to a specific campaign using another dedicated [endpoint](ref:create-reward-assignment).


```json
{
  "name":"5$ discount",
  "parameters":{
    "campaign":{
      "id":"camp_gtNM5oQJybruzANwYv1mgHk6"
    }
  }
}
```

# Creating a loyalty campaign

## Campaign container

The first step is to define the loyalty program in terms of size and timeframe. To do so, you can use [Create Loyalty Program](ref:create-loyalty-program) endpoint. 

> 🚧 Time limits
>
> A campaign is only active between the start and end dates. You can also use [validity timeframes](https://support.voucherify.io/article/132-time-limits-for-vouchers) to define the time when points are collected.

```json
{
  "name":"ACME Loyalty Program",
  "start_date":"2018-10-26T00:00:00Z",
  "vouchers_count":1000,
  "voucher":{
    "type":"LOYALTY_CARD",
    "loyalty_card":{
      "points":0
    },
    "code_config":{
      "pattern":"ACME-CARD-#######"
    }
  },
  "metadata":{
    "test":true
  },
  "type":"AUTO-UPDATE"
}
```

The `LOYALTY_CARD` voucher type is responsible for creating loyalty cards of the initial number defined with `vouchers_count`. If `type` is `AUTO-UPDATE`, the number will be incremented automatically even if you ran out of the initial pool. 

See [vouchers](doc:vouchers) to learn more about features a loyalty card can carry.

## Rewards and their cost in points

Assuming you’ve created at least one coupon/gift card campaign, let’s see how we can use it as a loyalty reward.

This is a simple process and comes down to creating a `Reward Assignment`. You need three parameters to create one: a campaign id, a reward id, and the number of points that will be deducted from a customer’s account when he or she decides to exchange points for the reward.

https://api.voucherify.io/v1/loyalties/camp_MgpTUyabvEVaGvbUKAOiSVwL/rewards

```json
[
  {
    "reward":"rew_2yGflHThU2yJwFECEFKrXBI2",
    "parameters":{
      "loyalty":{
        "points":15
      }
    }
  }
]
```

**Notes**
* A customer can redeem points only for these rewards which have been linked with the campaign as shown above.
* All these rewards will show up in a customer’s cockpit.  
* You can add as many rewards as you want. 

## Adding program participants

Customers can join a program if you invite them or automatically if they perform any of the earning rules. To do so, you can issue a loyalty card via the dashboard, or use a specific API endpoint. 

In this case, you should call [Create Member](ref:add-member) by providing a campaign id and a customer joining the program.

https://api.voucherify.io/v1/loyalties/{campaignId}/members

```json 
{
  "customer":{
    "source_id":"test-user@voucherify.io",
    "email":"test-user@voucherify.io",
    "name":"Test User"
  },
  "metadata":{
    "test":true,
    "provider":"Shop Admin"
  }
}
```

In response, you'll get a unique loyalty card from the campaign.

```json
{
  "id": "v_GqbkSoXI6WDi3WTFJ76xXyrGRSQxYXbD",
  "code": "ACME-CARD-3ug8G2E",
  "campaign": "Loyalty Campaign",
  "campaign_id": "camp_Zgj5HFIPcb70SWJ4IjBNta2F",
  "category": null,
  "type": "LOYALTY_CARD",
  "discount": null,
  "gift": null,
  "loyalty_card": {
    "points": 0,
    "balance": 0
  },
  "start_date": "2016-10-26T00:00:00Z",
  "expiration_date": null,
  "validity_timeframe": null,
  "validity_day_of_week": null,
  "publish": {
    "object": "list",
    "count": 1,
    "url": "/v1/vouchers/ACME-CARD-3ug8G2E/publications?page=1&limit=10"
  },
  "redemption": {
    "object": "list",
    "quantity": null,
    "redeemed_quantity": 0,
    "url": "/v1/vouchers/ACME-CARD-3ug8G2E/redemptions?page=1&limit=10"
  },
  "active": true,
  "additional_info": null,
  "metadata": {
    "test": true
  },
  "is_referral_code": false,
  "holder_id": "cust_ySv6heq8iPQhzt0HjGCFlMni",
  "updated_at": null
}
```

Alternatively, you can assign a loyalty card to a customer and invite them to the projects with [Create Publication](ref:create-publication) endpoint.

You can [List Members](ref:list-members) to check who’s enrolled at the moment.

## Earning points

Let’s see how you can use the Loyalties API to manage points earning. Having your events set up, as shown above, you can start creating [earning rules](ref:create-earning-rule). A typical rule ties an event with a number of points to be earned by a customer. 

Sometimes, you might want to impose extra limitations on customers who perform a given event. You can do this by attaching [validation rules object](doc:validation-rules) to your earning rules.

https://api.voucherify.io/v1/loyalties/camp_Zgj5HFIPcb70SWJ4IjBNta2F/earning-rules

```json
[
  {
    "event":"order.paid",
    "validation_rule_id":null,
    "loyalty":{
      "points":5
    },
    "source":{
      "banner":"Get 5 points for every order!"
    }
  }
]
```

## Redeeming points for rewards

Now, that we’ve put together all necessary elements of a loyalty campaign, we can see how to handle points redemption. To do so, just call the [Redeem Reward](ref:redeem-reward-1) by providing a campaign, participant, and reward id.
	https://api.voucherify.io/v1/loyalties/camp_yGEDLqgb9Es1ldwqU3K9PYv0/members/HVqWlozp/redemption or a similar [Redeem Reward](ref:redeem-reward) endpoint that does not require the campaign ID in the path.

```json
{
  "reward":{
    "id":"rew_2yGflHThU2yJwFECEFKrXBI2"
  },
  "metadata":{
    "locale":"en-GB"
  }
}
```

Voucherify will calculate if a customer is eligible for redemption, checking both points balance and validation rules (if specified).

In case of success, it creates a redemption object.

```json
{
  "id":"r_sLUnotINY8ML9dfuwlmWm9q9",
  "object":"redemption",
  "date":"2019-04-19T13:17:04Z",
  "customer_id":"cust_PiguvGHitud7xXJ6vHxTCONi",
  "tracking_id":"test-user@voucherify.io",
  "amount":50,
  "reward":{
    "id":"rew_2yGflHThU2yJwFECEFKrXBI2",
    "assignment_id":"rewa_ilF45izuc5BS1mp6ydyivfXs"
  },
  "metadata":{
    "locale":"en-GB"
  },
  "result":"SUCCESS",
  "voucher":{
    "id":"v_n7ysN4Cs8XPagkulUgtKbNGoZmbbLi5X",
    "code":"HVqWlozp",
    "campaign":"Loyalty program 1",
    "campaign_id":"camp_yGEDLqgb9Es1ldwqU3K9PYv0",
    "category":null,
    "type":"LOYALTY_CARD",
    "discount":null,
    "gift":null,
    "loyalty_card":{
      "points":2000,
      "balance":1950
    },
    "start_date":null,
    "expiration_date":null,
    "validity_timeframe":null,
    "validity_day_of_week":null,
    "publish":{
      "object":"list",
      "count":1,
      "url":"/v1/vouchers/HVqWlozp/publications?page=1&limit=10"
    },
    "redemption":{
      "object":"list",
      "quantity":null,
      "redeemed_quantity":1,
      "url":"/v1/vouchers/HVqWlozp/redemptions?page=1&limit=10",
      "redeemed_points":50
    },
    "active":true,
    "additional_info":null,
    "metadata":null,
    "is_referral_code":false,
    "holder_id":"cust_PiguvGHitud7xXJ6vHxTCONi",
    "updated_at":"2019-04-19T13:17:04Z",
    "object":"voucher"
  }
}
```

When a customer gains the required number of points, the reward is automatically published in their cockpit (it's active). Then, they can exchange them for rewards with a corresponding button. 

If the customer chooses to transfer points for the reward, Voucherify updates their points balance.

# Maintenance

If you need to set a customer’s balance manually, you can do it with [this endpoint](ref:add-remove-loyalty-card-balance-1) or this [endpoint](ref:add-remove-loyalty-card-balance).

https://api.voucherify.io/v1/loyalties/camp_Zgj5HFIPcb70SWJ4IjBNta2F/members/L-CARD-3ug8G2E/balance


```json
{
  "points": 2000
}
```

Note that any `reward`, `reward assignment`, `loyalty campaigns`, and its `members` can be modified via the API. Explore the Rewards and Loyalty APIs to learn the CRUD methods:

| **Rewards API** | **Loyalties API** |
|---|---|
| [The reward object](ref:get-reward) <br>[List Rewards](ref:list-rewards) <br>[Create Reward](ref:create-reward) <br>[Get Reward](ref:get-reward) <br>[Update Reward](ref:update-reward) <br>[Delete Reward](ref:delete-reward) <br>-<br>[The reward assignment object](ref:get-reward-assignment) <br>[List Reward Assignments](ref:list-reward-assignments)<br>[Create Reward Assignment](ref:create-reward-assignment)<br>[Update Reward Assignment](ref:update-reward-assignment)<br>[Delete Reward Assignment](ref:delete-reward-assignment) | [List Loyalty Programs](ref:list-loyalty-programs)<br>[Create Loyalty Program](ref:create-loyalty-program)<br>[Get Loyalty Program](ref:get-loyalty-program)<br>[Update Loyalty Program](ref:update-loyalty-program)<br>[Delete Loyalty Campaign](ref:delete-loyalty-program)<br>-<br><br>[List Reward Assignments](ref:list-reward-assignments-1)<br>[Create Reward Assignment](ref:create-reward-assignment-1)<br>[Update Reward Assignment](ref:update-reward-assignment-1)<br>[Delete Reward Assignment](ref:delete-reward-assignment-1)<br>-<br><br>[The earning rule object](ref:get-earning-rule)<br>[List Earning Rules](ref:list-earning-rules)<br>[Create Earning Rule](ref:create-earning-rule)<br>[Update Earning Rule](ref:update-earning-rule)<br>[Delete Earning Rule](ref:delete-earning-rule)<br>-<br><br>[List Members](ref:list-members) <br>[Add Member](ref:add-member) <br>[Get Member](ref:get-member) <br>[Add or Remove Loyalty Card Balance](ref:add-remove-loyalty-card-balance-1) <br>[Redeem Reward](ref:redeem-reward) |
