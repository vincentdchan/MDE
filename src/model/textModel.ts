import {Deque} from "../util/queue"
import {StringBuffer} from "../util/StringBuffer"

export class LineModel {

    protected _number : number;
    protected _text : string;
    
    constructor(_num : number, _t : string) {
        this._number = _num | 0;
        this._text = _t;
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

export class TextModel {

    protected _lines : LineModel[];
    
    setFromRawText(_string : string) {
        this._lines = new Array<LineModel>();
        
        let lc = 1;
        
        var buf = new StringBuffer();

        for (let i = 0; i < _string.length; ++i) {
            if (_string[i] === '\n') {
                if (_string[i + 1] === '\r') {
                    ++i;
                }
                var li = new LineModel(lc++, buf.getStr())
                this._lines.push(li);
                buf = new StringBuffer();
            } else if (_string[i] === '\r') {
                if (_string[i + 1] == '\n') {
                    ++i;
                }
                var li = new LineModel(lc++, buf.getStr())
                this._lines.push(li);
                buf = new StringBuffer();
            } else {
                buf.push(_string.charAt(i))
            }
        }
        
        if (buf.length > 0) {
            var li = new LineModel(lc++, buf.getStr());
            this.lines.push(li);
            buf = null;
        }        
    }
    
    setLineValue(_line_num : number, lm : LineModel) {
        this._lines[_line_num - 1] = lm;
    }
    
    getLineFromNum(_line_num : number) : LineModel {
        return this._lines[_line_num - 1];
    }
    
    get lines() {
        return this._lines;
    }
    
    get linesCount() {
        return this.lines.length;
    }
    
}

export function * TextModelLineIterator(tm : TextModel) : IterableIterator<LineModel> {
    var lm = tm.linesCount;
    
    for (let i = 1; i <= lm; ++i) {
        yield tm.getLineFromNum(i);
    }
}

//
// https://en.wikipedia.org/wiki/Rope_(data_structure)
//