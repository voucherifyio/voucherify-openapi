---
title: Redeemables reference
excerpt: Schema description
category: 636284b7e6b02c00a136e873
slug: redeemables-reference
---

# Redeemables Reference

Redeemables array can gather up to 5 objects. Each array element represents an object that will be redeemed when calling the API. In the reference below, you can learn how to pass each type of redeemable in the payload.  

| **Redeemable type** | **Payload** | **Reference** |
|:---|:---|:---|
| Coupon code (discount voucher) | <br><br><pre>{<br>  "object": "voucher",<br>  "id": "VOUCHER_CODE"<br>}</pre> | <ul><li>object (*string*) required</li><li>id (*string*) required is a voucher code or a unique internal identifier of a voucher code, example "id":<br>     - when using voucher code: blackFriday20<br>     - when using voucher id: `v_Vt0mOlx2OWBmFe9f3e3ElgWSbYsEPTbJ`</li></ul> |
| Gift card (gift voucher) | <br><br><br><br><pre>{<br> "object": "voucher",<br>  "id": "GIFT_VOUCHER_CODE",<br>  "gift": {<br>    "credits": 2000<br>   }<br>}</pre> | <ul><li>object (*string*) required</li><li>id (*string*) required is a gift card code or unique internal identifier of a voucher code, example "id":  <br>    - when using voucher code: gift-87lta6<br>    - when using voucher id: `v_Vt0mOlx2OWBmFe9f3e3ElgWSbYsEPTbJ`</li><li>gift (*object*) required</li><li>gift.credits (*integer*) define the amount that will be deducted from the card balance and applied to the order. You need to multiply the credits amount by 100 in the payload (for example $20 is 2000 in the gift.credits value).</li></ul> |
| Promotion tier | <br><pre>{<br>  "object": "promotion_tier",<br>  "id": "PROMOTION_TIER_ID"<br>}</pre> | <ul><li>object (*string*) required</li><li>id (string) required is a unique internal identifier of a promotion tier, example "id": `promo_DkBL24GWmNZ1A75bhEiBTNWO`</li></ul> |
| Promotion stack<br><br>**Important!**<br>Note that you can pass only one promotion stack in a single validation/redemption call. Each stack can include up to 5 promotion tiers. | <br><pre>{<br>  "object": "promotion_stack",<br>  "id": "STACK_ID"<br>}</pre> | <ul><li>object (*string*) required</li><li>id (*string*) required is a unique internal identifier of a promotion stack, example "id": `stack_3Q4EJpZqg3DI5IRwgBYfsb37`</li></ul> |
| Loyalty card | <br><br><br><br><pre>{<br>  "object": "voucher",<br>  "id": "LOYALTY_CARD_CODE",<br>  "reward": {<br>    "id": "REWARD_ID",<br>    "points": 200<br>   }<br>}</pre> | <ul><li>object (*string*) required</li><li>id (*string*) required is a loyalty card code or a unique internal identifier of a loyalty card, example:<br>    - when using voucher code: card-87lta6<br>    - when using voucher id: `v_Vt0mOlx2OWBmFe9f3e3ElgWSbYsEPTbJ`</li><li>reward (*object*) required is required to redeem loyalty card.</li><li>reward.id (*string*) required is a unique reward identifier.</li><li>reward.points (*integer*) defines how many points will be used to pay for the order (required for redeeming pay with points reward).</li></ul> |
| Referral code | <br><br><pre>{<br>  "object": "voucher",<br>  "id": "REFERRAL_CODE"<br>}<br></pre> | <ul><li>object (*string*) required</li><li>id (*string*) required is a referral code or a unique internal identifier of a referral code, example "id":<br>    - when using voucher code: card-87lta6<br>    - when using voucher id: `v_Vt0mOlx2OWBmFe9f3e3ElgWSbYsEPTbJ`</li></ul> |