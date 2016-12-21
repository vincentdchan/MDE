"use strict";
const viewLine_1 = require("./viewLine");
const model_1 = require("../model");
const controller_1 = require("../controller");
const util_1 = require("../util");
const viewSelection_1 = require("./viewSelection");
const electron_1 = require("electron");
const events_1 = require("./events");
function setHeight(elm, h) {
    elm.style.height = h + "px";
}
class NullElement extends util_1.DomHelper.ResizableElement {
}
class DocumentView extends util_1.DomHelper.AbsoluteElement {
    constructor(allowMultiselections = false) {
        super("div", "mde-document unselectable");
        this._model = null;
        this._mouse_pressed = false;
        this._ctrl_pressed = false;
        this._compositing = false;
        this._selection_manger = null;
        this._allow_multiselections = allowMultiselections;
        this._lines = [];
        this._line_renderer = new controller_1.LineRenderer();
        this._history_handler = new controller_1.HistoryHandler();
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
            var vl = new viewLine_1.LineView(line.number, this._line_renderer);
            this._lines[line.number] = vl;
            this._line_renderer.renderLineLazily(line.number, line.text);
            this._container.appendChild(vl.element());
        });
        setTimeout(() => {
            this._nullArea.height = this._dom.clientHeight / 2;
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
    copyToClipboard() {
        if (this._selection_manger.length > 0) {
            let majorSelection = this._selection_manger.selectionAt(0);
            if (majorSelection.collapsed) {
                let end = {
                    line: majorSelection.beginPosition.line,
                    offset: majorSelection.beginPosition.offset + 1,
                };
                let text = this._model.report({
                    begin: model_1.PositionUtil.clonePosition(majorSelection.beginPosition),
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
    pasteToDocument() {
        if (this._selection_manger.length > 0) {
            let majorSelection = this._selection_manger.selectionAt(0);
            let textContent = electron_1.clipboard.readText();
            let textEdit, result, renderOption;
            if (majorSelection.collapsed) {
                textEdit = new model_1.TextEdit(model_1.TextEditType.InsertText, majorSelection.beginPosition, textContent);
            }
            else {
                textEdit = new model_1.TextEdit(model_1.TextEditType.ReplaceText, {
                    begin: majorSelection.beginPosition,
                    end: majorSelection.endPosition,
                }, textContent);
            }
            result = this._model.applyTextEdit(textEdit);
            renderOption = this.calculateRenderLines(textEdit);
            this.render(renderOption);
            viewSelection_1.moveSelectionTo(majorSelection, result);
        }
    }
    cutToClipboard() {
        if (this._selection_manger.length > 0) {
            let majorSelection = this._selection_manger.selectionAt(0);
            let range;
            if (majorSelection.collapsed) {
                let end = {
                    line: majorSelection.beginPosition.line,
                    offset: majorSelection.beginPosition.offset + 1,
                };
                range = {
                    begin: model_1.PositionUtil.clonePosition(majorSelection.beginPosition),
                    end: end
                };
            }
            else {
                range = {
                    begin: model_1.PositionUtil.clonePosition(majorSelection.beginPosition),
                    end: model_1.PositionUtil.clonePosition(majorSelection.endPosition),
                };
            }
            let textContent = this._model.report(range);
            let textEdit = new model_1.TextEdit(model_1.TextEditType.DeleteText, range);
            let result = this._model.applyTextEdit(textEdit);
            let renderOption = this.calculateRenderLines(textEdit);
            this.render(renderOption);
            viewSelection_1.moveSelectionTo(majorSelection, result);
            electron_1.clipboard.writeText(textContent);
        }
    }
    handleSelectionKeydown(evt) {
        if (evt.ctrlKey && evt.shiftKey) {
            evt.preventDefault();
            switch (evt.which) {
                case util_1.KeyCode.$Z:
                    console.log("redo");
                    break;
                case util_1.KeyCode.$F:
                    console.log("replace");
                    break;
            }
            return;
        }
        if (evt.ctrlKey) {
            evt.preventDefault();
            switch (evt.which) {
                case util_1.KeyCode.$F:
                    console.log("search and replace");
                    break;
                case util_1.KeyCode.$S:
                    console.log("save");
                    break;
                case util_1.KeyCode.$C:
                    this.copyToClipboard();
                    break;
                case util_1.KeyCode.$X:
                    this.cutToClipboard();
                    break;
                case util_1.KeyCode.$V:
                    this.pasteToDocument();
                    break;
                case util_1.KeyCode.$Z:
                    this.undo();
                    break;
                case util_1.KeyCode.$A:
                    let majorSelection = this._selection_manger.selectionAt(0);
                    majorSelection.beginPosition = {
                        line: 1,
                        offset: 0,
                    };
                    majorSelection.endPosition = {
                        line: this._model.linesCount,
                        offset: this._model.lineAt(this._model.linesCount).length,
                    };
                    majorSelection.repaint();
                    break;
            }
            return;
        }
        setTimeout(() => {
            let majorSelection = this._selection_manger.selectionAt(0);
            if (!this._compositing) {
                switch (evt.which) {
                    case util_1.KeyCode.UpArrow:
                        if (majorSelection.collapsed) {
                            let line = majorSelection.beginPosition.line;
                            majorSelection.beginPosition = majorSelection.endPosition = {
                                line: line > 1 ? line - 1 : 1,
                                offset: majorSelection.beginPosition.offset
                            };
                            majorSelection.repaint();
                        }
                        else
                            majorSelection.leftCollapse();
                        break;
                    case util_1.KeyCode.DownArrow:
                        if (majorSelection.collapsed) {
                            let line = majorSelection.beginPosition.line;
                            majorSelection.beginPosition = majorSelection.endPosition = {
                                line: line < this._model.linesCount ? line + 1 : line,
                                offset: majorSelection.beginPosition.offset,
                            };
                            majorSelection.repaint();
                        }
                        else
                            majorSelection.rightCollapse();
                        break;
                    case util_1.KeyCode.LeftArrow:
                        if (majorSelection.collapsed) {
                            let offset = majorSelection.beginPosition.offset;
                            majorSelection.beginPosition = majorSelection.endPosition = {
                                line: majorSelection.beginPosition.line,
                                offset: offset > 0 ? offset - 1 : 0,
                            };
                            majorSelection.repaint();
                        }
                        else
                            majorSelection.leftCollapse();
                        break;
                    case util_1.KeyCode.RightArrow:
                        if (majorSelection.collapsed) {
                            let line = majorSelection.beginPosition.line;
                            let offset = majorSelection.beginPosition.offset;
                            majorSelection.beginPosition = majorSelection.endPosition = {
                                line: majorSelection.beginPosition.line,
                                offset: offset < this._model.lineAt(line).length ? offset + 1 : offset,
                            };
                            majorSelection.repaint();
                        }
                        else
                            majorSelection.rightCollapse();
                        break;
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
                    case util_1.KeyCode.PageUp:
                        evt.preventDefault();
                        setTimeout(() => {
                            let scrollHeight = this._dom.scrollHeight, scrollTop = this._dom.scrollTop, windowHeight = window.outerHeight, tmp = scrollTop - windowHeight;
                            this.scrollTop = tmp >= 0 ? tmp : scrollTop;
                        }, 10);
                        break;
                    case util_1.KeyCode.PageDown:
                        {
                            evt.preventDefault();
                            setTimeout(() => {
                                let scrollHeight = this._dom.scrollHeight, scrollTop = this._dom.scrollTop, windowHeight = window.outerHeight, tmp = scrollTop + windowHeight;
                                this.scrollTop = tmp <= scrollHeight ? tmp : scrollTop;
                            }, 10);
                            break;
                        }
                    case util_1.KeyCode.Home:
                        majorSelection.endPosition = majorSelection.beginPosition = {
                            line: majorSelection.beginPosition.line,
                            offset: 0,
                        };
                        majorSelection.repaint();
                        break;
                    case util_1.KeyCode.End:
                        {
                            let _offset = this._model.lineAt(majorSelection.endPosition.line).length - 1;
                            majorSelection.endPosition = majorSelection.beginPosition = {
                                line: majorSelection.endPosition.line,
                                offset: _offset
                            };
                            majorSelection.repaint();
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
                                let result = this._model.applyCancellableTextEdit(textEdit);
                                this.renderLine(majorSelection.beginPosition.line);
                                this._history_handler.push(result.reverse);
                                viewSelection_1.moveSelectionTo(majorSelection, result.pos);
                            }
                            else {
                                let pos = majorSelection.beginPosition;
                                if (pos.line > 1) {
                                    let previousLineLength = this._model.lineAt(pos.line - 1).length;
                                    let textEdit = new model_1.TextEdit(model_1.TextEditType.DeleteText, {
                                        begin: {
                                            line: pos.line - 1,
                                            offset: previousLineLength - 1,
                                        },
                                        end: pos
                                    });
                                    let result = this._model.applyCancellableTextEdit(textEdit);
                                    let renderOption = this.calculateRenderLines(textEdit);
                                    this.render(renderOption);
                                    this._history_handler.push(result.reverse);
                                    viewSelection_1.moveSelectionTo(majorSelection, result.pos);
                                }
                            }
                        }
                        else {
                            let textEdit = new model_1.TextEdit(model_1.TextEditType.DeleteText, {
                                begin: majorSelection.beginPosition,
                                end: majorSelection.endPosition
                            });
                            let result = this._model.applyCancellableTextEdit(textEdit);
                            this._history_handler.push(result.reverse);
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
                            viewSelection_1.moveSelectionTo(majorSelection, result.pos);
                        }
                        break;
                    default:
                        let insertText = majorSelection.inputerContent;
                        if (insertText.length > 0) {
                            if (majorSelection.collapsed) {
                                let textEdit = new model_1.TextEdit(model_1.TextEditType.InsertText, majorSelection.beginPosition, majorSelection.inputerContent);
                                let result = this._model.applyCancellableTextEdit(textEdit);
                                let beginPos = this._selection_manger.selectionAt(0).beginPosition;
                                this._history_handler.push(result.reverse);
                                this.render(this.calculateRenderLines(textEdit));
                                majorSelection.clearInputerContent();
                                viewSelection_1.moveSelectionTo(majorSelection, result.pos);
                            }
                            else {
                                let textEdit = new model_1.TextEdit(model_1.TextEditType.ReplaceText, {
                                    begin: majorSelection.beginPosition,
                                    end: majorSelection.endPosition,
                                }, majorSelection.inputerContent);
                                majorSelection.clearInputerContent();
                                let result = this._model.applyCancellableTextEdit(textEdit);
                                this._history_handler.push(result.reverse);
                                this.render(this.calculateRenderLines(textEdit));
                                viewSelection_1.moveSelectionTo(majorSelection, result.pos);
                            }
                        }
                }
            }
        }, 10);
    }
    undo() {
        let textEdit = this._history_handler.pop();
        let majorSelection = this._selection_manger.selectionAt(0);
        if (textEdit) {
            let result = this._model.applyTextEdit(textEdit);
            this.render(this.calculateRenderLines(textEdit));
            setTimeout(() => {
                viewSelection_1.moveSelectionTo(majorSelection, result);
            }, 50);
            return true;
        }
        else {
            return false;
        }
    }
    render(option) {
        if (option.appendLines) {
            for (let i = 0; i < option.appendLines; i++) {
                let newLV = new viewLine_1.LineView(this._lines.length, this._line_renderer);
                this._lines.push(newLV);
                newLV.appendTo(this._container);
            }
        }
        if (option.removeTailLines) {
            for (let i = this._lines.length - option.removeTailLines; i < this._lines.length; i++) {
                this._lines[i].dispose();
                this._lines[i].remove();
                this._lines[i] = null;
            }
            this._lines.length -= option.removeTailLines;
        }
        option.renderImdLines.forEach((num) => {
            this._line_renderer.renderLineImmdediately(num, this._model.lineAt(num).text);
        });
        option.renderLazilyLines.forEach((num) => {
            this._line_renderer.renderLineLazily(num, this._model.lineAt(num).text);
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
            let evt = new events_1.ScrollHeightChangedEvent(currentHeight, oldHeight);
            this._dom.dispatchEvent(evt);
        }
    }
    calculateRenderLines(textEdit) {
        let option = {
            renderImdLines: [],
            renderLazilyLines: [],
        };
        switch (textEdit.type) {
            case model_1.TextEditType.InsertText:
                option.appendLines = textEdit.lines.length - 1;
                let appendedLines = this._lines.length + option.appendLines;
                for (let i = textEdit.position.line; i < appendedLines; i++) {
                    if (i === textEdit.position.line)
                        option.renderImdLines.push(i);
                    else
                        option.renderLazilyLines.push(i);
                }
                break;
            case model_1.TextEditType.DeleteText:
                if (textEdit.range.begin.line === textEdit.range.end.line) {
                    option.renderImdLines.push(textEdit.range.begin.line);
                }
                else {
                    option.removeTailLines = textEdit.range.end.line - textEdit.range.begin.line;
                    let removedLines = this._lines.length - option.removeTailLines;
                    for (let i = textEdit.range.begin.line; i < removedLines; i++) {
                        if (i === textEdit.range.begin.line)
                            option.renderImdLines.push(i);
                        else
                            option.renderLazilyLines.push(i);
                    }
                }
                break;
            case model_1.TextEditType.ReplaceText:
                let lineOffset = 0;
                if (textEdit.lines.length > 1)
                    lineOffset = textEdit.lines.length - 1;
                if (textEdit.range.end.line > textEdit.range.begin.line)
                    lineOffset -= textEdit.range.end.line - textEdit.range.begin.line;
                let fixedLineCount = this._lines.length;
                if (lineOffset > 0) {
                    option.appendLines = lineOffset;
                    fixedLineCount += lineOffset;
                }
                else if (lineOffset < 0) {
                    option.removeTailLines = -lineOffset;
                    fixedLineCount += lineOffset;
                }
                for (let i = textEdit.range.begin.line; i < fixedLineCount; i++) {
                    if (i === textEdit.range.begin.line)
                        option.renderImdLines.push(i);
                    else
                        option.renderLazilyLines.push(i);
                }
                break;
        }
        return option;
    }
    handleSelectionCompositionStart(evt) {
        this._compositing = true;
        if (this._selection_manger.length > 0) {
            this._compositing_position = model_1.PositionUtil.clonePosition(this._selection_manger.selectionAt(0).beginPosition);
        }
    }
    handleSelectionCompositionUpdate(evt) {
        if (this._selection_manger.length > 0) {
            let majorSelection = this._selection_manger.selectionAt(0);
            if (!majorSelection.collapsed)
                this._compositing_position = model_1.PositionUtil.clonePosition(majorSelection.beginPosition);
            let textEdit;
            if (model_1.PositionUtil.equalPostion(this._compositing_position, majorSelection.endPosition)) {
                textEdit = new model_1.TextEdit(model_1.TextEditType.InsertText, this._compositing_position, majorSelection.inputerContent);
            }
            else {
                textEdit = new model_1.TextEdit(model_1.TextEditType.ReplaceText, {
                    begin: model_1.PositionUtil.clonePosition(this._compositing_position),
                    end: model_1.PositionUtil.clonePosition(majorSelection.endPosition),
                }, majorSelection.inputerContent);
            }
            let result = this._model.applyTextEdit(textEdit);
            this.render(this.calculateRenderLines(textEdit));
            viewSelection_1.moveSelectionTo(majorSelection, result);
            majorSelection.repaint();
        }
    }
    handleSelectionCompositionEnd(evt) {
        setTimeout(() => {
            this._compositing = false;
            this._compositing_position = null;
            if (this._selection_manger.length > 0) {
                let majorSelection = this._selection_manger.selectionAt(0);
                majorSelection.clearInputerContent();
            }
        }, 20);
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
            absolute_offset += lineView.words[i].length;
        }
        return {
            line: line_number,
            offset: absolute_offset,
        };
    }
    getCoordinate(pos) {
        if (pos.line <= 0 || pos.line > this.linesCount)
            throw new Error("Index out of range.");
        let domRect = this._dom.getBoundingClientRect();
        let co = this._lines[pos.line].getCoordinate(pos.offset, false);
        co.y -= domRect.top;
        return co;
    }
    renderLine(line) {
        if (line <= 0 || line > this.linesCount)
            throw new Error("<index out of range> line:" + line + " LinesCount:" + this.linesCount);
        this._line_renderer.renderLineImmdediately(line, this._model.lineAt(line).text);
    }
    deleteLines(begin, end) {
        if (begin <= 0)
            throw new Error("Index out of range.");
        end = end ? end : begin + 1;
        let _lines_prefix = this._lines.slice(0, begin), _lines_middle = this._lines.slice(begin, end), _lines_postfix = this._lines.slice(end);
        this._lines = _lines_prefix.concat(_lines_postfix);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdEb2N1bWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMkJBQXVCLFlBQ3ZCLENBQUMsQ0FEa0M7QUFFbkMsd0JBQ2lDLFVBQ2pDLENBQUMsQ0FEMEM7QUFDM0MsNkJBQTJDLGVBQzNDLENBQUMsQ0FEeUQ7QUFDMUQsdUJBQThDLFNBQzlDLENBQUMsQ0FEc0Q7QUFJdkQsZ0NBQWdELGlCQUNoRCxDQUFDLENBRGdFO0FBQ2pFLDJCQUFnQyxVQUNoQyxDQUFDLENBRHlDO0FBQzFDLHlCQUF3RCxVQUN4RCxDQUFDLENBRGlFO0FBR2xFLG1CQUFtQixHQUFnQixFQUFFLENBQVM7SUFDMUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztBQUNoQyxDQUFDO0FBU0QsMEJBQTBCLGdCQUFTLENBQUMsZ0JBQWdCO0FBRXBELENBQUM7QUFPRCwyQkFBa0MsZ0JBQVMsQ0FBQyxlQUFlO0lBNEJ2RCxZQUFZLG9CQUFvQixHQUFZLEtBQUs7UUFDN0MsTUFBTSxLQUFLLEVBQUUsMkJBQTJCLENBQUMsQ0FBQztRQXRCdEMsV0FBTSxHQUFjLElBQUksQ0FBQztRQVl6QixtQkFBYyxHQUFZLEtBQUssQ0FBQztRQUNoQyxrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUMvQixpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUc5QixzQkFBaUIsR0FBcUIsSUFBSSxDQUFDO1FBTy9DLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxvQkFBb0IsQ0FBQztRQUNuRCxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUVqQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUkseUJBQVksRUFBRSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLDJCQUFjLEVBQUUsQ0FBQztRQUU3QyxJQUFJLFlBQVksR0FBRyxDQUFDLEdBQWE7WUFDN0IsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FB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
