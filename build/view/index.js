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
var viewLeftPanel_1 = require("./viewLeftPanel");
exports.LeftPanelView = viewLeftPanel_1.LeftPanelView;
var viewWindow_1 = require("./viewWindow");
exports.WindowView = viewWindow_1.WindowView;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw2QkFBMkIsZ0JBQzNCLENBQUM7QUFETyxtREFBbUM7QUFDM0MseUJBQXVCLFlBQ3ZCLENBQUM7QUFETyx1Q0FBMkI7QUFDbkMseUJBQXVCLFlBQ3ZCLENBQUM7QUFETyx1Q0FBMkI7QUFDbkMsMkJBQXlCLGNBQ3pCLENBQUM7QUFETyw2Q0FBK0I7QUFDdkMsMkJBQXlCLGNBQ3pCLENBQUM7QUFETyw2Q0FBK0I7QUFDdkMsNEJBQTBCLGVBQzFCLENBQUM7QUFETyxnREFBaUM7QUFDekMsOEJBQTRCLGlCQUM1QixDQUFDO0FBRE8sc0RBQXFDO0FBQzdDLDJCQUF5QixjQUV6QixDQUFDO0FBRk8sNkNBQStCO0FBZXZDO0lBTUk7SUFFQSxDQUFDO0lBRUQsS0FBSztRQUNELElBQUksS0FBSyxHQUFHLElBQUksa0JBQWtCLEVBQUUsQ0FBQztRQUNyQyxLQUFLLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDN0IsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzNCLEtBQUssQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUN6QyxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxJQUFJLE1BQU07UUFDTixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBRUQsSUFBSSxNQUFNLENBQUMsRUFBVztRQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQUksS0FBSyxDQUFDLEVBQVc7UUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELElBQUksWUFBWTtRQUNaLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzlCLENBQUM7SUFFRCxJQUFJLFlBQVksQ0FBQyxFQUFVO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO0lBQzVCLENBQUM7QUFFTCxDQUFDO0FBMUNZLDBCQUFrQixxQkEwQzlCLENBQUE7QUFFRCxXQUFZLGdCQUFnQjtJQUN4Qix1REFBSSxDQUFBO0lBQUUsaUVBQVMsQ0FBQTtJQUFFLDJEQUFNLENBQUE7QUFDM0IsQ0FBQyxFQUZXLHdCQUFnQixLQUFoQix3QkFBZ0IsUUFFM0I7QUFGRCxJQUFZLGdCQUFnQixHQUFoQix3QkFFWCxDQUFBIiwiZmlsZSI6InZpZXcvaW5kZXguanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
