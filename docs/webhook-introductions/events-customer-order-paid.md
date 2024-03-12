The `EVENTS.ORDER.PAID` event indicates that an order has been paid.

When the event is used in an "Order has been paid" distribution webhook, the `data` object always contains the following required objects:
- `customer`,
- `referrer`,
- `order`,
- `redemption`.

Additional objects are also sent depending on the purpose:
- "Notify customers about promotion" sends also the following objects:
  - `campaign`,
  - `promotion_tier`,
- "Send and publish unique codes from campaign" sends also  the following objects:
  - `campaign`,
  - `voucher`,
  - `publication`,
- "Send plain message to customers" sends only the basic objects listed above.