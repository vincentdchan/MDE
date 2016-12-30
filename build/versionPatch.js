"use strict";
const code_1 = require("./util/code");
const path = require("path");
const projectPath = path.join(__dirname, "../");
const fileNeedToPatch = [
    "package.json",
    "src/controller/controller.ts"
];
let paths = fileNeedToPatch.map((relativePath) => {
    return path.join(projectPath, relativePath);
});
code_1.versionIncrease(paths, 2);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92ZXJzaW9uUGF0Y2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHVCQUE4QixhQUM5QixDQUFDLENBRDBDO0FBQzNDLE1BQVksSUFBSSxXQUFNLE1BRXRCLENBQUMsQ0FGMkI7QUFFNUIsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFFaEQsTUFBTSxlQUFlLEdBQUc7SUFDcEIsY0FBYztJQUNkLDhCQUE4QjtDQUNqQyxDQUFDO0FBRUYsSUFBSSxLQUFLLEdBQUcsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFlBQW9CO0lBQ2pELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxZQUFZLENBQUMsQ0FBQztBQUNoRCxDQUFDLENBQUMsQ0FBQTtBQUVGLHNCQUFlLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6InZlcnNpb25QYXRjaC5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
