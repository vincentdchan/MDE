import {LineView} from "./viewLine"
import {IVirtualElement, Coordinate} from "."
import {TextModel, LineModel, Position, PositionUtil, 
    TextEdit, TextEditType} from "../model"
import {LineRenderer} from "../controller"
import {IDisposable, DomHelper, KeyCode} from "../util"
import {PopAllQueue} from "../util/queue"
import {InputerView} from "./viewInputer"
import {CursorView} from "./viewCursor"
import {SelectionManager, moveSelectionTo} from "./viewSelection"
import {remote, clipboard} from "electron"
import {CursorMoveEvent, ScrollHeightChangedEvent} from "./events"
import * as Electron from "electron"

function setHeight(elm: HTMLElement, h: number) {
    elm.style.height = h + "px";
}

interface RenderOption {
    renderImdLines: number[];
    renderLazilyLines: number[];
    appendLines?: number;
    removeTailLines?: number;
}

class NullElement extends DomHelper.ResizableElement {

}

///
/// Event:
///
/// CursorMove
///
export class DocumentView extends DomHelper.AbsoluteElement implements IDisposable {

    public static readonly CursorBlinkingInternal = 500;

    private _line_renderer: LineRenderer;

    private _model: TextModel = null;
    private _container: HTMLDivElement;
    private _lines: LineView[];
    private _nullArea: NullElement;

    private _scroll_height: number;

    private _window_mousemove_handler: EventListener;
    private _window_mouseup_handler: EventListener;
    private _window_keydown_handler: EventListener;
    private _window_keyup_handler: EventListener;

    private _mouse_pressed: boolean = false;
    private _ctrl_pressed: boolean = false;
    private _compositing: boolean = false;

    private _allow_multiselections: boolean;
    private _selection_manger: SelectionManager = null;

    private _compositing_position: Position;

