import {IDisposable, DomHelper, KeyCode} from "../util"
import {TextModel, TextEditEvent, TextEdit} from "../model"
import * as marked  from "marked"

export class PreviewDocumentView extends DomHelper.AbsoluteElement implements IDisposable {

    private _model: TextModel;
    private _container: HTMLDivElement;
    private _textEdit_handler: (evt: TextEditEvent) => void;

    constructor()  {
        super("div", "mde-preview-document");

        this._dom.style.overflow = "scroll";

        this._container = DomHelper.Generic.elem<HTMLDivElement>("div", "mde-preview-document-container");
        this._dom.appendChild(this._container);

        this._textEdit_handler = (evt: TextEditEvent) => {
            this.renderImd();
        }
    }

    bind(model: TextModel) {
        this._model = model;
        this._model.on("textEdit", this._textEdit_handler);
    }

    unbind() {
        this._model.removeListener("textEdit", this._textEdit_handler);
        this._model = null;
    }

    renderImd() {
        let content = this._model.reportAll();
        this._container.innerHTML = marked(content);
    }

    ///
    /// the container maybe very huge,
    /// clear it.
    ///
    dispose() {
        if (this._model) {
            this.unbind();
        }
        this._dom.removeChild(this._container);
    }

}
