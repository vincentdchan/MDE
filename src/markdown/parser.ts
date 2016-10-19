import * as node from "./ast"
import {StringBuffer} from "../util/stringBuffer"

export class Parser {
    
    private _root: node.Node;
    private _content: string;
    private _indentStack : string[];
    
    private _index : number;
    
    constructor(_content : string) {
        this._content = _content;
        
        this._indentStack = new Array<string>();
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
        let strbuf = new StringBuffer();
        
        while (this._content[this._index] !== '#' &&
         this._content[this._index] !== '\n') {
             strbuf.push(this._content[this._index]);
         }
        
        let _node = new node.HeaderNode(counter, strbuf.getStr());
        
        this.nextLine();
    }
    
    parseParagraph() {
        let prefixStack = new Array<string>();
        
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
