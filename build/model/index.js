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
var snippet_1 = require("./snippet");
exports.Snippet = snippet_1.Snippet;
var configuration_1 = require("./configuration");
exports.ConfigItemType = configuration_1.ConfigItemType;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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
