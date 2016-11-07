"use strict";
var array_1 = require("./immutable/array");
exports.ImmutableArray = array_1.ImmutableArray;
var stringBuffer_1 = require("./stringBuffer");
exports.StringBuffer = stringBuffer_1.StringBuffer;
function insertBreakAtPoint(e) {
    let range = document.caretRangeFromPoint(e.pageX, e.pageY);
    let textNode = range.startContainer;
    let offset = range.startOffset;
    return offset;
}
exports.insertBreakAtPoint = insertBreakAtPoint;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQkFBNkIsbUJBQzdCLENBQUM7QUFETyxnREFBd0M7QUFDaEQsNkJBQTJCLGdCQUUzQixDQUFDO0FBRk8sbURBQW1DO0FBTTNDLDRCQUFtQyxDQUFjO0lBRTdDLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzRCxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUMsY0FBYyxDQUFDO0lBQ3BDLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7SUFlL0IsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBcEJlLDBCQUFrQixxQkFvQmpDLENBQUEiLCJmaWxlIjoidXRpbC9pbmRleC5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
