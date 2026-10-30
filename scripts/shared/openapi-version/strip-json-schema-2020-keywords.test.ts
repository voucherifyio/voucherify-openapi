import {
  stripJsonSchema2020Keywords,
} from "./strip-json-schema-2020-keywords";

describe("stripJsonSchema2020Keywords", () => {
  it("turns a single patternProperties value into additionalProperties", () => {
    const document = {
      components: {
        schemas: {
          RewardCostRuleGroupResponse: {
            type: "object",
            properties: { logic: { type: "string" } },
            patternProperties: {
              "^[1-9]\\d*$": {
                $ref: "#/components/schemas/RewardCostRuleDefinitionResponse",
              },
            },
          },
        },
      },
    };

    stripJsonSchema2020Keywords(document);

    expect(document.components.schemas.RewardCostRuleGroupResponse).toEqual({
      type: "object",
      properties: { logic: { type: "string" } },
      additionalProperties: {
        $ref: "#/components/schemas/RewardCostRuleDefinitionResponse",
      },
    });
  });

  it("replaces additionalProperties false when patternProperties is present", () => {
    const document = {
      components: {
        schemas: {
          EarningRuleRulesGroup: {
            type: "object",
            properties: { logic: { type: "string" } },
            patternProperties: {
              "^[1-9]\\d*$": {
                $ref: "#/components/schemas/EarningRuleDefinition",
              },
            },
            additionalProperties: false,
          },
        },
      },
    };

    stripJsonSchema2020Keywords(document);

    expect(
      document.components.schemas.EarningRuleRulesGroup.additionalProperties,
    ).toEqual({ $ref: "#/components/schemas/EarningRuleDefinition" });
    expect(
      document.components.schemas.EarningRuleRulesGroup.patternProperties,
    ).toBeUndefined();
  });

  it("maps unevaluatedProperties false to additionalProperties false", () => {
    const document = {
      components: {
        schemas: {
          Query: {
            type: "object",
            unevaluatedProperties: false,
          },
        },
      },
    };

    stripJsonSchema2020Keywords(document);

    expect(document.components.schemas.Query).toEqual({
      type: "object",
      additionalProperties: false,
    });
  });

  it("drops unevaluatedProperties when additionalProperties already exists", () => {
    const document = {
      components: {
        schemas: {
          Query: {
            type: "object",
            additionalProperties: true,
            unevaluatedProperties: false,
          },
        },
      },
    };

    stripJsonSchema2020Keywords(document);

    expect(document.components.schemas.Query).toEqual({
      type: "object",
      additionalProperties: true,
    });
  });
});
