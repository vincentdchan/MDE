import {DomHelper, IDisposable, TickTockUtil, KeyCode} from "../util"
import {Position, PositionUtil} from "../model"
import {Coordinate} from "."
import {InputerView} from "./viewInputer"
import {CursorView} from "./viewCursor"

export class SelectionAtom extends DomHelper.AbsoluteElement {

    constructor(isMajor: boolean) {
        super("div", "mde-document-selection-atom");

        if (isMajor) this._dom.classList.add("major");
        this._dom.style.zIndex = "-1";
    }

}

export class SelectionHandler implements IDisposable {

    public static readonly DefalutLineHeight = 22;

    private _begin_pos: Position = null;
    private _end_pos: Position = null;

    private _lineMargin: number;
    private _docWidth: number;
    private _coordinate_offset_thunk: () => Coordinate;
    private _coGetter: (pos: Position) => Coordinate;
    private _father_dom: HTMLElement;

    private _top_atom: SelectionAtom = null;
    private _middle_atom: SelectionAtom = null;
    private _end_atom: SelectionAtom = null;

    private _isMajor: boolean;
    private _cursor: CursorView = null;
    private _inputer: InputerView = null;

    constructor(isMajor: boolean, lineMargin: number, docWidth: number, 
        absCoGetter: (pos: Position) => Coordinate, ticktock: TickTockUtil) {

        this._isMajor = isMajor;

        this._lineMargin = lineMargin;
        this._docWidth = docWidth;
        this._coGetter = absCoGetter;

        this._cursor = new CursorView(isMajor, ticktock);
        if (this._isMajor) {
            this._inputer = new InputerView();

            this._inputer.on("keydown", (evt: KeyboardEvent) => {
                this.handleInputerKeydown(evt);
            });
        }
    }

    private handleInputerKeydown(evt: KeyboardEvent) {
        switch(evt.keyCode) {
            case KeyCode.UpArrow:
                break;
            case KeyCode.DownArrow:
                break;
            case KeyCode.LeftArrow:
                if (this.collapsed) {

                } else {
                    this._end_pos = PositionUtil.clonePosition(this._begin_pos);
                    this.paint();
                }
                break;
            case KeyCode.RightArrow:
                if (this.collapsed) {

                } else {
                    this._begin_pos = PositionUtil.clonePosition(this._end_pos);
                    this.paint();
                }
                break;
        }
    }

    bind(_father_dom: HTMLElement) {
        this._father_dom = _father_dom;

        this._cursor.appendTo(this._father_dom);
        this._cursor.hide();
        if (this._isMajor) {
            this._inputer.appendTo(this._father_dom);
            this._inputer.hide();
        }
        this.paint();
    }

    setBegin(pos: Position) {
        if (this._begin_pos === null || !PositionUtil.equalPostion(this._begin_pos, pos)) {
            this._begin_pos = PositionUtil.clonePosition(pos);
            this.paint();
        }
    }

    setEnd(pos: Position) {
        if (this._end_pos === null || !PositionUtil.equalPostion(this._end_pos, pos)) {
            this._end_pos = PositionUtil.clonePosition(pos);
            if (this._begin_pos)
                this.paint();
        }
    }

    repaint() {
        this.paint();
    }

    leftCollapse() {
        this._end_pos = PositionUtil.clonePosition(this._begin_pos);
    }

    rightCollapse() {
        this._begin_pos = PositionUtil.clonePosition(this._end_pos);
    }

    get collapsed() {
        return this._end_pos === null || this._end_pos === undefined || 
            PositionUtil.equalPostion(this._begin_pos, this._end_pos);
    }

    private clearAll() {
        if (this._top_atom) {
            this._top_atom.remove();
            this._top_atom = null;
        }
        if (this._middle_atom) {
            this._middle_atom.remove();
            this._middle_atom = null;
        }
        if (this._end_atom) {
            this._end_atom.remove();
            this._end_atom = null;
        }
    }

    private paint() {

        if ((this._begin_pos && this._end_pos === null) || 
            (this._begin_pos && this._end_pos && PositionUtil.equalPostion(this._begin_pos, this._end_pos))) {
            let beginCo = this._coGetter(this._begin_pos);

            this._cursor.setAbsoluteCoordinate(beginCo);
            this._cursor.show();

            if (this._inputer) {
                this._inputer.setAbsoluteCoordinate(beginCo);
                this._inputer.show();
            }
        } else if (this._begin_pos && this._end_pos && 
            !PositionUtil.equalPostion(this._begin_pos, this._end_pos)) {

            this._cursor.hide();

            let begin_pos: Position,
                end_pos: Position;
            
            if (PositionUtil.greaterPosition(this._end_pos, this._begin_pos)) {
                begin_pos = this._begin_pos;
                end_pos = this._end_pos;
            } else {
                begin_pos = this._end_pos;
                end_pos = this._begin_pos;
            }

            let beginCo = this._coGetter(begin_pos),
                endCo = this._coGetter(end_pos);

            if (beginCo.y === endCo.y) {

                if (this._top_atom === null) {
                    this._top_atom = new SelectionAtom(this._isMajor);
                    this._top_atom.appendTo(this._father_dom);
                }
                if (this._middle_atom !== null) {
                    this._middle_atom.remove();
                    this._middle_atom = null;
                }
                if (this._end_atom !== null) {
                    this._end_atom.remove();
                    this._end_atom = null;
                }

                this._top_atom.width = endCo.x - beginCo.x;
                this._top_atom.height = SelectionHandler.DefalutLineHeight;

                this._top_atom.marginLeft = beginCo.x;
                this._top_atom.top = beginCo.y;

                if (this._inputer)
                    this._inputer.setAbsoluteCoordinate(endCo);

            } else {

                if (this._top_atom === null) {
                    this._top_atom = new SelectionAtom(this._isMajor);
                    this._top_atom.appendTo(this._father_dom);
                }
                if (this._middle_atom === null) {
                    this._middle_atom = new SelectionAtom(this._isMajor);
                    this._middle_atom.appendTo(this._father_dom);
                }
                if (this._end_atom === null) {
                    this._end_atom = new SelectionAtom(this._isMajor);
                    this._end_atom.appendTo(this._father_dom);
                }

                this._top_atom.height = this._end_atom.height = SelectionHandler.DefalutLineHeight;
                
                this._top_atom.marginLeft = beginCo.x;
                this._top_atom.width = this._docWidth - beginCo.x;
                this._top_atom.top = beginCo.y;

                this._middle_atom.width = this._docWidth - this._lineMargin;
                this._middle_atom.height = endCo.y - beginCo.y - this._top_atom.height;
                this._middle_atom.top = beginCo.y + this._top_atom.height;
                this._middle_atom.marginLeft = this._lineMargin;

                this._end_atom.top = endCo.y;
                this._end_atom.width = endCo.x - this._lineMargin;
                this._end_atom.marginLeft = this._lineMargin;

                if (this._inputer)
                    this._inputer.setAbsoluteCoordinate(endCo);
            }
        }
    }

