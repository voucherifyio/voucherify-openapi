import fs from "fs";
import path from "path";
import fsPromises from "fs/promises";

const readSdkVersion = (filePath) => {
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");

    const sdkVersionRegex = /VERSION = '([\d.]+)/;
    const sdkVersionMatch = fileContent.match(sdkVersionRegex);
    return sdkVersionMatch?.[1];
  } catch (error) {
    console.error(`Could not read file: ${error.message}`);
    return;
  }
};

const updateDockerFile = async (filePath: string, version: string) => {
  const fileContent = fs.readFileSync(filePath, "utf8");
  const searchPattern = /RUN gem install voucherify-\d+\.\d+\.\d+\.gem/;
  const replacement = `RUN gem install voucherify-${version}.gem`;
  const updatedFileContent = fileContent.replace(searchPattern, replacement);
  await fsPromises.writeFile(filePath, updatedFileContent);
  console.log("Ruby Dockerfile successfully updated.");
};

const rubyFilePath = path.join(
  __dirname,
  "../sdks/ruby/lib/VoucherifySdk/version.rb",
);
const dockerfileFilePath = path.join(__dirname, "../sdks/ruby/Dockerfile");

const sdkVersion = readSdkVersion(rubyFilePath);
if (sdkVersion) {
  updateDockerFile(dockerfileFilePath, sdkVersion);
}
