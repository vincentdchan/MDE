"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const versionRegex = /"version"\s*:\s*"(\d+.\d+.\d+)"/g;
const versionReplaceRegex = /("version"\s*:\s*")\d+.\d+.\d+"/g;
const numberRegex = /(\d+).(\d+).(\d+)/;
var VersionControl;
(function (VersionControl) {
    class VersionNotMatchError extends Error {
        constructor(globalVersion, currentVersion) {
            super(`VersionNotMatchError: {globalVersion: ${globalVersion}, currentVersion: ${currentVersion}}`);
        }
    }
    VersionControl.VersionNotMatchError = VersionNotMatchError;
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
    VersionControl.parseVersionString = parseVersionString;
    function filterFiles(files) {
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
        return {
            files: fileNeedToPatch,
            currentVersion: globalVersion,
        };
    }
    VersionControl.filterFiles = filterFiles;
    function updateVersionTo(files, version) {
        files.forEach((filename) => {
            let content = fs.readFileSync(filename, "utf8");
            content = content.replace(versionReplaceRegex, "$1" + version + '"');
            fs.writeFileSync(filename, content, {
                encoding: "utf8"
            });
        });
    }
    VersionControl.updateVersionTo = updateVersionTo;
    function versionIncrease(files, index) {
        let filterResult = filterFiles(files);
        let oldVer = parseVersionString(filterResult.currentVersion);
        oldVer[index]++;
        let newVerStr = oldVer.join(".");
        filterResult.files.forEach((filename) => {
            let content = fs.readFileSync(filename, "utf8");
            content = content.replace(versionReplaceRegex, "$1" + newVerStr + '"');
            fs.writeFileSync(filename, content, {
                encoding: "utf8"
            });
        });
    }
    VersionControl.versionIncrease = versionIncrease;
})(VersionControl = exports.VersionControl || (exports.VersionControl = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,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
