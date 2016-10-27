"use strict";
const node = require("./ast");
const stringBuffer_1 = require("../util/stringBuffer");
const EOF = '\0';
class Parser {
    constructor(_model) {
        this._continue = true;
        this._model = _model;
        this._indentStack = new Array();
        this._nodes = new Array();
        this._errors = new Array();
        this._lookahead_position = { line: 1, offset: 0 };
        this._lookahead = this._model.charAt(this._lookahead_position);
        this._prefixArray = [];
    }
    match(char) {
        return this._lookahead == char;
    }
    lookahead() {
        return this._lookahead;
    }
    nextChar() {
        var _tmp = this._lookahead;
        if (_tmp === '\n') {
            if (this._lookahead_position.line === this._model.linesCount) {
                this._lookahead = EOF;
            }
            else {
                this._lookahead_position = {
                    line: this._lookahead_position.line + 1,
                    offset: 0
                };
                this._lookahead = this._model.charAt(this._lookahead_position);
            }
        }
        else {
            this._lookahead_position = {
                line: this._lookahead_position.line,
                offset: this._lookahead_position.offset + 1
            };
            this._lookahead = this._model.charAt(this._lookahead_position);
        }
        return _tmp;
    }
    reportError(e, _continue) {
        this._errors.push(e);
        this._continue = _continue;
    }
    beginParsing() {
        var lineList = [];
        while (this.lookahead() !== EOF) {
            lineList.push(this.parseLine());
        }
    }
    eatingSpace() {
        var buf = new stringBuffer_1.StringBuffer();
        while (this.match(' ') || this.match('\t')) {
            buf.push(this.nextChar());
        }
        return buf.getStr();
    }
    parseLine() {
        var prefix = this.eatingSpace();
        this._prefixArray.push(prefix);
        switch (this.lookahead()) {
            case '#':
                return this.parseHeader();
            default:
                this.reportError(new Error("Unexpected token."), true);
        }
    }
    parseHeader() {
        var levelCount = 0;
        var buf = new stringBuffer_1.StringBuffer();
        if (!this.match('#'))
            this.reportError(new Error("header must begin with \"#\""), true);
        while (this.match('#')) {
            this.nextChar();
            levelCount++;
        }
        while (!this.match('#') && !this.match('\n')) {
            buf.push(this.nextChar());
        }
        while (this.match('#'))
            this.nextChar();
        return new node.HeaderNode(levelCount, buf.getStr());
    }
    parseText() {
        var node = new node.TextNode();
        var buf = new stringBuffer_1.StringBuffer();
        while (!this.match('\n')) {
            buf.push(this.nextChar());
        }
        node.children.push(new node.NormalTextNode(buf.getStr()));
        return node;
    }
    parseOrderList() {
    }
    parseUnorderList() {
    }
    parseAnchor() {
    }
    parseBlockQuote() {
    }
    parseHTMLElement() {
    }
}
exports.Parser = Parser;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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
