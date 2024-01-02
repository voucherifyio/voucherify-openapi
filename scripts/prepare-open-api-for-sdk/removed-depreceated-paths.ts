import { skipList } from "./skipList";

export const removedDepreceatedPaths = (paths: object) => {
    const newPaths = {};
    const pathsKeys = Object.keys(paths);
    for (const pathKey of pathsKeys) {
      const skip = skipList.find((skip) => skip.endpoint === pathKey);
      const path = {};
      const methods = Object.keys(paths[pathKey]);
      for (const method of methods) {
        if (
          paths[pathKey][method]?.deprecated ||
          skip?.methods === true ||
          (skip?.methods && skip.methods.includes(method))
        ) {
          continue;
        }
        path[method] = paths[pathKey][method];
        if (path[method].responses instanceof Object) {
          path[method].responses = Object.fromEntries(
            Object.entries(path[method].responses).filter((httpCodeAndSchema) => {
              const [httpCode, schema] = httpCodeAndSchema;
              return !isNaN(parseInt(httpCode)) && parseInt(httpCode) < 300;
            })
          );
        }
      }
      if (Object.keys(path).length > 0) {
        newPaths[pathKey] = path;
      }
    }
    return newPaths
  }