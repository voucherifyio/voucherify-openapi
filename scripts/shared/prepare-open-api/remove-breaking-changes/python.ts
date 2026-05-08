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
