"use strict";
class LineNumber {
    constructor(_num) {
        this._total_number = _num;
        this._frame = document.createElement("div");
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L2xpbmVOdW1iZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBO0lBS0ksWUFBWSxJQUFhO1FBQ3JCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBRTFCLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsSUFBSSxZQUFZO1FBQ1osTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDOUIsQ0FBQztJQUVELElBQUksWUFBWSxDQUFDLEVBQVc7UUFDeEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0FBRUwsQ0FBQztBQXZCWSxrQkFBVSxhQXVCdEIsQ0FBQSIsImZpbGUiOiJ2aWV3L2xpbmVOdW1iZXIuanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
