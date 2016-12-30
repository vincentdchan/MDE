"use strict";
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