    constructor(allowMultiselections: boolean = false) {
        super("div", "mde-document unselectable");

        this._allow_multiselections = allowMultiselections;
        this._lines = [];

        this._line_renderer = new LineRenderer();

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
            var vl = new LineView(line.number, this._line_renderer);

            this._lines[line.number] = vl;

            // vl.render(line.text);
            vl.renderLineNumber(line.number);
            this._line_renderer.renderLineImmdediately(line.number, line.text)
            this._container.appendChild(vl.element());
        })

        setTimeout(() => {
            this._nullArea.height = this._dom.clientHeight / 2;
            this._scroll_height = this._dom.scrollHeight;
        }, 5);
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
        ]

        let menu = remote.Menu.buildFromTemplate(options);

        menu.popup(remote.getCurrentWindow());
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
                    begin: PositionUtil.clonePosition(majorSelection.beginPosition),
                    end: end,
                });
                clipboard.writeText(text);
            } else {
                majorSelection.normalize();
                let beginPos: Position = majorSelection.beginPosition,
                    endPos: Position = majorSelection.endPosition;

                let text = this._model.report({begin: beginPos, end: endPos});
                clipboard.writeText(text);
            }
        }
    }

    private pasteToDocument() {
        if (this._selection_manger.length > 0) {
            let majorSelection = this._selection_manger.selectionAt(0);

            let textContent = clipboard.readText();
            let textEdit: TextEdit,
                result: Position,
                renderOption: RenderOption;

            if (majorSelection.collapsed) {
                textEdit = new TextEdit(TextEditType.InsertText, majorSelection.beginPosition, 
                    textContent);
            } else {
                textEdit = new TextEdit(TextEditType.ReplaceText, {
                    begin: majorSelection.beginPosition,
                    end: majorSelection.endPosition,
                }, textContent);
            }

            result = this._model.applyTextEdit(textEdit);
            renderOption = this.calculateRenderLines(textEdit);
            this.render(renderOption);

            moveSelectionTo(majorSelection, result);
        }
    }

    private cutToClipboard() {
        if (this._selection_manger.length > 0) {
            let majorSelection = this._selection_manger.selectionAt(0);

            let range: any;
            if (majorSelection.collapsed) {
                let end: Position = {
                    line: majorSelection.beginPosition.line,
                    offset: majorSelection.beginPosition.offset + 1,
                }
                range = {
                    begin: PositionUtil.clonePosition(majorSelection.beginPosition),
                    end: end
                };
            } else {
                range = {
                    begin: PositionUtil.clonePosition(majorSelection.beginPosition),
                    end: PositionUtil.clonePosition(majorSelection.endPosition),
                }
            }

            let textContent = this._model.report(range);

            let textEdit = new TextEdit(TextEditType.DeleteText, range);
            let result = this._model.applyTextEdit(textEdit);

            let renderOption = this.calculateRenderLines(textEdit);
            this.render(renderOption);

            moveSelectionTo(majorSelection, result);

            clipboard.writeText(textContent);
        }
    }

    private handleSelectionKeydown(evt: MouseEvent) {

        setTimeout(() => {

            let majorSelection = this._selection_manger.selectionAt(0);
            if (!this._compositing) {

                switch(evt.which) {

                    case KeyCode.Tab:
                        if (majorSelection.collapsed) {
                            let textEdit = new TextEdit(TextEditType.InsertText, majorSelection.beginPosition, "    ");
                            let result = this._model.applyTextEdit(textEdit);

                            this.renderLine(majorSelection.beginPosition.line);
                            moveSelectionTo(majorSelection, result);

                            setTimeout(() => {
                                majorSelection.focus();
                            }, 5);
                        }
                        break;
                    case KeyCode.PageUp:
                        break;
                    case KeyCode.PageDown:
                        break;
                    case KeyCode.Home:
                        majorSelection.endPosition = majorSelection.beginPosition = {
                            line: majorSelection.beginPosition.line,
                            offset: 0,
                        };
                        majorSelection.repaint();
                        break;
                    case KeyCode.End:
                        {
                            let _offset = this._model.lineAt(majorSelection.endPosition.line).length - 1;
                            majorSelection.endPosition = majorSelection.beginPosition = {
                                line: majorSelection.endPosition.line,
                                offset: _offset
                            };
                            majorSelection.repaint();
                        }
                        break;
                    case KeyCode.BackSpace:
                        if (majorSelection.collapsed) {

                            if (majorSelection.beginPosition.offset >= 1) {
                                let textEdit = new TextEdit(TextEditType.DeleteText, {
                                    begin: {
                                        line: majorSelection.beginPosition.line,
                                        offset: majorSelection.beginPosition.offset - 1
                                    },
                                    end: majorSelection.endPosition,
                                });
                                let result = this._model.applyTextEdit(textEdit);

                                this.renderLine(majorSelection.beginPosition.line);

                                moveSelectionTo(majorSelection, result);
                            } else {
                                let pos = majorSelection.beginPosition;
                                if (pos.line > 1) {
                                    let previousLineLength = this._model.lineAt(pos.line - 1).length;
                                    let textEdit = new TextEdit(TextEditType.DeleteText, {
                                        begin: {
                                            line: pos.line - 1,
                                            offset: previousLineLength - 1,
                                        },
                                        end: pos
                                    });

                                    let result = this._model.applyTextEdit(textEdit);
                                    let renderOption = this.calculateRenderLines(textEdit);
                                    this.render(renderOption);

                                    moveSelectionTo(majorSelection, result);
                                }
                            }

                        } else {
                            let textEdit = new TextEdit(TextEditType.DeleteText, {
                                begin: majorSelection.beginPosition,
                                end: majorSelection.endPosition
                            });

                            let result = this._model.applyTextEdit(textEdit);

                            if (majorSelection.beginPosition.line === majorSelection.endPosition.line) {
                                this.renderLine(majorSelection.beginPosition.line);
                            } else {
                                let offset = majorSelection.endPosition.line - majorSelection.beginPosition.line;

                                for (let i = this._lines.length - offset; i < this._lines.length; i++ ) {
                                    this._lines[i].dispose();
                                    this._lines[i].remove();
                                    this._lines[i] = null;
                                }

                                this._lines.length -= offset;

                                for (let i=majorSelection.beginPosition.line; i < this._lines.length; i++) {
                                    this.renderLine(i);
                                }
                            }

                            moveSelectionTo(majorSelection, result);
                        }
                        break;
                    default:
                        if (majorSelection.collapsed) {

                            let insertText = majorSelection.inputerContent;

                            // indeed input something
                            if (insertText.length > 0) {

                                let textEdit = new TextEdit(TextEditType.InsertText, 
                                    majorSelection.beginPosition, 
                                    majorSelection.inputerContent);
                                
                                let resultPos = this._model.applyTextEdit(textEdit);
                                let beginPos = this._selection_manger.selectionAt(0).beginPosition;

                                this.render(this.calculateRenderLines(textEdit));

                                majorSelection.clearInputerContent();
                                moveSelectionTo(majorSelection, resultPos);
                                majorSelection.repaint();

                            }

                        } else {

                            let textEdit = new TextEdit(TextEditType.ReplaceText, {
                                begin: majorSelection.beginPosition,
                                end: majorSelection.endPosition,
                            }, majorSelection.inputerContent);

                            majorSelection.clearInputerContent();
                            let result = this._model.applyTextEdit(textEdit);

                            this.render(this.calculateRenderLines(textEdit));

                            moveSelectionTo(majorSelection, result)
                            majorSelection.repaint();
                        }

                }

            }

        }, 10);

    }

    private render(option: RenderOption) {
        if (option.appendLines) {
            for (let i = 0; i < option.appendLines; i++) {
                let newLV = new LineView(this._lines.length, this._line_renderer);
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

        option.renderImdLines.forEach((num: number) => {
            this._line_renderer.renderLineImmdediately(num, this._model.lineAt(num).text);
        });

        option.renderLazilyLines.forEach((num: number) => {
            this._line_renderer.renderLineLazily(num, this._model.lineAt(num).text);
        })

        setTimeout(() => {
            this.checkScrollHeightChanged();
        }, 10);

    }

    private checkScrollHeightChanged() {
        let currentHeight = this._dom.scrollHeight;
        if (currentHeight !== this._scroll_height) {
            let oldHeight = currentHeight;

            this._scroll_height = currentHeight;
            let evt = new ScrollHeightChangedEvent(currentHeight, oldHeight);
            this._dom.dispatchEvent(evt);
        }
    }

    private calculateRenderLines(textEdit: TextEdit) : RenderOption {
        let option : RenderOption = {
            renderImdLines: [],
            renderLazilyLines: [],
        };
        switch(textEdit.type) {
            case TextEditType.InsertText:
                option.appendLines = textEdit.lines.length - 1;
                let appendedLines = this._lines.length + option.appendLines;
                for (let i = textEdit.position.line; i < appendedLines; i++) {
                    if (i === textEdit.position.line)
                        option.renderImdLines.push(i);
                    else
                        option.renderLazilyLines.push(i);
                }
            /*
                if (textEdit.lines.length == 1) {
                    option.renderImdLines.push(textEdit.position.line);
                } else {
                    option.appendLines = textEdit.lines.length - 1;
                    let appendedLines = this._lines.length + option.appendLines;
                    for (let i = textEdit.position.line; i < appendedLines; i++) {
                        if (i === textEdit.position.line)
                            option.renderImdLines.push(i);
                        else
                            option.renderLazilyLines.push(i);
                    }
                }
                */
                break;
            case TextEditType.DeleteText:
                if (textEdit.range.begin.line === textEdit.range.end.line) {
                    option.renderImdLines.push(textEdit.range.begin.line);
                } else {
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
            case TextEditType.ReplaceText:
                let lineOffset = 0;
                if (textEdit.lines.length > 1) lineOffset = textEdit.lines.length - 1;
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

    private handleSelectionCompositionStart(evt: Event) {
        this._compositing = true;

        if (this._selection_manger.length > 0) {
            this._compositing_position = PositionUtil.clonePosition(
                this._selection_manger.selectionAt(0).beginPosition);
        }
    }

    private handleSelectionCompositionUpdate(evt: Event) {
        if (this._selection_manger.length > 0) {
            let majorSelection = this._selection_manger.selectionAt(0);
            if (!majorSelection.collapsed)
                this._compositing_position = PositionUtil.clonePosition(majorSelection.beginPosition);

            let textEdit: TextEdit;
            if (PositionUtil.equalPostion(this._compositing_position, majorSelection.endPosition)) {
                textEdit = new TextEdit(TextEditType.InsertText, this._compositing_position, 
                    majorSelection.inputerContent);
            } else {
                textEdit = new TextEdit(TextEditType.ReplaceText, {
                    begin: PositionUtil.clonePosition(this._compositing_position),
                    end: PositionUtil.clonePosition(majorSelection.endPosition),
                }, majorSelection.inputerContent);
            }

            let result = this._model.applyTextEdit(textEdit);
            this.render(this.calculateRenderLines(textEdit));

            moveSelectionTo(majorSelection, result);
            majorSelection.repaint();
        }
    }

    private handleSelectionCompositionEnd(evt: Event) {

        setTimeout(() => {
            this._compositing = false;
            this._compositing_position = null;

            if (this._selection_manger.length > 0) {
                let majorSelection = this._selection_manger.selectionAt(0);
                majorSelection.clearInputerContent();
            }
        }, 20);
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
        if (this._selection_manger.focusedSelection) this._selection_manger.endSelecting();
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

    getCoordinate(pos: Position) : Coordinate {
        if (pos.line <= 0 || pos.line > this.linesCount)
            throw new Error("Index out of range.");

        let domRect = this._dom.getBoundingClientRect();
        let co = this._lines[pos.line].getCoordinate(pos.offset, false);
        co.y -= domRect.top;
        return co;
    }

    renderLine(line: number) {
        if (line <= 0 || line > this.linesCount)
            throw new Error("<index out of range> line:" + line + " LinesCount:" + this.linesCount);
        // this._lines[line].render(this._model.lineAt(line).text);
        this._line_renderer.renderLineImmdediately(line, this._model.lineAt(line).text);
        this._lines[line].renderLineNumber(line);
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

        this._lines = _lines_prefix.concat(_lines_postfix);

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
