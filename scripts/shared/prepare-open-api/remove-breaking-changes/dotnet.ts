import * as OpenAPI from "../../../../reference/OpenAPI.json";

const movePropertiesToEnd = (schema: any, propertyNames: string[]) => {
  const properties = schema.properties;
  const propertyNamesSet = new Set(propertyNames);
  const existingProperties = Object.fromEntries(
    Object.entries(properties).filter(([name]) => !propertyNamesSet.has(name)),
  );
  const movedProperties = Object.fromEntries(
    propertyNames
      .filter((name) => name in properties)
      .map((name) => [name, properties[name]]),
  );

  schema.properties = {
    ...existingProperties,
    ...movedProperties,
  };
};

const applicableToQuantityLimitProperties = [
  "product_campaign_quantity_limit",
  "product_campaign_quantity_limit_formula",
  "product_customer_campaign_quantity_limit",
  "product_customer_campaign_quantity_limit_formula",
  "product_in_collection_campaign_quantity_limit",
  "product_in_collection_campaign_quantity_limit_formula",
  "product_in_collection_customer_campaign_quantity_limit",
  "product_in_collection_customer_campaign_quantity_limit_formula",
  "product_promotion_tier_quantity_limit",
  "product_promotion_tier_quantity_limit_formula",
  "product_customer_promotion_tier_quantity_limit",
  "product_customer_promotion_tier_quantity_limit_formula",
  "product_in_collection_promotion_tier_quantity_limit",
  "product_in_collection_promotion_tier_quantity_limit_formula",
  "product_in_collection_customer_promotion_tier_quantity_limit",
  "product_in_collection_customer_promotion_tier_quantity_limit_formula",
];

const removeDotnetBreakingChanges = {
  before: (_openApi: unknown): typeof OpenAPI => {
    const openApi: any = _openApi;

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

    return openApi;
  },
  after: (_openApi: unknown): any => {
    let openApi: any = _openApi;

    // Keep newly added optional properties after the properties available in 9.0.2.
    // C# model constructors follow schema property order, so inserting them in the
    // middle changes how existing positional constructor calls are compiled.
    const schemas = openApi.components.schemas;
    movePropertiesToEnd(
      schemas.ApplicableTo,
      applicableToQuantityLimitProperties,
    );
    movePropertiesToEnd(
      schemas.InapplicableTo,
      applicableToQuantityLimitProperties,
    );
    movePropertiesToEnd(schemas.SegmentsCreateResponseBody, ["updated_at"]);
    movePropertiesToEnd(schemas.SegmentsGetResponseBody, ["updated_at"]);

    return openApi;
  },
};

export default removeDotnetBreakingChanges;
