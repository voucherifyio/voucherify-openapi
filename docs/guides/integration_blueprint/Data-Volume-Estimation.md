---
title: Data Volume Estimation
excerpt:
categorySlug: integration-blueprint
slug: data-volume-estimation
type: basic
hidden: false
order: 11
---

## Data volume estimation

> 📘 **Goals**
> 
> * Understand what API endpoints will be used to map your scenarios.
> * Estimate how many customers will be included in promotions and how often their data should be synced with Voucherify.
> * Think of what it takes to migrate promotions from your current system. 

**Outcome**: 

API usage forecast, including monthly and hourly API calls number and a Voucheify deployment plan.

---

Voucherify works in a [pay-as-you-grow pricing model](https://www.voucherify.io/pricing "Fair plans that scale with you") – the higher API usage, the higher the bill. If you want to estimate the TOC in the long run, you might want to **calculate API usage with assumptions about your growth**.

**Initial data migration might be an API-heavy operation**. To reduce the impact on pricing, Voucherify provides **bulk API endpoints**.

Depending on your data volume and/or security policies, your account might require additional activities from the Voucherify team. One of them is setting up **a dedicated cluster near your customers**. This might impact the pricing significantly, so please remember to provide this information to your Technical Integration Manager.

> 📘 API usage and availability
>
> Besides API usage, you should define your minimum availability requirements. These will be included in a custom SLA.
[Check system status for historical performance](https://status.voucherify.io/)
