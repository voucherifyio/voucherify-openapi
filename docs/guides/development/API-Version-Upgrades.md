---
title: API Version Upgrades
excerpt: Keep track of changes and upgrades to the Voucherify API.
categorySlug: development
slug: api-version-upgrades
type: basic
hidden: false
order: 10
---

Your API version controls the API and webhook behavior you see (e.g., what properties you see in responses, what parameters you’re permitted to send in requests, etc.). Your version is set the first time you make an API request. When we change the API in a backwards-incompatible way, we release a new dated version, but to avoid breaking your code, we don’t change your version until you’re ready to upgrade.

---

## How can I upgrade my API?

If you’re running an older version, you’ll want to upgrade to take advantage of the latest API. For changing your API version, go to your Project Settings and click** Upgrade to the latest API version**.

<!-- ![Upgrade API](../../assets/img/guides_development_api_version_upgrades_upgrade_1.png "Upgrade API") -->
![Upgrade API](https://files.readme.io/d5b3ce2-upgrade-API.png "Upgrade API")

---

## Changes which Voucherify considers to be backwards-compatible

- Adding new API resources.
- Adding new optional request parameters to existing API methods.
- Adding new properties to existing API responses.
- Changing the order of properties in existing API responses.
- Changing the length or format of object IDs or other opaque strings. 
- Adding new event types. It means that your webhook listener should gracefully handle unfamiliar events types.

---

## API changelog

| Version | Description |
|:---|:---|
| v2017-04-05 <br>version deprecated | - Responses from the voucher and campaign listing methods were moved to the new object structure. Methods will now render specific properties for a total count and an array of objects.<br>- Introduced validation for listing parameters: `limit` and `page`. A limit can range between 1 and 100 items.<br>- Get voucher/campaign methods render **validation rules** related to the voucher object. They can be inherited from a campaign.<br>- Created an API method for getting a campaign identified by name. |
| v2017-04-20 <br>version deprecated | Response from the voucher publish method was moved to the new object structure. Returned voucher details are wrapped by transaction object describing publication event:<br>{ "id": "pub_whQzIndYoyZoqiLEKN0s04GK", "object": "publication", "created_at": "2017-04-20T13:18:01Z", "customer_id": "cust_mOjhGypfbqch0v3DpAA9LDXj", "tracking_id": "janusz", "channel": "API", "metadata": { "test":true }, "voucher": {} } |
| v2018-08-01 | This version introduces a new model for building Validation Rules. The extended mechanism gives an advanced configuration for making promo conditions.<br><br>The modifications in this version affect the following API methods:<br><br>- `List Promotion Tiers`: replaced an object describing conditions by a list of records describing an association between rule and tier - `validation_rule_assignments`<br>- `List Promotion Tiers for campaign` - as above<br>- `Promotion Tier Object` - as above<br>- `Validation Rule Object` - structure reorganized to handle advanced rules<br>- `Validation Rule Assignment Object` - added object describing a relation between rules and linked promotions<br>- `Validation Rules` - modified data model<br><br>The mechanics and details of Validation Rules builder are described in the Help Center. |

> 📘 Release Notes
>
> [Visit our Help Center](https://support.voucherify.io/article/23-whats-new-in-voucherify) to learn more about the latest Release Notes and new features.
