import fs from "fs";
import path from "path";
import {
  LOYALTY_V2_DOCUMENT_KEY,
  appendLoyaltyV2,
  documentWithoutLoyaltyV2,
  dropFreeLoyaltyV2Prefixes,
  extractLoyaltyV2Document,
  omitLoyaltyV2Document,
  type OpenApiDocument,
} from "./document";

const loyaltyFixture = (): OpenApiDocument => ({
  openapi: "3.1.0",
  info: { title: "Loyalty", version: "2.0.0" },
  servers: [{ url: "https://example.test" }],
  tags: [{ name: "Programs", description: "programs" }],
  paths: {
    "/v2/loyalties/programs": {
      get: {
        operationId: "list-programs",
        tags: ["Programs"],
        responses: {
          "200": {
            description: "ok",
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
          hours: {
            description: "kept next to the ref",
            $ref: "#/components/schemas/Hours",
          },
        },
      },
      Hours: { type: "object" },
      Unused: { type: "string" },
    },
    securitySchemes: {
      bearerAuth: { type: "http", scheme: "bearer" },
      "X-App-Id": { type: "apiKey", name: "X-App-Id", in: "header" },
    },
  },
  security: [{ "X-App-Id": [], "X-App-Token": [] }],
});

describe("Loyalty v2 document", () => {
  it("stores schemas with a VL prefix and extracts the original document", () => {
    const main: OpenApiDocument = {
      openapi: "3.1.0",
      info: { title: "API" },
      paths: { "/v1/campaigns": { get: { operationId: "list-campaigns" } } },
      components: { schemas: { Campaign: { type: "object" } } },
    };
    const loyalty = loyaltyFixture();
    const appended = appendLoyaltyV2(main, loyalty);

    expect(appended.components?.schemas?.Campaign).toEqual({ type: "object" });
    expect(appended.components?.schemas?.VLProgram).toMatchObject({
      properties: {
        hours: {
          description: "kept next to the ref",
          $ref: "#/components/schemas/VLHours",
        },
      },
    });
    expect(appended.components?.schemas?.BadRequest).toBeUndefined();
    expect(appended.components?.securitySchemes).toBeUndefined();
    expect(appended.paths?.["/v1/campaigns"]).toBeDefined();
    expect(
      appended.paths?.["/v2/loyalties/programs"],
    ).toBeDefined();
    expect(omitLoyaltyV2Document(appended)[LOYALTY_V2_DOCUMENT_KEY]).toBeUndefined();
    expect(JSON.stringify(extractLoyaltyV2Document(appended))).toBe(
      JSON.stringify(loyalty),
    );
    expect(() => appendLoyaltyV2(appended, loyalty)).toThrow(
      "Loyalty v2 is already appended",
    );

    const apiOnly = documentWithoutLoyaltyV2(appended);
    expect(apiOnly.paths?.["/v2/loyalties/programs"]).toBeUndefined();
    expect(apiOnly.components?.schemas?.VLProgram).toBeUndefined();
    expect(apiOnly.components?.schemas?.Campaign).toEqual({ type: "object" });
    expect(apiOnly[LOYALTY_V2_DOCUMENT_KEY]).toBeUndefined();
  });

  it("drops a free VL prefix and keeps a name that already exists", () => {
    const main: OpenApiDocument = {
      openapi: "3.1.0",
      paths: {},
      components: { schemas: { BadRequest: { type: "object", description: "api" } } },
    };
    const loyalty: OpenApiDocument = {
      openapi: "3.1.0",
      info: { title: "Loyalty" },
      servers: [],
      tags: [],
      paths: {
        "/v2/loyalties/programs": {
          get: {
            responses: {
              "200": {
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
              error: { $ref: "#/components/schemas/BadRequest" },
            },
          },
          BadRequest: { type: "object", description: "loyalty" },
        },
        securitySchemes: {},
      },
      security: [],
    };
    const dropped = dropFreeLoyaltyV2Prefixes(appendLoyaltyV2(main, loyalty));

    expect(dropped.components?.schemas?.VLProgram).toBeUndefined();
    expect(dropped.components?.schemas?.Program).toMatchObject({
      properties: { error: { $ref: "#/components/schemas/VLBadRequest" } },
    });
    expect(dropped.components?.schemas?.BadRequest).toEqual({
      type: "object",
      description: "api",
    });
    expect(dropped.components?.schemas?.VLBadRequest).toEqual({
      type: "object",
      description: "loyalty",
    });
    expect(JSON.stringify(extractLoyaltyV2Document(dropped))).toBe(
      JSON.stringify(loyalty),
    );
  });

  it("rebuilds documentation/openapi/loyalties-v2.json from reference/OpenAPI.json", () => {
    const root = path.join(__dirname, "../../..");
    const main = JSON.parse(
      fs.readFileSync(path.join(root, "reference/OpenAPI.json"), "utf8"),
    );
    const loyaltyPath = path.join(root, "documentation/openapi/loyalties-v2.json");
    const loyalty = fs.readFileSync(loyaltyPath, "utf8");

    expect(main[LOYALTY_V2_DOCUMENT_KEY]).toBeDefined();
    expect(JSON.stringify(extractLoyaltyV2Document(main), null, 2)).toBe(loyalty);
  });
});
