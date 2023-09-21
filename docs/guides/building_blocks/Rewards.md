---
title: Rewards
excerpt: 
categorySlug: building-blocks
slug: rewards
type: basic
hidden: false
order: 11
---

Voucherify enables you to add multiple rewards that you can later use in loyalty, referral, and giveaway campaigns. Each reward is defined in a separate [Reward object](ref:get-reward) and can be mapped to a specific amount of loyalty points with the [Reward Assignment object](ref:get-reward-assignment).

## Create Reward Object

A reward can be a discount code or gift card from a previously created [campaign](ref:create-campaign) or a physical [product](ref:create-product). To create a reward, you need to:
1. Create a reward: 
  * A [campaign](ref:create-campaign) of codes which will be used as rewards, for example, 5$ discount codes.
  * A physical product from your inventory that will be offered as a reward. 
2. Create a [reward object](ref:get-reward) which assigns a campaign to the reward.

```curl Rewards from coupon campaigns
curl -X POST \
-H "X-App-Id: c70a6f00-cf91-4756-9df5-47628850002b" \
-H "X-App-Token: 3266b9f8-e246-4f79-bdf0-833929b1380c" \
-H "Content-Type: application/json" \                
-d '{                                                   
        "name": "5$ discount",                              
        "parameters": {                                          
                "campaign": {
                        "id": "camp_gtNM5oQJybruzANwYv1mgHk6"
                }
        }
}' "https://api.voucherify.io/v1/rewards"
```

```curl Physical products as rewards
curl -X POST \
-H "X-App-Id: c70a6f00-cf91-4756-9df5-47628850002b" \
-H "X-App-Token: 3266b9f8-e246-4f79-bdf0-833929b1380c" \
-H "Content-Type: application/json" \                
-d '{
         “name”: “Calendar”,
         “parameters”: {
           “product”: {
             “id”: “prod_QKhKB3NzP8XddB”
           }
         },
         “type”: “MATERIAL”,
         “attributes”: {
           “description”: “free_calendar_2019”,
           “image_url”: “https://voucherify-uploads.s3.amazonaws.com/org_8nvS8EEWZ0eapBnOsCKUH9F1N3mriqi1/img_UXFWPTYxH4Msq4kTXlu4LuWi.jpeg”
         },
         “stock”: 5
}
```

You can make as many rewards as you need. Each Reward object will map reward to a particular campaign of codes or chosen products. 

Once you have the rewards, you can define how many points they are worth in your loyalty program. For example, to get a $5 discount as a reward, your customer needs to spend X loyalty points. To manage that via API, you need a [Reward Assignment object](ref:create-reward-assignment-1). 

## Reward Assignment Object

Reward Assignment object tells your customers how many points they need to have to get a particular reward. Creating this object comes down to connecting a unique reward id and the amount of points assigned to this reward.

```curl
curl -X POST \
-H "X-App-Id: c70a6f00-cf91-4756-9df5-47628850002b" \
-H "X-App-Token: 3266b9f8-e246-4f79-bdf0-833929b1380c" \
-H "Content-Type: application/json" \
-d '[{
    "reward": "rew_2yGflHThU2yJwFECEFKrXBI2",
    "parameters": {
				"loyalty": {
						"points": 15
				}
    }
}]' \
"https://api.voucherify.io/v1/loyalties/camp_MgpTUyabvEVaGvbUKAOiSVwL/rewards"
```

Reward and Reward Assignment objects allow for rewarding customers who already collected points in your loyalty program. If you want to learn how to enable your customers to earn points in the first place, follow [here](doc:earning-rules).

If you already have both earning rules and rewards ready, you can create a [loyalty program](doc:loyalty-program).
