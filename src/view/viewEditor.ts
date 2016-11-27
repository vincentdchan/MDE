import {IDisposable, DomHelper} from "../util"
import {DocumentView} from "./viewDocument"
import {LineMarginView} from "./viewLineMargin"
import {ScrollBarView} from "./viewScrollBar"
import {CursorView} from "./viewCursor"
import {InputerView} from "./viewInputer"
import {TextModel} from "../model"

export class EditorView extends DomHelper.FixedElement implements IDisposable {

    public static readonly PxPerLine = 16;
    public static readonly DefaultLineMarginWidth = 40;

    private _model: TextModel;
    private _document: DocumentView;
    private _scrollbar: ScrollBarView;
    private _marginMargin: LineMarginView;
    private _cursor: CursorView;
    private _inputer: InputerView;

    constructor(_model: TextModel) {
        super("div", "mde-editor");

        this._model = _model;
        this._document = new DocumentView(_model);
        this._document.marginLeft = EditorView.DefaultLineMarginWidth;
        this._document.render();

        this._marginMargin = new LineMarginView();
        this._marginMargin.width = EditorView.DefaultLineMarginWidth;

        this._scrollbar = new ScrollBarView();
        this._scrollbar.top = 0;
        this._scrollbar.right = 0;

        let thk = () => {
            return this.scrollTop;
        }
        this._cursor = new CursorView(thk);

        this._inputer = new InputerView(thk);

        this._cursor.appendTo(this._dom);
        this._inputer.appendTo(this._dom);
        this._marginMargin.appendTo(this._dom);
        this._document.appendTo(this._dom);
        this._scrollbar.appendTo(this._dom);

        this.stylish();

        this._inputer.addEventListener("focus", this.handleInputerFocused.bind(this));
        this._inputer.addEventListener("blur", this.handleInputerBlur.bind(this));
    }

    private stylish()
    {
        this._dom.style.position = "fixed";
        this._dom.style.overflowY = "scroll"
        this._dom.style.fontSize = EditorView.PxPerLine + "px";
        this._dom.style.fontFamily = "微软雅黑";
    }

    private handleInputerFocused(evt : FocusEvent) {
        this._cursor.excite();
    }

    private handleInputerBlur(evt : FocusEvent) {
        this._cursor.setOff();
    }

    get scrollTop() {
        return this._dom.scrollTop;
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

        this._document.width = w - this._marginMargin.width - this._scrollbar.width;
    }

    set height(h : number) {
        super.height = h

        this._document.height = h;
        this._scrollbar.height = h;
    }

    set fontFamily(fm: string) {
        this._dom.style.fontFamily = fm;
    }

    dispose() {
        this._document.dispose();
        this._cursor.dispose();
    }

}
