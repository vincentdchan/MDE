
import {LineView} from "./lineView"
import {IVirtualElement} from "."
import {TextModel} from "../model/textModel"
import {LineModel} from "../model/lineModel"
import {elem} from "../util/dom"
import {IDisposable} from "../util"

export class VirtualDocument 
    implements IVirtualElement, IDisposable {

    private _model: TextModel;
    private _lines: LineView[];
    private _dom: HTMLElement = null;

    constructor(_model) {
        this._lines = [];
        this._model;
    }

    render(): HTMLElement {
        this.dispose();
        this._dom = elem("div", "editor-document");

        this._model.forEach((line: LineModel) => {
            var vl = new LineView(line.number);
            this._lines[line.number] = vl;
            this._dom.appendChild(vl.render());
        })

        return this._dom;
    }

    refreshLine(index: number) {

    }

    dispose() {
        if (this._dom) {
            this._dom.parentNode.removeChild(this._dom);
            this._dom = null;
        }
    }

    get lines() {
        return this._lines;
    }

    get model() {
        return this._model;
    }

    set model(_model: TextModel) {
        this._model = _model;
    }

}
