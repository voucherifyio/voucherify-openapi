import { prepareWebhooksDocumentation } from "./prepare-webhooks-documentation";
import minimist from "minimist";
const options = minimist(process.argv.slice(2));
const versionTag = options.versionTag || options.vt;
const versionOption = options.version || options.v;
const mainVersion = "v2018-08-01";
let version =
  versionOption || versionTag ? `${mainVersion}-${versionTag}` : undefined;
import colors from "colors";
import { exec } from "child_process";
import { updateWebhooksDocumentationTitles } from "./update-webhooks-documentation-titles";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

//logic to be moved to manage-project!!!
export const main = async ({ _version }: { _version: string }) => {
  if (_version) {
    version = _version;
  }
  await prepareWebhooksDocumentation();
  await uploadOpenApiFileWithMaxNumberOfAttempts(version, 1);
  console.log(colors.green("Sleeping 10s"));
  await sleep(10000);
  await uploadReferenceDocsWithMaxNumberOfAttempts(version, 2);
  console.log(colors.green("UPDATING DOCS TITLES..."));
  await updateWebhooksDocumentationTitles(version);
  console.log(colors.green("UPLOAD CUSTOM PAGES..."));
  await runCliProcess({
    command: `rdme docs ./docs/custom-webhook-sites --version=${version}`,
    stdoutIncludes: "successfully updated",
    resolveErrorAsFalse: true,
  });
  console.log(
    colors.green(`\n\nDONE!\nVisit: https://docs.voucherify.io/${version}/`),
  );
};

const uploadOpenApiFileWithMaxNumberOfAttempts = async (
  version,
  maxNumberOfUploadingAttempts = 3,
) => {
  console.log(
    colors.green(
      "UPLOADING OPEN API FILE... PLEASE WAIT... THIS MAY TAKE UP TO A MINUTE",
    ),
  );

  for (let i = 1; i <= maxNumberOfUploadingAttempts; i++) {
    const { success, error } = await runCliProcess({
      command: `rdme openapi ./reference/OpenAPIWebhooks.json --version=${version} --create`,
      stderrIncludes: `We're sorry, your upload request timed out. Please try again or split your file up into smaller chunks.`,
      stdoutIncludes: `You've successfully uploaded a new OpenAPI file to your ReadMe project!`,
      resolveErrorAsFalse: true,
    });
    if (success) {
      console.log(colors.green("OPEN API FILE WAS UPLOADED"));
      break;
    }
    if (i === maxNumberOfUploadingAttempts) {
      console.log(
        colors.red(
          "OPEN API FILE COULD BE NOT UPLOADED! CHECK LOGS ABOVE AND VERIFY RESULT ON THE WEB.",
        ),
      );
      break;
    }
  }
  return;
};
const uploadReferenceDocsWithMaxNumberOfAttempts = async (
  version,
  maxNumberOfUploadingAttempts = 3,
) => {
  console.log(colors.green("UPLOADING REFERENCE DOC FILES..."));
  for (let i = 1; i <= maxNumberOfUploadingAttempts; i++) {
    const { success, error } = await runCliProcess({
      command: `rdme docs ./docs/webhooks --version=${version}`,
      stdoutIncludes: "successfully updated",
      resolveErrorAsFalse: true,
    });
    if (success) {
      console.log(colors.green("REFERENCE DOC FILES WERE UPLOADED!"));
      break;
    }
    if (i === maxNumberOfUploadingAttempts) {
      console.log(
        colors.red(
          "REFERENCE DOC FILES COULD BE NOT UPLOADED! CHECK LOGS ABOVE AND VERIFY RESULT ON THE WEB.",
        ),
      );
      return;
    }
    await sleep(10000);
  }
  return;
};

const runCliProcess = async ({
  command,
  stdoutIncludes,
  stderrIncludes,
  resolveErrorAsFalse = false,
}: {
  command: string;
  stdoutIncludes?: string;
  stderrIncludes?: string;
  resolveErrorAsFalse?: boolean;
}): Promise<{ success: boolean; error?: string }> => {
  return await new Promise((resolve) => {
    exec(command, (error, stdout, stderr) => {
      const stdoutClean = stdout.replace(/.*voucherify/, "").trim();
      if (
        (stdoutIncludes && stdoutClean?.includes(stdoutIncludes)) ||
        (!stdoutIncludes && stdoutClean) ||
        (stderrIncludes && stderr.includes(stderrIncludes))
      ) {
        return resolve({ success: true });
      }
      console.log({ stdout, stderr });
      if (resolveErrorAsFalse) {
        return resolve({ success: false, error: `Error: \n${stderr}` });
      }
      if (stderr) {
        console.log(`Error: \n${stderr}`);
      }
      throw error;
    });
  });
};
