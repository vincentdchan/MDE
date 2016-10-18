
import {LineModel} from "../model/textModel"

export class ViewLine {
    
    private _elem : HTMLElement;
    private _model : LineModel;
    
    constructor(_m : LineModel) {            
        this._elem = document.createElement("DIV");
        this._model = _m;
        
        this._elem.innerText = _m.text;
    }
    
    get element() {
        return this._elem;
    }

}