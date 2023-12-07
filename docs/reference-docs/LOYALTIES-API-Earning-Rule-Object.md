---
title: Earning Rule Object
type: basic
categorySlug: voucherify-api
parentDocSlug: loyalties-api
slug: earning-rule-object
hidden: false
order: 4
---

## Earning Rule
All of:

1. [EarningRuleBase](#earningrulebase)
2. <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">validation_rule_id</br><code>string</code></td><td style="text-align:left"><p>A unique validation rule identifier assigned by the Voucherify API. The validation rule is verified before points are added to the balance.</p></td></tr><tr><td style="text-align:left">updated_at</br><code>string</code></td><td style="text-align:left"><p>Timestamp representing the date and time when the earning rule was last updated in ISO 8601 format.</p></td></tr><tr><td style="text-align:left">active</br><code>boolean</code></td><td style="text-align:left"><p>A flag to toggle the earning rule on or off. You can disable an earning rule even though it's within the active period defined by the start_date and expiration_date of the campaign or the earning rule's own start_date and expiration_date.</p><ul><li><code>true</code> indicates an active earning rule</li><li><code>false</code> indicates an inactive earning rule</li></ul></td></tr></tbody></table>

## EarningRuleBase
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Assigned by the Voucherify API, identifies the earning rule object.</p> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the earning rule was created in ISO 8601 format.</p> |
| loyalty | One of: [Define fixed amount of points](#define-fixed-amount-of-points), [Calculate points proportionally](#calculate-points-proportionally) |
| event | <p>Defines the event which triggers the earning rule to add points to a loyalty card.</p> See: [Earning Rule Event](#earning-rule-event) |
| custom_event</br>`object` | <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">schema_id</br><code>string</code></td><td style="text-align:left"></td></tr></tbody></table> |
| segment</br>`object` | <p>Contains the id of a customer segment. Required for the customer.segment.entered option in event.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Contains a unique identifier of a customer segment. Assigned by the Voucherify API.</p></td></tr></tbody></table> |
| source</br>`object` | <p>Contains the custom earning rule name and parent campaign.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">banner</br><code>string</code></td><td style="text-align:left"><p>Name of the earning rule. This is displayed as a header for the earning rule in the Dashboard.</p></td></tr><tr><td style="text-align:left">object_id</br><code>string</code></td><td style="text-align:left"><p>A unique campaign identifier assigned by the Voucherify API.</p></td></tr><tr><td style="text-align:left">object_type</br><code>string</code></td><td style="text-align:left"><p>Defines the object associated with the earning rule. Defaults to <code>campaign</code>.</p> Available values: <code>campaign</code></td></tr></tbody></table> |
| object</br>`string` | <p>The type of object represented by JSON. Default is earning_rule.</p> Available values: `earning_rule` |
| automation_id</br>`string` | <p>For internal use by Voucherify.</p> |
| start_date</br>`string` | <p>Start date defines when the earning rule starts to be active. Activation timestamp in ISO 8601 format. Earning rule is inactive before this date. If you don't define the start date for an earning rule, it'll inherit the campaign start date by default.</p> |
| expiration_date</br>`string` | <p>Expiration date defines when the earning rule expires. Expiration timestamp in ISO 8601 format. Earning rule is inactive after this date.If you don't define the expiration date for an earning rule, it'll inherit the campaign expiration date by default.</p> |
| validity_timeframe</br>`object` | <p>Set recurrent time periods when the earning rule is valid. For example, valid for 1 hour every other day.start_date required when including the <code>validity_timeframe</code>.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">duration</br><code>string</code></td><td style="text-align:left"><p>Defines the amount of time an earning rule will be active in ISO 8601 format. For example, an earning rule with a duration of PT1H will be valid for a duration of one hour.</p></td></tr><tr><td style="text-align:left">interval</br><code>string</code></td><td style="text-align:left"><p>Defines the intervening time between two time points in ISO 8601 format, expressed as a duration. For example, an earning rule with an interval of P2D will be valid every other day.</p></td></tr></tbody></table> |
| validity_day_of_week</br>`array` | <p>Integer array corresponding to the particular days of the week in which the earning rule is valid.</p><ul><li><code>0</code> Sunday</li><li><code>1</code> Monday</li><li><code>2</code> Tuesday</li><li><code>3</code> Wednesday</li><li><code>4</code> Thursday</li><li><code>5</code> Friday</li><li><code>6</code> Saturday</li></ul> |
| metadata</br>`object` | <p>The metadata object stores all custom attributes assigned to the earning rule. A set of key/value pairs that you can attach to an earning rule object. It can be useful for storing additional information about the earning rule in a structured format.</p> |

## Define fixed amount of points
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>The number of points to be added to the loyalty card.</p> Available values: `FIXED` |
| points</br>`integer` | <p>Defines how the points will be added to the loyalty card. FIXED adds a fixed number of points.</p> |

## Calculate points proportionally
One of:

[Order](#order), [Order Items](#order-items), [Customer Metadata](#customer-metadata), [Custom Event](#custom-event)

## Earning Rule Event
Available values: `order.paid`, `customer.segment.entered`, `custom_event`, `customer.loyalty.tier.upgraded`, `customer.loyalty.tier.downgraded`, `customer.loyalty.tier.prolonged`, `customer.loyalty.tier.joined`, `customer.loyalty.tier.left`

## Order
One of:

[Order Amount](#order-amount), [Order Total Amount](#order-total-amount), [Order Metadata](#order-metadata)

## Order Items
One of:

[Order Items Quantity](#order-items-quantity), [Order Items Amount](#order-items-amount), [Order Items Subtotal Amount](#order-items-subtotal-amount)

## Customer Metadata
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Defines how the points will be added to the loyalty card.PROPORTIONAL adds points based on a pre-defined ratio.</p> Available values: `PROPORTIONAL` |
| calculation_type</br>`string` | <p>CUSTOMER_METADATA: Customer Metadata (X points for every Y in metadata attribute, defined in the property key under the customer.metadata object)</p> Available values: `CUSTOMER_METADATA` |
| customer</br>`object` | <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">metadata</br><code>object</code></td><td style="text-align:left"><p>Defines the ratio based on the property defined in the calculation_type parameter. For every given increment of value (1, 10, etc) defined in the every parameter for the property defined in calculation_type, give the customer the number of points defined in the points parameter. In other words, for every order metadata property value, give points.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">every</br><code>integer</code></td><td style="text-align:left"><p>For how many increments of the customer metadata property to grant points for.</p></td></tr><tr><td style="text-align:left">points</br><code>integer</code></td><td style="text-align:left"><p>Number of points to be awarded, i.e. how many points to be added to the loyalty card.</p></td></tr><tr><td style="text-align:left">property</br><code>string</code></td><td style="text-align:left"><p>Customer metadata property.</p></td></tr></tbody></table></td></tr></tbody></table> |

## Custom Event
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Defines how the points will be added to the loyalty card.PROPORTIONAL adds points based on a pre-defined ratio.</p> Available values: `PROPORTIONAL` |
| calculation_type</br>`string` | <p>CUSTOM_EVENT_METADATA: Custom event metadata (X points for every Y in metadata attribute).</p> Available values: `CUSTOM_EVENT_METADATA` |
| custom_event</br>`object` | <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">metadata</br><code>object</code></td><td style="text-align:left"><p>Defines the ratio based on the property defined in the calculation_type parameter. For every given increment of value (1, 10, etc) defined in the every parameter for the property defined in calculation_type, give the customer the number of points defined in the points parameter. In other words, for every order metadata property value, give points.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">every</br><code>integer</code></td><td style="text-align:left"><p>For how many increments of the customer metadata property to grant points for.</p></td></tr><tr><td style="text-align:left">points</br><code>integer</code></td><td style="text-align:left"><p>Number of points to be awarded, i.e. how many points to be added to the loyalty card.</p></td></tr><tr><td style="text-align:left">property</br><code>string</code></td><td style="text-align:left"><p>Custom event metadata property.</p></td></tr></tbody></table></td></tr></tbody></table> |

## Order Amount
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Defines how the points will be added to the loyalty card.PROPORTIONAL adds points based on a pre-defined ratio.</p> Available values: `PROPORTIONAL` |
| calculation_type</br>`string` | <p><code>ORDER_AMOUNT</code>: Pre-discount order amount (X points for every Y spent excluding discounts)</p> Available values: `ORDER_AMOUNT` |
| order</br>`object` | <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">amount</br><code>object</code></td><td style="text-align:left"><p>Defines the ratio based on the property defined in the calculation_type parameter. For every set of value (1, 10, etc) defined in the every parameter for the property defined in calculation_type, give the customer the number of points defined in the points parameter. In other words, for every calculation_type, give points.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">every</br><code>integer</code></td><td style="text-align:left"><p>Value is multiplied by 100 to precisely represent 2 decimal places. For example, a $10 order amount is written as 1000.</p></td></tr><tr><td style="text-align:left">points</br><code>integer</code></td><td style="text-align:left"><p>Number of points to be awarded, i.e. how many points to be added to the loyalty card.</p></td></tr></tbody></table></td></tr></tbody></table> |

## Order Total Amount
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Defines how the points will be added to the loyalty card.PROPORTIONAL adds points based on a pre-defined ratio.</p> Available values: `PROPORTIONAL` |
| calculation_type</br>`string` | <p><code>ORDER_TOTAL_AMOUNT</code>: Total order amount (X points for every Y spent including discount)</p> Available values: `ORDER_TOTAL_AMOUNT` |
| order</br>`object` | <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">total_amount</br><code>object</code></td><td style="text-align:left"><p>Defines the ratio based on the property defined in the calculation_type parameter. For every set of value (1, 10, etc) defined in the every parameter for the property defined in calculation_type, give the customer the number of points defined in the points parameter. In other words, for every calculation_type, give points.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">every</br><code>integer</code></td><td style="text-align:left"><p>Value is multiplied by 100 to precisely represent 2 decimal places. For example, a $10 order amount is written as 1000.</p></td></tr><tr><td style="text-align:left">points</br><code>integer</code></td><td style="text-align:left"><p>Number of points to be awarded, i.e. how many points to be added to the loyalty card.</p></td></tr></tbody></table></td></tr></tbody></table> |

## Order Metadata
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Defines how the points will be added to the loyalty card.PROPORTIONAL adds points based on a pre-defined ratio.</p> Available values: `PROPORTIONAL` |
| calculation_type</br>`string` | <p><code>ORDER_METADATA</code>: Order Metadata (X points for every Y in metadata attribute, defined in the property key under the order.metadata object)</p> Available values: `ORDER_METADATA` |
| order</br>`object` | <p>Defines the formula for calculating points proportionally.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">metadata</br><code>object</code></td><td style="text-align:left"><p>Defines the ratio based on the property defined in the calculation_type parameter. For every given increment of value (1, 10, etc) defined in the every parameter for the property defined in calculation_type, give the customer the number of points defined in the points parameter. In other words, for every order metadata property value, give points.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">every</br><code>integer</code></td><td style="text-align:left"><p>For how many increments of the order metadata property to grant points for.</p></td></tr><tr><td style="text-align:left">points</br><code>integer</code></td><td style="text-align:left"><p>Number of points to be awarded, i.e. how many points to be added to the loyalty card.</p></td></tr><tr><td style="text-align:left">property</br><code>string</code></td><td style="text-align:left"><p>Order metadata property.</p></td></tr></tbody></table></td></tr></tbody></table> |

## Order Items Quantity
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Defines how the points will be added to the loyalty card.PROPORTIONAL adds points based on a pre-defined ratio.</p> Available values: `PROPORTIONAL` |
| calculation_type</br>`string` | <p><code>ORDER_ITEMS_QUANTITY</code>: Quantity of items defined in order_items.quantity.object &amp; .id (X points for every Y items excluding free items)</p> Available values: `ORDER_ITEMS_QUANTITY` |
| order_items</br>`object` | <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">quantity</br><code>object</code></td><td style="text-align:left"><p>Defines the ratio based on the property defined in the calculation_type parameter. For every set of value (1, 10, etc) defined in the every parameter for the property defined in calculation_type, give the customer the number of points defined in the points parameter. In other words, for every calculation_type, give points.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">every</br><code>integer</code></td><td style="text-align:left"><p>Value is multiplied by 100 to precisely represent 2 decimal places. For example, a $10 order amount is written as 1000.</p></td></tr><tr><td style="text-align:left">points</br><code>integer</code></td><td style="text-align:left"><p>Number of points to be awarded, i.e. how many points to be added to the loyalty card.</p></td></tr><tr><td style="text-align:left">object</br><code>string</code></td><td style="text-align:left"><p>Type of object taken under consideration.</p> Available values: <code>products_collection</code>, <code>product</code>, <code>sku</code></td></tr><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique ID of the resource, i.e. pc_75U0dHlr7u75BJodrW1AE3t6, prod_0bae32322150fd0546, or sku_0b7d7dfb090be5c619.</p></td></tr></tbody></table></td></tr></tbody></table> |

## Order Items Amount
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Defines how the points will be added to the loyalty card.PROPORTIONAL adds points based on a pre-defined ratio.</p> Available values: `PROPORTIONAL` |
| calculation_type</br>`string` | <p>ORDER_ITEMS_AMOUNT; Pre-discount amount spent on items defined in the order_items.amount.object &amp; .id (X points for every Y spent on items excluding discounts)</p> Available values: `ORDER_ITEMS_AMOUNT` |
| order_items</br>`object` | <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">amount</br><code>object</code></td><td style="text-align:left"><p>Defines the ratio based on the property defined in the calculation_type parameter. For every set of value (1, 10, etc) defined in the every parameter for the property defined in calculation_type, give the customer the number of points defined in the points parameter. In other words, for every calculation_type, give points.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">every</br><code>integer</code></td><td style="text-align:left"><p>Value is multiplied by 100 to precisely represent 2 decimal places. For example, a $10 order amount is written as 1000.</p></td></tr><tr><td style="text-align:left">points</br><code>integer</code></td><td style="text-align:left"><p>Number of points to be awarded, i.e. how many points to be added to the loyalty card.</p></td></tr><tr><td style="text-align:left">object</br><code>string</code></td><td style="text-align:left"><p>Type of object taken under consideration.</p> Available values: <code>products_collection</code>, <code>product</code>, <code>sku</code></td></tr><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique ID of the resource, i.e. pc_75U0dHlr7u75BJodrW1AE3t6, prod_0bae32322150fd0546, or sku_0b7d7dfb090be5c619.</p></td></tr></tbody></table></td></tr></tbody></table> |

## Order Items Subtotal Amount
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Defines how the points will be added to the loyalty card.PROPORTIONAL adds points based on a pre-defined ratio.</p> Available values: `PROPORTIONAL` |
| calculation_type</br>`string` | <p>ORDER_ITEMS_SUBTOTAL_AMOUNT; Amount spent on items defined in the order_items.subtotal_amount.object &amp; .id (X points for every Y spent on items including discounts)</p> Available values: `ORDER_ITEMS_SUBTOTAL_AMOUNT` |
| order_items</br>`object` | <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">subtotal_amount</br><code>object</code></td><td style="text-align:left"><p>Defines the ratio based on the property defined in the calculation_type parameter. For every set of value (1, 10, etc) defined in the every parameter for the property defined in calculation_type, give the customer the number of points defined in the points parameter. In other words, for every calculation_type, give points.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">every</br><code>integer</code></td><td style="text-align:left"><p>Value is multiplied by 100 to precisely represent 2 decimal places. For example, a $10 order amount is written as 1000.</p></td></tr><tr><td style="text-align:left">points</br><code>integer</code></td><td style="text-align:left"><p>Number of points to be awarded, i.e. how many points to be added to the loyalty card.</p></td></tr><tr><td style="text-align:left">object</br><code>string</code></td><td style="text-align:left"><p>Type of object taken under consideration.</p> Available values: <code>products_collection</code>, <code>product</code>, <code>sku</code></td></tr><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique ID of the resource, i.e. pc_75U0dHlr7u75BJodrW1AE3t6, prod_0bae32322150fd0546, or sku_0b7d7dfb090be5c619.</p></td></tr></tbody></table></td></tr></tbody></table> |

[block:html]
{
  "html": "<style>\n[title=\"Toggle library\"] { \n  display: none; }\n.LanguagePicker-divider { \n  display: none; }\n.Playground-section3VTXuaYZivJK > .APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.LanguagePicker-languages1qVVo_v6AlP9 {\n  display: none; }\n.headline-container-article-info2GaOf2jMpV0r {\n  display: none; }\n.APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.APIResponseSchemaPicker-label3XMQ9E-slNcS {\n  display: none; }\n.PlaygroundC7DInM9NFvBg {\n  display: none; }\n.Modal-Header3VPrQs3MUWWd {\n  display: none; }\n.rm-ReferenceMain .rm-Article {\n  max-width: 2000px; }\n</style>"
}
[/block]
