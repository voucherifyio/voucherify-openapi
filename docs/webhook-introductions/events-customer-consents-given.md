<!-- theme: warning -->
> 🚧 The Qualifications endpoint in the basic mode ignores the rules checking:
>
> - Limit of total redeemed discount amount per campaign
> - Limit of total redemptions count per campaign
> - Redemptions per customer
> - Redemptions per customer in a campaign

Generate a list of redeemables that are applicable in the context of the customer and order.

The new qualifications method is an improved version of [Campaign Qualifications](ref:examine-campaigns-qualification), [Voucher Qualifications](ref:examine-vouchers-qualification), and [Promotions Validation](ref:validate-promotions) API requests. The new qualification method introduces the following improvements:

- Qualification results are returned faster
- No limit on the number of returned redeemables
- Introduces new qualification scenarios, not available in the previous version

> 👍 Scenario Guide
>
> Read our dedicated guide to learn about some use cases this endpoint can cover [here](doc:checking-eligibility).

## Paging

The Voucherify Qualifications API request will return to you all of the redeemables available for the customer in batches of up to 50 redeemables. To get the next batch of redeemables, you need to use the `starting_after` cursor.

To process of paging the redeemables works in the following manner:

- You send the first API request for Qualifications without the `starting_after` parameter.
- The response will contain a parameter named `has_more`. If the parameter's value is set to `true`, then more redeemables are available.
- Get the value of the `created_at` parameter of the last returned redeemable. The value of this parameter will be used as a cursor to retrieve the next page of redeemables.
- Send another API request for Qualification with the `starting_after` parameter set to the value taken from the `created_at` parameter from the last returned redeemable.
- Voucherify will return the next page of redeemables.
- If the `has_more` parameter is set to `true`, apply steps 3-5 to get the next page of redeemables.


> 👍 Scenario Guide
>
> Read our dedicated guide to learn about some use cases this endpoint can cover [here](doc:checking-eligibility).
