# Voucherify

> Voucherify is a promotion engine API for building personalized coupon, discount, referral, and loyalty programs.

## Capabilities

### Create and manage discount campaigns
Create discount coupon campaigns with unique or generic codes. Configure percentage discounts, fixed amounts, free shipping, or unit discounts. Set validation rules based on customer segments, order values, products, or time periods.

**Required inputs:**
- Campaign name and type (DISCOUNT_COUPONS)
- Discount type (PERCENT, AMOUNT, UNIT, FIXED)
- Discount value
- Optional: validation rules, redemption limits, time constraints

**Constraints:**
- Maximum 30 redeemables per validation/redemption request
- Codes must be unique within a project

### Create and manage cart promotions
Set up automatic discounts that apply when cart conditions are met. No code required from customers. Configure promotion tiers with different discount levels based on order value or product combinations.

**Required inputs:**
- Campaign name and type (PROMOTION)
- Promotion tier conditions
- Discount configuration

**Constraints:**
- Promotion tiers are evaluated in hierarchy order
- Maximum 30 promotion tiers per validation request

### Create and manage loyalty programs
Build points-based loyalty programs with earning rules and rewards. Customers accumulate points through purchases or custom events. Configure loyalty tiers for VIP treatment.

**Required inputs:**
- Campaign name and type (LOYALTY_PROGRAM)
- Earning rules (triggers and point values)
- Rewards catalog

**Constraints:**
- Join-once setting cannot be disabled after creation
- Points can have expiration rules at campaign or earning rule level

### Create and manage referral programs
Set up single-sided or double-sided referral programs. Track referrer-referee relationships. Configure rewards for successful conversions.

**Required inputs:**
- Campaign name and type (REFERRAL_PROGRAM)
- Conversion event type (code redemption or custom event)
- Referrer rewards and optional referee rewards

**Constraints:**
- Referrers cannot redeem their own codes
- Each campaign supports only one conversion event type

### Create and manage gift card campaigns
Issue gift cards with monetary balances. Track transactions and balances. Support partial redemptions.

**Required inputs:**
- Campaign name and type (GIFT_VOUCHERS)
- Initial gift card balance

**Constraints:**
- Gift card balance cannot go negative

### Validate discounts
Check if vouchers or promotions are applicable to a customer's order before redemption. Returns calculated discount amounts and eligibility status.

**Required inputs:**
- Redeemables (voucher codes or promotion tier IDs)
- Order details (items, amounts)
- Optional: customer information

**Constraints:**
- Maximum 30 redeemables per request
- Validation does not consume the voucher

### Redeem discounts
Apply and consume vouchers or promotions to finalize a discount. Records the transaction and updates usage limits.

**Required inputs:**
- Redeemables (voucher codes or promotion tier IDs)
- Order details
- Optional: customer information

**Constraints:**
- Maximum 30 redeemables per request
- Redemption is final (can be rolled back separately)

### Check eligibility (Qualifications API)
Discover which promotions, vouchers, or campaigns a customer qualifies for based on their profile and cart contents.

**Required inputs:**
- Scenario type (ALL, CUSTOMER_WALLET, AUDIENCE_ONLY, PRODUCTS, etc.)
- Optional: customer information, order details

**Constraints:**
- Results depend on scenario selection
- Some scenarios require customer identification

### Rollback redemptions
Revert a completed redemption. Restores voucher usage limits and updates order status.

**Required inputs:**
- Parent redemption ID

**Constraints:**
- Only successful redemptions can be rolled back
- Rollback creates a new transaction record

### Manage customers
Create, update, and segment customers. Track customer activity and assign vouchers.

**Required inputs:**
- Customer source_id (your system's identifier)
- Optional: name, email, metadata

**Constraints:**
- Customer source_id must be unique within a project

### Manage products and collections
Store product catalog data. Create static or dynamic product collections for targeting discounts.

**Required inputs:**
- Product source_id
- Optional: name, price, metadata

**Constraints:**
- Product source_id must be unique within a project

### Publish vouchers to customers
Assign voucher codes to specific customers. Track which codes belong to which customers.

**Required inputs:**
- Campaign ID or voucher code
- Customer identifier

**Constraints:**
- Published vouchers are linked to customer profiles

### Track custom events
Send custom events from your system to trigger earning rules, distributions, or referral conversions.

**Required inputs:**
- Event name (must match schema)
- Customer identifier
- Optional: event metadata

**Constraints:**
- Event schema must be defined in project settings

### Configure webhooks
Receive real-time notifications about redemptions, customer events, campaign changes, and more.

**Required inputs:**
- Webhook URL
- Event types to subscribe

**Constraints:**
- Webhook calls have daily limits based on plan

### Export data
Export campaigns, vouchers, redemptions, customers, and orders to CSV files.

**Required inputs:**
- Export type
- Optional: filters

**Constraints:**
- Large exports run asynchronously

## Workflows

### Redeem a discount code at checkout
1. Customer enters voucher code at checkout
2. Call POST /v1/validations with voucher code and order details
3. Display calculated discount to customer
4. On payment confirmation, call POST /v1/redemptions with same data
5. Apply discount to order in your system

### Apply automatic promotions
1. Customer updates cart
2. Call POST /v1/qualifications with order details and scenario "ALL"
3. Display applicable promotions to customer
4. Call POST /v1/validations with selected promotions
5. On payment, call POST /v1/redemptions

### Enroll customer in loyalty program
1. Create loyalty campaign with earning rules
2. Publish loyalty card to customer via POST /v1/publications
3. Customer makes purchase
4. Call POST /v1/redemptions or POST /v1/orders to record order
5. Voucherify automatically awards points based on earning rules

### Process referral
1. Publish referral code to referrer
2. Referee uses referral code at checkout
3. Call POST /v1/redemptions with referral code
4. Voucherify links referee to referrer and triggers rewards

### Reward loyalty points redemption
1. Customer selects reward from catalog
2. Call POST /v1/loyalties/{campaignId}/members/{memberId}/redemption
3. Points are deducted and reward is issued

## Constraints

### API rate limits
- Business plan: 100 requests/minute, 100,000 requests/cycle
- Organization plan: 2,000 requests/minute, 300,000 requests/cycle
- Client-side: 5 requests per 5 seconds per IP address
- Enterprise: custom limits

### Regional API endpoints
- Europe (default): https://api.voucherify.io
- United States: https://us1.api.voucherify.io
- Asia (Singapore): https://as1.api.voucherify.io

### Authentication
- Server-side: X-App-Id and X-App-Token headers required
- Client-side: X-Client-Application-Id and X-Client-Token headers required
- OAuth 2.0 tokens expire after 15 minutes

### Data limits
- Maximum 30 redeemables per validation/redemption
- Sandbox project: 100 API calls/hour (fixed)
- Bulk operations run asynchronously

### Stacking rules
- Configure how multiple discounts combine
- Set exclusive categories to prevent stacking
- Define application order and limits
