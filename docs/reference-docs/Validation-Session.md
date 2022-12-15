---
title: Validation Session
excerpt: 
category: 636284b7e6b02c00a136e873
slug: validation-session
parentDoc: 63990ba4e5a407003a6ebc0b
---

The default validation/redemption mechanism always works in a transactional way, therefore the voucher's usage is registered permanently once redemption is successful. In case, the resource usage is needed to be recorded temporary right after the voucher is being validated the session mechanism will come in handy.

Once the session is established the session key is being returned. The key must be used with the following requests (another validation or redemption) to identify clearly the session. Multiple requests with the same key will always override existing session values.

The session can be released in one of the following ways:

  * expiration time passes
  * redemption is being registered for the session
  * manual release using a dedicated API endpoint (for vouchers only: [Release Validation Session](ref:release-validation-session) )
  * manual release using the Validations Manager in the Dashboard to unlock sessions. [Read more](https://support.voucherify.io/article/16-dashboard-sections#validations)

> 🚧 Session Key
> 
> To link request with the given session always use the same session key for session-related validation and redemption requests. You can use your own session key or system will generate one for you once session option is enabled with the request.

Please note that if you want to use the established session during all validations/redemptions of the code, you need to pass the same session key in each validation and redemption request. 

> 🚧 Validation and Redemption with Session
> 
> Registering a session will record a temporary usage for the specified timeframe. It means it will influence other incoming validation and redemption requests until the session is released.
>
> Once redemption is successful the session is removed automatically.

## Session types

The following table presents the type of sessions that can be established.

TABLE

## Session object reference

TABLE

> 📘 Default session time
> 
> If you won't establish session timeframe by passing the session.ttl and session.ttl_unit, it'll be active throughout 7 days.

You can always release established sessions by calling [Release Validation Session](ref:release-validation-session) endpoint.
