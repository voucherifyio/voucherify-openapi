import fsPromises from "fs/promises";
import fs from "fs";
import path from "path";
import minimist from "minimist";
import colors from "colors";
import { parseNullsToNullableObjects, removeStoplightTag } from "./utils";
import originalOpenAPIContent from "../../reference/OpenAPI.json";
import _ from "lodash";

let openAPIContent: any = originalOpenAPIContent;
import { removedNotUsedParameters } from "./removed-not-used-parameters";
import { removeNotUsedSchemas } from "./remove-not-used-schemas";
import { getPathsWithoutDeprecated } from "./get-paths-without-deprecated";
import {
  cleanUpDescriptionsInEntireObject,
  removeAllOneOfs,
} from "./removeOneOfs";
import { putNotObjectSchemasIntoObjectSchemas } from "./put-not-object-schemas-into-object-schemas";
import {
  removeBuggedTagsFromOpenAPIParameters,
  removeBuggedTagsFromOpenAPIPaths,
} from "./remove-bugged-tags-from-open-api";
import { removeUnwantedProperties } from "./remove-unwanted-properties";
import addMissingDefaults from "./add-missing-defaults";

const options = minimist(process.argv.slice(2));

type LanguageOptions = {
  name: string;
  simplifyAllObjectsThatHaveAdditionalProperties?: true;
  putNotObjectSchemasIntoObjectSchemas?: true;
  use2XX?: true;
  breakingChangesVersion: number;
  supportOauth?: true;
  removeAllSchemasDefaults?: true;
};

const supportedLanguages: {
  [language: string]: LanguageOptions;
} = {
  python: {
    name: "python",
    simplifyAllObjectsThatHaveAdditionalProperties: true, //MUST STAY!
    use2XX: true, //MUST STAY!
    breakingChangesVersion: 1,
  },
  ruby: {
    name: "ruby",
    breakingChangesVersion: 1,
  },
  php: {
    name: "php",
    putNotObjectSchemasIntoObjectSchemas: true, //MUST STAY!
    breakingChangesVersion: 1,
  },
  java: {
    name: "java",
    breakingChangesVersion: 2,
  },
  dotnet: {
    name: "dotnet",
    supportOauth: true,
    removeAllSchemasDefaults: true,
    breakingChangesVersion: 2,
  },
};

const savePreparedOpenApiFile = async (lang: string, openAPI: object) => {
  const pathToReference = path.join(__dirname, "../../reference");
  if (!fs.existsSync(pathToReference)) {
    fs.mkdirSync(pathToReference);
  }
  const pathToReferenceReadonlySdks = path.join(
    __dirname,
    "../../reference/readonly-sdks",
  );
  if (!fs.existsSync(pathToReferenceReadonlySdks)) {
    fs.mkdirSync(pathToReferenceReadonlySdks);
  }
  const pathToReferenceReadonlySdksLanguage = path.join(
    __dirname,
    `../../reference/readonly-sdks/${lang}`,
  );
  if (!fs.existsSync(pathToReferenceReadonlySdksLanguage)) {
    fs.mkdirSync(pathToReferenceReadonlySdksLanguage);
  }
  await fsPromises.writeFile(
    path.join(__dirname, `../../reference/readonly-sdks/${lang}/OpenAPI.json`),
    JSON.stringify(openAPI, null, 2),
  );
};

