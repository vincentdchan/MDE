"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Node {
    get beginLine() {
        return this._beginLine;
    }
    get endLine() {
        return this._beginLine;
    }
}
exports.Node = Node;
class TextNode extends Node {
    constructor() {
        super();
        this._children = [];
    }
    get children() {
        return this._children;
    }
}
exports.TextNode = TextNode;
class NormalTextNode extends Node {
    constructor(_text) {
        super();
        this._text = _text;
    }
    get text() {
        return this._text;
    }
}
exports.NormalTextNode = NormalTextNode;
class BoldTextNode extends Node {
    constructor(_text) {
        super();
        this._text = _text;
    }
    get text() {
        return this._text;
    }
}
exports.BoldTextNode = BoldTextNode;
class ItalicTextNode extends Node {
    constructor(_text) {
        super();
        this._text = _text;
    }
    get text() {
        return this._text;
    }
}
exports.ItalicTextNode = ItalicTextNode;
class HeaderNode extends Node {
    constructor(_level, _content) {
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
exports.HeaderNode = HeaderNode;
class ListNode extends Node {
    get isNumbered() {
        return this._isNumbered;
    }
}
exports.ListNode = ListNode;
class HtmlNode extends Node {
    constructor(_content) {
        super();
        this._content = _content;
    }
    get content() {
        return this._content;
    }
}
exports.HtmlNode = HtmlNode;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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
