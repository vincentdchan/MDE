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
