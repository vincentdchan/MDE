"use strict";
class MarkdownLexerState {
    constructor() {
    }
    clone() {
        let state = new MarkdownLexerState();
        state._inBlob = this._inBlob;
        state._inTag = this._inTag;
        state._prefixIndent = this._prefixIndent;
        return state;
    }
    get inBlob() {
        return this._inBlob;
    }
    set inBlob(_t) {
        this._inBlob = _t;
    }
    get inTag() {
        return this._inTag;
    }
    set inTag(_t) {
        this._inTag = _t;
    }
    get prefixIndent() {
        return this._prefixIndent;
    }
    set prefixIndent(_p) {
        this._prefixIndent = _p;
    }
}
exports.MarkdownLexerState = MarkdownLexerState;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFTQTtJQU1JO0lBRUEsQ0FBQztJQUVELEtBQUs7UUFDRCxJQUFJLEtBQUssR0FBRyxJQUFJLGtCQUFrQixFQUFFLENBQUM7UUFDckMsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzdCLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMzQixLQUFLLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDekMsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQUVELElBQUksTUFBTSxDQUFDLEVBQVc7UUFDbEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQUksS0FBSztRQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFJLEtBQUssQ0FBQyxFQUFXO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxJQUFJLFlBQVk7UUFDWixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM5QixDQUFDO0lBRUQsSUFBSSxZQUFZLENBQUMsRUFBVTtRQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztJQUM1QixDQUFDO0FBRUwsQ0FBQztBQTFDWSwwQkFBa0IscUJBMEM5QixDQUFBIiwiZmlsZSI6InZpZXcvaW5kZXguanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
