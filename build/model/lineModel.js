"use strict";
const events_1 = require("events");
(function (LineChangedType) {
    LineChangedType[LineChangedType["Insert"] = 0] = "Insert";
    LineChangedType[LineChangedType["Delete"] = 1] = "Delete";
})(exports.LineChangedType || (exports.LineChangedType = {}));
var LineChangedType = exports.LineChangedType;
class LineChangedEvent extends Event {
    constructor(_type, _lineNumber, _start, _end, _data) {
        super("lineChanged");
        this._type = _type;
        this._lineNumber = _lineNumber;
        this._startOffset = _start;
        this._endOffset = _end;
        if (_data) {
            this._data = _data;
        }
    }
    get changedType() {
        return this._type;
    }
    get lineNumber() {
        return this._lineNumber;
    }
    get startOffet() {
        return this._startOffset;
    }
    get endOffset() {
        return this._endOffset;
    }
    get data() {
        return this._data;
    }
}
exports.LineChangedEvent = LineChangedEvent;
class LineModel extends events_1.EventEmitter {
    constructor(_num, _t) {
        super();
        this._number = _num | 0;
        this._text = _t;
    }
    charAt(offset) {
        return this._text.charAt(offset);
    }
    insert(index, content) {
        if (index < 0 || index >= this._text.length)
            throw new Error("Illegal input data when inserting text to LineModel");
        let before = this._text.slice(0, index);
        let after = this._text.slice(index);
        this._text = before + content + after;
        this.emit("insert", new LineChangedEvent(LineChangedType.Insert, this._number, index, index + content.length, content));
    }
    append(content) {
        this._text = this._text + content;
    }
    delete(begin, end) {
        let before = this._text.slice(0, begin);
        let deleted = this._text.slice(begin, end);
        let after = this._text.slice(end);
        this._text = before + after;
        this.emit("delete", new LineChangedEvent(LineChangedType.Delete, this._number, begin, end, deleted));
    }
    deleteToEnd(offset) {
        this._text = this._text.slice(0, offset);
    }
    report() {
        return this._text + "\n";
    }
    get text() {
        return this._text;
    }
    set text(_t) {
        this._text = _t;
    }
    get number() {
        return this._number;
    }
    set number(num) {
        this._number = num;
    }
    get length() {
        return this._text.length;
    }
}
exports.LineModel = LineModel;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2RlbC9saW5lTW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHlCQUEyQixRQUUzQixDQUFDLENBRmtDO0FBRW5DLFdBQVksZUFBZTtJQUN2Qix5REFBTSxDQUFBO0lBQUUseURBQU0sQ0FBQTtBQUNsQixDQUFDLEVBRlcsdUJBQWUsS0FBZix1QkFBZSxRQUUxQjtBQUZELElBQVksZUFBZSxHQUFmLHVCQUVYLENBQUE7QUFFRCwrQkFBc0MsS0FBSztJQVF2QyxZQUFZLEtBQXVCLEVBQUUsV0FBb0IsRUFBRSxNQUFlLEVBQUUsSUFBWSxFQUFFLEtBQWU7UUFDckcsTUFBTSxhQUFhLENBQUMsQ0FBQztRQUVyQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQztRQUMzQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDdkIsQ0FBQztJQUNMLENBQUM7SUFFRCxJQUFJLFdBQVc7UUFDWCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBRUQsSUFBSSxVQUFVO1FBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDNUIsQ0FBQztJQUVELElBQUksVUFBVTtRQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzdCLENBQUM7SUFFRCxJQUFJLFNBQVM7UUFDVCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDO0lBRUQsSUFBSSxJQUFJO1FBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztBQUVMLENBQUM7QUF4Q1ksd0JBQWdCLG1CQXdD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
