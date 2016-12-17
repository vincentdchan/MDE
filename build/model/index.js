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
var lineRenderer_1 = require("./lineRenderer");
exports.LineRenderer = lineRenderer_1.LineRenderer;
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
