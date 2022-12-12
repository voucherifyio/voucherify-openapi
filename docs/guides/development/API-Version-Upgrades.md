---
title: API Version Upgrades
excerpt: Keep track of changes and upgrades to the Voucherify API.
category: 636284b7e6b02c00a136e86e
slug: api-version-upgrades
---

Your API version controls the API and webhook behavior you see (e.g., what properties you see in responses, what parameters you’re permitted to send in requests, etc.). Your version is set the first time you make an API request. When we change the API in a backwards-incompatible way, we release a new dated version, but to avoid breaking your code, we don’t change your version until you’re ready to upgrade.

---

## How can I upgrade my API?

If you’re running an older version, you’ll want to upgrade to take advantage of the latest API. For changing your API version, go to your Project Settings and click** Upgrade to the latest API version**.

![Upgrade API](../../assets/img/guides_development_api_version_upgrades_upgrade_1.png "Upgrade API")

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

TABLE

> :blue_book: Release Notes
>
> [Visit our Help Center](https://support.voucherify.io/article/23-whats-new-in-voucherify) to learn more about the latest Release Notes and new features.