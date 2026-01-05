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

    return openApi;
  },
  after: (_openApi: unknown): any => {
    let openApi: any = _openApi;
    return openApi;
  },
};

export default removeJsBreakingChanges;
