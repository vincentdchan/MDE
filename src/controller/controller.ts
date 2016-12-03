import {TextModel, LineModel, TextEdit, TextEditType, 
    TextEditApplier, Position} from "../model"
import {EditorView, Coordinate, WindowView} from "../view"
import {IDisposable} from "../util"
import {menuGenerator} from "./menu"
import {remote, ipcRenderer} from "electron"
const {Menu, MenuItem} = remote

function lastCharactor(str: string) {
    return str[str.length - 1];
}

function clonePosition(pos: Position) : Position {
    return {
        line: pos.line,
        offset: pos.offset
    };
}

export class MDE implements IDisposable, TextEditApplier {

    private _model : TextModel = null;
    private _position: Position;
    private _menu: Electron.Menu;
    private _view: WindowView = null;

    private _composition_start_pos : Position;
    private _composition_update_pos : Position;

    constructor(content? : string) {
        content = content? content : "";

        this._menu = menuGenerator(this);
        Menu.setApplicationMenu(this._menu);

        this.reloadText(content);

        ipcRenderer.on("file-readFile-error", this.handleFileReadError.bind(this));
        ipcRenderer.on("file-readFile-success", this.handleFileRead.bind(this));
    }

    reloadText(content: string) {
        if (this._view !== null) {
            this._view.dispose();
            this._view = null;
        }
        if (this._model !== null) {
            this._model = null;
        }

        this._model = new TextModel(content);

        this._view = new WindowView(this._model);

        this.documentView.addEventListener("click", this.handleClientEvent.bind(this));

        this.inputerView.addEventListener("keydown", (evt: KeyboardEvent) => {
            setTimeout(() => {
                this.handleInputerKeyDown(evt);
            }, 20);
        });

        this.inputerView.addEventListener("compositionstart", 
            this.handleInputerCompositionStart.bind(this), false);
        this.inputerView.addEventListener("compositionend", 
            this.handleInputerCompositionEnd.bind(this), false);
        this.inputerView.addEventListener("compositionupdate", 
            this.handleInputerCompositionUpdate.bind(this), false);

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

    private handleInputerCompositionStart(evt: Event) {
        this._composition_start_pos = clonePosition(this._position);
        this._composition_update_pos = clonePosition(this._position);
    }

    private handleInputerCompositionUpdate(evt: any) {
        /*
        let updateData : string = evt.data;

        updateData = updateData.replace("\n", "");

        let textEdit = new TextEdit(TextEditType.ReplaceText, {
            begin: this._composition_start_pos,
            end: this._composition_update_pos,
        }, updateData);

        this.applyTextEdit(textEdit);

        this._composition_update_pos = clonePosition(this._composition_start_pos);
        this._composition_update_pos.offset += updateData.length

        this.updateCursor(this._composition_update_pos);

        */
    }

    private handleInputerCompositionEnd(evt: any) {
        let updateData : string = evt.data;

        updateData = updateData.replace("\n", "");


        /*
        let textEdit = new TextEdit(TextEditType.ReplaceText, {
            begin: this._composition_start_pos,
            end: this._composition_update_pos,
        }, updateData);

        this.applyTextEdit(textEdit);
        */

        setTimeout(() => {
            this.inputerView.value = "";
        }, 20);

        this._position = clonePosition(this._composition_start_pos);
        this._position.offset += updateData.length
        this.updateCursor(this._position);
    }

    private isInputerCompositing() {
        return this.inputerView.isCompositioning();
    }

    private handleCompositionKeydown(evt: KeyboardEvent) {

        let updateData : string = this.inputerView.element().value;

        updateData = updateData.replace("\n", "");

        let textEdit = new TextEdit(TextEditType.ReplaceText, {
            begin: this._composition_start_pos,
            end: this._composition_update_pos,
        }, updateData);

        this.applyTextEdit(textEdit);

        this._composition_update_pos = clonePosition(this._composition_start_pos);
        this._composition_update_pos.offset += updateData.length

        this.updateCursor(this._composition_update_pos);

    }

    private handleInputerKeyDown(evt: KeyboardEvent) {

        if (this.isInputerCompositing()) {
            this.handleCompositionKeydown(evt);
            return;
        }

        let pos = this._position;
        switch (evt.keyCode) {
            case 8: // backspace
                if (this._position.offset == 0 && this._position.line > 1) {
                    let lastOffset = this._model.lineAt(this._position.line - 1).length - 1;
                    let textEdit = new TextEdit(TextEditType.DeleteText, {
                        begin: {
                            line: this._position.line - 1,
                            offset: lastOffset,
                        },
                        end: {
                            line: this._position.line,
                            offset: 0,
                        }
                    });

                    this.applyTextEdit(textEdit);
                    this._position.line--;
                    this._position.offset = lastOffset;
                    this.updateCursor(this._position);

                } else if (this._position.offset > 0) {
                    let textEdit = new TextEdit(TextEditType.DeleteText, {
                        begin: {
                            line: this._position.line,
                            offset: this._position.offset - 1,
                        },
                        end: {
                            line: this._position.line,
                            offset: this._position.offset,
                        }
                    })
                    this.applyTextEdit(textEdit);
                    this._position.offset--;
                    this.updateCursor(this._position);
                }
                break;
            case 35: //end
                this._position.offset =
                    this._model.lineAt(this._position.line).length - 1
                this.updateCursor(this._position);
                break;
            case 36: // home
                this._position.offset = 0;
                this.updateCursor(this._position);
                break;
            case 37: // left
                if (pos.offset == 0) {
                    if (pos.line > 1) {
                        this._position = {
                            line: pos.line - 1,
                            offset: this._model.lineAt(pos.line - 1).length - 1,
                        }
                    }
                } else {
                    this._position.offset--;
                }
                this.updateCursor(this._position);
                break;
            case 38: // up
                if (pos.line > 1) {
                    this._position.line--;
                    if (this._model.lineAt(this._position.line).length < this._position.offset)
                        this._position.offset = this._model.lineAt(this._position.line).length - 1;
                    this.updateCursor(this._position);
                }
                break;
            case 39: // right
                if (pos.offset >= this._model.lineAt(pos.line).length - 1) {
                    if (pos.line < this._model.linesCount) {
                        this._position = {
                            line: this._position.line + 1,
                            offset: 0
                        }
                        this.updateCursor(this._position);
                    }
                } else {
                    this._position.offset++;
                    this.updateCursor(this._position);
                }
                break;
            case 40: // down
                if (pos.line < this._model.linesCount) {
                    this._position.line++;
                    let newLineText = this._model.lineAt(this._position.line).text;
                    if (lastCharactor(newLineText) == '\n') {
                        if (this._position.offset >= this._model.lineAt(this._position.line).length - 1)
                            this._position.offset = this._model.lineAt(this._position.line).length - 1;
                    } else if (newLineText.length == 0) {
                        this._position.offset = 0;
                    }
                    this.updateCursor(this._position);
                }
                break;
            case 45: // insert
                break;
            case 46:
                break; // delete
            default:

                let value = this.inputerView.value;
                if (value.length > 0) {
                    let textEdit = new TextEdit(TextEditType.InsertText, this._position, value);

                    this.applyTextEdit(textEdit);
                    this.updatePosition(textEdit);

                    this.updateCursor(this._position);

                    this.inputerView.clearContent();
                }
        }


    }

    private updatePosition(textEdit: TextEdit) {
        switch(textEdit.type) {
            case TextEditType.InsertText:
                if (textEdit.lines.length == 1) {
                    this._position.offset += textEdit.lines[0].length;
                } else {
                    this._position = {
                        line: this._position.line + textEdit.lines.length - 1,
                        offset: textEdit.lines[textEdit.lines.length - 1].length,
                    };
                }
                break;
            case TextEditType.DeleteText:
                break;
        }

    }

    private updateCursor(pos: Position) {
        let cursorCo = this.documentView.getCoordinate(pos);

        this.updateCoursorByCoordinate(cursorCo);
    }

    private updateCoursorByCoordinate(co: Coordinate) {
        co.x -= this._view.leftPanelView.width;

        this.cursorView.setPostition(co);
        this.inputerView.setPostition(co);

        this.cursorView.excite();
    }

    private handleClientEvent(evt: MouseEvent) {
        let _range = document.caretRangeFromPoint(evt.clientX, evt.clientY);

        let line_number: number,
            absolute_offset: number,
            linesCount = this.documentView.linesCount;

        for (let i = 1; i <= linesCount; i++) {
            let lineView = this.documentView.lines[i];
            // let rect = lineView.element().firstElementChild.getBoundingClientRect();
            let rect = lineView.element().getBoundingClientRect();

            if (evt.clientY >= rect.top && evt.clientY <= rect.top + rect.height) {
                line_number = i;
                break;
            }
        }

        if (line_number === undefined)
            throw new Error("Not in range.");

        let lineView = this.documentView.lines[line_number];
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
        this.updateCoursorByCoordinate(coordinate);

        this.inputerView.element().focus();
    }

    applyTextEdit(_textEdit: TextEdit) {
        let _range = _textEdit.range;
        this._model.applyTextEdit(_textEdit)

        switch(_textEdit.type) {
            case TextEditType.InsertText:
                this.documentView.renderLine(_textEdit.position.line);
                if (_textEdit.lines.length > 1) {

                    let srcLinesCount = this.documentView.linesCount
                    for (let i = _textEdit.position.line + 1; 
                        i <= srcLinesCount; i++) {
                        this.documentView.renderLine(i);
                    }

                    let init_length = this.documentView.lines.length - 1;
                    this.documentView.appendLines(_textEdit.lines.length - 1);
                    for (let i = 1; i < _textEdit.lines.length; i++) {
                        this.documentView.renderLine(init_length + i);
                    }


                }
                break;
            case TextEditType.DeleteText:
                if (_range.end.line > _range.begin.line) {
                    this.documentView.deleteLines(_range.begin.line + 1, _range.end.line + 1);
                }
                for (let i = _range.begin.line; i <= this._model.linesCount; i++)
                    this.documentView.renderLine(i);
                break;
            case TextEditType.ReplaceText:
                let linesDelta = _range.begin.line - _range.end.line;
                linesDelta += _textEdit.lines.length - 1;

                this.documentView.renderLine(_range.begin.line);

                if (linesDelta > 0 ) {
                    this.documentView.appendLines(linesDelta);
                } else if (linesDelta < 0) {
                    this.documentView.deleteLines(_range.begin.line + 1, _range.begin.line - linesDelta + 1);
                }

                for (let i = _range.begin.line; i <= this._model.linesCount; i++)
                    this.documentView.renderLine(i);

                break;
            default:
                throw new Error("Error text edit type.");
        }
    }

    appendTo(_elem: HTMLElement) {
        _elem.appendChild(this._view.element());
    }

    openFile(filename: string) {
        ipcRenderer.send("file-readFile", filename);
    }

    handleFileRead(event: Electron.IpcRendererEvent, data: string) {
        this.reloadText(data);
    }

    handleFileReadError(event: Electron.IpcRendererEvent, err: NodeJS.ErrnoException) {
        console.log(err);
    }

    dispose() {
        this._model = null;
        this._view.dispose();
        this._view = null;
    }

    get editorView() {
        return this._view.editorView;
    }

    get documentView() {
        return this._view.editorView.documentView;
    }

    get inputerView() {
        return this._view.editorView.inputerView;
    }

    get cursorView() {
        return this._view.editorView.cursorView;
    }

    get view() {
        return this._view;
    }

    get model() {
        return this._model;
    }

}
