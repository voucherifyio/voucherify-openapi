---
title: Management API
excerpt: API endpoints for managing account-related operations
categorySlug: development
slug: management-api
type: basic
hidden: false
order: 81
---

## Management API Benefits

Management API introduces API endpoints that let you perform account-related operations connected with:
- [Projects](ref:create-project "Create Project"),
- [Users](ref:assign-user "Assign User"),
- [Metadata schemas](ref:create-metadata-schema "Create Metadata Schema"),
- [Custom event schemas](ref:create-custom-event-schema "Create Custom Event Schema"),
- [Stacking rules](ref:create-stacking-rules "Create Stacking Rules"),
- [Webhooks](ref:create-webhook "Create Webhook Configuration"),
- [Branding](ref:create-brand "Create Brand").
 
The three main advantages of the Management API are:

1. **Automation**: Streamline the process of creating new projects, configuring them, and adding users, among other tasks.
2. **Accelerated Delivery**: Experience faster delivery times for new projects.
3. **Reduced Error Risk**: By leveraging standardized API calls, the Management API lowers the risk of human error in project configuration, ensuring consistency and reliability.

> 📘
>
> The Management API is an Enterprise feature.

> 🚧 Beta Version
>
> The Management API is still in beta. Voucherify developers are working on improving the endpoints.

## Management API Keys

The new tab within Team Settings becomes accessible once it's unlocked for your organization. From there, you can generate Management API keys to facilitate various operations.

Each organization can generate a maximum of 5 API keys. You have the flexibility to delete, edit, and add new keys at your discretion. However, any modification triggers a cache refresh (deletion).

Should you require more than 5 keys, please reach out to our support team for assistance.

Note that actions performed via the Management API are not logged in the audit log for privacy and security reasons.

> 🚧
>
> After creating a new Managemet API key, you have **15 minutes** to copy the token.
>
> Write your secret keys down and keep them in a safe place.

### Tracking Management API Usage

To monitor the usage of Management API calls, navigate to the Team Settings tab. You'll find a comprehensive chart located alongside other usage metrics, allowing you to stay informed about your organization's activity.