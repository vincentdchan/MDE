"use strict";
var viewDocument_1 = require("./viewDocument");
exports.DocumentView = viewDocument_1.DocumentView;
var viewLine_1 = require("./viewLine");
exports.LineView = viewLine_1.LineView;
var viewWord_1 = require("./viewWord");
exports.WordView = viewWord_1.WordView;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw2QkFBMkIsZ0JBQzNCLENBQUM7QUFETyxtREFBbUM7QUFDM0MseUJBQXVCLFlBQ3ZCLENBQUM7QUFETyx1Q0FBMkI7QUFDbkMseUJBQXVCLFlBRXZCLENBQUM7QUFGTyx1Q0FBMkI7QUFVbkM7SUFNSTtJQUVBLENBQUM7SUFFRCxLQUFLO1FBQ0QsSUFBSSxLQUFLLEdBQUcsSUFBSSxrQkFBa0IsRUFBRSxDQUFDO1FBQ3JDLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM3QixLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDM0IsS0FBSyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQ3pDLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVELElBQUksTUFBTTtRQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFJLE1BQU0sQ0FBQyxFQUFXO1FBQ2xCLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSSxLQUFLLENBQUMsRUFBVztRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsSUFBSSxZQUFZO1FBQ1osTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDOUIsQ0FBQztJQUVELElBQUksWUFBWSxDQUFDLEVBQVU7UUFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7SUFDNUIsQ0FBQztBQUVMLENBQUM7QUExQ1ksMEJBQWtCLHFCQTBDOUIsQ0FBQSIsImZpbGUiOiJ2aWV3L2luZGV4LmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