const main = async (languageOptions: LanguageOptions) => {
  const prohibited = [
    '"readOnly": true',
    '"readOnly": false',
    '"writeOnly": true',
    '"writeOnly": false',
  ];
  prohibited.forEach((prohibited) => {
    if (JSON.stringify(openAPIContent).includes(prohibited)) {
      throw `Prohibited string found in source OpenAPI file! Found: "${prohibited}"`;
    }
  });
  //TEMPORARY - PLEASE REMOVE IT ONCE NEW TYPE WILL BE PRESENT IN OPENAPI SPEC
  openAPIContent.components.schemas.Segment.properties.type.enum.push(
    "passive",
  );
  openAPIContent.components.schemas.Segment.properties.type.enum = _.uniq(
    openAPIContent.components.schemas.Segment.properties.type.enum,
  );

  //////////////////////////////////////////////////////////////////////////////
  ////////////////////BEGINNING OF CLEANUP OPEN API FILE////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  removeStoplightTag(openAPIContent);
  openAPIContent.components.schemas = removeUnwantedProperties(
    openAPIContent.components.schemas,
    ["title"],
  );
  //Simplify AsyncAction.result
  openAPIContent.components.schemas.AsyncAction.allOf.map((schema) => {
    if (schema?.properties?.result) {
      schema.properties.result = {
        // @ts-ignore
        type: "object",
      };
    }
  });
  //use JSON.parse to not worry about TS
  openAPIContent.components.schemas.Any = JSON.parse(`{
        "title": "Any"
      }`);
  delete openAPIContent.components.schemas.AsyncActionBase.properties.type.enum;
  if (openAPIContent.components.schemas.CustomerActivity?.properties?.data) {
    openAPIContent.components.schemas.CustomerActivity.properties.data = {
      type: "object",
      description:
        "Contains details about the event. The objects that are returned in the data attribute differ based on the context of the event type.",
    };
  }
  //////////////////////////////////////////////////////////////////////////////
  ///////////////////////END OF CLEANUP OPEN API FILE///////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////BEGINNING OF BREAKING CHANGES///////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  if (languageOptions.breakingChangesVersion <= 1) {
    //Restore validation_rules for creat loyalty campaigns
    openAPIContent.components.schemas.CampaignsCreateLoyaltyCampaign.allOf =
      openAPIContent.components.schemas.CampaignsCreateLoyaltyCampaign.allOf.map(
        (object) => {
          if (object.$ref === "#/components/schemas/CampaignsCreateBase") {
            return {
              $ref: "#/components/schemas/CampaignsCreateBaseValidationRules",
            };
          }
          return object;
        },
      );
    //Fix voucher - to prevent breaking changes
    delete openAPIContent.components.schemas.AsyncActionBase.properties.type
      .enum;
    delete openAPIContent.components.schemas.AsyncActionBase.properties
      .operation_status.enum;
    //Fix `CustomerActivity`
    delete openAPIContent.components.schemas.CustomerActivity.properties.type
      .enum;
    delete openAPIContent.components.schemas.CustomerActivity.properties.data
      .properties;
    delete openAPIContent.components.schemas.ParameterCustomerEvent.enum;
    //Fix `MemberActivity`
    delete openAPIContent.components.schemas.MemberActivity.properties.type
      .enum;
    delete openAPIContent.components.schemas.MemberActivity.properties.data
      .properties;
    //Do not do breaking change in `ApplicableTo`
    delete openAPIContent.components.schemas.ApplicableTo.properties.target
      .enum;
    //Delete `enum`s for redeemables in `ValidationEntity`
    delete openAPIContent.components.schemas.ValidationEntity.properties
      .redeemables.items.properties.type.enum;
    delete openAPIContent.components.schemas.ValidationEntity.properties
      .skipped_redeemables.items.properties.type.enum;
    delete openAPIContent.components.schemas.ValidationEntity.properties
      .inapplicable_redeemables.items.properties.type.enum;
    openAPIContent.components.schemas.LoyaltyPointsBucket.properties.expires_at.format =
      "date-time";
    // Remove expand query parameter in GET v1/loyalties
    openAPIContent.paths["/v1/loyalties"].get.parameters = openAPIContent.paths[
      "/v1/loyalties"
    ].get.parameters.filter((parameter) => parameter.name !== "expand");
    //New parameter
    openAPIContent.paths[
      "/v1/loyalties/{campaignId}/members/{memberId}/transactions"
    ].get.parameters = openAPIContent.paths[
      "/v1/loyalties/{campaignId}/members/{memberId}/transactions"
    ].get.parameters.filter((parameter) => parameter.name !== "filters");
    openAPIContent.paths[
      "/v1/loyalties/members/{memberId}/transactions"
    ].get.parameters = openAPIContent.paths[
      "/v1/loyalties/members/{memberId}/transactions"
    ].get.parameters.filter((parameter) => parameter.name !== "filters");
    // Rollback the change of the "page" parameter
    openAPIContent.paths["/v1/customers"].get.parameters = openAPIContent.paths[
      "/v1/customers"
    ].get.parameters.map((parameter) => {
      if (parameter.name === "page") {
        return {
          $ref: "#/components/parameters/page",
        };
      }
      return parameter;
    });
    openAPIContent.paths["/v1/redemptions"].get.parameters =
      openAPIContent.paths["/v1/redemptions"].get.parameters.map(
        (parameter) => {
          if (parameter.name === "page") {
            return {
              $ref: "#/components/parameters/page",
            };
          }
          return parameter;
        },
      );
    openAPIContent.paths["/v1/vouchers"].get.parameters = openAPIContent.paths[
      "/v1/vouchers"
    ].get.parameters.map((parameter) => {
      if (parameter.name === "page") {
        return {
          $ref: "#/components/parameters/page",
        };
      }
      return parameter;
    });
    //Do not add breaking change on application_details
    openAPIContent.components.schemas.OrderCalculated.properties["items"] = {
      type: "array",
      description:
        "Array of items applied to the order. It can include up 500 items.",
      items: {
        $ref: "#/components/schemas/OrderCalculatedItem",
      },
      nullable: true,
    };
    openAPIContent.components.schemas.OrderCalculatedItem.properties[
      "application_details"
    ] = {
      $ref: "#/components/schemas/ApplicationDetails",
    };
    openAPIContent.components.schemas = Object.fromEntries(
      Object.entries(openAPIContent.components.schemas).map(([key, value]) => {
        if (key.endsWith("Body") || ["RedemptionRollback"].includes(key)) {
          return [key, value];
        }
        return [key, fixOrderCalculated(value)];
      }),
    ) as any;

    openAPIContent.components.schemas.LoyaltyCardTransactionsType.enum =
      openAPIContent.components.schemas.LoyaltyCardTransactionsType.enum.map(
        (v) =>
          v === "PENDING_POINTS_ACTIVATION" ? "POINTS_PENDING_ACTIVATION" : v,
      );
    //Do not add the `access_settings` query param to GET List campaigns
    openAPIContent.paths["/v1/campaigns"].get.parameters = openAPIContent.paths[
      "/v1/campaigns"
    ].get.parameters.filter(
      (parameter) => parameter.name !== "access_settings",
    );
    //Do not add the `type` query param to GET List campaigns by deleting the `type` property in the schema
    delete openAPIContent.components.schemas.ParameterFiltersListCampaigns
      .properties.type;
    // Restore `related_redemptions` to `RedemptionRollback`
    openAPIContent.components.schemas.RedemptionRollback.properties[
      "related_redemptions"
    ] = {
      type: "object",
      properties: {
        rollbacks: {
          type: "array",
          items: {
            title: "Redemption Rollback Related Redemptions Rollbacks Item",
            type: "object",
            properties: {
              id: {
                type: "string",
                example: "rr_0bc92f81a6801f9bca",
                description: "Unique identifier of the redemption rollback.",
              },
              date: {
                type: "string",
                example: "2021-12-22T10:13:06.487Z",
                description:
                  "Timestamp representing the date and time when the object was created. The value is shown in the ISO 8601 format.",
                format: "date-time",
              },
            },
          },
        },
        redemptions: {
          type: "array",
          items: {
            title: "Redemption Rollback Related Redemptions Item",
            type: "object",
            properties: {
              id: {
                type: "string",
                example: "r_0bc92f81a6801f9bca",
                description: "Unique redemption ID.",
              },
              date: {
                type: "string",
                example: "2021-12-22T10:13:06.487Z",
                description:
                  "Timestamp representing the date and time when the object was created. The value is shown in the ISO 8601 format.",
                format: "date-time",
              },
            },
          },
        },
      },
    };
    // Restore loyalty_card in VoucherUpdateLoyaltyCard
    openAPIContent.components.schemas.VoucherUpdateLoyaltyCard.allOf.push({
      type: "object",
      properties: {
        type: {
          type: "string",
          enum: ["LOYALTY_CARD"],
          description: "Defines the type of the voucher. ",
        },
        loyalty_card: {
          $ref: "#/components/schemas/SimpleLoyaltyCard",
        },
      },
    });
    // Restore gift in VoucherUpdateGift
    openAPIContent.components.schemas.VoucherUpdateGift.allOf.push({
      type: "object",
      properties: {
        type: {
          type: "string",
          enum: ["GIFT_VOUCHER"],
          description: "Defines the type of the voucher. ",
        },
        gift: {
          $ref: "#/components/schemas/Gift",
        },
      },
    });
    // Delete new query params for GET List campaigns
    delete openAPIContent.components.schemas.ParameterFiltersListCampaigns
      .properties.campaigns;
    delete openAPIContent.components.schemas.ParameterFiltersListCampaigns
      .properties.campaigns_id;
    delete openAPIContent.components.schemas.ParameterFiltersListCampaigns
      .properties.updated_at;
    delete openAPIContent.components.schemas.ParameterFiltersListCampaigns
      .properties.start_date;
    delete openAPIContent.components.schemas.ParameterFiltersListCampaigns
      .properties.created_date;
    delete openAPIContent.components.schemas.ParameterFiltersListCampaigns
      .properties.expiration_date;
    delete openAPIContent.components.schemas.ParameterFiltersListCampaigns
      .properties.validity_day_of_week;
    delete openAPIContent.components.schemas.ParameterFiltersListCampaigns
      .properties.status;
    delete openAPIContent.components.schemas.ParameterFiltersListCampaigns
      .properties.active;
    openAPIContent.paths["/v1/campaigns"].get.parameters = openAPIContent.paths[
      "/v1/campaigns"
    ].get.parameters.filter(
      (parameter) => parameter.name !== "campaign_status",
    );
    openAPIContent.paths["/v1/campaigns"].get.parameters = openAPIContent.paths[
      "/v1/campaigns"
    ].get.parameters.filter(
      (parameter) => parameter.name !== "is_referral_code",
    );
    // Restore previous voucher_type filter
    openAPIContent.components.schemas.ParameterFiltersListCampaigns.properties.voucher_type =
      {
        type: "object",
        description: "Filter by voucher type",
        properties: {
          conditions: {
            $ref: "#/components/schemas/FilterConditionsString",
          },
        },
      };
    // Restore previous is_referral_code filter
    openAPIContent.components.schemas.ParameterFiltersListCampaigns.properties.is_referral_code.properties =
      {
        $is: {
          type: "string",
          description: "Value is exactly this value (single value).",
          enum: ["TRUE", "FALSE"],
        },
        $is_not: {
          type: "string",
          description: "Results omit this value (single value).",
          enum: ["TRUE", "FALSE"],
        },
      };
    // Remove new conditions – $contains, $not_contain from FilterConditionsString
    delete openAPIContent.components.schemas.FilterConditionsString.properties
      .$contains;
    delete openAPIContent.components.schemas.FilterConditionsString.properties
      .$not_contain;
    // Restore `strict`
    openAPIContent.components.schemas.ApplicableTo.properties.strict = {
      type: "boolean",
    };
  }
  if (languageOptions.breakingChangesVersion <= 2) {
    //ADD MORE TO IT ONCE DOTNET IS RELEASED
  }
  //////////////////////////////////////////////////////////////////////////////
  ///////////////////////////END OF BREAKING CHANGES////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  openAPIContent = addMissingDefaults(openAPIContent);
  const { paths, newSchemas } = getPathsWithoutDeprecated(
    openAPIContent.paths,
    languageOptions.name,
    languageOptions.use2XX,
  );
  const parameters = removedNotUsedParameters(
    openAPIContent.components.parameters,
    paths,
    languageOptions,
  );
  let schemasWithoutNotUsed = removeNotUsedSchemas(
    openAPIContent.components,
    paths,
    languageOptions,
    newSchemas,
  );
  if (languageOptions.putNotObjectSchemasIntoObjectSchemas) {
    schemasWithoutNotUsed = putNotObjectSchemasIntoObjectSchemas(
      schemasWithoutNotUsed,
    );
  }
  const schemas = removeAllOneOfs(
    schemasWithoutNotUsed,
    paths,
    openAPIContent.components.parameters,
    languageOptions,
  );
  const pathsWithoutBuggedTags = removeBuggedTagsFromOpenAPIPaths(paths);
  const pathsWithFixedResponses = Object.fromEntries(
    Object.entries(pathsWithoutBuggedTags).map(([path, pathEntry]) => {
      return [
        path,
        Object.fromEntries(
          Object.entries(pathEntry).map(([method, methodEntry]) => {
            methodEntry.responses = Object.fromEntries(
              _.compact(
                Object.entries(methodEntry.responses || {}).map(
                  ([statusCode, responseEntry]) => {
                    if (!statusCode.startsWith("2")) {
                      return;
                    }
                    if (languageOptions.use2XX) {
                      return ["2XX", responseEntry];
                    }
                    return [statusCode, responseEntry];
                  },
                ),
              ),
            );
            return [method, methodEntry];
          }),
        ),
      ];
    }),
  );

  openAPIContent.components.parameters = removeBuggedTagsFromOpenAPIParameters(
    openAPIContent.components.parameters,
  );

  const schemasWithFixedTitles: any = fixSchemasTitles(
    removeUnwantedProperties(
      parseNullsToNullableObjects(copySchemasIfUsedAsAllOfInBase(schemas)),
      ["title"],
    ),
  );
  schemasWithoutNotUsed = removeNotUsedSchemas(
    {
      schemas: schemasWithFixedTitles,
      parameters: openAPIContent.components.parameters,
    },
    paths,
    languageOptions,
    {},
  );
  if (languageOptions.removeAllSchemasDefaults) {
    schemasWithoutNotUsed = removeUnwantedProperties(schemasWithoutNotUsed, [
      "default",
    ]);
  }

  if (!languageOptions.supportOauth) {
    openAPIContent.components.securitySchemes = _.omit(
      openAPIContent.components.securitySchemes,
      ["X-Voucherify-OAuth"],
    );
    Object.values(pathsWithFixedResponses).forEach((methods) => {
      Object.values(methods).forEach((method) => {
        if (method?.security) {
          method.security = [
            _.omit(method.security?.[0] || {}, "X-Voucherify-OAuth"),
          ];
        }
      });
    });
  }

  // Building all together
  const newOpenApiFile = cleanUpDescriptionsInEntireObject({
    ...openAPIContent,
    components: {
      ...openAPIContent.components,
      schemas: fixRefUagesInAllSchemasProperties(schemasWithoutNotUsed),
      parameters,
    },
    paths: pathsWithFixedResponses,
  });

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////BEGINNING OF BREAKING CHANGES///////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  if (languageOptions.breakingChangesVersion <= 1) {
    [
      "ClientQualificationsCheckEligibilityResponseBody",
      "ClientRedemptionsRedeemResponseBody",
      "ClientValidationsValidateResponseBody",
      "QualificationsCheckEligibilityResponseBody",
      "RedemptionRollback",
      "RedemptionsRollbackCreateResponseBody",
      "RedemptionsRollbacksCreateResponseBody",
      "ValidationsValidateResponseBody",
      "RedemptionsRedeemResponseBody",
    ].forEach((key) => {
      newOpenApiFile.components.schemas[key].properties.order = {
        $ref: "#/components/schemas/OrderCalculated",
      };
    });
    newOpenApiFile.components.schemas.OrdersListResponseBody.properties.orders.items =
      {
        $ref: "#/components/schemas/OrderCalculated",
      };
    ///
    newOpenApiFile.components.schemas.LoyaltiesMembersPointsExpirationListResponseBody.properties.data.items =
      newOpenApiFile.components.schemas.LoyaltyPointsBucket;
    newOpenApiFile.components.schemas.LoyaltyCardTransaction.properties.details.properties.balance =
      newOpenApiFile.components.schemas.VoucherBalance;
    newOpenApiFile.components.schemas.VoucherTransaction.properties.details.properties.balance =
      newOpenApiFile.components.schemas.VoucherBalance;
  }
  //////////////////////////////////////////////////////////////////////////////
  ///////////////////////////END OF BREAKING CHANGES////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  newOpenApiFile.components.schemas = fixSchemasTitles(
    _.cloneDeep(newOpenApiFile.components.schemas),
  );

  await savePreparedOpenApiFile(languageOptions.name, newOpenApiFile);
};

