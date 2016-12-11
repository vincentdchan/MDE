import {LineView} from "./viewLine"
import {IVirtualElement, Coordinate, HighlightingRange, HighlightingType} from "."
import {TextModel, LineModel, Position, PositionUtil, 
    TextEdit, TextEditType, TextEditApplier} from "../model"
import {IDisposable, DomHelper, KeyCode} from "../util"
import {PopAllQueue} from "../util/queue"
import {InputerView} from "./viewInputer"
import {CursorView} from "./viewCursor"
import {SelectionManager} from "./viewSelection"
import {remote, clipboard} from "electron"
import * as Electron from "electron"

function setHeight(elm: HTMLElement, h: number) {
    elm.style.height = h + "px";
}

export class CursorMoveEvent extends Event {

    private _pos: Position;
    private _co: Coordinate;

    constructor(pos: Position, abs_co: Coordinate) {
        super("cursorMove");
        this._pos = pos;
        this._co = abs_co;
    }

    get position() {
        return this._pos;
    }

    get absoluteCoordinate() {
        return this._co;
    }

}

class NullElement extends DomHelper.ResizableElement {

}

/// Event:
///
/// CursorMove
///
export class DocumentView extends DomHelper.AbsoluteElement implements 
    IDisposable, TextEditApplier {

    public static readonly CursorBlinkingInternal = 500;

    private _model: TextModel = null;
    private _container: HTMLDivElement;
    private _lines: LineView[];
    private _nullArea: NullElement;
    private _highlightingRanges: PopAllQueue<HighlightingRange>[];

    private _window_mousemove_handler: EventListener;
    private _window_mouseup_handler: EventListener;
    private _window_keydown_handler: EventListener;
    private _window_keyup_handler: EventListener;

    private _mouse_pressed: boolean = false;
    private _ctrl_pressed: boolean = false;
    private _compositing: boolean = false;

    private _allow_multiselections: boolean;
    private _selection_manger: SelectionManager;


    constructor(allowMultiselections: boolean = false) {
        super("div", "mde-document unselectable");

        this._allow_multiselections = allowMultiselections;
        this._lines = [];
        this._highlightingRanges = [];

        let absPosGetter = (pos: Position) => {
            let clientCo = this.getCoordinate(pos);
            let rect = this._dom.getBoundingClientRect();
            clientCo.x -= rect.left;
            clientCo.y += this._dom.scrollTop;
            return clientCo;
        }
        this._selection_manger = new SelectionManager(LineView.DefaultLeftMarginWidth, 
            this.width, absPosGetter, DocumentView.CursorBlinkingInternal);
        this._selection_manger.appendTo(this._dom);

        this._selection_manger.on("keydown", (evt: MouseEvent) => { this.handleSelectionKeydown(evt); });
        this._selection_manger.on("compositionstart", (evt: Event) => { this.handleSelectionCompositionStart(evt); });
        this._selection_manger.on("compositionupdate", (evt: Event) => { this.handleSelectionCompositionUpdate(evt); });
        this._selection_manger.on("compositionend", (evt: Event) => { this.handleSelectionCompositionEnd(evt); });

        this.on("contextmenu", (evt: MouseEvent) => { this.handleContextMenu(evt); });

        this._container = <HTMLDivElement>DomHelper.elem("div", "mde-document-container");
        this._dom.appendChild(this._container);

        this._nullArea = new NullElement("div", "mde-document-null");
        this._nullArea.appendTo(this._dom);

        setTimeout(() => {
            this._nullArea.height = this._dom.clientHeight / 2;
        }, 5);

        this.on("mousedown", this.handleDocMouseDown.bind(this));

        this._window_mousemove_handler = (evt: MouseEvent) => { this.handleWindowMouseMove(evt); }
        this._window_mouseup_handler = (evt: MouseEvent) => { this.handleWindowMouseUp(evt); }
        this._window_keydown_handler = (evt: KeyboardEvent) => { this.handleWindowKeydown(evt); }
        this._window_keyup_handler = (evt: KeyboardEvent) => { this.handleWindowKeyup(evt); }

        this.bindingEvent();
        this.stylish();
    }

    bind(model: TextModel) {
        this._model = model;

        this._lines[0] = null;
        this._model.forEach((line: LineModel) => {
            var vl = new LineView();

            this._lines[line.number] = vl;
            this._highlightingRanges[line.number] = new PopAllQueue<HighlightingRange>();

            vl.render(line.text);
            vl.renderLineNumber(line.number);
            this._container.appendChild(vl.element());
        })
    }

    unbind() {
        this._selection_manger.clearAll();

        this._lines.forEach((e: LineView) => {
            if (e) {
                e.dispose();
                e.remove();
            }
        })

        this._lines = [null];
        this._model = null;
    }

    applyTextEdit(textEdit: TextEdit) {

    }

    private stylish() {
        this._dom.style.overflowY = "scroll";
        this._dom.style.overflowX = "auto";

        this._dom.style.wordBreak = "normal";
        this._dom.style.wordWrap = "break-word";
        this._dom.style.whiteSpace = "pre-wrap";
    }

    private bindingEvent() {
        window.addEventListener("mousemove", this._window_mousemove_handler, true);
        window.addEventListener("mouseup", this._window_mouseup_handler, true);
        window.addEventListener("keydown", this._window_keydown_handler, true);
        window.addEventListener("keyup", this._window_keyup_handler, true);
    }

    private handleContextMenu(evt: MouseEvent) {
        evt.preventDefault();

        let options: Electron.MenuItemOptions[] = [
            {
                label: "Cut",
                accelerator: "Control+X",
            },
            {
                label: "Copy",
                accelerator: "Control+C",
                click: () => { this.copyToClipboard() }
            },
            {
                label: "Paste",
                accelerator: "Control+V",
            },
        ]

        let menu = remote.Menu.buildFromTemplate(options);

        menu.popup(remote.getCurrentWindow());
    }

    private computeForwardOffset(textEdit: TextEdit){

        switch(textEdit.type) {
            case TextEditType.InsertText:
                break;
            case TextEditType.DeleteText:
                break;
            case TextEditType.ReplaceText:
                break;
        }

    }

    private handleSelectionKeydown(evt: MouseEvent) {

        setTimeout(() => {

            if (!this._compositing) {

                let majorSelection = this._selection_manger.selectionAt(0);

                if (majorSelection.collapsed) {

                    let textEdit = new TextEdit(TextEditType.InsertText, 
                        this._selection_manger.selectionAt(0).beginPosition, 
                        this._selection_manger.selectionAt(0).inputerContent);
                    
                    this._selection_manger.selectionAt(0).clearInputerContent();

                    this._model.applyTextEdit(textEdit);

                    let beginPos = this._selection_manger.selectionAt(0).beginPosition;

                    for (let i=beginPos.line; i < this._lines.length; i++) {
                        this.renderLine(i);
                    }

                } else {

                    let textEdit = new TextEdit(TextEditType.ReplaceText, {
                        begin: majorSelection.beginPosition,
                        end: majorSelection.endPosition,
                    }, majorSelection.inputerContent);

                    majorSelection.clearInputerContent();
                    this._model.applyTextEdit(textEdit);

                    for (let i=majorSelection.beginPosition.line; i < this._model.linesCount; i++) {
                        this.renderLine(i);
                    }

                }


            }

        }, 10);

    }

    private handleSelectionCompositionStart(evt: Event) {
        this._compositing = true;
    }

    private handleSelectionCompositionUpdate(evt: Event) {
    }

    private handleSelectionCompositionEnd(evt: Event) {
        this._compositing = false;
    }

    private handleDocMouseDown(evt: MouseEvent) {
        this._mouse_pressed = true;

        let begin_pos = this.getPositionFromCoordinate({
            x: evt.clientX,
            y: evt.clientY,
        });

        let absPosGetter = (pos: Position) => {
            let clientCo = this.getCoordinate(pos);
            let rect = this._dom.getBoundingClientRect();
            clientCo.x -= rect.left;
            clientCo.y += this._dom.scrollTop;
            return clientCo;
        }

        if (evt.which === 1) {
            if (!this._ctrl_pressed || !this._allow_multiselections) {
                this._selection_manger.clearAll();
            }

            this._selection_manger.beginSelect(begin_pos);
        }
    }

    private handleWindowMouseMove(evt: MouseEvent) {
        if (this._mouse_pressed) {
            evt.preventDefault();

            try {
                let pos = this.getPositionFromCoordinate({
                    x: evt.clientX,
                    y: evt.clientY,
                });

                this._selection_manger.moveCursorTo(pos);
            } catch (e) {
                // not in range. do not handle it.
            }

        }
    }

    private handleWindowMouseUp(evt: MouseEvent) {
        this._mouse_pressed = false;
        this._selection_manger.focus();
    }

    private handleWindowKeydown(evt: KeyboardEvent) {
        if (evt.keyCode === KeyCode.Ctrl) this._ctrl_pressed = true;
    }

    private handleWindowKeyup(evt: KeyboardEvent) {
        if (evt.keyCode === KeyCode.Ctrl) this._ctrl_pressed = false;
    }

    private getPositionFromCoordinate(co: Coordinate): Position {

        let _range = document.caretRangeFromPoint(co.x, co.y);

        let line_number: number,
            absolute_offset: number,
            linesCount = this.linesCount;

        for (let i = 1; i <= linesCount; i++) {
            let lineView = this.lines[i];
            // let rect = lineView.element().firstElementChild.getBoundingClientRect();
            let rect = lineView.element().getBoundingClientRect();

            if (co.y >= rect.top && co.y <= rect.top + rect.height) {
                line_number = i;
                break;
            }
        }

        if (line_number === undefined)
            throw new Error("Not in range.");

        let lineView = this.lines[line_number];
        let lineElm = lineView.element();

        absolute_offset = 0;
        for (let i = 0; i < lineView.words.length; i++) {
            if (lineView.words[i].element() === _range.startContainer.parentElement) {
                absolute_offset += _range.startOffset;
                break;
            }
            absolute_offset = lineView.words[i].length;
        }

        return {
            line: line_number,
            offset: absolute_offset,
        }
    }

    private copyToClipboard() {
        if (this._selection_manger.length > 0) {
            let majorSelection = this._selection_manger.selectionAt(0);
            if (majorSelection.collapsed) {
                let end: Position = {
                    line: majorSelection.beginPosition.line,
                    offset: majorSelection.beginPosition.offset + 1,
                }
                let text = this._model.report({
                    begin: majorSelection.beginPosition,
                    end: end,
                });
                clipboard.writeText(text);
            } else {
                let beginPos: Position = majorSelection.beginPosition,
                    endPos: Position = majorSelection.endPosition;
                if (PositionUtil.greaterPosition(beginPos, endPos)) {
                    let tmp = endPos;
                    endPos = beginPos;
                    beginPos = tmp;
                }

                let text = this._model.report({begin: beginPos, end: endPos});
                clipboard.writeText(text);
            }
        }
    }

    getCoordinate(pos: Position) : Coordinate {
        if (pos.line <= 0 || pos.line > this.linesCount)
            throw new Error("Index out of range.");

        let domRect = this._dom.getBoundingClientRect();
        let co = this._lines[pos.line].getCoordinate(pos.offset);
        co.y -= domRect.top;
        return co;
    }

    renderLine(line: number) {
        if (line <= 0 || line > this.linesCount)
            throw new Error("<index out of range> line:" + line + " LinesCount:" + this.linesCount);
        this._lines[line].render(this._model.lineAt(line).text, this._highlightingRanges[line].popAll());
        this._lines[line].renderLineNumber(line);
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
            e.remove();
        });
    }

    dispose() {
        this._lines.forEach((e: LineView) => {
            if (e) e.dispose();
        })

        this._selection_manger.dispose();

        window.removeEventListener("mousemove", this._window_mousemove_handler, true);
        window.removeEventListener("mouseup", this._window_mouseup_handler, true);
        window.removeEventListener("keydown", this._window_keydown_handler, true);
        window.removeEventListener("keyup", this._window_keyup_handler, true);
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

    set height(h : number) {
        super.height = h;
        this._nullArea.height = h / 2;
        this._selection_manger.repainAll();
    }

    get height() {
        return super.height;
    }

    set width(w: number) {
        super.width = w;
        this._selection_manger.documentWidth = w;
    }

    get width() {
        return super.width;
    }

}
