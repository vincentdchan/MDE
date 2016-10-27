
export class Node {

    protected _beginLine : number;
    protected _endLine : number;

    get beginLine() {
        return this._beginLine;
    }

    get endLine() {
        return this._beginLine;
    }
    
}

export class TextNode extends Node {

    private _children : Node[];

    constructor() {
        super();
        this._children = [];
    }

    get children() {
        return this._children;
    }

}

export class NormalTextNode extends Node {

    private _text : string;

    constructor(_text : string) {
        super();
        this._text = _text;
    }

    get text() {
        return this._text;
    }

}

export class BoldTextNode extends Node {

    private _text : string;

    constructor(_text : string) {
        super();
        this._text = _text;
    }

    get text() {
        return this._text;
    }

}

export class ItalicTextNode extends Node {

    private _text : string;

    constructor(_text : string) {
        super();
        this._text = _text;
    }

    get text() {
        return this._text;
    }

}

export class HeaderNode extends Node {

    private _level : number;
    private _content : string;

    constructor(_level : number, _content : string) {
        super();
        this._level = _level;
        this._content = _content;
    }

    get level() {
        return this._level;
    }

    get content() {
        return this._content;
    }

}

export class ListNode extends Node {

    private _isNumbered : boolean;
    private _children : Node[];

    get isNumbered() : boolean {
        return this._isNumbered;
    }

}

export class HtmlNode extends Node {

    private _content: string;

    constructor(_content : string) {
        super();
        this._content = _content;
    }

    get content() {
        return this._content;
    }
}
