---
title: Earning Rules
excerpt: 
category: 636284b7e6b02c00a136e87b
slug: earning-rules
type: basic
hidden: false
order: 10
---

<p>
	 Earning rules define actions that customers must take to receive loyalty points and, as a result, redeem points for loyalty rewards. You can create three types of earning rules in Voucherify:&nbsp;
</p>
<ul>
	<li>customer segments,&nbsp;</li>
	<li>paid orders,&nbsp;</li>
	<li>and custom events that customers perform in your application/website.&nbsp;</li>
</ul>
<p>
	 Moreover, you can extend each earning rule with additional constraints using validation rules.
</p>
<p>
  The 	<a href="https://docs.voucherify.io/reference#create-earning-rule">Earning Rule object </a>
 defines an action (event) that assigns a particular number of loyalty points to a customer's account.
  </p>

The loyalty campaign will detect the first two events automatically when a customer enters a segment or when any of customer’s orders will be changed to PAID.

Note that for the attribute `every` in the context of an amount, the value is multiplied by 100 to precisely represent 2 decimal places. For example, a $10 order amount is written as 1000. On the other hand, point values are written as-is, i.e. 100 points are 100 points.

To trigger the 3rd option, you need specifically tell it so. You can achieve it with the [Track Custom Event](https://docs.voucherify.io/reference#create-custom-event) endpoint. 

> 📘 Event schema
>
> To use a custom event in a loyalty program, we need to define it in the [Schema](https://support.voucherify.io/article/163-how-to-track-custom-events-and-use-them-in-referral-campaigns-events-schema) beforehand.

## Create earning rule

To [create earning rule](https://docs.voucherify.io/reference#create-earning-rule), you have the option of awarding the customer with a fixed amount of points or points calculated proportional to a value of an attribute. First, define a required event, then define the fixed or proportional calculation method for adding points and (optionally) a banner (name) of the rule.

```curl cURL
curl -X POST \
-H "X-App-Id: c70a6f00-cf91-4756-9df5-47628850002b" \
-H "X-App-Token: 3266b9f8-e246-4f79-bdf0-833929b1380c" \
-H "Content-Type: application/json" \
-d '[{
	"event": "order.paid",
	"loyalty": {
    "type": "FIXED",
		"points": 3
  },
	"source": {
		"banner": "Yopu will get 3 points"
	}
}]
' \
"https://api.voucherify.io/v1/loyalties/camp_Zgj5HFIPcb70SWJ4IjBNta2F/earning-rules"
```
### Example loyalty objects in earning rules for calculating points proportionally

```json ORDER_AMOUNT
  "loyalty": {
    "type": "PROPORTIONAL",
    "calculation_type": "ORDER_AMOUNT",
    "order": {
      "amount": {
        "every": 100,
        "points": 100
      }
    }
  }
```
```json ORDER_TOTAL_AMOUNT
  "loyalty": {
    "type": "PROPORTIONAL",
    "calculation_type": "ORDER_TOTAL_AMOUNT",
    "order": {
      "total_amount": {
        "every": 100,
        "points": 1
      }
    }
  }
```
```json ORDER_ITEMS_AMOUNT
  "loyalty": {
    "type": "PROPORTIONAL",
    "calculation_type": "ORDER_ITEMS_AMOUNT",
    "order_items": {
      "amount": {
        "every": 100,
        "points": 1,
        "object": "product",
        "id": "prod_0a9f9aeddb019a42db"
      }
    }
  }
```
```json ORDER_ITEMS_SUBTOTAL_AMOUNT
  "loyalty": {
    "type": "PROPORTIONAL",
    "calculation_type": "ORDER_ITEMS_SUBTOTAL_AMOUNT",
    "order_items": {
      "subtotal_amount": {
        "every": 100,
        "points": 10,
        "object": "product",
        "id": "prod_0a9f9aeddb019a42db"
      }
    }
  }
```
```json ORDER_METADATA
  "loyalty": {
    "type": "PROPORTIONAL",
    "calculation_type": "ORDER_METADATA",
    "order": {
      "metadata": {
        "every": 1,
        "points": 1,
        "property": "number_of_store_visits"
      }
    }
  }
```
```json CUSTOMER_METADATA
  "loyalty": {
    "type": "PROPORTIONAL",
    "calculation_type": "CUSTOMER_METADATA",
    "customer": {
      "metadata": {
        "every": 1,
        "points": 1,
        "property": "customer_life_time_value"
      }
    }
  }
```
```json ORDER_ITEMS_QUANTITY
  "loyalty": {
    "type": "PROPORTIONAL",
    "calculation_type": "ORDER_ITEMS_QUANTITY",
    "order_items": {
      "quantity": {
        "every": 1,
        "points": 100,
        "object": "product",
        "id": "prod_0a9f9aeddb019a42db"
      }
    }
  }
```

> 📘 Order amounts
> 
> Note that all amounts in API requests are multiplied by 100 to reflect decimal places. The value defined in every parameter is also multiplied by 100:

```json
"amount": {
           "every": 100, // represents 1 in your currency (eg. $1)
           "points": 100 // means 100 loyalty points
   }
```

<p>
	 Each earning rule can have its own time frame that defines when the rule is active. If you don't define the start and expiration date for an earning rule, it'll inherit the campaign time frame (start and expiration date).&nbsp;All time-related limits are optional and described precisely in 
	<a href="https://support.voucherify.io/article/132-time-limits-for-vouchers">this guide.</a>
</p>
<p>
	 Timeframe options include:
</p>
<ul>
	<li>Start date &amp; time</li>
	<li>End date &amp; time (expiration)</li>
	<li>Valid in this timeframe only (recurring)</li>
	<li>Valid on particular days only</li>
</ul>
<p>
	 You can disable and enable earning rules in the campaign dashboard &gt; earning rule or via API using the following endpoints:
  <ul>
    <li><a href="https://docs.voucherify.io/reference/enable-earning-rule">Enable Earning Rule</a></li>
    <li><a href="https://docs.voucherify.io/reference/disable-earning-rule">Disable Earning Rule</a></li>
  </ul>
</p>
<p>
<strong>Creating an earning rule is a three-step process:</strong>
</p>
<ul>
	<li>[Required] Define the earning rule details such as the trigger event, name and the timeframe when it will be valid. <br>

```json Define details
{
  "event": "order.paid",
  "source": {
    "banner": "Every Dollar Spent Award 100 points."
  },
  "start_date": "2022-02-02T13:00:00.000Z",
  "expiration_date": "2022-03-03T14:30:00.000Z",
  "validity_timeframe": {
    "duration": "PT1H",
    "interval": "P1D"
  },
  "validity_day_of_week": [1, 2, 3, 4, 5]
}
```

<ul>
	<li>[Required] Assign a points value. <br>
</ul>

```json Assign points
{
  "loyalty": {
    "type": "PROPORTIONAL",
    "calculation_type": "ORDER_AMOUNT",
    "order": {
      "amount": {
        "every": 1,
        "points": 100
      }
    }
  }
}
```
<ul>
	<li>[Optional] Add <a href="https://support.voucherify.io/article/529-validation-rules-campaign-limits" target="_blank">validation rules</a> that limit earning rule usage to the predefined circumstances. Read more <a href="https://docs.voucherify.io/docs/validation-rules">here</a>. <br>
</ul>

```json Assign validation rule
{
  "validation_rule_id": "val_7sTiDKkHxxx4"
}
```

Let's see how each of the earning rule types are defined. We'll start with the _Order has been paid_ earning rule type.

---

## Order has been paid

<p>
	 Points are added to the loyalty card when a new order changes its status to PAID.&nbsp;You can assign a fixed number of points or reward customers proportionally to a metadata attribute. If you choose to calculate the points proportionally, then for every value in the selected attribute, the customer will get a defined number of points. There are five standard options to choose from such as amount spent and quantity of items in cart. Additionally, you have the option of choosing two types of metadata properties. The metadata must be defined in the Project Settings. Please read our guide on how to start with 
	<a href="https://support.voucherify.io/article/99-schema-validation-metadata">metadata</a>.
</p>

### Fixed
-  **Fixed** - Awards a fixed number of points for paying an order.

```json Fixed
{
  "event": "order.paid",
  "loyalty": {
    "points": 123,
    "type": "FIXED"
  }
}
```

### Proportional
- **Pre-discount order amount** - Awards customers X points for every Y spent excluding discounts

```json Pre-discount order amount
{
  "event": "order.paid",
  "loyalty": {
    "type": "PROPORTIONAL",
    "calculation_type": "ORDER_AMOUNT",
    "order": {
      "amount": {
        "every": 100,
        "points": 100
      }
    }
  }
}
```

- **Total order amount** - Awards customers X points for every Y spent including discounts

```json Total order amount
{
  "event": "order.paid",
  "loyalty": {
    "type": "PROPORTIONAL",
    "calculation_type": "ORDER_TOTAL_AMOUNT",
    "order": {
      "total_amount": {
        "every": 100,
        "points": 1
      }
    }
  }
}
```

- **Pre-discount amount spent on items** - Awards customers X points for every Y spent on items excluding discounts

```json Pre-discount amount spent on items
{
  "event": "order.paid",
  "loyalty": {
    "type": "PROPORTIONAL",
    "calculation_type": "ORDER_ITEMS_AMOUNT",
    "order_items": {
      "amount": {
        "every": 100,
        "points": 1,
        "object": "product",
        "id": "prod_0a9f9aeddb019a42db"
      }
    }
  }
}
```

- **Amount spent on items** - Awards customers X points for every Y spent on items including discounts

```json Amount spent on items
{
  "event": "order.paid",
  "loyalty": {
    "type": "PROPORTIONAL",
    "calculation_type": "ORDER_ITEMS_SUBTOTAL_AMOUNT",
    "order_items": {
      "subtotal_amount": {
        "every": 100,
        "points": 10,
        "object": "product",
        "id": "prod_0a9f9aeddb019a42db"
      }
    }
  }
}
```

-  **Quantity of items in the cart** - Awards customers X points for every Y items excluding free items

```json Quantity of items in the cart
{
  "event": "order.paid",
  "loyalty": {
    "type": "PROPORTIONAL",
    "calculation_type": "ORDER_ITEMS_QUANTITY",
    "order_items": {
      "quantity": {
        "every": 1,
        "points": 100,
        "object": "product",
        "id": "prod_0a9f9aeddb019a42db"
      }
    }
  }
}
```

- **Order Metadata** - Awards customers X points for every Y in metadata attribute. The metadata must be defined in the **Order** schema and must be a **Number**

```json Order Metadata
{
  "event": "order.paid",
  "loyalty": {
    "type": "PROPORTIONAL",
    "calculation_type": "ORDER_METADATA",
    "order": {
      "metadata": {
        "every": 1,
        "points": 1,
        "property": "number_of_store_visits"
      }
    }
  }
}
```

- **Customer Metadata**- Awards customers for every Y in metadata attribute. The metadata must be defined in the **Customer** schema and must be a **Number**

```json Customer Metadata
{
  "event": "order.paid",
  "loyalty": {
    "type": "PROPORTIONAL",
    "calculation_type": "CUSTOMER_METADATA",
    "customer": {
      "metadata": {
        "every": 1,
        "points": 1,
        "property": "customer_life_time_value"
      }
    }
  }
}
```

<p>
	 Using validation rules, you can attach additional requirements that customers need to meet to earn points. Rules can define cart structure and volume, customer attributes, or specify qualified customer segments. Go 
	<a href="https://support.voucherify.io/article/529-validation-rules-campaign-limits" target="_blank">here</a> to learn more about validation rules.
</p>
<p>
	<strong>Earning rules examples:</strong>
</p>
<ul>
	<li>1 point for each $0.01 spent if the total order amount is less than $50.</li>
	<li>1 point for each $0.1 spent if the total order amount is more than $50.</li>
	<li>2 points for each $1 spent if a customer is in the Premium Customers segment.</li>
	<li>20 points if the order is paid and the payment method is Visa.</li>
	<li>50 points if a customer had MacBook in their cart.</li>
</ul>

Below you can see example request and response schemas for [creating earning rules](ref:create-earning-rule) that count points proportionally. The first one gives a point to the customer for a store visit and the second one gives a point for each dollar spent.

### Example of ORDER_METADATA

```json Example Request
[
    {
        "event": "order.paid",
        "validation_rule_id": null,
        "loyalty": {
            "type": "PROPORTIONAL",
            "calculation_type": "ORDER_METADATA",
            "order": {
                "metadata": {
                    "every": 1,
                    "points": 1,
                    "property": "number_of_store_visits"
                }
            }
        },
        "source": {
            "banner": "Order paid 1 point for visiting store."
        },
        "active": true,
        "start_date": "2022-02-02T13:00:00.000Z",
        "expiration_date": "2022-03-03T14:30:00.000Z",
        "validity_timeframe": {
            "duration": "PT1H",
            "interval": "P1D"
        },
        "validity_day_of_week": [
            1,
            2,
            3,
            4,
            5
        ],
        "custom_event": null
    }
]
```
```json Example Response
[
    {
        "id": "ern_x5aSznVty4sFOTrQCv6HnnI5",
        "created_at": "2022-02-22T06:34:38.116Z",
        "updated_at": null,
        "loyalty": {
            "type": "PROPORTIONAL",
            "calculation_type": "ORDER_METADATA",
            "order": {
                "metadata": {
                    "every": 1,
                    "points": 1,
                    "property": "number_of_store_visits"
                }
            }
        },
        "event": "order.paid",
        "source": {
            "banner": "Order paid 1 point for visiting store.",
            "object_id": "camp_7s3uXI44aKfIk5IhmeOPr6ic",
            "object_type": "campaign"
        },
        "active": true,
        "start_date": "2022-02-02T13:00:00.000Z",
        "expiration_date": "2022-03-03T14:30:00.000Z",
        "validity_timeframe": {
            "duration": "PT1H",
            "interval": "P1D"
        },
        "validity_day_of_week": [
            1,
            2,
            3,
            4,
            5
        ],
        "object": "earning_rule",
        "automation_id": "auto_9jEyaOOzuK3uI2hc3ywn2yJ8"
    }
]
```

### Example of ORDER_AMOUNT

```json Example Request
[
    {
        "event": "order.paid",
        "validation_rule_id": null,
        "loyalty": {
            "type": "PROPORTIONAL",
            "calculation_type": "ORDER_AMOUNT",
            "order": {
                "amount": {
                    "every": 1,
                    "points": 1
                }
            }
        },
        "source": {
            "banner": "Order paid 1 point for 1 dollar."
        },
        "active": true,
        "start_date": "2022-02-02T13:00:00.000Z",
        "expiration_date": "2022-03-03T14:30:00.000Z",
        "validity_timeframe": {
            "duration": "PT1H",
            "interval": "P1D"
        },
        "validity_day_of_week": [
            4
        ],
        "segment": null,
        "custom_event": null
    }
]
```
```json Example Response
[
    {
        "id": "ern_apDP4sYcooAukAKZlwRo1Q6z",
        "created_at": "2022-02-22T06:34:38.116Z",
        "updated_at": null,
        "loyalty": {
            "type": "PROPORTIONAL",
            "calculation_type": "ORDER_AMOUNT",
            "order": {
                "amount": {
                    "every": 1,
                    "points": 1
                }
            }
        },
        "event": "order.paid",
        "source": {
            "banner": "Order paid 1 point for 1 dollar.",
            "object_id": "camp_7s3uXI44aKfIk5IhmeOPr6ic",
            "object_type": "campaign"
        },
        "active": true,
        "start_date": "2022-02-02T13:00:00.000Z",
        "expiration_date": "2022-03-03T14:30:00.000Z",
        "validity_timeframe": {
            "duration": "PT1H",
            "interval": "P1D"
        },
        "validity_day_of_week": [
            4
        ],
        "object": "earning_rule",
        "automation_id": "auto_m8oB2V0dKWROVMolbt3UglaK"
    }
]
```

## Custom Events

<p>
	 Custom events are actions taken by your customers that you track in your application or website and pass to Voucherify using our API. Using events in earning rules enables you to reward customers for custom activities of your choice, e.g., leaving a review, tagging your brand on social media, attending an event, and more.&nbsp;
</p>
<p>
	 First, define your events in the Event Schema in the Project Settings.&nbsp;
</p>

![Custom Events Metadata](../../assets/img/guides_building_blocks_earning_rules_add_new_schema_1.png "Custom events metadata")

<p>
	 The Schema gathers definitions of all events that you can later pass to Voucherify and use in your loyalty campaigns.&nbsp;
</p>
<p>
	 The customer gets points every time he/she performs the required action (custom event is sent to and received by Voucherify). You can assign a fixed number of points or reward customers proportionally to a metadata attribute. If you choose to calculate the points proportionally, then for every value in the selected metadata attribute, the customer will get a defined number of points. The metadata must be defined in the Project Settings. You have the option to use two types of metadata properties:
</p>
<ul>
	<li><strong>Customer Metadata</strong> - Awards customers for every Y in metadata attribute. The metadata must be defined in the <strong>Customer</strong> schema and must be a <strong>Number</strong>. Please read our guide on how to start with <a href="https://support.voucherify.io/article/99-schema-validation-metadata">metadata</a>. <br>
	</li>
	<li><strong>Custom Event Metadata</strong> - Awards customers for every Y in metadata attribute. The metadata must be defined as a property of the event chosen in the first step (Details). This is defined in the <strong>Event Schema</strong> and must be a <strong>Number</strong>. Please read our guide on how to start with <a href="https://support.voucherify.io/article/111-custom-events">event schemas</a>. <br>
	</li>
</ul>

A custom `event` must be sent together with the `custom_event` object in the payload. 

```json Fixed
{
  "event": "user_subscribed",
  "loyalty": {
    "points": 123,
    "type": "FIXED"
  }
  "custom_event": {
    "schema_id": "ms_qpRZ3EmRQyszNH6Z52Gkq8au"
}
```
```json Customer Metadata
{
  "loyalty": {
    "type": "PROPORTIONAL",
    "calculation_type": "CUSTOMER_METADATA",
    "customer": {
      "metadata": {
        "every": 1,
        "points": 1,
        "property": "customer_life_time_value"
      }
    }
  },
  "custom_event": {
    "schema_id": "ms_qpRZ3EmRQyszNH6Z52Gkq8au"
  },
  "event": "user_subscribed"
}
```
```json Custom Event Metadata
{
  "loyalty": {
    "type": "PROPORTIONAL",
    "calculation_type": "CUSTOM_EVENT_METADATA",
    "custom_event": {
      "metadata": {
        "every": 1,
        "points": 1,
        "property": "volume_number"
      }
    }
  },
  "custom_event": {
    "schema_id": "ms_qpRZ3EmRQyszNH6Z52Gkq8au"
  },
  "event": "user_subscribed"
}
```

<p>
	 Validation rules enable you to limit the event-based earning rules to specific customer segments and customers with specific metadata. Therefore, when a custom event defined in the earning rule is sent to and received by Voucherify, the application checks if a customer linked to the event matches the segment and metadata rules.&nbsp;
</p>
<p>
	<strong>Earning rules examples:</strong>
</p>
<ul>
	<li>100 points if a customer subscribes to a newsletter.</li>
	<li>50 points if a customer leaves a review.</li>
	<li>200 points if a customer registers to a paying plan.</li>
	<li>Points equal to the volume number of the newsletter that the customer subscribed to</li>
	<li>Points equal to the customer metadata attribute customer_life_time_value</li>
</ul>
<section class="callout-blue" <p="">
Please note that using custom events requires help from your developers. Go to our 
<a href="https://docs.voucherify.io/reference#the-custom-event-object" target="_blank">Events API</a> to learn more details. 
</section>

## Entered Segment

<div>
  <p>
  Segments group your customers using predefined criteria. When a customer matches segment rules, he/she enters the segment and earns loyalty points. While building segments, you can mix different criteria based on customer attributes (standard and custom ones) and their order history. Segment-based earning rules ensure that points are assigned only if all segment conditions are met. To build a rule, you need to select one of your existing segments created beforehand. 
  </p>
  <p>
    The event type <code>customer.segment.entered</code> must be sent together with the <code>segment</code> object in the payload.
  <a href="https://docs.voucherify.io/docs/customers#segments">Read more.</a>
  </p>
</div>

```json event
"event": "customer.segment.entered",
"segment": {
   "id": "seg_WJv55MbzQwnr56ttJ2xUrSgt"
}
```

<p>
	 Points are added to the loyalty card when a customer enters the segment. You can assign a fixed number of points or reward customers proportionally to a metadata attribute. The metadata must be defined in the 
	<strong>Customer</strong> schema and must be a <strong>Number</strong>. <a href="https://support.voucherify.io/article/99-schema-validation-metadata">Please read our guide on how to start with metadata</a>.&nbsp;
</p>

```json Loyalty Object - Fixed Points 
  "loyalty": {
    "points": 123,
    "type": "FIXED"
  }
```
```json Loyalty Object - Proportional Points
  "loyalty": {
    "type": "PROPORTIONAL",
    "calculation_type": "CUSTOMER_METADATA",
    "customer": {
      "metadata": {
        "every": 1,
        "points": 1,
        "property": "customer_life_time_value"
      }
    }
  }
```

<p>
	 Validation rules define additional segments that a customer needs to belong to and segments excluded from getting the points. You can also extend the criteria for customers and define required customer's metadata. Use the advanced rule builder to define customer’s metadata rules. <a href="https://docs.voucherify.io/docs/validation-rules" target="_blank">Read more here</a>.
</p>
<p>
	<strong>Earning rules examples:</strong>
</p>
<ul>
	<li>10 points if a customer enters the New Customer segment (criteria: Profile created less than 1 day ago).&nbsp;</li>
	<li>250 points if a customer enters a segment Premium (criteria: Total order count more than 5 or spent more than $500).</li>
	<li>50 points if a customer enters the Active Mobile App Users segment (criteria: metadata attribute <em>mobile_app</em> is true and last purchase less than 30 days ago)</li>
</ul>
<hr>

## List Earning Rules

<p>
	 Once you create the earning rules, you can access the added earning rules and assigned numbers of loyalty points using the following two endpoints:
  <ul>
    <li><a href="https://docs.voucherify.io/reference/get-earning-rule">List a specific Earning Rule</a></li>
    <li><a href="https://docs.voucherify.io/reference/list-earning-rules">List all Earning Rules</a></li>
  </ul>
</p>

```json Get Earning Rule
{
    "id": "ern_CFuv1O0IDl8Jgph0ojhMu8bH",
    "created_at": "2022-02-02T13:18:32.165Z",
    "updated_at": null,
    "validation_rule_id": null,
    "loyalty": {
        "points": 1000,
        "type": "FIXED"
    },
    "event": "order.paid",
    "source": {
        "banner": "[Loyalty Earning Rule] On Wednesdays - Order Paid - Fixed",
        "object_id": "camp_Pfja7X91b1GoyH5wnpzCwlP3",
        "object_type": "campaign"
    },
    "active": true,
    "validity_day_of_week": [
        3
    ],
    "object": "earning_rule",
    "automation_id": "auto_QoRJCKwkzMEHgGjukekrbrPe"
}
```
```json List Earning Rules
{
    "object": "list",
    "data_ref": "data",
    "data": [
        {
            "id": "ern_10S9ijStRZsf65xd12aydn4f",
            "created_at": "2022-02-18T14:03:58.646Z",
            "updated_at": null,
            "validation_rule_id": null,
            "loyalty": {
                "type": "PROPORTIONAL",
                "calculation_type": "ORDER_AMOUNT",
                "order": {
                    "amount": {
                        "every": 100,
                        "points": 100
                    }
                }
            },
            "event": "order.paid",
            "source": {
                "banner": "Proportional Points",
                "object_id": "camp_7s3uXI44aKfIk5IhmeOPr6ic",
                "object_type": "campaign"
            },
            "active": true,
            "object": "earning_rule",
            "automation_id": "auto_htP6uGb52rJDNwyUWcW45EWI"
        },
        {
            "id": "ern_eiOGVoFOE4kYbYmDhfYeuMpZ",
            "created_at": "2022-02-18T14:06:15.320Z",
            "updated_at": null,
            "validation_rule_id": null,
            "loyalty": {
                "type": "PROPORTIONAL",
                "calculation_type": "ORDER_ITEMS_SUBTOTAL_AMOUNT",
                "order_items": {
                    "subtotal_amount": {
                        "every": 100,
                        "points": 10,
                        "object": "product",
                        "id": "prod_0a9f9aeddb019a42db"
                    }
                }
            },
            "event": "order.paid",
            "source": {
                "banner": "Proportional Points 2",
                "object_id": "camp_7s3uXI44aKfIk5IhmeOPr6ic",
                "object_type": "campaign"
            },
            "active": true,
            "object": "earning_rule",
            "automation_id": "auto_hgWYRPnveBdI3h4aD8XnFGzN"
        }
    ],
    "total": 2
}
```

When earning rules are ready, your customers can start collecting points. In the next step to a full-blown loyalty campaign, you need rewards that your customers can redeem in exchange for loyalty points.

If you have both earning rules and rewards ready, you can create a loyalty program.
