import path from "path";
import fs from "fs/promises";

type Method = {
    method: string;
    statusCodes: string[];
    supported: boolean;
}

type Endpoint = {
    endpoint: string;
    methods: Method[];
};

const main = async () => {
    const openApiPath = path.join(__dirname, "../reference/OpenAPI.json");
    const openAPIContent = JSON.parse(
        (await fs.readFile(openApiPath)).toString()
    );

    const paths = Object.keys(openAPIContent.paths);
    console.log(paths);


}


main();
