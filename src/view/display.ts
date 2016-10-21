import {ViewLine} from "./viewLine"
import {Cursor} from "./cursor"
import {TextModel} from "../model/textModel"
import {LineModel} from "../model/lineModel"
import {LineNumber} from "./lineNumber"
import {Input} from "./input"
import {elem} from "../util/dom"
import {insertBreakAtPoint} from "../util/util"

export class Display {
    
    protected _lines : ViewLine[];
    protected _model : TextModel;
    
    private _frame : HTMLElement;
    private _render_frame : HTMLElement;
    private _input : Input;
    private _cursor : Cursor;
    private _lineNumber : LineNumber;
    private _currentLine : number;
    private _currentOffset : number;
    
    constructor(container : HTMLElement) {            
        this._model = new TextModel();
        
        this._lineNumber = new LineNumber(0);
        
        this._frame = elem("div", "display-frame");
        this._render_frame = elem("div", "render-frame");
        this._input = new Input();
        this._cursor = new Cursor();

        this._input.appendTo(this._frame);
        this._cursor.appendTo(this._frame);
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

                this._input.setCoordinate(coordinate.left, coordinate.top);
                this._input.getElement().focus();

                this._currentLine = i;
                this._currentOffset = range.startOffset;
            });

            this._lines.push(vl);
        }
        
        for (let i = 0; i < this._lines.length; ++i) {
            this._lines[i].appendTo(this._render_frame);
        }


        this._input.onInputEvent((input : Input, e : Event) => {
            let content = this._input.value;
            let insert_len = content.length;

            this._input.value = ""
            this._model.insertText(this._currentLine, this._currentOffset, content);

            this._currentOffset += insert_len;
            let range = document.createRange();
            let _elem = this._lines[this._currentLine - 1].getElement();
            range.setStart(_elem.firstChild, this._currentOffset);
            range.setEnd(_elem.firstChild, this._currentOffset);
            let rect = range.getBoundingClientRect();

            this._cursor.setCoordinate(rect.left, rect.top);
            this._input.setCoordinate(rect.left, rect.top);

            this._input.focus();
        });

        this._input.onKeyboardEvent((input : Input, e : KeyboardEvent) => {
            // console.log(e.which);

            switch (e.which) {
                case 8 : // backspace
                {
                    this._model.deleteText(this._currentLine, this._currentOffset - 1, this._currentOffset);
                    this._currentOffset--;

                    let range = document.createRange();
                    let _elem = this._lines[this._currentLine - 1].getElement();
                    range.setStart(_elem.firstChild, this._currentOffset);
                    range.setEnd(_elem.firstChild, this._currentOffset);
                    let rect = range.getBoundingClientRect();

                    this._cursor.setCoordinate(rect.left, rect.top);
                    this._input.setCoordinate(rect.left, rect.top);
                    break;
                }
                case 46: // delete
                {
                    this._model.deleteText(this._currentLine, this._currentOffset, this._currentOffset + 1);
                    break;
                }
                case 37: // left
                {

                    if (this._currentOffset > 0)
                    {
                        this._currentOffset--;
                        let range =document.createRange();
                        let _elem = this._lines[this._currentLine - 1].getElement();
                        range.setStart(_elem.firstChild, this._currentOffset);
                        range.setEnd(_elem.firstChild, this._currentOffset);
                        let rect = range.getBoundingClientRect();

                        this._cursor.setCoordinate(rect.left, rect.top);
                        this._input.setCoordinate(rect.left, rect.top);
                    } else {

                    }

                    break;
                }
                case 38: // up
                {
                    if (this._currentLine > 1) {
                        this._currentLine--;
                        let range = document.createRange();
                        let _elem = this._lines[this._currentLine - 1].getElement();

                        let modelLine = this._model.getLineFromNum(this._currentLine);
                        if (this._currentOffset >= modelLine.length) {
                            range.setStart(_elem.firstChild, modelLine.length - 1);
                            range.setEnd(_elem.firstChild, modelLine.length - 1);
                        } else {
                            range.setStart(_elem.firstChild, this._currentOffset);
                            range.setEnd(_elem.firstChild, this._currentOffset);
                        }
                        
                        let rect = range.getBoundingClientRect();

                        this._cursor.setCoordinate(rect.left, rect.top);
                        this._input.setCoordinate(rect.left, rect.top);

                    }

                    break;
                }
                case 39: // right
                {
                    let lineModel = this._model.getLineFromNum(this._currentLine);

                    if (this._currentOffset <= lineModel.length - 1) {
                        this._currentOffset++;
                        let range =document.createRange();
                        let _elem = this._lines[this._currentLine - 1].getElement();
                        range.setStart(_elem.firstChild, this._currentOffset);
                        range.setEnd(_elem.firstChild, this._currentOffset);
                        let rect = range.getBoundingClientRect();

                        this._cursor.setCoordinate(rect.left, rect.top);
                        this._input.setCoordinate(rect.left, rect.top);
                    }
                    break;
                }
                case 40: //down
                {

                    break;
                }
            }
        })

    }
    
    get frame() {
        return this._frame;
    }

}
