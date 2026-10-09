/** Ruby SDK: keep `fixed_month` / `fixed_day` from OpenAPI; only restore `period_type` default `MONTH`. */
export const restoreLoyaltyExpirationRulesPeriodTypeDefault = (schema: {
  properties?: {
    period_type?: Record<string, unknown>;
    fixed_month?: unknown;
    fixed_day?: unknown;
    [key: string]: unknown;
  };
}) => {
  const periodType = schema?.properties?.period_type;
  if (!periodType || typeof periodType !== "object") {
    return;
  }
  schema.properties!.period_type = {
    ...periodType,
    default: "MONTH",
  };
};

/**
 * Keep validation-rule `error` inline so the generated model stays
 * `ValidationRules*Error`. A `$ref` to `ValidationRuleError` renames that model.
 * The inline object keeps `message`, `mode`, `messages`, and `library`.
 */
export const restoreValidationRuleErrorObjects = (schemas: any) => {
  const inlineError = {
    type: "object",
    description:
      "Defines the custom error returned when validation or redemption fails this rule. Use legacy `message`, `mode: MESSAGES` with per-language `messages`, or `mode: LIBRARY` with a library `key`. `MESSAGES` and `LIBRARY` are mutually exclusive. At validation or redemption time the API resolves this object to a single `{ message }` using `options.language`.",
    properties: {
      message: {
        type: "string",
        maxLength: 255,
        nullable: true,
        description:
          "Legacy single-language error message. Used when `mode` is omitted. In `MESSAGES` mode, used when neither the requested language nor the default language has a translation.",
      },
      mode: {
        type: "string",
        nullable: true,
        enum: ["MESSAGES", "LIBRARY"],
        description:
          "Selects how the custom error is defined. `MESSAGES` stores per-language text in `messages`. `LIBRARY` references an Error Message Library entry in `library`. Omit `mode` to use the legacy `message` field only.",
      },
      messages: {
        type: "object",
        nullable: true,
        maxProperties: 100,
        additionalProperties: {
          type: "string",
          maxLength: 255,
        },
        description:
          "Per-language custom messages keyed by language code (`en`, `pl`, `en-US`). Required when `mode` is `MESSAGES`. Must be omitted or `null` when `mode` is `LIBRARY`.",
      },
      library: {
        $ref: "#/components/schemas/ValidationRuleErrorLibrary",
      },
    },
  };

  if (schemas.ValidationRuleBundleRules?.additionalProperties?.properties) {
    schemas.ValidationRuleBundleRules.additionalProperties.properties.error =
      inlineError;
  }

  [
    "ValidationRuleRules",
    "ValidationRuleRules01",
    "ValidationRuleRules02",
    "ValidationRuleRules03",
  ].forEach((schemaName) => {
    if (schemas[schemaName]?.additionalProperties?.properties) {
      schemas[schemaName].additionalProperties.properties.error = inlineError;
    }
  });

  if (schemas.ValidationRuleBase?.properties) {
    schemas.ValidationRuleBase.properties.error = inlineError;
  }
};

export const fixOrderCalculated = (object: any) => {
  if (Array.isArray(object)) {
    return object.map((value) => fixOrderCalculated(value));
  }
  if (object instanceof Object) {
    if (
      object.properties?.order?.allOf?.find(
        (e) => e?.$ref === "#/components/schemas/OrderCalculated",
      )
    ) {
      object.properties.order.allOf = object.properties?.order?.allOf.filter(
        (e) => !e?.properties?.items,
      );
      if (object.properties.order.allOf.length === 1) {
        object.properties.order = object.properties.order.allOf[0];
      }
    }
    if (
      object.properties?.orders?.items?.allOf?.find(
        (e) => e?.$ref === "#/components/schemas/OrderCalculated",
      )
    ) {
      object.properties.orders.items.allOf =
        object.properties?.orders.items?.allOf.filter(
          (e) => !e?.properties?.items,
        );
      if (object.properties.orders.items.allOf.length === 1) {
        object.properties.orders.items =
          object.properties.orders.items.allOf[0];
      }
    }
    return Object.fromEntries(
      Object.entries(object).map((keyAndEntry) => {
        const [key, entry] = keyAndEntry;
        return [key, fixOrderCalculated(entry)];
      }),
    );
  }
  return object;
};
