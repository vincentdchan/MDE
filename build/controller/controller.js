"use strict";
const model_1 = require("../model");
const view_1 = require("../view");
const menu_1 = require("./menu");
const electron_1 = require("electron");
const { Menu, MenuItem } = electron_1.remote;
function lastCharactor(str) {
    return str[str.length - 1];
}
function clonePosition(pos) {
    return {
        line: pos.line,
        offset: pos.offset
    };
}
class MDE {
    constructor(content) {
        content = content ? content : "";
        this._model = new model_1.TextModel(content);
        this._view = new view_1.WindowView(this._model);
        this.documentView.addEventListener("click", this.handleClientEvent.bind(this));
        this.inputerView.addEventListener("keydown", (evt) => {
            setTimeout(() => {
                this.handleInputerKeyDown(evt);
            }, 20);
        });
        this.inputerView.addEventListener("compositionstart", this.handleInputerCompositionStart.bind(this), false);
        this.inputerView.addEventListener("compositionend", this.handleInputerCompositionEnd.bind(this), false);
        this.inputerView.addEventListener("compositionupdate", this.handleInputerCompositionUpdate.bind(this), false);
        this._menu = menu_1.generateMenu();
    }
    findLineAncestor(node) {
        let elm = node.parentElement;
        while (true) {
            if (elm.classList.contains("editor-line")) {
                return elm;
            }
            else if (elm === document.body) {
                throw new Error("Element not found.");
            }
            elm = elm.parentElement;
        }
    }
    handleInputerCompositionStart(evt) {
        this._composition_start_pos = clonePosition(this._position);
        this._composition_update_pos = clonePosition(this._position);
    }
    handleInputerCompositionUpdate(evt) {
    }
    handleInputerCompositionEnd(evt) {
        let updateData = evt.data;
        updateData = updateData.replace("\n", "");
        setTimeout(() => {
            this.inputerView.value = "";
        }, 20);
        this._position = clonePosition(this._composition_start_pos);
        this._position.offset += updateData.length;
        this.updateCursor(this._position);
    }
    isInputerCompositing() {
        return this.inputerView.isCompositioning();
    }
    handleCompositionKeydown(evt) {
        let updateData = this.inputerView.element().value;
        updateData = updateData.replace("\n", "");
        let textEdit = new model_1.TextEdit(model_1.TextEditType.ReplaceText, {
            begin: this._composition_start_pos,
            end: this._composition_update_pos,
        }, updateData);
        this.applyTextEdit(textEdit);
        this._composition_update_pos = clonePosition(this._composition_start_pos);
        this._composition_update_pos.offset += updateData.length;
        this.updateCursor(this._composition_update_pos);
    }
    handleInputerKeyDown(evt) {
        if (this.isInputerCompositing()) {
            this.handleCompositionKeydown(evt);
            return;
        }
        let pos = this._position;
        switch (evt.keyCode) {
            case 8:
                if (this._position.offset == 0 && this._position.line > 1) {
                    let lastOffset = this._model.lineAt(this._position.line - 1).length - 1;
                    let textEdit = new model_1.TextEdit(model_1.TextEditType.DeleteText, {
                        begin: {
                            line: this._position.line - 1,
                            offset: lastOffset,
                        },
                        end: {
                            line: this._position.line,
                            offset: 0,
                        }
                    });
                    this.applyTextEdit(textEdit);
                    this._position.line--;
                    this._position.offset = lastOffset;
                    this.updateCursor(this._position);
                }
                else if (this._position.offset > 0) {
                    let textEdit = new model_1.TextEdit(model_1.TextEditType.DeleteText, {
                        begin: {
                            line: this._position.line,
                            offset: this._position.offset - 1,
                        },
                        end: {
                            line: this._position.line,
                            offset: this._position.offset,
                        }
                    });
                    this.applyTextEdit(textEdit);
                    this._position.offset--;
                    this.updateCursor(this._position);
                }
                break;
            case 35:
                this._position.offset =
                    this._model.lineAt(this._position.line).length - 1;
                this.updateCursor(this._position);
                break;
            case 36:
                this._position.offset = 0;
                this.updateCursor(this._position);
                break;
            case 37:
                if (pos.offset == 0) {
                    if (pos.line > 1) {
                        this._position = {
                            line: pos.line - 1,
                            offset: this._model.lineAt(pos.line - 1).length - 1,
                        };
                    }
                }
                else {
                    this._position.offset--;
                }
                this.updateCursor(this._position);
                break;
            case 38:
                if (pos.line > 1) {
                    this._position.line--;
                    if (this._model.lineAt(this._position.line).length < this._position.offset)
                        this._position.offset = this._model.lineAt(this._position.line).length - 1;
                    this.updateCursor(this._position);
                }
                break;
            case 39:
                if (pos.offset >= this._model.lineAt(pos.line).length - 1) {
                    if (pos.line < this._model.linesCount) {
                        this._position = {
                            line: this._position.line + 1,
                            offset: 0
                        };
                        this.updateCursor(this._position);
                    }
                }
                else {
                    this._position.offset++;
                    this.updateCursor(this._position);
                }
                break;
            case 40:
                if (pos.line < this._model.linesCount) {
                    this._position.line++;
                    let newLineText = this._model.lineAt(this._position.line).text;
                    if (lastCharactor(newLineText) == '\n') {
                        if (this._position.offset >= this._model.lineAt(this._position.line).length - 1)
                            this._position.offset = this._model.lineAt(this._position.line).length - 1;
                    }
                    else if (newLineText.length == 0) {
                        this._position.offset = 0;
                    }
                    this.updateCursor(this._position);
                }
                break;
            case 45:
                break;
            case 46:
                break;
            default:
                let value = this.inputerView.value;
                if (value.length > 0) {
                    let textEdit = new model_1.TextEdit(model_1.TextEditType.InsertText, this._position, value);
                    this.applyTextEdit(textEdit);
                    this.updatePosition(textEdit);
                    this.updateCursor(this._position);
                    this.inputerView.clearContent();
                }
        }
    }
    updatePosition(textEdit) {
        switch (textEdit.type) {
            case model_1.TextEditType.InsertText:
                if (textEdit.lines.length == 1) {
                    this._position.offset += textEdit.lines[0].length;
                }
                else {
                    this._position = {
                        line: this._position.line + textEdit.lines.length - 1,
                        offset: textEdit.lines[textEdit.lines.length - 1].length,
                    };
                }
                break;
            case model_1.TextEditType.DeleteText:
                break;
        }
    }
    updateCursor(pos) {
        let cursorCo = this.documentView.getCoordinate(pos);
        this.updateCoursorByCoordinate(cursorCo);
    }
    updateCoursorByCoordinate(co) {
        co.x -= this._view.leftPanelView.width;
        this.cursorView.setPostition(co);
        this.inputerView.setPostition(co);
        this.cursorView.excite();
    }
    handleClientEvent(evt) {
        let _range = document.caretRangeFromPoint(evt.clientX, evt.clientY);
        let line_number, absolute_offset, linesCount = this.documentView.linesCount;
        for (let i = 1; i <= linesCount; i++) {
            let lineView = this.documentView.lines[i];
            let rect = lineView.element().getBoundingClientRect();
            if (evt.clientY >= rect.top && evt.clientY <= rect.top + rect.height) {
                line_number = i;
                break;
            }
        }
        if (line_number === undefined)
            throw new Error("Not in range.");
        let lineView = this.documentView.lines[line_number];
        let lineElm = lineView.element();
        absolute_offset = 0;
        for (let i = 0; i < lineView.words.length; i++) {
            if (lineView.words[i].element() === _range.startContainer.parentElement) {
                absolute_offset += _range.startOffset;
                break;
            }
            absolute_offset = lineView.words[i].length;
        }
        this._position = {
            line: line_number,
            offset: absolute_offset,
        };
        let coordinate;
        if (this._position.offset === 0) {
            let rect = lineView.element().getBoundingClientRect();
            coordinate = {
                x: rect.left,
                y: rect.top,
            };
        }
        else {
            let rect = _range.getBoundingClientRect();
            coordinate = {
                x: rect.left,
                y: rect.top,
            };
        }
        this.updateCoursorByCoordinate(coordinate);
        this.inputerView.element().focus();
    }
    applyTextEdit(_textEdit) {
        let _range = _textEdit.range;
        this._model.applyTextEdit(_textEdit);
        switch (_textEdit.type) {
            case model_1.TextEditType.InsertText:
                this.documentView.renderLine(_textEdit.position.line);
                if (_textEdit.lines.length > 1) {
                    let srcLinesCount = this.documentView.linesCount;
                    for (let i = _textEdit.position.line + 1; i <= srcLinesCount; i++) {
                        this.documentView.renderLine(i);
                    }
                    let init_length = this.documentView.lines.length - 1;
                    this.documentView.appendLines(_textEdit.lines.length - 1);
                    for (let i = 1; i < _textEdit.lines.length; i++) {
                        this.documentView.renderLine(init_length + i);
                    }
                }
                break;
            case model_1.TextEditType.DeleteText:
                if (_range.end.line > _range.begin.line) {
                    this.documentView.deleteLines(_range.begin.line + 1, _range.end.line + 1);
                }
                for (let i = _range.begin.line; i <= this._model.linesCount; i++)
                    this.documentView.renderLine(i);
                break;
            case model_1.TextEditType.ReplaceText:
                let linesDelta = _range.begin.line - _range.end.line;
                linesDelta += _textEdit.lines.length - 1;
                this.documentView.renderLine(_range.begin.line);
                if (linesDelta > 0) {
                    this.documentView.appendLines(linesDelta);
                }
                else if (linesDelta < 0) {
                    this.documentView.deleteLines(_range.begin.line + 1, _range.begin.line - linesDelta + 1);
                }
                for (let i = _range.begin.line; i <= this._model.linesCount; i++)
                    this.documentView.renderLine(i);
                break;
            default:
                throw new Error("Error text edit type.");
        }
    }
    appendTo(_elem) {
        _elem.appendChild(this._view.element());
    }
    dispose() {
        this._model = null;
        this._view.dispose();
        this._view = null;
    }
    get editorView() {
        return this._view.editorView;
    }
    get documentView() {
        return this._view.editorView.documentView;
    }
    get inputerView() {
        return this._view.editorView.inputerView;
    }
    get cursorView() {
        return this._view.editorView.cursorView;
    }
    get view() {
        return this._view;
    }
    get model() {
        return this._model;
    }
}
exports.MDE = MDE;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyL2NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHdCQUNvQyxVQUNwQyxDQUFDLENBRDZDO0FBQzlDLHVCQUFpRCxTQUNqRCxDQUFDLENBRHlEO0FBRTFELHVCQUEyQixRQUMzQixDQUFDLENBRGtDO0FBQ25DLDJCQUFxQixVQUNyQixDQUFDLENBRDhCO0FBQy9CLE1BQU0sRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLEdBQUcsaUJBQU0sQ0FBQTtBQUUvQix1QkFBdUIsR0FBVztJQUM5QixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDL0IsQ0FBQztBQUVELHVCQUF1QixHQUFhO0lBQ2hDLE1BQU0sQ0FBQztRQUNILElBQUksRUFBRSxHQUFHLENBQUMsSUFBSTtRQUNkLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTTtLQUNyQixDQUFDO0FBQ04sQ0FBQztBQUVEO0lBVUksWUFBWSxPQUFpQjtRQUN6QixPQUFPLEdBQUcsT0FBTyxHQUFFLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFFaEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGlCQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFckMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLGlCQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXpDLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUkvRSxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxDQUFDLEdBQWtCO1lBQzVELFVBQVUsQ0FBQztnQkFDUCxJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUNoRCxJQUFJLENBQUMsNkJBQTZCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLEVBQzlDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxtQkFBbUIsRUFDakQsSUFBSSxDQUFDLDhCQUE4QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUUzRCxJQUFJLENBQUMsS0FBSyxHQUFHLG1CQUFZLEVBQUUsQ0FBQztJQUVoQyxDQUFDO0lBRU8sZ0JBQWdCLENBQUMsSUFBVTtRQUMvQixJQUFJLEdBQUcsR0FBZ0IsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUMxQyxPQUFPLElBQUksRUFBRSxDQUFDO1lBQ1YsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QyxNQUFNLENBQUMsR0FBRyxDQUFDO1lBQ2YsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLE1BQU0sSUFBSSxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUMxQyxDQUFDO1lBQ0QsR0FBRyxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUM7UUFDNUIsQ0FBQztJQUNMLENBQUM7SUFFTyw2QkFBNkIsQ0FBQyxHQUFVO1FBQzVDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyx1QkFBdUIsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFTyw4QkFBOEIsQ0FBQyxHQUFRO0lBbUIvQyxDQUFDO0lBRU8sMkJBQTJCLENBQUMsR0FBUTtRQUN4QyxJQUFJLFVBQVUsR0FBWSxHQUFHLENBQUMsSUFBSSxDQUFDO1FBRW5DLFVBQVUsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztRQVkxQyxVQUFVLENBQUM7WUFDUCxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDaEMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRVAsSUFBSSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQTtRQUMxQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRU8sb0JBQW9CO1FBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUVPLHdCQUF3QixDQUFDLEdBQWtCO1FBRS9DLElBQUksVUFBVSxHQUFZLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDO1FBRTNELFVBQVUsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUUxQyxJQUFJLFFBQVEsR0FBRyxJQUFJLGdCQUFRLENBQUMsb0JBQVksQ0FBQyxXQUFXLEVBQUU7WUFDbEQsS0FBSyxFQUFFLElBQUksQ0FBQyxzQkFBc0I7WUFDbEMsR0FBRyxFQUFFLElBQUksQ0FBQyx1QkFBdUI7U0FDcEMsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUVmLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFN0IsSUFBSSxDQUFDLHVCQUF1QixHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUMxRSxJQUFJLENBQUMsdUJBQXVCLENBQUMsTUFBTSxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUE7UUFFeEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUVwRCxDQUFDO0lBRU8sb0JBQW9CLENBQUMsR0FBa0I7UUFFM0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQyxNQUFNLENBQUM7UUFDWCxDQUFDO1FBRUQsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN6QixNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNsQixLQUFLLENBQUM7Z0JBQ0YsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hELElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7b0JBQ3hFLElBQUksUUFBUSxHQUFHLElBQUksZ0JBQVEsQ0FBQyxvQkFBWSxDQUFDLFVBQVUsRUFBRTt3QkFDakQsS0FBSyxFQUFFOzRCQUNILElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxDQUFDOzRCQUM3QixNQUFNLEVBQUUsVUFBVTt5QkFDckI7d0JBQ0QsR0FBRyxFQUFFOzRCQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUk7NEJBQ3pCLE1BQU0sRUFBRSxDQUFDO3lCQUNaO3FCQUNKLENBQUMsQ0FBQztvQkFFSCxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO29CQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7b0JBQ25DLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUV0QyxDQUFDO2dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNuQyxJQUFJLFFBQVEsR0FBRyxJQUFJLGdCQUFRLENBQUMsb0JBQVksQ0FBQyxVQUFVLEVBQUU7d0JBQ2pELEtBQUssRUFBRTs0QkFDSCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJOzRCQUN6QixNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQzt5QkFDcEM7d0JBQ0QsR0FBRyxFQUFFOzRCQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUk7NEJBQ3pCLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU07eUJBQ2hDO3FCQUNKLENBQUMsQ0FBQTtvQkFDRixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUN4QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDdEMsQ0FBQztnQkFDRCxLQUFLLENBQUM7WUFDVixLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNO29CQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7Z0JBQ3RELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNsQyxLQUFLLENBQUM7WUFDVixLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUMxQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDbEMsS0FBSyxDQUFDO1lBQ1YsS0FBSyxFQUFFO2dCQUNILEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDbEIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNmLElBQUksQ0FBQyxTQUFTLEdBQUc7NEJBQ2IsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQzs0QkFDbEIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUM7eUJBQ3RELENBQUE7b0JBQ0wsQ0FBQztnQkFDTCxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQzVCLENBQUM7Z0JBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ2xDLEtBQUssQ0FBQztZQUNWLEtBQUssRUFBRTtnQkFDSCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDdEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7d0JBQ3ZFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztvQkFDL0UsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3RDLENBQUM7Z0JBQ0QsS0FBSyxDQUFDO1lBQ1YsS0FBSyxFQUFFO2dCQUNILEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN4RCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzt3QkFDcEMsSUFBSSxDQUFDLFNBQVMsR0FBRzs0QkFDYixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsQ0FBQzs0QkFDN0IsTUFBTSxFQUFFLENBQUM7eUJBQ1osQ0FBQTt3QkFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDdEMsQ0FBQztnQkFDTCxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQ3hCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUN0QyxDQUFDO2dCQUNELEtBQUssQ0FBQztZQUNWLEtBQUssRUFBRTtnQkFDSCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztvQkFDcEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDdEIsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQy9ELEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUNyQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7NEJBQzVFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztvQkFDbkYsQ0FBQztvQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNqQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7b0JBQzlCLENBQUM7b0JBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3RDLENBQUM7Z0JBQ0QsS0FBSyxDQUFDO1lBQ1YsS0FBSyxFQUFFO2dCQUNILEtBQUssQ0FBQztZQUNWLEtBQUssRUFBRTtnQkFDSCxLQUFLLENBQUM7WUFDVjtnQkFFSSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztnQkFDbkMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNuQixJQUFJLFFBQVEsR0FBRyxJQUFJLGdCQUFRLENBQUMsb0JBQVksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFFNUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDN0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFFOUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBRWxDLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQ3BDLENBQUM7UUFDVCxDQUFDO0lBR0wsQ0FBQztJQUVPLGNBQWMsQ0FBQyxRQUFrQjtRQUNyQyxNQUFNLENBQUEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNuQixLQUFLLG9CQUFZLENBQUMsVUFBVTtnQkFDeEIsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7Z0JBQ3RELENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osSUFBSSxDQUFDLFNBQVMsR0FBRzt3QkFDYixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQzt3QkFDckQsTUFBTSxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTTtxQkFDM0QsQ0FBQztnQkFDTixDQUFDO2dCQUNELEtBQUssQ0FBQztZQUNWLEtBQUssb0JBQVksQ0FBQyxVQUFVO2dCQUN4QixLQUFLLENBQUM7UUFDZCxDQUFDO0lBRUwsQ0FBQztJQUVPLFlBQVksQ0FBQyxHQUFhO1FBQzlCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXBELElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRU8seUJBQXlCLENBQUMsRUFBYztRQUM1QyxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQztRQUV2QyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVsQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFTyxpQkFBaUIsQ0FBQyxHQUFlO1FBQ3JDLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVwRSxJQUFJLFdBQW1CLEVBQ25CLGVBQXVCLEVBQ3ZCLFVBQVUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQztRQUU5QyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ25DLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTFDLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBRXRELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ25FLFdBQVcsR0FBRyxDQUFDLENBQUM7Z0JBQ2hCLEtBQUssQ0FBQztZQUNWLENBQUM7UUFDTCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsV0FBVyxLQUFLLFNBQVMsQ0FBQztZQUMxQixNQUFNLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRXJDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3BELElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUVqQyxlQUFlLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUM3QyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxLQUFLLE1BQU0sQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDdEUsZUFBZSxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUM7Z0JBQ3RDLEtBQUssQ0FBQztZQUNWLENBQUM7WUFDRCxlQUFlLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDL0MsQ0FBQztRQUVELElBQUksQ0FBQyxTQUFTLEdBQUc7WUFDYixJQUFJLEVBQUUsV0FBVztZQUNqQixNQUFNLEVBQUUsZUFBZTtTQUMxQixDQUFDO1FBRUYsSUFBSSxVQUFzQixDQUFDO1FBQzNCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDdEQsVUFBVSxHQUFHO2dCQUNULENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDWixDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUc7YUFDZCxDQUFDO1FBQ04sQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDMUMsVUFBVSxHQUFHO2dCQUNULENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDWixDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUc7YUFDZCxDQUFBO1FBQ0wsQ0FBQztRQUNELElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUUzQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxhQUFhLENBQUMsU0FBbUI7UUFDN0IsSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQztRQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUVwQyxNQUFNLENBQUEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNwQixLQUFLLG9CQUFZLENBQUMsVUFBVTtnQkFDeEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdEQsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFN0IsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUE7b0JBQ2hELEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLENBQUMsRUFDcEMsQ0FBQyxJQUFJLGFBQWEsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO3dCQUMxQixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDcEMsQ0FBQztvQkFFRCxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO29CQUNyRCxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDMUQsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO3dCQUM5QyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ2xELENBQUM7Z0JBR0wsQ0FBQztnQkFDRCxLQUFLLENBQUM7WUFDVixLQUFLLG9CQUFZLENBQUMsVUFBVTtnQkFDeEIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUN0QyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzlFLENBQUM7Z0JBQ0QsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRTtvQkFDNUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLEtBQUssQ0FBQztZQUNWLEtBQUssb0JBQVksQ0FBQyxXQUFXO2dCQUN6QixJQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztnQkFDckQsVUFBVSxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFFekMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFaEQsRUFBRSxDQUFDLENBQUMsVUFBVSxHQUFHLENBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUM5QyxDQUFDO2dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDeEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDN0YsQ0FBQztnQkFFRCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFO29CQUM1RCxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFcEMsS0FBSyxDQUFDO1lBQ1Y7Z0JBQ0ksTUFBTSxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQ2pELENBQUM7SUFDTCxDQUFDO0lBRUQsUUFBUSxDQUFDLEtBQWtCO1FBQ3ZCLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxPQUFPO1FBQ0gsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0lBRUQsSUFBSSxVQUFVO1FBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO0lBQ2pDLENBQUM7SUFFRCxJQUFJLFlBQVk7UUFDWixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDO0lBQzlDLENBQUM7SUFFRCxJQUFJLFdBQVc7UUFDWCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDO0lBQzdDLENBQUM7SUFFRCxJQUFJLFVBQVU7UUFDVixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDO0lBQzVDLENBQUM7SUFFRCxJQUFJLElBQUk7UUFDSixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztBQUVMLENBQUM7QUF2YVksV0FBRyxNQXVhZixDQUFBIiwiZmlsZSI6ImNvbnRyb2xsZXIvY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
