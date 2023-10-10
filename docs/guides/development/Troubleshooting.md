---
title: Troubleshooting
excerpt: 
categorySlug: development
slug: troubleshooting
type: basic
hidden: false
order: 11
---

### Why does the API return prices multiplied by 100?

That's a correct response. We use this notation to represent floats.

### I haven't got any response, how to check if my redemption has been created?

Use [Get Voucher's Redemptions](ref:get-voucher-redemptions) endpoint to make sure that your redemption is on the list with the proper `customer` and timestamp.

### Can I revert redemption?

Use [Rollback Redemption](ref:rollback-redemption).
