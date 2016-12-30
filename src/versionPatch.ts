import {VersionControl} from "./util/code"
import * as path from "path"
import * as readline from "readline"

const projectPath = path.join(__dirname, "../");

const fileNeedToPatch = [
    "package.json",
    "src/controller/controller.ts"
];

let paths = fileNeedToPatch.map((relativePath: string) => {
    return path.join(projectPath, relativePath);
})

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let filterResult = VersionControl.filterFiles(paths);

let defaultRe = VersionControl.parseVersionString(filterResult.currentVersion);
defaultRe[2]++;
let defaultVer = defaultRe.join(".");

rl.question(`Version: (default: ${defaultVer})`, (answer: string) => {
    if (answer.length === 0) {
        VersionControl.updateVersionTo(filterResult.files, defaultVer);
    } else {
        let parseResult: number[];
        try {
            parseResult = VersionControl.parseVersionString(answer);
        } catch (e) {
            console.error(e);
        }
        VersionControl.updateVersionTo(filterResult.files, parseResult.join("."));
    }
    console.log(filterResult.files);
    rl.close();
});
