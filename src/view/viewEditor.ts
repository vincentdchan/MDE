import {IDisposable, DomHelper} from "../util"
import {DocumentView} from "./viewDocument"
import {ScrollBarView, TrainMoveEvent} from "./viewScrollBar"
import {CursorView} from "./viewCursor"
import {InputerView} from "./viewInputer"
import {ToolbarView} from "./viewToolbar"
import {TextModel} from "../model"
import {ButtonOption} from "."

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

export class EditorView extends DomHelper.FixedElement implements IDisposable {

    public static readonly PxPerLine = 16;
    public static readonly DefaultLineMarginWidth = 40;
    public static readonly MinWidth = 100;

    private _model: TextModel;
    private _document: DocumentView;
    private _scrollbar: ScrollBarView;
    private _toolbar: ToolbarView;
    private _cursor: CursorView;
    private _inputer: InputerView;
    private _timers: NodeJS.Timer[] = [];

    constructor(_model: TextModel) {
        super("div", "mde-editor");

        this._toolbar = new ToolbarView(toolbarButtons);
        this._toolbar.top = 0;

        this._model = _model;
        this._document = new DocumentView(_model);
        this._document.top = this._toolbar.height;
        this._document.on("scroll", this.handleDocumentScroll.bind(this));
        this._document.render();

        this._scrollbar = new ScrollBarView();
        this._scrollbar.top = this._toolbar.height;
        this._scrollbar.right = 0;

        let thk = () => {
            return this._document.scrollTop;
        }
        this._cursor = new CursorView(thk);

        this._inputer = new InputerView(thk);

        this._cursor.appendTo(this._dom);
        this._inputer.appendTo(this._dom);
        this._toolbar.appendTo(this._dom);
        this._document.appendTo(this._dom);
        this._scrollbar.appendTo(this._dom);

        this.stylish();

        this._inputer.addEventListener("focus", this.handleInputerFocused.bind(this));
        this._inputer.addEventListener("blur", this.handleInputerBlur.bind(this));

        this._scrollbar.on("trainMove", this.handleScrollBarTrainMove.bind(this));

        this._timers.push(setTimeout(() => {
            this._scrollbar.trainHeightPercentage = this.getScrollTrainHeightPercentage();
        }, 10));
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

    private handleInputerFocused(evt : FocusEvent) {
        this._cursor.excite();
    }

    private handleInputerBlur(evt : FocusEvent) {
        this._cursor.setOff();
    }

    get inputerView() : InputerView {
        return this._inputer;
    }

    get documentView() : DocumentView {
        return this._document;
    }

    get cursorView() : CursorView  {
        return this._cursor;
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
        this._cursor.dispose();
        this._inputer.dispose();

        this._timers.forEach((e) => {
            clearTimeout(e);
        });
    }

}
