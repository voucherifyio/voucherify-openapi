---
title: API optimization
excerpt: Learn how to optimize your API calls
categorySlug: development
slug: api-optimization
type: basic
hidden: false
order: 150
---

## API call optimization

API call optimization is a great way of lowering the number of API calls used and, in effect, reducing the operational costs in Voucherify.

Voucherify follows the usage-based pricing model. This means that the user is charged for the number of API calls they make to the platform. Voucherify promotion engine operates on a fixed quota model, which means that the user can easily predict the average number of API calls they will need per month.

To optimize and reduce the number of API requests, consider the following strategies:

1. Revise your integrated processes,
2. Revise data synchronization between the systems,
3. Synchronize data via Webhooks.

### Revising integrated processes

Voucherify has a set of predefined use cases that explain when specific API requests are necessary and optional. These well-defined scenarios help streamline the integration process and ensure efficient utilization of the API. Feel free to look into [integration processes](doc:integration-processes) to get more information.

### Revising data synchronization between the systems

Voucherify is capable of seamless data incorporation during the validation, qualification, and redemption processes without requiring data synchronization. This key feature introduces a level of flexibility and adaptability to the workflow, allowing the system to assimilate information at different stages without being bound by synchronization protocols. Learn more about [data synchronization](doc:data-synchronization) in Voucherify.

### Synchronizing data via Webhooks

Explore the possibility of using [webhooks](https://support.voucherify.io/article/68-webhooks-notifications). Instead of polling the API for updates, the API can notify your system when there are changes. This minimizes the need for constant querying.

> 📘
>
>Webhooks use separate limits and do not count towards the API call limits. Learn more in our [Limits](doc:limits) article.