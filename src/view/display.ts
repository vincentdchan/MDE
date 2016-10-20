import {ViewLine} from "./viewLine"
import {Cursor} from "./cursor"
import {TextModel} from "../model/textModel"
import {LineModel} from "../model/lineModel"
import {LineNumber} from "./lineNumber"
import {elem} from "../util/dom"
import {insertBreakAtPoint} from "../util/util"

export class Display {
    
    protected _lines : ViewLine[];
    protected _model : TextModel;
    
    private _frame : HTMLElement;
    private _render_frame : HTMLElement;
    private _input : HTMLTextAreaElement;
    private _cursor : Cursor;
    private _lineNumber : LineNumber;
    private _currentLine : number;
    private _currentOffset : number;
    
    constructor(container : HTMLElement) {            
        this._model = new TextModel();
        
        this._lineNumber = new LineNumber(0);
        
        this._frame = elem("div", "display-frame");
        this._render_frame = elem("div", "render-frame");
        this._input = <HTMLTextAreaElement>(elem("textarea", "input-textarea"));
        this._cursor = new Cursor();

        this._frame.appendChild(this._input);
        this._frame.appendChild(this._cursor.element);
        this._frame.appendChild(this._lineNumber.frame);
        this._frame.appendChild(this._render_frame);
        
        container.appendChild(this._frame);
    }
    
    render(tm : TextModel) {
        this._lines = new Array<ViewLine>();
        this._model = tm;
        
        try {
            this._lineNumber.total_number = tm.linesCount;

        } catch ( e ) {
            console.log(e);
        }
        
        let lineCount = tm.linesCount;
        
        for (let i = 1; i <= lineCount; i++) {
            let lineModel = tm.getLineFromNum(i);
            let vl = new ViewLine(lineModel);

            vl.onClickEvent((vl : ViewLine, e : MouseEvent) => {
                // let coordinate = vl.coordinate;                
                let range = document.caretRangeFromPoint(e.pageX, e.pageY);

                let coordinate = range.getBoundingClientRect();

                this._cursor.setCoordinate(coordinate.left, coordinate.top);

                this._input.style.top = coordinate.top.toString() + "px";
                this._input.style.left = coordinate.left.toString() + "px";
                this._input.focus();

                this._currentLine = i;
                this._currentOffset = range.startOffset;
            });

            lineModel.onInsert((lm: LineModel, e : Event) => {
                vl.element.innerHTML = lm.text;
            });
            
            this._lines.push(vl);
        }
        
        for (let i = 0; i < this._lines.length; ++i) {
            this._render_frame.appendChild(this._lines[i].element);
        }

        this._input.addEventListener("compositionstart", (e : any) => {
            // console.log("begin: " + e.data);
        });

        this._input.addEventListener("compositionupdate", (e : any) => {
            // console.log("update: " + e.data);
        });

        this._input.addEventListener("compositionend", (e : any) => {
            // console.log("end: " + e.data);
        });

        this._input.addEventListener("input", (e : Event) => {
            // console.log("input" + this._input.value);
            let content = this._input.value;
            let insert_len = content.length;

            this._input.value = ""
            this._model.insertText(this._currentLine, this._currentOffset, content);

            this._currentOffset += insert_len;
            let range = document.createRange();
            let _elem = this._lines[this._currentLine - 1].element;
            range.setStart(_elem.firstChild, this._currentOffset);
            range.setEnd(_elem.firstChild, this._currentOffset);
            let rect = range.getBoundingClientRect();

            this._cursor.setCoordinate(rect.left, rect.top);
            this._input.style.left = rect.left + "px";
            this._input.style.top = rect.top + "px";
        });

    }
    
    get frame() {
        return this._frame;
    }

}
