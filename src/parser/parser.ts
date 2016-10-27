import * as node from "./ast"
import {StringBuffer} from "../util/stringBuffer"
import {TextModel} from "../model/textModel"
import {LineModel} from "../model/lineModel"
import {Position} from "../model"

const EOF = '\0';

export class Parser {
    
    private _root: node.Node;
    private _model : TextModel;
    private _indentStack : string[];
    
    private _index : number;
    private _nodes : node.Node[];

    private _errors : Error[];
    private _continue : boolean = true;

    private _prefixArray : string[];
    private _lookahead_line : LineModel;
    private _lookahead_position : Position;
    private _lookahead : string;
    
    constructor(_model : TextModel) {
        this._model = _model;
        
        this._indentStack = new Array<string>();
        this._nodes = new Array<node.Node>();

        this._errors = new Array<Error>();

        this._lookahead_position = {line:1, offset:0};
        this._lookahead = this._model.charAt(this._lookahead_position);
        this._prefixArray = [];

    }
    
    match(char : string) : boolean {
        return this._lookahead == char;
    }

    lookahead() : string {
        return this._lookahead;
    }

    nextChar() : string {
        var _tmp = this._lookahead
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
        } else {
            this._lookahead_position = {
                line : this._lookahead_position.line,
                offset : this._lookahead_position.offset + 1
            }
            this._lookahead = this._model.charAt(this._lookahead_position);
        }
        return _tmp;
    }

    private reportError(e : Error, _continue : boolean) {
        this._errors.push(e);
        this._continue = _continue;
    }

    beginParsing() {
        var lineList : node.Node[] = [];
        while (this.lookahead() !== EOF) {
            lineList.push(this.parseLine());
        }
    }

    private eatingSpace() : string {
        var buf = new StringBuffer();
        while (this.match(' ') || this.match('\t')) {
            buf.push(this.nextChar());
        }
        return buf.getStr();
    }

    private parseLine() : node.Node {
        var prefix = this.eatingSpace();
        this._prefixArray.push(prefix);
        switch(this.lookahead()) {
            case '#':
                return this.parseHeader();
            default:
                this.reportError(new Error("Unexpected token."), true);
        }
    }
    
    private parseHeader() : node.HeaderNode {
        var levelCount = 0;
        var buf = new StringBuffer();
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

    private parseText() : node.TextNode {
        var node = new node.TextNode();

        var buf = new StringBuffer();
        while (!this.match('\n')) {
            buf.push(this.nextChar());
        }

        node.children.push(new node.NormalTextNode(buf.getStr()));
        return node;
    }
    
    private parseOrderList() {

    }
    
    private parseUnorderList() {

    }
    
    private parseAnchor() {

    }
    
    private parseBlockQuote() {

    }
    
    private parseHTMLElement() {

    }

}
