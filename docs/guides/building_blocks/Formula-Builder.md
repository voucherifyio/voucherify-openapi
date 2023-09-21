---
title: Formula Builder
excerpt: 
categorySlug: building-blocks
slug: formula-builder
type: basic
hidden: false
order: 14
---

Instead of using a static value for a given discount, you can also create formulas with mathematical and logical operators and assign a dynamic discount value. Discounts will be calculated during redemption based on the provided formula and metadata values. 

> 📘 Visit our detailed guide
>
> Read more about our Dynamic Discount Value Builder [here](https://support.voucherify.io/article/568-how-to-create-dynamic-discount-value).

## Examples

Here are a few examples of how a discount can be based on a formula.

```json Percent
"discount": {
        "type": "PERCENT",
        "percent_off": 3,
        "percent_off_formula": "CUSTOMER_METADATA(\"age\")",
        "effect": "APPLY_TO_ITEMS"
}
```
```json Amount
"discount": {
        "type": "AMOUNT",
        "amount_off": 500,
        "amount_off_formula": "IF(ORDER_UNITS_QUANTITY = 3;CUSTOMER_METADATA(\"age\") * 2;CUSTOMER_METADATA(\"age\"))",
        "effect": "APPLY_TO_ITEMS"
}
```
```json Unit
"discount": {
        "type": "UNIT",
        "unit_off": 1,
        "unit_off_formula": "IF(ORDER_UNITS_QUANTITY > 3;CUSTOMER_METADATA(\"age\") / 5;CUSTOMER_METADATA(\"age\") / 10)",
        "unit_type": "sku_0b661e41eccd35a8e9",
        "effect": "ADD_MISSING_ITEMS"
}
```
```json Fixed
"discount": {
        "type": "FIXED",
        "effect": "APPLY_TO_ORDER",
        "fixed_amount": 200,
        "fixed_amount_formula": "IF(ORDER_UNITS_QUANTITY > 3;CUSTOMER_METADATA(\"age\") + 2;CUSTOMER_METADATA(\"age\") - 2)"
}
```
