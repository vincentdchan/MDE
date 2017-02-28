"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const viewLine_1 = require("./viewLine");
const model_1 = require("../model");
const controller_1 = require("../controller");
const util_1 = require("../util");
const typescript_domhelper_1 = require("typescript-domhelper");
const errors_1 = require("../util/errors");
const fn_1 = require("../util/fn");
const viewSelection_1 = require("./viewSelection");
const electron_1 = require("electron");
const events_1 = require("./events");
const Collection = require("typescript-collections");
function setHeight(elm, h) {
    elm.style.height = h + "px";
}
class NullElement extends util_1.DomWrapper.ResizableElement {
}
var RenderState;
(function (RenderState) {
    RenderState[RenderState["Null"] = 0] = "Null";
    RenderState[RenderState["PlainText"] = 1] = "PlainText";
    RenderState[RenderState["Colored"] = 2] = "Colored";
})(RenderState || (RenderState = {}));
class DocumentView extends util_1.DomWrapper.AbsoluteElement {
    constructor(allowMultiselections = false) {
        super("div", "mde-document unselectable");
        this._model = null;
        this._mouse_pressed = false;
        this._ctrl_pressed = false;
        this._compositing = false;
        this._selection_manger = null;
        this._waiting_times = 0;
        this._showLineNumber = true;
        this._tokenizer = new util_1.MarkdownTokenizer();
        this._render_queue = new Collection.PriorityQueue();
        this._allow_multiselections = allowMultiselections;
        this._entries = [{
                renderState: RenderState.Null,
                tokenizeState: this._tokenizer.startState(),
            }];
        this._lines = [];
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
        this._container = typescript_domhelper_1.Dom.Div("mde-document-container");
        this._dom.appendChild(this._container);
        this._nullArea = new NullElement("div", "mde-document-null");
        this._nullArea.appendTo(this._dom);
        this.on("mouseup", (evt) => { this.handleDocMouseUp(evt); });
        this.on("mousedown", (evt) => { this.handleDocMouseDown(evt); });
        this._window_mousemove_handler = (evt) => { this.handleWindowMouseMove(evt); };
        this._window_mouseup_handler = (evt) => { this.handleWindowMouseUp(evt); };
        this._window_keydown_handler = (evt) => { this.handleWindowKeydown(evt); };
        this._window_keyup_handler = (evt) => { this.handleWindowKeyup(evt); };
        this.bindingEvent();
    }
    initRenderQueue() {
        this._render_queue = new Collection.PriorityQueue((a, b) => {
            return a - b;
        });
    }
    bind(model) {
        this._model = model;
        this._history_handler = new controller_1.HistoryHandler();
        this._lines[0] = null;
        this._model.forEach((line) => {
            var vl = new viewLine_1.LineView(line.number);
            this._lines[line.number] = vl;
            this._container.appendChild(vl.element());
            vl.renderPlainText(line.text);
        });
        this.renderLineImd(1);
        if (this._model.linesCount > 1)
            this.enqueueRender(2);
        setTimeout(() => {
            this._nullArea.height = this._dom.clientHeight / 2;
            this._scroll_height = this._dom.scrollHeight;
            this.selectionManager.clearAll();
            this.selectionManager.beginSelect({
                line: 1,
                offset: 0
            });
            this.selectionManager.endSelecting();
            this.selectionManager.focus();
        }, 5);
    }
    unbind() {
        this._selection_manger.clearAll();
        this._history_handler = null;
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
        let result = this._model.applyRevocableTextEdit(textEdit);
        this._history_handler.pushUndo(result.reverse);
        this.render(this.calculateRenderLines(textEdit));
        return result.pos;
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
                label: util_1.i18n.getString("contextmenu.cut"),
                accelerator: "Control+X",
                click: () => { this.cutToClipboard(); }
            },
            {
                label: util_1.i18n.getString("contextmenu.copy"),
                accelerator: "Control+C",
                click: () => { this.copyToClipboard(); }
            },
            {
                label: util_1.i18n.getString("contextmenu.paste"),
                accelerator: "Control+V",
                click: () => { this.pasteToDocument(); }
            },
            {
                type: "separator",
            },
            {
                label: util_1.i18n.getString("contextmenu.selectAll"),
                accelerator: "Control+A",
                click: () => { this.selectAll(); }
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
            let textEdit, renderOption;
            if (majorSelection.collapsed) {
                textEdit = new model_1.TextEdit(model_1.TextEditType.InsertText, majorSelection.beginPosition, textContent);
            }
            else {
                textEdit = new model_1.TextEdit(model_1.TextEditType.ReplaceText, {
                    begin: majorSelection.beginPosition,
                    end: majorSelection.endPosition,
                }, textContent);
            }
            let result = this._model.applyRevocableTextEdit(textEdit);
            renderOption = this.calculateRenderLines(textEdit);
            this.render(renderOption);
            this._history_handler.pushUndo(result.reverse);
            viewSelection_1.moveSelectionTo(majorSelection, result.pos);
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
            let result = this._model.applyRevocableTextEdit(textEdit);
            let renderOption = this.calculateRenderLines(textEdit);
            this.render(renderOption);
            this._history_handler.pushUndo(result.reverse);
            viewSelection_1.moveSelectionTo(majorSelection, result.pos);
            electron_1.clipboard.writeText(textContent);
        }
    }
    toggleLineNumber() {
        if (this._showLineNumber == true) {
            this._showLineNumber = false;
        }
        else {
            this._showLineNumber = true;
        }
        this._lines.forEach((line) => {
            if (line !== null) {
                line.showLineNumber = this._showLineNumber;
            }
        });
    }
    handleSelectionKeydown(evt) {
        if (evt.ctrlKey && evt.shiftKey) {
            evt.preventDefault();
            switch (evt.which) {
                case util_1.KeyCode.$Z:
                    this.redo();
                    break;
            }
            return;
        }
        if (evt.ctrlKey) {
            evt.preventDefault();
            switch (evt.which) {
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
                    this.selectAll();
                    break;
            }
            return;
        }
        setTimeout(() => {
            let majorSelection = this._selection_manger.selectionAt(0);
            if (!this._compositing) {
                switch (evt.which) {
                    case util_1.KeyCode.Delete:
                        if (majorSelection.collapsed) {
                            let currentLineLength = this._model.lineAt(majorSelection.beginPosition.line).length;
                            if (this._model.lineAt(majorSelection.beginPosition.line).text.charAt(currentLineLength - 1) == "\n")
                                currentLineLength--;
                            let endPosition;
                            if (majorSelection.beginPosition.offset < currentLineLength) {
                                endPosition = {
                                    line: majorSelection.beginPosition.line,
                                    offset: majorSelection.beginPosition.offset + 1,
                                };
                            }
                            else if (majorSelection.beginPosition.line < this._model.linesCount) {
                                endPosition = {
                                    line: majorSelection.beginPosition.line + 1,
                                    offset: 0
                                };
                            }
                            else
                                return;
                            let textEdit = new model_1.TextEdit(model_1.TextEditType.DeleteText, {
                                begin: model_1.PositionUtil.clonePosition(majorSelection.beginPosition),
                                end: endPosition,
                            });
                            let result = this._model.applyRevocableTextEdit(textEdit);
                            this.render(this.calculateRenderLines(textEdit));
                            this._history_handler.pushUndo(result.reverse);
                            viewSelection_1.moveSelectionTo(majorSelection, result.pos);
                        }
                        else {
                            let textEdit = new model_1.TextEdit(model_1.TextEditType.DeleteText, {
                                begin: majorSelection.beginPosition,
                                end: majorSelection.endPosition
                            });
                            let result = this._model.applyRevocableTextEdit(textEdit);
                            this.render(this.calculateRenderLines(textEdit));
                            this._history_handler.pushUndo(result.reverse);
                            viewSelection_1.moveSelectionTo(majorSelection, result.pos);
                        }
                        break;
                    case util_1.KeyCode.UpArrow:
                        if (majorSelection.collapsed) {
                            let line = majorSelection.beginPosition.line;
                            if (line > 1) {
                                let currentOffset = majorSelection.beginPosition.offset, previousLength = this._model.lineAt(line - 1).length;
                                majorSelection.beginPosition = majorSelection.endPosition = {
                                    line: line - 1,
                                    offset: currentOffset > previousLength ? previousLength - 1 : currentOffset,
                                };
                                majorSelection.repaint();
                            }
                        }
                        else
                            majorSelection.leftCollapse();
                        break;
                    case util_1.KeyCode.DownArrow:
                        if (majorSelection.collapsed) {
                            let line = majorSelection.beginPosition.line;
                            if (line < this._model.linesCount) {
                                let currentOffset = majorSelection.beginPosition.offset, nextLength = this._model.lineAt(line + 1).length;
                                majorSelection.beginPosition = majorSelection.endPosition = {
                                    line: line + 1,
                                    offset: currentOffset > nextLength ?
                                        (nextLength > 0 ? nextLength - 1 : 0) : currentOffset,
                                };
                                majorSelection.repaint();
                            }
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
                            let currentLineLength = this._model.lineAt(line).length;
                            if (this._model.lineAt(line).text.charAt(currentLineLength - 1) === '\n')
                                currentLineLength--;
                            majorSelection.beginPosition = majorSelection.endPosition = {
                                line: majorSelection.beginPosition.line,
                                offset: offset < currentLineLength ? offset + 1 : offset,
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
                            this.render(this.calculateRenderLines(textEdit));
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
                            let lineModel = this._model.lineAt(majorSelection.endPosition.line);
                            if (lineModel.text.length > 0) {
                                let _offset;
                                if (lineModel.text.charAt(lineModel.length - 1) === '\n')
                                    _offset = this._model.lineAt(majorSelection.endPosition.line).length - 1;
                                else
                                    _offset = this._model.lineAt(majorSelection.endPosition.line).length;
                                majorSelection.endPosition = majorSelection.beginPosition = {
                                    line: majorSelection.endPosition.line,
                                    offset: _offset
                                };
                                majorSelection.repaint();
                            }
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
                                let result = this._model.applyRevocableTextEdit(textEdit);
                                this.render(this.calculateRenderLines(textEdit));
                                this._history_handler.pushUndo(result.reverse);
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
                                    let result = this._model.applyRevocableTextEdit(textEdit);
                                    let renderOption = this.calculateRenderLines(textEdit);
                                    this.render(renderOption);
                                    this._history_handler.pushUndo(result.reverse);
                                    viewSelection_1.moveSelectionTo(majorSelection, result.pos);
                                }
                            }
                        }
                        else {
                            let textEdit = new model_1.TextEdit(model_1.TextEditType.DeleteText, {
                                begin: majorSelection.beginPosition,
                                end: majorSelection.endPosition
                            });
                            let result = this._model.applyRevocableTextEdit(textEdit);
                            this.render(this.calculateRenderLines(textEdit));
                            this._history_handler.pushUndo(result.reverse);
                            viewSelection_1.moveSelectionTo(majorSelection, result.pos);
                        }
                        break;
                    default:
                        let insertText = majorSelection.inputerContent;
                        if (insertText.length > 0) {
                            if (majorSelection.collapsed) {
                                let textEdit = new model_1.TextEdit(model_1.TextEditType.InsertText, majorSelection.beginPosition, majorSelection.inputerContent);
                                let result = this._model.applyRevocableTextEdit(textEdit);
                                let beginPos = this._selection_manger.selectionAt(0).beginPosition;
                                this._history_handler.pushUndo(result.reverse);
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
                                let result = this._model.applyRevocableTextEdit(textEdit);
                                this._history_handler.pushUndo(result.reverse);
                                this.render(this.calculateRenderLines(textEdit));
                                viewSelection_1.moveSelectionTo(majorSelection, result.pos);
                            }
                        }
                }
            }
        }, 10);
    }
    undo() {
        let textEdit = this._history_handler.popUndo();
        let majorSelection = this._selection_manger.selectionAt(0);
        if (textEdit) {
            let result = this._model.applyRevocableTextEdit(textEdit);
            this.render(this.calculateRenderLines(textEdit));
            this._history_handler.pushRedo(result.reverse);
            setTimeout(() => {
                viewSelection_1.moveSelectionTo(majorSelection, result.pos);
            }, 50);
            return true;
        }
        else {
            return false;
        }
    }
    selectAll() {
        if (this._selection_manger.length > 0) {
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
            return true;
        }
        return false;
    }
    redo() {
        let textEdit = this._history_handler.popRedo();
        let majorSelection = this._selection_manger.selectionAt(0);
        if (textEdit) {
            let result = this._model.applyRevocableTextEdit(textEdit);
            this.render(this.calculateRenderLines(textEdit));
            this._history_handler.pushUndo(result.reverse);
            setTimeout(() => {
                viewSelection_1.moveSelectionTo(majorSelection, result.pos);
            }, 50);
            return true;
        }
        return false;
    }
    render(option) {
        if (option.removeLines) {
            let prefix = this._lines.slice(0, option.removeLines.begin), middleArr = this._lines.slice(option.removeLines.begin, option.removeLines.end), postfix = this._lines.slice(option.removeLines.end);
            middleArr.forEach((value) => {
                value.dispose();
                this._container.removeChild(value.element());
            });
            this._lines = prefix.concat(postfix);
        }
        if (option.appendLines) {
            if (option.appendLines.after === this._lines.length - 1) {
                for (let i = 0; i < option.appendLines.count; i++) {
                    let newLV = new viewLine_1.LineView(option.appendLines.after + i + 1);
                    option.renderImdLines.push(option.appendLines.after + i + 1);
                    this._lines.push(newLV);
                    newLV.appendTo(this._container);
                }
            }
            else {
                let nextLineElem = this._lines[option.appendLines.after + 1].element();
                let pushArr = [];
                for (let i = 0; i < option.appendLines.count; i++) {
                    let newLV = new viewLine_1.LineView(option.appendLines.after + i + 1);
                    pushArr.push(newLV);
                    this._container.insertBefore(newLV.element(), nextLineElem);
                }
                let prefix = this._lines.slice(0, option.appendLines.after + 1), postfix = this._lines.slice(option.appendLines.after + 1);
                this._lines = prefix.concat(pushArr).concat(postfix);
            }
        }
        if (option.lineNumberFrom) {
            let linesCount = this._model.linesCount;
            for (let i = option.lineNumberFrom; i <= linesCount; i++) {
                this._lines[i].renderLineNumber(i, this._showLineNumber);
            }
        }
        option.renderImdLines.forEach((num) => {
            this.renderLineImd(num);
        });
        if (option.enqueueLine)
            this.enqueueRender(option.enqueueLine);
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
            enqueueLine: null,
        };
        let appendLineCount, beginNum, endNum;
        switch (textEdit.type) {
            case model_1.TextEditType.InsertText:
                appendLineCount = textEdit.lines.length - 1;
                option.renderImdLines.push(textEdit.position.line);
                for (let i = 0; i < appendLineCount; i++) {
                    option.renderImdLines.push(textEdit.position.line + i + 1);
                }
                if (appendLineCount > 0)
                    option.lineNumberFrom = textEdit.position.line + 1;
                option.enqueueLine = textEdit.position.line + textEdit.lines.length;
                option.appendLines = {
                    after: textEdit.position.line,
                    count: appendLineCount,
                };
                break;
            case model_1.TextEditType.DeleteText:
                if (textEdit.range.begin.line === textEdit.range.end.line) {
                    option.renderImdLines.push(textEdit.range.begin.line);
                    if (textEdit.range.end.line <= this._model.linesCount)
                        option.enqueueLine = textEdit.range.end.line + 1;
                }
                else {
                    beginNum = textEdit.range.begin.line + 1,
                        endNum = textEdit.range.end.line + 1;
                    option.renderImdLines.push(textEdit.range.begin.line);
                    option.enqueueLine = endNum;
                    option.lineNumberFrom = textEdit.range.begin.line + 1;
                    option.removeLines = {
                        begin: beginNum,
                        end: endNum,
                    };
                }
                break;
            case model_1.TextEditType.ReplaceText:
                beginNum = textEdit.range.begin.line + 1,
                    endNum = textEdit.range.end.line + 1;
                if (beginNum !== endNum) {
                    option.removeLines = {
                        begin: beginNum,
                        end: endNum,
                    };
                }
                appendLineCount = textEdit.lines.length - 1;
                if (appendLineCount > 0) {
                    option.appendLines = {
                        after: textEdit.range.begin.line,
                        count: appendLineCount,
                    };
                }
                if (appendLineCount === 0) {
                    option.renderImdLines.push(textEdit.range.begin.line);
                    option.enqueueLine = textEdit.range.begin.line + 1;
                }
                else {
                    for (let i = 0; i < appendLineCount; i++) {
                        option.renderImdLines.push(textEdit.range.begin.line + i + 1);
                    }
                    if (textEdit.range.begin.line + appendLineCount < this._model.linesCount)
                        option.enqueueLine = textEdit.range.begin.line + appendLineCount + 1;
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
            let compositingText = evt.data;
            if (!majorSelection.collapsed)
                this._compositing_position = model_1.PositionUtil.clonePosition(majorSelection.beginPosition);
            let textEdit;
            if (model_1.PositionUtil.equalPostion(this._compositing_position, majorSelection.endPosition)) {
                textEdit = new model_1.TextEdit(model_1.TextEditType.InsertText, this._compositing_position, compositingText);
            }
            else {
                textEdit = new model_1.TextEdit(model_1.TextEditType.ReplaceText, {
                    begin: model_1.PositionUtil.clonePosition(this._compositing_position),
                    end: model_1.PositionUtil.clonePosition(majorSelection.endPosition),
                }, compositingText);
            }
            let result = this._model.applyTextEdit(textEdit);
            this.render(this.calculateRenderLines(textEdit));
            viewSelection_1.moveSelectionTo(majorSelection, result);
            majorSelection.repaint();
        }
    }
    handleSelectionCompositionEnd(evt) {
        let undoTextEdit = new model_1.TextEdit(model_1.TextEditType.DeleteText, {
            begin: model_1.PositionUtil.clonePosition(this._compositing_position),
            end: {
                line: this._compositing_position.line,
                offset: this._compositing_position.offset + evt.data.length,
            }
        });
        this._history_handler.pushUndo(undoTextEdit);
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
        let begin_pos;
        try {
            begin_pos = this.getPositionFromCoordinate({
                x: evt.clientX,
                y: evt.clientY,
            });
        }
        catch (e) {
            if (e instanceof CoordinateNotInDocumentError) {
                return;
            }
            else {
                throw e;
            }
        }
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
    handleDocMouseUp(evt) {
        this._selection_manger.focus();
    }
    handleWindowMouseUp(evt) {
        this._mouse_pressed = false;
        if (this._selection_manger.focusedSelection)
            this._selection_manger.endSelecting();
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
            throw new CoordinateNotInDocumentError(co);
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
            throw new errors_1.NotInRangeError(pos.line, this.linesCount, 1);
        let domRect = this._dom.getBoundingClientRect();
        let co = this._lines[pos.line].getCoordinate(pos.offset, false);
        co.y -= domRect.top;
        return co;
    }
    renderLineImd(lineNum) {
        if (lineNum <= 0 || lineNum > this.linesCount)
            throw new errors_1.NotInRangeError(lineNum, this.linesCount, 1);
        let content = this._model.lineAt(lineNum).text;
        if (content.length > 0) {
            content = content.charAt(content.length - 1) == "\n" ? content.slice(0, content.length - 1) : content;
        }
        let previousEntry = this._entries[lineNum - 1];
        if (previousEntry && previousEntry.tokenizeState) {
            let copyState = this._tokenizer.copyState(previousEntry.tokenizeState);
            if (this._entries[lineNum] === undefined) {
                this._entries[lineNum] = {
                    renderState: RenderState.Null,
                };
            }
            this._entries[lineNum].tokenizeState = copyState;
            let tokens;
            if (content == "") {
                tokens = [{
                        type: util_1.MarkdownTokenType.Text,
                        text: content,
                    }];
            }
            else {
                let lineStream = new model_1.LineStream(content);
                tokens = this.tokenizeLine(lineStream, copyState);
            }
            this._entries[lineNum].renderState = RenderState.Colored;
            this._lines[lineNum].renderTokens(tokens);
        }
        else
            throw new Error("Previous doesn't exisit. Line:" + lineNum);
    }
    tokenizeLine(stream, state) {
        let tokens = [];
        while (!stream.eol()) {
            stream.setCurrentTokenIndex();
            let currentType = this._tokenizer.tokenize(stream, state);
            let currentText = stream.current();
            if (currentText == "")
                throw new Error("Null text");
            let previous = fn_1.last(tokens);
            if (previous && previous.type === currentType) {
                previous.text += currentText;
            }
            else {
                tokens.push({
                    type: currentType,
                    text: currentText,
                });
            }
        }
        return tokens;
    }
    enqueueRender(lineNum) {
        this._waiting_times++;
        this._render_queue.enqueue(lineNum);
        setTimeout(() => {
            this._waiting_times--;
            if (this._waiting_times === 0) {
                let top = this._render_queue.dequeue();
                let linesCount = this._model.linesCount;
                for (let i = top; i <= linesCount; i++) {
                    this.renderLineImd(i);
                }
                this.initRenderQueue();
            }
        }, DocumentView.LazyRenderTime);
    }
    deleteLines(begin, end) {
        if (begin <= 0)
            throw new errors_1.NotInRangeError(begin, undefined, 1);
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
    get showLineNumber() {
        return this._showLineNumber;
    }
    get historyHandler() {
        return this._history_handler;
    }
    get selectionManager() {
        return this._selection_manger;
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
DocumentView.LazyRenderTime = 420;
DocumentView.CursorBlinkingInternal = 500;
exports.DocumentView = DocumentView;
class CoordinateNotInDocumentError extends Error {
    constructor(co) {
        super("CoordinateNotInDocumentError");
        this._coordinate = co;
        this.message = "<CoordinateNotInDocumentError" +
            "x=" + this._coordinate.x +
            " y=" + this._coordinate.y + " >";
    }
    get coordinate() {
        return this._coordinate;
    }
}
exports.CoordinateNotInDocumentError = CoordinateNotInDocumentError;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdEb2N1bWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlDQUFtQztBQUVuQyxvQ0FDaUY7QUFDakYsOENBQTRDO0FBQzVDLGtDQUM0RDtBQUM1RCwrREFBd0M7QUFDeEMsMkNBQThDO0FBQzlDLG1DQUF1QztBQUl2QyxtREFBaUU7QUFDakUsdUNBQTBDO0FBQzFDLHFDQUFrRTtBQUNsRSxxREFBb0Q7QUFHcEQsbUJBQW1CLEdBQWdCLEVBQUUsQ0FBUztJQUMxQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQ2hDLENBQUM7QUFZRCxpQkFBa0IsU0FBUSxpQkFBVSxDQUFDLGdCQUFnQjtDQUVwRDtBQVdELElBQUssV0FFSjtBQUZELFdBQUssV0FBVztJQUNaLDZDQUFJLENBQUE7SUFBRSx1REFBUyxDQUFBO0lBQUUsbURBQU8sQ0FBQTtBQUM1QixDQUFDLEVBRkksV0FBVyxLQUFYLFdBQVcsUUFFZjtBQWNELGtCQUEwQixTQUFRLGlCQUFVLENBQUMsZUFBZTtJQWtDeEQsWUFBWSx1QkFBZ0MsS0FBSztRQUM3QyxLQUFLLENBQUMsS0FBSyxFQUFFLDJCQUEyQixDQUFDLENBQUM7UUE1QnRDLFdBQU0sR0FBYyxJQUFJLENBQUM7UUFZekIsbUJBQWMsR0FBWSxLQUFLLENBQUM7UUFDaEMsa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFDL0IsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFHOUIsc0JBQWlCLEdBQXFCLElBQUksQ0FBQztRQU8zQyxtQkFBYyxHQUFHLENBQUMsQ0FBQztRQUNuQixvQkFBZSxHQUFHLElBQUksQ0FBQztRQUszQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksd0JBQWlCLEVBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksVUFBVSxDQUFDLGFBQWEsRUFBVSxDQUFDO1FBQzVELElBQUksQ0FBQyxzQkFBc0IsR0FBRyxvQkFB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SUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMvQixDQUFDO0lBRUQsSUFBSSxTQUFTLENBQUMsQ0FBVTtRQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELElBQUksS0FBSztRQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFJLFVBQVU7UUFDVixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSSxLQUFLLENBQUMsTUFBaUI7UUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDekIsQ0FBQztJQUVELElBQUksTUFBTSxDQUFDLENBQVU7UUFDakIsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUVELElBQUksTUFBTTtRQUNOLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFJLEtBQUssQ0FBQyxDQUFTO1FBQ2YsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELElBQUksS0FBSztRQUNMLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7O0FBNW1Dc0IsMkJBQWMsR0FBRyxHQUFHLENBQUM7QUFDckIsbUNBQXNCLEdBQUcsR0FBRyxDQUFDO0FBSHhELG9DQWduQ0M7QUFFRCxrQ0FBMEMsU0FBUSxLQUFLO0lBSW5ELFlBQVksRUFBYztRQUN0QixLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQztRQUV0QyxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsT0FBTyxHQUFHLCtCQUErQjtZQUMxQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3pCLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDMUMsQ0FBQztJQUVELElBQUksVUFBVTtRQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzVCLENBQUM7Q0FFSjtBQWpCRCxvRUFpQkMiLCJmaWxlIjoidmlldy92aWV3RG9jdW1lbnQuanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
