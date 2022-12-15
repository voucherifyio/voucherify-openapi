---
title: Import legacy codes
excerpt: null
category: 636284b7e6b02c00a136e884
slug: import-codes
type: basic
hidden: false
order: 3
---

Voucherify makes it easy to import legacy coupon codes. After a successful import operation, the uploaded codes will be recognized as valid and will inherit the discount definition from a given campaign.

There are two ways of importing codes into Voucherify –programmable and with the import tool. 

> 📘 Dashboard mode
> 
> See how to use the import tool [here] (https://support.voucherify.io/article/45-import-codes-and-share-them-digitally).

## Import through the API

The programmable mode handles both on JSON and CSV payload. There're 4 endpoints that handle the import of:

* Standalone vouchers: [JSON](ref:import-vouchers-1) | [CSV](ref:import-vouchers-by-csv-1). 
* Vouchers assigned to a given campaign: [JSON](ref:import-vouchers) | [CSV](ref:import-vouchers-by-csv).

> 📘 Postman Collection
>
> You can play around with this endpoint with our [Postman examples](http://docs.voucherify.io/docs/examples) – catalog `Import`.


