"use strict";
var textModel_1 = require("./textModel");
exports.TextModel = textModel_1.TextModel;
exports.TextEditEvent = textModel_1.TextEditEvent;
var lineModel_1 = require("./lineModel");
exports.LineModel = lineModel_1.LineModel;
var lineStream_1 = require("./lineStream");
exports.LineStream = lineStream_1.LineStream;
var textEdit_1 = require("./textEdit");
exports.TextEdit = textEdit_1.TextEdit;
exports.TextEditType = textEdit_1.TextEditType;
var bufferState_1 = require("./bufferState");
exports.BufferState = bufferState_1.BufferState;
exports.BufferStateChanged = bufferState_1.BufferStateChanged;
exports.BufferAbsPathChanged = bufferState_1.BufferAbsPathChanged;
function isPosition(obj) {
    return "line" in obj && "offset" in obj;
}
exports.isPosition = isPosition;
function isRange(obj) {
    return "begin" in obj && "end" in obj;
}
exports.isRange = isRange;
var PositionUtil;
(function (PositionUtil) {
    function clonePosition(pos) {
        return {
            line: pos.line,
            offset: pos.offset
        };
    }
    PositionUtil.clonePosition = clonePosition;
    function equalPostion(pos1, pos2) {
        return pos1.line === pos2.line && pos1.offset === pos2.offset;
    }
    PositionUtil.equalPostion = equalPostion;
    function greaterPosition(pos1, pos2) {
        return (pos1.line > pos2.line) ||
            ((pos1.line === pos2.line) && (pos1.offset > pos2.offset));
    }
    PositionUtil.greaterPosition = greaterPosition;
    function comparePosition(pos1, pos2) {
        if (pos1.line === pos2.line) {
            return pos1.offset - pos2.offset;
        }
        else {
            return pos1.line - pos2.line;
        }
    }
    PositionUtil.comparePosition = comparePosition;
})(PositionUtil = exports.PositionUtil || (exports.PositionUtil = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2RlbC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEJBQXVDLGFBQ3ZDLENBQUM7QUFETywwQ0FBUztBQUFFLGtEQUFpQztBQUNwRCwwQkFBd0IsYUFDeEIsQ0FBQztBQURPLDBDQUE2QjtBQUNyQywyQkFBc0MsY0FDdEMsQ0FBQztBQURPLDZDQUE0QztBQUNwRCx5QkFBc0QsWUFDdEQsQ0FBQztBQURPLHVDQUFRO0FBQUUsK0NBQWdEO0FBQ2xFLDRCQUFvRSxlQUVwRSxDQUFDO0FBRk8sZ0RBQVc7QUFBRSw4REFBa0I7QUFBRSxrRUFBMEM7QUFZbkYsb0JBQTJCLEdBQVM7SUFDaEMsTUFBTSxDQUFDLE1BQU0sSUFBSSxHQUFHLElBQUksUUFBUSxJQUFJLEdBQUcsQ0FBQztBQUM1QyxDQUFDO0FBRmUsa0JBQVUsYUFFekIsQ0FBQTtBQUVELGlCQUF3QixHQUFRO0lBQzVCLE1BQU0sQ0FBQyxPQUFPLElBQUksR0FBRyxJQUFJLEtBQUssSUFBSSxHQUFHLENBQUM7QUFDMUMsQ0FBQztBQUZlLGVBQU8sVUFFdEIsQ0FBQTtBQUVELElBQWlCLFlBQVksQ0ErQjVCO0FBL0JELFdBQWlCLFlBQVksRUFBQyxDQUFDO0lBRTNCLHVCQUE4QixHQUFhO1FBQ3ZDLE1BQU0sQ0FBQztZQUNILElBQUksRUFBRSxHQUFHLENBQUMsSUFBSTtZQUNkLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTTtTQUNyQixDQUFDO0lBQ04sQ0FBQztJQUxlLDBCQUFhLGdCQUs1QixDQUFBO0lBRUQsc0JBQTZCLElBQWMsRUFBRSxJQUFjO1FBQ3ZELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ2xFLENBQUM7SUFGZSx5QkFBWSxlQUUzQixDQUFBO0lBRUQseUJBQWdDLElBQWMsRUFBRSxJQUFjO1FBQzFELE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUM5QixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFIZSw0QkFBZSxrQkFHOUIsQ0FBQTtJQU9ELHlCQUFnQyxJQUFjLEVBQUUsSUFBYztRQUMxRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDckMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNqQyxDQUFDO0lBQ0wsQ0FBQztJQU5lLDRCQUFlLGtCQU05QixDQUFBO0FBRUwsQ0FBQyxFQS9CZ0IsWUFBWSxHQUFaLG9CQUFZLEtBQVosb0JBQVksUUErQjVCIiwiZmlsZSI6Im1vZGVsL2luZGV4LmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
