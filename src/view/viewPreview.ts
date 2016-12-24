import {IDisposable, DomHelper, KeyCode} from "../util"
import {ScrollBarView, TrainMoveEvent} from "./viewScrollBar"
import {PreviewDocumentView} from "./viewPreviewDocument"
import {TextModel, TextEditEvent} from "../model"

export class PreviewView extends DomHelper.FixedElement implements IDisposable {

    private _model : TextModel;
    
    private _scrollbar : ScrollBarView;
    private _document : PreviewDocumentView;

    private _textEdit_handler: (evt: TextEditEvent) => void;

    constructor() {
        super("div", "mde-preview");

        this._dom.style.overflowY = "hidden";

        this._scrollbar = new ScrollBarView();
        this._scrollbar.appendTo(this._dom);

        this._scrollbar.on("trainMove", (e: TrainMoveEvent) =>  {
            let scrollHeight = this._document.element().scrollHeight - this._document.element().clientHeight;
            this._document.element().scrollTop = scrollHeight * e.percentage;
        });

        this._document = new PreviewDocumentView();
        this._document.appendTo(this._dom);

        this._textEdit_handler = (evt: TextEditEvent) => {
            this._document.renderImd();
            setTimeout(() => {
                let docRect = this._document.element().getBoundingClientRect();
                this._scrollbar.trainHeightPercentage = docRect.height / this._document.element().scrollHeight;
                this._scrollbar.trainPositionPercentage = 0;
            }, 10);
        }

        function fixed(num: number, fixed: number) {
            let times = Math.pow(10, 2);
            return Math.floor(num * times) / times;
        }

        this._document.on("scroll", (evt: Event) => {
            setTimeout(() => {
                let elm = this._document.element();
                let rect = elm.getBoundingClientRect();
                this._scrollbar.trainPositionPercentage = fixed(elm.scrollTop / (elm.scrollHeight - rect.height), 2);
            });
        });
    }

    bind(model: TextModel) {
        this._model = model;
        this._model.on("textEdit", this._textEdit_handler);

        this._document.bind(model);
    }

    unbind() {
        this._document.unbind();
        this._model.removeListener("textEdit", this._textEdit_handler);
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
