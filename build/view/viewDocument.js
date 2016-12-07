"use strict";
const viewLine_1 = require("./viewLine");
const util_1 = require("../util");
const queue_1 = require("../util/queue");
const viewInputer_1 = require("./viewInputer");
const viewCursor_1 = require("./viewCursor");
function clonePosition(pos) {
    return {
        line: pos.line,
        offset: pos.offset
    };
}
function equalPostion(pos1, pos2) {
    return pos1.line === pos2.line && pos1.offset === pos2.offset;
}
function greaterPosition(pos1, pos2) {
    return (pos1.line > pos2.line) ||
        ((pos1.line === pos2.line) && (pos1.offset > pos2.offset));
}
function setHeight(elm, h) {
    elm.style.height = h + "px";
}
class CursorMoveEvent extends Event {
    constructor(pos, abs_co) {
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
exports.CursorMoveEvent = CursorMoveEvent;
class NullElement extends util_1.DomHelper.ResizableElement {
}
class SelectionAtom extends util_1.DomHelper.AbsoluteElement {
    constructor() {
        super("div", "mde-document-selection-atom");
        this._dom.style.zIndex = "-1";
    }
}
class SelectionManager {
    constructor(coOffsetThunk, lineMargin, coGetter, begin, end) {
        this._top_atom = null;
        this._middle_atom = null;
        this._end_atom = null;
        this._lineMargin = lineMargin;
        this._coordinate_offset_thunk = coOffsetThunk;
        this._coGetter = coGetter;
        this._begin_pos = begin;
        this._end_pos = end;
    }
    binding(_father_dom) {
        this._father_dom = _father_dom;
        this.paint();
    }
    resetEnd(end) {
        if (end !== this._end_pos) {
            this._end_pos = end;
            this.paint();
        }
    }
    repaint() {
        this.paint();
    }
    clearAll() {
        if (this._top_atom) {
            this._top_atom.remove();
            this._top_atom = null;
        }
        if (this._middle_atom) {
            this._middle_atom.remove();
            this._middle_atom = null;
        }
        if (this._end_atom) {
            this._end_atom.remove();
            this._end_atom = null;
        }
    }
    paint() {
        let offsetCos = this._coordinate_offset_thunk();
        if (this._begin_pos && this._end_pos &&
            !equalPostion(this._begin_pos, this._end_pos)) {
            let begin_pos, end_pos;
            if (greaterPosition(this._end_pos, this._begin_pos)) {
                begin_pos = this._begin_pos;
                end_pos = this._end_pos;
            }
            else {
                begin_pos = this._end_pos;
                end_pos = this._begin_pos;
            }
            let beginCo = this._coGetter(begin_pos), endCo = this._coGetter(end_pos);
            if (beginCo.y === endCo.y) {
                let rect = this._father_dom.getBoundingClientRect();
                if (this._top_atom === null) {
                    this._top_atom = new SelectionAtom();
                    this._top_atom.appendTo(this._father_dom);
                }
                if (this._middle_atom !== null) {
                    this._middle_atom.remove();
                    this._middle_atom = null;
                }
                if (this._end_atom !== null) {
                    this._end_atom.remove();
                    this._end_atom = null;
                }
                this._top_atom.width = endCo.x - beginCo.x;
                this._top_atom.height = SelectionManager.DefalutLineHeight;
                this._top_atom.marginLeft = beginCo.x - rect.left;
                this._top_atom.top = beginCo.y + offsetCos.y;
            }
            else {
                let rect = this._father_dom.getBoundingClientRect();
                if (this._top_atom === null) {
                    this._top_atom = new SelectionAtom();
                    this._top_atom.appendTo(this._father_dom);
                }
                if (this._middle_atom === null) {
                    this._middle_atom = new SelectionAtom();
                    this._middle_atom.appendTo(this._father_dom);
                }
                if (this._end_atom === null) {
                    this._end_atom = new SelectionAtom();
                    this._end_atom.appendTo(this._father_dom);
                }
                this._top_atom.height = this._end_atom.height = SelectionManager.DefalutLineHeight;
                this._top_atom.marginLeft = beginCo.x - rect.left;
                this._top_atom.width = rect.right - beginCo.x;
                this._top_atom.top = beginCo.y + offsetCos.y;
                this._middle_atom.width = rect.right - rect.left - this._lineMargin;
                this._middle_atom.height = endCo.y - beginCo.y - this._top_atom.height;
                this._middle_atom.top = beginCo.y + this._top_atom.height + offsetCos.y;
                this._middle_atom.marginLeft = this._lineMargin;
                this._end_atom.top = endCo.y + offsetCos.y;
                this._end_atom.width = endCo.x - rect.left - this._lineMargin;
                this._end_atom.marginLeft = this._lineMargin;
            }
        }
    }
    get beginPosition() {
        return this._begin_pos;
    }
    get endPosition() {
        return this._end_pos;
    }
    remove() {
        this.clearAll();
    }
}
SelectionManager.DefalutLineHeight = 24;
class DocumentView extends util_1.DomHelper.AbsoluteElement {
    constructor(_model) {
        super("div", "mde-document");
        this._window_mousemove_handler = null;
        this._window_mouseup_handler = null;
        this._mouse_pressed = false;
        this._selections = [];
        this._focus_selection = null;
        this._position = {
            line: 1,
            offset: 0,
        };
        this._lines = [];
        this._model = _model;
        this._highlightingRanges = [];
        let thk = () => {
            return this.scrollTop;
        };
        this._cursor = new viewCursor_1.CursorView(thk);
        this._inputer = new viewInputer_1.InputerView(thk);
        this._cursor.appendTo(this._dom);
        this._inputer.appendTo(this._dom);
        this._inputer.on("focus", this.handleInputerFocused.bind(this));
        this._inputer.on("blur", this.handleInputerBlur.bind(this));
        this._container = util_1.DomHelper.elem("div", "mde-document-container");
        this._dom.appendChild(this._container);
        this._nullArea = new NullElement("div", "mde-document-null");
        this._nullArea.appendTo(this._dom);
        setTimeout(() => {
            this._nullArea.height = this._dom.clientHeight / 2;
            this.updateCursor(this._position);
        }, 5);
        this.on("click", this.handleClick.bind(this));
        this.on("mousedown", this.handleDocMouseDown.bind(this));
        this._window_mousemove_handler = (evt) => { this.handleWindowMouseMove(evt); };
        this._window_mouseup_handler = (evt) => { this.handleWindowMouseUp(evt); };
        this.bindingEvent();
        this.stylish();
    }
    stylish() {
        this._dom.style.overflowY = "scroll";
        this._dom.style.overflowX = "auto";
        this._dom.style.wordBreak = "normal";
        this._dom.style.wordWrap = "break-word";
        this._dom.style.whiteSpace = "pre-wrap";
    }
    bindingEvent() {
        window.addEventListener("mousemove", this._window_mousemove_handler, true);
        window.addEventListener("mouseup", this._window_mouseup_handler, true);
    }
    handleDocMouseDown(evt) {
        this._mouse_pressed = true;
        this._selections.forEach((s) => {
            s.remove();
        });
        if (this._focus_selection) {
            this._focus_selection.remove();
        }
        let begin_pos = this.getPositionFromCoordinate({
            x: evt.clientX,
            y: evt.clientY,
        });
        let posGetter = (pos) => {
            return this.getCoordinate(pos);
        };
        let thk = () => {
            return {
                x: 0,
                y: this._dom.scrollTop,
            };
        };
        this._focus_selection = new SelectionManager(thk, viewLine_1.LineView.DefaultLeftMarginWidth, posGetter, begin_pos);
        this._focus_selection.binding(this._dom);
    }
    handleWindowMouseMove(evt) {
        if (this._mouse_pressed) {
            evt.preventDefault();
            let pos = this.getPositionFromCoordinate({
                x: evt.clientX,
                y: evt.clientY,
            });
            this._focus_selection.resetEnd(pos);
        }
    }
    handleWindowMouseUp(evt) {
        this._mouse_pressed = false;
    }
    getPositionFromCoordinate(co) {
        let _range = document.caretRangeFromPoint(co.x, co.y);
        let line_number, absolute_offset, linesCount = this.linesCount;
        for (let i = 1; i <= linesCount; i++) {
            let lineView = this.lines[i];
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
        };
    }
    handleClick(evt) {
        this._position = this.getPositionFromCoordinate({
            x: evt.clientX,
            y: evt.clientY,
        });
        let docRect = this._dom.getBoundingClientRect();
        let coordinate = this._lines[this._position.line].getCoordinate(this._position.offset);
        coordinate.y -= docRect.top;
        this.updateCoursorByAbsoluteCoordinate(coordinate, clonePosition(this._position));
        this._inputer.element().focus();
    }
    reload(_model) {
        this.dispose();
        this._lines = [];
        this._model = _model;
        this._highlightingRanges = [];
        this._dom.removeChild(this._container);
        this._container = util_1.DomHelper.elem("div", "mde-document-container");
        this._dom.insertBefore(this._container, this._nullArea.element());
        this._position = {
            line: 1,
            offset: 0,
        };
        setTimeout(() => {
            this.updateCursor(this._position);
        }, 10);
        this.bindingEvent();
    }
    render() {
        this._lines[0] = null;
        this._model.forEach((line) => {
            var vl = new viewLine_1.LineView();
            this._lines[line.number] = vl;
            this._highlightingRanges[line.number] = new queue_1.PopAllQueue();
            vl.render(line.text);
            vl.renderLineNumber(line.number);
            this._container.appendChild(vl.element());
        });
        return this._dom;
    }
    updateCursor(pos) {
        let cursorCo = this.getCoordinate(pos);
        this.updateCoursorByAbsoluteCoordinate(cursorCo, pos);
    }
    updateCoursorByAbsoluteCoordinate(co, pos) {
        let rect = this._dom.getBoundingClientRect();
        co.x -= rect.left;
        this._cursor.setPostition(co);
        this._inputer.setPostition(co);
        this._cursor.excite();
        let evt = new CursorMoveEvent(pos, co);
        this._dom.dispatchEvent(evt);
    }
    handleInputerFocused(evt) {
        this._cursor.excite();
    }
    handleInputerBlur(evt) {
        this._cursor.setOff();
    }
    getCoordinate(pos) {
        if (pos.line <= 0 || pos.line > this.linesCount)
            throw new Error("Index out of range.");
        let domRect = this._dom.getBoundingClientRect();
        let co = this._lines[pos.line].getCoordinate(pos.offset);
        co.y -= domRect.top;
        return co;
    }
    renderLine(line) {
        if (line <= 0 || line > this.linesCount)
            throw new Error("<index out of range> line:" + line + " LinesCount:" + this.linesCount);
        this._lines[line].render(this._model.lineAt(line).text, this._highlightingRanges[line].popAll());
        this._lines[line].renderLineNumber(line);
    }
    moveLinesBackward(index, count) {
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
            this._lines[i] = new viewLine_1.LineView();
            this._container.insertBefore(this._lines[i].element(), this._lines[i + 1].element());
        }
    }
    appendLines(num) {
        let _new_lines_arr = [];
        let _new_queues_arr = [];
        _new_lines_arr.length = num;
        _new_queues_arr.length = num;
        for (let i = 0; i < num; i++) {
            _new_lines_arr[i] = new viewLine_1.LineView();
            _new_queues_arr[i] = new queue_1.PopAllQueue();
            this._container.appendChild(_new_lines_arr[i].element());
        }
        this._lines = this._lines.concat(_new_lines_arr);
        this._highlightingRanges = this._highlightingRanges.concat(_new_queues_arr);
    }
    deleteLines(begin, end) {
        if (begin <= 0)
            throw new Error("Index out of range.");
        end = end ? end : begin + 1;
        let _lines_prefix = this._lines.slice(0, begin), _lines_middle = this._lines.slice(begin, end), _lines_postfix = this._lines.slice(end);
        let _queues_prefix = this._highlightingRanges.slice(0, begin), _queues_postfix = this._highlightingRanges.slice(end);
        this._lines = _lines_prefix.concat(_lines_postfix);
        this._highlightingRanges = _queues_prefix.concat(_queues_postfix);
        _lines_middle.forEach((e) => {
            e.dispose();
            e.remove();
        });
    }
    dispose() {
        this._lines.forEach((e) => {
            if (e) {
                e.dispose();
            }
        });
        this._inputer.dispose();
        this._cursor.dispose();
        window.removeEventListener("mousemove", this._window_mousemove_handler, true);
        window.removeEventListener("mouseup", this._window_mouseup_handler, true);
    }
    get scrollTop() {
        return this._dom.scrollTop;
    }
    set scrollTop(h) {
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
    set model(_model) {
        this._model = _model;
    }
    set height(h) {
        super.height = h;
        this._nullArea.height = h / 2;
        if (this._focus_selection)
            this._focus_selection.repaint();
    }
    get height() {
        return super.height;
    }
    set width(w) {
        super.width = w;
        if (this._focus_selection)
            this._focus_selection.repaint();
    }
    get width() {
        return super.width;
    }
}
exports.DocumentView = DocumentView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdEb2N1bWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMkJBQXVCLFlBQ3ZCLENBQUMsQ0FEa0M7QUFHbkMsdUJBQXFDLFNBQ3JDLENBQUMsQ0FENkM7QUFDOUMsd0JBQTBCLGVBQzFCLENBQUMsQ0FEd0M7QUFDekMsOEJBQTBCLGVBQzFCLENBQUMsQ0FEd0M7QUFDekMsNkJBQXlCLGNBRXpCLENBQUMsQ0FGc0M7QUFFdkMsdUJBQXVCLEdBQWE7SUFDaEMsTUFBTSxDQUFDO1FBQ0gsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJO1FBQ2QsTUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNO0tBQ3JCLENBQUM7QUFDTixDQUFDO0FBRUQsc0JBQXNCLElBQWMsRUFBRSxJQUFjO0lBQ2hELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQ2xFLENBQUM7QUFFRCx5QkFBeUIsSUFBYyxFQUFFLElBQWM7SUFDbkQsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzlCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDL0QsQ0FBQztBQUVELG1CQUFtQixHQUFnQixFQUFFLENBQVM7SUFDMUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztBQUNoQyxDQUFDO0FBRUQsOEJBQXFDLEtBQUs7SUFLdEMsWUFBWSxHQUFhLEVBQUUsTUFBa0I7UUFDekMsTUFBTSxZQUFZLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUNoQixJ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RSxNQUFNLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRUQsSUFBSSxTQUFTO1FBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQy9CLENBQUM7SUFFRCxJQUFJLFNBQVMsQ0FBQyxDQUFVO1FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQUksVUFBVTtRQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVELElBQUksS0FBSztRQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFJLEtBQUssQ0FBQyxNQUFpQjtRQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0lBRUQsSUFBSSxNQUFNLENBQUMsQ0FBVTtRQUNqQixLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztZQUN0QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVELElBQUksTUFBTTtRQUNOLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFJLEtBQUssQ0FBQyxDQUFTO1FBQ2YsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDaEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1lBQ3RCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ0wsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7SUFDdkIsQ0FBQztBQUVMLENBQUM7QUF2WVksb0JBQVksZUF1WXhCLENBQUEiLCJmaWxlIjoidmlldy92aWV3RG9jdW1lbnQuanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
