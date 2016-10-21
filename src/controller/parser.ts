import * as node from "./ast"
import {StringBuffer} from "../util/stringBuffer"
import {TextModel} from "../model/textModel"
import {LineModel} from "../model/lineModel"

export class Parser {
    
    private _root: node.Node;
    private _model : TextModel;
    private _indentStack : string[];
    
    private _index : number;
    private _nodes : node.Node[];

    private _errors : Error[];
    private _continue : boolean = true;
    
    constructor(_model : TextModel) {
        this._model = _model;
        
        this._indentStack = new Array<string>();
        this._nodes = new Array<node.Node>();

        this._errors = new Array<Error>();
    }
    
    beginParsing() {
        for (let i = 1; i <= this._model.linesCount; i++) {
            this.parseLine(i, this._model.getLineFromNum(i));
        }
    }

    private reportError(e : Error, _continue : boolean) {
        this._errors.push(e);
        this._continue = _continue;
    }

    private parseLine(_num : number, _line : LineModel) {
        for (let i=0; i < _line.length; i++) {
            try {
                // parsing
            } catch (e) {
                if (this._continue) {
                    continue;
                } else {
                    break;
                }
            }
        }
    }
    
    private parseHeader() {            
    }
    
    private parseParagraph() {
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
