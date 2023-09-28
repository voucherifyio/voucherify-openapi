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
> [!TODO] where syntax documentation, where is located in repo, how make changes (stoplight?), naming convention, types sctructure, good practices


## Contribution to documentation

> [!TODO] 


### Prerequisites

- Instal `git`, `nodejs`, and `npm`.
- Clone repository locally: `git clone https://github.com/voucherifyio/voucherify-openapi`.
- Ensure you have the readme.io account with access to the `Voucherify` project (ask your line manager for help).
- Instal `rdme` tool (readme.io CLI): follow the installation instructions from https://github.com/readmeio/rdme#readme website.
- Authenticate `rdme` tool by running: `rdme login` command; you can check if it works using the command `rdme whoami`; what should result: `You are currently logged in as xxx@voucherify.io to the voucherify project.`

### Development process
- For each change / pull request, create your copy of the current documentation, where you will test changes.
	- Create your own branch from `master`,
	- Create a draft pull request,
	- Go to `Manage Versions` page in readme.io
	- Click `Add New Version` from top right corner.
	- Select the current public version  in `Fork from` field, most likely `2018-08-01`
	- Type your version name in `Create version` field  following the pattern:
	   `2018-08-01-{your name}-{pull request number}`
- Make changes in the repository following patterns and good practices
- Deploy changes to test your documentation:
	- Update tables in markdown tables:
		- `npm run build-md-tables-from-openapi`
		- `npm run update-md-tables-in-doc`
	- Deploy OpenAPI file by command `rdme openapi OpenAPI.json --id=<<VERSION_ID>>`, where `<<VERSION_ID>>` should be replaced by the OpenAPI ID that can be found on the `API Reference` page (looks screenshot)
	- Deploy guides pages: `rdme docs ./docs/reference-docs --version=2018-08-01-{your name}-{pull request number}`
	- Deploy api reference pages: `rdme docs ./docs/reference-docs --version=2018-08-01-{your name}-{pull request number}`
	- Fix docs order: `npm run readme-fix-docs-order -- --version=v2018-08-01-{your name}-{pull request number}`
- test changes using preview on readme.io
- if changes are fine, then:
	- Add a note in the changelog.
	- `git commit`
	- `git push`
	- publish PR