    normalize() {
        if (PositionUtil.greaterPosition(this._begin_pos, this._end_pos)) {
            let tmp = this._begin_pos;
            this._begin_pos = this._end_pos;
            this._end_pos = tmp;

            this.paint();
        }
    }

    get beginPosition() {
        return this._begin_pos;
    }

    get endPosition() {
        return this._end_pos;
    }

    get documentWidth() {
        return this._docWidth;
    }

    set documentWidth(w: number) {
        if (w != this._docWidth) {
            this._docWidth = w;
            this.repaint();
        }
    }

    get inputerContent() {
        if (this._inputer) return this._inputer.value;
        else throw new Error("Only major selection can have inputer content.");
    }

    clearInputerContent() {
        if (this._inputer) this._inputer.clearContent();
        else throw new Error("This selection does not have inputer.");
    }

    focus() {
        if (this._inputer) this._inputer.element().focus();
    }

    dispose() {
        this._cursor.dispose();
        if(this._isMajor) this._inputer.dispose();
    }

    remove() {
        this.clearAll();
        this._cursor.remove();
        if(this._isMajor) this._inputer.remove();
    }

}

export class SelectionManager extends DomHelper.AppendableDomWrapper implements IDisposable {

    // private _father_dom: HTMLElement = null;
    private _handlers: SelectionHandler[] = [];
    private _focused_handler: SelectionHandler;

    private _line_margin: number;
    private _doc_width: number;
    private _abslute_getter: (pos: Position) => Coordinate;

    private _cursor_ticktock: TickTockUtil;

    constructor(lineMargin: number, docWidth: number, absCoGetter: (pos: Position) => Coordinate, blinkTime: number) {
        super("div", "mde-selection-manager");
        this._line_margin = lineMargin;
        this._doc_width = docWidth;
        this._abslute_getter = absCoGetter;

        this._cursor_ticktock = new TickTockUtil(blinkTime);
    }

    beginSelect(pos: Position) {
        let isMajor = this._handlers.length === 0;
        this._focused_handler = new SelectionHandler(isMajor, 
            this._line_margin, 
            this._doc_width, 
            this._abslute_getter, 
            this._cursor_ticktock);
        
        this._focused_handler.setBegin(pos);
        this._focused_handler.setEnd(pos);
        this._focused_handler.bind(this._dom);
        
        this._handlers.push(this._focused_handler);
    }

    moveCursorTo(pos: Position): boolean {
        if (this._focused_handler) {
            this._focused_handler.setEnd(pos);
            return true;
        }
        return false;
    }

    endSelecting() {
        this._focused_handler.normalize();
        this._focused_handler = null;
    }

    selectionAt(index: number): SelectionHandler {
        return this._handlers[index];
    }
    
    clearAll() {
        this._handlers.forEach((sel: SelectionHandler) => {
            sel.dispose();
            sel.remove();
        });
        this._handlers = [];
    }

    repainAll() {
        this._handlers.forEach((sel: SelectionHandler) => {
            sel.repaint();
        });
    }

    clearInputerContent() {
        if (this._handlers.length > 0) this._handlers[0].clearInputerContent();
        else throw new Error("Do not have any selections handlers.");
    }

    get focusedSelection() {
        return this._focused_handler;
    }

    get inputerContent() {
        if (this._handlers.length > 0) return this._handlers[0].inputerContent;
        else throw new Error("Do not have any selection handlers.");
    }

    get documentWidth() {
        return this._doc_width;
    }

    set documentWidth(w: number) {
        if (w !== this._doc_width) {
            this._doc_width = w;
            this._handlers.forEach((sel: SelectionHandler) => {
                sel.documentWidth = w;
            });
        }
    }

    get length() {
        return this._handlers.length;
    }

    focus() {
        if (this._handlers.length > 0) {
            this._handlers[0].focus();
        }
    }

    dispose() {
        this._handlers.forEach((sel: SelectionHandler) => {
            sel.dispose();
        });
        this._handlers = [];

        this._cursor_ticktock.dispose();
    }

}
