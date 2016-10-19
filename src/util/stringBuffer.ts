
export class StringBuffer {
    
    private _buf : string[];
    
    get buffer() : string[] {
        return this._buf
    }
    
    constructor() {
        this._buf = new Array<string>();
    }
    
    push(s : string) {
        this._buf.push(s);
    }
    
    getStr() {
        return this._buf.join("");
    }
    
    get length() {
        return this._buf.length;
    }

}
