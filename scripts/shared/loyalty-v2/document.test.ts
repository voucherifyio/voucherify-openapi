import fs from "fs";
import path from "path";
import { applySdkOpenApiVersion } from "../openapi-version/migrate";
import {
  LOYALTY_V2_DOCUMENT_KEY,
  appendLoyaltyV2,
  dedupeLoyaltyV2Schemas,
  documentWithoutLoyaltyV2,
  dropFreeLoyaltyV2Prefixes,
  LOYALTY_V2_TAG_PREFIX,
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

  it("reuses an existing schema when the name ends with the loyalty name", () => {
    const hours = { type: "object", properties: { day: { type: "string" } } };
    const main: OpenApiDocument = {
      openapi: "3.1.0",
      paths: {},
      components: {
        schemas: {
          LoyaltyV2Hours: { ...hours, description: "event" },
          OtherHours: {
            type: "object",
            description: "different role",
            properties: { day: { type: "number" } },
          },
        },
      },
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
                    schema: { $ref: "#/components/schemas/Hours" },
                  },
                },
              },
            },
          },
        },
      },
      components: {
        schemas: {
          Hours: { ...hours, description: "loyalty" },
        },
        securitySchemes: {},
      },
      security: [],
    };
    const deduped = dedupeLoyaltyV2Schemas(
      dropFreeLoyaltyV2Prefixes(appendLoyaltyV2(main, loyalty)),
    );

    expect(deduped.components?.schemas?.Hours).toBeUndefined();
    expect(deduped.components?.schemas?.VLHours).toBeUndefined();
    expect(deduped.components?.schemas?.LoyaltyV2Hours).toMatchObject({
      description: "loyalty",
    });
    expect(deduped.components?.schemas?.OtherHours).toMatchObject({
      description: "different role",
    });
    const extracted = extractLoyaltyV2Document(deduped);
    expect(
      extracted.paths?.["/v2/loyalties/programs"],
    ).toMatchObject({
      get: {
        responses: {
          "200": {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/LoyaltyV2Hours" },
              },
            },
          },
        },
      },
    });
    expect(extracted.components?.schemas?.LoyaltyV2Hours).toBeDefined();
    expect(extracted.components?.schemas?.Hours).toBeUndefined();
  });

  it("drops a security scheme that only Loyalty v2 operations use", () => {
    const document: OpenApiDocument = {
      openapi: "3.1.0",
      tags: [{ name: "Campaigns" }, { name: "LV2-Programs", description: "loyalty" }],
      paths: {
        "/v1/campaigns": {
          get: { security: [{ "X-App-Id": [] }] },
        },
        "/v2/loyalties/programs": {
          get: {
            tags: ["LV2-Programs"],
            security: [{ bearerAuth: [] }],
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
        schemas: { Program: { type: "object" } },
        securitySchemes: {
          "X-App-Id": { type: "apiKey" },
          bearerAuth: { type: "http", scheme: "bearer" },
        },
      },
    };

    const apiOnly = documentWithoutLoyaltyV2(document);

    expect(apiOnly.components?.schemas?.Program).toBeUndefined();
    expect(apiOnly.components?.securitySchemes?.["X-App-Id"]).toBeDefined();
    expect(apiOnly.components?.securitySchemes?.bearerAuth).toBeUndefined();
    expect(apiOnly.tags).toEqual([{ name: "Campaigns" }]);
  });

  it("keeps allowlisted Loyalty v2 paths and drops the rest", () => {
    const published = "/v2/loyalties/programs/{programId}/members";
    const omitted = "/v2/loyalties/programs";
    const document: OpenApiDocument = {
      openapi: "3.1.0",
      tags: [
        { name: "Campaigns" },
        { name: "LV2-Programs", description: "omitted" },
        { name: "LV2-Members", description: "published" },
      ],
      paths: {
        "/v1/campaigns": {
          get: {
            tags: ["Campaigns"],
            responses: {
              "200": {
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/Campaign" },
                        { $ref: "#/components/schemas/Shared" },
                      ],
                    },
                  },
                },
              },
            },
          },
        },
        [omitted]: {
          get: {
            tags: ["LV2-Programs"],
            security: [{ loyaltyOnly: [] }],
            responses: {
              "200": {
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/ProgramOnly" },
                  },
                },
              },
            },
          },
        },
        [published]: {
          post: {
            operationId: "createProgramMember",
            tags: ["LV2-Members"],
            security: [{ bearerAuth: [] }],
            responses: {
              "200": {
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/Member" },
                  },
                },
              },
            },
          },
          get: {
            operationId: "listProgramMembers",
            tags: ["LV2-Members"],
          },
        },
      },
      components: {
        schemas: {
          Campaign: { type: "object" },
          ProgramOnly: { type: "object" },
          Member: { type: "object" },
          Shared: { type: "object" },
        },
        securitySchemes: {
          bearerAuth: { type: "http", scheme: "bearer" },
          loyaltyOnly: { type: "apiKey" },
        },
      },
    };

    const stripped = documentWithoutLoyaltyV2(document);
    expect(stripped.paths?.[published]).toBeUndefined();
    expect(stripped.paths?.[omitted]).toBeUndefined();
    expect(stripped.components?.schemas?.Member).toBeUndefined();
    expect(stripped.components?.schemas?.ProgramOnly).toBeUndefined();
    expect(stripped.components?.schemas?.Campaign).toBeDefined();
    expect(stripped.components?.schemas?.Shared).toBeDefined();

    const publishedDoc = documentWithoutLoyaltyV2(document, {
      keepSdkPublishedPaths: true,
    });
    expect(publishedDoc.paths?.[omitted]).toBeUndefined();
    expect(publishedDoc.paths?.[published]).toMatchObject({
      post: { operationId: "createProgramMember" },
      get: { operationId: "listProgramMembers" },
    });
    expect(publishedDoc.components?.schemas?.ProgramOnly).toBeUndefined();
    expect(publishedDoc.components?.schemas?.Member).toEqual({ type: "object" });
    expect(publishedDoc.components?.schemas?.Shared).toBeDefined();
    expect(publishedDoc.components?.securitySchemes?.bearerAuth).toBeDefined();
    expect(publishedDoc.components?.securitySchemes?.loyaltyOnly).toBeUndefined();
    expect(publishedDoc.tags).toEqual([
      { name: "Campaigns" },
      { name: "LV2-Members", description: "published" },
    ]);
  });

  it("downgrades allowlisted Loyalty v2 paths, including a null-only field", () => {
    const root = path.join(__dirname, "../../..");
    const main = JSON.parse(
      fs.readFileSync(path.join(root, "reference/OpenAPI.json"), "utf8"),
    );
    const kept = documentWithoutLoyaltyV2(main, {
      keepSdkPublishedPaths: true,
    });
    const dryRun =
      kept.components?.schemas
        ?.LoyaltiesProgramsMembersOrdersPaymentsCreateDryRunResponseBody;
    const transaction = (
      dryRun as {
        properties: {
          transaction: {
            properties: {
              card_transaction_id: { type: string };
              updated_at: { type: string };
            };
          };
        };
      }
    ).properties.transaction.properties;

    expect(transaction.card_transaction_id.type).toBe("null");
    expect(transaction.updated_at.type).toBe("null");
    expect(kept.paths?.["/v2/loyalties/programs"]).toBeUndefined();
    expect(
      (
        kept.paths?.["/v2/loyalties/examine/rewards"] as {
          post?: { operationId?: string };
        }
      )?.post?.operationId,
    ).toBe("examineRewards");
    expect(
      (
        kept.paths?.["/v2/loyalties/programs/{programId}/members"] as {
          post?: { operationId?: string };
          get?: { operationId?: string };
        }
      )?.get,
    ).toBeDefined();

    const as301 = applySdkOpenApiVersion(kept, true);
    expect(as301.openapi).toBe("3.0.1");
    expect(as301.paths?.["/v2/loyalties/examine/rewards"]).toBeDefined();
    expect(as301.paths?.["/v2/loyalties/programs"]).toBeUndefined();
  });

  it("keeps Loyalty v2 tags and security on the operations, not in an envelope", () => {
    const root = path.join(__dirname, "../../..");
    const main = JSON.parse(
      fs.readFileSync(path.join(root, "reference/OpenAPI.json"), "utf8"),
    );

    expect(main[LOYALTY_V2_DOCUMENT_KEY]).toBeUndefined();
    expect(main.components.securitySchemes.bearerAuth).toBeDefined();
    for (const [pathName, pathItem] of Object.entries(
      main.paths as Record<
        string,
        Record<string, { tags?: string[]; security?: unknown; operationId?: string }>
      >,
    )) {
      if (!pathName.startsWith("/v2/loyalties")) {
        continue;
      }
      for (const operation of Object.values(pathItem)) {
        if (!operation?.operationId) {
          continue;
        }
        expect(operation.security).toEqual([
          { "X-App-Id": [], "X-App-Token": [] },
          { bearerAuth: [] },
        ]);
        for (const tag of operation.tags ?? []) {
          expect(tag.startsWith(LOYALTY_V2_TAG_PREFIX)).toBe(true);
        }
      }
    }
  });
});
