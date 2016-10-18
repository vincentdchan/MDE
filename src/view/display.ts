import {ViewLine} from "./ViewLine"
import {TextModel} from "../model/textModel"
import {LineNumber} from "./lineNumber"

export class Display {
    
    protected _lines : ViewLine[];
    protected _model : TextModel;
    
    private _frame : HTMLElement;
    private _lineNumber : LineNumber;
    
    constructor(_m : TextModel) {            
        this._model = _m;
        
        this._frame = document.createElement("div");
        
        this._lineNumber = new LineNumber(0);
    }
    
    get frame() {
        return this._frame;
    }

}
