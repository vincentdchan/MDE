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
