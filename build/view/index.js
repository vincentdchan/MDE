"use strict";
var viewDocument_1 = require("./viewDocument");
exports.DocumentView = viewDocument_1.DocumentView;
var viewLine_1 = require("./viewLine");
exports.LineView = viewLine_1.LineView;
var viewWord_1 = require("./viewWord");
exports.WordView = viewWord_1.WordView;
var viewCursor_1 = require("./viewCursor");
exports.CursorView = viewCursor_1.CursorView;
var viewEditor_1 = require("./viewEditor");
exports.EditorView = viewEditor_1.EditorView;
var viewInputer_1 = require("./viewInputer");
exports.InputerView = viewInputer_1.InputerView;
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
(function (HighlightingType) {
    HighlightingType[HighlightingType["Bold"] = 0] = "Bold";
    HighlightingType[HighlightingType["Underline"] = 1] = "Underline";
    HighlightingType[HighlightingType["Italic"] = 2] = "Italic";
})(exports.HighlightingType || (exports.HighlightingType = {}));
var HighlightingType = exports.HighlightingType;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw2QkFBMkIsZ0JBQzNCLENBQUM7QUFETyxtREFBbUM7QUFDM0MseUJBQXVCLFlBQ3ZCLENBQUM7QUFETyx1Q0FBMkI7QUFDbkMseUJBQXVCLFlBQ3ZCLENBQUM7QUFETyx1Q0FBMkI7QUFDbkMsMkJBQXlCLGNBQ3pCLENBQUM7QUFETyw2Q0FBK0I7QUFDdkMsMkJBQXlCLGNBQ3pCLENBQUM7QUFETyw2Q0FBK0I7QUFDdkMsNEJBQTBCLGVBRTFCLENBQUM7QUFGTyxnREFBaUM7QUFlekM7SUFNSTtJQUVBLENBQUM7SUFFRCxLQUFLO1FBQ0QsSUFBSSxLQUFLLEdBQUcsSUFBSSxrQkFBa0IsRUFBRSxDQUFDO1FBQ3JDLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM3QixLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDM0IsS0FBSyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQ3pDLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVELElBQUksTUFBTTtRQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFJLE1BQU0sQ0FBQyxFQUFXO1FBQ2xCLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSSxLQUFLLENBQUMsRUFBVztRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsSUFBSSxZQUFZO1FBQ1osTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDOUIsQ0FBQztJQUVELElBQUksWUFBWSxDQUFDLEVBQVU7UUFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7SUFDNUIsQ0FBQztBQUVMLENBQUM7QUExQ1ksMEJBQWtCLHFCQTBDOUIsQ0FBQTtBQUVELFdBQVksZ0JBQWdCO0lBQ3hCLHVEQUFJLENBQUE7SUFBRSxpRUFBUyxDQUFBO0lBQUUsMkRBQU0sQ0FBQTtBQUMzQixDQUFDLEVBRlcsd0JBQWdCLEtBQWhCLHdCQUFnQixRQUUzQjtBQUZELElBQVksZ0JBQWdCLEdBQWhCLHdCQUVYLENBQUEiLCJmaWxlIjoidmlldy9pbmRleC5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
