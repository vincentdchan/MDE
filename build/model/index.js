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
exports.ConfigurationUtil = configuration_1.ConfigurationUtil;
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
