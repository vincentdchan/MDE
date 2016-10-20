"use strict";
(function (ChangeOperation) {
    ChangeOperation[ChangeOperation["INSERT"] = 0] = "INSERT";
    ChangeOperation[ChangeOperation["REMOVE"] = 1] = "REMOVE";
})(exports.ChangeOperation || (exports.ChangeOperation = {}));
var ChangeOperation = exports.ChangeOperation;
class Change {
    constructor(_operation, _selection, _text) {
        this._opreation = _operation;
        this._selection = _selection;
        this._text = _text;
        this._next = null;
        this._prev = null;
    }
    get operation() {
        return this._opreation;
    }
    get selection() {
        return this._selection;
    }
    get text() {
        return this._text;
    }
    get next() {
        return this._next;
    }
    set next(_next) {
        this._next = _next;
    }
    get prev() {
        return this._prev;
    }
    set prev(_prev) {
        this._prev = _prev;
    }
}
exports.Change = Change;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2RlbC9jaGFuZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLFdBQVksZUFBZTtJQUN2Qix5REFBTSxDQUFBO0lBQ04seURBQU0sQ0FBQTtBQUNWLENBQUMsRUFIVyx1QkFBZSxLQUFmLHVCQUFlLFFBRzFCO0FBSEQsSUFBWSxlQUFlLEdBQWYsdUJBR1gsQ0FBQTtBQUVEO0lBUUksWUFBWSxVQUE0QixFQUFFLFVBQXNCLEVBQUUsS0FBYztRQUM1RSxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0lBRUQsSUFBSSxTQUFTO1FBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQztJQUVELElBQUksU0FBUztRQUNULE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzNCLENBQUM7SUFFRCxJQUFJLElBQUk7UUFDSixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBRUQsSUFBSSxJQUFJO1FBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQUksSUFBSSxDQUFDLEtBQWM7UUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQUksSUFBSTtRQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUFJLElBQUksQ0FBQyxLQUFjO1FBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7QUFFTCxDQUFDO0FBNUNZLGNBQU0sU0E0Q2xCLENBQUEiLCJmaWxlIjoibW9kZWwvY2hhbmdlLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
