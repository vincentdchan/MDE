"use strict";
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
