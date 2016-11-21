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
    const insertTextArea = document.getElementById("textarea-insert-text");
    const insertButton = document.getElementById("button-insert");
    const deleteBeginLineInput = document.getElementById("input-delete-begin-line");
    const deleteBeginOffsetInput = document.getElementById("input-delete-begin-offset");
    const deleteEndLineInput = document.getElementById("input-delete-end-line");
    const deleteEndOffsetInput = document.getElementById("input-delete-end-offset");
    const deleteButton = document.getElementById("button-delete");
    const replaceBeginLineInput = document.getElementById("input-replace-begin-line");
    const replaceBeginOffsetInput = document.getElementById("input-replace-begin-offset");
    const replaceEndLineInput = document.getElementById("input-replace-end-line");
    const replaceEndOffsetInput = document.getElementById("input-replace-end-offset");
    const replaceTextArea = document.getElementById("textarea-replace-text");
    const replaceButton = document.getElementById("replace-button");
    const coLineInput = document.getElementById("input-co-line");
    const coOffsetInput = document.getElementById("input-co-offset");
    const coButton = document.getElementById("button-co");
    insertButton.addEventListener("click", (e) => {
        e.preventDefault();
        const beginLine = parseInt(beginLineInput.value);
        const beginOffset = parseInt(beginOffsetInput.value);
        const inputText = insertTextArea.value;
        let textEdit = new model_1.TextEdit(model_1.TextEditType.InsertText, {
            line: beginLine,
            offset: beginOffset
        }, inputText);
        mde.applyTextEdit(textEdit);
    });
    deleteButton.addEventListener("click", (e) => {
        e.preventDefault();
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
    replaceButton.addEventListener("click", (evt) => {
        evt.preventDefault();
        let beginLine = parseInt(replaceBeginLineInput.value), beginOffset = parseInt(replaceBeginOffsetInput.value), endLine = parseInt(replaceEndLineInput.value), endOffset = parseInt(replaceEndOffsetInput.value);
        let content = replaceTextArea.value;
        let textEdit = new model_1.TextEdit(model_1.TextEditType.ReplaceText, {
            begin: { line: beginLine, offset: beginOffset },
            end: { line: endLine, offset: endOffset }
        }, content);
        mde.applyTextEdit(textEdit);
    });
    coButton.addEventListener("click", (evt) => {
        evt.preventDefault();
        let _line = parseInt(coLineInput.value);
        let _offset = parseInt(coOffsetInput.value);
        console.log(mde.view.documentView.getCoordinate({
            line: _line,
            offset: _offset,
        }));
    });
    mde.appendTo(document.body);
}
exports.Display = Display;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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
