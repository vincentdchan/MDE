"use strict";
var array_1 = require("./immutable/array");
exports.ImmutableArray = array_1.ImmutableArray;
var stringBuffer_1 = require("./stringBuffer");
exports.StringBuffer = stringBuffer_1.StringBuffer;
var set_1 = require("./set");
exports.mergeSet = set_1.mergeSet;
function insertBreakAtPoint(e) {
    let range = document.caretRangeFromPoint(e.pageX, e.pageY);
    let textNode = range.startContainer;
    let offset = range.startOffset;
    return offset;
}
exports.insertBreakAtPoint = insertBreakAtPoint;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQkFBNkIsbUJBQzdCLENBQUM7QUFETyxnREFBd0M7QUFDaEQsNkJBQTJCLGdCQUMzQixDQUFDO0FBRE8sbURBQW1DO0FBQzNDLG9CQUF1QixPQUV2QixDQUFDO0FBRk8sa0NBQXNCO0FBTTlCLDRCQUFtQyxDQUFjO0lBRTdDLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzRCxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUMsY0FBYyxDQUFDO0lBQ3BDLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7SUFFL0IsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBUGUsMEJBQWtCLHFCQU9qQyxDQUFBIiwiZmlsZSI6InV0aWwvaW5kZXguanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
