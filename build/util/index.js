"use strict";
var stringBuffer_1 = require("./stringBuffer");
exports.StringBuffer = stringBuffer_1.StringBuffer;
var set_1 = require("./set");
exports.mergeSet = set_1.mergeSet;
var dom_1 = require("./dom");
exports.DomHelper = dom_1.DomHelper;
var queue_1 = require("./queue");
exports.Deque = queue_1.Deque;
var host_1 = require("./host");
exports.Host = host_1.Host;
var ticktock_1 = require("./ticktock");
exports.TickTockUtil = ticktock_1.TickTockUtil;
var keyCode_1 = require("./keyCode");
exports.KeyCode = keyCode_1.KeyCode;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw2QkFBMkIsZ0JBQzNCLENBQUM7QUFETyxtREFBbUM7QUFDM0Msb0JBQXVCLE9BQ3ZCLENBQUM7QUFETyxrQ0FBc0I7QUFDOUIsb0JBQXdCLE9BQ3hCLENBQUM7QUFETyxvQ0FBdUI7QUFDL0Isc0JBQW9CLFNBQ3BCLENBQUM7QUFETyw4QkFBcUI7QUFDN0IscUJBQW1CLFFBQ25CLENBQUM7QUFETywyQkFBbUI7QUFDM0IseUJBQXlDLFlBQ3pDLENBQUM7QUFEcUIsK0NBQStCO0FBQ3JELHdCQUFzQixXQUV0QixDQUFDO0FBRk8sb0NBQXlCO0FBV2pDLDRCQUFtQyxDQUFjO0lBRTdDLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzRCxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUMsY0FBYyxDQUFDO0lBQ3BDLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7SUFFL0IsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBUGUsMEJBQWtCLHFCQU9qQyxDQUFBO0FBRUQsSUFBaUIsV0FBVyxDQVUzQjtBQVZELFdBQWlCLFdBQVcsRUFBQyxDQUFDO0lBRTFCLHFCQUE0QixXQUFnQixFQUFFLFNBQWdCO1FBQzFELFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUTtZQUN0QixNQUFNLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJO2dCQUN2RCxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0QsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFOZSx1QkFBVyxjQU0xQixDQUFBO0FBRUwsQ0FBQyxFQVZnQixXQUFXLEdBQVgsbUJBQVcsS0FBWCxtQkFBVyxRQVUzQiIsImZpbGUiOiJ1dGlsL2luZGV4LmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