const mergeObjectsWithAllOfs = (object, schemas) => {
  const _object = _.omit(object, ["allOf"]);
  _object.type = "object";
  _object.properties = {};
  object.allOf.forEach((item) => {
    if (item?.$ref) {
      const shcemaName = item?.$ref?.split("/").at(-1);
      if (!schemas[shcemaName]) {
        throw new Error(
          `Could not find schema ${shcemaName}, ref: ${item?.$ref}`,
        );
      }
      if (schemas[shcemaName].allOf) {
        _object.properties = {
          ..._object.properties,
          ...mergeObjectsWithAllOfs(schemas[shcemaName], schemas).properties,
        };
      } else if (schemas[shcemaName].properties) {
        _object.properties = {
          ..._object.properties,
          ...schemas[shcemaName].properties,
        };
      } else {
        throw new Error(
          `Could not find allOf or Properties in schema ${shcemaName}`,
        );
      }
    } else if (item?.properties) {
      _object.properties = {
        ..._object.properties,
        ...item?.properties,
      };
    } else if (item.allOf) {
      _object.properties = {
        ...mergeObjectsWithAllOfs(item, schemas).properties,
        ...item?.properties,
      };
    } else if (item.type === "object" && item.required.length) {
    } else {
      console.log(item);
      throw new Error(
        `Could not find any properties and any ref in one of allOf in object`,
        object,
      );
    }
  });
  return _object;
};

