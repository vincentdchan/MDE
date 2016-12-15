"use strict";
class MarkdownLineState {
    constructor() {
        this._is_bold = false;
        this._is_italic = false;
        this._is_blockquote = false;
        this._title_level = 0;
    }
    copy() {
        let newObj = new MarkdownLineState();
        newObj.isBold = this._is_bold;
    }
    get isBold() { return this._is_bold; }
    set isBold(v) { this._is_bold = v; }
    get isItalic() { return this._is_italic; }
    set isItalic(v) { this._is_italic = v; }
    get isBlockquote() { return this._is_blockquote; }
    set isBlockquote(v) { this._is_blockquote = v; }
    get titleLevel() { return this._title_level; }
    set titleLevel(v) { this._title_level = v; }
}
exports.MarkdownLineState = MarkdownLineState;
(function (WordType) {
    WordType[WordType["Normal"] = 0] = "Normal";
    WordType[WordType["Bold"] = 1] = "Bold";
    WordType[WordType["Italic"] = 2] = "Italic";
    WordType[WordType["HeadingStart"] = 3] = "HeadingStart";
})(exports.WordType || (exports.WordType = {}));
var WordType = exports.WordType;
(function (LineType) {
    LineType[LineType["H1"] = 0] = "H1";
    LineType[LineType["H2"] = 1] = "H2";
    LineType[LineType["H3"] = 2] = "H3";
    LineType[LineType["Blockquote"] = 3] = "Blockquote";
})(exports.LineType || (exports.LineType = {}));
var LineType = exports.LineType;
class LineStateUpdateEvent extends Event {
    constructor(line) {
        super("lineStateUpdate");
        this._line = line;
    }
    get line() {
        return this._line;
    }
}
exports.LineStateUpdateEvent = LineStateUpdateEvent;
class LineStateManager {
    constructor() {
        this._array = [];
    }
    register(num, content, callback) {
        let state = new MarkdownLineState();
        this._array[num] = {
            content: content,
            state: state,
            callback: callback
        };
    }
    unregister(num) {
        this._array[num] = null;
    }
}
exports.LineStateManager = LineStateManager;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2RlbC9saW5lU3RhdGVNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQTtJQU9JO1FBTFEsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixlQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLG1CQUFjLEdBQVksS0FBSyxDQUFDO1FBQ2hDLGlCQUFZLEdBQVcsQ0FBQyxDQUFDO0lBSWpDLENBQUM7SUFFRCxJQUFJO1FBQ0EsSUFBSSxNQUFNLEdBQUcsSUFBSSxpQkFBaUIsRUFBRSxDQUFDO1FBRXJDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNsQyxDQUFDO0lBRUQsSUFBSSxNQUFNLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ3RDLElBQUksTUFBTSxDQUFDLENBQVUsSUFBSSxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFN0MsSUFBSSxRQUFRLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQzFDLElBQUksUUFBUSxDQUFDLENBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFakQsSUFBSSxZQUFZLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO0lBQ2xELElBQUksWUFBWSxDQUFDLENBQVUsSUFBSSxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFekQsSUFBSSxVQUFVLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO0lBQzlDLElBQUksVUFBVSxDQUFDLENBQVMsSUFBSSxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFFeEQsQ0FBQztBQTdCWSx5QkFBaUIsb0JBNkI3QixDQUFBO0FBRUQsV0FBWSxRQUFRO0lBQ2hCLDJDQUFNLENBQUE7SUFBRSx1Q0FBSSxDQUFBO0lBQUUsMkNBQU0sQ0FBQTtJQUFFLHVEQUFZLENBQUE7QUFDdEMsQ0FBQyxFQUZXLGdCQUFRLEtBQVIsZ0JBQVEsUUFFbkI7QUFGRCxJQUFZLFFBQVEsR0FBUixnQkFFWCxDQUFBO0FBRUQsV0FBWSxRQUFRO0lBQ2hCLG1DQUFFLENBQUE7SUFBRSxtQ0FBRSxDQUFBO0lBQUUsbUNBQUUsQ0FBQTtJQUFFLG1EQUFVLENBQUE7QUFDMUIsQ0FBQyxFQUZXLGdCQUFRLEtBQVIsZ0JBQVEsUUFFbkI7QUFGRCxJQUFZLFFBQVEsR0FBUixnQkFFWCxDQUFBO0FBWUQsbUNBQTBDLEtBQUs7SUFJM0MsWUFBWSxJQUFXO1FBQ25CLE1BQU0saUJBQWlCLENBQUMsQ0FBQztRQUV6QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0lBRUQsSUFBSSxJQUFJO1FBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztBQUVMLENBQUM7QUFkWSw0QkFBb0IsdUJBY2hDLENBQUE7QUFZRDtJQUlJO1FBRlEsV0FBTSxHQUFnQixFQUFFLENBQUM7SUFHakMsQ0FBQztJQUVELFFBQVEsQ0FBQyxHQUFXLEVBQUUsT0FBZSxFQUFFLFFBQWlDO1FBQ3BFLElBQUksS0FBSyxHQUFHLElBQUksaUJBQWlCLEVBQUUsQ0FBQztRQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHO1lBQ2YsT0FBTyxFQUFFLE9BQU87WUFDaEIsS0FBSyxFQUFFLEtBQUs7WUFDWixRQUFRLEVBQUUsUUFBUTtTQUNyQixDQUFDO0lBQ04sQ0FBQztJQUVELFVBQVUsQ0FBQyxHQUFXO1FBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQzVCLENBQUM7QUFFTCxDQUFDO0FBcEJZLHdCQUFnQixtQkFvQjVCLENBQUEiLCJmaWxlIjoibW9kZWwvbGluZVN0YXRlTWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
