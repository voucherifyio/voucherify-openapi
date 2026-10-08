import fs from "fs";
import minimist from "minimist";
import { upgradeOpenApi301To310 } from "./migrate";

const options = minimist(process.argv.slice(2));
const input =
  typeof options.input === "string" ? options.input : "reference/OpenAPI.json";
const output = typeof options.output === "string" ? options.output : input;

const raw = fs.readFileSync(input, "utf8");
const trailingNewline = raw.endsWith("\n");
const upgraded = upgradeOpenApi301To310(JSON.parse(raw));
const text = JSON.stringify(upgraded, null, 2) + (trailingNewline ? "\n" : "");

fs.writeFileSync(output, text);
console.log(`Wrote OpenAPI 3.1.0 to ${output}`);
