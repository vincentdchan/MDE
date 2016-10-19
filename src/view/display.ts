import {ViewLine} from "./ViewLine"
import {TextModel} from "../model/textModel"
import {LineNumber} from "./lineNumber"
import {elem} from "../util/dom"
import {insertBreakAtPoint} from "../util/util"

export class Display {
    
    protected _lines : ViewLine[];
    protected _model : TextModel;
    
    private _frame : HTMLElement;
    private _render_frame : HTMLElement;
    private _input : HTMLTextAreaElement;
    private _cursor : HTMLDivElement;
    private _lineNumber : LineNumber;
    
    constructor(container : HTMLElement) {            
        this._model = new TextModel();
        this._model.setFromRawText("");
        
        this._lineNumber = new LineNumber(0);
        
        this._frame = elem("div", "display-frame");
        this._render_frame = elem("div", "render-frame");
        this._cursor = <HTMLDivElement>elem("div", "cursor");
        this._input = <HTMLTextAreaElement>(elem("textarea", "input-textarea"));

        this._frame.appendChild(this._cursor);
        this._frame.appendChild(this._lineNumber.frame);
        this._frame.appendChild(this._render_frame);
        
        container.appendChild(this._frame);

        this._cursor.style.position = "absolute";

        let _cursor_shown = false;
        setInterval(() => {

            if (_cursor_shown) {
                this._cursor.style.opacity = "0";
            }
            else {
                this._cursor.style.opacity = "1";
            }
            _cursor_shown = !_cursor_shown;

        }, 500);
        
    }
    
    render(tm : TextModel) {
        this._lines = new Array<ViewLine>();
        
        try {
            this._lineNumber.total_number = tm.linesCount;

        } catch ( e ) {
            console.log(e);
        }
        
        let lineCount = tm.linesCount;
        
        for (let i = 1; i <= lineCount; i++) {
            let vl = new ViewLine(tm.getLineFromNum(i));

            vl.onClickEvent((vl : ViewLine, e : MouseEvent) => {
                // let coordinate = vl.coordinate;                
                let offset = insertBreakAtPoint(e);

                let range = document.caretRangeFromPoint(e.pageX, e.pageY);

                let coordinate = range.getBoundingClientRect();

                this._cursor.style.top = coordinate.top.toString() + "px";
                this._cursor.style.left = coordinate.left.toString() + "px";
            });
            
            this._lines.push(vl);
        }
        
        for (let i = 0; i < this._lines.length; ++i) {
            this._render_frame.appendChild(this._lines[i].element);
        }
    }
    
    get frame() {
        return this._frame;
    }

}
