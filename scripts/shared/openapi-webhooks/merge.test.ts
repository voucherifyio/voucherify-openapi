import fs from "fs";
import path from "path";
import { mergeWebhooksIntoOpenApi } from "./merge";

const apiDocument = () => ({
  openapi: "3.1.0",
  info: { title: "API", version: "1" },
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
      Shared: { type: "object" },
      Parent: {
        type: "object",
        properties: {
          shared: { $ref: "#/components/schemas/Shared" },
        },
      },
      EventCustomerCreated: {
        type: "object",
        properties: { customer: { type: "object" } },
      },
    },
  },
});

const webhookDocument = () => ({
  openapi: "3.1.0",
  info: { title: "Events", version: "2024-01-01" },
  webhooks: {
    "EVENTS.WIDGET.CREATED": {
      post: {
        operationId: "events-widget-created",
        tags: ["Events widget"],
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Parent" },
            },
          },
        },
      },
    },
    "EVENTS.WIDGET.NOTED": {
      post: {
        operationId: "events-widget-noted",
        tags: ["Events widget"],
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/OnlyWebhook" },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Shared: { type: "object", description: "webhook copy" },
      Parent: {
        type: "object",
        properties: {
          shared: { $ref: "#/components/schemas/Shared" },
        },
      },
      EventCustomerCreated: {
        type: "object",
        allOf: [{ $ref: "#/components/schemas/Shared" }],
      },
      OnlyWebhook: { type: "string" },
    },
  },
});

describe("mergeWebhooksIntoOpenApi", () => {
  it("renames colliding webhook schemas and keeps the API bodies", () => {
    const api = apiDocument();
    const { document, renames } = mergeWebhooksIntoOpenApi(
      api,
      webhookDocument(),
    );

    expect(api.components.schemas.Parent).toEqual({
      type: "object",
      properties: { shared: { $ref: "#/components/schemas/Shared" } },
    });
    expect(document.components).toMatchObject({
      schemas: {
        Shared: { type: "object" },
        Parent: api.components.schemas.Parent,
        EventCustomerCreated: api.components.schemas.EventCustomerCreated,
        WebhookShared: { type: "object", description: "webhook copy" },
        WebhookParent: {
          type: "object",
          properties: {
            shared: { $ref: "#/components/schemas/WebhookShared" },
          },
        },
        OnlyWebhook: { type: "string" },
      },
    });
    expect(renames).toEqual({
      Shared: "WebhookShared",
      Parent: "WebhookParent",
    });
    expect(document.webhooks).toMatchObject({
      "EVENTS.WIDGET.CREATED": {
        post: {
          requestBody: {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/WebhookParent" },
              },
            },
          },
        },
      },
      "EVENTS.WIDGET.NOTED": {
        post: {
          requestBody: {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/OnlyWebhook" },
              },
            },
          },
        },
      },
    });
    expect(
      (
        document.components as {
          schemas: { EventCustomerCreated: { allOf?: unknown } };
        }
      ).schemas.EventCustomerCreated.allOf,
    ).toBeUndefined();
  });

  it("shares a schema when the webhook copy is the same JSON", () => {
    const webhooks = webhookDocument();
    webhooks.components.schemas.Shared = { type: "object" } as {
      type: string;
      description: string;
    };
    webhooks.components.schemas.Parent = {
      type: "object",
      properties: { shared: { $ref: "#/components/schemas/Shared" } },
    };

    const { document, renames } = mergeWebhooksIntoOpenApi(
      apiDocument(),
      webhooks,
    );

    expect(renames).toEqual({});
    const schemas = (
      document.components as { schemas: Record<string, unknown> }
    ).schemas;
    expect(schemas.WebhookParent).toBeUndefined();
    expect(schemas.WebhookShared).toBeUndefined();
    expect(schemas.OnlyWebhook).toEqual({ type: "string" });
    expect(
      (
        document.webhooks as {
          "EVENTS.WIDGET.CREATED": {
            post: {
              requestBody: {
                content: { "application/json": { schema: { $ref: string } } };
              };
            };
          };
        }
      )["EVENTS.WIDGET.CREATED"].post.requestBody.content["application/json"]
        .schema.$ref,
    ).toBe("#/components/schemas/Parent");
  });

  it("merged reference/OpenAPI.json keeps API event schemas and live webhook names", () => {
    const filePath = path.join(__dirname, "../../../reference/OpenAPI.json");
    const document = JSON.parse(fs.readFileSync(filePath, "utf8"));

    expect(document.openapi).toBe("3.1.0");
    expect(document.webhooks["EVENTS.CUSTOMER.CREATED"].post.operationId).toBe(
      "events-customer-created",
    );
    expect(
      document.webhooks["EVENTS.CUSTOMER.CREATED"].post.requestBody.content[
        "application/json"
      ].schema.$ref,
    ).toBe("#/components/schemas/EventCustomerCreatedData");
    expect(document.components.schemas.EventCustomerCreated.properties).toEqual(
      {
        customer: expect.any(Object),
      },
    );
    expect(
      document.components.schemas.EventCustomerCreated.allOf,
    ).toBeUndefined();
    expect(document.components.schemas.Voucher).toBeDefined();
    expect(document.components.schemas.WebhookVoucher).toBeDefined();
    expect(Object.keys(document.webhooks)).toHaveLength(161);
  });
});
