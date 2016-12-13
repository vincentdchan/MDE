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
class ScrollHeightChangedEvent extends Event {
    constructor(newHeight, oldHeight) {
        super("scrollHeightChanged");
        this._scroll_height = newHeight;
        this._old_height = oldHeight;
    }
    get newHeight() {
        return this._scroll_height;
    }
    get oldHeight() {
        return this._old_height;
    }
}
exports.ScrollHeightChangedEvent = ScrollHeightChangedEvent;
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
        setTimeout(() => {
            this._scroll_height = this._dom.scrollHeight;
        }, 5);
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
                click: () => { this.cutToClipboard(); }
            },
            {
                label: "Copy",
                accelerator: "Control+C",
                click: () => { this.copyToClipboard(); }
            },
            {
                label: "Paste",
                accelerator: "Control+V",
                click: () => { this.pasteToDocument(); }
            },
        ];
        let menu = electron_1.remote.Menu.buildFromTemplate(options);
        menu.popup(electron_1.remote.getCurrentWindow());
    }
    pasteToDocument() {
        throw new Error("Not implemented.");
    }
    cutToClipboard() {
        throw new Error("Not implemented.");
    }
    handleSelectionKeydown(evt) {
        setTimeout(() => {
            if (!this._compositing) {
                let majorSelection = this._selection_manger.selectionAt(0);
                switch (evt.which) {
                    case util_1.KeyCode.Tab:
                        if (majorSelection.collapsed) {
                            let textEdit = new model_1.TextEdit(model_1.TextEditType.InsertText, majorSelection.beginPosition, "    ");
                            let result = this._model.applyTextEdit(textEdit);
                            this.renderLine(majorSelection.beginPosition.line);
                            viewSelection_1.moveSelectionTo(majorSelection, result);
                            setTimeout(() => {
                                majorSelection.focus();
                            }, 5);
                        }
                        break;
                    case util_1.KeyCode.BackSpace:
                        if (majorSelection.collapsed) {
                            if (majorSelection.beginPosition.offset >= 1) {
                                let textEdit = new model_1.TextEdit(model_1.TextEditType.DeleteText, {
                                    begin: {
                                        line: majorSelection.beginPosition.line,
                                        offset: majorSelection.beginPosition.offset - 1
                                    },
                                    end: majorSelection.endPosition,
                                });
                                let result = this._model.applyTextEdit(textEdit);
                                this.renderLine(majorSelection.beginPosition.line);
                                viewSelection_1.moveSelectionTo(majorSelection, result);
                            }
                        }
                        else {
                            let textEdit = new model_1.TextEdit(model_1.TextEditType.DeleteText, {
                                begin: majorSelection.beginPosition,
                                end: majorSelection.endPosition
                            });
                            let result = this._model.applyTextEdit(textEdit);
                            if (majorSelection.beginPosition.line === majorSelection.endPosition.line) {
                                this.renderLine(majorSelection.beginPosition.line);
                            }
                            else {
                                let offset = majorSelection.endPosition.line - majorSelection.beginPosition.line;
                                for (let i = this._lines.length - offset; i < this._lines.length; i++) {
                                    this._lines[i].dispose();
                                    this._lines[i].remove();
                                    this._lines[i] = null;
                                }
                                this._lines.length -= offset;
                                for (let i = majorSelection.beginPosition.line; i < this._lines.length; i++) {
                                    this.renderLine(i);
                                }
                            }
                            viewSelection_1.moveSelectionTo(majorSelection, result);
                        }
                        break;
                    default:
                        if (majorSelection.collapsed) {
                            let insertText = majorSelection.inputerContent;
                            if (insertText.length > 0) {
                                let textEdit = new model_1.TextEdit(model_1.TextEditType.InsertText, majorSelection.beginPosition, majorSelection.inputerContent);
                                let resultPos = this._model.applyTextEdit(textEdit);
                                let beginPos = this._selection_manger.selectionAt(0).beginPosition;
                                let renderOption = this.calculateRenderLines(textEdit);
                                this.render(renderOption);
                                majorSelection.clearInputerContent();
                                majorSelection.beginPosition = resultPos;
                                majorSelection.endPosition = resultPos;
                                majorSelection.repaint();
                            }
                        }
                        else {
                            let textEdit = new model_1.TextEdit(model_1.TextEditType.ReplaceText, {
                                begin: majorSelection.beginPosition,
                                end: majorSelection.endPosition,
                            }, majorSelection.inputerContent);
                            majorSelection.clearInputerContent();
                            this._model.applyTextEdit(textEdit);
                            let renderOption = this.calculateRenderLines(textEdit);
                            this.render(renderOption);
                        }
                }
            }
        }, 10);
    }
    render(option) {
        if (option.appendLines) {
            for (let i = 0; i < option.appendLines; i++) {
                let newLV = new viewLine_1.LineView();
                this._lines.push(newLV);
                newLV.appendTo(this._container);
            }
        }
        if (option.removeTailLines) {
            for (let i = this._lines.length - option.removeTailLines - 1; i < this._lines.length; i++) {
                this._lines[i].dispose();
                this._lines[i].remove();
                this._lines[i] = null;
            }
            this._lines.length -= option.removeTailLines;
        }
        option.rerenderLines.forEach((num) => {
            this.renderLine(num);
        });
        setTimeout(() => {
            this.checkScrollHeightChanged();
        }, 10);
    }
    checkScrollHeightChanged() {
        let currentHeight = this._dom.scrollHeight;
        if (currentHeight !== this._scroll_height) {
            let oldHeight = currentHeight;
            this._scroll_height = currentHeight;
            let evt = new ScrollHeightChangedEvent(currentHeight, oldHeight);
            this._dom.dispatchEvent(evt);
        }
    }
    calculateRenderLines(textEdit) {
        let option = {
            rerenderLines: []
        };
        switch (textEdit.type) {
            case model_1.TextEditType.InsertText:
                if (textEdit.lines.length == 1) {
                    option.rerenderLines.push(textEdit.position.line);
                }
                else {
                    option.appendLines = textEdit.lines.length - 1;
                    let appendedLines = this._lines.length + option.appendLines;
                    for (let i = textEdit.position.line; i < appendedLines; i++) {
                        option.rerenderLines.push(i);
                    }
                }
                break;
            case model_1.TextEditType.DeleteText:
                if (textEdit.range.begin.line === textEdit.range.end.line) {
                    option.rerenderLines.push(textEdit.range.begin.line);
                }
                else {
                    option.removeTailLines = textEdit.range.end.line - textEdit.range.begin.line;
                    let removedLines = this._lines.length - option.removeTailLines;
                    for (let i = textEdit.range.begin.line; i < removedLines; i++) {
                        option.rerenderLines.push(i);
                    }
                }
                break;
            case model_1.TextEditType.ReplaceText:
                throw new Error("Not implemented.");
        }
        return option;
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
        if (this._selection_manger.focusedSelection)
            this._selection_manger.endSelecting();
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
                majorSelection.normalize();
                let beginPos = majorSelection.beginPosition, endPos = majorSelection.endPosition;
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
        this._lines[line].render(this._model.lineAt(line).text, null);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdEb2N1bWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMkJBQXVCLFlBQ3ZCLENBQUMsQ0FEa0M7QUFFbkMsd0JBQ2lDLFVBQ2pDLENBQUMsQ0FEMEM7QUFDM0MsdUJBQThDLFNBQzlDLENBQUMsQ0FEc0Q7QUFDdkQsd0JBQTBCLGVBQzFCLENBQUMsQ0FEd0M7QUFHekMsZ0NBQWdELGlCQUNoRCxDQUFDLENBRGdFO0FBQ2pFLDJCQUFnQyxVQUNoQyxDQUFDLENBRHlDO0FBRzFDLG1CQUFtQixHQUFnQixFQUFFLENBQVM7SUFDMUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztBQUNoQyxDQUFDO0FBUUQsdUNBQThDLEtBQUs7SUFLL0MsWUFBWSxTQUFpQixFQUFFLFNBQWtCO1FBQzdDLE1BQU0scUJBQXFCLENBQUMsQ0FBQztRQUU3QixJQUFJLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQztRQUNoQyxJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsSUFBSSxTQUFTO1FBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDL0IsQ0FBQztJQUVELElBQUksU0FBUztRQUNULE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzVCLENBQUM7QUFFTCxDQUFDO0FBcEJZLGdDQUF3QiwyQkFvQnBDLENBQUE7QUFFRCw4QkFBcUMsS0FBSztJQUt0QyxZQUFZLEdBQWEsRUFBRSxNQUFrQjtRQUN6QyxNQUFNLFlBQVksQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDUixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRUQsSUFBSSxrQkFBa0I7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QUM7UUFDdkIsQ0FBQyxDQUFDLENBQUE7UUFFRixJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFakMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMseUJBQXlCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDOUUsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDMUUsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDMUUsTUFBTSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMscUJBQXFCLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVELElBQUksU0FBUztRQUNULE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMvQixDQUFDO0lBRUQsSUFBSSxTQUFTLENBQUMsQ0FBVTtRQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELElBQUksS0FBSztRQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFJLFVBQVU7UUFDVixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSSxLQUFLLENBQUMsTUFBaUI7UUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDekIsQ0FBQztJQUVELElBQUksTUFBTSxDQUFDLENBQVU7UUFDakIsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUVELElBQUksTUFBTTtRQUNOLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFJLEtBQUssQ0FBQyxDQUFTO1FBQ2YsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELElBQUksS0FBSztRQUNMLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7QUFFTCxDQUFDO0FBeG1CMEIsbUNBQXNCLEdBQUcsR0FBRyxDQUFDO0FBRjNDLG9CQUFZLGVBMG1CeEIsQ0FBQSIsImZpbGUiOiJ2aWV3L3ZpZXdEb2N1bWVudC5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
