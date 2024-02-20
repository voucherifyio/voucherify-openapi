---
title: Webhook v2024-01-01 Migration Guide
type: basic
categorySlug: webhooks
slug: migration-guide
hidden: false
order: -1
---

At the start of 2024, Voucherify introduced a new approach to webhook notifications. The changes to the webhook payload include modifications to key fields and the overall structure. The new approach is a breaking change that requires development effort to switch to the new version of the payloads.

While we recognize the inconvenience of breaking changes, these updates are designed to enhance the overall reliability and performance of our webhook services. We appreciate your understanding as we work to deliver a more robust and advanced platform.

> 🚧
> 
> **Effective Date of Change**: March 31, 2024.

As these changes are breaking, it is crucial that you update your integration to accommodate the new webhook payload structure before the effective date mentioned above. Failure to do so may result in disruptions to your webhook processing.

## Webhook Changes Detailed

The changes to the webhooks consider the difference in the payload only. Here is the comparison between the overall structure of the redemption.succeeded event.

| **V2018-08-01 keys** | **Explanation**                               | **V2024-01-01 keys** | **Explanation**                                                      | **Comparison**                                                                                                                                                |
| -------------------- | --------------------------------------------- | -------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                 | ID of the event                               | `id``                | The ID of the webhook sendout                                        | *The purpose of the key changed*                                                                                                                              |
| `object`             | Always set to `event`                         | \-                   | Key was dropped                                                      | *Key dropped*                                                                                                                                                 |
| `webhook_id`         | ID of the webhook sendout                     | \-                   | Changed the key to `id`                                              | *Key renamed*                                                                                                                                                 |
| `project_id`         | ID of the project associated with the webhook | `project_id`         | ID of the project associated with the webhook                        | *No change*                                                                                                                                                   |
| `created_at`         | Original sendout date and time                | `created_at`         | Original sendout date and time                                       | *No change*                                                                                                                                                   |
| `type`               | Name of the event                             | `type`               | Name of the event                                                    | *No change*                                                                                                                                                   |
| `data`               | Contains the data associated with the event   | `data`               | Contains the data associated with the event                          | *Complete redesign of the `data` object*                                                                                                                      |
| \-                   | \-                                            | `source`             | Object containing the webhook or distribution ID with the target url | Introduced                                                                                                                                                    |
| `metadata`           | Contains additional details about the webhook | \-                   | Object dropped                                                       | *Object dropped. The object contained limited information regarding the source of the event. The information was moved to the `source` object in v2024-01-01* |
| \-                   | \-                                            | `event`              | Identifies the original trigger of the webhook                       | *Object introduced*                                                                                                                                           |

## Webhook v2024-01-01 Structure

The following table contains the explanation of the new webhook structure.

Each webhook definition was described in [Voucherify’s documentation](https://docs.voucherify.io/reference/introduction-to-webhooks#events-in-the-project-settings).

<table
        style="table-layout: fixed; font-size: 10pt; font-family: Arial; width: 0px; border-collapse: collapse; border: none;">
        <thead>
            <tr style="height: 21px;">
                <th>Key</th>
                <th>Explanation</th>
                <th>Example data</th>
            </tr>
        </thead>
        <colgroup>
            <col width="100">
            <col width="100">
            <col width="100">
        </colgroup>
        <tbody>
            <tr style="height: 21px;">
                <td>id</td>
                <td>The sendout ID of the webhook</td>

            </tr>
            <tr style="height: 21px;">
                <td>project_id</td>
                <td>ID of the project associated with the webhook</td>
                <td>proj_lurN555</td>
            </tr>
            <tr style="height: 21px;">
                <td>created_at</td>
                <td>Original sendout date and time</td>

            </tr>
            <tr style="height: 21px;">
                <td>type</td>
                <td>The event's name</td>

            </tr>
            <tr>
                <td>data</td>
                <td>The webhook's unified information that, depending on the type of the webhook, can consist of:
                    <ul>
                        <li>The customer object,</li>
                        <li>The campaign object,</li>
                        <li>The voucher object,</li>
                        <li>The
                            holder object,</li>
                        <li>The earning rule object,</li>
                        <li>And others.</li>
                    </ul><br><br>The data will consist only of the objects relevant for the webhook notification. Please
                    refer to the relevant section in the <a
                        href="https://docs.voucherify.io/reference/introduction-to-webhooks#events-in-the-project-settings"
                        arget="_blank">webhook documentation</a> to retrieve the new webhook structure and example
                    payload.
                </td>
                <td>

                    `"customer": {}`,
                    `"holder": {}`,
                    `"voucher": {}`,
                    `"campaign": {}`,
                    `"loyalty_tier": null`,
                    `"earning_rule": {}`,
                    `"balance": {}`,
                    `"order": {},`
                    `"event": {}`

                </td>
            </tr>
            <tr>Webhook or distribution ID,</td>
                <td>

                    ```json
                    "source": {
                        "id": "wh_55555",
                        "object": "webhook",
                        "target_url": "https://voucherify.io/webhook_target"
                        }
                    ```

                </td>
            </tr>
            <tr>
                Identifies the original trigger of the webhook.</td>
                <td>

                    ```json
                    "event": {
                        "id": "evcus_55555",
                        "type": "customer.rewarded.loyalty_points",
                        "created_at": "2024-02-06T08:39:59.188Z",
                        "entity_id": "cust_55555",
                        "group_id": "v-55555",
                        "event_source": {
                            "channel": "INTERNAL"
                            }
                        }
                    ```

                </td>
            </tr>
            
        </tbody>
    </table>

## Migration Procedure

To migrate your existing webhooks, we propose the following procedure. Please note that your approach to the migration can be different; consider your dev team's input.

1. Create a new project in Voucherify or use one of your existing sandbox/UAT purpose projects.
2. Go to Project Settings.
3. Scroll down to the Webhook section.
4. Switch your webhook definitions to v2024-01-01.
5. For each v2018-08-01 webhook you have used so far, perform an action that triggers the v2024-01-01 webhook.
6. Test the new webhook configuration and adjust your integration accordingly.
7. Change to your production project and switch to the new webhooks in Project Settings.

> 📘 Important notes
> 
> - On April 1st, 2024, Voucherify team members will start manually switching accounts to the new webhook definitions individually. If the webhooks are not switched to the new version, Voucherify team members will reach out to the account owners to ask about the webhook migration status. If you do not respond to our communication, the webhook definitions may be changed to version v2024-01-01 within the next few days. If you need more time to switch, please contact support@voucherify.io urgently. 
> - There are significant differences to payloads in webhook v2024-01-01. Please review the changes closely.
> - Once you switch to version v2024-01-01 on your production project(s), you can switch back to V2018-08-01 until March 31, 2024.
> - If the new webhooks miss data that is crucial to your integration, reach out to support@voucherify.io and provide details about your case and your expectations.
> - If, once in the production project, you find that the webhook definitions do not conform to your new format, please adjust your integration accordingly and contact support@voucherify.io to resend the webhooks. Voucherify’s team can resend webhooks triggered no longer than 14 days ago.

## Benefits of Switching to v2024-01-01 Webhooks

The new webhooks bring a couple of improvements to the Voucherify platform.

With the new generic approach to the structure of the payloads, it is easier to maintain the new payload structure, making the integration robust. The data object always reuses the same generic objects associated with the event.

The new structure is the first step to introducing a Custom Webhook builder. The builder will allow you to translate the webhook payload into an API request to external systems, so you will not need middleware between the two systems.

Also, the v2024-01-01 webhooks have a separate log. In the Voucherify Dashboard, go to the Audit log and the Webhook sendouts tab.

In the Webhook Sendouts log, you can see the status of the sent webhooks, filter the results, preview the sent payload, and retry sending the webhooks again.

## Documentation of the changes and support

We understand that adapting to changes can be challenging, so we are here to assist you throughout this process. Please refer to [regularly updated documentation](https://docs.voucherify.io/reference/introduction-to-webhooks), which outlines the specifics of the new payload structure.

If you encounter any issues or have questions during this transition, Voucherify support team is ready to help. Reach out to support at [support@voucherify.io](support@voucherify.io).