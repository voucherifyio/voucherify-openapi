---
title: Integration blueprint
excerpt: Learn how to integrate with Voucherify
categorySlug: integration-blueprint
slug: integration-overview
type: basic
hidden: false
order: 2
---

Follow this blueprint for a successful launch:
- **Discover**: Work with your team to determine your scope, write use case scenarios, and outline the customer journey.
- **Plan**: Structure the project, assemble your team, and scope your data requirements.
- **Integrate**: Learn how to integrate your platform with Voucherify.
- **Migrate**: Define your migration strategy and import your existing data.
- **Test**: Check the integration and simulate your key business scenarios for a flawless deployment.
- **Deploy**: Go live! Launch your campaigns to production and start engaging customers.
- **Track and maintain**: Monitor results in real-time and optimize your campaigns for peak performance.

## Discover

During the planning phase, you and your team are going to determine what you want to achieve with Voucherify and how to execute it.

Involve key team members into the integration, for example:
- Project lead
- Marketing/CRM lead
- Product owner
- Front-end and Back-end developers
- Solution architect

This phase is crucial for aligning everyone on goals and responsibilities.

Together with your team, define a use case within Voucherify and specify the scenario intended for launch. Key aspects include:
- **Campaign effect**: The primary goal, intended outcome, and KPIs.
- **Campaign type**: Discount coupons, automatic promotions, bundling, gift cards, referral programs, loyalty programs, or combinations of those.
- **Target audience**: Specific customer groups to include or exclude, defining all customer-level rules.
- **Promotion distribution**: How incentives will be distributed and when customers receive messages or qualify.
- **Limits and conditions**: Time constraints, like specific times or recurring events, qualifying orders and products, or promotion rules and limitations
- **Customer journey**: Mapping where the promotion will be displayed and the entire workflow across customer touchpoints.
- **Budget limits**: Whether the campaign automatically concludes upon reaching a predefined redemption threshold or other budget constraints.
- **Tech stack**: [Other tools you want to integrate with Voucherify](https://www.voucherify.io/integrations "Voucherify integrations"), for example Customer Data Platforms (CDPs), Customer Engagement Platforms (CEPs), Customer Relationship Management (CRMs), Customer Management Systems (CMS), or distribution tools.

## Plan

Begin by [signing up for a Voucherify account](doc:getting-started). You’ll have access to a 60-day Sandbox project to test the platform. Like each project, Sandbox has its own unique API keys and isolated data: customers, products, campaigns, and IDs. Choose your projects on clusters that are closest to your location for optimal performance.

Consider these key points in your planning:
- **Team roles and access**: Define how various departments will use Voucherify and invite as many [team members](https://support.voucherify.io/article/120-account-settings) (marketing, engineering, support) as you need to the Voucherify dashboard. Determine roles, scopes of responsibilities, and generate separate API keys, if necessary. You can assign appropriate user roles to control access and maintain security.
- **API touchpoints**: Examine your customer journey to decide where and how customers will redeem incentives in [your integration](doc:integration-processes). Determine if your flow requires [qualification](doc:checking-eligibility) (show available incentives to customers), [validation](ref:validate-stacked-discounts) (check if the customer is eligible for an incentive), or [redemption](ref:redeem-stacked-discounts) (actual use of the incentive at checkout) endpoints. Consider which systems (e-commerce platform, mobile app, POS, and so on) need to call Voucherify to validate or apply promotions.
- **Data model and preparation**: Define what kind of data you need and prepare them beforehand.
- **Distribution channels**: Decide how you will deliver promo codes or promotion notifications to customers. You can use Voucherify’s built-in [Distributions](https://support.voucherify.io/article/19-how-does-the-distribution-manager-work) or use your own communication tools. 
- **Reporting needs**: Consider how you will track campaign performance and extract data, for example through Voucherify dashboards or by exporting data. If you have a business intelligence tool, outline how Voucherify data will be exported or synced for analysis (for example, with [CSV exports](https://support.voucherify.io/article/543-data-export "Data export"), APIs, or [webhooks](ref:introduction-to-webhooks)). This ensures you can measure success metrics like redemption rates and ROI.
- **Legacy migration**: If you are moving from another promotions system, [plan the import of existing incentives](doc:import-codes).
- **Scale and volume**: Estimate the expected load on Voucherify, including API call volumes, number of users, and so on. High traffic or large datasets might influence your approach; for example, you may request a dedicated cluster for performance for high traffic or large datasets. Knowing your approximate peak redemption rate helps ensure you stay within API rate limits and choose the right subscription plan. Also, consider how to handle data: in bulk imports, through the Dashboard, API, or using the create or update entity API calls.
- **Security and compliance**: Review any [security](doc:security) requirements and data policies before integrating. Identify sensitive data (PII) that will be sent to Voucherify and ensure it aligns with GDPR or other regulations. Plan to use secure practices such as server-side API keys for critical operations, implementing appropriate encryption for data in transit, and controlling access with Voucherify’s roles and project scoping. If fraud prevention is a concern, consider what rules or monitoring to put in place.

By the end of this phase, you should have a clear implementation plan, an understanding of Voucherify’s key concepts and all prerequisites to begin development.

> 👍
> 
> Integration planning can take a few weeks of coordination, depending on the complexity of your use cases. Voucherify itself is modular, so you can choose to integrate only the features you need initially and add more over time.


## Model and prepare data

A successful implementation of Voucherify requires preparing a good data model:
- **Customer data**: Determine what customer attributes and events need to be shared with Voucherify to support your use case. For instance, you may need to use your own IDs, send customer sign-up dates, loyalty tier status, or purchase history as customer metadata or custom events. Plan how the data will be [synchronized](doc:data-synchronization#customer-synchronization) (Dashboard or API) and how frequently to keep Voucherify’s view of the customer up-to-date. You can also integrate a Customer Data Platform (CDP) with Voucherify.
- **Product catalog**: If your promotions depend on product information, integrate your product catalog with Voucherify. This can involve importing product IDs, SKUs, or collections so that promotion rules can reference them. Also, plan the [synchronization method](doc:data-synchronization#product-synchronization) (Dashboard or API) and frequency of updates. Ensure product IDs in Voucherify match those in your e-commerce system for consistency.
- **Orders**: [Synchronize](doc:data-synchronization#order-synchronization) transaction data, like items, prices, total, currency, to Voucherify in validation or redemption calls to enforce rules on cart content. If you have legacy order history to migrate, you can use import orders endpoint (for historical data) and incremental Create or Update Order APIs. In general, an order record in Voucherify can be used to tie a redemption back to the transaction.
- **Metadata schema**: [Define metadata](doc:metadata-mapping) (custom attribute) schemas for customers, orders, or other entities if needed. For example, if you plan to have a rule based on a customer segment or loyalty tier that isn’t a default attribute, add it to Voucherify’s metadata schema. Defining a metadata schema upfront enforces data consistency and helps your developers know what custom fields to send in API requests.
- **Event schema**: If you’re going to use [custom events](https://support.voucherify.io/article/111-custom-events "Define custom event schemas"), like an event for “User birthday” or “Referral achieved” that might trigger rewards, configure those in Voucherify as well. This way, events sent from your system will be recognized and can be used in campaign rules, such as triggering an automatic coupon on a customer’s birthday.
- **Initial campaign configuration**: Although campaign setup is primarily a marketing task, it can be useful to configure one or two test campaigns with validation rules for development purposes. This also helps confirm that your data (customers, products, and so on) is correctly set up to meet campaign requirements.

In this stage, don’t forget about your data volume: how many customers, products, orders, and other data you want to send to Voucherify.

## Integrate

The Integrate phase involves incorporating Voucherify's API into your application workflows:
- **Authenticate with the Voucherify API**:
  - **Server-side (secret) API key**: Used for secure operations on your [backend](doc:authentication#application-authentication).
  - **Client-side (publishable) API key**: Used for [public client applications](doc:authentication#client-side-authentication) (mobile apps, web apps) to access a subset of the API labeled as client-side. Client-side features require domain/mobile app origin whitelisting in Project Settings > Client-side Settings.
  - **OAuth 2.0**: Voucherify supports [OAuth 2.0](doc:authentication#oauth-20) for API authorization.
- **Install an SDK**: Voucherify provides [SDKs](doc:sdks) for various languages, which automatically handle API keys.
- **Select core API calls**:
  - [Validation](ref:validate-stacked-discounts) checks the eligibility of discounts and calculates final prices.
  - [Redemption](ref:redeem-stacked-discounts) applies incentives to a customer's order.
  - [Qualification](doc:checking-eligibility) suggests relevant promotions and coupons based on customer attributes, selected scenario, and current shopping cart contents, with filtering options for campaign category and hierarchy. It can be used to display strike-through scenarios.
  - [Publication](ref:create-publication) involves associating a code with a specific customer, typically for code distribution. This step can be triggered on demand.
- **Connect with your tech-stack**: Configure API keys to integrate Voucherify with your other tools.
- **Migrate your data**: [Import](https://support.voucherify.io/article/574-data-import "Import your data into Voucherify") the planned data as well as any legacy codes you want to transfer from your previous systems.
- **Configure additional functionalities**: Prepare distributions to automate actions in response to selected triggers or set up webhooks for automation and data tracking.

## Test

Before you launch, test your Voucherify integration thoroughly to ensure it works just as you planned.

### Sandbox

Each Voucherify account includes a [Sandbox project](https://support.voucherify.io/article/538-sandbox "Voucherify Sandbox project"). This project is not included in your project limit and has its own unique API keys for authorization. The Sandbox project has a fixed API call limit of 100 calls per hour.

The Sandbox project has a couple of default test campaigns, standalone codes, customers, and products to make testing easier. It’s recommended to add realistic test data, including customer profiles that qualify (or don't qualify) for promotions, sample products, and campaigns.

### Demo Shop

The Sandbox includes a showcase [Demo Shop](https://support.voucherify.io/article/538-sandbox#demo-shop "Voucherify Demo Shop"), which is a built-in test environment for validating campaigns before going live. The Demo Shop allows simulation of transactions (applying discounts, redeeming codes) to confirm campaign rules function correctly. Each redemption is tracked in the dashboard. The Demo Shop also displays API requests and responses, allowing inspection and copying of JSON payloads.

### Functional testing

For each campaign type and user story, perform tests within your application:
- **Coupons**: Test valid, expired, used, and invalid codes. Confirm correct discount application and appropriate error messages.
- **Cart promotions**: Test various cart contents to ensure automatic promotions trigger or do not trigger as expected.
- **Loyalty**: Simulate earning points by triggering events (e.g., test purchases). Verify loyalty balance increases and that point redemption for rewards succeeds only with sufficient points, with correct debits.
- **Referrals**: Simulate referral flows using two test customer accounts, verifying incentives for both the referred and referrer.
- **Distribution flows**: Trigger conditions for automatic distributions (emails, etc.) and confirm messages are sent.

> 👍
> 
> Intentionally test failure scenarios and edge cases. This includes making API calls with malformed requests or missing data, disabling networks, or using incorrect API keys to verify error handling. Test complex campaign rules, such as mutually exclusive promotions or budget limits, to confirm correct behavior.

### Data integrity checks

Ensure data consistency between systems. After test redemptions, verify the following in the Voucherify Dashboard:
- Redemption entries to confirm details such as customer and order amount. Check with your internal database if it also reflects the redemption.
- Order entries to check if discounts, metadata, and activity data show intended results.
- Audit log to inspect any other event that requires checking, including webhook sendouts.

## Deploy

Before rolling out the integration into production, complete a final launch checklist:
- **Swap to production API keys**: Update the application configuration to use the production Voucherify API keys for the live environment.
- **Data consistency**: Replicate any necessary data from the Sandbox project to the production project. Verify consistency of product catalog entries, metadata schemas, and other configurations. You can use campaign templates to move discount and gift campaign configurations from Sandbox to your production project.
- **Enable production campaigns**: Activate and configure all promotional campaigns intended for launch in the production Voucherify project. Upload production-specific data and verify campaign settings (date ranges, discount values, budget limits). Disable or delete any test campaigns or codes in the production project that should not be live.
- **Access and permissions**: Confirm all team members needing access to Voucherify (marketers, customer support, admins) have appropriate roles in the production project. Ensure API key permissions align with required API actions.
- **Training and documentation**: Confirm the Marketing/CRM team is proficient in using Voucherify in production, including creating, pausing, and monitoring campaigns.
- **Backup and fallback plan**: Establish a contingency plan for potential issues post-launch, such as disabling a malfunctioning promotion or reverting to manual workarounds. Understand how to contact Voucherify support for urgent platform issues.
- **Privacy and compliance check**: Verify all privacy measures are in place, particularly regarding real customer data flow. Ensure compliance with GDPR and other regulations.
- **Go live communication**: Inform all relevant parties, including customer support, about new promotions and the Voucherify system.

## Track and maintain

Post-launch, you should perform ongoing tracking and maintenance to gain insights and ensure the integration continues to operate effectively.

You can use the following functionalities to track and maintain your Voucherify project:
- **Webhooks**: Use [webhooks](ref:introduction-to-webhooks) to stream events in real time to other systems. Webhooks can be configured for various event types (for example, "voucher redeemed", "loyalty points added", “customer created”). This way, you can immediately capture promotion events in your infrastructure, facilitate integration with data warehouses, analytics platforms, or marketing engagement platforms.
- **APIs for data export**: Data can be exported from Voucherify using its APIs to query resources such as redemption entries, customer profiles, and campaign statistics. This is suitable for bulk data synchronization.
- **Built-in reporting and CSV export**: You can use internal analytics tools in the Dashboard and also export data as CSV files (for example, lists of vouchers, redemption logs, customer lists) for deeper analysis or record-keeping.
- **Integrations with BI and marketing tools**: Voucherify can function as a data source, streaming events (like redemption events) into BI tool’s pipeline for routing to other destinations. Integration with Customer Engagement Platforms allows those platforms to receive or query Voucherify data.
- **Notifications**: Configure in-app and email notifications to be alerted when a certain percentage of redemptions, API calls, or bulk API calls are used. Notifications for webhooks usage are sent if hourly limits are exceeded.
- **Audit logs**: the logs track API details, including request and response bodies, query parameters, related events, and more. This provides operational insight and debugging capabilities for system integrations.