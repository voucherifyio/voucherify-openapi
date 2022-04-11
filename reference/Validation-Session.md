---
tags: [VALIDATIONS API]
---

# Validation-Session

The default validation/redemption mechanism always works in a transactional way, therefore the voucher's usage is registered permanently once redemption is successful. In case, the resource usage is needed to be recorded temporary right after the voucher is being validated the session mechanism will come in handy.

Once the session is established the session key is being returned. The key must be used with the following requests (another validation or redemption) to identify clearly the session. Multiple requests with the same key will always override existing session values.

The session can be released in one of the following ways:

  * expiration time passes
  * redemption is being registered for the session
  * manual release using a dedicated API endpoint (for vouchers only: [Release Validation Session](OpenAPI.json/paths/~1vouchers~1{code}~1sessions~1{session_key}/delete) )

<!-- theme: danger -->

> #### Session Key
>
> To link request with the given session always use the same session key for session-related validation and redemption requests. You can use your own session key or system will generate one for you once session option is enabled with the request.

Please note that if you want to use the established session during all validations/redemptions of the code, you need to pass the same session key in each validation and redemption request. 

<!-- theme: danger -->

> #### Validation and Redemption with Session
>
> Registering a session will record a temporary usage for the specified timeframe. It means it will influence other incoming validation and redemption requests until the session is released.
> 
> Once redemption is successful the session is removed automatically.

## Session Types

The following table presents the type of sessions that can be established.  

| **Session Type** | **Behaviour** |
|:---|:---|
| LOCK | Locks the following parameters within the session:<br><br>* redemption quantity by 1<br>* redemption gift credits specified with the requests<br>* redemption loyalty points specified with the request |

## Session object reference

| **Parameter** | **Description** | **Example** |
|:---|:---|:---|
| session.type<br>`string`<br>required | Type of the session. Required to establish a new session.<br>Supported session types are listed in the table above. | "session":{<br>"type": "LOCK"<br>} |
| session.key<br>`string`<br>optional | Unique session identifier. | "session": {<br>"key": "ssn_yQGMTeKBSw8OOuFPwlBEjzGy8d8VA9Ts",<br>"type": "LOCK"<br>} |
| session.ttl_unit<br>`string`<br>optional | Defines the type of unit in which session time is counted. Allowed values: DAYS, HOURS, MICROSECONDS, MILLISECONDS, MINUTES, NANOSECONDS, SECONDS | "session": {<br>"type": "LOCK",<br>"ttl": 7,<br>"ttl_unit": "DAYS"<br>} |
| session.ttl<br>`number`<br>optional | Value for the period of time that the session is active. Units for this parameter are defines by session.ttl_unit | "session": {<br>"type": "LOCK",<br>"ttl": 7,<br>"ttl_unit": "DAYS"<br>} |


<!-- theme: info -->

> #### Default session time  
> If you won't establish session timeframe by passing the session.ttl and session.ttl_unit, it'll be active throughout 7 days.

You can always release established sessions by calling [Release Validation Session](OpenAPI.json/paths/~1vouchers~1{code}~1sessions~1{session_key}/delete) endpoint.
