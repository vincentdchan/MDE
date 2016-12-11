"use strict";
const viewLine_1 = require("./viewLine");
const model_1 = require("../model");
const util_1 = require("../util");
const queue_1 = require("../util/queue");
const viewSelection_1 = require("./viewSelection");
const electron_1 = require("electron");
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
class DocumentView extends util_1.DomHelper.AbsoluteElement {
    constructor(allowMultiselections = false) {
        super("div", "mde-document unselectable");
        this._model = null;
        this._mouse_pressed = false;
        this._ctrl_pressed = false;
        this._compositing = false;
        this._allow_multiselections = allowMultiselections;
        this._lines = [];
        this._highlightingRanges = [];
        let absPosGetter = (pos) => {
            let clientCo = this.getCoordinate(pos);
            let rect = this._dom.getBoundingClientRect();
            clientCo.x -= rect.left;
            clientCo.y += this._dom.scrollTop;
            return clientCo;
        };
        this._selection_manger = new viewSelection_1.SelectionManager(viewLine_1.LineView.DefaultLeftMarginWidth, this.width, absPosGetter, DocumentView.CursorBlinkingInternal);
        this._selection_manger.appendTo(this._dom);
        this._selection_manger.on("keydown", (evt) => { this.handleSelectionKeydown(evt); });
        this._selection_manger.on("compositionstart", (evt) => { this.handleSelectionCompositionStart(evt); });
        this._selection_manger.on("compositionupdate", (evt) => { this.handleSelectionCompositionUpdate(evt); });
        this._selection_manger.on("compositionend", (evt) => { this.handleSelectionCompositionEnd(evt); });
        this.on("contextmenu", (evt) => { this.handleContextMenu(evt); });
        this._container = util_1.DomHelper.elem("div", "mde-document-container");
        this._dom.appendChild(this._container);
        this._nullArea = new NullElement("div", "mde-document-null");
        this._nullArea.appendTo(this._dom);
        setTimeout(() => {
            this._nullArea.height = this._dom.clientHeight / 2;
        }, 5);
        this.on("mousedown", this.handleDocMouseDown.bind(this));
        this._window_mousemove_handler = (evt) => { this.handleWindowMouseMove(evt); };
        this._window_mouseup_handler = (evt) => { this.handleWindowMouseUp(evt); };
        this._window_keydown_handler = (evt) => { this.handleWindowKeydown(evt); };
        this._window_keyup_handler = (evt) => { this.handleWindowKeyup(evt); };
        this.bindingEvent();
        this.stylish();
    }
    bind(model) {
        this._model = model;
        this._lines[0] = null;
        this._model.forEach((line) => {
            var vl = new viewLine_1.LineView();
            this._lines[line.number] = vl;
            this._highlightingRanges[line.number] = new queue_1.PopAllQueue();
            vl.render(line.text);
            vl.renderLineNumber(line.number);
            this._container.appendChild(vl.element());
        });
    }
    unbind() {
        this._selection_manger.clearAll();
        this._lines.forEach((e) => {
            if (e) {
                e.dispose();
                e.remove();
            }
        });
        this._lines = [null];
        this._model = null;
    }
    applyTextEdit(textEdit) {
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
        window.addEventListener("keydown", this._window_keydown_handler, true);
        window.addEventListener("keyup", this._window_keyup_handler, true);
    }
    handleContextMenu(evt) {
        evt.preventDefault();
        let options = [
            {
                label: "Cut",
                accelerator: "Control+X",
            },
            {
                label: "Copy",
                accelerator: "Control+C",
                click: () => { this.copyToClipboard(); }
            },
            {
                label: "Paste",
                accelerator: "Control+V",
            },
        ];
        let menu = electron_1.remote.Menu.buildFromTemplate(options);
        menu.popup(electron_1.remote.getCurrentWindow());
    }
    computeForwardOffset(textEdit) {
        switch (textEdit.type) {
            case model_1.TextEditType.InsertText:
                break;
            case model_1.TextEditType.DeleteText:
                break;
            case model_1.TextEditType.ReplaceText:
                break;
        }
    }
    handleSelectionKeydown(evt) {
        setTimeout(() => {
            if (!this._compositing) {
                let majorSelection = this._selection_manger.selectionAt(0);
                if (majorSelection.collapsed) {
                    let textEdit = new model_1.TextEdit(model_1.TextEditType.InsertText, this._selection_manger.selectionAt(0).beginPosition, this._selection_manger.selectionAt(0).inputerContent);
                    this._selection_manger.selectionAt(0).clearInputerContent();
                    this._model.applyTextEdit(textEdit);
                    let beginPos = this._selection_manger.selectionAt(0).beginPosition;
                    for (let i = beginPos.line; i < this._lines.length; i++) {
                        this.renderLine(i);
                    }
                }
                else {
                    let textEdit = new model_1.TextEdit(model_1.TextEditType.ReplaceText, {
                        begin: majorSelection.beginPosition,
                        end: majorSelection.endPosition,
                    }, majorSelection.inputerContent);
                    majorSelection.clearInputerContent();
                    this._model.applyTextEdit(textEdit);
                    for (let i = majorSelection.beginPosition.line; i < this._model.linesCount; i++) {
                        this.renderLine(i);
                    }
                }
            }
        }, 10);
    }
    handleSelectionCompositionStart(evt) {
        this._compositing = true;
    }
    handleSelectionCompositionUpdate(evt) {
    }
    handleSelectionCompositionEnd(evt) {
        this._compositing = false;
    }
    handleDocMouseDown(evt) {
        this._mouse_pressed = true;
        let begin_pos = this.getPositionFromCoordinate({
            x: evt.clientX,
            y: evt.clientY,
        });
        let absPosGetter = (pos) => {
            let clientCo = this.getCoordinate(pos);
            let rect = this._dom.getBoundingClientRect();
            clientCo.x -= rect.left;
            clientCo.y += this._dom.scrollTop;
            return clientCo;
        };
        if (evt.which === 1) {
            if (!this._ctrl_pressed || !this._allow_multiselections) {
                this._selection_manger.clearAll();
            }
            this._selection_manger.beginSelect(begin_pos);
        }
    }
    handleWindowMouseMove(evt) {
        if (this._mouse_pressed) {
            evt.preventDefault();
            try {
                let pos = this.getPositionFromCoordinate({
                    x: evt.clientX,
                    y: evt.clientY,
                });
                this._selection_manger.moveCursorTo(pos);
            }
            catch (e) {
            }
        }
    }
    handleWindowMouseUp(evt) {
        this._mouse_pressed = false;
        this._selection_manger.focus();
    }
    handleWindowKeydown(evt) {
        if (evt.keyCode === util_1.KeyCode.Ctrl)
            this._ctrl_pressed = true;
    }
    handleWindowKeyup(evt) {
        if (evt.keyCode === util_1.KeyCode.Ctrl)
            this._ctrl_pressed = false;
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
    copyToClipboard() {
        if (this._selection_manger.length > 0) {
            let majorSelection = this._selection_manger.selectionAt(0);
            if (majorSelection.collapsed) {
                let end = {
                    line: majorSelection.beginPosition.line,
                    offset: majorSelection.beginPosition.offset + 1,
                };
                let text = this._model.report({
                    begin: majorSelection.beginPosition,
                    end: end,
                });
                electron_1.clipboard.writeText(text);
            }
            else {
                let beginPos = majorSelection.beginPosition, endPos = majorSelection.endPosition;
                if (model_1.PositionUtil.greaterPosition(beginPos, endPos)) {
                    let tmp = endPos;
                    endPos = beginPos;
                    beginPos = tmp;
                }
                let text = this._model.report({ begin: beginPos, end: endPos });
                electron_1.clipboard.writeText(text);
            }
        }
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
            if (e)
                e.dispose();
        });
        this._selection_manger.dispose();
        window.removeEventListener("mousemove", this._window_mousemove_handler, true);
        window.removeEventListener("mouseup", this._window_mouseup_handler, true);
        window.removeEventListener("keydown", this._window_keydown_handler, true);
        window.removeEventListener("keyup", this._window_keyup_handler, true);
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
        this._selection_manger.repainAll();
    }
    get height() {
        return super.height;
    }
    set width(w) {
        super.width = w;
        this._selection_manger.documentWidth = w;
    }
    get width() {
        return super.width;
    }
}
DocumentView.CursorBlinkingInternal = 500;
exports.DocumentView = DocumentView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdEb2N1bWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMkJBQXVCLFlBQ3ZCLENBQUMsQ0FEa0M7QUFFbkMsd0JBQ2tELFVBQ2xELENBQUMsQ0FEMkQ7QUFDNUQsdUJBQThDLFNBQzlDLENBQUMsQ0FEc0Q7QUFDdkQsd0JBQTBCLGVBQzFCLENBQUMsQ0FEd0M7QUFHekMsZ0NBQStCLGlCQUMvQixDQUFDLENBRCtDO0FBQ2hELDJCQUFnQyxVQUNoQyxDQUFDLENBRHlDO0FBRzFDLG1CQUFtQixHQUFnQixFQUFFLENBQVM7SUFDMUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztBQUNoQyxDQUFDO0FBRUQsOEJBQXFDLEtBQUs7SUFLdEMsWUFBWSxHQUFhLEVBQUUsTUFBa0I7UUFDekMsTUFBTSxZQUFZLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUNoQixJQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQztJQUN0QixDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVELElBQUksa0JBQWtCO1FBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ3BCLENBQUM7QUFFTCxDQUFDO0FBbkJZLHVCQUFlLGtCQW1CM0IsQ0FBQTtBQUVELDBCQUEwQixnQkFBUyxDQUFDLGdCQUFnQjtBQUVwRCxDQUFDO0FBTUQsMkJBQWtDLGdCQUFTLENBQUMsZUFBZTtJQXdCdkQsWUFBWSxvQkFBb0IsR0FBWSxLQUFLO1FBQzdDLE1BQU0sS0FBSyxFQUFFLDJCQUEyQixDQUFDLENBQUM7UUFwQnRDLFdBQU0sR0FBYyxJQUFJLENBQUM7UUFXekIsbUJBQWMsR0FBWSxLQUFLLENBQUM7UUFDaEMsa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFDL0IsaUJBQVksR0FB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Q3ZCLENBQUM7SUFFRCxJQUFJLEtBQUssQ0FBQyxNQUFpQjtRQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0lBRUQsSUFBSSxNQUFNLENBQUMsQ0FBVTtRQUNqQixLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ04sTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDeEIsQ0FBQztJQUVELElBQUksS0FBSyxDQUFDLENBQVM7UUFDZixLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNoQixJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ0wsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7SUFDdkIsQ0FBQztBQUVMLENBQUM7QUEzZDBCLG1DQUFzQixHQUFHLEdBQUcsQ0FBQztBQUgzQyxvQkFBWSxlQThkeEIsQ0FBQSIsImZpbGUiOiJ2aWV3L3ZpZXdEb2N1bWVudC5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
