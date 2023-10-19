# Updating documents

The following sequence of actions should be taken to successfully update the Developer Documentation.

## New Version

> 📘 Important
>
> If you create a new version of documentation in readme, such as by copying an existing version and renaming the version name, readme.io will create new page IDs and new category IDs. This means that some pre-work is needed for a new version of the documentation.

### Pre-work 

This process involves updating all category IDs and slugs in the `.md` files.

An example yaml front matter may look as follows:

```yaml
title: Campaigns
excerpt: 
category: 639ba16d677235008f800454
slug: campaigns
type: basic
hidden: false
order: 6
```

The following key pairs need to be updated:

- `category`
- `slug`

The steps are as follows:
1. Change the slugs in readme by going into the manual editor and clicking each and every document and click on `Edit Metadata` and update the `Page slug`, click `Ok` and click `Save`.
2. Then go to readme's Get Doc API: https://docs.readme.com/main/reference/getdoc
    - `slug`: This is the slug of the document you are retrieving
    - `x-readme-version`: This is the version of the documentation within readme that the document resides

3. In the API response, copy the returned `category`
4. Paste that category into the `.md` yaml front matter of the guide.
5. Repeat the process for the `slug`

By performing these actions, you will be able to use the `rdme docs ./guides --version=2018-08-01`, where the `version` is the new version will successfully sync the given guides into readme.

## Update API Reference

> 📘 Important
>
> Always update the API Reference first.

1. Navigate to `reference` folder on local machine
2. run `rdme openapi OpenAPI.json --id={{}}` | where {{}} is the value of the API Reference ID taken from Readme.io

## Update Markdown Docs - Guides

> 📘 Important
>
> It is important to update these docs if there was a change in the custom css or content of the guide.

1. Navigate to `voucherifyio-voucherify-openapi/docs`
2. run `rdme docs ./guides --version=2018-08-01`

## Update Markdown Docs - Reference

> 📘 Important
>
> It is important to update these docs if there was a change in the custom css or content of the guide.

1. Navigate to `voucherifyio-voucherify-openapi/docs`
2. run `rdme docs ./reference-docs --version=2018-08-01`

## Update Order of Docs

**AUTOMATIC**
1. Go to root folder 
2. *[if you have not already]* Install node modules. `npm install`
3. *[if you have not already]* Copy `docs/script/.env.example` to `docs/script/.env` and fill out the file with credentials.
4. Run `npm run re-order -- -- --version=vXXXXXXXX` from root folder (where vXXXXXXXX is project version).

**MANUALLY:**
Go To Postman and run two collections (make sure to configure authentication and headers as noted below):

1. Update _Guides_: run `Readme-Voucherify-Docs-Guides.postman_collection.json`
2. Update _Reference_: run `Readme-Voucherify-Docs-API-Reference.postman_collection.json`

### Configuration in Postman

Below is the information on how to configure postman.

## Headers
1. `{{x-readme-version}}` is **2018-08-01**

```json
"header": [
    {
        "key": "Content-Type",
        "value": "application/json",
        "type": "text"
    },
    {
        "key": "x-readme-version",
        "value": "{{x-readme-version}}",
        "type": "text"
    }
]
```

## Authentication

- `{{u}}` is API Key from Readme.

```json
"auth": {
    "type": "basic",
    "basic": [
        {
            "key": "username",
            "value": "{{u}}",
            "type": "string"
        }
    ]
}
```
