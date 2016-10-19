"use strict";
const node = require("./ast");
const stringBuffer_1 = require("../util/stringBuffer");
class Parser {
    constructor(_content) {
        this._content = _content;
        this._indentStack = new Array();
    }
    beginParsing() {
    }
    get root() {
        return this._root;
    }
    eatSpaces() {
        while (this._content[this._index] === ' ') {
            this._index++;
        }
    }
    nextLine() {
        while (this._content[this._index] !== '\n') {
            this._index++;
        }
        this._index++;
    }
    parseLine() {
    }
    parseHeader() {
        let counter = 0;
        while (this._content[this._index] === '#') {
            counter++;
        }
        this.eatSpaces();
        let strbuf = new stringBuffer_1.StringBuffer();
        while (this._content[this._index] !== '#' &&
            this._content[this._index] !== '\n') {
            strbuf.push(this._content[this._index]);
        }
        let _node = new node.HeaderNode(counter, strbuf.getStr());
        this.nextLine();
    }
    parseParagraph() {
        let prefixStack = new Array();
        while (this._content[this._index] === '\t' ||
            this._content[this._index] === ' ') {
        }
    }
    parseOrderList() {
    }
    parseUnorderList() {
    }
    parseAnchor() {
    }
    parseBlockQuote() {
    }
    parseRaw() {
    }
    parseHTMLElement() {
    }
}
exports.Parser = Parser;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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
