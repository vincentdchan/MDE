import {Deque} from "../util/queue"
import {StringBuffer} from "../util/stringBuffer"
import {parseTextToLines} from "../util/text"
import {LineModel} from "./lineModel"
import {EventEmitter} from "events"
import {Position, PositionUtil, Range, isPosition, isRange, TextEdit, TextEditType, TextEditApplier} from "."
import {hd, tl, last} from "../util/fn"

/**
 * Check if a string is ended with a lineBreaker.
 */
function isEndOfLineBreaker(str: string) : boolean {
    return str[str.length - 1] == "\n";
}

export interface ITextDocument {
    reportAll(): string;
    report(range: Range): string;
}

export class TextEditEvent {

    private _textEdit : TextEdit;

    constructor(textEdit: TextEdit) {
        this._textEdit = textEdit;
    }

    get textEdit() {
        return this._textEdit;
    }

}

/**
 * TextModel use chain of lines to store the data.
 * A `TextEditEvent` will be triggered after applying a `TextEdit`
 */
export class TextModel extends EventEmitter implements TextEditApplier, ITextDocument {

    protected _lines : LineModel[];

    constructor(_string: string) {
        super();

        this._lines = new Array<LineModel>();
        
        let lc = 1;
        
        var buf = new StringBuffer();

        var lines = parseTextToLines(_string);

        this._lines.length = lc;
        for (let i = 0; i < lines.length; i++) {
            var lm = new LineModel(lc, lines[i]);            
            this._lines[lc++] = lm;
        }

    }

