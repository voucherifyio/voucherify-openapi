import minimist from "minimist";
import colors from "colors";
import { main } from "./index";
const options = minimist(process.argv.slice(2));
const versionTag = options.versionTag || options.vt;
const versionOption = options.version || options.v;
const mainVersion = "v2018-08-01";
const version =
  versionOption || versionTag ? `${mainVersion}-${versionTag}` : undefined;

if (!version) {
  console.log(
    colors.red("invalid arguments, missing `version` or `versionTag`"),
  );
}
main({ _version: version });
