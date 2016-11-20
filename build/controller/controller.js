"use strict";
const model_1 = require("../model");
const view_1 = require("../view");
const menu_1 = require("./menu");
const electron_1 = require("electron");
const { Menu, MenuItem } = electron_1.remote;
function lastCharactor(str) {
    return str[str.length - 1];
}
class MDE {
    constructor(content) {
        content = content ? content : "";
        this._model = new model_1.TextModel(content);
        this._view = new view_1.EditorView(this._model);
        this._view.documentView.on("click", this.handleClientEvent.bind(this));
        this._view.inputerView.on("keydown", this.handleInputerKeyDown.bind(this));
        this._menu = menu_1.generateMenu();
        Menu.setApplicationMenu(this._menu);
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
    handleInputerKeyDown(evt) {
        let pos = this._position;
        switch (evt.which) {
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
                    if (this._model.lineAt(this._position.line).length < this._position.offset)
                        this._position.offset = this._model.lineAt(this._position.line).length;
                    this.updateCursor(this._position);
                }
                break;
            default:
                setTimeout(() => {
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
                }, 20);
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
                this._view.documentView.renderLine(_textEdit.range.begin.line);
                if (_range.end.line - _range.begin.line >= 1) {
                    this._view.documentView.deleteLines(_range.begin.line + 1, _range.begin.line +
                        _range.end.line - _range.begin.line + 1);
                }
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyL2NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHdCQUFzRixVQUN0RixDQUFDLENBRCtGO0FBQ2hHLHVCQUFxQyxTQUNyQyxDQUFDLENBRDZDO0FBRTlDLHVCQUEyQixRQUMzQixDQUFDLENBRGtDO0FBQ25DLDJCQUFxQixVQUNyQixDQUFDLENBRDhCO0FBQy9CLE1BQU0sRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLEdBQUcsaUJBQU0sQ0FBQTtBQUUvQix1QkFBdUIsR0FBVztJQUM5QixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDL0IsQ0FBQztBQUVEO0lBT0ksWUFBWSxPQUFpQjtRQUN6QixPQUFPLEdBQUcsT0FBTyxHQUFFLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFFaEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGlCQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLGlCQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXpDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRTNFLElBQUksQ0FBQyxLQUFLLEdBQUcsbUJBQVksRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVPLGdCQUFnQixDQUFDLElBQVU7UUFDL0IsSUFBSSxHQUFHLEdBQWdC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O2dCQUNqRCxDQUFDO2dCQUNELEtBQUssQ0FBQztZQUNWO2dCQUNJLE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUNqRCxDQUFDO0lBQ0wsQ0FBQztJQUVELFFBQVEsQ0FBQyxLQUFrQjtRQUN2QixLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsT0FBTztRQUNILElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQUksSUFBSTtRQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0FBRUwsQ0FBQztBQTVPWSxXQUFHLE1BNE9mLENBQUEiLCJmaWxlIjoiY29udHJvbGxlci9jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
