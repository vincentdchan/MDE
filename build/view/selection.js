"use strict";
const util_1 = require("../util");
const model_1 = require("../model");
const viewInputer_1 = require("./viewInputer");
const viewCursor_1 = require("./viewCursor");
class SelectionAtom extends util_1.DomHelper.AbsoluteElement {
    constructor() {
        super("div", "mde-document-selection-atom");
        this._dom.style.zIndex = "-1";
    }
}
exports.SelectionAtom = SelectionAtom;
class SelectionManager {
    constructor(isMajor, lineMargin, docWidth, absCoGetter, ticktock) {
        this._begin_pos = null;
        this._end_pos = null;
        this._top_atom = null;
        this._middle_atom = null;
        this._end_atom = null;
        this._cursor = null;
        this._inputer = null;
        this._isMajor = isMajor;
        this._lineMargin = lineMargin;
        this._docWidth = docWidth;
        this._coGetter = absCoGetter;
        this._cursor = new viewCursor_1.CursorView(isMajor, ticktock);
        if (this._isMajor)
            this._inputer = new viewInputer_1.InputerView();
    }
    binding(_father_dom) {
        this._father_dom = _father_dom;
        this._cursor.appendTo(this._father_dom);
        this._cursor.hide();
        if (this._isMajor) {
            this._inputer.appendTo(this._father_dom);
            this._inputer.hide();
        }
        this.paint();
    }
    setBegin(pos) {
        if (this._begin_pos === null || !model_1.PositionUtil.equalPostion(this._begin_pos, pos)) {
            this._begin_pos = model_1.PositionUtil.clonePosition(pos);
            this.paint();
        }
    }
    setEnd(pos) {
        if (this._end_pos === null || !model_1.PositionUtil.equalPostion(this._end_pos, pos)) {
            this._end_pos = model_1.PositionUtil.clonePosition(pos);
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
    setDocumentWidth(w) {
        this._docWidth = w;
        this.repaint();
    }
    get collapsed() {
        return this._end_pos === null || this._end_pos === undefined ||
            model_1.PositionUtil.equalPostion(this._begin_pos, this._end_pos);
    }
    clearAll() {
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
    paint() {
        if ((this._begin_pos && this._end_pos === null) ||
            (this._begin_pos && this._end_pos && model_1.PositionUtil.equalPostion(this._begin_pos, this._end_pos))) {
            let beginCo = this._coGetter(this._begin_pos);
            this._cursor.setAbsoluteCoordinate(beginCo);
            this._cursor.show();
            if (this._isMajor) {
                this._inputer.setAbsoluteCoordinate(beginCo);
                this._inputer.show();
            }
        }
        else if (this._begin_pos && this._end_pos &&
            !model_1.PositionUtil.equalPostion(this._begin_pos, this._end_pos)) {
            this._cursor.hide();
            if (this._isMajor)
                this._inputer.hide();
            let begin_pos, end_pos;
            if (model_1.PositionUtil.greaterPosition(this._end_pos, this._begin_pos)) {
                begin_pos = this._begin_pos;
                end_pos = this._end_pos;
            }
            else {
                begin_pos = this._end_pos;
                end_pos = this._begin_pos;
            }
            let beginCo = this._coGetter(begin_pos), endCo = this._coGetter(end_pos);
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
            }
            else {
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
        if (this._isMajor)
            this._inputer.dispose();
    }
    remove() {
        this.clearAll();
        this._cursor.remove();
        if (this._isMajor)
            this._inputer.remove();
    }
}
SelectionManager.DefalutLineHeight = 22;
exports.SelectionManager = SelectionManager;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QVMsQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDdEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNsRCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUUvQixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7Z0JBQzVELElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztnQkFDdkUsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztnQkFDMUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztnQkFFaEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO2dCQUNsRCxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQ2pELENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUVELElBQUksYUFBYTtRQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzNCLENBQUM7SUFFRCxJQUFJLFdBQVc7UUFDWCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRUQsT0FBTztRQUNILElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdkIsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDOUMsQ0FBQztJQUVELE1BQU07UUFDRixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN0QixFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0FBRUwsQ0FBQztBQXRNMEIsa0NBQWlCLEdBQUcsRUFBRSxDQUFDO0FBRnJDLHdCQUFnQixtQkF3TTVCLENBQUEiLCJmaWxlIjoidmlldy9zZWxlY3Rpb24uanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
