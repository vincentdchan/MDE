"use strict";
const util_1 = require("../util");
class WindowView extends util_1.DomHelper.AppendableDomWrapper {
    constructor() {
        super("div");
        this.requestWindowSize();
        window.addEventListener("resize", (e) => {
            this.requestWindowSize();
        });
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    requestWindowSize() {
        this._width = window.innerWidth;
        this._height = window.innerHeight;
    }
}
exports.WindowView = WindowView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdXaW5kb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHVCQUF3QixTQUV4QixDQUFDLENBRmdDO0FBRWpDLHlCQUFnQyxnQkFBUyxDQUFDLG9CQUFvQjtJQUsxRDtRQUNJLE1BQU0sS0FBSyxDQUFDLENBQUM7UUFFYixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUV6QixNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBUztZQUV4QyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUU3QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQUVPLGlCQUFpQjtRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO0lBQ3RDLENBQUM7QUFFTCxDQUFDO0FBOUJZLGtCQUFVLGFBOEJ0QixDQUFBIiwiZmlsZSI6InZpZXcvdmlld1dpbmRvdy5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
