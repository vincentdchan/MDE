import {IDisposable, DomHelper, i18n as $} from "../util"
import {last} from "../util/fn"
import {Coordinate} from "."
import {DocumentView} from "./viewDocument"
import {ScrollHeightChangedEvent} from "./events"
import {ScrollBarView, TrainMoveEvent} from "./viewScrollBar"
import {CursorView} from "./viewCursor"
import {InputerView} from "./viewInputer"
import {ToolbarView} from "./viewToolbar"
import {TextModel, TextEdit, TextEditType, 
    TextEditApplier, Position, Snippet, PositionUtil} from "../model"
import {ButtonOption} from "."


export class TooglePreviewEvent extends Event {

    constructor() {
        super("tooglePreview");
    }

}

function generateRightButtons(editorView: EditorView) : ButtonOption[] {
    return [
        {
            name: "tooglePreview",
            text: $.getString("toolbar.tooglePreview"),
            icon: "fa fa-eye",
            onClick: (e: MouseEvent) => {
                let evt = new TooglePreviewEvent();
                editorView.element().dispatchEvent(evt);
            }
        }
    ]
}

export class EditorView extends DomHelper.FixedElement 
    implements IDisposable {

    public static readonly DefaultLineMarginWidth = 40;
    public static readonly MinWidth = 100;
    private static readonly SnippetRegex = /\$\{\d+:\w+\}/g;

    private _model: TextModel = null;

    private _document: DocumentView;
    private _scrollbar: ScrollBarView;
    private _toolbar: ToolbarView;

    constructor() {
        super("div", "mde-editor");

        this._toolbar = new ToolbarView(this.generateToolbarMenus(), generateRightButtons(this));
        this._toolbar.top = 0;

        this._document = new DocumentView();
        this._document.top = this._toolbar.height;
        this._document.on("scroll", this.handleDocumentScroll.bind(this));
        this._document.on("scrollHeightChanged", this.handleDocumentScrollHeightChanged.bind(this));
        // this._document.on("click", this.handleDocumentClick.bind(this));

        this._scrollbar = new ScrollBarView();
        this._scrollbar.top = this._toolbar.height;
        this._scrollbar.right = 0;

        this._toolbar.appendTo(this._dom);
        this._document.appendTo(this._dom);
        this._scrollbar.appendTo(this._dom);

        this._scrollbar.on("trainMove", this.handleScrollBarTrainMove.bind(this));

        setTimeout(() => {
            this._scrollbar.trainHeightPercentage = this.getScrollTrainHeightPercentage();
        }, 10);

    }

    copyToClipboard() {
        this._document.copyToClipboard();
    }

    pasteToDocument() {
        this._document.pasteToDocument();
    }

    cutToClipboard() {
        this._document.cutToClipboard();
    }

    undo() {
        this._document.undo();
    }

    redo() {
        this._document.redo();
    }

    bind(model: TextModel) {
        this._model = model;
        this._document.bind(this._model);

        setTimeout(() => {
            this._scrollbar.trainHeightPercentage = this.getScrollTrainHeightPercentage();
        }, 10);
    }

    unbind() {
        this._document.unbind();
        this._model = null;
    }

    private snippetBold() {
        if (this._document.selectionManager.length > 0 ) {
            let majorSelection = this._document.selectionManager.selectionAt(0);
            let pos = PositionUtil.clonePosition(majorSelection.beginPosition);

            if (majorSelection.collapsed) {
                let textEdit = new TextEdit(TextEditType.InsertText, majorSelection.beginPosition, "****");
                this._document.applyTextEdit(textEdit);
            } else {
                let textEdit = new TextEdit(TextEditType.ReplaceText, {
                    begin: majorSelection.beginPosition,
                    end: majorSelection.endPosition
                }, "****");
                this._document.applyTextEdit(textEdit);
            }

            setTimeout(() => {
                let tmp = PositionUtil.clonePosition(pos);
                tmp.offset += 2;
                majorSelection.beginPosition = majorSelection.endPosition = tmp;
                majorSelection.repaint();
                majorSelection.focus();
            }, 25);
        }
    }

    private snippetItalic() {
        if (this._document.selectionManager.length > 0 ) {
            let majorSelection = this._document.selectionManager.selectionAt(0);
            let pos = PositionUtil.clonePosition(majorSelection.beginPosition);

            if (majorSelection.collapsed) {
                let textEdit = new TextEdit(TextEditType.InsertText, majorSelection.beginPosition, "**");
                this._document.applyTextEdit(textEdit);
            } else {
                let textEdit = new TextEdit(TextEditType.ReplaceText, {
                    begin: majorSelection.beginPosition,
                    end: majorSelection.endPosition
                }, "**");
                this._document.applyTextEdit(textEdit);
            }

            setTimeout(() => {
                let tmp = PositionUtil.clonePosition(pos);
                tmp.offset += 1;
                majorSelection.beginPosition = majorSelection.endPosition = tmp;
                majorSelection.repaint();
                majorSelection.focus();
            }, 25);
        }
    }

    private snippetUnderline() {
        if (this._document.selectionManager.length > 0 ) {
            let majorSelection = this._document.selectionManager.selectionAt(0);
            let pos = PositionUtil.clonePosition(majorSelection.beginPosition);

            if (majorSelection.collapsed) {
                let textEdit = new TextEdit(TextEditType.InsertText, majorSelection.beginPosition, "____");
                this._document.applyTextEdit(textEdit);
            } else {
                let textEdit = new TextEdit(TextEditType.ReplaceText, {
                    begin: majorSelection.beginPosition,
                    end: majorSelection.endPosition
                }, "____");
                this._document.applyTextEdit(textEdit);
            }

            setTimeout(() => {
                let tmp = PositionUtil.clonePosition(pos);
                tmp.offset += 2;
                majorSelection.beginPosition = majorSelection.endPosition = tmp;
                majorSelection.repaint();
                majorSelection.focus();
            }, 25);
        }
    }

    private snippetOrderedList() {
        if (this._document.selectionManager.length > 0 ) {
            let majorSelection = this._document.selectionManager.selectionAt(0);
            let pos: Position;

            if (majorSelection.collapsed) {
                let textEdit = new TextEdit(TextEditType.InsertText, majorSelection.beginPosition, "\n1. ");
                pos = this._document.applyTextEdit(textEdit);
            } else {
                let textEdit = new TextEdit(TextEditType.ReplaceText, {
                    begin: majorSelection.beginPosition,
                    end: majorSelection.endPosition
                }, "\n1. ");
                pos = this._document.applyTextEdit(textEdit);
            }

            setTimeout(() => {
                majorSelection.beginPosition = majorSelection.endPosition = pos;
                majorSelection.repaint();
                majorSelection.focus();
            }, 25);
        }
    }

    private snippetUnorderedList() {
        if (this._document.selectionManager.length > 0 ) {
            let majorSelection = this._document.selectionManager.selectionAt(0);
            let pos: Position;

            if (majorSelection.collapsed) {
                let textEdit = new TextEdit(TextEditType.InsertText, majorSelection.beginPosition, "\n- ");
                pos = this._document.applyTextEdit(textEdit);
            } else {
                let textEdit = new TextEdit(TextEditType.ReplaceText, {
                    begin: majorSelection.beginPosition,
                    end: majorSelection.endPosition
                }, "\n- ");
                pos = this._document.applyTextEdit(textEdit);
            }

            setTimeout(() => {
                majorSelection.beginPosition = majorSelection.endPosition = pos;
                majorSelection.repaint();
                majorSelection.focus();
            }, 25);
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

    private handleDocumentScrollHeightChanged(evt: ScrollHeightChangedEvent) {
        this._scrollbar.trainHeightPercentage = this.getScrollTrainHeightPercentage();
        this._scrollbar.trainPositionPercentage = this.getScrollPercentage();
    }

    private generateToolbarMenus() : ButtonOption[] {
        return [
            {
                name: "bold",
                text: $.getString("toolbar.bold"),
                icon: "fa fa-bold",
                onClick: (e: MouseEvent) => {
                    this.snippetBold();
                }
            },
            {
                name: "italic",
                text: $.getString("toolbar.italic"),
                icon: "fa fa-italic",
                onClick: (e: MouseEvent) => {
                    this.snippetItalic();
                }
            }, 
            {
                name: "underline",
                text: $.getString("toolbar.underline"),
                icon: "fa fa-underline",
                onClick: (e: MouseEvent) => {
                    this.snippetUnderline();
                }
            },
            {
                name: "orderedlist",
                text: $.getString("toolbar.orderedList"),
                icon: "fa fa-list-ol",
                onClick: (e: MouseEvent) => {
                    this.snippetOrderedList();
                }
            }, 
            {
                name: "unorderedlist",
                text: $.getString("toolbar.unorderedList"),
                icon: "fa fa-list-ul",
                onClick: (e: MouseEvent) => {
                    this.snippetUnorderedList();
                }
            }
        ];
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
