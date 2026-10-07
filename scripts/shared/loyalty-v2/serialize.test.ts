import {
  appendLoyaltyV2,
  type OpenApiDocument,
} from "./document";
import { serializeOpenApiDocument } from "./serialize";

const loyalty = (): OpenApiDocument => ({
  openapi: "3.1.0",
  info: { title: "Loyalty", version: "2.0.0" },
  servers: [{ url: "https://example.test" }],
  tags: [{ name: "Programs" }],
  paths: {
    "/v2/loyalties/programs": {
      get: {
        operationId: "list-programs",
        responses: {
          "200": {
            description: 'brace } and "schemas" stay inside the string',
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Program" },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Program: {
        type: "object",
        properties: {
          name: { type: "string" },
        },
      },
    },
    securitySchemes: {
      bearerAuth: { type: "http", scheme: "bearer" },
    },
  },
  security: [{ bearerAuth: [] }],
});

describe("serializeOpenApiDocument", () => {
  const main: OpenApiDocument = {
    openapi: "3.1.0",
    components: {
      schemas: {
        Campaign: {
          type: "object",
          properties: {
            schemas: {
              type: "object",
              properties: {
                VLProgram: {
                  type: "string",
                  description: "nested name collision",
                },
              },
            },
          },
        },
      },
    },
    paths: {
      "/v1/campaigns": {
        get: { operationId: "list-campaigns" },
      },
    },
    webhooks: {
      EXAMPLE: {
        post: {
          requestBody: {
            content: {
              "application/json": {
                schema: { type: "string" },
              },
            },
          },
        },
      },
    },
  };

  it("adds a trailing space only on loyalty lines", () => {
    const appended = appendLoyaltyV2(main, loyalty());
    const plain = JSON.stringify(appended, null, 2);
    const spaced = serializeOpenApiDocument(appended);

    expect(
      spaced
        .split("\n")
        .map((line) => (line.endsWith(" ") ? line.slice(0, -1) : line))
        .join("\n"),
    ).toBe(plain);
    expect(JSON.parse(spaced)).toEqual(appended);
    expect(spaced.split("\n").some((line) => line.endsWith(" "))).toBe(true);
    expect(
      spaced
        .split("\n")
        .find((line) => line.includes('"/v1/campaigns"'))
        ?.endsWith(" "),
    ).toBe(false);
  });

  it("writes the same text on a second pass", () => {
    const appended = appendLoyaltyV2(main, loyalty());
    const once = serializeOpenApiDocument(appended);
    expect(serializeOpenApiDocument(JSON.parse(once))).toBe(once);
  });

  it("leaves a document without loyalty unchanged", () => {
    expect(serializeOpenApiDocument(main)).toBe(JSON.stringify(main, null, 2));
  });
});