const fixRefUagesInAllSchemasProperties = (schemas) => {
  return Object.fromEntries(
    Object.entries(schemas).map(([title, schema]) => {
      return [title, fixRefsUsages(schema)];
    }),
  );
};

const copySchemasIfUsedAsAllOfInBase = (schemas): Record<string, any> => {
  return Object.fromEntries(
    Object.entries(schemas).map(([schemaName, schema]): any => {
      if (
        !_.isObject(schema) ||
        !("allOf" in schema) ||
        (schema as any).allOf?.length === 0
      ) {
        return [schemaName, schema];
      } else if ((schema as any).allOf?.length === 1) {
        const copyFrom = schema.allOf?.[0]?.$ref;
        if (typeof copyFrom === "string") {
          const copyFromSchemaName = copyFrom.split("/").at(-1);
          if (schemas[copyFromSchemaName]) {
            if (schemas[copyFromSchemaName].allOf) {
              return [
                schemaName,
                _.merge(
                  _.omit(
                    _.omit(
                      mergeObjectsWithAllOfs(
                        schemas[copyFromSchemaName],
                        schemas,
                      ),
                      ["description", "allOf"],
                    ),
                    ["description"],
                  ),
                  _.pick(schema, ["description"]),
                ),
              ];
            }
            return [
              schemaName,
              _.merge(
                _.omit(schemas[copyFromSchemaName], ["description"]),
                _.pick(schema, ["description"]),
              ),
            ];
          } else {
            throw new Error(
              `Could not find ${copyFromSchemaName} schema.... ref found in schema ${schemaName}`,
            );
          }
        } else {
          throw new Error(
            `Could not find $ref in schema ${schemaName}.allOf[0]`,
          );
        }
      } else {
        return [
          schemaName,
          _.merge(
            _.omit(mergeObjectsWithAllOfs(schema, schemas), [
              "description",
              "allOf",
            ]),
            _.pick(schema, ["description"]),
          ),
        ];
      }
    }),
  );
};

