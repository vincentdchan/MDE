"use strict";
const dom_1 = require("../util/dom");
class LineNumber {
    constructor(_num) {
        this._total_number = _num;
        this._frame = dom_1.elem("div", "linenumber-frame");
    }
    get total_number() {
        return this._total_number;
    }
    set total_number(tn) {
        throw new Error("not implemented");
    }
    get frame() {
        return this._frame;
    }
}
exports.LineNumber = LineNumber;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L2xpbmVOdW1iZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNCQUFtQixhQUVuQixDQUFDLENBRitCO0FBRWhDO0lBS0ksWUFBWSxJQUFhO1FBQ3JCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBRTFCLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBSSxDQUFDLEtBQUssRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxJQUFJLFlBQVk7UUFDWixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM5QixDQUFDO0lBRUQsSUFBSSxZQUFZLENBQUMsRUFBVztRQUN4QixNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELElBQUksS0FBSztRQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7QUFFTCxDQUFDO0FBdkJZLGtCQUFVLGFBdUJ0QixDQUFBIiwiZmlsZSI6InZpZXcvbGluZU51bWJlci5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
