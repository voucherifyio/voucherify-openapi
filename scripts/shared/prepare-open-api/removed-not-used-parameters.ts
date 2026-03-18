import {
  removeAdditionalProperties,
  removeRequiredOnNullableAttributes,
} from "./utils";

type LanguageOptions = {
  simplifyAllObjectsThatHaveAdditionalProperties?: boolean; //default: false
};

export const removedNotUsedParameters = (
  parameters,
  paths,
  opt: LanguageOptions,
) => {
  const parametersNames = JSON.stringify(paths)
    .match(/"#\/components\/parameters\/.*?"/g)
    .map((match) => match.replace('"#/components/parameters/', "").slice(0, -1))
    .sort();
  const newParameters = {};

  for (const parameterName of parametersNames) {
    if (!parameters?.[parameterName]) {
      console.log(`not found ${parameterName} in parameters`);
      continue;
    }
    newParameters[parameterName] = removeAdditionalProperties(
      parameters[parameterName],
      !opt.simplifyAllObjectsThatHaveAdditionalProperties,
    );
    newParameters[parameterName] = removeRequiredOnNullableAttributes(
      newParameters[parameterName],
    );
  }

  return newParameters;
};
