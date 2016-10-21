"use strict";
const viewLine_1 = require("./viewLine");
const cursor_1 = require("./cursor");
const textModel_1 = require("../model/textModel");
const lineNumber_1 = require("./lineNumber");
const input_1 = require("./input");
const dom_1 = require("../util/dom");
class Display {
    constructor(container) {
        this._model = new textModel_1.TextModel();
        this._lineNumber = new lineNumber_1.LineNumber(0);
        this._frame = dom_1.elem("div", "display-frame");
        this._render_frame = dom_1.elem("div", "render-frame");
        this._input = new input_1.Input();
        this._cursor = new cursor_1.Cursor();
        this._input.appendTo(this._frame);
        this._cursor.appendTo(this._frame);
        this._frame.appendChild(this._lineNumber.frame);
        this._frame.appendChild(this._render_frame);
        container.appendChild(this._frame);
    }
    render(tm) {
        this._lines = new Array();
        this._model = tm;
        try {
            this._lineNumber.total_number = tm.linesCount;
        }
        catch (e) {
            console.log(e);
        }
        let lineCount = tm.linesCount;
        for (let i = 1; i <= lineCount; i++) {
            let lineModel = tm.getLineFromNum(i);
            let vl = new viewLine_1.ViewLine(lineModel);
            vl.onClickEvent((vl, e) => {
                let range = document.caretRangeFromPoint(e.pageX, e.pageY);
                let coordinate = range.getBoundingClientRect();
                this._cursor.setCoordinate(coordinate.left, coordinate.top);
                this._input.setCoordinate(coordinate.left, coordinate.top);
                this._input.getElement().focus();
                this._currentLine = i;
                this._currentOffset = range.startOffset;
            });
            this._lines.push(vl);
        }
        for (let i = 0; i < this._lines.length; ++i) {
            this._lines[i].appendTo(this._render_frame);
        }
        this._input.onInputEvent((input, e) => {
            let content = this._input.value;
            let insert_len = content.length;
            this._input.value = "";
            this._model.insertText(this._currentLine, this._currentOffset, content);
            this._currentOffset += insert_len;
            let range = document.createRange();
            let _elem = this._lines[this._currentLine - 1].getElement();
            range.setStart(_elem.firstChild, this._currentOffset);
            range.setEnd(_elem.firstChild, this._currentOffset);
            let rect = range.getBoundingClientRect();
            this._cursor.setCoordinate(rect.left, rect.top);
            this._input.setCoordinate(rect.left, rect.top);
            this._input.focus();
        });
        this._input.onKeyboardEvent((input, e) => {
            switch (e.which) {
                case 8:
                    {
                        this._model.deleteText(this._currentLine, this._currentOffset - 1, this._currentOffset);
                        this._currentOffset--;
                        let range = document.createRange();
                        let _elem = this._lines[this._currentLine - 1].getElement();
                        range.setStart(_elem.firstChild, this._currentOffset);
                        range.setEnd(_elem.firstChild, this._currentOffset);
                        let rect = range.getBoundingClientRect();
                        this._cursor.setCoordinate(rect.left, rect.top);
                        this._input.setCoordinate(rect.left, rect.top);
                        break;
                    }
                case 46:
                    {
                        this._model.deleteText(this._currentLine, this._currentOffset, this._currentOffset + 1);
                        break;
                    }
                case 37:
                    {
                        if (this._currentOffset > 0) {
                            this._currentOffset--;
                            let range = document.createRange();
                            let _elem = this._lines[this._currentLine - 1].getElement();
                            range.setStart(_elem.firstChild, this._currentOffset);
                            range.setEnd(_elem.firstChild, this._currentOffset);
                            let rect = range.getBoundingClientRect();
                            this._cursor.setCoordinate(rect.left, rect.top);
                            this._input.setCoordinate(rect.left, rect.top);
                        }
                        else {
                        }
                        break;
                    }
                case 38:
                    {
                        if (this._currentLine > 1) {
                            this._currentLine--;
                            let range = document.createRange();
                            let _elem = this._lines[this._currentLine - 1].getElement();
                            let modelLine = this._model.getLineFromNum(this._currentLine);
                            if (this._currentOffset >= modelLine.length) {
                                range.setStart(_elem.firstChild, modelLine.length - 1);
                                range.setEnd(_elem.firstChild, modelLine.length - 1);
                            }
                            else {
                                range.setStart(_elem.firstChild, this._currentOffset);
                                range.setEnd(_elem.firstChild, this._currentOffset);
                            }
                            let rect = range.getBoundingClientRect();
                            this._cursor.setCoordinate(rect.left, rect.top);
                            this._input.setCoordinate(rect.left, rect.top);
                        }
                        break;
                    }
                case 39:
                    {
                        let lineModel = this._model.getLineFromNum(this._currentLine);
                        if (this._currentOffset <= lineModel.length - 1) {
                            this._currentOffset++;
                            let range = document.createRange();
                            let _elem = this._lines[this._currentLine - 1].getElement();
                            range.setStart(_elem.firstChild, this._currentOffset);
                            range.setEnd(_elem.firstChild, this._currentOffset);
                            let rect = range.getBoundingClientRect();
                            this._cursor.setCoordinate(rect.left, rect.top);
                            this._input.setCoordinate(rect.left, rect.top);
                        }
                        break;
                    }
                case 40:
                    {
                        break;
                    }
            }
        });
    }
    get frame() {
        return this._frame;
    }
}
exports.Display = Display;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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TUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDOzRCQUN4RCxDQUFDOzRCQUVELElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxxQkFBcUIsRUFBRSxDQUFDOzRCQUV6QyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzs0QkFDaEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBRW5ELENBQUM7d0JBRUQsS0FBSyxDQUFDO29CQUNWLENBQUM7Z0JBQ0QsS0FBSyxFQUFFO29CQUNQLENBQUM7d0JBQ0csSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO3dCQUU5RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDOUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDOzRCQUN0QixJQUFJLEtBQUssR0FBRSxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7NEJBQ2xDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQzs0QkFDNUQsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQzs0QkFDdEQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQzs0QkFDcEQsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLHFCQUFxQixFQUFFLENBQUM7NEJBRXpDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUNoRCxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDbkQsQ0FBQzt3QkFDRCxLQUFLLENBQUM7b0JBQ1YsQ0FBQztnQkFDRCxLQUFLLEVBQUU7b0JBQ1AsQ0FBQzt3QkFFRyxLQUFLLENBQUM7b0JBQ1YsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQTtJQUVOLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0FBRUwsQ0FBQztBQWhNWSxlQUFPLFVBZ01uQixDQUFBIiwiZmlsZSI6InZpZXcvZGlzcGxheS5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
