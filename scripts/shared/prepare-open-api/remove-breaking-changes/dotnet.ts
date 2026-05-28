import * as OpenAPI from "../../../../reference/OpenAPI.json";

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

    return openApi;
  },
  after: (_openApi: unknown): any => {
    let openApi: any = _openApi;
    return openApi;
  },
};

export default removeDotnetBreakingChanges;
