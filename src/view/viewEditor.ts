import {IDisposable, DomHelper} from "../util"
import {DocumentView} from "./viewDocument"
import {CursorView} from "./viewCursor"
import {InputerView} from "./viewInputer"
import {TextModel} from "../model"

export class EditorView extends DomHelper.AppendableDomWrapper implements IDisposable {

    public static readonly PxPerLine = 16;
    private _model: TextModel;
    private _document: DocumentView;
    private _cursor: CursorView;
    private _inputer: InputerView;

    constructor(_model: TextModel) {
        super("div", "mde-editor");

        this._model = _model;
        this._document = new DocumentView(_model);
        this._document.render();

        let thk = () => {
            return this.scrollTop;
        }
        this._cursor = new CursorView(thk);

        this._inputer = new InputerView(thk);

        this._cursor.appendTo(this._dom);
        this._inputer.appendTo(this._dom);
        this._document.appendTo(this._dom);

        this.stylish();

        this._inputer.addEventListener("focus", this.handleInputerFocused.bind(this));
        this._inputer.addEventListener("blur", this.handleInputerBlur.bind(this));
    }

    private stylish()
    {
        this._dom.style.position = "fixed";
        this._dom.style.overflowY = "scroll"
        this._dom.style.fontSize = EditorView.PxPerLine + "px";
        this._dom.style.fontFamily = "Consolas";
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

    get width() : number {
        let rect = this._dom.getBoundingClientRect();
        return rect.width;
    }

    get height() : number {
        let rect = this._dom.getBoundingClientRect();
        return rect.height;
    }

    set width(w : number) {
        this._dom.style.width = w + "px";
    }

    set height(h : number) {
        this._dom.style.height = h + "px";
    }

    set fontFamily(fm: string) {
        this._dom.style.fontFamily = fm;
    }

    dispose() {
        this._document.dispose();
        this._cursor.dispose();
    }

}