    positionAt(offset: number): Position {
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
        }
    }

    offsetAt(pos: Position): number {
        if (pos.line === 1 && this.linesCount >= 1) {
            if (pos.offset < this._lines[1].length)
                return pos.offset;
        } else if (pos.line > 1 && pos.line <= this.linesCount 
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

    lineAt(num: number): LineModel {
        if (num <= 0 || num > this.linesCount)
            throw new Error("<Index out of range> line:" + num + " LinesCount:" + this.linesCount);
        return this._lines[num];
    }

    get firstLine(): LineModel {
        if (this._lines.length === 0)
            throw new Error("No lines found.");
        return this._lines[0];
    }

    get lastLine(): LineModel {
        if (this._lines.length === 0)
            throw new Error("No lines found.");
        return this._lines[this._lines.length - 1];
    }

    /**
     * All the change applying to the textmodel can be redo
     * @returns when the `reverse` textedit is applying again to the 
     *          textmodel, the textmodel will be recovered to the previous state.
     *          The `pos` represent the position after the edit
     */
    applyCancellableTextEdit(textEdit: TextEdit) : {reverse: TextEdit, pos: Position} {
        let _pos: Position;
        let _reverse: TextEdit;
        switch(textEdit.type) {
            case TextEditType.InsertText:
            {
                if (textEdit.lines.length === 1) {
                    _reverse = new TextEdit(TextEditType.DeleteText, {
                        begin: PositionUtil.clonePosition(textEdit.position),
                        end: {
                            line: textEdit.position.line,
                            offset: textEdit.position.offset + textEdit.lines[0].length
                        }
                    });
                } else {
                    _reverse = new TextEdit(TextEditType.DeleteText, {
                        begin: PositionUtil.clonePosition(textEdit.position),
                        end: {
                            line: textEdit.position.line + textEdit.lines.length - 1,
                            offset: last(textEdit.lines).length,
                        }
                    });
                }
                _pos = this.insertText(textEdit);
                break;
            }
            case TextEditType.DeleteText:
            {
                let lostPart = this.report(textEdit.range);
                _reverse = new TextEdit(TextEditType.InsertText, 
                PositionUtil.clonePosition(textEdit.range.begin), lostPart);
                _pos = this.deleteText(textEdit);
                break;
            }
            case TextEditType.ReplaceText:
            {
                let lostPart = this.report(textEdit.range),
                    beginPos = PositionUtil.clonePosition(textEdit.range.begin),
                    replacedPos = this.replaceText(textEdit);
                _reverse = new TextEdit(TextEditType.ReplaceText, {
                    begin: beginPos,
                    end: replacedPos,
                }, lostPart);
                _pos = replacedPos;
                break;
            }
        }

        let evt = new TextEditEvent(textEdit);
        this.emit("textEdit", evt);
        return {
            reverse: _reverse,
            pos: _pos,
        };
    }

    applyTextEdit(textEdit: TextEdit): Position {

        let pos: Position;
        switch(textEdit.type) {
            case TextEditType.InsertText:
                pos = this.insertText(textEdit);
                break;
            case TextEditType.DeleteText:
                pos = this.deleteText(textEdit);
                break;
            case TextEditType.ReplaceText:
                pos = this.replaceText(textEdit);
                break;
        }

        if (!pos) throw new Error("Unknown textEdit error.");

        let evt = new TextEditEvent(textEdit);
        this.emit("textEdit", evt);
        return pos;
    }

    /**
     * Insert text into TextModel,
     * whatever the type of TextModel.
     * @returns the position after the insert.
     */
    private insertText(textEdit: TextEdit) : Position {
        let pos: Position;
        if (textEdit.position)
            pos = textEdit.position;
        else
            pos = textEdit.range.begin;
        if (textEdit.text.length === 0) {
            return PositionUtil.clonePosition(pos);
        }

        let lines = textEdit.lines;

        if (pos.line <= 0 || pos.line > this.linesCount)
            throw new Error("data illegal when inserting text to TextModel. Line: #" + pos.line);

        let linesHead = hd(lines);
        let linesTail = tl(lines);

        if (linesTail.length === 0) { // it also means that this line will not endswith '\n'

            this._lines[pos.line].insert(pos.offset, linesHead);

            return {
                line: pos.line,
                offset: pos.offset + linesHead.length,
            }

        } else {

            let prefix = this._lines[pos.line].text.slice(0, pos.offset);
            let postfix = this._lines[pos.line].text.slice(pos.offset);

            this._lines[pos.line] = new LineModel(pos.line, prefix + linesHead);

            // if this line is the last line of document
            if (pos.line === this.linesCount) {
                let linesCount = this.linesCount + 1;
                let lineModels: LineModel[] = [];
                linesTail.forEach((lineStr: string) => {
                    lineModels.push(new LineModel(linesCount++, lineStr));
                });

                this._lines = this._lines.concat(lineModels);

                // insert postfix at the last line
                let lastLineModel = this._lines[linesCount - 1];
                lastLineModel.insert(lastLineModel.length, postfix);
            } else {
                let suffixLines = this._lines.slice(0, pos.line + 1);
                let postfixLines = this._lines.slice(pos.line + 1);

                let lineModels: LineModel[] = [];
                let lineCounter = pos.line + 1;
                linesTail.forEach((lineStr: string) => {
                    lineModels.push(new LineModel(lineCounter++, lineStr));
                })

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
            }
        }
    }

    private deleteText(textEdit: TextEdit): Position {
        let _range = textEdit.range;

        if (_range.begin.line === _range.end.line) {
            this._lines[_range.begin.line].delete(_range.begin.offset, _range.end.offset);

            return PositionUtil.clonePosition(_range.begin);
        } else if (_range.begin.line < _range.end.line) {
            let remain = this._lines[_range.end.line].text.slice(_range.end.offset);

            let oldLineModel = this._lines[_range.begin.line];
            this._lines[_range.begin.line] = new LineModel(_range.begin.line,
                oldLineModel.text.slice(0, _range.begin.offset) + remain);

            oldLineModel = null;

            let suffix = this._lines.slice(0, _range.begin.line + 1);
            let postffix = this._lines.slice(_range.end.line + 1);

            this._lines = suffix.concat(postffix);

            return PositionUtil.clonePosition(_range.begin);
        } 
        throw new Error("Illegal data.");
    }

    private replaceText(textEdit: TextEdit) {
        let _range = textEdit.range,
            _text = textEdit.text;
        if (_range.end.line > _range.begin.line || 
            (_range.end.line === _range.begin.line && _range.end.offset >= _range.begin.offset)) {

            this.deleteText(textEdit);

            return this.insertText(textEdit);
        } else {
            throw new Error("Range is illegal.");
        }
    }
    
    getLineFromNum(_line_num : number) : LineModel {
        return this._lines[_line_num];
    }

    charAt(pos : Position) : string {
        return this._lines[pos.line].charAt(pos.offset);
    }

    reportAll() {
        var buf = new StringBuffer();

        for (let i = 1; i < this._lines.length; i++) {
            buf.push(this._lines[i].report());
        }

        return buf.getStr();
    }

    report(_range: Range) : string {
        var buf = new StringBuffer();

        if (_range.begin.line === _range.end.line) {
            buf.push(this._lines[_range.begin.line].text.slice(_range.begin.offset, _range.end.offset));
        } else {
            buf.push(this._lines[_range.begin.line].text.slice(_range.begin.offset));

            for (let i = _range.begin.line + 1; i < _range.end.line; i++) {
                buf.push(this._lines[i].text)
            }

            buf.push(this._lines[_range.end.line].text.slice(0, _range.end.offset));
        }

        return buf.getStr();
    }

    forEach(_fun: (LineModel)=>void) {
        for (let i = 1; i <= this.linesCount; i++) {
            _fun(this._lines[i]);
        }
    }
    
    get linesCount() {
        return this._lines.length - 1;
    }
    
}

export function * TextModelLineIterator(tm : TextModel) : IterableIterator<LineModel> {
    var lm = tm.linesCount;
    
    for (let i = 1; i <= lm; ++i) {
        yield tm.getLineFromNum(i);
    }
}