const returnRefSchemaIfAllOfContainsOnly1Reference = (schema) => {
  if (
    schema?.allOf?.length === 1 &&
    schema.allOf[0]?.$ref &&
    !schema.required?.length
  ) {
    return schema.allOf[0];
  }
  return false;
};

const fixRefsUsages = (schema) => {
  const refSchema = returnRefSchemaIfAllOfContainsOnly1Reference(schema);
  if (refSchema) {
    return refSchema;
  }
  if (schema.items) {
    schema.items = fixRefsUsages(schema.items);
  } else if (schema.properties) {
    schema.properties = Object.fromEntries(
      Object.entries(schema.properties).map(([property, schema]: any) => {
        return [property, fixRefsUsages(schema)];
      }),
    );
  } else if (schema.additionalProperties) {
    schema.additionalProperties = fixRefsUsages(schema.additionalProperties);
  }
  return schema;
};

const fixSchemasTitles = (schemas) => {
  return Object.fromEntries(
    Object.entries(schemas).map(([title, schema]) => {
      return [title, fixSchemaTitle(schema, title, schemas)];
    }),
  );
};

const fixSchemaTitle = (schema, title, schemas, skipSettingTitle?: boolean) => {
  if (schema.$ref) {
    return _.pick(schema, "$ref");
  }
  if (skipSettingTitle !== true) {
    if (schema.additionalProperties) {
      schema.title = `${title}Entry`;
    } else {
      schema.title = title;
    }
  }
  if (schema.items) {
    schema.items = fixSchemaTitle(schema.items, `${title}Item`, schemas);
  }
  if (schema.properties) {
    schema.properties = Object.fromEntries(
      Object.entries(_.cloneDeep(schema.properties)).map(
        ([property, schema]: any) => {
          const _title = `${title}${_.startCase(
            snakeToCamel(property),
          ).replaceAll(" ", "")}`;
          if ("allOf" in schema && schema.allOf.length > 1) {
            return [
              property,
              fixSchemaTitle(
                mergeObjectsWithAllOfs(schema, schemas),
                _title,
                schemas,
              ),
            ];
          } else if ("allOf" in schema && schema.allOf.length === 1) {
            return [property, fixSchemaTitle(schema.allOf[0], _title, schemas)];
          } else if (schema.type === "object" || schema.type === "array") {
            return [property, fixSchemaTitle(schema, _title, schemas)];
          }
          return [property, schema];
        },
      ),
    );
  }
  if (schema.allOf) {
    schema.allOf = schema.allOf.map((schema: any) =>
      fixSchemaTitle(schema, title, schemas, true),
    );
  }
  if (schema.additionalProperties) {
    schema.additionalProperties = fixSchemaTitle(
      schema.additionalProperties,
      `${title}Entry`,
      schemas,
      true,
    );
  }
  return { title: schema.title, ..._.omit(schema, ["title"]) };
};

const snakeToCamel = (str) =>
  str
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group) =>
      group.toUpperCase().replace("-", "").replace("_", ""),
    );

const moveSchemasOnTheBack = (schemas: any, schemasNames: string[]) => ({
  ..._.omit(schemas, schemasNames),
  ..._.pick(schemas, schemasNames),
});

const fixOrderCalculated = (object: any) => {
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

if (!("language" in options)) {
  console.log(colors.red("invalid arguments, missing language parameter"));
} else if (
  typeof options.language !== "string" ||
  !Object.keys(supportedLanguages).includes(options.language)
) {
  console.log(
    colors.red(
      `invalid language arguments, supported languages are ${Object.keys(
        supportedLanguages,
      )
        .map((language) => `"${language}"`)
        .join(", ")}`,
    ),
  );
} else {
  main(supportedLanguages[options.language]);
}
