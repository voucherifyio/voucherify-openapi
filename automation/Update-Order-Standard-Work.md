# Updating documents

The following sequence of actions should be taken to successfully update the Developer Documentation.

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
