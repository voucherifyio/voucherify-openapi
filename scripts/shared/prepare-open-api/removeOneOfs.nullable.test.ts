import { removeAllOneOfs } from "./removeOneOfs";
import * as fs from "fs";

const keepAlive = (schemaName: string) => ({
  "/keep": {
    get: {
      responses: {
        "200": {
          content: {
            "application/json": {
              schema: { $ref: `#/components/schemas/${schemaName}` },
            },
          },
        },
      },
    },
  },
});

describe("removeAllOneOfs nullable and path oneOfs", () => {
  it("flattens $ref | null even when the parent also has a required-only allOf", () => {
    const schemas: any = {
      Foo: { type: "object", properties: { x: { type: "string" } } },
      Wrapper: {
        type: "object",
        properties: {
          custom_event: {
            description: "desc",
            oneOf: [
              { $ref: "#/components/schemas/Foo" },
              { type: "null" },
            ],
          },
        },
        allOf: [{ required: ["custom_event"] }],
      },
    };

    const out = removeAllOneOfs(
      schemas,
      keepAlive("Wrapper"),
      {},
      { name: "ruby" } as any,
    );

    expect(JSON.stringify(out).includes("oneOf")).toBe(false);
    expect(out.Wrapper.properties.custom_event).toEqual({
      description: "desc",
      nullable: true,
      allOf: [{ $ref: "#/components/schemas/Foo" }],
    });
  });

  it("flattens anyOf $ref | null and array | null with sibling description", () => {
    const schemas: any = {
      Member: { type: "object", properties: { id: { type: "string" } } },
      Wrapper: {
        type: "object",
        properties: {
          member: {
            description: "Program member",
            anyOf: [
              { $ref: "#/components/schemas/Member" },
              { type: "null" },
            ],
          },
          loyalty_memberships: {
            description: "Memberships",
            anyOf: [
              {
                type: "array",
                items: { $ref: "#/components/schemas/Member" },
              },
              { type: "null" },
            ],
          },
        },
      },
    };

    const out = removeAllOneOfs(
      schemas,
      keepAlive("Wrapper"),
      {},
      { name: "dotnet" } as any,
    );

    expect(JSON.stringify(out).includes("anyOf")).toBe(false);
    expect(JSON.stringify(out).includes("oneOf")).toBe(false);
    expect(out.Wrapper.properties.member).toEqual({
      description: "Program member",
      nullable: true,
      allOf: [{ $ref: "#/components/schemas/Member" }],
    });
    expect(out.Wrapper.properties.loyalty_memberships).toMatchObject({
      description: "Memberships",
      type: "array",
      nullable: true,
      items: { $ref: "#/components/schemas/Member" },
    });
  });

  it("flattens string | string[] | null order query on paths", () => {
    const schemas: any = {
      Wrapper: { type: "object", properties: {} },
    };
    const paths: any = {
      ...keepAlive("Wrapper"),
      "/v2/loyalties/x": {
        get: {
          parameters: [
            {
              name: "order",
              schema: {
                oneOf: [
                  {
                    type: "array",
                    items: { type: "string", enum: ["id", "-id"] },
                  },
                  { type: "string", enum: ["id", "-id"] },
                  { type: "null" },
                ],
              },
            },
          ],
        },
      },
    };

    removeAllOneOfs(schemas, paths, {}, { name: "ruby" } as any);

    expect(JSON.stringify(paths).includes("oneOf")).toBe(false);
    expect(paths["/v2/loyalties/x"].get.parameters[0].schema).toEqual({
      type: "string",
      nullable: true,
      enum: ["id", "-id"],
    });
  });

  it("flattens the dumped EarningRuleTrigger shape from prepare", () => {
    const dumpedPath = "/tmp/ert-schemas.json";
    if (!fs.existsSync(dumpedPath)) {
      return;
    }
    const dumped = JSON.parse(fs.readFileSync(dumpedPath, "utf8"));
    const out = removeAllOneOfs(
      dumped,
      keepAlive("EarningRuleTrigger"),
      {},
      { name: "ruby" } as any,
    );
    expect(
      JSON.stringify(out.EarningRuleTrigger.properties.custom_event).includes(
        "oneOf",
      ),
    ).toBe(false);
    expect(out.EarningRuleTrigger.properties.custom_event.nullable).toBe(true);
  });
});
