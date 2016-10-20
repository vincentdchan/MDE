import {Deque} from "../util/queue"
import {StringBuffer} from "../util/StringBuffer"
import {LineModel} from "./LineModel"

export class TextModel {

    protected _lines : LineModel[];
    
    setFromRawText(_string : string) {
        console.log("set");
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
            this._lines.push(li);
            buf = null;
        }        
    }

    insertText(_line : number, _offset : number, _content : string) {
        let line = this._lines[_line - 1];
        line.insert(_offset, _content);
    }

    deleteText(_line : number, _begin : number, _end : number) {
        let line = this._lines[_line - 1];
        line.delete(_begin, _end);
    }

    // insert after index
    insertLine(_index : number) {
        let real_index = _index - 1;
        let old_length = this.linesCount;

        for (let i = old_length; i > real_index; ++i) {
            this._lines[i] = this._lines[i - 1];
            this._lines[i].number = i + 1;
        }

        this._lines[real_index] = new LineModel(_index, "");
    }

    deleteLine(_index : number) {
        var real_index = _index - 1;
        let old_length = this.linesCount;

        for (let i = real_index; i < old_length - 1; ++i) {
            this._lines[i] = this._lines[i + 1];
            this._lines[i].number = i + 1;
        }

        this._lines.pop();
    }
    
    setLineValue(_line_num : number, lm : LineModel) {
        this._lines[_line_num - 1] = lm;
    }
    
    getLineFromNum(_line_num : number) : LineModel {
        return this._lines[_line_num - 1];
    }
    
    /*
    get lines() {
        return this._lines;
    }
    */
    
    get linesCount() {
        return this._lines.length;
    }
    
}

export function * TextModelLineIterator(tm : TextModel) : IterableIterator<LineModel> {
    var lm = tm.linesCount;
    
    for (let i = 1; i <= lm; ++i) {
        yield tm.getLineFromNum(i);
    }
}
