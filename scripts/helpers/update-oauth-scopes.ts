import originalOpenAPIContent from "../../reference/OpenAPI.json";
import fsPromises from "fs/promises";
import path from "path";

const bouncerRoutes = []; // do not include it in the repo!! do not commit changes to this file!!

function replacePathParams(url) {
  return url.replace(/\{[^}]+\}/g, "{}");
}

const allScopes = new Set<string>();

const routesOauthScopes = bouncerRoutes.reduce<
  Record<string, Record<string, string[]>>
>((acc, cur) => {
  const method = cur.method;
  const scopes: string[] = (cur.filters as any)?.scopes;
  if (scopes) {
    scopes.forEach((scope) => {
      allScopes.add(scope);
    });
    if (!acc[replacePathParams(cur.path)]) {
      acc[replacePathParams(cur.path)] = {
        [method]: scopes,
      };
    } else {
      acc[replacePathParams(cur.path)][method] = scopes;
    }
  }
  return acc;
}, {});

originalOpenAPIContent.paths = Object.fromEntries(
  Object.entries(originalOpenAPIContent.paths).map(([pathRaw, methodsData]) => {
    const path = replacePathParams(pathRaw);

    if (!routesOauthScopes[path]) {
      return [pathRaw, methodsData];
    }

    const scopesPerMethod = routesOauthScopes[path];

    return [
      pathRaw,
      Object.entries(methodsData).reduce<any>((acc, [method, value]) => {
        const scopes = scopesPerMethod[method.toUpperCase()];
        if (scopes) {
          value.security = [
            {
              ...(value.security?.[0] || {}),
              "X-Voucherify-OAuth": scopes,
            },
          ];
        }
        acc[method] = value;
        return acc;
      }, {}),
    ];
  }),
) as any;

originalOpenAPIContent.components.securitySchemes["X-Voucherify-OAuth"] = {
  type: "oauth2",
  flows: {
    implicit: {
      authorizationUrl: "https://api.voucherify.io/v1/oauth/token",
      scopes: [...allScopes].reduce<Record<string, string>>((acc, scope) => {
        acc[scope] = "";
        return acc;
      }, {}) as any,
    },
  },
};

(async () => {
  await fsPromises.writeFile(
    path.join(__dirname, `../../reference/OpenAPI.json`),
    JSON.stringify(originalOpenAPIContent, null, 2),
  );
})();
