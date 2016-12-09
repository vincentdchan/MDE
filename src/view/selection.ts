import {DomHelper, IDisposable, TickTockUtil} from "../util"
import {Position, PositionUtil} from "../model"
import {Coordinate} from "."
import {InputerView} from "./viewInputer"
import {CursorView} from "./viewCursor"

export class SelectionAtom extends DomHelper.AbsoluteElement {

    constructor() {
        super("div", "mde-document-selection-atom");
        this._dom.style.zIndex = "-1";
    }

}

export class SelectionManager implements IDisposable {

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

    constructor(isMajor: boolean, lineMargin: number, docWidth: number, absCoGetter: (pos: Position) => Coordinate, ticktock: TickTockUtil) {

        this._isMajor = isMajor;

        this._lineMargin = lineMargin;
        this._docWidth = docWidth;
        this._coGetter = absCoGetter;

        this._cursor = new CursorView(isMajor, ticktock);
        if (this._isMajor)
            this._inputer = new InputerView();
    }

    binding(_father_dom: HTMLElement) {
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

    collapse() {
        throw new Error("Not implemented.");
    }

    setDocumentWidth(w: number) {
        this._docWidth = w;
        this.repaint();
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

            if (this._isMajor) {
                this._inputer.setAbsoluteCoordinate(beginCo);
                this._inputer.show();
            }
        } else if (this._begin_pos && this._end_pos && 
            !PositionUtil.equalPostion(this._begin_pos, this._end_pos)) {

            this._cursor.hide();
            if (this._isMajor) this._inputer.hide();

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
                    this._top_atom = new SelectionAtom();
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
                this._top_atom.height = SelectionManager.DefalutLineHeight;

                this._top_atom.marginLeft = beginCo.x;
                this._top_atom.top = beginCo.y;

            } else {

                if (this._top_atom === null) {
                    this._top_atom = new SelectionAtom();
                    this._top_atom.appendTo(this._father_dom);
                }
                if (this._middle_atom === null) {
                    this._middle_atom = new SelectionAtom();
                    this._middle_atom.appendTo(this._father_dom);
                }
                if (this._end_atom === null) {
                    this._end_atom = new SelectionAtom();
                    this._end_atom.appendTo(this._father_dom);
                }

                this._top_atom.height = this._end_atom.height = SelectionManager.DefalutLineHeight;
                
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
            }
        }
    }

    get beginPosition() {
        return this._begin_pos;
    }

    get endPosition() {
        return this._end_pos;
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
