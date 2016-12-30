import {versionIncrease} from "./util/code"
import * as path from "path"

const projectPath = path.join(__dirname, "../");

const fileNeedToPatch = [
    "package.json",
    "src/controller/controller.ts"
];

let paths = fileNeedToPatch.map((relativePath: string) => {
    return path.join(projectPath, relativePath);
})

versionIncrease(paths, 2);
