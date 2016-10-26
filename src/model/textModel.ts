import {Deque} from "../util/queue"
import {StringBuffer} from "../util/StringBuffer"
import {LineModel} from "./LineModel"
import {EventEmitter} from "events"
import {Position} from "."

export enum TextChangedType {
    InsertText, DeleteText
}

export class TextChangedEvent extends Event {

    private _type : TextChangedType;
    private _begin_pos : Position;
    private _end_pos : Position;
    private _content : string;

    constructor(_type : TextChangedType, _begin_pos : Position, _end_pos : Position, content?: string) {
        super("textChanged");

        this._type = _type;

        if (this._type === TextChangedType.InsertText || this._type === TextChangedType.DeleteText) {
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

        var lines = this.toLines(_string);

        for (let i = 0; i < lines.length; i++) {
            var lm = new LineModel(lc, lines[i]);            
            this._lines[lc++] = lm;
        }

        this._lineCount = lc;

    }

    insertText(pos : Position, _content : string) {
        var lines = this.toLines(_content);
        
        if (lines.length > 0) {
            var firstLineStr = lines[0];

            var firstLineLm = this._lines[pos.line];
            firstLineLm.insert(pos.offset, firstLineStr);

            var extendLineCount = lines.length - 1;

            // make n lines forward
            for (let i = this.linesCount + extendLineCount; i > pos.line + extendLineCount; i++) {
                this._lines[i] = this._lines[i - extendLineCount];
                this._lines[i].number = i;
            }

            // fill the line
            for (let i = 1; i < lines.length; i++) {
                this._lines[pos.line + i] = new LineModel(pos.line + i, lines[i]);
            }

            this.emit("intertText", new TextChangedEvent(
                TextChangedType.InsertText, pos, null, _content));
        }
    }

    deleteText(_begin_pos : Position, _end_pos : Position) {
        if (_begin_pos.line === _end_pos.line) {
            this._lines[_begin_pos.line].delete(_begin_pos.offset, _end_pos.offset);
        } else if (_begin_pos.line > _end_pos.line) {
            this._lines[_begin_pos.line].deleteToEnd(_begin_pos.offset);

            var suffixStr = this._lines[_end_pos.line].text.slice(_end_pos.offset);

            var shrinkLinesCount = _end_pos.line - _begin_pos.line

            for (let i = _begin_pos.line + 1; i < this._lines.length - shrinkLinesCount; i++) {
                this._lines[i] = this._lines[i + shrinkLinesCount];
                this._lines[i].number = i;
            }

            this._lines.length -= shrinkLinesCount;
            this._lines[_begin_pos.line].append(suffixStr);

        } else {
            throw new Error("Illegal data.");
        }
    }
    
    getLineFromNum(_line_num : number) : LineModel {
        return this._lines[_line_num];
    }

    reportString(_begin_pos : Position, _end_pos : Position) : string {
        var buf = new StringBuffer();
        buf.push(this._lines[_begin_pos.line].text.slice(_begin_pos.offset, _end_pos.offset));

        for (let i = _begin_pos.line + 1; i < _end_pos.line - 1; i++) {
            buf.push(this._lines[i].text)
        }

        if (_end_pos.line > _begin_pos.line) {
            buf.push(this._lines[_end_pos.line].text.slice(0, _end_pos.offset));
        }

        return buf.getStr();
    }
    
    get linesCount() {
        return this._lineCount - 1;
    }

    private toLines(content : string) : string[] {

        var lines = new Array<string>();
        
        var buf = new StringBuffer();

        if (content.length == 0) {
            lines.push("");
        } else {
            for (let i = 0; i < content.length; ++i) {
                if (content[i] === '\n') {
                    if (content[i + 1] === '\r') {
                        ++i;
                    }
                    
                    lines.push(buf.getStr());
                    buf = new StringBuffer();
                } else if (content[i] === '\r') {
                    if (content[i + 1] == '\n') {
                        ++i;
                    }
                    lines.push(buf.getStr());
                    buf = new StringBuffer();
                } else {
                    buf.push(content.charAt(i))
                }
            }
            
            if (buf.length > 0) {
                lines.push(buf.getStr());
                buf = null;
            }
        }

        return lines;
    }
    
}

export function * TextModelLineIterator(tm : TextModel) : IterableIterator<LineModel> {
    var lm = tm.linesCount;
    
    for (let i = 1; i <= lm; ++i) {
        yield tm.getLineFromNum(i);
    }
}
