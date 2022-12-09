---
title: Troubleshooting
excerpt: 
category: 636284b7e6b02c00a136e86e
slug: troubleshooting
---

### Why does the API return prices multiplied by 100?
That's a correct response. We use this notation to represent floats.

### I haven't got any response, how to check if my redemption has been created?
Use [Get Voucher's Redemptions](ref:vouchers-redemptions) endpoint to make sure that your redemption is on the list with the proper `customer` and timestamp.

### Can I revert redemption?
Use [Rollback Redemption](ref:rollback-redemption).