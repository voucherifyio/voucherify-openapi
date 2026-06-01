import * as OpenAPI from "../../../../reference/OpenAPI.json";

const removeJsBreakingChanges = {
  before: (_openApi: unknown): typeof OpenAPI => {
    const openApi = _openApi as typeof OpenAPI;

    openApi.components.schemas.ReferralProgram.properties.referee_reward.properties.amount.type =
      "number";
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

    return openApi;
  },
  after: (_openApi: unknown): any => {
    let openApi: any = _openApi;
    return openApi;
  },
};

export default removeJsBreakingChanges;
