"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChangeOperation;
(function (ChangeOperation) {
    ChangeOperation[ChangeOperation["INSERT"] = 0] = "INSERT";
    ChangeOperation[ChangeOperation["REMOVE"] = 1] = "REMOVE";
})(ChangeOperation = exports.ChangeOperation || (exports.ChangeOperation = {}));
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2RlbC9jaGFuZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxJQUFZLGVBR1g7QUFIRCxXQUFZLGVBQWU7SUFDdkIseURBQU0sQ0FBQTtJQUNOLHlEQUFNLENBQUE7QUFDVixDQUFDLEVBSFcsZUFBZSxHQUFmLHVCQUFlLEtBQWYsdUJBQWUsUUFHMUI7QUFFRDtJQVFJLFlBQVksVUFBNEIsRUFBRSxVQUFzQixFQUFFLEtBQWM7UUFDNUUsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQUksU0FBUztRQUNULE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzNCLENBQUM7SUFFRCxJQUFJLFNBQVM7UUFDVCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDO0lBRUQsSUFBSSxJQUFJO1FBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQUksSUFBSTtRQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUFJLElBQUksQ0FBQyxLQUFjO1FBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFJLElBQUk7UUFDSixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBRUQsSUFBSSxJQUFJLENBQUMsS0FBYztRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0NBRUo7QUE1Q0Qsd0JBNENDIiwiZmlsZSI6Im1vZGVsL2NoYW5nZS5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
