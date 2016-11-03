import {TextEdit, TextEditType, TextModel} from "./textModel"
import {LineModel} from "./lineModel"
import {elem} from "../util/dom"
import {IGenerator} from "../util/generator"

export class LineModelToDOMGenerator implements IGenerator<HTMLElement> {

    private _lineModel: LineModel;

    constructor(_lm: LineModel) {
        this._lineModel = _lm;
    }

    generate() : HTMLElement{
        let div = elem("div", "editor-line", {
            "data-lineId": this._lineModel.number
        });

        let span = elem("span");
        span.innerText = this._lineModel.text;

        div.appendChild(span);

        return div;
    }

}

export class TextModelToDOMGenerator implements IGenerator<HTMLElement>{

    private _textModel: TextModel;

    constructor(_tm: TextModel) {
        this._textModel = _tm;
    }

    generate(): HTMLElement {

        let frame = elem("div", "editor-frame");

        for (let i = 1; i <= this._textModel.linesCount; i++) {
            let lm = this._textModel.lineAt(i);

            let lmGen = new LineModelToDOMGenerator(lm);
            frame.appendChild(lmGen.generate());
        }

        return frame;

    }

}

export function refreshDOM(beginLine: number, endLine: number, _tm: TextModel, _dom: HTMLElement) {
    for (let i = beginLine; i < endLine; i++) {
        let oldElm = <HTMLElement>document.querySelector("div[data-lineId=\"" + i + "\"]");

        let lineGen = new LineModelToDOMGenerator(_tm.lineAt(i));
        let dom = lineGen.generate();
        oldElm.parentElement.replaceChild(dom, oldElm)
    }
}

export function applyTextEditToDOM(_textEdit: TextEdit, _tm: TextModel, _dom: HTMLElement) {
    switch(_textEdit.type) {
        case TextEditType.InsertText:
            _tm.insertText(_textEdit.position, _textEdit.text);
            refreshDOM(_textEdit.position.line, 
                _textEdit.position.line + _textEdit.lines.length, _tm, _dom);
            break;
        case TextEditType.DeleteText:
            _tm.deleteText(_textEdit.range);
            refreshDOM(_textEdit.range.begin.line, 
                _textEdit.range.end.line, _tm, _dom);
            break;
        default:
            throw new Error("Error text edit type.");
    }
}
