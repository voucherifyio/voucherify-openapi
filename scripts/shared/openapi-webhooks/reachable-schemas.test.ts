import fs from "fs";
import path from "path";
import { removeNotUsedSchemas } from "../prepare-open-api/remove-not-used-schemas";
import {
  omitWebhooks,
  schemaNamesReachableFromPaths,
} from "./reachable-schemas";

describe("webhook schemas stay out of generated API specs", () => {
  const document = () => ({
    openapi: "3.1.0",
    paths: {
      "/widgets": {
        get: {
          parameters: [{ $ref: "#/components/parameters/Limit" }],
          responses: {
            "200": {
              description: "ok",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Used" },
                },
              },
            },
          },
        },
      },
    },
    webhooks: {
      "EVENTS.WIDGET.CREATED": {
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
    },
    components: {
      parameters: {
        Limit: {
          name: "limit",
          in: "query",
          schema: { $ref: "#/components/schemas/LimitValue" },
        },
      },
      schemas: {
        Used: {
          type: "object",
          properties: {
            limit: { $ref: "#/components/schemas/Nested" },
          },
        },
        Nested: { type: "string" },
        LimitValue: { type: "integer" },
        OnlyWebhook: {
          type: "object",
          properties: {
            payload: { $ref: "#/components/schemas/WebhookOnlyChild" },
          },
        },
        WebhookOnlyChild: { type: "string" },
      },
    },
  });

  it("follows paths and parameter refs, not webhooks", () => {
    expect([...schemaNamesReachableFromPaths(document())].sort()).toEqual([
      "LimitValue",
      "Nested",
      "Used",
    ]);
  });

  it("drops webhook-only schemas when SDK prep keeps schemas used by paths", () => {
    const spec = document();
    const kept = removeNotUsedSchemas(spec.components, spec.paths, {}, {});

    expect(Object.keys(kept).sort()).toEqual(["LimitValue", "Nested", "Used"]);
  });

  it("removes the webhooks key without mutating the input", () => {
    const spec = document();

    const published = omitWebhooks(spec);

    expect(published).not.toHaveProperty("webhooks");
    expect(spec.webhooks).toBeDefined();
    expect(published.components).toBe(spec.components);
    expect(omitWebhooks({ openapi: "3.1.0" })).toEqual({ openapi: "3.1.0" });
  });

  it("leaves reference/OpenAPI.json reachable-schema set finite", () => {
    const filePath = path.join(__dirname, "../../../reference/OpenAPI.json");
    const spec = JSON.parse(fs.readFileSync(filePath, "utf8"));

    const reachable = schemaNamesReachableFromPaths(spec);

    expect(Object.keys(spec.webhooks).length).toBeGreaterThan(100);
    expect(reachable.size).toBeGreaterThan(100);
    expect(reachable.has("EventBusValRuleAssignmentCreatedData")).toBe(false);
  });
});
