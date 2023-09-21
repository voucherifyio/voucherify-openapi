---
title: Client-side API
excerpt: 
categorySlug: development
slug: client-side-api
type: basic
hidden: false
order: 7
---

Sometimes it's important to validate a promo code or promotion on the client-side, e.g., you want to calculate and display a discounted price on the fly. That's why Voucherify comes with client-side features build in [Voucherify JS SDK](https://github.com/voucherifyio/voucherify-js-sdk) - an open-source JavaScript library which enables you to query the API. 

Among other features it delivers [Voucherify React Widgets](https://github.com/voucherifyio/voucherify-js-sdk#-voucherify-react-widget)

<!-- ![React Widget](../../assets/img/guides_development_client_side_api_widget_1.gif "React Widget") -->
![React Widget](https://files.readme.io/0427b12-widget.gif "React Widget")

Voucherify JS SDK offers many client-side features:
- `validate widget` which enables your customers to validate their codes and check its validity in a given context.
- `redeem widget` which enables your customers to redeem the promo codes.
- `publish widget` which enables your customers to a unique voucher from a given campaign in exchange for providing an email address.
- `subscribe widget` which adds a [customer](ref:get-customer) to Voucherify. You can then use one of the [automatic delivery](doc:automatic-delivery) channels to send him/her a coupon.
[Read more here](https://voucherifyio.github.io/voucherify-js-sdk/#client-side-methods).

## Installation & reference

Visit :fa-github-alt: [Github repository](https://github.com/voucherifyio/voucherify-js-sdk) to get the up-to-date documentation.

> 🚧 Domain white list
> 
> To use Voucherify client-side features you have to white-list your domain in the [Client-side Settings](https://app.voucherify.io/#/app/configuration/proj_f1r5Tpr0J3Ct).

<!-- ![Domain Settings](../../assets/img/guides_development_client_side_api_domain_settings_2.png "Domain Settings") -->
![Domain Settings](https://files.readme.io/fb263b9-domain-settings.png "Domain Settings")

> 🚧 Enable client-side features
> 
> You have to activate particular client-side options in the [Project Settings](https://app.voucherify.io/#/app/configuration/proj_f1r5Tpr0J3Ct).

<!-- ![Client-Side Settings](../../assets/img/guides_development_client_side_api_client_side_settings_3.png "Client-Side Settings") -->
![Client-Side Settings](https://files.readme.io/038ab3b-cielnt-side-settings.png "Client-Side Settings")
