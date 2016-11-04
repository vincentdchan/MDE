import {TextModel, TextEdit, TextEditType} from "../model/textModel"
import {LineModel} from "../model/lineModel"
import {TextModelToDOMGenerator, applyTextEditToDOM} from "../model/domGenerator"
import {diff} from "../virtualDOM/diff"

export interface EditorOption {
    lineHeight: number;
}

const DEFAULT_OPTION: EditorOption = { 
    lineHeight: 18
}

export function Display(textModel: TextModel) {

    let gen = new TextModelToDOMGenerator(textModel);
    let realDOM = gen.generate();

    document.body.appendChild(realDOM);

    const beginLineInput = <HTMLInputElement>document.getElementById("input-begin-line");
    const beginOffsetInput = <HTMLInputElement>document.getElementById("input-begin-offset");
    const insertTextInput = <HTMLInputElement>document.getElementById("input-insert-text");
    const insertButton = <HTMLButtonElement>document.getElementById("button-insert");

    const deleteBeginLineInput = <HTMLInputElement>document.getElementById("input-delete-begin-line");
    const deleteBeginOffsetInput = <HTMLInputElement>document.getElementById("input-delete-begin-offset");
    const deleteEndLineInput = <HTMLInputElement>document.getElementById("input-delete-end-line");
    const deleteEndOffsetInput = <HTMLInputElement>document.getElementById("input-delete-end-offset");
    const deleteButton = <HTMLElement>document.getElementById("button-delete");

    insertButton.addEventListener("click", (e: MouseEvent) => {
        const beginLine = parseInt(beginLineInput.value);
        const beginOffset = parseInt(beginOffsetInput.value);
        const inputText = insertTextInput.value;

        let textEdit = new TextEdit(TextEditType.InsertText, {
            line: beginLine,
            offset: beginOffset
        }, inputText);

        applyTextEditToDOM(textEdit, textModel, realDOM);
    })

    deleteButton.addEventListener("click", (e: MouseEvent) => {
        const beginLine = parseInt(deleteBeginLineInput.value);
        const beginOffset = parseInt(deleteBeginOffsetInput.value);
        const endLine = parseInt(deleteEndLineInput.value);
        const endOffset = parseInt(deleteEndOffsetInput.value);

        let textEdit = new TextEdit(TextEditType.DeleteText, {
            begin: {
                line: beginLine,
                offset: beginOffset
            },
            end: {
                line: endLine,
                offset: endOffset
            }
        });

        console.log(textEdit);
        applyTextEditToDOM(textEdit, textModel, realDOM);
    });

}
