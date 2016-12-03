
import {LineView} from "./viewLine"
import {IVirtualElement, Coordinate, HighlightingRange, HighlightingType} from "."
import {TextModel, LineModel, Position} from "../model"
import {IDisposable, DomHelper} from "../util"
import {PopAllQueue} from "../util/queue"

export class DocumentView extends DomHelper.AbsoluteElement implements IDisposable {

    private _model: TextModel;
    private _container: HTMLDivElement;
    private _lines: LineView[];
    private _highlightingRanges: PopAllQueue<HighlightingRange>[];

    constructor(_model) {
        super("div", "mde-document");
        this._lines = [];
        this._model = _model;
        this._highlightingRanges = [];

        this._container = <HTMLDivElement>DomHelper.elem("div", "mde-document-container");
        this._dom.appendChild(this._container);

        this._dom.style.overflowY = "scroll";
        this._dom.style.overflowX = "auto";

        this._dom.style.wordBreak = "normal";
        this._dom.style.wordWrap = "break-word";
        this._dom.style.whiteSpace = "pre-wrap";
    }

    reload(_model: TextModel) {
        this.dispose();

        this._lines = [] 
        this._model = _model;
        this._highlightingRanges = [];

        this._dom.removeChild(this._container);
        this._container = <HTMLDivElement>DomHelper.elem("div", "mde-document-container");
        this._dom.appendChild(this._container);
    }

    render(): HTMLElement {

        this._lines[0] = null;
        this._model.forEach((line: LineModel) => {
            var vl = new LineView();

            this._lines[line.number] = vl;
            this._highlightingRanges[line.number] = new PopAllQueue<HighlightingRange>();

            vl.render(line.text);
            this._container.appendChild(vl.element());
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
        this._lines[line].render(this._model.lineAt(line).text, this._highlightingRanges[line].popAll());
    }

    // move lines from after [index] 
    moveLinesBackward(index: number, count: number) {
        if (index > this.linesCount) {
            this.appendLines(count);
            return;
        }
        let _lines_prefix = this._lines.slice(0, index);
        let _lines_postfix = this._lines.slice(index);

        let _new_lines_arr = [];
        _new_lines_arr.length = count;
        this._lines = _lines_prefix.concat(_new_lines_arr).concat(_lines_postfix);

        let _queues_prefix = this._highlightingRanges.slice(0, index);
        let _queues_postfix = this._highlightingRanges.slice(index);

        let _new_queues_arr = [];
        _new_queues_arr.length = count;
        this._highlightingRanges = _queues_prefix.concat(_new_queues_arr).concat(_queues_postfix);

        for (let i = index + count - 1; i >= index; i--) {
            this._lines[i] = new LineView();
            this._container.insertBefore(this._lines[i].element(), 
                this._lines[i + 1].element());
        }
    }

    appendLines(num: number) {
        let _new_lines_arr: LineView[] = [];
        let _new_queues_arr: PopAllQueue<HighlightingRange>[] = [];

        _new_lines_arr.length = num;
        _new_queues_arr.length = num;
        for (let i = 0; i < num; i++) {
            _new_lines_arr[i] = new LineView();
            _new_queues_arr[i] = new PopAllQueue<HighlightingRange>();
            this._container.appendChild(_new_lines_arr[i].element());
        }

        this._lines = this._lines.concat(_new_lines_arr);
        this._highlightingRanges = this._highlightingRanges.concat(_new_queues_arr);
    }

    // delete line from [begin] to [end - 1]
    // set line[begin .. begin + count - 1] to undefined
    deleteLines(begin: number, end?: number) {
        if (begin <= 0)
            throw new Error("Index out of range.");
        end = end? end : begin + 1;

        let _lines_prefix = this._lines.slice(0, begin),
            _lines_middle = this._lines.slice(begin, end),
            _lines_postfix = this._lines.slice(end);

        let _queues_prefix = this._highlightingRanges.slice(0, begin),
            _queues_postfix = this._highlightingRanges.slice(end);

        this._lines = _lines_prefix.concat(_lines_postfix);
        this._highlightingRanges = _queues_prefix.concat(_queues_postfix)

        _lines_middle.forEach((e: LineView) => {
            e.dispose();
            e.element().remove();
        });
    }

    dispose() {
        this._lines.forEach((e: LineView) => {
            if (e) {
                e.dispose();
            }
        })
    }

    get scrollTop() {
        return this._dom.scrollTop;
    }

    set scrollTop(h : number) {
        this._dom.scrollTop = h;
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
