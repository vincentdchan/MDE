"use strict";
const model_1 = require("../model");
const controller_1 = require("../controller");
const DEFAULT_OPTION = {
    lineHeight: 18
};
function Display(content) {
    let mde = new controller_1.MDE(content);
    const beginLineInput = document.getElementById("input-begin-line");
    const beginOffsetInput = document.getElementById("input-begin-offset");
    const insertTextInput = document.getElementById("input-insert-text");
    const insertButton = document.getElementById("button-insert");
    const deleteBeginLineInput = document.getElementById("input-delete-begin-line");
    const deleteBeginOffsetInput = document.getElementById("input-delete-begin-offset");
    const deleteEndLineInput = document.getElementById("input-delete-end-line");
    const deleteEndOffsetInput = document.getElementById("input-delete-end-offset");
    const deleteButton = document.getElementById("button-delete");
    insertButton.addEventListener("click", (e) => {
        const beginLine = parseInt(beginLineInput.value);
        const beginOffset = parseInt(beginOffsetInput.value);
        const inputText = insertTextInput.value;
        let textEdit = new model_1.TextEdit(model_1.TextEditType.InsertText, {
            line: beginLine,
            offset: beginOffset
        }, inputText);
        mde.applyTextEdit(textEdit);
    });
    deleteButton.addEventListener("click", (e) => {
        const beginLine = parseInt(deleteBeginLineInput.value);
        const beginOffset = parseInt(deleteBeginOffsetInput.value);
        const endLine = parseInt(deleteEndLineInput.value);
        const endOffset = parseInt(deleteEndOffsetInput.value);
        let textEdit = new model_1.TextEdit(model_1.TextEditType.DeleteText, {
            begin: {
                line: beginLine,
                offset: beginOffset
            },
            end: {
                line: endLine,
                offset: endOffset
            }
        });
        mde.applyTextEdit(textEdit);
    });
    mde.appendTo(document.body);
}
exports.Display = Display;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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
