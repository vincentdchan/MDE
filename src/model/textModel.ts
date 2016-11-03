import {Deque} from "../util/queue"
import {StringBuffer} from "../util/StringBuffer"
import {parseTextToLines} from "../util/text"
import {LineModel} from "./LineModel"
import {EventEmitter} from "events"
import {Position, Range, isPosition, isRange} from "."

export enum TextEditType {
    InsertText, DeleteText
}

export class TextEdit {

    private _type : TextEditType
    private _range : Range
    private _position : Position;
    private _text: string;
    private _lines: string[]

    constructor(_type: TextEditType, _rp: Range | Position, _text?: string) {
        this._type = _type;
        if (_text === undefined)
            this._text = null;
        else
        {
            this._text = _text;
            this._lines = parseTextToLines(_text);
        }

        if (_type == TextEditType.InsertText && isPosition(_rp)) {
            this._position = _rp;
        }
        else if (_type == TextEditType.DeleteText && isRange(_rp)) {
            this._range = _rp;
        } else
            throw new Error("Error data input");
    }

    get type() {
        return this._type;
    }

    get range() {
        return this._range;
    }

    get position() {
        return this._position
    }

    get text() {
        return this._text;
    }

    get lines() {
        return this._lines;
    }

}

export class TextChangedEvent extends Event {

    private _type : TextEditType;
    private _begin_pos : Position;
    private _end_pos : Position;
    private _content : string;

    constructor(_type : TextEditType, _begin_pos : Position, _end_pos : Position, content?: string) {
        super("textChanged");

        this._type = _type;

        if (this._type === TextEditType.InsertText || this._type === TextEditType.DeleteText) {
            this._begin_pos = _begin_pos;
            this._end_pos = _end_pos;
            this._content = content;
        } else {
            this._begin_pos = _begin_pos;
            this._end_pos = _end_pos;
        }
    }

    get beginPosition() {
        return this._begin_pos;
    }

    get endPostition() {
        return this._end_pos;
    }

    get content() {
        return this._content;
    }

    get changedType() {
        return this._type;
    }

}

export class TextModel extends EventEmitter {

    protected _lines : LineModel[];
    protected _lineCount : number;

    constructor() {
        super();
    }
    
    setFromRawText(_string : string) {

        this._lines = new Array<LineModel>();
        
        let lc = 1;
        
        var buf = new StringBuffer();

        var lines = parseTextToLines(_string);

        for (let i = 0; i < lines.length; i++) {
            var lm = new LineModel(lc, lines[i]);            
            this._lines[lc++] = lm;
        }

        this._lineCount = lc;

    }

    lineAt(num: number): LineModel {
        return this._lines[num];
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

            this.emit("intertText", new TextChangedEvent(
                TextEditType.InsertText, pos, null, _content));
        }
    }

    deleteText(_range: Range) {
        if (_range.begin.line === _range.end.line) {
            this._lines[_range.begin.line].delete(_range.begin.offset, _range.end.offset);
        } else if (_range.begin.line > _range.end.line) {
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
    
    get linesCount() {
        return this._lineCount - 1;
    }
    
}

export function * TextModelLineIterator(tm : TextModel) : IterableIterator<LineModel> {
    var lm = tm.linesCount;
    
    for (let i = 1; i <= lm; ++i) {
        yield tm.getLineFromNum(i);
    }
}
