import * as OpenAPI from "../../../../reference/OpenAPI.json";
import {
  OpenAPISpec,
  removeRequiredFromRequestsAndResponses,
} from "../remove-required-from-request-and-responses";

const removePythonBreakingChanges = {
  before: (_openApi: unknown): typeof OpenAPI => {
    const openApi = _openApi as typeof OpenAPI;

    //Remove required on requestBody:
    for (const [path, methods] of Object.entries(openApi.paths)) {
      for (const [method, value] of Object.entries(methods)) {
        if (method === "post" && value.requestBody) {
          delete value.requestBody.required;
        }
      }
    }

    // Restore faulty type for referee_reward.amount
    openApi.components.schemas.ReferralProgram.properties.referee_reward.properties.amount.type =
      "string";
    // Restore `initial_sync_status`
    openApi.components.schemas.Segment.properties["initial_sync_status"] = {
      type: "string",
      enum: ["IN_PROGRESS", "DONE"],
    };
    // Restore `created_at` to POST `v1/orders/import`
    // @ts-ignore
    openApi.components.schemas.OrdersImportCreateRequestBody.items.allOf[1].properties.created_at =
    {
      type: "string",
      description:
        "Timestamp representing the date and time when the order was created. The value is shown in the ISO 8601 format.",
      format: "date-time",
    };

    openApi.paths["/v1/vouchers"].get.parameters = openApi.paths[
      "/v1/vouchers"
    ].get.parameters.filter((e) => e.name !== "filters");

    // Gemini recommended so
    const schemas = openApi.components.schemas as any;

    // Make ParameterFiltersListMemberTransactions faulty again
    schemas.ParameterFiltersListMemberTransactions.properties = {
      "created_at": {
        "$ref": "#/components/schemas/FilterConditionsDateTime"
      },
      "id": {
        "$ref": "#/components/schemas/FilterConditionsString"
      }
    };

    // Make ExportCampaignTransactionsFilters faulty again
    schemas.ExportCampaignTransactionsFilters.properties = {
      "junction": {
        "$ref": "#/components/schemas/Junction"
      },
      "created_at": {
        "$ref": "#/components/schemas/FilterConditionsDateTime"
      },
      "voucher_id": {
        "$ref": "#/components/schemas/FilterConditionsString"
      }
    };

    // Make ParametersFiltersListCampaignTransactions faulty again
    schemas.ParametersFiltersListCampaignTransactions.properties = {
      "junction": {
        "$ref": "#/components/schemas/Junction"
      },
      "id": {
        "$ref": "#/components/schemas/FilterConditionsString"
      },
      "voucher_id": {
        "$ref": "#/components/schemas/FilterConditionsString"
      }
    };

    // Restore branding cockpits
    schemas.ManagementProjectsBrandingCreateRequestBody.properties = schemas.ManagementProjectsBrandingCreateRequestBody.properties || {};
    schemas.ManagementProjectsBrandingCreateRequestBody.properties.cockpits = {
      "type": "object",
      "title": "Cockpit",
      "description": "Defines customer cockpit details.",
      "properties": {
        "campaigns_overview_enabled": { "type": "boolean", "default": false, "nullable": true, "description": "Enables the campaign overview for customers." },
        "loyalty_enabled": { "type": "boolean", "default": true, "nullable": true, "description": "Enables the loyalty campaign overview for customers." },
        "gift_cards_enabled": { "type": "boolean", "default": true, "nullable": true, "description": "Enables the gift card overview for customers." },
        "coupons_enabled": { "type": "boolean", "default": true, "nullable": true, "description": "Enables the discount coupon overview for customers." },
        "referrals_enabled": { "type": "boolean", "default": true, "nullable": true, "description": "Enables the referral campaign overview for customers." },
        "theme": { "type": "string", "default": "default", "description": "Determines the color scheme of the customer cockpit.", "enum": ["blue", "dark-green", "default", "green", "grey", "orange", "purple", "red"] },
        "use_custom_double_opt_in_redirect_url": { "type": "boolean", "default": false, "nullable": true, "description": "Enables the double opt-in option. It must be a valid URL format." },
        "custom_double_opt_in_redirect_url": { "type": "string", "nullable": true, "description": "Defines the URL for the double opt-in consent. It must be a valid URL format." }
      }
    };

    schemas.ManagementProjectsBranding.properties = schemas.ManagementProjectsBranding.properties || {};
    schemas.ManagementProjectsBranding.properties.cockpits = {
      "type": "object",
      "title": "Cockpit",
      "description": "Defines customer cockpit details.",
      "properties": {
        "campaigns_overview_enabled": { "type": "boolean", "description": "Enables the campaign overview for customers." },
        "loyalty_enabled": { "type": "boolean", "description": "Enables the loyalty campaign overview for customers." },
        "gift_cards_enabled": { "type": "boolean", "description": "Enables the gift card overview for customers." },
        "coupons_enabled": { "type": "boolean", "description": "Enables the discount coupon overview for customers." },
        "referrals_enabled": { "type": "boolean", "description": "Enables the referral campaign overview for customers." },
        "theme": { "type": "string", "description": "Determines the color scheme of the customer cockpit.", "enum": ["blue", "dark-green", "default", "green", "grey", "orange", "purple", "red"] },
        "use_custom_double_opt_in_redirect_url": { "type": "boolean", "description": "Enables the double opt-in option. It must be a valid URL format." },
        "custom_double_opt_in_redirect_url": { "type": "string", "nullable": true, "description": "Defines the URL for the double opt-in consent. It must be a valid URL format." }
      },
      "required": [
        "campaigns_overview_enabled",
        "loyalty_enabled",
        "gift_cards_enabled",
        "coupons_enabled",
        "referrals_enabled",
        "theme",
        "use_custom_double_opt_in_redirect_url",
        "custom_double_opt_in_redirect_url"
      ]
    };

    schemas.ManagementProjectsBrandingUpdateRequestBody.properties = schemas.ManagementProjectsBrandingUpdateRequestBody.properties || {};
    schemas.ManagementProjectsBrandingUpdateRequestBody.properties.cockpits = {
      "type": "object",
      "title": "Cockpit",
      "description": "Defines customer cockpit details.",
      "properties": {
        "campaigns_overview_enabled": { "type": "boolean", "description": "Indicates if the campaign overview is turned on for customers." },
        "loyalty_enabled": { "type": "boolean", "description": "Indicates if the loyalty campaign overview is turned on for customers." },
        "gift_cards_enabled": { "type": "boolean", "description": "Indicates if the gift card overview is turned on for customers." },
        "coupons_enabled": { "type": "boolean", "description": "Indicates if the discount coupon overview is turned on for customers." },
        "referrals_enabled": { "type": "boolean", "description": "Indicates if the referral campaign overview is turned on for customers." },
        "theme": { "type": "string", "description": "Determines the color scheme of the customer cockpit.", "enum": ["orange", "green", "dark-green", "blue", "purple", "red", "grey"] },
        "use_custom_double_opt_in_redirect_url": { "type": "boolean", "description": "Indicates if the double opt-in option is turned on." },
        "custom_double_opt_in_redirect_url": { "type": "string", "nullable": true, "description": "Defines the URL for the double opt-in consent." }
      }
    };

    return openApi;
  },
  after: (_openApi: unknown): any => {
    let openApi: any = _openApi;

    openApi = removeRequiredFromRequestsAndResponses(
      openApi as OpenAPISpec,
    ).spec;

    const addToRequestBodyIn = {
      "/v1/vouchers/{code}": ["put"],
      "/v1/vouchers/{code}/balance": ["post"],
      "/v1/vouchers/import": ["post"],
      "/v1/vouchers/bulk/async": ["post"],
      "/v1/vouchers/metadata/async": ["post"],
    };

    for (const [path, methods] of Object.entries(addToRequestBodyIn)) {
      for (const method of methods) {
        openApi.paths[path][method].requestBody.required = true;
      }
    }

    return openApi;
  },
};

export default removePythonBreakingChanges;
