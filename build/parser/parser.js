"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        this._prefixArray = [];
        this._parseState = {
            pos: {
                line: 1, offset: 0
            },
            finished: false,
        };
    }
    nextState() {
        if (this._parseState.pos.offset === this._model.lineAt(this._parseState.pos.line).length - 1) {
            if (this._parseState.pos.line === this._model.linesCount) {
                this._parseState.finished = true;
            }
            else {
                this._parseState.pos.line++;
                this._parseState.pos.offset = 0;
            }
        }
        else {
            this._parseState.pos.offset++;
        }
    }
    isFinished() {
        return this._parseState.finished;
    }
    match(char) {
        return this._lookahead == char;
    }
    lookahead() {
        return this._lookahead;
    }
    nextChar() {
        var _tmp = this._lookahead;
        if (this._parseState.finished)
            throw new Error("end of fine");
        this.nextState();
        this._lookahead = this._model.charAt(this._parseState.pos);
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
            case '-':
                return this.parseUnorderList();
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                return this.parseOrderList();
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
        var _node = new node.TextNode();
        var buf = new stringBuffer_1.StringBuffer();
        while (!this.match('\n')) {
            buf.push(this.nextChar());
        }
        _node.children.push(new node.NormalTextNode(buf.getStr()));
        return _node;
    }
    parseOrderList() {
        let _node = new node.ListNode();
        return _node;
    }
    parseUnorderList() {
        let _node = new node.ListNode();
        return _node;
    }
    parseAnchor() {
    }
    parseBlockQuote() {
    }
    parseHTMLElement() {
    }
}
exports.Parser = Parser;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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SUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDOUIsQ0FBQztRQUVELEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzNELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVPLGNBQWM7UUFDbEIsSUFBSSxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEMsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRU8sZ0JBQWdCO1FBQ3BCLElBQUksS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVPLFdBQVc7SUFFbkIsQ0FBQztJQUVPLGVBQWU7SUFFdkIsQ0FBQztJQUVPLGdCQUFnQjtJQUV4QixDQUFDO0NBRUo7QUF6S0Qsd0JBeUtDIiwiZmlsZSI6InBhcnNlci9wYXJzZXIuanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
