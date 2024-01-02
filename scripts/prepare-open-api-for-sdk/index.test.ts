import fs from 'fs/promises';
import path from 'path'
import {exec} from 'child_process' ;

function execShellCommand(cmd) {
    return new Promise((resolve, reject) => {
     exec(cmd, (error, stdout, stderr) => {
      if (error) {
       console.warn(error);
      }
      resolve(stdout? stdout : stderr);
     });
    });
   }

describe('compare open-api file', () => {
  test('ruby', async () => {
    const openApiPath = path.join(__dirname, '../../tmp/reference/ruby/OpenAPI.json')
    try{
      await fs.unlink(openApiPath)
    }catch(e){
      // File does not exists 
    }
    await execShellCommand('npm run prepare-open-api-for-sdk -- --language=ruby')
    const openApiSchem = (await fs.readFile(openApiPath)).toString()
    expect(openApiSchem).toMatchSnapshot();
  });
  test('python', async () => {
    const openApiPath = path.join(__dirname, '../../tmp/reference/python/OpenAPI.json')
    try{
      await fs.unlink(openApiPath)
    }catch(e){
      // File does not exists 
    }
    await execShellCommand('npm run prepare-open-api-for-sdk -- --language=python')
    const openApiSchem = (await fs.readFile(openApiPath)).toString()
    expect(openApiSchem).toMatchSnapshot();
  });
});