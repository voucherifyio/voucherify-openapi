import fs from "fs";
import path from "path";
import { fixOpenApiDocument } from "./fix-schemas-with-refs";
import { serializeOpenApiDocument } from "./loyalty-v2/serialize";

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

  it("leaves a description next to a Loyalty v2 $ref", () => {
    const schema = {
      description: "kept next to the ref",
      $ref: "#/components/schemas/VLHours",
    };
    const document = {
      paths: {
        "/v2/loyalties/programs": {
          get: {
            responses: {
              "200": {
                content: {
                  "application/json": { schema },
                },
              },
            },
          },
        },
      },
      components: {
        schemas: {
          VLHours: schema,
        },
      },
    };

    const fixed = fixOpenApiDocument(document);

    expect(fixed.paths["/v2/loyalties/programs"].get.responses["200"].content["application/json"].schema).toEqual(schema);
    expect(fixed.components.schemas.VLHours).toEqual(schema);
  });

  it("serializes reference/OpenAPI.json without trailing spaces", () => {
    const filePath = path.join(__dirname, "../../reference/OpenAPI.json");
    const raw = fs.readFileSync(filePath, "utf8");

    expect(serializeOpenApiDocument(fixOpenApiDocument(JSON.parse(raw)))).toBe(
      raw.replace(/[ \t]+$/gm, ""),
    );
  });
});
