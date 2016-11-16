import {Deque} from "../util/queue"
import {StringBuffer} from "../util/StringBuffer"
import {parseTextToLines} from "../util/text"
import {LineModel} from "./LineModel"
import {EventEmitter} from "events"
import {Position, Range, isPosition, isRange, TextEdit, TextEditType, TextEditApplier} from "."
import {hd, tl, last} from "../util/fn"


function isEndOfLineBreaker(str: string) : boolean {
    return str[str.length - 1] == "\n";
}

export interface ITextDocument {
    reportAll(): string;
    report(range: Range): string;
}

export class TextModel implements TextEditApplier, ITextDocument {

    protected _lines : LineModel[];

    constructor(_string: string) {

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

    applyTextEdit(textEdit: TextEdit) {

        switch(textEdit.type) {
            case TextEditType.InsertText:
                this.insertText(textEdit.position, textEdit.text);
                break;
            case TextEditType.DeleteText:
                this.deleteText(textEdit.range);
                break;
        }

    }

    insertText(pos : Position, _content : string) {
        if (_content.length === 0) return;

        let lines = parseTextToLines(_content);

        if (pos.line <= 0 || pos.line > this.linesCount)
            throw new Error("data illegal when inserting text to TextModel");

        let linesHead = hd(lines);
        let linesTail = tl(lines);

        if (linesTail.length === 0) { // it also means that this line will not endswith '\n'

            this._lines[pos.line].insert(pos.offset, linesHead);

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

        }

    }

    deleteText(_range: Range) {
        if (_range.begin.line === _range.end.line) {
            this._lines[_range.begin.line].delete(_range.begin.offset, _range.end.offset);
        } else if (_range.begin.line < _range.end.line) {
            this._lines[_range.begin.line].deleteToEnd(_range.begin.offset);

            var suffixStr = this._lines[_range.end.line].text.slice(_range.end.offset);

            var shrinkLinesCount = _range.end.line - _range.begin.line

            for (let i = _range.begin.line + 1; i < this._lines.length - shrinkLinesCount; i++) {
                this._lines[i] = this._lines[i + shrinkLinesCount];
                this._lines[i].number = i;
            }

            this._lines.length -= shrinkLinesCount;
            this._lines[_range.begin.line].append(suffixStr);

        } else {
            throw new Error("Illegal data.");
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
        buf.push(this._lines[_range.begin.line].text.slice(_range.begin.offset, _range.end.offset));

        for (let i = _range.begin.line + 1; i < _range.end.line - 1; i++) {
            buf.push(this._lines[i].text)
        }

        if (_range.end.line > _range.begin.line) {
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
