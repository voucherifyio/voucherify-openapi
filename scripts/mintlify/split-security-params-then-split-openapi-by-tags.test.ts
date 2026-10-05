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
