import {LineModel} from "../model/lineModel"
import {elem} from "../util/dom"
import {insertBreakAtPoint} from "../util/util"

export class ViewLine {
    
    private _elem : HTMLElement;
    private _model : LineModel;

    private _clickEventHandler : Array<(vl : ViewLine, e : MouseEvent) => void>

    private fireClickEvent(vl : ViewLine, e : MouseEvent) {
        for (let i = 0; i < this._clickEventHandler.length; i++) {
            this._clickEventHandler[i](vl, e);
        }
    }
    
    constructor(_m : LineModel) {            
        this._elem = elem("div", "render-line");
        this._model = _m;
        
        this._elem.innerText = _m.text;

        this._clickEventHandler = new Array<(vl : ViewLine, e : Event) => void>();

        this._elem.addEventListener('click', (e : MouseEvent) => {
            this.fireClickEvent(this, e);
            // console.log("number: " + this.lineNumber + " offset: " + insertBreakAtPoint(e));
        })
    }

    onClickEvent(fun : (vl : ViewLine, e : Event) => void) {
        this._clickEventHandler.push(fun);
    }

    get element() {
        return this._elem;
    }

    get lineNumber() {
        return this._model.number;
    }

    get coordinate() : ClientRect {
        return  this.element.getBoundingClientRect();
    }

}