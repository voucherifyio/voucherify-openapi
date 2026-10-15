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

/** Keep INACTIVE and DELETED on customer loyalty membership status so callers that reference those enum constants still compile. The API lists only ACTIVE memberships. */
export const keepCustomerLoyaltyMembershipMemberStatuses = (schemas: any) => {
  const status = schemas?.CustomerLoyaltyMembershipMember?.properties?.status;
  if (!status) {
    return;
  }
  status.enum = ["ACTIVE", "INACTIVE", "DELETED"];
  status.description =
    "Member status. List responses include only ACTIVE memberships. INACTIVE and DELETED remain so existing SDK callers keep compiling.";
};

/** SDKs: keep the inline `error` object with a single `message`; the shared `ValidationRuleError` $ref renames the generated models. */
export const restoreValidationRuleErrorObjects = (schemas: any) => {
  const inlineError = (description: string, messageDescription: string) => ({
    type: "object",
    description,
    properties: {
      message: {
        type: "string",
        description: messageDescription,
      },
    },
  });

  if (schemas.ValidationRuleBundleRules?.additionalProperties?.properties) {
    schemas.ValidationRuleBundleRules.additionalProperties.properties.error =
      inlineError(
        "**CURRENTLY UNSUPPORTED**. Contains the error message returned from API when validation / redemption fails to meet requirements of defined rule.",
        "The error message returned from API when validation / redemption fails to meet requirements of defined rule.",
      );
  }

  [
    "ValidationRuleRules",
    "ValidationRuleRules01",
    "ValidationRuleRules02",
    "ValidationRuleRules03",
  ].forEach((schemaName) => {
    if (schemas[schemaName]?.additionalProperties?.properties) {
      schemas[schemaName].additionalProperties.properties.error = inlineError(
        "Contains the error message returned from API when validation / redemption fails to meet requirements of defined rule.",
        "The error message returned from API when validation / redemption fails to meet requirements of defined rule.",
      );
    }
  });

  if (schemas.ValidationRuleBase?.properties) {
    schemas.ValidationRuleBase.properties.error = inlineError(
      "Contains the error message returned from API when validation / redemption fails to meet requirements of defined rules.",
      "The error message returned from API when validation / redemption fails to meet requirements of defined rules.",
    );
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
