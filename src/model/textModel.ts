import {Deque} from "../util/queue"
import {StringBuffer} from "../util/StringBuffer"
import {parseTextToLines} from "../util/text"
import {LineModel} from "./LineModel"
import {EventEmitter} from "events"
import {Position, Range, isPosition, isRange} from "."

export interface ITextDocument {
    reportAll(): string;
    report(range: Range): string;
}

export class TextModel implements ITextDocument {

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
    
    /*
    setFromRawText(_string : string) {

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
    */

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
            throw new Error("index out of range");
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

    insertText(pos : Position, _content : string) {
        var lines = parseTextToLines(_content);

        if (pos.line <= 0 || pos.line > this.linesCount)
            throw new Error("data illegal when inserting text to TextModel");
        if (lines.length > 0) {
            var firstLineStr = lines[0];

            var firstLineLm = this._lines[pos.line];
            firstLineLm.insert(pos.offset, firstLineStr);

            var extendLineCount = lines.length - 1;

            // make n lines forward
            if (extendLineCount > 0) {
                for (let i = this.linesCount + extendLineCount; i > pos.line + extendLineCount; i--) {
                    this._lines[i] = this._lines[i - extendLineCount];
                    this._lines[i].number = i;
                }
            }

            // fill the line
            for (let i = 1; i < lines.length; i++) {
                this._lines[pos.line + i] = new LineModel(pos.line + i, lines[i]);
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
