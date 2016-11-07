import {TextModel, LineModel, TextEdit, TextEditType} from "../model"
import {DocumentView} from "../view"
import {IDisposable} from "../util"

export class MDE implements IDisposable {

    private _model : TextModel;
    private _view : DocumentView;

    constructor(content? : string) {
        content = content? content : "";

        this._model = new TextModel(content);
        this._view = new DocumentView(this._model);
    }

    applyTextEdit(_textEdit: TextEdit) {
        let _range = _textEdit.range;
        switch(_textEdit.type) {
            case TextEditType.InsertText:
                this._model.insertText(_textEdit.position, _textEdit.text);
                for (let i = _textEdit.position.line; 
                    i <= _textEdit.position.line + _textEdit.lines.length - 1; i++) {
                    this._view.renderLine(i);
                }
                break;
            case TextEditType.DeleteText:
                this._model.deleteText(_textEdit.range);
                this._view.renderLine(_textEdit.range.begin.line);
                if (_range.end.line - _range.begin.line >= 1) {
                    this._view.deleteLines(_range.begin.line + 1, _range.end.line - _range.begin.line);
                }
                break;
            default:
                throw new Error("Error text edit type.");
        }
    }

    appendTo(_elem: HTMLElement) {
        _elem.appendChild(this._view.element);
    }

    dispose() {
        this._model = null;
        this._view.dispose();
        this._view = null;
    }

}
