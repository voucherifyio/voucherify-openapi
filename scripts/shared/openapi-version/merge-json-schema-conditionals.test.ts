import fs from "fs";
import path from "path";
import { documentWithoutLoyaltyV2 } from "../loyalty-v2/document";
import { downgradeOpenApi310To301 } from "./migrate";
import {
  FIELD_COMBINATIONS_NOTE,
  mergeJsonSchemaConditionals,
} from "./merge-json-schema-conditionals";

const stringify = (value: unknown) => JSON.stringify(value);

const INSTANCE_KEYS = new Set([
  "example",
  "examples",
  "default",
  "enum",
  "const",
]);
const CONDITIONAL_KEYS = ["if", "then", "else", "not"] as const;

const memberRule: { [key: string]: any } = {
  type: "object",
  properties: {
    customer_identification: {
      type: "object",
      required: ["type"],
      properties: {
        type: {
          type: "string",
          enum: ["member_id", "email", "phone"],
        },
      },
    },
    member: {
      type: "object",
      properties: {
        id: { type: "string" },
      },
    },
  },
  required: ["customer_identification"],
  allOf: [
    {
      if: {
        not: {
          required: ["customer_identification"],
          properties: {
            customer_identification: {
              required: ["type"],
              properties: {
                type: { const: "member_id" },
              },
            },
          },
        },
      },
      then: {
        not: {
          required: ["member"],
        },
      },
    },
  ],
};

function keywordCounts(value: unknown, inInstance = false) {
  const counts: Record<string, number> = {};
  const visit = (node: unknown, inside: boolean) => {
    if (Array.isArray(node)) {
      node.forEach((item) => visit(item, inside));
      return;
    }
    if (!node || typeof node !== "object") {
      return;
    }
    for (const [key, child] of Object.entries(
      node as Record<string, unknown>,
    )) {
      if (!inside && (CONDITIONAL_KEYS as readonly string[]).includes(key)) {
        counts[key] = (counts[key] ?? 0) + 1;
      }
      if (!inside && key === "const") {
        counts.const = (counts.const ?? 0) + 1;
      }
      visit(child, inside || INSTANCE_KEYS.has(key));
    }
  };
  visit(value, inInstance);
  return counts;
}

function isPureConditional(value: unknown): boolean {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }
  const keys = Object.keys(value);
  return (
    keys.length > 0 &&
    keys.every((key) => (CONDITIONAL_KEYS as readonly string[]).includes(key))
  );
}

function assertParentShape(original: unknown, merged: unknown) {
  if (Array.isArray(original)) {
    expect(Array.isArray(merged)).toBe(true);
    expect((merged as unknown[]).length).toBe(original.length);
    original.forEach((item, index) =>
      assertParentShape(item, (merged as unknown[])[index]),
    );
    return;
  }
  if (!original || typeof original !== "object") {
    return;
  }
  const source = original as Record<string, unknown>;
  const result = merged as Record<string, unknown>;
  if (
    source.properties &&
    typeof source.properties === "object" &&
    !Array.isArray(source.properties)
  ) {
    expect(Object.keys(result.properties as object)).toEqual(
      Object.keys(source.properties as object),
    );
  }
  if (Array.isArray(source.required)) {
    expect(result.required).toEqual(source.required);
  }
  for (const [key, child] of Object.entries(source)) {
    if (INSTANCE_KEYS.has(key)) {
      expect(result[key]).toEqual(child);
      continue;
    }
    if (key === "allOf" && Array.isArray(child)) {
      const kept = child.filter((item) => !isPureConditional(item));
      if (kept.length === 0) {
        expect(result.allOf).toBeUndefined();
      } else {
        expect(result.allOf).toHaveLength(kept.length);
        kept.forEach((item, index) =>
          assertParentShape(item, (result.allOf as unknown[])[index]),
        );
      }
      continue;
    }
    if (child && typeof child === "object") {
      assertParentShape(child, result[key]);
    }
  }
}

