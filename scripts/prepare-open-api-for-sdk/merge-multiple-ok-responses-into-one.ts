import { createResourceName } from "../helpers/createResourceName";
import { compact, uniq } from "lodash";

export const mergeMultipleOkResponsesIntoOne = (
  paths,
  use2XX?: boolean,
): { paths: any; newSchemas: any } => {
  const newSchemas: Record<string, any> = {};
  return {
    paths: Object.fromEntries(
      Object.entries(paths).map((pathAndEntry) => {
        const [path, methodsData] = pathAndEntry;
        return [
          path,
          Object.fromEntries(
            Object.entries(methodsData).map((methodAndEntry) => {
              const [method, entry] = methodAndEntry;
              if (!("responses" in entry)) {
                return [method, entry];
              }
              const responseKeys = Object.keys(entry.responses)
                .map((r) => parseInt(r))
                .filter((r) => !isNaN(r) && r < 300);
              if (responseKeys.length < 2) {
                return [method, entry];
              }
              const newSchemaName =
                createResourceName(entry.operationId, method, path) +
                "CombinedResponseBody";
              const responsesRefs = uniq(
                compact(
                  responseKeys.map((responseStatus) => {
                    const response = entry.responses[responseStatus];
                    return response?.content?.["application/json"]?.schema
                      ?.$ref;
                  }),
                ),
              );
              if (responsesRefs.length < 1) {
                throw {
                  error:
                    "not implemented... found duplicate in responses, shall new schema not be created!",
                };
              }
              const responsesDescription: string = responseKeys.reduce(
                (accumulator: string, currentValue: number) => {
                  const response = entry.responses[currentValue];
                  if (!accumulator) {
                    return response.description || "";
                  }
                  return response.description
                    ? accumulator + " and " + response.description
                    : accumulator;
                },
                "",
              );
              newSchemas[newSchemaName] = {
                type: "object",
                title: newSchemaName.replace(/([A-Z])/g, " $1").trim(),
                description: responsesDescription,
                oneOf: responsesRefs.map((ref) => ({ $ref: ref })),
              };
              const responsesSchema = {
                description: responsesDescription,
                content: {
                  "application/json": {
                    schema: {
                      $ref: `#/components/schemas/${newSchemaName}`,
                    },
                  },
                },
              };
              const responses = {};
              if (use2XX) {
                responses["2XX"] = responsesSchema;
              } else {
                responses[200] = responsesSchema;
              }
              return [method, { ...entry, responses }];
            }),
          ),
        ];
      }),
    ),
    newSchemas,
  };
};
