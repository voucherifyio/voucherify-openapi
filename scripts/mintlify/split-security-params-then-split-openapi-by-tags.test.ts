import fs from "fs";
import os from "os";
import path from "path";
import { splitSecurityParamsThenSplitOpenapiByTags } from "./split-security-params-then-split-openapi-by-tags";

const fixture = () => ({
  openapi: "3.1.0",
  info: { title: "fixture", version: "1", description: "" },
  paths: {
    "/widgets": {
      get: {
        operationId: "listWidgets",
        tags: ["Widgets"],
        responses: {
          "200": {
            description: "ok",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: {
                      type: ["string", "null"],
                      "x-openapi-30-nullable-index": 2,
                    },
                    empty: { type: "null" },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
});

const readWidgets = (dir: string) =>
  JSON.parse(fs.readFileSync(path.join(dir, "widgets.json"), "utf8"));

const propertiesOf = (document: {
  paths: Record<string, any>;
}): { name: unknown; empty: unknown } =>
  document.paths["/widgets"].get.responses["200"].content["application/json"]
    .schema.properties;

describe("Mintlify tag split", () => {
  it("keeps OpenAPI 3.1 null unions and type null in API tag files", async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "mintlify-split-"));

    await splitSecurityParamsThenSplitOpenapiByTags(
      fixture() as never,
      "",
      [],
      {
        outputFolder: dir,
      },
    );

    const document = readWidgets(dir);
    expect(document.openapi).toBe("3.1.0");
    expect(propertiesOf(document)).toEqual({
      name: { type: ["string", "null"] },
      empty: { type: "null" },
    });
    expect(JSON.stringify(document)).not.toContain('"nullable"');
    expect(JSON.stringify(document)).not.toContain(
      "x-openapi-30-nullable-index",
    );
    fs.rmSync(dir, { recursive: true, force: true });
  });

  it("commits documentation/openapi tag files as OpenAPI 3.1.0", () => {
    const filePath = path.join(
      __dirname,
      "../../documentation/openapi/campaigns.json",
    );
    const raw = fs.readFileSync(filePath, "utf8");
    const document = JSON.parse(raw);

    expect(document.openapi).toBe("3.1.0");
    expect(raw).not.toContain('"nullable": true');
  });

  it("merges LV2- tags into loyalties-v2.json and strips the prefix", async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "mintlify-split-"));

    await splitSecurityParamsThenSplitOpenapiByTags(
      {
        openapi: "3.1.0",
        info: { title: "Voucherify API", version: "1", description: "" },
        paths: {
          "/v2/loyalties/programs": {
            get: {
              operationId: "list-loyalty-programs",
              tags: ["LV2-Programs"],
              responses: { "200": { description: "ok" } },
            },
          },
          "/v2/loyalties/rewards": {
            get: {
              operationId: "list-loyalty-rewards",
              tags: ["LV2-Rewards"],
              responses: { "200": { description: "ok" } },
            },
          },
          "/v1/rewards": {
            get: {
              operationId: "list-rewards",
              tags: ["Rewards"],
              responses: { "200": { description: "ok" } },
            },
          },
        },
        "x-loyalty-v2": {
          info: { title: "Voucherify Loyalty v2 API" },
          servers: [],
          tags: [{ name: "Programs" }, { name: "Rewards" }],
          security: [],
          securitySchemes: {},
          schemaNames: [],
        },
      } as never,
      "",
      [],
      { outputFolder: dir },
    );

    expect(fs.existsSync(path.join(dir, "lv2-programs.json"))).toBe(false);
    expect(fs.existsSync(path.join(dir, "lv2-rewards.json"))).toBe(false);
    expect(fs.existsSync(path.join(dir, "programs.json"))).toBe(false);
    const rewards = JSON.parse(
      fs.readFileSync(path.join(dir, "rewards.json"), "utf8"),
    );
    expect(rewards.paths["/v1/rewards"]).toBeDefined();
    expect(rewards.paths["/v2/loyalties/rewards"]).toBeUndefined();
    const loyalty = JSON.parse(
      fs.readFileSync(path.join(dir, "loyalties-v2.json"), "utf8"),
    );
    expect(loyalty.info.title).toBe("Voucherify Loyalty v2 API");
    expect(loyalty.paths["/v2/loyalties/programs"].get.tags).toEqual([
      "Programs",
    ]);
    expect(loyalty.paths["/v2/loyalties/rewards"].get.tags).toEqual([
      "Rewards",
    ]);
    fs.rmSync(dir, { recursive: true, force: true });
  });

  it("commits event files as OpenAPI 3.1.0 without nullable", () => {
    const dir = path.join(__dirname, "../../documentation/openapi-events");
    const files = fs.readdirSync(dir).filter((name) => name.endsWith(".json"));

    expect(files.length).toBeGreaterThan(0);
    for (const name of files) {
      const raw = fs.readFileSync(path.join(dir, name), "utf8");
      const document = JSON.parse(raw);

      expect(document.openapi).toBe("3.1.0");
      expect(raw).not.toContain('"nullable": true');
      expect(raw).toContain('"type": "null"');
    }
  });
});
