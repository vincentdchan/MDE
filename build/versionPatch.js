"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92ZXJzaW9uUGF0Y2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFDMUMsNkJBQTRCO0FBQzVCLHFDQUFvQztBQUVwQyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUVoRCxNQUFNLGVBQWUsR0FBRztJQUNwQixjQUFjO0lBQ2QsOEJBQThCO0NBQ2pDLENBQUM7QUFFRixJQUFJLEtBQUssR0FBRyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsWUFBb0I7SUFDakQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQ2hELENBQUMsQ0FBQyxDQUFBO0FBRUYsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQztJQUNoQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7SUFDcEIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNO0NBQ3pCLENBQUMsQ0FBQztBQUVILElBQUksWUFBWSxHQUFHLHFCQUFjLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBRXJELElBQUksU0FBUyxHQUFHLHFCQUFjLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQy9FLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ2YsSUFBSSxVQUFVLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUVyQyxFQUFFLENBQUMsUUFBUSxDQUFDLHNCQUFzQixVQUFVLEdBQUcsRUFBRSxDQUFDLE1BQWM7SUFDNUQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLHFCQUFjLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ0osSUFBSSxXQUFxQixDQUFDO1FBQzFCLElBQUksQ0FBQztZQUNELFdBQVcsR0FBRyxxQkFBYyxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVELENBQUM7UUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1QsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQixDQUFDO1FBQ0QscUJBQWMsQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDOUUsQ0FBQztJQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNmLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6InZlcnNpb25QYXRjaC5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
