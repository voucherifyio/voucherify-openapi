import * as OpenAPI from "../../../../reference/OpenAPI.json";

const removeDotnetBreakingChanges = {
  before: (_openApi: unknown): typeof OpenAPI => {
    const openApi = _openApi as typeof OpenAPI;
    return openApi;
  },
  after: (_openApi: unknown): any => {
    let openApi: any = _openApi;
    return openApi;
  },
};

export default removeDotnetBreakingChanges;
