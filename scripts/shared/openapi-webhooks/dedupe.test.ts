import fs from "fs";
import path from "path";
import { dropMatchingWebhookCopies } from "./dedupe";
import { schemaNamesReachableFromPaths } from "./reachable-schemas";

const document = () => ({
  openapi: "3.1.0",
  paths: {
    "/widgets": {
      get: {
        responses: {
          "200": {
            description: "ok",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Parent" },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Parent: {
        type: "object",
        description: "API parent",
        properties: {
          child: { $ref: "#/components/schemas/Child" },
        },
      },
      Child: {
        type: "object",
        description: "API child",
        properties: { n: { type: "integer" } },
      },
      Kept: {
        type: "object",
        properties: { flag: { type: "boolean" } },
      },
      Amount: {
        type: "object",
        properties: { amount: { type: "integer" } },
      },
      Holder: {
        type: "object",
        properties: {
          amount: { $ref: "#/components/schemas/Amount" },
        },
      },
      WebhookChild: {
        description: "older child text",
        properties: { n: { type: "integer" } },
        type: "object",
      },
      WebhookParent: {
        type: "object",
        description: "older parent text",
        properties: {
          child: { $ref: "#/components/schemas/WebhookChild" },
        },
      },
      WebhookKept: {
        type: "object",
        properties: { flag: { type: "string" } },
      },
      WebhookAmount: {
        type: "object",
        properties: { amount: { type: "string" } },
      },
      WebhookHolder: {
        type: "object",
        description: "event holder",
        properties: {
          amount: { $ref: "#/components/schemas/WebhookAmount" },
        },
      },
      WebhookSimpleOrderItem: {
        type: "object",
        properties: { sku_id: { type: "string" } },
      },
    },
  },
  webhooks: {
    "EVENTS.WIDGET.NOTED": {
      post: {
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/WebhookHolder" },
            },
          },
        },
      },
    },
  },
});

describe("dropMatchingWebhookCopies", () => {
  it("drops copies that match the API schema and copies replaced by it", () => {
    const { document: next, dropped } = dropMatchingWebhookCopies(document(), [
      "Amount",
    ]);

    expect(dropped).toEqual(["Amount", "Child", "Holder", "Parent"]);
    const schemas = (
      next.components as { schemas: { [name: string]: unknown } }
    ).schemas;
    expect(schemas.WebhookChild).toBeUndefined();
    expect(schemas.WebhookParent).toBeUndefined();
    expect(schemas.WebhookAmount).toBeUndefined();
    expect(schemas.WebhookHolder).toBeUndefined();
    expect(schemas.WebhookKept).toEqual({
      type: "object",
      properties: { flag: { type: "string" } },
    });
    expect(schemas.Child).toEqual({
      type: "object",
      description: "API child",
      properties: { n: { type: "integer" } },
    });
    expect(schemas.Amount).toEqual({
      type: "object",
      properties: { amount: { type: "integer" } },
    });
    expect(
      (
        next.webhooks as {
          [name: string]: {
            post: {
              requestBody: {
                content: { "application/json": { schema: { $ref: string } } };
              };
            };
          };
        }
      )["EVENTS.WIDGET.NOTED"].post.requestBody.content["application/json"]
        .schema.$ref,
    ).toBe("#/components/schemas/Holder");
    expect(Object.keys(schemas)).toEqual([
      "Parent",
      "Child",
      "Kept",
      "Amount",
      "Holder",
      "WebhookKept",
      "WebhookSimpleOrderItem",
    ]);
  });

  it("leaves the input document unchanged", () => {
    const input = document();
    dropMatchingWebhookCopies(input, ["Amount"]);
    expect(input.components.schemas.WebhookAmount).toEqual({
      type: "object",
      properties: { amount: { type: "string" } },
    });
  });

  it("refuses to retarget a schema that an API path can reach", () => {
    const input = document();
    (input.components.schemas as { [name: string]: unknown }).Parent = {
      type: "object",
      properties: {
        amount: { $ref: "#/components/schemas/WebhookAmount" },
      },
    };

    expect(() => dropMatchingWebhookCopies(input, ["Amount"])).toThrow(
      /reachable from paths/,
    );
  });

  it("reference/OpenAPI.json points events at API schemas that match the payload", () => {
    const filePath = path.join(__dirname, "../../../reference/OpenAPI.json");
    const document = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const schemas = document.components.schemas;

    expect(schemas.WebhookLoyaltyPendingPointsDetails).toBeUndefined();
    expect(schemas.WebhookReferralProgram).toBeUndefined();
    expect(schemas.WebhookSimpleOrderItem).toBeUndefined();
    expect(schemas.WebhookSimpleVoucher).toBeUndefined();
    expect(schemas.WebhookDiscountUnitVouchersEffectTypes).toBeUndefined();
    expect(schemas.WebhookCategory).toBeDefined();
    expect(schemas.WebhookAny).toBeDefined();
    expect(schemas.WebhookVoucher).toBeDefined();
    expect(schemas.WebhookOrderCalculated).toBeDefined();
    expect(
      schemas.ReferralProgram.properties.referee_reward.properties.amount.type,
    ).toBe("integer");
    expect(
      schemas.ReferralProgram.properties.referee_reward.properties.type.enum,
    ).toEqual(["LOYALTY_CARD", "GIFT_VOUCHER"]);
    expect(JSON.stringify(schemas.WebhookSimpleCampaign)).toContain(
      '"$ref":"#/components/schemas/ReferralProgram"',
    );
    expect(JSON.stringify(schemas.WebhookSimpleCampaign)).toContain(
      '"$ref":"#/components/schemas/WebhookCategory"',
    );

    const reachable = schemaNamesReachableFromPaths(document);
    expect(reachable.has("ReferralProgram")).toBe(true);
    expect(reachable.has("WebhookReferralProgram")).toBe(false);
    expect(reachable.has("WebhookVoucher")).toBe(false);
    expect(reachable.has("WebhookCategory")).toBe(false);
  });
});
