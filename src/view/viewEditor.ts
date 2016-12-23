import {IDisposable, DomHelper} from "../util"
import {Coordinate} from "."
import {DocumentView} from "./viewDocument"
import {ScrollHeightChangedEvent} from "./events"
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
    implements IDisposable {

    public static readonly PxPerLine = 16;
    public static readonly DefaultLineMarginWidth = 40;
    public static readonly MinWidth = 100;

    private _model: TextModel = null;

    private _document: DocumentView;
    private _scrollbar: ScrollBarView;
    private _toolbar: ToolbarView;

    constructor() {
        super("div", "mde-editor");

        this._toolbar = new ToolbarView(toolbarButtons);
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

        this.stylish();

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

    private stylish()
    {
        this._dom.style.overflowY = "hidden"
        this._dom.style.fontSize = EditorView.PxPerLine + "px";
        this._dom.style.fontFamily = "微软雅黑";
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
