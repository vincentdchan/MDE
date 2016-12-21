"use strict";
const StringBuffer_1 = require("../util/StringBuffer");
const text_1 = require("../util/text");
const LineModel_1 = require("./LineModel");
const events_1 = require("events");
const _1 = require(".");
const fn_1 = require("../util/fn");
function isEndOfLineBreaker(str) {
    return str[str.length - 1] == "\n";
}
class TextEditEvent {
    constructor(textEdit) {
        this._textEdit = textEdit;
    }
    get textEdit() {
        return this._textEdit;
    }
}
exports.TextEditEvent = TextEditEvent;
class TextModel extends events_1.EventEmitter {
    constructor(_string) {
        super();
        this._lines = new Array();
        let lc = 1;
        var buf = new StringBuffer_1.StringBuffer();
        var lines = text_1.parseTextToLines(_string);
        this._lines.length = lc;
        for (let i = 0; i < lines.length; i++) {
            var lm = new LineModel_1.LineModel(lc, lines[i]);
            this._lines[lc++] = lm;
        }
    }
    positionAt(offset) {
        let currentLine = 1;
        let remainOffset = offset;
        while (remainOffset >= this._lines[currentLine].length) {
            remainOffset -= this._lines[currentLine].length;
            currentLine++;
            if (currentLine > this.linesCount)
                throw new Error("Illegal data input.");
        }
        return {
            line: currentLine,
            offset: remainOffset,
        };
    }
    offsetAt(pos) {
        if (pos.line === 1 && this.linesCount >= 1) {
            if (pos.offset < this._lines[1].length)
                return pos.offset;
        }
        else if (pos.line > 1 && pos.line <= this.linesCount
            && pos.offset < this._lines[pos.line].length) {
            let count = 0;
            for (let i = 1; i < pos.line; i++) {
                count += this._lines[i].length;
            }
            count += pos.offset;
            return count;
        }
        throw new Error("Illegal data input.");
    }
    lineAt(num) {
        if (num <= 0 || num > this.linesCount)
            throw new Error("<Index out of range> line:" + num + " LinesCount:" + this.linesCount);
        return this._lines[num];
    }
    get firstLine() {
        if (this._lines.length === 0)
            throw new Error("No lines found.");
        return this._lines[0];
    }
    get lastLine() {
        if (this._lines.length === 0)
            throw new Error("No lines found.");
        return this._lines[this._lines.length - 1];
    }
    applyCancellableTextEdit(textEdit) {
        let _pos;
        let _reverse;
        switch (textEdit.type) {
            case _1.TextEditType.InsertText:
                if (textEdit.lines.length === 1) {
                    _reverse = new _1.TextEdit(_1.TextEditType.DeleteText, {
                        begin: _1.PositionUtil.clonePosition(textEdit.position),
                        end: {
                            line: textEdit.position.line,
                            offset: textEdit.position.offset + textEdit.lines[0].length
                        }
                    });
                }
                else {
                    _reverse = new _1.TextEdit(_1.TextEditType.DeleteText, {
                        begin: _1.PositionUtil.clonePosition(textEdit.position),
                        end: {
                            line: textEdit.position.line + textEdit.lines.length - 1,
                            offset: fn_1.last(textEdit.lines).length,
                        }
                    });
                }
                _pos = this.insertText(textEdit);
                break;
            case _1.TextEditType.DeleteText:
                let lostPart = this.report(textEdit.range);
                _reverse = new _1.TextEdit(_1.TextEditType.InsertText, _1.PositionUtil.clonePosition(textEdit.range.begin), lostPart);
                _pos = this.deleteText(textEdit);
                break;
            case _1.TextEditType.ReplaceText:
                let postPart = this.report(textEdit.range), beginPos = _1.PositionUtil.clonePosition(textEdit.range.begin), replacedPos = this.replaceText(textEdit);
                _reverse = new _1.TextEdit(_1.TextEditType.ReplaceText, {
                    begin: beginPos,
                    end: replacedPos,
                }, lostPart);
                _pos = replacedPos;
                break;
        }
        return {
            reverse: _reverse,
            pos: _pos,
        };
    }
    applyTextEdit(textEdit) {
        let pos;
        switch (textEdit.type) {
            case _1.TextEditType.InsertText:
                pos = this.insertText(textEdit);
                break;
            case _1.TextEditType.DeleteText:
                pos = this.deleteText(textEdit);
                break;
            case _1.TextEditType.ReplaceText:
                pos = this.replaceText(textEdit);
                break;
        }
        if (!pos)
            throw new Error("Unknown textEdit error.");
        let evt = new TextEditEvent(textEdit);
        this.emit("textEdit", evt);
        return pos;
    }
    insertText(textEdit) {
        let pos;
        if (textEdit.position)
            pos = textEdit.position;
        else
            pos = textEdit.range.begin;
        if (textEdit.text.length === 0) {
            return _1.PositionUtil.clonePosition(pos);
        }
        let lines = textEdit.lines;
        if (pos.line <= 0 || pos.line > this.linesCount)
            throw new Error("data illegal when inserting text to TextModel. Line: #" + pos.line);
        let linesHead = fn_1.hd(lines);
        let linesTail = fn_1.tl(lines);
        if (linesTail.length === 0) {
            this._lines[pos.line].insert(pos.offset, linesHead);
            return {
                line: pos.line,
                offset: pos.offset + linesHead.length,
            };
        }
        else {
            let prefix = this._lines[pos.line].text.slice(0, pos.offset);
            let postfix = this._lines[pos.line].text.slice(pos.offset);
            this._lines[pos.line] = new LineModel_1.LineModel(pos.line, prefix + linesHead);
            if (pos.line === this.linesCount) {
                let linesCount = this.linesCount + 1;
                let lineModels = [];
                linesTail.forEach((lineStr) => {
                    lineModels.push(new LineModel_1.LineModel(linesCount++, lineStr));
                });
                this._lines = this._lines.concat(lineModels);
                let lastLineModel = this._lines[linesCount - 1];
                lastLineModel.insert(lastLineModel.length, postfix);
            }
            else {
                let suffixLines = this._lines.slice(0, pos.line + 1);
                let postfixLines = this._lines.slice(pos.line + 1);
                let lineModels = [];
                let lineCounter = pos.line + 1;
                linesTail.forEach((lineStr) => {
                    lineModels.push(new LineModel_1.LineModel(lineCounter++, lineStr));
                });
                this._lines = suffixLines.concat(lineModels).concat(postfixLines);
                let insertLineModel = this._lines[lineCounter - 1];
                insertLineModel.insert(insertLineModel.length, postfix);
                for (let i = lineCounter; i <= this.linesCount; i++) {
                    this._lines[i].number = i;
                }
            }
            return {
                line: pos.line + lines.length - 1,
                offset: lines[lines.length - 1].length,
            };
        }
    }
    deleteText(textEdit) {
        let _range = textEdit.range;
        if (_range.begin.line === _range.end.line) {
            this._lines[_range.begin.line].delete(_range.begin.offset, _range.end.offset);
            return _1.PositionUtil.clonePosition(_range.begin);
        }
        else if (_range.begin.line < _range.end.line) {
            let remain = this._lines[_range.end.line].text.slice(_range.end.offset);
            let oldLineModel = this._lines[_range.begin.line];
            this._lines[_range.begin.line] = new LineModel_1.LineModel(_range.begin.line, oldLineModel.text.slice(0, _range.begin.offset) + remain);
            oldLineModel = null;
            let suffix = this._lines.slice(0, _range.begin.line + 1);
            let postffix = this._lines.slice(_range.end.line + 1);
            this._lines = suffix.concat(postffix);
            return _1.PositionUtil.clonePosition(_range.begin);
        }
        throw new Error("Illegal data.");
    }
    replaceText(textEdit) {
        let _range = textEdit.range, _text = textEdit.text;
        if (_range.end.line > _range.begin.line ||
            (_range.end.line === _range.begin.line && _range.end.offset >= _range.begin.offset)) {
            this.deleteText(textEdit);
            return this.insertText(textEdit);
        }
        else {
            throw new Error("Range is illegal.");
        }
    }
    getLineFromNum(_line_num) {
        return this._lines[_line_num];
    }
    charAt(pos) {
        return this._lines[pos.line].charAt(pos.offset);
    }
    reportAll() {
        var buf = new StringBuffer_1.StringBuffer();
        for (let i = 1; i < this._lines.length; i++) {
            buf.push(this._lines[i].report());
        }
        return buf.getStr();
    }
    report(_range) {
        var buf = new StringBuffer_1.StringBuffer();
        if (_range.begin.line === _range.end.line) {
            buf.push(this._lines[_range.begin.line].text.slice(_range.begin.offset, _range.end.offset));
        }
        else {
            buf.push(this._lines[_range.begin.line].text.slice(_range.begin.offset));
            for (let i = _range.begin.line + 1; i < _range.end.line; i++) {
                buf.push(this._lines[i].text);
            }
            buf.push(this._lines[_range.end.line].text.slice(0, _range.end.offset));
        }
        return buf.getStr();
    }
    forEach(_fun) {
        for (let i = 1; i <= this.linesCount; i++) {
            _fun(this._lines[i]);
        }
    }
    get linesCount() {
        return this._lines.length - 1;
    }
}
exports.TextModel = TextModel;
function* TextModelLineIterator(tm) {
    var lm = tm.linesCount;
    for (let i = 1; i <= lm; ++i) {
        yield tm.getLineFromNum(i);
    }
}
exports.TextModelLineIterator = TextModelLineIterator;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2RlbC90ZXh0TW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLCtCQUEyQixzQkFDM0IsQ0FBQyxDQURnRDtBQUNqRCx1QkFBK0IsY0FDL0IsQ0FBQyxDQUQ0QztBQUM3Qyw0QkFBd0IsYUFDeEIsQ0FBQyxDQURvQztBQUNyQyx5QkFBMkIsUUFDM0IsQ0FBQyxDQURrQztBQUNuQyxtQkFBMEcsR0FDMUcsQ0FBQyxDQUQ0RztBQUM3RyxxQkFBMkIsWUFFM0IsQ0FBQyxDQUZzQztBQUV2Qyw0QkFBNEIsR0FBVztJQUNuQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDO0FBQ3ZDLENBQUM7QUFPRDtJQUlJLFlBQVksUUFBa0I7UUFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7SUFDOUIsQ0FBQztJQUVELElBQUksUUFBUTtRQUNSLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7QUFFTCxDQUFDO0FBWlkscUJBQWEsZ0JBWXpCLENBQUE7QUFFRCx3QkFBK0IscUJBQVk7SUFJdkMsWUFBWSxPQUFlO1FBQ3ZCLE9BQU8sQ0FBQztRQUVSLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQWEsQ0FBQztRQUVyQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFWCxJQUFJLEdBQUcsR0FBRyxJQUFJLDJCQUFZLEVBQUUsQ0FBQztRQUU3QixJQUFJLEtBQUssR0FBRyx1QkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV0QyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDeEIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDcEMsSUFBSSxFQUFFLEdBQUcsSUFB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QUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRCxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM3QyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRXhFLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxxQkFBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUM1RCxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQztZQUU5RCxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBRXBCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN6RCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztZQUV0RCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFdEMsTUFBTSxDQUFDLGVBQVksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BELENBQUM7UUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFTyxXQUFXLENBQUMsUUFBa0I7UUFDbEMsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLEtBQUssRUFDdkIsS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDMUIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJO1lBQ25DLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFdEYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUUxQixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyQyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixNQUFNLElBQUksS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDekMsQ0FBQztJQUNMLENBQUM7SUFFRCxjQUFjLENBQUMsU0FBa0I7UUFDN0IsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVELE1BQU0sQ0FBQyxHQUFjO1FBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRCxTQUFTO1FBQ0wsSUFBSSxHQUFHLEdBQUcsSUFBSSwyQkFBWSxFQUFFLENBQUM7UUFFN0IsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQzFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7UUFFRCxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxNQUFNLENBQUMsTUFBYTtRQUNoQixJQUFJLEdBQUcsR0FBRyxJQUFJLDJCQUFZLEVBQUUsQ0FBQztRQUU3QixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDeEMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDaEcsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFFekUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUMzRCxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDakMsQ0FBQztZQUVELEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUM1RSxDQUFDO1FBRUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsT0FBTyxDQUFDLElBQXVCO1FBQzNCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsQ0FBQztJQUNMLENBQUM7SUFFRCxJQUFJLFVBQVU7UUFDVixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7QUFFTCxDQUFDO0FBalRZLGlCQUFTLFlBaVRyQixDQUFBO0FBRUQsZ0NBQXdDLEVBQWM7SUFDbEQsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztJQUV2QixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQzNCLE1BQU0sRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvQixDQUFDO0FBQ0wsQ0FBQztBQU5pQiw2QkFBcUIsd0JBTXRDLENBQUEiLCJmaWxlIjoibW9kZWwvdGV4dE1vZGVsLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
