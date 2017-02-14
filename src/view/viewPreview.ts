import {IDisposable, DomHelper, KeyCode} from "../util"
import {ScrollBarView, TrainMoveEvent} from "./viewScrollBar"
import {PreviewDocumentView} from "./viewPreviewDocument"
import {TextModel, TextEditEvent} from "../model"

export class PreviewView extends DomHelper.FixedElement implements IDisposable {

    private _model : TextModel;
    
    private _scrollbar : ScrollBarView;
    private _document : PreviewDocumentView;

    private _textEdit_handler: (evt: TextEditEvent) => void;
    private _render_counter: number = 0;

    constructor() {
        super("div", "mde-preview");

        this._dom.addEventListener("mousemove", (e: MouseEvent) => {
            this._scrollbar.excite();
        });

        this._scrollbar = new ScrollBarView();
        this._scrollbar.right = 0;
        this._scrollbar.appendTo(this._dom);

        this._scrollbar.on("trainMove", (e: TrainMoveEvent) =>  {
            let scrollHeight = this._document.element().scrollHeight - this._document.element().clientHeight;
            this._document.element().scrollTop = scrollHeight * e.percentage;
        });

        this._document = new PreviewDocumentView();
        this._document.appendTo(this._dom);

        this._textEdit_handler = (evt: TextEditEvent) => {
            this._render_counter++;

            setTimeout(() => {
                this._render_counter--;
                if (this._render_counter === 0) {
                    this._document.renderImd();

                    setTimeout(() => {
                        this._scrollbar.trainHeightPercentage = this._document.element().clientHeight / this._document.element().scrollHeight;
                        this._scrollbar.trainPositionPercentage = 0;
                    }, 10);
                }
            }, 850);

        }

        function makeInRange(target: number, max: number, min: number) {
            if (target > max) return max;
            if (target < min) return min;
            return target;
        }

        this._document.on("scroll", (evt: Event) => {
            setTimeout(() => {
                let elm = this._document.element();
                let rect = elm.getBoundingClientRect();
                this._scrollbar.trainPositionPercentage = makeInRange(elm.scrollTop / (elm.scrollHeight - rect.height), 1, 0);
            });
        });
    }

    bind(model: TextModel) {
        this._model = model;
        this._model.on("textEdit", this._textEdit_handler);

        this._document.bind(model);

        setTimeout(() => {
            let elm = this._document.element();

            this._scrollbar.trainHeightPercentage = elm.clientHeight / elm.scrollHeight;
        }, 50);
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
        this._document.width = w;
    }

    get height() {
        return super.height;
    }

    set height(h: number) {
        super.height = h;

        this._document.height = h;
        this._scrollbar.height = h;
    }

    get documentView() {
        return this._document;
    }

    dispose() {
        this._scrollbar.dispose();
        this._document.dispose();
    }

}
