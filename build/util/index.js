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
var markdownTokenizer_1 = require("./markdownTokenizer");
exports.MarkdownTokenType = markdownTokenizer_1.MarkdownTokenType;
exports.MarkdownTokenizeState = markdownTokenizer_1.MarkdownTokenizeState;
exports.MarkdownTokenizer = markdownTokenizer_1.MarkdownTokenizer;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw2QkFBMkIsZ0JBQzNCLENBQUM7QUFETyxtREFBbUM7QUFDM0Msb0JBQXVCLE9BQ3ZCLENBQUM7QUFETyxrQ0FBc0I7QUFDOUIsb0JBQXdCLE9BQ3hCLENBQUM7QUFETyxvQ0FBdUI7QUFDL0Isc0JBQW9CLFNBQ3BCLENBQUM7QUFETyw4QkFBcUI7QUFDN0IscUJBQW1CLFFBQ25CLENBQUM7QUFETywyQkFBbUI7QUFDM0IseUJBQXlDLFlBQ3pDLENBQUM7QUFEcUIsK0NBQStCO0FBQ3JELHdCQUFzQixXQUN0QixDQUFDO0FBRE8sb0NBQXlCO0FBRWpDLGtDQUEwRSxxQkFFMUUsQ0FBQztBQUZPLGtFQUFpQjtBQUFFLDBFQUFxQjtBQUFFLGtFQUE2QztBQVcvRiw0QkFBbUMsQ0FBYztJQUU3QyxJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0QsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQztJQUNwQyxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDO0lBRS9CLE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQVBlLDBCQUFrQixxQkFPakMsQ0FBQTtBQUVELElBQWlCLFdBQVcsQ0FVM0I7QUFWRCxXQUFpQixXQUFXLEVBQUMsQ0FBQztJQUUxQixxQkFBNEIsV0FBZ0IsRUFBRSxTQUFnQjtRQUMxRCxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVE7WUFDdEIsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSTtnQkFDdkQsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNELENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBTmUsdUJBQVcsY0FNMUIsQ0FBQTtBQUVMLENBQUMsRUFWZ0IsV0FBVyxHQUFYLG1CQUFXLEtBQVgsbUJBQVcsUUFVM0IiLCJmaWxlIjoidXRpbC9pbmRleC5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
