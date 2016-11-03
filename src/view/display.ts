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

}
