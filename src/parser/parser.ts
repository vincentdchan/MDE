import * as node from "./ast"
import {StringBuffer} from "../util/stringBuffer"
import {TextModel} from "../model/textModel"
import {LineModel} from "../model/lineModel"
import {Position} from "../model"

const EOF = '\0';

interface ParseState {
    pos: Position;
    finished: boolean;
}

export class Parser {
    
    private _root: node.Node;
    private _model : TextModel;
    private _indentStack : string[];
    
    private _index : number;
    private _nodes : node.Node[];

    private _errors : Error[];
    private _continue : boolean = true;

    private _prefixArray : string[];
    private _lookahead : string;

    private _parseState: ParseState;
    
    constructor(_model : TextModel) {
        this._model = _model;
        
        this._indentStack = new Array<string>();
        this._nodes = new Array<node.Node>();

        this._errors = new Array<Error>();

        this._prefixArray = [];

        this._parseState = {
            pos: {
                line: 1, offset: 0
            },
            finished: false,
        }

    }

    nextState() {
        // last char in this line
        if (this._parseState.pos.offset === this._model.lineAt(this._parseState.pos.line).length - 1) {
            // last line
            if (this._parseState.pos.line === this._model.linesCount) {
                // finish
                this._parseState.finished = true;
            } else {
                // new line
                this._parseState.pos.line++;
                this._parseState.pos.offset = 0;
            }
        } else {
            this._parseState.pos.offset++;
        }
    }

    isFinished(): boolean {
        return this._parseState.finished;
    }
    
    match(char : string) : boolean {
        return this._lookahead == char;
    }

    lookahead() : string {
        return this._lookahead;
    }

    nextChar() : string {
        var _tmp = this._lookahead
        if (this._parseState.finished)
            throw new Error("end of fine");
        this.nextState();
        this._lookahead = this._model.charAt(this._parseState.pos);
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
        var _node = new node.TextNode();

        var buf = new StringBuffer();
        while (!this.match('\n')) {
            buf.push(this.nextChar());
        }

        _node.children.push(new node.NormalTextNode(buf.getStr()));
        return _node;
    }
    
    private parseOrderList(): node.ListNode {
        let _node = new node.ListNode();
        return _node;
    }
    
    private parseUnorderList(): node.ListNode {
        let _node = new node.ListNode();
        return _node;
    }
    
    private parseAnchor() {

    }
    
    private parseBlockQuote() {

    }
    
    private parseHTMLElement() {

    }

}
