
import {LineView} from "./viewLine"
import {IVirtualElement} from "."
import {TextModel} from "../model/textModel"
import {LineModel} from "../model/lineModel"
import {elem} from "../util/dom"
import {IDisposable} from "../util"

export class DocumentView implements IDisposable {

    private _model: TextModel;
    private _lines: LineView[];
    private _dom: HTMLElement = null;

    constructor(_model) {
        this._lines = [];
        this._model;
        this._dom = elem("div", "editor-document");
    }

    render(): HTMLElement {

        this._lines[0] = null;
        this._model.forEach((line: LineModel) => {
            var vl = new LineView(line.number);
            this._lines[line.number] = vl;
            vl.render();
            this._dom.appendChild(vl.element);
        })

        return this._dom;
    }

    justifyLineNumber() {

    }

    renderLine(line: number) {

    }

    // move lines from after [index] 
    moveLinesBackward(index: number, count: number) {
        let prefix = this._lines.slice(0, index);
        let postfix = this._lines.slice(index);

        let new_arr = [];
        new_arr.length = count;
        this._lines = prefix.concat(new_arr).concat(postfix);
    }

    // delete line from [begin] to [end - 1]
    // set line[begin .. begin + count - 1] to undefined
    deleteLines(begin: number, end?: number) {
        if (begin <= 0)
            throw new Error("Index out of range.");
        end = end | begin + 1;

        let prefix = this._lines.slice(0, begin);
        let middle = this._lines.slice(begin, end);
        let postfix = this._lines.slice(end);

        this._lines = prefix.concat(postfix);
        middle.forEach((e: LineView) => {
            e.dispose();
        });
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

    get linesCount() {
        return this._lines.length - 1;
    }

    get model() {
        return this._model;
    }

    set model(_model: TextModel) {
        this._model = _model;
    }

    get element() {
        return this._dom;
    }

}