describe("merge JSON Schema conditionals for OpenAPI 3.0.1", () => {
  it("returns the same reference when the document has no conditional keywords", () => {
    const schema: { [key: string]: any } = {
      type: "string",
      enum: ["member_id", "email"],
    };

    expect(mergeJsonSchemaConditionals(schema)).toBe(schema);
  });

  it("does not mutate the input", () => {
    const schema = structuredClone(memberRule);
    const before = stringify(schema);

    mergeJsonSchemaConditionals(schema);

    expect(stringify(schema)).toBe(before);
  });

  it("keeps member and records that it is allowed only for member_id", () => {
    const merged = mergeJsonSchemaConditionals(structuredClone(memberRule));

    expect(merged.allOf).toBeUndefined();
    expect(merged.required).toEqual(["customer_identification"]);
    expect(
      merged.properties.customer_identification.properties.type.enum,
    ).toEqual(["member_id", "email", "phone"]);
    expect(merged.properties.member).toMatchObject({
      type: "object",
      properties: { id: { type: "string" } },
      description:
        "`member` is allowed only when `customer_identification.type` is `member_id`. The API validates this.",
    });
    expect(merged.description).toBe(FIELD_COMBINATIONS_NOTE);
    expect(keywordCounts(merged)).toEqual({});
  });

  it("reads a downgraded one-value enum as the same member_id rule", () => {
    const downgraded = structuredClone(memberRule) as typeof memberRule;
    const typeSchema = downgraded.allOf[0].if.not.properties
      .customer_identification.properties.type as {
      const?: string;
      enum?: string[];
      "x-openapi-31-const"?: boolean;
    };
    delete typeSchema.const;
    typeSchema.enum = ["member_id"];
    typeSchema["x-openapi-31-const"] = true;

    const merged = mergeJsonSchemaConditionals(downgraded);

    expect(merged.properties.member.description).toBe(
      "`member` is allowed only when `customer_identification.type` is `member_id`. The API validates this.",
    );
  });

  it("does not repeat a rule the property description already states", () => {
    const schema = structuredClone(memberRule);
    schema.properties.member = {
      ...schema.properties.member,
      description:
        "Send it only when `customer_identification.type` is `member_id`.",
    };

    const merged = mergeJsonSchemaConditionals(schema);

    expect(merged.properties.member.description).toBe(
      "Send it only when `customer_identification.type` is `member_id`.",
    );
    expect(merged.description).toBe(FIELD_COMBINATIONS_NOTE);
  });

  it("omits a property when the branch matches a const, without promoting required", () => {
    const schema: { [key: string]: any } = {
      type: "object",
      description: "Stock.",
      properties: {
        type: { type: "string", enum: ["UNLIMITED", "LIMITED"] },
        limited: { type: "object" },
      },
      required: ["type"],
      allOf: [
        {
          if: { properties: { type: { const: "UNLIMITED" } } },
          then: { not: { required: ["limited"] } },
        },
        {
          if: { properties: { type: { const: "LIMITED" } } },
          then: {
            required: ["limited"],
            properties: { limited: { $ref: "#/components/schemas/Limited" } },
          },
        },
      ],
    };

    const merged = mergeJsonSchemaConditionals(schema);

    expect(merged.required).toEqual(["type"]);
    expect(merged.properties.limited).toEqual({
      type: "object",
      description:
        "`limited` must be omitted when `type` is `UNLIMITED`. The API validates this.",
    });
    expect(merged.description).toBe(`Stock. ${FIELD_COMBINATIONS_NOTE}`);
    expect(merged.allOf).toBeUndefined();
  });

  it("leaves a branch-only property and a branch required array off the parent", () => {
    const schema: { [key: string]: any } = {
      type: "object",
      properties: {
        value: { type: "integer", minimum: 1 },
      },
      allOf: [
        { required: ["value"] },
        {
          if: { properties: { unit: { const: "DAY" } } },
          then: {
            required: ["value"],
            properties: {
              value: { type: "integer", minimum: 1, maximum: 90 },
              extra: { type: "string" },
            },
          },
        },
      ],
    };

    const merged = mergeJsonSchemaConditionals(schema);

    expect(merged.properties).toEqual({
      value: { type: "integer", minimum: 1 },
    });
    expect(merged.allOf).toEqual([{ required: ["value"] }]);
    expect(merged.description).toBe(FIELD_COMBINATIONS_NOTE);
  });

  it("puts a forbid rule on the parent when the property is only a ref", () => {
    const schema: { [key: string]: any } = {
      type: "object",
      properties: {
        customer_order_paid: { $ref: "#/components/schemas/OrderPaid" },
      },
      allOf: [
        {
          if: {
            properties: {
              trigger: {
                properties: { event: { const: "customer.order.paid" } },
              },
            },
          },
          then: {
            not: {
              anyOf: [{ required: ["customer_order_paid"] }],
            },
          },
        },
      ],
    };

    const merged = mergeJsonSchemaConditionals(schema);

    expect(merged.properties.customer_order_paid).toEqual({
      $ref: "#/components/schemas/OrderPaid",
    });
    expect(merged.description).toBe(
      "`customer_order_paid` must be omitted when `trigger.event` is `customer.order.paid`. The API validates this. " +
        FIELD_COMBINATIONS_NOTE,
    );
  });

  it("drops else and not without throwing", () => {
    const schema: { [key: string]: any } = {
      properties: { id: { type: "string" }, extra: { type: "object" } },
      if: { minProperties: 1 },
      then: { maxProperties: 2 },
      else: { not: { required: ["extra"] } },
      not: { type: "array" },
    };

    const merged = mergeJsonSchemaConditionals(schema);

    expect(merged.properties.id).toEqual({ type: "string" });
    expect(merged.properties.extra.description).toBe(
      "`extra` is rejected for some values of the other fields. The API validates this.",
    );
    expect(keywordCounts(merged)).toEqual({});
  });

  it("does not walk example, examples, default, enum, or const values", () => {
    const schema: { [key: string]: any } = {
      type: "object",
      example: { const: "program", if: { then: true } },
      examples: { sample: { value: { not: { required: ["id"] } } } },
      default: { const: "program" },
      properties: {
        id: { const: "keep", enum: [{ if: true }] },
      },
    };

    const merged = mergeJsonSchemaConditionals(schema);

    expect(merged).toBe(schema);
    expect(keywordCounts(merged).const).toBe(1);
  });

  it("is idempotent", () => {
    const once = mergeJsonSchemaConditionals(structuredClone(memberRule));

    expect(mergeJsonSchemaConditionals(once)).toBe(once);
  });

  it("folds every conditional in reference/OpenAPI.json and leaves const for the downgrade", () => {
    const filePath = path.join(__dirname, "../../../reference/OpenAPI.json");
    const document = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const before = keywordCounts(document);

    const merged = mergeJsonSchemaConditionals(document);

    expect(before.if).toBeGreaterThan(0);
    expect(before.then).toBe(before.if);
    expect(before.const).toBeGreaterThan(0);
    const mergedCounts = keywordCounts(merged);
    expect(mergedCounts.if).toBeUndefined();
    expect(mergedCounts.then).toBeUndefined();
    expect(mergedCounts.else).toBeUndefined();
    expect(mergedCounts.not).toBeUndefined();
    expect(mergedCounts.const).toBeGreaterThan(0);
    expect(mergedCounts.const).toBeLessThan(before.const);
    expect(keywordCounts(document).if).toBe(before.if);
    expect(Object.keys(merged.components.schemas)).toEqual(
      Object.keys(document.components.schemas),
    );
    assertParentShape(document, merged);
    expect(mergeJsonSchemaConditionals(merged)).toBe(merged);

    const stripped = documentWithoutLoyaltyV2(merged);
    const downgraded = downgradeOpenApi310To301(stripped);
    expect(downgraded.openapi).toBe("3.0.1");
    expect(keywordCounts(downgraded)).toEqual({});

    const downgradedFirst = downgradeOpenApi310To301(
      documentWithoutLoyaltyV2(document),
    );
    const foldedAfterDowngrade = mergeJsonSchemaConditionals(downgradedFirst);
    expect(keywordCounts(foldedAfterDowngrade)).toEqual({});
  }, 120000);

  it("keeps published schema bodies byte-identical when they contain no conditionals", () => {
    const filePath = path.join(__dirname, "../../../reference/OpenAPI.json");
    const stripped = documentWithoutLoyaltyV2(
      JSON.parse(fs.readFileSync(filePath, "utf8")),
    );
    const downgraded = downgradeOpenApi310To301(stripped);
    const folded = mergeJsonSchemaConditionals(downgraded);

    for (const language of ["ruby", "java", "php", "python", "js", "dotnet"]) {
      const published = JSON.parse(
        fs.readFileSync(
          path.join(
            __dirname,
            `../../../reference/readonly-sdks/${language}/OpenAPI.json`,
          ),
          "utf8",
        ),
      );
      for (const name of Object.keys(published.components.schemas)) {
        const before = downgraded.components?.schemas?.[name];
        if (!before) {
          continue;
        }
        expect(stringify(folded.components.schemas[name])).toBe(
          stringify(before),
        );
      }
    }
  }, 120000);
});
