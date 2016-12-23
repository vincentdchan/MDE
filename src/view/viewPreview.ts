import {IDisposable, DomHelper, KeyCode} from "../util"
import {ScrollBarView} from "./viewScrollBar"
import {PreviewDocumentView} from "./viewPreviewDocument"
import {TextModel} from "../model"

export class PreviewView extends DomHelper.AbsoluteElement implements IDisposable {

    private _model : TextModel;
    
    private _scrollbar : ScrollBarView;
    private _document : PreviewDocumentView;

    constructor() {
        super("div", "mde-preview");

        this._dom.style.overflowY = "hidden";

        this._scrollbar = new ScrollBarView();
        this._scrollbar.appendTo(this._dom);

        this._document = new PreviewDocumentView();
        this._document.appendTo(this._dom);
    }

    bind(model: TextModel) {
        this._model = model;
        this._document.bind(model);
    }

    unbind() {
        this._document.unbind();
        this._model = null;
    }

    get width() {
        return super.width;
    }

    set width(w: number) {
        super.width = w;

        this._document.width = w - this._scrollbar.width;
        this._scrollbar.marginLeft = w - this._scrollbar.width;
    }

    get height() {
        return super.height;
    }

    set height(h: number) {
        super.height = h;

        this._document.height = h;
        this._scrollbar.height = h;
    }

    dispose() {
        this._scrollbar.dispose();
        this._document.dispose();
    }

}
