import {elem, IDOMWrapper} from "../util/dom"
import {IDisposable} from "../util"
import {DocumentView} from "./viewDocument"
import {CursorView} from "./viewCursor"
import {InputerView} from "./viewInputer"
import {TextModel} from "../model"

export class EditorView implements IDOMWrapper, IDisposable {

    private _dom: HTMLElement;
    private _model: TextModel;
    private _document: DocumentView;
    private _cursor: CursorView;
    private _inputer: InputerView;

    constructor(_model: TextModel) {
        this._dom = elem("div", "mde-editor");

        this._model = _model;
        this._document = new DocumentView(_model);
        this._document.render();
        this._cursor = new CursorView();

        this._inputer = new InputerView();

        this._dom.appendChild(this._cursor.element());
        this._dom.appendChild(this._inputer.element());
        this._dom.appendChild(this._document.element());

        this._inputer.on("focus", this.handleInputerFocused.bind(this));
        this._inputer.on("blur", this.handleInputerBlur.bind(this));
    }

    private handleInputerFocused(evt : FocusEvent) {
        this._cursor.excite();
    }

    private handleInputerBlur(evt : FocusEvent) {
        this._cursor.setOff();
    }

    element() {
        return this._dom;
    }

    on(name: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean) {
        this._dom.addEventListener(name, listener);
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

    dispose() {
        this._document.dispose();
        this._cursor.dispose();
    }

}
