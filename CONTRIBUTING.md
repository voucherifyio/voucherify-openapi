# Voucherify's documentation and OpenAPI contribution

## Introduction

Voucherify builds and maintains REST API documentation and SDKs to make it easier for software developers to understand and integrate Voucherify into their e-commerce platforms.

This document describes all deliverables and their development process.

## Deliverables

Voucherify's dev experience is built based on three main items:
- **Guides** documentation that describes key concepts, integration with Voucherify development and common recipes. This documentation is available on the page: https://docs.voucherify.io/docs.
- **API Reference** documentation describing REST API endpoints, including available parameters and responses. This documentation is available on the page: https://docs.voucherify.io/reference/introduction-1
- **SDKs** - clients for all major programming languages, e.g., JavaScript, Java, Ruby, Python, .NET, PHP. SDK's source codes are hosted on the GitHub platform and available for the developers in language-specific package repositories like https://npmjs.com/, https://rubygems.org/ or https://maven.apache.org/


## Guides and API Reference

Guides and API Reference pages are hosted on readme.io, the platform for creating and hosting developer documentation. Still, the source of documentation content is stored in the GitHub repository: https://github.com/voucherifyio/voucherify-openapi. Guides are stored purely as markdown files in the https://github.com/voucherifyio/voucherify-openapi/tree/master/docs/guides folder and can be easily uploaded to the readme.io platform via readme CLI. API Reference pages are built by readme.io, which combines the OpenAPI file that describes Voucherify API endpoints, parameters and responses with markdown files from https://github.com/voucherifyio/voucherify-openapi/tree/master/docs/reference-docs folder.

## API Reference - Endpoint Pages

API Endpoint Pages like https://docs.voucherify.io/reference/get-voucher describe REST API endpoint, including details like path, HTTP method, path params, body params, response schema and response statuses. On the right side of those pages, we have a `Playground Widget` that allows developers to make test API calls. Readme.io builds those pages using information about the REST API from the uploaded OpenAPI file and displays a UI that allows the exploration of all details. For each endpoint page, we have a corresponding dummy markdown file like https://github.com/voucherifyio/voucherify-openapi/blob/master/docs/reference-docs/VOUCHERS-API-Get-Voucher.md that allows us to control visual aspect of the page displayed in the readme, in particular:
- The markdown attributes section at the beginning of the file wrapped by `---` describes the page title, type, slug, order, and visibility.
- `[block:html]` section that adds custom styles to the page that hides unnecessary UI elements like Playground language selector or expandable readme object exploration widget. It also can be used to display the "Beta" tag next to the title. 

Reamde.io platform compares the `operationId` endpoint details attribute from the OpenAPI file with the `slug` from the markdown attributes to combine it and display the final version of the API Endpoint Page.

As you can notice, all API Endpoint pages are grouped by sections like `Vouchers API`, `Campaigns API` or `Promotions API`. Those sections are built by reamde.io based on the `tags` endpoint details attribute from the OpenAPI file and must be repeated in the `parentDocSlug` attribute of the dummy markdown file. 


## API Reference - Data Model Pages


Data model pages like: https://docs.voucherify.io/reference/voucher-object describe the schema of the main building blocks used in specific sections. There are two types of Data Model Pages:
1. using readme.io expandable object exploration widget, like on the page: https://docs.voucherify.io/reference/validation-object
2. displaying schema of the object wit all attributes in a table like on the page: https://docs.voucherify.io/reference/voucher-object

We believe that displaying object details in a table is more intuitive for developers. Unfortunately, readme.io does not have the feature to display building block objects defined in OpenAPI in a table format, so we have built custom JS scripts (`build-md-tables-from-openapi` and `update-md-tables-in-doc`) that generate markdown tables automatically using an OpenAPI file and put them inside the markdown inside the `reference-docs` folder, e.g.:  https://github.com/voucherifyio/voucherify-openapi/blob/master/docs/reference-docs/VOUCHERS-API-Voucher-Object.md. Once we generate the markdown files we can upload them to readme.io using the readme.io CLI. 

## API Reference - Introduction pages

Pages from the introduction section, like https://docs.voucherify.io/reference/introduction-1, are just markdown pages uploaded to readme.io using CLI. Content can be found along with other markdown files inside the `docs/reference-docs` folder, e.g. https://github.com/voucherifyio/voucherify-openapi/blob/master/docs/reference-docs/Introduction.md. 

## Beta endpoints

To label the API endpoint as a beta in readme.io, you should make the following changes in the corresponding markdown file:
- add `[Beta]` postfix in page title (`title` markdown attribute)
- add to `[block:html]` section following style:

