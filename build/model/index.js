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
