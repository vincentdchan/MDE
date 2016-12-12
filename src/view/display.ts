import {LineModel, TextModel, TextEdit, TextEditType} from "../model"
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

    mde.appendTo(document.body);

}
