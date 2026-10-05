import fs from "fs";
import path from "path";
import {
  applySdkOpenApiVersion,
  downgradeOpenApi310To301,
  ensureOpenApi301,
  upgradeOpenApi301To310,
} from "./migrate";

const stringify = (value: unknown) => JSON.stringify(value, null, 2);

const baseDocument = () => ({
  openapi: "3.0.1",
  info: { title: "fixture", version: "1" },
  paths: {},
});

describe("OpenAPI 3.0.1 ↔ 3.1.0", () => {
  it("changes only the version when the document has no nullable schemas", () => {
    const document = baseDocument();

    const upgraded = upgradeOpenApi301To310(document);

    expect(upgraded.openapi).toBe("3.1.0");
    expect(downgradeOpenApi310To301(upgraded).openapi).toBe("3.0.1");
    expect(stringify(downgradeOpenApi310To301(upgraded))).toBe(
      stringify(document),
    );
  });

  it("does not mutate the input document", () => {
    const document = {
      ...baseDocument(),
      components: {
        schemas: {
          Id: {
            type: "string",
            nullable: true,
            description: "Identifier",
          },
        },
      },
    };
    const before = stringify(document);

    upgradeOpenApi301To310(document);

    expect(stringify(document)).toBe(before);
  });

  it("turns a typed nullable schema into a null union and restores key order", () => {
    const document = {
      ...baseDocument(),
      components: {
        schemas: {
          CustomerId: {
            type: "string",
            nullable: true,
            description: "Customer",
            example: "cust_1",
          },
        },
      },
    };

    const upgraded = upgradeOpenApi301To310(document);

    expect(upgraded.components.schemas.CustomerId).toEqual({
      type: ["string", "null"],
      description: "Customer",
      example: "cust_1",
    });
    expect(stringify(downgradeOpenApi310To301(upgraded))).toBe(
      stringify(document),
    );
  });

  it.each(["integer", "number", "boolean", "array", "object"])(
    "round-trips nullable %s",
    (type) => {
      const document = {
        ...baseDocument(),
        components: {
          schemas: {
            Value: {
              type,
              nullable: true,
            },
          },
        },
      };

      expect(
        stringify(downgradeOpenApi310To301(upgradeOpenApi301To310(document))),
      ).toBe(stringify(document));
    },
  );

  it("keeps nullable in front of type by encoding null as the first union member", () => {
    const document = {
      ...baseDocument(),
      components: {
        schemas: {
          Flag: {
            nullable: true,
            type: "boolean",
            description: "Flag",
          },
        },
      },
    };

    const upgraded = upgradeOpenApi301To310(document);

    expect(upgraded.components.schemas.Flag.type).toEqual(["null", "boolean"]);
    expect(stringify(downgradeOpenApi310To301(upgraded))).toBe(
      stringify(document),
    );
  });

  it("remembers a nullable key that is not adjacent to type", () => {
    const document = {
      ...baseDocument(),
      components: {
        schemas: {
          Limit: {
            type: "integer",
            description: "Limit",
            nullable: true,
            minimum: 0,
            maximum: 10,
          },
        },
      },
    };

    const upgraded = upgradeOpenApi301To310(document);

    expect(upgraded.components.schemas.Limit).toEqual({
      type: ["integer", "null"],
      description: "Limit",
      minimum: 0,
      maximum: 10,
      "x-openapi-30-nullable-index": 2,
    });
    expect(stringify(downgradeOpenApi310To301(upgraded))).toBe(
      stringify(document),
    );
    expect(stringify(downgradeOpenApi310To301(upgraded))).not.toContain(
      "x-openapi-30-nullable-index",
    );
  });

  it("wraps a nullable composition so null does not have to satisfy allOf", () => {
    const document = {
      ...baseDocument(),
      components: {
        schemas: {
          Order: {
            nullable: true,
            allOf: [{ $ref: "#/components/schemas/OrderBase" }],
          },
        },
      },
    };

    const upgraded = upgradeOpenApi301To310(document);

    expect(upgraded.components.schemas.Order).toEqual({
      anyOf: [
        { allOf: [{ $ref: "#/components/schemas/OrderBase" }] },
        { type: "null" },
      ],
    });
    expect(stringify(downgradeOpenApi310To301(upgraded))).toBe(
      stringify(document),
    );
  });

  it("wraps nullable allOf even when a type keyword is also present", () => {
    const document = {
      ...baseDocument(),
      components: {
        schemas: {
          Wrapped: {
            type: "object",
            nullable: true,
            allOf: [{ $ref: "#/components/schemas/Base" }],
          },
        },
      },
    };

    const upgraded = upgradeOpenApi301To310(document);

    expect(upgraded.components.schemas.Wrapped).toEqual({
      anyOf: [
        {
          type: "object",
          allOf: [{ $ref: "#/components/schemas/Base" }],
        },
        { type: "null" },
      ],
      "x-openapi-30-nullable-index": 1,
    });
    expect(stringify(downgradeOpenApi310To301(upgraded))).toBe(
      stringify(document),
    );
  });

  it("wraps a nullable $ref that has no type of its own", () => {
    const document = {
      ...baseDocument(),
      components: {
        schemas: {
          Rule: {
            nullable: true,
            $ref: "#/components/schemas/ValidationRule",
          },
          Later: {
            $ref: "#/components/schemas/ValidationRule",
            nullable: true,
          },
        },
      },
    };

    const upgraded = upgradeOpenApi301To310(document);

    expect(upgraded.components.schemas.Rule).toEqual({
      anyOf: [
        { $ref: "#/components/schemas/ValidationRule" },
        { type: "null" },
      ],
    });
    expect(upgraded.components.schemas.Later).toEqual({
      anyOf: [
        { $ref: "#/components/schemas/ValidationRule" },
        { type: "null" },
      ],
      "x-openapi-30-nullable-index": 1,
    });
    expect(stringify(downgradeOpenApi310To301(upgraded))).toBe(
      stringify(document),
    );
  });

  it("leaves type null and enum values untouched", () => {
    const document = {
      ...baseDocument(),
      components: {
        schemas: {
          Gift: {
            type: "null",
          },
          Status: {
            type: "string",
            nullable: true,
            enum: ["SUCCEEDED", "FAILED"],
          },
        },
      },
    };

    const upgraded = upgradeOpenApi301To310(document);

    expect(upgraded.components.schemas.Gift).toEqual({ type: "null" });
    expect(upgraded.components.schemas.Status.enum).toEqual([
      "SUCCEEDED",
      "FAILED",
    ]);
    expect(stringify(downgradeOpenApi310To301(upgraded))).toBe(
      stringify(document),
    );
  });

  it("does not walk instance values that happen to contain schema keywords", () => {
    const document = {
      ...baseDocument(),
      components: {
        schemas: {
          Event: {
            type: "object",
            example: {
              nullable: true,
              type: "string",
              exclusiveMinimum: true,
            },
            default: { nullable: true },
            enum: [{ nullable: true, type: "string" }],
          },
        },
      },
    };

    expect(stringify(upgradeOpenApi301To310(document))).toBe(
      stringify({ ...document, openapi: "3.1.0" }),
    );
  });

  it("upgrades nullable schemas nested in properties, items, and parameters", () => {
    const document = {
      ...baseDocument(),
      paths: {
        "/vouchers": {
          get: {
            parameters: [
              {
                name: "code",
                in: "query",
                schema: { type: "string", nullable: true },
              },
            ],
          },
        },
      },
      components: {
        schemas: {
          Box: {
            type: "object",
            properties: {
              tags: {
                type: "array",
                items: { type: "string", nullable: true },
              },
            },
          },
        },
      },
    };

    const upgraded = upgradeOpenApi301To310(document);

    expect(upgraded.paths["/vouchers"].get.parameters[0].schema.type).toEqual([
      "string",
      "null",
    ]);
    expect(upgraded.components.schemas.Box.properties.tags.items.type).toEqual([
      "string",
      "null",
    ]);
    expect(stringify(downgradeOpenApi310To301(upgraded))).toBe(
      stringify(document),
    );
  });

  it("rejects a document that is not 3.0.1 on upgrade and not 3.1.0 on downgrade", () => {
    expect(() =>
      upgradeOpenApi301To310({ ...baseDocument(), openapi: "3.1.0" }),
    ).toThrow(/3\.0\.1/);
    expect(() =>
      downgradeOpenApi310To301({ ...baseDocument(), openapi: "3.0.1" }),
    ).toThrow(/3\.1\.0/);
  });

  it("rejects nullable shapes that cannot be reversed", () => {
    expect(() =>
      upgradeOpenApi301To310({
        ...baseDocument(),
        components: { schemas: { X: { type: "string", nullable: false } } },
      }),
    ).toThrow(/nullable/);

    expect(() =>
      upgradeOpenApi301To310({
        ...baseDocument(),
        components: { schemas: { X: { nullable: true, description: "any" } } },
      }),
    ).toThrow(/type/);

    expect(() =>
      upgradeOpenApi301To310({
        ...baseDocument(),
        components: {
          schemas: { X: { type: ["string", "null"], nullable: true } },
        },
      }),
    ).toThrow(/type/);
  });

  it("downgrades JSON Schema const to a one-value enum", () => {
    const document = {
      openapi: "3.1.0",
      info: { title: "fixture", version: "1" },
      paths: {},
      components: {
        schemas: {
          Marker: {
            type: "string",
            description: "Object type marker.",
            const: "program",
          },
          Hours: {
            if: {
              properties: {
                type: { const: "ANY_TIME" },
              },
            },
          },
          Limit: { const: 1 },
          Flag: { const: false },
          Empty: { const: null },
          Tags: { const: ["a", "b"] },
          Payload: { const: { const: "keep-me", n: 1 } },
        },
      },
    };

    expect(stringify(downgradeOpenApi310To301(document))).toBe(
      stringify({
        openapi: "3.0.1",
        info: { title: "fixture", version: "1" },
        paths: {},
        components: {
          schemas: {
            Marker: {
              type: "string",
              description: "Object type marker.",
              enum: ["program"],
              "x-openapi-31-const": true,
            },
            Hours: {
              if: {
                properties: {
                  type: { enum: ["ANY_TIME"], "x-openapi-31-const": true },
                },
              },
            },
            Limit: { enum: [1], "x-openapi-31-const": true },
            Flag: { enum: [false], "x-openapi-31-const": true },
            Empty: { enum: [null], "x-openapi-31-const": true },
            Tags: { enum: [["a", "b"]], "x-openapi-31-const": true },
            Payload: {
              enum: [{ const: "keep-me", n: 1 }],
              "x-openapi-31-const": true,
            },
          },
        },
      }),
    );
    expect(stringify(document)).toContain('"const": "program"');
    expect(
      stringify(upgradeOpenApi301To310(downgradeOpenApi310To301(document))),
    ).toBe(stringify(document));
  });

  it("does not rewrite const inside example, examples, default, or enum", () => {
    const schema = {
      type: "object",
      example: { const: "program" },
      examples: { sample: { value: { const: "program" } } },
      default: { const: "program" },
      enum: [{ const: "program" }],
    };
    const document = {
      openapi: "3.1.0",
      info: { title: "fixture", version: "1" },
      paths: {},
      components: { schemas: { Sample: schema } },
    };

    expect(downgradeOpenApi310To301(document)).toEqual({
      ...document,
      openapi: "3.0.1",
    });
  });

  it("drops const when enum already allows that value", () => {
    const document = {
      openapi: "3.1.0",
      info: { title: "fixture", version: "1" },
      paths: {},
      components: {
        schemas: {
          Marker: {
            type: "string",
            enum: ["program", "list"],
            const: "program",
          },
          Shape: {
            const: { b: 1, a: 2 },
            enum: [{ a: 2, b: 1 }],
          },
        },
      },
    };

    expect(stringify(downgradeOpenApi310To301(document))).toBe(
      stringify({
        openapi: "3.0.1",
        info: { title: "fixture", version: "1" },
        paths: {},
        components: {
          schemas: {
            Marker: { type: "string", enum: ["program", "list"] },
            Shape: { enum: [{ a: 2, b: 1 }] },
          },
        },
      }),
    );
  });

  it("refuses to downgrade const next to a non-array enum", () => {
    expect(() =>
      downgradeOpenApi310To301({
        openapi: "3.1.0",
        info: { title: "fixture", version: "1" },
        paths: {},
        components: {
          schemas: { Marker: { const: "program", enum: "program" } },
        },
      }),
    ).toThrow(/non-array enum/);
  });

  it("refuses to drop a const that contradicts enum", () => {
    expect(() =>
      downgradeOpenApi310To301({
        openapi: "3.1.0",
        info: { title: "fixture", version: "1" },
        paths: {},
        components: {
          schemas: { Marker: { const: "program", enum: ["list"] } },
        },
      }),
    ).toThrow(/const/);
  });

  it("does not turn a one-value enum into const", () => {
    const document = {
      ...baseDocument(),
      components: {
        schemas: {
          Marker: {
            type: "string",
            description: "Object type marker.",
            enum: ["program"],
          },
        },
      },
    };

    const upgraded = upgradeOpenApi301To310(document);

    expect(upgraded).toEqual({ ...document, openapi: "3.1.0" });
    expect(stringify(downgradeOpenApi310To301(upgraded))).toBe(
      stringify(document),
    );
  });

  it("returns a 3.0.1 document unchanged and downgrades a 3.1.0 document", () => {
    const current = baseDocument();
    const upgraded = upgradeOpenApi301To310({
      ...current,
      components: {
        schemas: { Id: { type: "string", nullable: true } },
      },
    });

    expect(ensureOpenApi301(current)).toBe(current);
    expect(stringify(ensureOpenApi301(upgraded))).toBe(
      stringify(downgradeOpenApi310To301(upgraded)),
    );
  });

  it("downgrades only when an SDK asks for OpenAPI 3.0.1", () => {
    const current = {
      ...baseDocument(),
      components: {
        schemas: { Id: { type: "string", nullable: true } },
      },
    };
    const upgraded = upgradeOpenApi301To310(current);

    expect(applySdkOpenApiVersion(upgraded, false)).toBe(upgraded);
    expect(stringify(applySdkOpenApiVersion(upgraded, true))).toBe(
      stringify(current),
    );
    expect(applySdkOpenApiVersion(current, true)).not.toBe(current);
    expect(stringify(applySdkOpenApiVersion(current, true))).toBe(
      stringify(current),
    );
  });

  it("feeds SDK generators the original 3.0.1 bytes of reference/OpenAPI.json", () => {
    const filePath = path.join(__dirname, "../../../reference/OpenAPI.json");
    const raw = fs.readFileSync(filePath, "utf8");
    const document = JSON.parse(raw);

    if (document.openapi === "3.0.1") {
      expect(stringify(applySdkOpenApiVersion(document, true))).toBe(raw);
      expect(
        stringify(
          applySdkOpenApiVersion(upgradeOpenApi301To310(document), true),
        ),
      ).toBe(raw);
      return;
    }

    expect(document.openapi).toBe("3.1.0");
    const as301 = applySdkOpenApiVersion(document, true);
    expect(as301.openapi).toBe("3.0.1");
    expect(stringify(upgradeOpenApi301To310(as301))).toBe(raw);
  });

  it("round-trips reference/OpenAPI.json to the same JSON bytes", () => {
    const filePath = path.join(__dirname, "../../../reference/OpenAPI.json");
    const raw = fs.readFileSync(filePath, "utf8");
    const document = JSON.parse(raw);

    expect(stringify(document)).toBe(raw);

    if (document.openapi === "3.0.1") {
      const upgraded = upgradeOpenApi301To310(document);
      const downgraded = downgradeOpenApi310To301(
        JSON.parse(stringify(upgraded)),
      );

      expect(upgraded.openapi).toBe("3.1.0");
      expect(stringify(downgraded)).toBe(raw);
      expect(
        stringify(upgradeOpenApi301To310(JSON.parse(stringify(downgraded)))),
      ).toBe(stringify(upgraded));
      expect(stringify(upgraded)).not.toContain('"nullable": true');
      return;
    }

    expect(document.openapi).toBe("3.1.0");
    const downgraded = downgradeOpenApi310To301(document);
    expect(downgraded.openapi).toBe("3.0.1");
    expect(
      stringify(upgradeOpenApi301To310(JSON.parse(stringify(downgraded)))),
    ).toBe(raw);
    expect(raw).not.toContain('"nullable": true');
  });
});
