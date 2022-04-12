---
tags: [STACKABLE DISCOUNTS API]
---

# Stacking API Overview
<!-- theme: danger -->
> #### Beta feature
>
> Stackable discounts API is currently in Open Beta. Note that Beta features **can change during the beta period**. Feel free to test the feature and [share your feedback](https://www.voucherify.io/contact-support). For more updates, please follow our [release notes](https://support.voucherify.io/article/23-whats-new-in-voucherify).

Stackable Discounts API enables you to validate and redeem up to 5 objects in a single request. You can use coupons, gift cards, promotion tiers, loyalty, and referral codes. In the redemption request, you need to provide a list of redeemables that define redeemed/validated objects.

| **The workflow** | **API Endpoint** |
|:---|:---|
| VALIDATION<br><br>Validation checks if all redeemables provided in the request can be applied in the given context (checks customer and order details against validation rules and other attached limits). Only if all redeemables can be applied, the validation returns `valid: true`. | <br>POST `https://URL/v1/validations` for server-side<br>POST `https://URL/client/v1/validations` for client-side |
| REDEMPTION<br><br>You can pass up to 5 redeemables that will be redeemed during the request. Only if all redeemables can be applied (each redeemable is validated before the redemption), the redemption is successful. | <br>POST `https://URL/v1/redemptions` for server-side<br>POST `https://URL/client/v1/redemptions` for client-side |
| ROLLBACK<br><br>In the case of unwanted redemption, you can roll it back. Note that if you call this endpoint, all applied discounts will be rolled back too. There is no way to roll back a redemption of a single redeemable. | <br>POST `https://URL/v1/redemptions/parent_redemption_id/rollbacks` |
