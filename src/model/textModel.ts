import {Deque} from "../util/queue"
import {StringBuffer} from "../util/StringBuffer"
import {LineModel} from "./LineModel"
import {EventEmitter} from "events"

export enum TextChangedType {
    InsertText, DeleteText, InsertLine, DeleteLine
}

export class TextChangedEvent extends Event {

    private _lineNumber : number = 0;
    private _count : number = 0;
    private _startOffset : number = 0;
    private _endOffset : number = 0;
    private _type : TextChangedType;

    constructor(_type : TextChangedType, _number : number, _start : number, _end? : number) {
        super("textChanged");

        this._type = _type;

        if (this._type === TextChangedType.InsertText || this._type === TextChangedType.DeleteText) {
            this._lineNumber;
            this._startOffset = _start;
            this._endOffset = _end;
        } else {
            this._lineNumber = _number;
            this._count = _start;
        }
    }

    get lineNumber() {
        return this._lineNumber;
    }

    get count() {
        return this._count;
    }

    get startOffset() {
        return this._startOffset;
    }

    get endOffset() {
        return this._endOffset;
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

        for (let i = 0; i < _string.length; ++i) {
            if (_string[i] === '\n') {
                if (_string[i + 1] === '\r') {
                    ++i;
                }
                var li = new LineModel(lc, buf.getStr())
                this._lines[lc++] = li;
                buf = new StringBuffer();
            } else if (_string[i] === '\r') {
                if (_string[i + 1] == '\n') {
                    ++i;
                }
                var li = new LineModel(lc, buf.getStr())
                this._lines[lc++] = li
                buf = new StringBuffer();
            } else {
                buf.push(_string.charAt(i))
            }
        }
        
        if (buf.length > 0) {
            var li = new LineModel(lc++, buf.getStr());
            this._lines.push(li);
            buf = null;
        }        

        this._lineCount = lc;
    }

    insertText(_line : number, _offset : number, _content : string) {
        this._lines[_line].insert(_offset, _content);
        this.emit("insertText", new TextChangedEvent(
            TextChangedType.InsertText, _line, _offset, _offset + _content.length
        ));
    }

    deleteText(_line : number, _begin : number, _end : number) {
        this._lines[_line].delete(_begin, _end);
        this.emit("deleteText", new TextChangedEvent(
            TextChangedType.DeleteText, _line, _begin, _end
        ));
    }

    // insert after index
    insertLine(_index : number, _num? : number) {
        let old_length = this.linesCount;
        let _count = _num | 1; 

        for (let i = old_length + _count; i > _index; ++i) {
            this._lines[i] = this._lines[i - _count];
            this._lines[i].number = i + _count;
        }

        this._lineCount += _count;

        for (let i=0; i < _count; i++) {
            this._lines[_index + i] = new LineModel(_index, "");
        }

        this.emit("insertLine", new TextChangedEvent(TextChangedType.InsertLine, _index, _count));
    }

    deleteLine(_index : number, _num? : number) {
        let old_length = this.linesCount;
        let count = _num | 1;

        for (let i = _index; i < old_length - count; ++i) {
            this._lines[i] = this._lines[i + count];
            this._lines[i].number = i;
        }

        this._lineCount -= count;
        this._lines.pop();

        this.emit("deleteLine", new TextChangedEvent(TextChangedType.DeleteLine, _index, count));
    }
    
    setLineValue(_line_num : number, lm : LineModel) {
        this._lines[_line_num] = lm;
    }
    
    getLineFromNum(_line_num : number) : LineModel {
        return this._lines[_line_num];
    }
    
    get linesCount() {
        return this._lineCount;
    }
    
}

export function * TextModelLineIterator(tm : TextModel) : IterableIterator<LineModel> {
    var lm = tm.linesCount;
    
    for (let i = 1; i <= lm; ++i) {
        yield tm.getLineFromNum(i);
    }
}
