"use strict";
const lineNumber_1 = require("./lineNumber");
class Display {
    constructor(_m) {
        this._model = _m;
        this._frame = document.createElement("div");
        this._lineNumber = new lineNumber_1.LineNumber(0);
    }
    get frame() {
        return this._frame;
    }
}
exports.Display = Display;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L2Rpc3BsYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLDZCQUF5QixjQUV6QixDQUFDLENBRnNDO0FBRXZDO0lBUUksWUFBWSxFQUFjO1FBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBRWpCLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUU1QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksdUJBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztBQUVMLENBQUM7QUFwQlksZUFBTyxVQW9CbkIsQ0FBQSIsImZpbGUiOiJ2aWV3L2Rpc3BsYXkuanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
