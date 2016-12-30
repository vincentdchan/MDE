"use strict";
const fs = require("fs");
const versionRegex = /"version"\s*:\s*"(\d+.\d+.\d+)"/g;
const versionReplaceRegex = /("version"\s*:\s*")\d+.\d+.\d+"/g;
const numberRegex = /(\d+).(\d+).(\d+)/;
class VersionNotMatchError extends Error {
    constructor(globalVersion, currentVersion) {
        super(`VersionNotMatchError: {globalVersion: ${globalVersion}, currentVersion: ${currentVersion}}`);
    }
}
exports.VersionNotMatchError = VersionNotMatchError;
function parseVersionString(content) {
    let result = [];
    let regexResult = numberRegex.exec(content);
    if (regexResult === null)
        throw new Error(`Not valid version string: ${content}`);
    result.push(parseInt(regexResult[1]));
    result.push(parseInt(regexResult[2]));
    result.push(parseInt(regexResult[3]));
    return result;
}
function versionIncrease(files, index) {
    let fileNeedToPatch = [];
    let regexResult;
    let globalVersion;
    files.forEach((filename) => {
        let content = fs.readFileSync(filename, "utf8");
        regexResult = versionRegex.exec(content);
        if (regexResult === null)
            return;
        do {
            let version = regexResult[1];
            if (globalVersion === undefined) {
                globalVersion = version;
            }
            else if (version != globalVersion) {
                throw new VersionNotMatchError(globalVersion, version);
            }
        } while ((regexResult = versionRegex.exec(content)) !== null);
        fileNeedToPatch.push(filename);
    });
    console.log(fileNeedToPatch);
    let oldVer = parseVersionString(globalVersion);
    oldVer[index]++;
    let newVerStr = oldVer.join(".");
    fileNeedToPatch.forEach((filename) => {
        let content = fs.readFileSync(filename, "utf8");
        content = content.replace(versionReplaceRegex, "$1" + newVerStr + '"');
        fs.writeFileSync(filename, content, {
            encoding: "utf8"
        });
    });
}
exports.versionIncrease = versionIncrease;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsL2NvZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQVksRUFBRSxXQUFNLElBRXBCLENBQUMsQ0FGdUI7QUFFeEIsTUFBTSxZQUFZLEdBQUcsa0NBQWtDLENBQUM7QUFDeEQsTUFBTSxtQkFBbUIsR0FBRyxrQ0FBa0MsQ0FBQztBQUMvRCxNQUFNLFdBQVcsR0FBRyxtQkFBbUIsQ0FBQztBQUV4QyxtQ0FBMEMsS0FBSztJQUUzQyxZQUFZLGFBQWEsRUFBRSxjQUFjO1FBQ3JDLE1BQU0seUNBQXlDLGFBQWEscUJBQXFCLGNBQWMsR0FBRyxDQUFDLENBQUM7SUFDeEcsQ0FBQztBQUVMLENBQUM7QUFOWSw0QkFBb0IsdUJBTWhDLENBQUE7QUFFRCw0QkFBNEIsT0FBZTtJQUN2QyxJQUFJLE1BQU0sR0FBYyxFQUFFLENBQUM7SUFDM0IsSUFBSSxXQUFXLEdBQXFCLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFOUQsRUFBRSxDQUFDLENBQUMsV0FBVyxLQUFLLElBQUksQ0FBQztRQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsNkJBQTZCLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFFbEYsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0QyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEMsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBRUQseUJBQWdDLEtBQWUsRUFBRSxLQUFhO0lBRTFELElBQUksZUFBZSxHQUFhLEVBQUUsQ0FBQztJQUNuQyxJQUFJLFdBQTZCLENBQUM7SUFDbEMsSUFBSSxhQUFxQixDQUFDO0lBRTFCLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFnQjtRQUMzQixJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUVoRCxXQUFXLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6QyxFQUFFLENBQUMsQ0FBQyxXQUFXLEtBQUssSUFBSSxDQUFDO1lBQUMsTUFBTSxDQUFDO1FBRWpDLEdBQUcsQ0FBQztZQUNBLElBQUksT0FBTyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUU3QixFQUFFLENBQUMsQ0FBQyxhQUFhLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDOUIsYUFBYSxHQUFHLE9BQU8sQ0FBQztZQUM1QixDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxhQUFhLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxNQUFNLElBQUksb0JBQW9CLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQzNELENBQUM7UUFDTCxDQUFDLFFBQVEsQ0FBQyxXQUFXLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLElBQUksRUFBQztRQUM3RCxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQyxDQUFBO0lBRUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUM3QixJQUFJLE1BQU0sR0FBRyxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMvQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztJQUNoQixJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWpDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFnQjtRQUNyQyxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUVoRCxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLEdBQUcsU0FBUyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBRXZFLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRTtZQUNoQyxRQUFRLEVBQUUsTUFBTTtTQUNuQixDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUVQLENBQUM7QUF2Q2UsdUJBQWUsa0JBdUM5QixDQUFBIiwiZmlsZSI6InV0aWwvY29kZS5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
