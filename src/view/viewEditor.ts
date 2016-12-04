import {IDisposable, DomHelper} from "../util"
import {Coordinate} from "."
import {DocumentView} from "./viewDocument"
import {ScrollBarView, TrainMoveEvent} from "./viewScrollBar"
import {CursorView} from "./viewCursor"
import {InputerView} from "./viewInputer"
import {ToolbarView} from "./viewToolbar"
import {TextModel, TextEdit, TextEditType, 
    TextEditApplier, Position} from "../model"
import {ButtonOption} from "."
function lastCharactor(str: string) {
    return str[str.length - 1];
}

function clonePosition(pos: Position) : Position {
    return {
        line: pos.line,
        offset: pos.offset
    };
}

let toolbarButtons : ButtonOption[] = [
    {
        name: "bold",
        text: "Bold",
        icon: "fa fa-bold",
    },
    {
        name: "italic",
        text: "Italic",
        icon: "fa fa-italic",
    }, 
    {
        name: "underline",
        text: "Underline",
        icon: "fa fa-underline",
    },
    {
        name: "orderedlist",
        text: "Ordered List",
        icon: "fa fa-list-ol",
    }, 
    {
        name: "unorderedlist",
        text: "Unordered List",
        icon: "fa fa-list-ul",
    }
]

export class EditorView extends DomHelper.FixedElement 
    implements TextEditApplier, IDisposable {

    public static readonly PxPerLine = 16;
    public static readonly DefaultLineMarginWidth = 40;
    public static readonly MinWidth = 100;

    private _model: TextModel;
    private _document: DocumentView;
    private _scrollbar: ScrollBarView;
    private _toolbar: ToolbarView;

    private _position: Position = { 
        line: 1,
        offset: 0,
    }

    constructor(_model: TextModel) {
        super("div", "mde-editor");

        this._toolbar = new ToolbarView(toolbarButtons);
        this._toolbar.top = 0;

        this._model = _model;
        this._document = new DocumentView(_model);
        this._document.top = this._toolbar.height;
        this._document.on("scroll", this.handleDocumentScroll.bind(this));
        // this._document.on("click", this.handleDocumentClick.bind(this));
        this._document.render();

        this._scrollbar = new ScrollBarView();
        this._scrollbar.top = this._toolbar.height;
        this._scrollbar.right = 0;

        this._toolbar.appendTo(this._dom);
        this._document.appendTo(this._dom);
        this._scrollbar.appendTo(this._dom);

        this.stylish();

        this._scrollbar.on("trainMove", this.handleScrollBarTrainMove.bind(this));

        setTimeout(() => {
            this._scrollbar.trainHeightPercentage = this.getScrollTrainHeightPercentage();
        }, 10);

        /*
        this._inputer.addEventListener("keydown", (evt: KeyboardEvent) => {
            setTimeout(() => {
                this.handleInputerKeyDown(evt);
            }, 5);
        });
        */

    }

    reload(_model: TextModel) {
        this.documentView.reload(_model);
        this.documentView.render();

        this._scrollbar.trainHeightPercentage = this.getScrollTrainHeightPercentage();
    }

    private stylish()
    {
        this._dom.style.overflowY = "hidden"
        this._dom.style.fontSize = EditorView.PxPerLine + "px";
        this._dom.style.fontFamily = "微软雅黑";
    }

    /*
    private handleInputerKeyDown(evt: KeyboardEvent) {
        /*
        if (this.isInputerCompositing()) {
            this.handleCompositionKeydown(evt);
            return;
        }
        */

/*
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

                    this._model.applyTextEdit(textEdit)
                    this.applyTextEdit(textEdit);
                    this.updatePosition(textEdit);

                    this.updateCursor(this._position);

                    this.inputerView.clearContent();
                }
        }

    }
    */

    applyTextEdit(_textEdit: TextEdit) {
        let _range = _textEdit.range;

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

    private handleScrollBarTrainMove(evt: TrainMoveEvent) {
        let tmp = this._document.element().scrollHeight - this._document.element().clientHeight;
        this._document.scrollTop = tmp * evt.percentage;
    }

    private getScrollPercentage() : number {
        let scrollTop = this._document.scrollTop,
            scrollHeight = this._document.element().scrollHeight,
            clientHeight = this._document.element().clientHeight;
        return scrollTop / (scrollHeight - clientHeight);
    }

    private getScrollTrainHeightPercentage() : number {
        let clientHeight = this._document.element().clientHeight,
            scrollHeight = this._document.element().scrollHeight;
        return clientHeight / scrollHeight;
    }

    private handleDocumentScroll(evt: Event) {
        this._scrollbar.trainPositionPercentage = this.getScrollPercentage();
    }

    get documentView() : DocumentView {
        return this._document;
    }

    set width(w : number) {
        super.width = w;

        this._toolbar.width = w;
        this._document.width = w - this._scrollbar.width;
    }

    get width() {
        return super.width;
    }

    set height(h : number) {
        super.height = h

        let v = h - this._toolbar.height;
        this._document.height = v;
        this._scrollbar.height = v;
    }

    get height() {
        return super.height;
    }

    set fontFamily(fm: string) {
        this._dom.style.fontFamily = fm;
    }

    dispose() {
        this._document.dispose();
        this._scrollbar.dispose();
        this._toolbar.dispose();
    }

}
