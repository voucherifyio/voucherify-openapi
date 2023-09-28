import fs from 'fs/promises';
import path from 'path';

function isObject(value) {
    return (
      typeof value === 'object' &&
      value !== null &&
      !Array.isArray(value)
    );
  }

const removeStoplightTag = (node: object): object => {
    delete node['x-stoplight'];
    for(const attr in node){
        if(isObject(node[attr])){
            removeStoplightTag(node[attr])
        }
    }
    return node;
}

const main = async() => {
    const openApiPath = path.join(__dirname, '../reference/OpenAPI.json');
    const openAPIContent = JSON.parse((await fs.readFile(openApiPath)).toString())

    removeStoplightTag(openAPIContent)

    await fs.writeFile(openApiPath, JSON.stringify(openAPIContent, null, 2) )
}

main()