export const splitSecurityParams = (openapi: any) => {
  const clonnedOpenAPI = JSON.parse(JSON.stringify(openapi));
  clonnedOpenAPI.paths = Object.fromEntries(
    Object.entries(openapi.paths).map(([path, pathItem]) => {
      return [
        path,
        Object.fromEntries(
          Object.entries(pathItem).map(([method, methodItem]) => {
            return [
              method,
              method === "parameters"
                ? methodItem
                : Object.fromEntries(
                    Object.entries(methodItem).map(([key, value]) => {
                      if (key === "security") {
                        const allSecurity = {};
                        if (value instanceof Array) {
                          value.forEach((security) => {
                            Object.entries(security).forEach(([key, value]) => {
                              allSecurity[key] = allSecurity[key] || [];
                              if (Array.isArray(value)) {
                                allSecurity[key].push(...value);
                              }
                            });
                          });
                        }

                        const splitted = [
                          {
                            "X-App-Id": allSecurity["X-App-Id"],
                            "X-App-Token": allSecurity["X-App-Token"],
                          },
                          {
                            "X-Client-Application-Id":
                              allSecurity["X-Client-Application-Id"],
                            "X-Client-Token": allSecurity["X-Client-Token"],
                          },
                          {
                            "X-Voucherify-OAuth":
                              allSecurity["X-Voucherify-OAuth"],
                          },
                        ].filter((security) =>
                          Object.values(security).find((v) => v),
                        );

                        return ["security", splitted];
                      }
                      return [key, value];
                    }),
                  ),
            ];
          }),
        ),
      ];
    }),
  );
  return clonnedOpenAPI;
};
