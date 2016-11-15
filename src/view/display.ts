import {LineModel, TextModel, TextEdit, TextEditType} from "../model"
import {TextModelToDOMGenerator, applyTextEditToDOM} from "../model/domGenerator"
import {MDE} from "../controller"
import {diff} from "../virtualDOM/diff"

export interface EditorOption {
    lineHeight: number;
}

const DEFAULT_OPTION: EditorOption = { 
    lineHeight: 18
}

export function Display(content: string) {

    let mde = new MDE(content);

    const beginLineInput = <HTMLInputElement>document.getElementById("input-begin-line");
    const beginOffsetInput = <HTMLInputElement>document.getElementById("input-begin-offset");
    const insertTextArea = <HTMLTextAreaElement>document.getElementById("textarea-insert-text");
    const insertButton = <HTMLButtonElement>document.getElementById("button-insert");

    const deleteBeginLineInput = <HTMLInputElement>document.getElementById("input-delete-begin-line");
    const deleteBeginOffsetInput = <HTMLInputElement>document.getElementById("input-delete-begin-offset");
    const deleteEndLineInput = <HTMLInputElement>document.getElementById("input-delete-end-line");
    const deleteEndOffsetInput = <HTMLInputElement>document.getElementById("input-delete-end-offset");
    const deleteButton = <HTMLElement>document.getElementById("button-delete");

    const coLineInput = <HTMLInputElement>document.getElementById("input-co-line");
    const coOffsetInput = <HTMLInputElement>document.getElementById("input-co-offset");
    const coButton = <HTMLButtonElement>document.getElementById("button-co");

    insertButton.addEventListener("click", (e: MouseEvent) => {
        e.preventDefault();

        const beginLine = parseInt(beginLineInput.value);
        const beginOffset = parseInt(beginOffsetInput.value);
        const inputText = insertTextArea.value;

        let textEdit = new TextEdit(TextEditType.InsertText, {
            line: beginLine,
            offset: beginOffset
        }, inputText);

        mde.applyTextEdit(textEdit);
    })

    deleteButton.addEventListener("click", (e: MouseEvent) => {
        e.preventDefault();
        
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

        mde.applyTextEdit(textEdit);
    });

    coButton.addEventListener("click", (evt: MouseEvent) => {
        evt.preventDefault();

        let _line = parseInt(coLineInput.value);
        let _offset = parseInt(coOffsetInput.value);
        console.log(mde.view.documentView.getCoordinate({
            line: _line,
            offset: _offset,
        }));
    })

    mde.appendTo(document.body);

}
