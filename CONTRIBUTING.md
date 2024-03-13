# Voucherify's documentation and OpenAPI contribution

## Introduction

Voucherify builds and maintains REST API documentation and SDKs to make it easier for software developers to understand and integrate Voucherify into their e-commerce platforms.

This document describes all deliverables and their development process.

## Deliverables

Voucherify's dev experience is built around three main items:
- **Guides** documentation that describes key concepts, integration with Voucherify development and common recipes. This documentation is available on the page: https://docs.voucherify.io/docs.
- **API Reference** documentation describing REST API endpoints, including available parameters and responses. This documentation is available on the page: https://docs.voucherify.io/reference/introduction-1
- **SDKs**: clients for all major programming languages, e.g., JavaScript, Java, Ruby, Python, .NET, PHP. SDK's source codes are hosted on the GitHub platform and available for the developers in language-specific package repositories like https://npmjs.com/, https://rubygems.org/ or https://maven.apache.org/


## Guides and API Reference

Guides and API Reference pages are hosted on [readme.io](https://readme.com/), a platform for creating and hosting developer documentation. However, the source of documentation content is stored in the [Voucherify Open API GitHub repository](https://github.com/voucherifyio/voucherify-openapi).

The guides are stored purely as markdown files in the [guides folder](https://github.com/voucherifyio/voucherify-openapi/tree/master/docs/guides). They can be uploaded to the readme.io platform via readme CLI.

The API reference pages are built by readme.io, which combines the OpenAPI file that describes Voucherify API endpoints, parameters, and responses with markdown files from the [reference folder](https://github.com/voucherifyio/voucherify-openapi/tree/master/docs/reference-docs).

## API Reference - Endpoint Pages

API Endpoint Pages like [GET voucher](https://docs.voucherify.io/reference/get-voucher) describe a REST API endpoint, including details like path, HTTP method, path params, body params, response schema, and response statuses. On the right side of those pages, we have a `Playground Widget` that allows developers to make test API calls. Readme.io builds those pages using information about the REST API from the uploaded OpenAPI file and displays a UI, so users can explore all details. For each endpoint page, we have a corresponding dummy markdown file like [VOUCHERS-Get-Voucher.md](https://github.com/voucherifyio/voucherify-openapi/blob/master/docs/reference-docs/VOUCHERS-Get-Voucher.md) that allows us to control visual aspect of the page displayed in the readme, in particular:
- The markdown attributes section at the beginning of the file wrapped by `---` describes the page title, type, slug, order, and visibility.
- `[block:html]` section that adds custom styles to the page that hides unnecessary UI elements like Playground language selector or expandable readme object exploration widget. It also can be used to display the "Beta" tag next to the title. 

Reamde.io platform compares the `operationId` endpoint details attribute from the OpenAPI file with the `slug` from the markdown attributes to combine it and display the final version of the API Endpoint Page.

As you can notice, all API Endpoint pages are grouped by sections like `Vouchers`, `Campaigns` or `Promotions`. Those sections are built by reamde.io based on the `tags` endpoint details attribute from the OpenAPI file and must be repeated in the `parentDocSlug` attribute of the dummy markdown file. 


## API Reference - Data Model Pages

Data model pages like: https://docs.voucherify.io/reference/voucher-object describe the schema of the main building blocks used in specific sections. There are two types of Data Model Pages:
1. using readme.io expandable object exploration widget, like on the page: https://docs.voucherify.io/reference/validation-object
2. displaying schema of the object wit all attributes in a table like on the page: https://docs.voucherify.io/reference/voucher-object

We believe that displaying object details in a table is more intuitive for developers. Unfortunately, readme.io does not have the feature to display building block objects defined in OpenAPI in a table format, so we have built custom JS script (`build-update-md-tables-from-openapi`) that generate markdown tables automatically using an OpenAPI file and put them inside the markdown inside the `reference-docs` folder, e.g.:  https://github.com/voucherifyio/voucherify-openapi/blob/master/docs/reference-docs/VOUCHERS-Voucher-Object.md. Once we generate the markdown files we can upload them to readme.io using the readme.io CLI. 

## API Reference - Introduction pages

Pages from the introduction section, like https://docs.voucherify.io/reference/introduction-1, are just markdown pages uploaded to readme.io using CLI. Content can be found along with other markdown files inside the `docs/reference-docs` folder, e.g. https://github.com/voucherifyio/voucherify-openapi/blob/master/docs/reference-docs/Introduction.md. 

## Beta endpoints

To label the API endpoint as a beta in readme.io, you should make the following changes in the corresponding markdown file:
- add `[Beta]` postfix in page title (`title` markdown attribute)
- add to `[block:html]` section following style:

```css
h1::after {\n content: \"BETA\";\n background-color: rgb(237, 117, 71);\n color: rgb(255, 255, 255);\n border-radius: 2rem;padding: 8px 13px 8px;\n white-space: nowrap;font-size:12px;\n}
```

## OpenAPI files

Note that openAPI files slightly differ depending on where we use them.

- **[production/readOnly-openAPI.json]** - Spec version 3.0.1 for all external viewers.
- **[reference/OpenAPI.json]** - Spec version 3.0.1 with `"type": "null"` usages.
- **[tmp/referenceToUpload/OpenAPI.json]** - Used for readme.io spec version 3.0.1, but marked as 3.1.0 to skip validation check by readme.io.
  Uses `"type": "null"`.
- **[tmp/reference/{language}/OpenAPI.json]** - Used to generate sdk.

When you want to make a change in openAPI you MUST do it in **[reference/OpenAPI.json]** file, because all other OpenAPI files are generated from this file!

To update **[production/readOnly-openAPI.json]** file run `npm run build-production-openapi` or `npm run manage-project -- (parameters)`

File **[tmp/referenceToUpload/OpenAPI.json]** is generated while running `npm run manage-project -- (parameters)`

Files **[tmp/reference/{language}/OpenAPI.json]** are generated while running `npm run prepare-open-api-for-sdk -- --language=(language)` - available languages are: `ruby` and `python`

## OpenAPI

OpenAPI syntax documentation can be found here: https://swagger.io/specification/v3/.
Voucherify OpenAPI is located here: https://github.com/voucherifyio/voucherify-openapi/blob/master/production/readOnly-openAPI.json.
We use stoplight to edit the OpenAPI file as it gives a nice UI that helps to edit this 80k+ line of code json file. Everyone can create a free account on the Stoplight platform. 

How to edit OpenAPI file:
1. upload `./reference/OpenAPI.json` file to the Stoplight platform
2. make changes in OpenAPI using Stoplight UI
3. export modified OpenAPI content and update the OpenAPI file in the repository
4. ensure that OpenAPI has only expected modifications

> [!WARNING] Each OpenAPI change should be tested by reviewing documentation on readme.io after the full documentation update process.

### Naming convention

Building new models, we should follow the following name convention: 
- Use pascal case casing.
- If a model is used as a specific API endpoint description (0-level model), then we follow the pattern: `{Client?}{PathNameResult}{Action}{Differentiator?}{Request|Response}{Body|Query}`, where:
  - (optional) `Client`: Use for all client schemas.
  - `PathNameResult`: `location.pathname` WITHOUT `v1` and `path parameters` written in PascalCase.
    - `/v1/rewards/{rewardId}/assignments` => `RewardsAssignments`
    - `/v1/rewards/{rewardId}/assignments/{assignmentId}` => `RewardsAssignments`
    - `/v1/rewards/{rewardId}/assignments/{assignmentId}/redemptions` => `RewardsAssignmentsRedemptions`
    - `/client/v1/rewards/{rewardId}/assignments/{assignmentId}/redemptions` => `ClientRewardsAssignmentsRedemptions`
  - `Action`: Either taken from HTTP method, e.g. `List`, `Get`, `Update`, `Delete`, `Create` or what the endpoint does, e.g. `Track`, `Validate`, `Import`, `Export`
    - `Get`(single record), 
    - `List`(multiple record)
    - `Update`(single record), 
    - `UpdateInBulk` (multiple record), 
    - `Delete`(single record), 
    - `Create`(single record), 
    - `CreateInBulk`(multiple record)
  - (optional) `Differentiator`: Sub-model title when 0-level model contains only `oneOf`. Title of those models shall be like schema name but in `Title Case` and description shall follow the pattern: `{Response/Request} {Body/Query} schema for **{Method}** {Path} {OPTIONALLY: and **{Method}** {Path}}`, e.g.:
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
    "description": "Response body schema for **POST** `/publication` and **GET** `/publications/create`.",
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
- If a model is used by more than one API endpoint (general model), we use simple domain language, e.g. `Customer`, `Category`, `Discount`, `DiscountUnit`
- If a portion of a model is used by more than one schema, we can save this portion under a new schema and use it with `allOf` operator:

**If You want schema with wrong name don't hesitate to correct it.**

### Correct 0-level model example:

- `type` - should be `object` or `array` mostly but in some cases could be optional
- `title` - should be the same as the name of the model
- `description` - should point to the API endpoint that uses this model e.g. `{type} body schema for **{method}** {path}`
- `properties / onyOf / allOf` - should contain all attributes that are used in the API endpoint or ref to another schema

```json
{
  "RedemptionsGetResponseBody": {
    "type": "object",
    "title": "Redemptions Get Response Body",
    "description": "Response body schema for **GET** `/redemptions/{redemptionId}`",
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
- for path `GET /v1/vouchers` (list vouchers), we have a `1_res_vouchers_GET` 0-level model, that should be named: `VouchersListResponseBody`.
- for path `GET /v1/vouchers` (list vouchers), we have a `1_res_vouchers_GET` 0-level model which has sub-model `Voucher_list_vouchers` that should be named: `VouchersListResponseBody` 
- General model `Voucher` is used in many paths (`GET /v1/vouchers/{code}`, `POST /v1/vouchers/qualification`, `GET /v1/publications/create`); therefore, we should rename the model to `Voucher`.

> [!NOTE] Most likely general model will be same as used in GET method. For example `CategoriesGetResponseBody` is equal by ref to `Category`. This model most likely will not be used in `PUT` requests because, response in `PUT` request always returns value in `updated_at`, so you will need to create a duplicated model just for update response.

Good practices:
- for literal unions use `enum`
- for types unions, use `oneOf`,
- for attributes that may contain `null`, add `"nullable": true`
- if attribute is always `null`, set type: `null`
- for dates use `"type": "string", "format": "date-time"` or `"type": "string", "format": "date"`
- for the object type `object`, add the `required` attribute which should contain a list of required attributes in the object
- `nullable` cannot be next to the `$ref`. Please run `npm run fix-schemas-with-refs` to fix it.

## Contribution to documentation

### Prerequisites

- Install `git`, `nodejs`, and `npm`.
- Clone repository locally: `git clone https://github.com/voucherifyio/voucherify-openapi`.
- Ensure you have the readme.io account with access to the `Voucherify` project (ask your line manager for help).
- Install `rdme` tool (readme.io CLI): follow the installation instructions from https://github.com/readmeio/rdme#readme website.
- Authenticate `rdme` tool by running: `rdme login` command; you can check if it works using the command `rdme whoami`; what should result: `You are currently logged in as xxx@voucherify.io to the voucherify project.`
- Copy `.env.example` to `.env` and add to this file your personal API Key created in readme.io: `dashboard` > `configuration` > `API Keys`

### Images in .md files

- There are 2 ways to add images to .md files:
  - with `[block:image]` component, [see example in Quickstart.md](docs/guides/getting_started/Quickstart.md)
  - with link declaration, for example `![Welcome Diagram](https://files.readme.io/6070078-welcome-diagram.png "Welcome Diagram")`
- At first always point to assets img folder, for example: `![Recent Changes](../../assets/img/guides_getting_started_quickstart_recent_changes_4.png "Recent Changes")`
- This path declaration will be automatically updated to url link while during `npm run manage-project` command, but if you don't want to update project data, You can run `npm run readme-upload-missing-images` instead.

### Categories

- In order to add new category please go to `scripts/manage-project.ts` and edit following fragment (be informed that the order of each category title is important):
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
- In order to change categories order please change the order of categories titles in the fragment presented above.
- In order to remove category, simply remove the title from the list. Make sure to remove .md files associated with this `categorySlag` as well.

> [!NOTE] `categorySlag` is created from category title by converting title to `kebab-case`/`dash-case` (all lower case). Example: `Campaigns Recipes` -> `campaigns-recipes`

### Development process
- For each change / pull request, create your copy of the current documentation, where you will test changes.
	- Create your own branch from `master`,
	- Create a draft pull request
- Make changes in the repository following patterns and good practices.
- Run `npm run manage-project -- --vt={your name}-{pull request number} --create` - this will create a new version project with your tag number.
  - If the following error occurs:
  ```
  > manage-project
  > ts-node scripts/build-update-md-tables-from-openapi.ts && ts-node ./scripts/manage-project.ts --vt=pw-658 --create

  sh: ts-node: command not found
  ```
  Run `npm i` in the terminal.
- Visit url provided at the end of the script run to test changes using preview on readme.io
- If you need to make a change:
	- Do changes...
	- Run `npm run manage-project -- --vt={your name}-{pull request number} --update`- this will update your version.
	- Test changes using preview on readme.io
    - If needed - **REPEAT** 
- If changes are fine, then:
	- Add a note in the changelog.
	- `git commit; git push`
	- publish PR

## How to merge PR and update public documentation

- Ensure the changelog was updated.
- Merge master branch to your branch by running `git merge master`
- Run `npm run manage-project -- --vt={your name}-{pull request number} --update` to ensure the version is up-to-date.
- Test last time changes on readme (you can use the version prepared by the contributor).
- Merge PR to `master` branch
- In readme.io, change the current documentation version from `v2018-08-01` to `v2018-08-01-deprecated-mm-dd-yyyy`
- Change the name of your new release version from `2018-08-01-{your name}-{pull request number}` to `v2018-08-01`

> [!NOTE] Readme.io cache pages for 15 minutes, for only logged-out users. If you are logged in, then you will always receive the most recent content.
