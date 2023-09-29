---
title: Orders
excerpt: 
categorySlug: building-blocks
slug: orders
type: basic
hidden: false
order: 4
---

Some promotions might depend on the purchase history of customers. To model these scenarios in Voucherify, you can use the Order object. An order stores the cart structure (products and SKUs), the total amount of a transaction, and status: `CREATED`, `PAID`, `CANCELED`, `FULFILLED`. You can track orders in the dashboard and with the API.

> 📘 Object definition
> 
> [Order object reference](ref:get-order)

## Mapping your order workflow

We designed the order entity so that it helps you map your e-commerce process. Go through these concepts to understand how you can integrate [orders](ref:get-order) into your workflow.

### Order identifier

Similarly to [the customer object](ref:get-customer), you can use `source_id` field to identify orders using your system id (external id). Besides `source_id`, Voucherify automatically assigns a unique internal id to each created order.

Once you pass a new order, it is saved in Voucherify. You can refer to the particular order using its `id` or `source_id`

### Create order

An order can be created in two ways: 
 1.  By passing `order` as payload in [redemption request](ref:redeem-voucher). 
 2. With [create order endpoint](ref:create-order). You can later link this order to a corresponding redemption with `id` or `source_id`. In this case, it's not necessary to provide the payload again – if you do so, however, the object will be upserted.

### Order status

If you provide the status field in the redemption payload, it will override a linked order status.
* If a redemption request is successful, Voucherify will set a related order to `PAID`.
* Otherwise, the status will remain the same or will get the value from the request payload.
* A successful [rollback operation](ref:rollback-redemption) will set the order to `CANCELED`.
* If this behavior is not expected, you should pass the status field (e.g. `PAID`) in the request body of the rollback request.

## Order-based validation rules

Validation rules can work with orders twofold:

- Introduce thresholds on cart structure and volume.
- Count the number of purchases in a timeframe or total amount of these purchases.

See [this guide](https://support.voucherify.io/article/263-how-can-i-track-customer-orders#rules) for more details.

## Stacking discounts

Voucherify lets you apply many discounts to the same order. It comes down to the following steps:
1. Redeem the first discount by calling the redemption API and pass order details in the request body. In response, Voucherify returns a unique order id with an applied discount.
2. To apply the 2nd and further discounts, you need to redeem each discount using a separate API call with the same order id in the request body. 
Read more about [Stacking discounts](doc:manage-stackable-discounts).

## Order session

Each time you use particular order in your requests, the API automatically triggers a new session linked to the order id. The session is active during the request and ends asynchronously after the request is completed. The session mechanism provides that the particular order id can be used in one API request at once.
