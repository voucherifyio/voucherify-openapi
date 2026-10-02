import fs from "fs";
import minimist from "minimist";
import { downgradeOpenApi310To301 } from "./migrate";

const options = minimist(process.argv.slice(2));
const input =
  typeof options.input === "string" ? options.input : "reference/OpenAPI.json";
const output = typeof options.output === "string" ? options.output : input;

const raw = fs.readFileSync(input, "utf8");
const trailingNewline = raw.endsWith("\n");
const downgraded = downgradeOpenApi310To301(JSON.parse(raw));
const text =
  JSON.stringify(downgraded, null, 2) + (trailingNewline ? "\n" : "");

fs.writeFileSync(output, text);
console.log(`Wrote OpenAPI 3.0.1 to ${output}`);
