# Voucherify's Documentation and OpenAPI Contribution

## Introduction

Voucherify builds and maintains REST API documentation and SDKs to make it easier for software developers to understand and integrate Voucherify into their e-commerce platforms.

This document describes all deliverables and their development process.

## Contents
- [Voucherify's Documentation and OpenAPI Contribution](#voucherifys-documentation-and-openapi-contribution)
  - [Introduction](#introduction)
  - [Contents](#contents)
  - [Deliverables](#deliverables)
  - [Guides and API Reference](#guides-and-api-reference)
  - [API Reference - Endpoint Pages](#api-reference---endpoint-pages)
  - [API Reference - Data Model Pages](#api-reference---data-model-pages)
  - [API Reference - Introduction Pages](#api-reference---introduction-pages)
  - [Beta Endpoints](#beta-endpoints)
  - [OpenAPI Files](#openapi-files)
  - [OpenAPI](#openapi)
    - [OpenAPIWebhooks File and Event Documentation](#openapiwebhooks-file-and-event-documentation)
    - [Naming Convention](#naming-convention)
    - [Correct 0-level model example:](#correct-0-level-model-example)
    - [Good practices](#good-practices)
  - [Contribution to Documentation](#contribution-to-documentation)
    - [Prerequisites](#prerequisites)
    - [Images in Markdown Files](#images-in-markdown-files)
    - [Categories](#categories)
    - [Development Process](#development-process)
  - [How to Merge a Pull Request and Update Public Documentation](#how-to-merge-a-pull-request-and-update-public-documentation)


## Deliverables

Voucherify's dev experience is built around three main items:
- [**Guides** documentation](https://docs.voucherify.io/docs "Voucherify Guides") that describes key concepts, integration with Voucherify development, and common recipes.
- [**API Reference** documentation]( https://docs.voucherify.io/reference/introduction-1 "API Reference") describing REST API endpoints, including available parameters and responses.
- **SDKs**: clients for all major programming languages, e.g., JavaScript, Java, Ruby, Python, .NET, PHP. The source code of SDKs is hosted on the GitHub platform and available for the developers in language-specific package repositories like [NPM](https://npmjs.com/), [RubyGems](https://rubygems.org/), or [Apache Maven](https://maven.apache.org/).


## Guides and API Reference

The Guides and API Reference pages are hosted on [readme.io](https://readme.com/), which is a platform for creating and hosting developer documentation. However, the source of the documentation content is stored in the [Voucherify Open API GitHub repository](https://github.com/voucherifyio/voucherify-openapi).

The guides are stored purely as Markdown files in the [guides folder](https://github.com/voucherifyio/voucherify-openapi/tree/master/docs/guides). They can be uploaded to the readme.io platform via readme CLI.

The API Reference pages are built by readme.io. The platform combines the OpenAPI file that describes Voucherify API endpoints, parameters, and responses with the Markdown files from the [reference folder](https://github.com/voucherifyio/voucherify-openapi/tree/master/docs/reference-docs).

## API Reference - Endpoint Pages

API Endpoint Pages like [GET voucher](https://docs.voucherify.io/reference/get-voucher) describe a REST API endpoint, including details like path, HTTP method, path parameters, body parameters, response schema, and response statuses. On the right side of those pages, there is a `Playground Widget` that developers can use to make test API calls. Readme.io builds those pages using information about the REST API from the uploaded OpenAPI file and displays UI, so users can explore all the details.

For each endpoint page, there is a corresponding dummy Markdown file like [VOUCHERS-Get-Voucher.md](https://github.com/voucherifyio/voucherify-openapi/blob/master/docs/reference-docs/VOUCHERS-Get-Voucher.md). This page allows editing the appearance of the page displayed in readme.io, in particular:
- The Markdown attributes section at the beginning of the file wrapped by `---` describes the page title, type, slug, order, and visibility.
- `[block:html]` section that adds custom styles to the page that hides unnecessary UI elements like Playground language selector or expandable readme object exploration widget. It can be also used to display the "Beta" tag next to the title. 

Reamde.io platform compares the `operationId` endpoint details attribute from the OpenAPI file with the `slug` from Markdown attributes to combine them and display the final version of the API endpoint page.

All API endpoint pages are grouped by sections like `Vouchers`, `Campaigns`, or `Promotions`. Those sections are built by readme.io based on the `tags` endpoint details attribute from the OpenAPI file. The attribute must be used in the `parentDocSlug` attribute of the dummy Markdown file. 


## API Reference - Data Model Pages

Data model pages like [Voucher Object](https://docs.voucherify.io/reference/voucher-object "Voucher object page") describe the schema of the main building blocks used in specific sections. There are two types of data model pages:
1. Using readme.io expandable object exploration widget, like on the [Validation Object page](https://docs.voucherify.io/reference/validation-object "Validation Object Page"),
2. Displaying the schema of the object with all attributes in a table like on the [Voucher Object page](https://docs.voucherify.io/reference/voucher-object).

We believe that presenting object details in a table is more intuitive for developers. Unfortunately, readme.io does not have the feature to display building block objects defined in OpenAPI in a table format, so we have built a custom JS script (`build-update-md-tables-from-openapi`). The script generates Markdown tables automatically from the OpenAPI file and puts them into Markdown files in the `reference-docs` folder, e.g.: https://github.com/voucherifyio/voucherify-openapi/blob/master/docs/reference-docs/VOUCHERS-Voucher-Object.md. Once the Markdown files are created, they are uploaded to readme.io with the readme.io CLI. 

## API Reference - Introduction Pages

Pages from the introduction section, like [Introduction – What is Voucherify API?](https://docs.voucherify.io/reference/introduction-1), are Markdown pages uploaded to readme.io with readme.io CLI. Their content can be found along with other Markdown files inside the [`docs/reference-docs`](https://github.com/voucherifyio/voucherify-openapi/blob/master/docs/reference-docs/).

## Beta Endpoints

To label an API endpoint as a Beta version in readme.io, add the following details in its Markdown file:
- Add `[Beta]` postfix to the page title (`title` markdown attribute)
- Add the following style to the `[block:html]` section within the `<style></style>` tags:

```css
h1::after {\n content: \"BETA\";\n background-color: rgb(237, 117, 71);\n color: rgb(255, 255, 255);\n border-radius: 2rem;padding: 8px 13px 8px;\n white-space: nowrap;font-size:12px;\n}
```

## OpenAPI Files

Note that OpenAPI files slightly differ depending on where we use them.

- [**[production/readOnly-openAPI.json]**](https://github.com/voucherifyio/voucherify-openapi/tree/master/production) - specification version 3.0.1 for all external viewers.
- [**[reference/OpenAPI.json]**](https://github.com/voucherifyio/voucherify-openapi/tree/master/reference) - Specification version 3.0.1 with `"type": "null"` usages.
- **[tmp/referenceToUpload/OpenAPI.json]** - Used for readme.io specification version 3.0.1, but it is marked as 3.1.0 to skip the validation check by readme.io. It uses `"type": "null"`.
- **[tmp/reference/{language}/OpenAPI.json]** - Used to generate an SDK.

If you want to contribute to the OpenAPI file, you MUST do it in the **reference/OpenAPI.json** file, because all other OpenAPI files are generated from this file!

To update the **[production/readOnly-openAPI.json]** file, run the `npm run build-production-openapi`

The **[tmp/referenceToUpload/OpenAPI.json]** file is generated while running the `npm run create-clean-project -- (parameters)` command.

The **[tmp/reference/{language}/OpenAPI.json]** files are generated while running `npm run prepare-open-api-for-sdk -- --language=(language)` command. The available languages are `ruby` and `python`.

## OpenAPI

The [OpenAPI Specification](https://swagger.io/specification/v3/) (OAS) is used to create the Voucherify API documentation.
The Voucherify OpenAPI file is located in the [Voucherify OpenAPI GitHub repository](https://github.com/voucherifyio/voucherify-openapi/blob/master/production/readOnly-openAPI.json "Voucherify OpenAPI read only json file").

We use [Stoplight](https://stoplight.io/ "Stoplight.io") to edit the OpenAPI file as it gives a readable UI that helps to edit the very large json file. Everyone can create a free account on the Stoplight platform.

How to edit the OpenAPI file:
1. Upload `./reference/OpenAPI.json` file to the Stoplight platform.
2. Make changes to the OpenAPI.json file with the Stoplight UI.
3. Export the modified OpenAPI content and update the OpenAPI.json file in the repository.
4. Ensure that the OpenAPI.json file has only expected changes.

> [!WARNING] Each OpenAPI change should be tested by reviewing the documentation on readme.io after the full documentation update process.

### OpenAPIWebhooks File and Event Documentation

The documentation of the events that are used in Voucherify webhooks is generated from an [OpenAPIWebhooks.json file](https://github.com/voucherifyio/voucherify-openapi/tree/master/reference).

If you want to contribute to this documentation, follow the guidelines for the Voucherify OpenAPI documentation.

Tips:
- To add a new event, add it to the `"paths"` resources in the OpenAPIWebhooks.json file. Events use the `POST` method.
- To add a new event category, add an object to the `"tags"` section. Specify the name and description. The name and the description should be the same, starting with the `Events` word.
- If you want to add a page to the Events section, add a Markdown file to the `docs/custom-webhook-sites` folder.
  - Note: these files require a header wrapped with `---` to describe the page title, type, slug, order, and visibility.
- If an event requires an additional description, add a Markdown file to the `docs/webhook-introductions` folder. The file should be named in the following format: `events-{event category tag name}-{event > post > summary > value}`. Example: `events-voucher-enabled.md`.
  - Note: these files do not require a header.

### Naming Convention

When building new models, follow the following name convention: 
- Use the PascalCase.
- If a model is used as a specific API endpoint description (0-level model), follow the pattern: `{Client?}{PathNameResult}{Action}{Differentiator?}{Request|Response}{Body|Query}`, where:
  - (optional) `Client`: Use for all client schemas.
  - `PathNameResult`: `location.pathname` WITHOUT `v1` and `path parameters` written in PascalCase. Examples:
    - `/v1/rewards/{rewardId}/assignments` => `RewardsAssignments`
    - `/v1/rewards/{rewardId}/assignments/{assignmentId}` => `RewardsAssignments`
    - `/v1/rewards/{rewardId}/assignments/{assignmentId}/redemptions` => `RewardsAssignmentsRedemptions`
    - `/client/v1/rewards/{rewardId}/assignments/{assignmentId}/redemptions` => `ClientRewardsAssignmentsRedemptions`
  - `Action`: Either taken from an HTTP method, e.g. `List`, `Get`, `Update`, `Delete`, `Create` or what the endpoint does, e.g. `Track`, `Validate`, `Import`, `Export`
    - `Get`(single record), 
    - `List`(multiple record)
    - `Update`(single record), 
    - `UpdateInBulk` (multiple record), 
    - `Delete`(single record), 
    - `Create`(single record), 
    - `CreateInBulk`(multiple record)
  - (optional) `Differentiator`: Sub-model title when a 0-level model contains only `oneOf`. The title of those models must be like the schema name but in `Title Case` and the description must follow the pattern: `{Response/Request} {Body/Query} schema for **{Method}** {Path} {OPTIONALLY: and **{Method}** {Path}}`. Examples:
    - `Base [PublicationsCreateBaseResponseBody]` (common part of other child models)
    - `Vouchers [PublicationsCreateVouchersResponseBody]`
    - `Voucher [PublicationsCreateVoucherResponseBody]`
  - `Request` or `Response`
  - `Body` or `Query`

Example of a model that needs a `Differentiator`:
```json
"PublicationsCreateResponseBody": {
    "title": "Publications Create Response Body",
    "type": "object",
    "description": "Response body schema for **POST** `v1/publication` and **GET** `v1/publications/create`.",
    "oneOf": [
        {
            "$ref": "#/components/schemas/PublicationsCreateVoucherResponseBody"
        },
        {
            "$ref": "#/components/schemas/PublicationsCreateVouchersResponseBody"
        }
    ]
},
```
- If a model is used by more than one API endpoint (general model), use simple domain language, e.g. `Customer`, `Category`, `Discount`, `DiscountUnit`.
- If a part of a model is used by more than one schema, save this part under a new schema and use it with an `allOf` operator.

**If you see a schema with a wrong name, don't hesitate to correct it!**

### Correct 0-level model example:

- `type` - should be `object` or `array` mostly but in some cases, it could be optional.
- `title` - should be the same as the name of the model.
- `description` - should point to the API endpoint that uses this model e.g. `{type} body schema for **{method}** {path}`.
- `properties / oneOf / allOf` - should contain all attributes that are used in the API endpoint or `$ref` to another schema.

```json
{
  "RedemptionsGetResponseBody": {
    "type": "object",
    "title": "Redemptions Get Response Body",
    "description": "Response body schema for **GET** `v1/redemptions/{redemptionId}`",
    "oneOf": [
      {
        "$ref": "#/components/schemas/Redemption"
      },
      {
        "$ref": "#/components/schemas/RedemptionRollback"
      }
    ]
  }
}
```

For example:
- The general voucher model, used in many different API endpoints, should have the name `Voucher` (currently, it has a name: `Voucher`)
- for path `GET /v1/vouchers` (list vouchers), we have a `1_res_vouchers_GET` 0-level model that should be named `VouchersListResponseBody`.
- for path `GET /v1/vouchers` (list vouchers), we have a `1_res_vouchers_GET` 0-level model which has a sub-model `Voucher_list_vouchers` that should be named `VouchersListResponseBody`.
- General model `Voucher` is used in many paths (`GET /v1/vouchers/{code}`, `POST /v1/vouchers/qualification`, `GET /v1/publications/create`); therefore, it should be renamed to `Voucher`.

> [!NOTE] Most likely, the general model will be the same as used in the GET method. For example, `CategoriesGetResponseBody` is equal by reference to `Category`. This model most likely will not be used in `PUT` requests, because the response in a `PUT` request always returns value in `updated_at`, so you will need to create a duplicated model just for the update response.

### Good practices

Contribute with the following good practices in mind:
- For literal unions, use `enum`,
- For type unions, use `oneOf`,
- For attributes that may contain `null`, add `"nullable": true`,
- If an attribute is always `null`, set `"type": "null"`,
- For dates, use `"type": "string", "format": "date-time"` or `"type": "string", "format": "date"`,
- For the object type `object`, add the `required` attribute which should contain a list of required attributes in the object,
- A `nullable` cannot be next to a `$ref`. Run `npm run fix-schemas-with-refs` to fix it.
- `writeOnly` and `readOnly` flags should not be used, because they cause errors in generating SDKs

## Contribution to Documentation

### Prerequisites

- Install `git`, `nodejs`, and `npm`.
- Clone the repository locally: `git clone https://github.com/voucherifyio/voucherify-openapi`.
- Ensure you have a readme.io account with access to the `Voucherify` project. Ask your line manager for help.
- Install `rdme` tool (readme.io CLI). Follow the [readme.io installation manual](https://github.com/readmeio/rdme#readme).
- Authenticate `rdme` tool by running the `rdme login` command. You can check if it works with the `rdme whoami` command. If correct, you should receive the `You are currently logged in as xxx@voucherify.io to the voucherify project.` response.
- Copy `.env.example` to `.env` and in this file, add your personal API Key created in readme.io: `dashboard` > `configuration` > `API Keys`.

### Images in Markdown Files

There are two ways of adding images to Markdown files:
- With a `[block:image]` component, [see example in Introduction.md](docs/guides/getting_started/Introduction.md),
- With a link declaration, for example `![Welcome Diagram](https://files.readme.io/6070078-welcome-diagram.png "Welcome Diagram")`.

At first, always point to the assets img folder, for example: `![Recent Changes](../../assets/img/guides_getting_started_quickstart_recent_changes_4.png "Recent Changes")`. This path declaration will be automatically updated to a url link during `npm run create-clean-project` command. However, if you don't want to update project data, you can run `npm run readme-upload-missing-images` instead.

### Categories

In order to add a new category, go to `scripts/create-clean-version.ts` and edit following fragment:
```js
const listOfGuideCategories = [
  "Getting started",
  "Development",
  "Building blocks",
  "Campaigns Recipes",
  "Discounts Recipes",
  "Distributions Recipes",
  "More",
];

const listOfReferenceCategories = ["Introduction"];
```

Note that the order of each category title determines the order on the Voucherify documentation page.

In order to change the order of the categories, change the order of category titles in the script fragment presented above.

In order to remove a category, remove its title from the list. Make sure to remove any Markdown files associated with this `categorySl ug` as well.

> [!NOTE] `categorySlug` is created from the category title by converting the title to `kebab-case`/`dash-case` (all lower case). Example: `Campaigns Recipes` -> `campaigns-recipes`.

### Development Process

- For each change / pull request, create your copy of the current documentation, where you can test changes.
	- Create your own branch from `master`.
	- Create a draft pull request.
- Make changes in the repository following the [patterns](#naming-convention) and [good practices](#good-practices).
- Run `npm run create-clean-version -- --vt={your name}-{pull request number}` to create a new project version with your tag number.
    - then follow instructions from the console or add `--ua` or `--uploadAll` option to the script
- If you need to make a change, run `npm run create-clean-version -- --vt={your name}-{pull request number}-{!!!any number!!!}`; note that the underscore `_` symbol in the version name will fail the upload
    - then follow instructions from the console or add `--ua` or `--uploadAll` option to the script
    - on the readme dashboard delete version that is not good.
- If changes are fine, then:
	- Add a note in the changelog.
	- run `git commit; git push`.
	- Publish the pull request.

## How to Merge a Pull Request and Update Public Documentation

- Ensure the changelog was updated.
- Merge the master branch to your branch by running `git merge master`.
- Run `npm run create-clean-version -- --vt={your name}-{pull request number}-master` to ensure the version is up-to-date.
  - then follow instructions from the console or add `--ua` or `--uploadAll` option to the script
- Test for the last time the changes on readme. You can use the version prepared by the contributor.
- Merge the pull request with the `master` branch.
- In readme.io, change the current documentation version from `v2018-08-01` to `v2018-08-01-deprecated-mm-dd-yyyy`.
- Change the name of your new release version from `2018-08-01-{your name}-{pull request number}` to `v2018-08-01`.

> [!NOTE] You can use [GitHub desktop](https://desktop.github.com/) to perform git actions.

> [!NOTE] Readme.io cache pages for 15 minutes, for only logged-out users. If you are logged in, then you will always receive the most recent content.
