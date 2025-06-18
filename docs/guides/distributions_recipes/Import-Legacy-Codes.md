---
title: Import legacy codes
excerpt: null
categorySlug: distributions-recipes
slug: import-codes
type: basic
hidden: false
order: 3
---

In Voucherify, you can import legacy coupon codes, for example when you migrate the codes from another tool. After a successful import, the uploaded codes will be recognized as valid and inherit the discount definition from a given campaign.

There are two ways to import codes into Voucherify:
- programmable,
- with the import tool in the Voucherify Dashboard.

## Programmable import through the API

The programmable mode supports both the JSON and CSV payloads. There are four endpoints that handle the import of:
* Generic (standalone) vouchers: [JSON](ref:import-vouchers), [CSV](ref:import-vouchers-using-csv). 
* Vouchers assigned to a given campaign: [JSON](ref:import-vouchers-to-campaign), [CSV](ref:import-vouchers-to-campaign-using-csv).

> 📘 Postman Collection
>
> Go to [Voucherify Postman workspace](https://www.postman.com/voucherify/workspace/voucherify-s-public-workspace/) to test the import:
> - [Import generic (standalone) vouchers with JSON](https://www.postman.com/voucherify/voucherify-s-public-workspace/request/u2cln3f/import-vouchers?tab=overview)
> - [Import generic (standalone) vouchers with CSV](https://www.postman.com/voucherify/voucherify-s-public-workspace/request/z9qk64n/import-vouchers-using-csv)
> - [Import vouchers to campaign with JSON](https://www.postman.com/voucherify/voucherify-s-public-workspace/request/dci1n32/import-vouchers-to-campaign)
> - [Import vouchers to campaign with CSV](https://www.postman.com/voucherify/voucherify-s-public-workspace/request/2f3d8ef/import-vouchers-to-campaign-by-csv)

## Dashboard import tool mode

You can also import codes as generic codes or into campaigns through [the Voucherify dashboard](https://support.voucherify.io/article/45-import-codes-and-share-them-digitally).