import * as OpenAPI from "../../../../reference/OpenAPI.json";
import { restoreValidationRuleErrorObjects } from "./utils";

const ID_ORDER_VALUES = ["-id", "id"];

const isIdOrderEnum = (schema: { enum?: string[] } | undefined) =>
  Array.isArray(schema?.enum) &&
  schema.enum.length === ID_ORDER_VALUES.length &&
  ID_ORDER_VALUES.every((value) => schema.enum?.includes(value));

/** string | string[] | null on Loyalty v2 `order` queries. C# emits a duplicate JsonToken.String case for that oneOf. */
const isLoyaltyIdOrderOneOf = (schema: {
  oneOf?: Array<{ type?: string | string[]; items?: { enum?: string[] }; enum?: string[] }>;
}) => {
  const branches = schema?.oneOf;
  if (!Array.isArray(branches) || branches.length !== 3) {
    return false;
  }
  const arrayBranch = branches.find((branch) => branch.type === "array");
  const stringBranch = branches.find((branch) => branch.type === "string");
  const nullBranch = branches.find(
    (branch) => branch.type === "null" || (Array.isArray(branch.type) && branch.type.includes("null") && branch.type.length === 1),
  );
  return Boolean(
    arrayBranch &&
      isIdOrderEnum(arrayBranch.items) &&
      stringBranch &&
      isIdOrderEnum(stringBranch) &&
      nullBranch,
  );
};

const collapseLoyaltyIdOrderParameters = (paths: typeof OpenAPI.paths) => {
  for (const [path, pathItem] of Object.entries(paths)) {
    if (!path.startsWith("/v2/loyalties/") || !pathItem) {
      continue;
    }
    for (const operation of Object.values(pathItem)) {
      if (!operation || typeof operation !== "object" || !("parameters" in operation)) {
        continue;
      }
      const parameters = (operation as { parameters?: Array<{ name?: string; description?: string; schema?: unknown }> }).parameters;
      if (!Array.isArray(parameters)) {
        continue;
      }
      for (const parameter of parameters) {
        if (parameter?.name !== "order" || !parameter.schema || !isLoyaltyIdOrderOneOf(parameter.schema as never)) {
          continue;
        }
        parameter.schema = {
          type: "string",
          nullable: true,
          enum: ID_ORDER_VALUES,
          description: parameter.description,
        };
      }
    }
  }
};

const removeDotnetBreakingChanges = {
  before: (_openApi: unknown): typeof OpenAPI => {
    const openApi = _openApi as typeof OpenAPI;

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
        "campaigns_overview_enabled": {
          "type": "boolean",
          "default": false,
          "nullable": true,
          "description": "Enables the campaign overview for customers."
        },
        "loyalty_enabled": {
          "type": "boolean",
          "default": true,
          "nullable": true,
          "description": "Enables the loyalty campaign overview for customers."
        },
        "gift_cards_enabled": {
          "type": "boolean",
          "default": true,
          "nullable": true,
          "description": "Enables the gift card overview for customers."
        },
        "coupons_enabled": {
          "type": "boolean",
          "default": true,
          "nullable": true,
          "description": "Enables the discount coupon overview for customers."
        },
        "referrals_enabled": {
          "type": "boolean",
          "default": true,
          "nullable": true,
          "description": "Enables the referral campaign overview for customers."
        },
        "theme": {
          "type": "string",
          "default": "default",
          "description": "Determines the color scheme of the customer cockpit.",
          "enum": [
            "blue",
            "dark-green",
            "default",
            "green",
            "grey",
            "orange",
            "purple",
            "red"
          ]
        },
        "use_custom_double_opt_in_redirect_url": {
          "type": "boolean",
          "default": false,
          "nullable": true,
          "description": "Enables the double opt-in option. It must be a valid URL format."
        },
        "custom_double_opt_in_redirect_url": {
          "type": "string",
          "nullable": true,
          "description": "Defines the URL for the double opt-in consent. It must be a valid URL format."
        }
      }
    };

    schemas.ManagementProjectsBranding.properties = schemas.ManagementProjectsBranding.properties || {};

    schemas.ManagementProjectsBranding.properties.cockpits = {
      "type": "object",
      "title": "Cockpit",
      "description": "Defines customer cockpit details.",
      "properties": {
        "campaigns_overview_enabled": {
          "type": "boolean",
          "description": "Enables the campaign overview for customers."
        },
        "loyalty_enabled": {
          "type": "boolean",
          "description": "Enables the loyalty campaign overview for customers."
        },
        "gift_cards_enabled": {
          "type": "boolean",
          "description": "Enables the gift card overview for customers."
        },
        "coupons_enabled": {
          "type": "boolean",
          "description": "Enables the discount coupon overview for customers."
        },
        "referrals_enabled": {
          "type": "boolean",
          "description": "Enables the referral campaign overview for customers."
        },
        "theme": {
          "type": "string",
          "description": "Determines the color scheme of the customer cockpit.",
          "enum": [
            "blue",
            "dark-green",
            "default",
            "green",
            "grey",
            "orange",
            "purple",
            "red"
          ]
        },
        "use_custom_double_opt_in_redirect_url": {
          "type": "boolean",
          "description": "Enables the double opt-in option. It must be a valid URL format."
        },
        "custom_double_opt_in_redirect_url": {
          "type": "string",
          "nullable": true,
          "description": "Defines the URL for the double opt-in consent. It must be a valid URL format."
        }
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
        "campaigns_overview_enabled": {
          "type": "boolean",
          "description": "Indicates if the campaign overview is turned on for customers."
        },
        "loyalty_enabled": {
          "type": "boolean",
          "description": "Indicates if the loyalty campaign overview is turned on for customers."
        },
        "gift_cards_enabled": {
          "type": "boolean",
          "description": "Indicates if the gift card overview is turned on for customers."
        },
        "coupons_enabled": {
          "type": "boolean",
          "description": "Indicates if the discount coupon overview is turned on for customers."
        },
        "referrals_enabled": {
          "type": "boolean",
          "description": "Indicates if the referral campaign overview is turned on for customers."
        },
        "theme": {
          "type": "string",
          "description": "Determines the color scheme of the customer cockpit.",
          "enum": [
            "orange",
            "green",
            "dark-green",
            "blue",
            "purple",
            "red",
            "grey"
          ]
        },
        "use_custom_double_opt_in_redirect_url": {
          "type": "boolean",
          "description": "Indicates if the double opt-in option is turned on."
        },
        "custom_double_opt_in_redirect_url": {
          "type": "string",
          "nullable": true,
          "description": "Defines the URL for the double opt-in consent."
        }
      }
    };

    // Restore `parameters` on SimpleReferralTier
    schemas.SimpleReferralTier.properties.parameters = {
      type: "object",
      description: "Referral tier parameters",
    };

    restoreValidationRuleErrorObjects(schemas);

    // C# oneOf of string and array emits two JsonToken.String cases and does not build.
    // The API rejects an array that orders by both id and -id, so a single string is enough.
    collapseLoyaltyIdOrderParameters(openApi.paths);

    return openApi;
  },
  after: (_openApi: unknown): any => {
    let openApi: any = _openApi;
    return openApi;
  },
};

export default removeDotnetBreakingChanges;
