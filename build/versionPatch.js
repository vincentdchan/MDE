"use strict";
const code_1 = require("./util/code");
const path = require("path");
const readline = require("readline");
const projectPath = path.join(__dirname, "../");
const fileNeedToPatch = [
    "package.json",
    "src/controller/controller.ts"
];
let paths = fileNeedToPatch.map((relativePath) => {
    return path.join(projectPath, relativePath);
});
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
let filterResult = code_1.VersionControl.filterFiles(paths);
let defaultRe = code_1.VersionControl.parseVersionString(filterResult.currentVersion);
defaultRe[2]++;
let defaultVer = defaultRe.join(".");
rl.question(`Version: (default: ${defaultVer})`, (answer) => {
    if (answer.length === 0) {
        code_1.VersionControl.updateVersionTo(filterResult.files, defaultVer);
    }
    else {
        let parseResult;
        try {
            parseResult = code_1.VersionControl.parseVersionString(answer);
        }
        catch (e) {
            console.error(e);
        }
        code_1.VersionControl.updateVersionTo(filterResult.files, parseResult.join("."));
    }
    console.log(filterResult.files);
    rl.close();
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92ZXJzaW9uUGF0Y2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUEwQztBQUMxQyw2QkFBNEI7QUFDNUIscUNBQW9DO0FBRXBDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBRWhELE1BQU0sZUFBZSxHQUFHO0lBQ3BCLGNBQWM7SUFDZCw4QkFBOEI7Q0FDakMsQ0FBQztBQUVGLElBQUksS0FBSyxHQUFHLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxZQUFvQjtJQUNqRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDaEQsQ0FBQyxDQUFDLENBQUE7QUFFRixNQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsZUFBZSxDQUFDO0lBQ2hDLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSztJQUNwQixNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU07Q0FDekIsQ0FBQyxDQUFDO0FBRUgsSUFBSSxZQUFZLEdBQUcscUJBQWMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7QUFFckQsSUFBSSxTQUFTLEdBQUcscUJBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDL0UsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDZixJQUFJLFVBQVUsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBRXJDLEVBQUUsQ0FBQyxRQUFRLENBQUMsc0JBQXNCLFVBQVUsR0FBRyxFQUFFLENBQUMsTUFBYztJQUM1RCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEIscUJBQWMsQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDSixJQUFJLFdBQXFCLENBQUM7UUFDMUIsSUFBSSxDQUFDO1lBQ0QsV0FBVyxHQUFHLHFCQUFjLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUQsQ0FBQztRQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDVCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLENBQUM7UUFDRCxxQkFBYyxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ2YsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoidmVyc2lvblBhdGNoLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
