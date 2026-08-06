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
