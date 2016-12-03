"use strict";
var stringBuffer_1 = require("./stringBuffer");
exports.StringBuffer = stringBuffer_1.StringBuffer;
var set_1 = require("./set");
exports.mergeSet = set_1.mergeSet;
var dom_1 = require("./dom");
exports.DomHelper = dom_1.DomHelper;
var queue_1 = require("./queue");
exports.Deque = queue_1.Deque;
function insertBreakAtPoint(e) {
    let range = document.caretRangeFromPoint(e.pageX, e.pageY);
    let textNode = range.startContainer;
    let offset = range.startOffset;
    return offset;
}
exports.insertBreakAtPoint = insertBreakAtPoint;
var ClassHelper;
(function (ClassHelper) {
    function applyMixins(derivedCtor, baseCtors) {
        baseCtors.forEach(baseCtor => {
            Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            });
        });
    }
    ClassHelper.applyMixins = applyMixins;
})(ClassHelper = exports.ClassHelper || (exports.ClassHelper = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw2QkFBMkIsZ0JBQzNCLENBQUM7QUFETyxtREFBbUM7QUFDM0Msb0JBQXVCLE9BQ3ZCLENBQUM7QUFETyxrQ0FBc0I7QUFDOUIsb0JBQXdCLE9BQ3hCLENBQUM7QUFETyxvQ0FBdUI7QUFDL0Isc0JBQW9CLFNBRXBCLENBQUM7QUFGTyw4QkFBcUI7QUFXN0IsNEJBQW1DLENBQWM7SUFFN0MsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNELElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQyxjQUFjLENBQUM7SUFDcEMsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQztJQUUvQixNQUFNLENBQUMsTUFBTSxDQUFDO0FBQ2xCLENBQUM7QUFQZSwwQkFBa0IscUJBT2pDLENBQUE7QUFFRCxJQUFpQixXQUFXLENBVTNCO0FBVkQsV0FBaUIsV0FBVyxFQUFDLENBQUM7SUFFMUIscUJBQTRCLFdBQWdCLEVBQUUsU0FBZ0I7UUFDMUQsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRO1lBQ3RCLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUk7Z0JBQ3ZELFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzRCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQU5lLHVCQUFXLGNBTTFCLENBQUE7QUFFTCxDQUFDLEVBVmdCLFdBQVcsR0FBWCxtQkFBVyxLQUFYLG1CQUFXLFFBVTNCIiwiZmlsZSI6InV0aWwvaW5kZXguanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
