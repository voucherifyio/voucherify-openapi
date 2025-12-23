import { getTakeList } from "./get-take-list";

export const removeNotYetRefactoredPaths = (paths: object, lng?: string) => {
  const newPaths = {};
  const pathsKeys = Object.keys(paths);
  for (const pathKey of pathsKeys) {
    const take = getTakeList(lng).find((take) => take.endpoint === pathKey);
    if (!take) {
      continue;
    }
    const path = {};
    const methods = Object.keys(paths[pathKey]);
    for (const method of methods) {
      if (![...take.methods, "parameters"].includes(method.toLowerCase())) {
        continue;
      }
      path[method] = paths[pathKey][method];
      if (path[method].responses instanceof Object) {
        path[method].responses = Object.fromEntries(
          Object.entries(path[method].responses).filter((httpCodeAndSchema) => {
            const [httpCode, schema] = httpCodeAndSchema;
            return !isNaN(parseInt(httpCode)) && parseInt(httpCode) < 300;
          }),
        );
      }
    }
    if (Object.keys(path).length > 0) {
      newPaths[pathKey] = path;
    }
  }
  return newPaths;
};
