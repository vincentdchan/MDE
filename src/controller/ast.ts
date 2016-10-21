
export class Node {
    
}

export class HeaderNode extends Node {
    private _level : number;    
    private _text : string;
    
    constructor(_level : number, _text : string) {
        super();
        this._level = _level | 1;
        this._text = _text;
    }
    
    set level(l : number) {
        this._level = l;
    }
    
    get level() {
        return this._level;
    }
    
    set text(t : string) {
        this._text = t;
    }
    
    get text() {
        return this._text;
    }

}

export class ParagraphNode extends Node {
    
    private _text : string;
    
    constructor(_text : string) {
        super()
        this._text = _text;
    }
    
    get text() {
        return this._text
    }
    
    set text(_text : string) {
        this._text = _text;
    }

}

export class OrderListNode extends Node {
    
    private _dict : Map<number, Node>;
    
    constructor() {
        super();
        this._dict = new Map<number, Node>();
    }

    setValue(_index : number, _node : Node) {
        this._dict[_index] = _node;
    }
    
    getValue(_index : number) : Node {
        return this._dict[_index];
    }
    
    get dict() {
        return this._dict;
    }

}

export class UnorderListNode extends Node {
    
    private _array : Node[];
    
    constructor() {
        super();
        this._array = new Array<Node>();
    }
    
    push(_node : Node) {
        this._array.push(_node);
    }
    
    setValue(_index : number, _node : Node) {
        if (_index >= this.length) {
            throw new Error("Input out of range");
        }
        
        this._array[_index] = _node;
    }
    
    getValue(_index : number) : Node {
        if (_index >= this.length) {
            throw new Error("Input out of range");
        }
        
        return this._array[_index];
    }
    
    get length() {
        return this._array.length;
    }
    
    get array() {
        return this._array;
    }

}

export class AnchorNode extends Node {
    
    private _text : string;
    private _link : string;
    
    constructor(_text: string, _link : string) {
        super();
        this._text = _text;
        this._link = _link;
    }
    
    get text() {
        return this._text;
    }
    
    set text(_text : string) {
        this._text = _text;
    }
    
    get link() {
        return this._link;
    }
    
    set link(_link : string) {
        this._link = _link;
    }

}

export class BlockQuoteNode extends Node{
    
    private _text : string;
    
    constructor(_text : string) {
        super();
        this._text = _text;
    }
    
    get text() {
        return this._text;
    }
    
    set text(_text : string) {
        this._text = _text;
    }
    
}

export class RawNode extends Node {
    
    private _text : string;
    
    constructor(_text : string) {
        super();
        this._text = _text;
    }
    
    get text() {
        return this._text;
    }
    
    set text(_text : string) {
        this._text = _text;
    }

}

export class HTMLElementNode extends Node {
    
    private _text : string;
    
    constructor(_text : string) {
        super();
        this._text = _text;
    }
    
    get text() {
        return this._text;
    }
    
    set text(_text : string) {
        this._text = _text;
    }

}
