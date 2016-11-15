import {TextModel, LineModel, TextEdit, TextEditType, TextEditApplier, Position} from "../model"
import {EditorView, Coordinate} from "../view"
import {IDisposable} from "../util"

function lastCharactor(str: string) {
    return str[str.length - 1];
}

export class MDE implements IDisposable, TextEditApplier {

    private _model : TextModel;
    private _view : EditorView;
    private _position: Position;

    constructor(content? : string) {
        content = content? content : "";

        this._model = new TextModel(content);
        this._view = new EditorView(this._model);

        this._view.documentView.on("click", this.handleClienEvent.bind(this));
        this._view.inputerView.on("keydown", this.handleInputerKeyDown.bind(this));

    }

    private findLineAncestor(node: Node) : HTMLElement {
        let elm: HTMLElement = node.parentElement;
        while (true) {
            if (elm.classList.contains("editor-line")) {
                return elm;
            } else if (elm === document.body) {
                throw new Error("Element not found.");
            }
            elm = elm.parentElement;
        }
    }

    private handleInputerKeyDown(evt: KeyboardEvent) {
            setTimeout(() => {
                let value = this.view.inputerView.value;
                if (value.length > 0) {
                    let textEdit = new TextEdit(TextEditType.InsertText, this._position, value);

                    this.applyTextEdit(textEdit);
                    this.updatePosition(textEdit);
                    let cursorCo = this._view.documentView.getCoordinate(this._position);

                    this._view.cursorView.setPostition(cursorCo);
                    this._view.inputerView.setPostition(cursorCo);

                    this.view.inputerView.clearContent();
                }
            }, 20);
    }

    private updatePosition(textEdit: TextEdit) {
        switch(textEdit.type) {
            case TextEditType.InsertText:
                if (textEdit.lines.length == 1) {
                    if (lastCharactor(textEdit.lines[0]) == "\n") {
                        throw new Error("Not implemented.");
                    } else {
                        /*
                        this._position = {
                            line: this._position.line,
                            offset: this._position.offset + textEdit.lines[0].length,
                        }
                        */
                        this._position.offset += textEdit.lines[0].length;
                    }
                } else {
                        throw new Error("Not implemented.");
                }
                break;
            case TextEditType.DeleteText:
                break;
        }

    }

    private handleClienEvent(evt: MouseEvent) {
        let _range = document.caretRangeFromPoint(evt.pageX, evt.pageY);

        // let _line_elem = this.findLineAncestor(_range.startContainer);
        // console.log(_range.startContainer);
        let line_number: number,
            absolute_offset: number,
            linesCount = this._view.documentView.linesCount;

        for (let i = 1; i <= linesCount; i++) {
            let lineView = this._view.documentView.lines[i];
            let rect = lineView.element().getBoundingClientRect();
            if (evt.pageY >= rect.top && evt.pageY <= rect.top + rect.height) {
                line_number = i;
                break;
            }
        }

        if (line_number === undefined)
            throw new Error("Not in range.");

        let lineView = this._view.documentView.lines[line_number];
        let lineElm = lineView.element();

        absolute_offset = 0;
        for (let i = 0; i < lineView.words.length; i++) {
            if (lineView.words[i].element() === _range.startContainer.parentElement) {
                absolute_offset += _range.startOffset;
                break;
            }
            absolute_offset = lineView.words[i].length;
        }
        
        this._position = {
            line: line_number,
            offset: absolute_offset,
        };

        let coordinate: Coordinate;
        if (this._position.offset === 0) {
            let rect = lineView.element().getBoundingClientRect();
            coordinate = {
                x: rect.left,
                y: rect.top,
            };
        } else {
            let rect = _range.getBoundingClientRect();
            coordinate = {
                x: rect.left,
                y: rect.top,
            }
        }
        this._view.inputerView.setPostition(coordinate);
        this._view.cursorView.setPostition(coordinate);

        this._view.inputerView.element().focus();
    }

    applyTextEdit(_textEdit: TextEdit) {
        let _range = _textEdit.range;
        switch(_textEdit.type) {
            case TextEditType.InsertText:
                this._model.insertText(_textEdit.position, _textEdit.text);
                for (let i = _textEdit.position.line; 
                    i <= _textEdit.position.line + _textEdit.lines.length - 1; i++) {
                    this._view.documentView.renderLine(i);
                }
                break;
            case TextEditType.DeleteText:
                this._model.deleteText(_textEdit.range);
                this._view.documentView.renderLine(_textEdit.range.begin.line);
                if (_range.end.line - _range.begin.line >= 1) {
                    this._view.documentView.deleteLines(_range.begin.line + 1, _range.begin.line + 
                        _range.end.line - _range.begin.line + 1);
                }
                break;
            default:
                throw new Error("Error text edit type.");
        }
    }

    appendTo(_elem: HTMLElement) {
        _elem.appendChild(this._view.element());
    }

    dispose() {
        this._model = null;
        this._view.dispose();
        this._view = null;
    }

    get view() {
        return this._view;
    }

    get model() {
        return this._model;
    }

}
