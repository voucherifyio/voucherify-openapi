import fsPromises from "fs/promises";

export const getFiles = async (
  path: string,
  skipDirectoryNames: string[] = []
) => {
  const pathsToFiles: string[] = [];
  const items = await fsPromises.readdir(path, {
    withFileTypes: true,
  });
  for (const item of items) {
    const itemPath = path + `/${item.name}`;
    if (item.isDirectory() && !skipDirectoryNames.includes(item.name)) {
      (await getFiles(itemPath, skipDirectoryNames)).forEach((value) => {
        pathsToFiles.push(value);
      });
      continue;
    }
    if (!item.isDirectory()) {
      pathsToFiles.push(itemPath);
    }
  }
  return pathsToFiles;
};
