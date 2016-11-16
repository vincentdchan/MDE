
import {LineView} from "./viewLine"
import {IVirtualElement, Coordinate} from "."
import {TextModel, LineModel, Position} from "../model"
import {elem, IDOMWrapper} from "../util/dom"
import {IDisposable} from "../util"

export class DocumentView implements IDOMWrapper, IDisposable {

    private _model: TextModel;
    private _lines: LineView[];
    private _dom: HTMLElement = null;

    constructor(_model) {
        this._lines = [];
        this._model = _model;
        this._dom = elem("div", "mde-document");
    }

    render(): HTMLElement {

        this._lines[0] = null;
        this._model.forEach((line: LineModel) => {
            var vl = new LineView();
            this._lines[line.number] = vl;
            vl.render(line.text);
            this._dom.appendChild(vl.element());
        })

        return this._dom;
    }

    getCoordinate(pos: Position) : Coordinate {
        if (pos.line <= 0 || pos.line > this.linesCount)
            throw new Error("Index out of range.");
        return this._lines[pos.line].getCoordinate(pos.offset);
    }

    renderLine(line: number) {
        if (line <= 0 || line > this.linesCount)
            throw new Error("<index out of range> line:" + line + " LinesCount:" + this.linesCount);
        this._lines[line].render(this._model.lineAt(line).text);
    }

    // move lines from after [index] 
    moveLinesBackward(index: number, count: number) {
        if (index > this.linesCount) {
            this.appendLines(count);
            return;
        }
        let prefix = this._lines.slice(0, index);
        let postfix = this._lines.slice(index);

        let new_arr = [];
        new_arr.length = count;
        this._lines = prefix.concat(new_arr).concat(postfix);

        for (let i = index + count - 1; i >= index; i--) {
            this._lines[i] = new LineView();
            this._dom.insertBefore(this._lines[i].element(), 
                this._lines[i + 1].element());
        }
    }

    appendLines(num: number) {
        var new_arr: LineView[] = [];
        new_arr.length = num;
        for (let i = 0; i < num; i++) {
            new_arr[i] = new LineView();
            this._dom.appendChild(new_arr[i].element());
        }

        this._lines = this._lines.concat(new_arr);
    }

    // delete line from [begin] to [end - 1]
    // set line[begin .. begin + count - 1] to undefined
    deleteLines(begin: number, end?: number) {
        if (begin <= 0)
            throw new Error("Index out of range.");
        end = end? end : begin + 1;

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

    element() {
        return this._dom;
    }

    on(name: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean) {
        this._dom.addEventListener(name, listener, useCapture);
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

}
