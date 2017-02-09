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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwrQ0FBMkM7QUFBbkMsc0NBQUEsWUFBWSxDQUFBO0FBQ3BCLDZCQUE4QjtBQUF0Qix5QkFBQSxRQUFRLENBQUE7QUFDaEIsNkJBQStCO0FBQXZCLDBCQUFBLFNBQVMsQ0FBQTtBQUNqQixpQ0FBNkI7QUFBckIsd0JBQUEsS0FBSyxDQUFBO0FBQ2IsK0JBQTJCO0FBQW5CLHNCQUFBLElBQUksQ0FBQTtBQUNaLHVDQUFxRDtBQUEvQixrQ0FBQSxZQUFZLENBQUE7QUFDbEMscUNBQWlDO0FBQXpCLDRCQUFBLE9BQU8sQ0FBQTtBQUVmLHlEQUErRjtBQUF2RixnREFBQSxpQkFBaUIsQ0FBQTtBQUFFLG9EQUFBLHFCQUFxQixDQUFBO0FBQUUsZ0RBQUEsaUJBQWlCLENBQUE7QUFDbkUsK0JBQTJCO0FBQW5CLHNCQUFBLElBQUksQ0FBQTtBQU1aLHNCQUE2QixHQUFXLEVBQUUsR0FBRyxJQUFjO0lBQ3ZELEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ2hDLElBQUksRUFBRSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssRUFBQyxJQUFJLENBQUMsQ0FBQztRQUM5QyxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUNELE1BQU0sQ0FBQyxHQUFHLENBQUM7QUFDZixDQUFDO0FBTkQsb0NBTUM7QUFPRCw0QkFBbUMsQ0FBYztJQUU3QyxJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0QsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQztJQUNwQyxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDO0lBRS9CLE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQVBELGdEQU9DO0FBRUQsSUFBaUIsV0FBVyxDQVUzQjtBQVZELFdBQWlCLFdBQVc7SUFFeEIscUJBQTRCLFdBQWdCLEVBQUUsU0FBZ0I7UUFDMUQsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRO1lBQ3RCLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUk7Z0JBQ3ZELFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzRCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQU5lLHVCQUFXLGNBTTFCLENBQUE7QUFFTCxDQUFDLEVBVmdCLFdBQVcsR0FBWCxtQkFBVyxLQUFYLG1CQUFXLFFBVTNCIiwiZmlsZSI6InV0aWwvaW5kZXguanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
