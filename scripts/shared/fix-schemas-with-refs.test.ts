import fs from "fs";
import path from "path";
import { fixOpenApiDocument } from "./fix-schemas-with-refs";

describe("fixSchemasWithRefs", () => {
  it("rewrites a path schema and leaves webhook-only schemas and webhooks alone", () => {
    const webhookSchema = {
      nullable: true,
      $ref: "#/components/schemas/Used",
    };
    const document = {
      openapi: "3.1.0",
      paths: {
        "/widgets": {
          get: {
            responses: {
              "200": {
                content: {
                  "application/json": {
                    schema: {
                      description: "kept",
                      $ref: "#/components/schemas/Used",
                    },
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
                  schema: webhookSchema,
                },
              },
            },
          },
        },
      },
      components: {
        schemas: {
          Used: { type: "string" },
          OnlyWebhook: webhookSchema,
        },
      },
    };

    const fixed = fixOpenApiDocument(document);

    expect(
      fixed.paths["/widgets"].get.responses["200"].content["application/json"]
        .schema,
    ).toEqual({
      description: "kept",
      allOf: [{ $ref: "#/components/schemas/Used" }],
    });
    expect(fixed.components.schemas.OnlyWebhook).toEqual(webhookSchema);
    expect(fixed.webhooks).toEqual(document.webhooks);
    expect(fixed.components.schemas.Used).toEqual({ type: "string" });
  });

  it("does not change reference/OpenAPI.json", () => {
    const filePath = path.join(__dirname, "../../reference/OpenAPI.json");
    const raw = fs.readFileSync(filePath, "utf8");

    expect(JSON.stringify(fixOpenApiDocument(JSON.parse(raw)), null, 2)).toBe(
      raw,
    );
  });
});
