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
        this._view = new view_1.EditorView(this._model);
        this._view.documentView.on("click", this.handleClientEvent.bind(this));
        this._view.inputerView.on("keydown", (evt) => {
            setTimeout(() => {
                this.handleInputerKeyDown(evt);
            }, 20);
        });
        this._view.inputerView.on("compositionstart", this.handleInputerCompositionStart.bind(this));
        this._view.inputerView.on("compositionend", this.handleInputerCompositionEnd.bind(this));
        this._view.inputerView.on("compositionupdate", this.handleInputerCompositionUpdate.bind(this));
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
            this._view.inputerView.value = "";
        }, 20);
        this._position = clonePosition(this._composition_start_pos);
        this._position.offset += updateData.length;
        this.updateCursor(this._position);
    }
    isInputerCompositing() {
        return this._view.inputerView.isCompositioning();
    }
    handleCompositionKeydown(evt) {
        let updateData = this._view.inputerView.element().value;
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
                let value = this.view.inputerView.value;
                if (value.length > 0) {
                    let textEdit = new model_1.TextEdit(model_1.TextEditType.InsertText, this._position, value);
                    this.applyTextEdit(textEdit);
                    this.updatePosition(textEdit);
                    let cursorCo = this._view.documentView.getCoordinate(this._position);
                    this._view.cursorView.setPostition(cursorCo);
                    this._view.inputerView.setPostition(cursorCo);
                    this.view.inputerView.clearContent();
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
        let cursorCo = this._view.documentView.getCoordinate(pos);
        this._view.cursorView.setPostition(cursorCo);
        this._view.inputerView.setPostition(cursorCo);
        this._view.cursorView.excite();
    }
    handleClientEvent(evt) {
        let _range = document.caretRangeFromPoint(evt.pageX, evt.pageY);
        let line_number, absolute_offset, linesCount = this._view.documentView.linesCount;
        for (let i = 1; i <= linesCount; i++) {
            let lineView = this._view.documentView.lines[i];
            let rect = lineView.element().firstElementChild.getBoundingClientRect();
            if (evt.pageY >= rect.top && evt.pageY <= rect.top + rect.height) {
                line_number = i;
                break;
            }
        }
        if (line_number === undefined)
            throw new Error("Not in range.");
        let lineView = this._view.documentView.lines[line_number];
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
        this._view.inputerView.setPostition(coordinate);
        this._view.cursorView.setPostition(coordinate);
        this._view.inputerView.element().focus();
    }
    applyTextEdit(_textEdit) {
        let _range = _textEdit.range;
        this._model.applyTextEdit(_textEdit);
        switch (_textEdit.type) {
            case model_1.TextEditType.InsertText:
                this._view.documentView.renderLine(_textEdit.position.line);
                if (_textEdit.lines.length > 1) {
                    let srcLinesCount = this._view.documentView.linesCount;
                    for (let i = _textEdit.position.line + 1; i <= srcLinesCount; i++) {
                        this._view.documentView.renderLine(i);
                    }
                    let init_length = this._view.documentView.lines.length - 1;
                    this.view.documentView.appendLines(_textEdit.lines.length - 1);
                    for (let i = 1; i < _textEdit.lines.length; i++) {
                        this._view.documentView.renderLine(init_length + i);
                    }
                }
                break;
            case model_1.TextEditType.DeleteText:
                if (_range.end.line > _range.begin.line) {
                    this._view.documentView.deleteLines(_range.begin.line + 1, _range.end.line + 1);
                }
                for (let i = _range.begin.line; i <= this._model.linesCount; i++)
                    this._view.documentView.renderLine(i);
                break;
            case model_1.TextEditType.ReplaceText:
                let linesDelta = _range.begin.line - _range.end.line;
                linesDelta += _textEdit.lines.length - 1;
                this._view.documentView.renderLine(_range.begin.line);
                if (linesDelta > 0) {
                    this._view.documentView.appendLines(linesDelta);
                }
                else if (linesDelta < 0) {
                    this._view.documentView.deleteLines(_range.begin.line + 1, _range.begin.line - linesDelta + 1);
                }
                for (let i = _range.begin.line; i <= this._model.linesCount; i++)
                    this._view.documentView.renderLine(i);
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
    get view() {
        return this._view;
    }
    get model() {
        return this._model;
    }
}
exports.MDE = MDE;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyL2NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHdCQUFzRixVQUN0RixDQUFDLENBRCtGO0FBQ2hHLHVCQUFxQyxTQUNyQyxDQUFDLENBRDZDO0FBRTlDLHVCQUEyQixRQUMzQixDQUFDLENBRGtDO0FBQ25DLDJCQUFxQixVQUNyQixDQUFDLENBRDhCO0FBQy9CLE1BQU0sRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLEdBQUcsaUJBQU0sQ0FBQTtBQUUvQix1QkFBdUIsR0FBVztJQUM5QixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDL0IsQ0FBQztBQUVELHVCQUF1QixHQUFhO0lBQ2hDLE1BQU0sQ0FBQztRQUNILElBQUksRUFBRSxHQUFHLENBQUMsSUFBSTtRQUNkLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTTtLQUNyQixDQUFDO0FBQ04sQ0FBQztBQUVEO0lBVUksWUFBWSxPQUFpQjtRQUN6QixPQUFPLEdBQUcsT0FBTyxHQUFFLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFFaEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGlCQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLGlCQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXpDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBSXZFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxHQUFrQjtZQUNwRCxVQUFVLENBQUM7Z0JBQ1AsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25DLENBQUMsRUFBRSxF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LENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUUxQyxLQUFLLENBQUM7WUFDVjtnQkFDSSxNQUFNLElBQUksS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDakQsQ0FBQztJQUNMLENBQUM7SUFFRCxRQUFRLENBQUMsS0FBa0I7UUFDdkIsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELE9BQU87UUFDSCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUFJLElBQUk7UUFDSixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztBQUVMLENBQUM7QUFoWlksV0FBRyxNQWdaZixDQUFBIiwiZmlsZSI6ImNvbnRyb2xsZXIvY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
