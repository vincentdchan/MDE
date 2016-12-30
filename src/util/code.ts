import * as fs from "fs"

const versionRegex = /"version"\s*:\s*"(\d+.\d+.\d+)"/g;
const versionReplaceRegex = /("version"\s*:\s*")\d+.\d+.\d+"/g;
const numberRegex = /(\d+).(\d+).(\d+)/;

export class VersionNotMatchError extends Error {

    constructor(globalVersion, currentVersion) {
        super(`VersionNotMatchError: {globalVersion: ${globalVersion}, currentVersion: ${currentVersion}}`);
    }

}

function parseVersionString(content: string): number[] {
    let result : number[] = [];
    let regexResult : RegExpExecArray = numberRegex.exec(content);

    if (regexResult === null) throw new Error(`Not valid version string: ${content}`);

    result.push(parseInt(regexResult[1]));
    result.push(parseInt(regexResult[2]));
    result.push(parseInt(regexResult[3]));
    return result;
}

export function versionIncrease(files: string[], index: number) {

    let fileNeedToPatch: string[] = [];
    let regexResult : RegExpExecArray;
    let globalVersion: string;

    files.forEach((filename: string) => {
        let content = fs.readFileSync(filename, "utf8");

        regexResult = versionRegex.exec(content);
        if (regexResult === null) return;

        do {
            let version = regexResult[1];

            if (globalVersion === undefined) {
                globalVersion = version;
            } else if (version != globalVersion) {
                throw new VersionNotMatchError(globalVersion, version);
            }
        } while ((regexResult = versionRegex.exec(content)) !== null)
        fileNeedToPatch.push(filename);
    })

    console.log(fileNeedToPatch);
    let oldVer = parseVersionString(globalVersion);
    oldVer[index]++;
    let newVerStr = oldVer.join(".");

    fileNeedToPatch.forEach((filename: string) => {
        let content = fs.readFileSync(filename, "utf8");

        content = content.replace(versionReplaceRegex, "$1" + newVerStr + '"');

        fs.writeFileSync(filename, content, {
            encoding: "utf8"
        });
    });

}
