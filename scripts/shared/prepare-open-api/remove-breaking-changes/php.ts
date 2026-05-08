import * as OpenAPI from "../../../../reference/OpenAPI.json";
import { removeRequiredFromRequestsAndResponses } from "../remove-required-from-request-and-responses";
import { fixOrderCalculated } from "./utils";

const removePhpBreakingChanges = {
  before: (_openApi: unknown): typeof OpenAPI => {
    let openApi = _openApi as typeof OpenAPI;

    //Replace SKUs with skus
    openApi = JSON.parse(JSON.stringify(openApi).replace(/-SKUs/g, "-skus"));

    //Remove required on requestBody:
    for (const [path, methods] of Object.entries(openApi.paths)) {
      for (const [method, value] of Object.entries(methods)) {
        if (method === "post" && value.requestBody) {
          delete value.requestBody.required;
        }
      }
    }

    //Restore validation_rules for creat loyalty campaigns
    openApi.components.schemas.CampaignsCreateLoyaltyCampaign.allOf =
      openApi.components.schemas.CampaignsCreateLoyaltyCampaign.allOf.map(
        (object) => {
          if (object.$ref === "#/components/schemas/CampaignsCreateBase") {
            return {
              $ref: "#/components/schemas/CampaignsCreateBaseValidationRules",
            };
          }
          return object;
        },
      );
    //Fix voucher - to prevent breaking changes
    delete openApi.components.schemas.AsyncActionBase.properties.type.enum;
    delete openApi.components.schemas.AsyncActionBase.properties
      .operation_status.enum;
    //Fix `CustomerActivity`
    delete openApi.components.schemas.CustomerActivity.properties.type.enum;
    delete openApi.components.schemas.CustomerActivity.properties.data
      .properties;
    delete openApi.components.schemas.ParameterCustomerEvent.enum;
    //Fix `MemberActivity`
    delete openApi.components.schemas.MemberActivity.properties.type.enum;
    delete openApi.components.schemas.MemberActivity.properties.data.properties;
    //Do not do breaking change in `ApplicableTo`
    delete openApi.components.schemas.ApplicableTo.properties.target.enum;
    //Delete `enum`s for redeemables in `ValidationEntity`
    delete openApi.components.schemas.ValidationEntity.properties.redeemables
      .items.properties.type.enum;
    delete openApi.components.schemas.ValidationEntity.properties
      .skipped_redeemables.items.properties.type.enum;
    delete openApi.components.schemas.ValidationEntity.properties
      .inapplicable_redeemables.items.properties.type.enum;
    openApi.components.schemas.LoyaltyPointsBucket.properties.expires_at.format =
      "date-time";
    // Remove expand query parameter in GET v1/loyalties
    openApi.paths["/v1/loyalties"].get.parameters = openApi.paths[
      "/v1/loyalties"
    ].get.parameters.filter((parameter) => parameter.name !== "expand");
    //New parameter
    openApi.paths[
      "/v1/loyalties/{campaignId}/members/{memberId}/transactions"
    ].get.parameters = openApi.paths[
      "/v1/loyalties/{campaignId}/members/{memberId}/transactions"
    ].get.parameters.filter((parameter) => parameter.name !== "filters");
    openApi.paths[
      "/v1/loyalties/members/{memberId}/transactions"
    ].get.parameters = openApi.paths[
      "/v1/loyalties/members/{memberId}/transactions"
    ].get.parameters.filter((parameter) => parameter.name !== "filters");
    // Rollback the change of the "page" parameter
    openApi.paths["/v1/customers"].get.parameters = openApi.paths[
      "/v1/customers"
    ].get.parameters.map((parameter) => {
      if (parameter.name === "page") {
        return {
          $ref: "#/components/parameters/page",
        };
      }
      return parameter;
    });
    openApi.paths["/v1/redemptions"].get.parameters = openApi.paths[
      "/v1/redemptions"
    ].get.parameters.map((parameter) => {
      if (parameter.name === "page") {
        return {
          $ref: "#/components/parameters/page",
        };
      }
      return parameter;
    });
    openApi.paths["/v1/vouchers"].get.parameters = openApi.paths[
      "/v1/vouchers"
    ].get.parameters.map((parameter) => {
      if (parameter.name === "page") {
        return {
          $ref: "#/components/parameters/page",
        };
      }
      return parameter;
    });
    //Do not add breaking change on application_details
    openApi.components.schemas.OrderCalculated.properties["items"] = {
      type: "array",
      description:
        "Array of items applied to the order. It can include up 500 items.",
      items: {
        $ref: "#/components/schemas/OrderCalculatedItem",
      },
      nullable: true,
    };
    openApi.components.schemas.OrderCalculatedItem.properties[
      "application_details"
    ] = {
      $ref: "#/components/schemas/ApplicationDetails",
    };
    openApi.components.schemas = Object.fromEntries(
      Object.entries(openApi.components.schemas).map(([key, value]) => {
        if (key.endsWith("Body") || ["RedemptionRollback"].includes(key)) {
          return [key, value];
        }
        return [key, fixOrderCalculated(value)];
      }),
    ) as any;

    openApi.components.schemas.LoyaltyCardTransactionsType.enum =
      openApi.components.schemas.LoyaltyCardTransactionsType.enum.map((v) =>
        v === "PENDING_POINTS_ACTIVATION" ? "POINTS_PENDING_ACTIVATION" : v,
      );
    //Do not add the `access_settings` query param to GET List campaigns
    openApi.paths["/v1/campaigns"].get.parameters = openApi.paths[
      "/v1/campaigns"
    ].get.parameters.filter(
      (parameter) => parameter.name !== "access_settings",
    );
    //Do not add the `type` query param to GET List campaigns by deleting the `type` property in the schema
    delete openApi.components.schemas.ParameterFiltersListCampaigns.properties
      .type;
    // Restore `related_redemptions` to `RedemptionRollback`
    openApi.components.schemas.RedemptionRollback.properties[
      "related_redemptions"
    ] = {
      type: "object",
      properties: {
        rollbacks: {
          type: "array",
          items: {
            title: "Redemption Rollback Related Redemptions Rollbacks Item",
            type: "object",
            properties: {
              id: {
                type: "string",
                example: "rr_0bc92f81a6801f9bca",
                description: "Unique identifier of the redemption rollback.",
              },
              date: {
                type: "string",
                example: "2021-12-22T10:13:06.487Z",
                description:
                  "Timestamp representing the date and time when the object was created. The value is shown in the ISO 8601 format.",
                format: "date-time",
              },
            },
          },
        },
        redemptions: {
          type: "array",
          items: {
            title: "Redemption Rollback Related Redemptions Item",
            type: "object",
            properties: {
              id: {
                type: "string",
                example: "r_0bc92f81a6801f9bca",
                description: "Unique redemption ID.",
              },
              date: {
                type: "string",
                example: "2021-12-22T10:13:06.487Z",
                description:
                  "Timestamp representing the date and time when the object was created. The value is shown in the ISO 8601 format.",
                format: "date-time",
              },
            },
          },
        },
      },
    };
    // Restore loyalty_card in VoucherUpdateLoyaltyCard
    openApi.components.schemas.VoucherUpdateLoyaltyCard.allOf.push({
      // @ts-ignore
      type: "object",
      properties: {
        type: {
          type: "string",
          enum: ["LOYALTY_CARD"],
          description: "Defines the type of the voucher. ",
        },
        loyalty_card: {
          $ref: "#/components/schemas/SimpleLoyaltyCard",
        },
      },
    });
    // Restore gift in VoucherUpdateGift
    openApi.components.schemas.VoucherUpdateGift.allOf.push({
      // @ts-ignore
      type: "object",
      properties: {
        type: {
          type: "string",
          enum: ["GIFT_VOUCHER"],
          description: "Defines the type of the voucher. ",
        },
        gift: {
          $ref: "#/components/schemas/Gift",
        },
      },
    });
    // Delete new query params for GET List campaigns
    delete openApi.components.schemas.ParameterFiltersListCampaigns.properties
      .campaigns;
    delete openApi.components.schemas.ParameterFiltersListCampaigns.properties
      .campaigns_id;
    delete openApi.components.schemas.ParameterFiltersListCampaigns.properties
      .updated_at;
    delete openApi.components.schemas.ParameterFiltersListCampaigns.properties
      .start_date;
    delete openApi.components.schemas.ParameterFiltersListCampaigns.properties
      .created_date;
    delete openApi.components.schemas.ParameterFiltersListCampaigns.properties
      .expiration_date;
    delete openApi.components.schemas.ParameterFiltersListCampaigns.properties
      .validity_day_of_week;
    delete openApi.components.schemas.ParameterFiltersListCampaigns.properties
      .status;
    delete openApi.components.schemas.ParameterFiltersListCampaigns.properties
      .active;
    openApi.paths["/v1/campaigns"].get.parameters = openApi.paths[
      "/v1/campaigns"
    ].get.parameters.filter(
      (parameter) => parameter.name !== "campaign_status",
    );
    openApi.paths["/v1/campaigns"].get.parameters = openApi.paths[
      "/v1/campaigns"
    ].get.parameters.filter(
      (parameter) => parameter.name !== "is_referral_code",
    );
    // Restore previous voucher_type filter
    openApi.components.schemas.ParameterFiltersListCampaigns.properties.voucher_type =
      {
        type: "object",
        description: "Filter by voucher type",
        properties: {
          conditions: {
            // @ts-ignore
            $ref: "#/components/schemas/FilterConditionsString",
          },
        },
      };
    // Restore previous is_referral_code filter
    openApi.components.schemas.ParameterFiltersListCampaigns.properties.is_referral_code.properties =
      {
        // @ts-ignore
        $is: {
          type: "string",
          description: "Value is exactly this value (single value).",
          enum: ["TRUE", "FALSE"],
        },
        $is_not: {
          type: "string",
          description: "Results omit this value (single value).",
          enum: ["TRUE", "FALSE"],
        },
      };
    // Remove new conditions – $contains, $not_contain from FilterConditionsString
    delete openApi.components.schemas.FilterConditionsString.properties
      .$contains;
    delete openApi.components.schemas.FilterConditionsString.properties
      .$not_contain;
    // Restore `strict`
    // @ts-ignore
    openApi.components.schemas.ApplicableTo.properties.strict = {
      type: "boolean",
    };

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

    return openApi;
  },
  after: (_openApi: unknown): any => {
    let openApi: any = _openApi;

    [
      "ClientQualificationsCheckEligibilityResponseBody",
      "ClientRedemptionsRedeemResponseBody",
      "ClientValidationsValidateResponseBody",
      "QualificationsCheckEligibilityResponseBody",
      "RedemptionRollback",
      "RedemptionsRollbackCreateResponseBody",
      "RedemptionsRollbacksCreateResponseBody",
      "ValidationsValidateResponseBody",
      "RedemptionsRedeemResponseBody",
    ].forEach((key) => {
      openApi.components.schemas[key].properties.order = {
        $ref: "#/components/schemas/OrderCalculated",
      };
    });
    openApi.components.schemas.OrdersListResponseBody.properties.orders.items =
      {
        $ref: "#/components/schemas/OrderCalculated",
      };
    openApi.components.schemas.LoyaltiesMembersPointsExpirationListResponseBody.properties.data.items =
      openApi.components.schemas.LoyaltyPointsBucket;
    openApi.components.schemas.LoyaltyCardTransaction.properties.details.properties.balance =
      openApi.components.schemas.VoucherBalance;
    openApi.components.schemas.VoucherTransaction.properties.details.properties.balance =
      openApi.components.schemas.VoucherBalance;

    openApi = removeRequiredFromRequestsAndResponses(openApi).spec;

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

export default removePhpBreakingChanges;
