"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stringBuffer_1 = require("./stringBuffer");
exports.StringBuffer = stringBuffer_1.StringBuffer;
var set_1 = require("./set");
exports.mergeSet = set_1.mergeSet;
var domWrapper_1 = require("./domWrapper");
exports.DomWrapper = domWrapper_1.DomWrapper;
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
var i18n_1 = require("./i18n");
exports.i18n = i18n_1.i18n;
function StringFormat(src, ...args) {
    for (var i = 0; i < args.length; i++) {
        let re = new RegExp('\\{' + (i) + '\\}', 'gm');
        src = src.replace(re, args[i]);
    }
    return src;
}
exports.StringFormat = StringFormat;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0NBQTJDO0FBQW5DLHNDQUFBLFlBQVksQ0FBQTtBQUNwQiw2QkFBOEI7QUFBdEIseUJBQUEsUUFBUSxDQUFBO0FBQ2hCLDJDQUF1QztBQUEvQixrQ0FBQSxVQUFVLENBQUE7QUFDbEIsaUNBQTZCO0FBQXJCLHdCQUFBLEtBQUssQ0FBQTtBQUNiLCtCQUEyQjtBQUFuQixzQkFBQSxJQUFJLENBQUE7QUFDWix1Q0FBcUQ7QUFBL0Isa0NBQUEsWUFBWSxDQUFBO0FBQ2xDLHFDQUFpQztBQUF6Qiw0QkFBQSxPQUFPLENBQUE7QUFFZix5REFBK0Y7QUFBdkYsZ0RBQUEsaUJBQWlCLENBQUE7QUFBRSxvREFBQSxxQkFBcUIsQ0FBQTtBQUFFLGdEQUFBLGlCQUFpQixDQUFBO0FBQ25FLCtCQUEyQjtBQUFuQixzQkFBQSxJQUFJLENBQUE7QUFNWixzQkFBNkIsR0FBVyxFQUFFLEdBQUcsSUFBYztJQUN2RCxHQUFHLENBQUEsQ0FBQyxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUNoQyxJQUFJLEVBQUUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFDRCxNQUFNLENBQUMsR0FBRyxDQUFDO0FBQ2YsQ0FBQztBQU5ELG9DQU1DO0FBT0QsNEJBQW1DLENBQWM7SUFFN0MsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNELElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQyxjQUFjLENBQUM7SUFDcEMsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQztJQUUvQixNQUFNLENBQUMsTUFBTSxDQUFDO0FBQ2xCLENBQUM7QUFQRCxnREFPQztBQUVELElBQWlCLFdBQVcsQ0FVM0I7QUFWRCxXQUFpQixXQUFXO0lBRXhCLHFCQUE0QixXQUFnQixFQUFFLFNBQWdCO1FBQzFELFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUTtZQUN0QixNQUFNLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJO2dCQUN2RCxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0QsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFOZSx1QkFBVyxjQU0xQixDQUFBO0FBRUwsQ0FBQyxFQVZnQixXQUFXLEdBQVgsbUJBQVcsS0FBWCxtQkFBVyxRQVUzQiIsImZpbGUiOiJ1dGlsL2luZGV4LmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
