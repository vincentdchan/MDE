import {EventEmitter} from "events"

export enum LineChangedType {
    Insert, Delete
}

export class LineChangedEvent extends Event {

    private _lineNumber : number;
    private _startOffset : number;
    private _endOffset : number;
    private _data : string;
    private _type : LineChangedType;

    constructor(_type : LineChangedType, _lineNumber : number, _start : number, _end: number, _data? : string) {
        super("lineChanged");

        this._type = _type;
        this._lineNumber = _lineNumber;
        this._startOffset = _start;
        this._endOffset = _end;
        if (_data) {
            this._data = _data;
        }
    }

    get changedType() {
        return this._type;
    }

    get lineNumber() {
        return this._lineNumber;
    }

    get startOffet() {
        return this._startOffset;
    }

    get endOffset() {
        return this._endOffset;
    }

    get data() {
        return this._data;
    }

}

export class LineModel extends EventEmitter {

    protected _number : number;
    protected _text : string;

    constructor(_num : number, _t : string) {
        super();
        this._number = _num | 0;
        this._text = _t;
    }

    charAt(offset : number) : string {
        return this._text.charAt(offset);
    }

    insert(index : number, content : string) {
        if (index < 0 || index >= this._text.length)
            throw new Error("Illegal input data when inserting text to LineModel");
        let before = this._text.slice(0, index);
        let after = this._text.slice(index);

        this._text = before + content + after;

        this.emit("insert", new LineChangedEvent(LineChangedType.Insert, this._number, 
            index, index + content.length, content))
    }

    append(content : string) {
        this._text = this._text + content;
    }

    delete(begin : number, end : number) {
        let before = this._text.slice(0, begin);
        let deleted = this._text.slice(begin, end);
        let after = this._text.slice(end);

        this._text = before + after;

        this.emit("delete", new LineChangedEvent(LineChangedType.Delete, this._number, 
            begin, end, deleted));
    }

    deleteToEnd(offset : number) {
        this._text = this._text.slice(0, offset);
    }

    report() {
        return this._text + "\n";
    }
    
    get text() {
        return this._text;
    }
    
    set text(_t : string) {
        this._text = _t
    }

    get number() {
        return this._number;
    }

    set number(num : number) {
        this._number = num;
    }
    
    get length() {
        return this._text.length;
    }

}