```css
h1::after {\n content: \"BETA\";\n background-color: rgb(237, 117, 71);\n color: rgb(255, 255, 255);\n border-radius: 2rem;padding: 8px 13px 8px;\n white-space: nowrap;font-size:12px;\n}
```

## OpenAPI

OpenAPI syntax documentation can be found here: https://swagger.io/specification/.
Voucherify OpenAPI is located here: https://github.com/voucherifyio/voucherify-openapi/blob/master/reference/OpenAPI.json.
We use stoplight to edit the OpenAPI file as it gives a nice UI that helps to edit this 80k+ line of code json file. Everyone can create a free account on the Stoplight platform. 

How to edit OpenAPI file:
1. upload OpenAPI to the Stoplight platform
2. make changes in OpenAPI using Stoplight UI
3. export modified OpenAPI content and update the OpenAPI file in the repository
4. run `npm run remove-stoplight-tags-from-openapi` command to remove from OpenAPI unwanted Stoplight tags `x-stoplight` (that makes it hard to review changes)
5. ensure that OpenAPI has only expected modifications

> [!WARNING] Each OpenAPI change should be tested by reviewing documentation on readme.io after the full documentation update process.

 Building  new models, we should follow the following name convention: 
- Use snake case casing.
- If a model is used as a specific API endpoint description (0-level model), then we follow the pattern: `{resource}_{action}_{request|response}_{body|param|query}`, where:
	  - `resource`: plural name taken from API path, e.g. `vouchers`, `customers`, `products`
	  - `action` : `get`(single record), `list`, `update`, `delete`, `create` (etc.)
-  If a 0-level model has dedicated sub-models, then those model's names should follow the pattern:
  `{resource}_{action}_{differentiator}_{request|response}_{body|param|query}`
  where the  `differentiator` describes the child model, e.g., `publication`.
- If a model is used by more than one API endpoint (general model), we use simple domain language, e.g. `voucher`, `customer`, `product`, `discount`, `discount_unit`

For example:
- The general voucher model, used in many different API endpoints, should have the name `voucher` (currently, it has a name: `1_obj_voucher_object`)
- for path `GET /v1/vouchers` (list vouchers), we have a `1_res_vouchers_GET` 0-level model, that should be named: `vouchers_list_response_body`.
- for path `GET /v1/vouchers` (list vouchers), we have a `1_res_vouchers_GET` 0-level model which has sub-model `1_obj_voucher_object_list_vouchers` that should be named: `vouchers_list_item_response_body`
- General model `1_obj_voucher_object` is used in many paths (`GET /v1/vouchers/{code}`, `POST /v1/vouchers/qualification`, `GET /v1/publications/create`); therefore, we should rename the model to `voucher`.

> [!NOTE] Try to avoid building complex type structures. 0-level models, sub-modules and general modules should be enough to describe the API. Do not be afraid to repeat models for different API endpoints if there are differences.



Good practices:
- for literal unions use `enum`
- for types unions, use `anyOf`,
- for attributes that may contain `null`, add `"nullable": true` 
- for dates use `"type": "string", "format": "date-time"`
- for the object, add the "required" attribute which should contain a list of required attributes in the object

## Contribution to documentation

### Prerequisites

- Install `git`, `nodejs`, and `npm`.
- Clone repository locally: `git clone https://github.com/voucherifyio/voucherify-openapi`.
- Ensure you have the readme.io account with access to the `Voucherify` project (ask your line manager for help).
- Install `rdme` tool (readme.io CLI): follow the installation instructions from https://github.com/readmeio/rdme#readme website.
- Authenticate `rdme` tool by running: `rdme login` command; you can check if it works using the command `rdme whoami`; what should result: `You are currently logged in as xxx@voucherify.io to the voucherify project.`
- Copy `.env.example` to `.env` and add to this file your personal API Key created in readme.io: `dashboard` > `configuration` > `API Keys`

### Development process
- For each change / pull request, create your copy of the current documentation, where you will test changes.
	- Create your own branch from `master`,
	- Create a draft pull request
- Make changes in the repository following patterns and good practices.
- Run `npm run manage-project -- --vt={your name}-{pull request number} --create` - this will create new version project with your tag number.
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

- Test changes on readme (you can use the version prepared by the contributor).
- Ensure the changelog was updated.
- Merge PR to `master` branch
- In readme.io, change the current documentation version from `v2018-08-01` to `v2018-08-01-deprecated-mm-dd-yyyy`
- Change the name of your new release version from `2018-08-01-{your name}-{pull request number}` to `v2018-08-01`

> [!NOTE] Readme.io cache pages for 15 minutes, for only logged out users. If you are logged in, then you will always receive the most recent content.
