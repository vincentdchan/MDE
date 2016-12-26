"use strict";
const viewLine_1 = require("./viewLine");
const model_1 = require("../model");
const controller_1 = require("../controller");
const util_1 = require("../util");
const fn_1 = require("../util/fn");
const viewSelection_1 = require("./viewSelection");
const electron_1 = require("electron");
const events_1 = require("./events");
const Collection = require("typescript-collections");
function setHeight(elm, h) {
    elm.style.height = h + "px";
}
class NullElement extends util_1.DomHelper.ResizableElement {
}
var RenderState;
(function (RenderState) {
    RenderState[RenderState["Null"] = 0] = "Null";
    RenderState[RenderState["PlainText"] = 1] = "PlainText";
    RenderState[RenderState["Colored"] = 2] = "Colored";
})(RenderState || (RenderState = {}));
class NotInRangeError extends Error {
    constructor() {
        super("Not in range.");
    }
}
class DocumentView extends util_1.DomHelper.AbsoluteElement {
    constructor(allowMultiselections = false) {
        super("div", "mde-document unselectable");
        this._model = null;
        this._mouse_pressed = false;
        this._ctrl_pressed = false;
        this._compositing = false;
        this._selection_manger = null;
        this._waiting_times = 0;
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
        this._container = util_1.DomHelper.elem("div", "mde-document-container");
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
            let result = this._model.applyCancellableTextEdit(textEdit);
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
            let result = this._model.applyCancellableTextEdit(textEdit);
            let renderOption = this.calculateRenderLines(textEdit);
            this.render(renderOption);
            this._history_handler.pushUndo(result.reverse);
            viewSelection_1.moveSelectionTo(majorSelection, result.pos);
            electron_1.clipboard.writeText(textContent);
        }
    }
    handleSelectionKeydown(evt) {
        if (evt.ctrlKey && evt.shiftKey) {
            evt.preventDefault();
            switch (evt.which) {
                case util_1.KeyCode.$Z:
                    this.redo();
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
                            let result = this._model.applyCancellableTextEdit(textEdit);
                            this.render(this.calculateRenderLines(textEdit));
                            this._history_handler.pushUndo(result.reverse);
                            viewSelection_1.moveSelectionTo(majorSelection, result.pos);
                        }
                        else {
                            let textEdit = new model_1.TextEdit(model_1.TextEditType.DeleteText, {
                                begin: majorSelection.beginPosition,
                                end: majorSelection.endPosition
                            });
                            let result = this._model.applyCancellableTextEdit(textEdit);
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
                                let result = this._model.applyCancellableTextEdit(textEdit);
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
                                    let result = this._model.applyCancellableTextEdit(textEdit);
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
                            let result = this._model.applyCancellableTextEdit(textEdit);
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
                                let result = this._model.applyCancellableTextEdit(textEdit);
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
                                let result = this._model.applyCancellableTextEdit(textEdit);
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
            let result = this._model.applyCancellableTextEdit(textEdit);
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
    redo() {
        let textEdit = this._history_handler.popRedo();
        let majorSelection = this._selection_manger.selectionAt(0);
        if (textEdit) {
            let result = this._model.applyCancellableTextEdit(textEdit);
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
                this._lines[i].renderLineNumber(i);
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
            if (e instanceof NotInRangeError) {
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
            throw new NotInRangeError();
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
    renderLineImd(lineNum) {
        if (lineNum <= 0 || lineNum > this.linesCount)
            throw new Error("<index out of range> line:" + lineNum + " LinesCount:" + this.linesCount);
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
DocumentView.LazyRenderTime = 420;
DocumentView.CursorBlinkingInternal = 500;
exports.DocumentView = DocumentView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdEb2N1bWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMkJBQXVCLFlBQ3ZCLENBQUMsQ0FEa0M7QUFFbkMsd0JBQ3NELFVBQ3RELENBQUMsQ0FEK0Q7QUFDaEUsNkJBQTZCLGVBQzdCLENBQUMsQ0FEMkM7QUFDNUMsdUJBQ21ELFNBQ25ELENBQUMsQ0FEMkQ7QUFDNUQscUJBQTJCLFlBQzNCLENBQUMsQ0FEc0M7QUFJdkMsZ0NBQWdELGlCQUNoRCxDQUFDLENBRGdFO0FBQ2pFLDJCQUFnQyxVQUNoQyxDQUFDLENBRHlDO0FBQzFDLHlCQUF3RCxVQUN4RCxDQUFDLENBRGlFO0FBQ2xFLE1BQVksVUFBVSxXQUFNLHdCQUM1QixDQUFDLENBRG1EO0FBR3BELG1CQUFtQixHQUFnQixFQUFFLENBQVM7SUFDMUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztBQUNoQyxDQUFDO0FBWUQsMEJBQTBCLGdCQUFTLENBQUMsZ0JBQWdCO0FBRXBELENBQUM7QUFXRCxJQUFLLFdBRUo7QUFGRCxXQUFLLFdBQVc7SUFDWiw2Q0FBSSxDQUFBO0lBQUUsdURBQVMsQ0FBQTtJQUFFLG1EQUFPLENBQUE7QUFDNUIsQ0FBQyxFQUZJLFdBQVcsS0FBWCxXQUFXLFFBRWY7QUFPRCw4QkFBOEIsS0FBSztJQUUvQjtRQUNJLE1BQU0sZUFBZSxDQUFDLENBQUE7SUFDMUIsQ0FBQztBQUVMLENBQUM7QUFPRCwyQkFBa0MsZ0JBQVMsQ0FBQyxlQUFlO0lBaUN2RCxZQUFZLG9CQUFvQixHQUFZLEtBQUs7UUFDN0MsTUFBTSxLQUFLLEVBQUUsMkJBQTJCLENBQUMsQ0FBQztRQTNCdEMsV0FBTSxHQUFjLElBQUksQ0FBQztRQVl6QixtQkFBYyxHQUFZLEtBQUssQ0FBQztRQUNoQyxrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUMvQixpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUc5QixzQkFBaUIsR0FBcUIs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
