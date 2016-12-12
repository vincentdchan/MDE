"use strict";
const util_1 = require("../util");
const model_1 = require("../model");
const viewInputer_1 = require("./viewInputer");
const viewCursor_1 = require("./viewCursor");
class SelectionAtom extends util_1.DomHelper.AbsoluteElement {
    constructor(isMajor) {
        super("div", "mde-document-selection-atom");
        if (isMajor)
            this._dom.classList.add("major");
        this._dom.style.zIndex = "-1";
    }
}
exports.SelectionAtom = SelectionAtom;
function moveSelectionTo(sel, pos) {
    sel.beginPosition = pos;
    sel.endPosition = pos;
    sel.repaint();
}
exports.moveSelectionTo = moveSelectionTo;
class SelectionHandler {
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
        if (this._isMajor) {
            this._inputer = new viewInputer_1.InputerView();
            this._inputer.on("keydown", (evt) => {
                this.handleInputerKeydown(evt);
            });
        }
    }
    handleInputerKeydown(evt) {
        switch (evt.keyCode) {
            case util_1.KeyCode.UpArrow:
                break;
            case util_1.KeyCode.DownArrow:
                break;
            case util_1.KeyCode.LeftArrow:
                if (this.collapsed) {
                }
                else {
                    this._end_pos = model_1.PositionUtil.clonePosition(this._begin_pos);
                    this.paint();
                }
                break;
            case util_1.KeyCode.RightArrow:
                if (this.collapsed) {
                }
                else {
                    this._begin_pos = model_1.PositionUtil.clonePosition(this._end_pos);
                    this.paint();
                }
                break;
        }
    }
    bind(_father_dom) {
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
    leftCollapse() {
        this._end_pos = model_1.PositionUtil.clonePosition(this._begin_pos);
    }
    rightCollapse() {
        this._begin_pos = model_1.PositionUtil.clonePosition(this._end_pos);
    }
    report() {
        return {
            begin: model_1.PositionUtil.clonePosition(this._begin_pos),
            end: model_1.PositionUtil.clonePosition(this._end_pos),
        };
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
            this.clearAll();
            let beginCo = this._coGetter(this._begin_pos);
            this._cursor.setAbsoluteCoordinate(beginCo);
            this._cursor.show();
            if (this._inputer) {
                this._inputer.setAbsoluteCoordinate(beginCo);
                this._inputer.show();
            }
        }
        else if (this._begin_pos && this._end_pos &&
            !model_1.PositionUtil.equalPostion(this._begin_pos, this._end_pos)) {
            this._cursor.hide();
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
            }
            else {
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
        if (model_1.PositionUtil.greaterPosition(this._begin_pos, this._end_pos)) {
            let tmp = this._begin_pos;
            this._begin_pos = this._end_pos;
            this._end_pos = tmp;
            this.paint();
        }
    }
    get beginPosition() {
        return this._begin_pos;
    }
    set beginPosition(pos) {
        this._begin_pos = model_1.PositionUtil.clonePosition(pos);
    }
    get endPosition() {
        return this._end_pos;
    }
    set endPosition(pos) {
        this._end_pos = model_1.PositionUtil.clonePosition(pos);
    }
    get documentWidth() {
        return this._docWidth;
    }
    set documentWidth(w) {
        if (w != this._docWidth) {
            this._docWidth = w;
            this.repaint();
        }
    }
    get inputerContent() {
        if (this._inputer)
            return this._inputer.value;
        else
            throw new Error("Only major selection can have inputer content.");
    }
    clearInputerContent() {
        if (this._inputer)
            this._inputer.clearContent();
        else
            throw new Error("This selection does not have inputer.");
    }
    focus() {
        if (this._inputer)
            this._inputer.element().focus();
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
SelectionHandler.DefalutLineHeight = 22;
exports.SelectionHandler = SelectionHandler;
class SelectionManager extends util_1.DomHelper.AppendableDomWrapper {
    constructor(lineMargin, docWidth, absCoGetter, blinkTime) {
        super("div", "mde-selection-manager");
        this._handlers = [];
        this._line_margin = lineMargin;
        this._doc_width = docWidth;
        this._abslute_getter = absCoGetter;
        this._cursor_ticktock = new util_1.TickTockUtil(blinkTime);
    }
    beginSelect(pos) {
        let isMajor = this._handlers.length === 0;
        this._focused_handler = new SelectionHandler(isMajor, this._line_margin, this._doc_width, this._abslute_getter, this._cursor_ticktock);
        this._focused_handler.setBegin(pos);
        this._focused_handler.setEnd(pos);
        this._focused_handler.bind(this._dom);
        this._handlers.push(this._focused_handler);
    }
    moveCursorTo(pos) {
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
    selectionAt(index) {
        return this._handlers[index];
    }
    clearAll() {
        this._handlers.forEach((sel) => {
            sel.dispose();
            sel.remove();
        });
        this._handlers = [];
    }
    repainAll() {
        this._handlers.forEach((sel) => {
            sel.repaint();
        });
    }
    clearInputerContent() {
        if (this._handlers.length > 0)
            this._handlers[0].clearInputerContent();
        else
            throw new Error("Do not have any selections handlers.");
    }
    report(index) {
        return this._handlers[index].report();
    }
    reportAll() {
        return this._handlers.map((sel) => {
            return sel.report();
        });
    }
    get focusedSelection() {
        return this._focused_handler;
    }
    get inputerContent() {
        if (this._handlers.length > 0)
            return this._handlers[0].inputerContent;
        else
            throw new Error("Do not have any selection handlers.");
    }
    get documentWidth() {
        return this._doc_width;
    }
    set documentWidth(w) {
        if (w !== this._doc_width) {
            this._doc_width = w;
            this._handlers.forEach((sel) => {
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
        this._handlers.forEach((sel) => {
            sel.dispose();
        });
        this._handlers = [];
        this._cursor_ticktock.dispose();
    }
}
exports.SelectionManager = SelectionManager;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdTZWxlY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHVCQUE0RCxTQUM1RCxDQUFDLENBRG9FO0FBQ3JFLHdCQUE0QyxVQUM1QyxDQUFDLENBRHFEO0FBRXRELDhCQUEwQixlQUMxQixDQUFDLENBRHdDO0FBQ3pDLDZCQUF5QixjQUV6QixDQUFDLENBRnNDO0FBRXZDLDRCQUFtQyxnQkFBUyxDQUFDLGVBQWU7SUFFeEQsWUFBWSxPQUFnQjtRQUN4QixNQUFNLEtBQUssRUFBRSw2QkFBNkIsQ0FBQyxDQUFDO1FBRTVDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ2xDLENBQUM7QUFFTCxDQUFDO0FBVFkscUJBQWEsZ0JBU3pCLENBQUE7QUFFRCx5QkFBZ0MsR0FBcUIsRUFBRSxHQUFhO0lBQ2hFLEdBQUcsQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDO0lBQ3hCLEdBQUcsQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO0lBQ3RCLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNsQixDQUFDO0FBSmUsdUJBQWUsa0JBSTlCLENBQUE7QUFFRDtJQXFCSSxZQUFZLE9BQWdCLEVBQUUsVUFBa0IsRUFBRSxRQUFnQixFQUM5RCxXQUEwQyxFQUFFLFFBQXNCO1FBbEI5RCxlQUFVLEdBQWEsSUFBSSxDQUFDO1FBQzVCLGFBQVEsR0FBYSxJQUFJLENBQUM7UUFRMUIsY0FBUyxHQUFrQixJQUFJLENBQUM7UUFDaEMsaUJBQVksR0FBa0IsSUFBSSxDQUFDO1FBQ25DLGNBQVMsR0FBa0IsSUFBSSxDQUFDO1FBR2hDLFlBQU8sR0FBZSxJQUFJLENBQUM7UUFDM0IsYUFBUSxHQUFnQixJQUFJLENBQUM7UUFLakMs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LENBQUM7UUFDUCxDQUFDO0lBQ0wsQ0FBQztJQUVELElBQUksTUFBTTtRQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztJQUNqQyxDQUFDO0lBRUQsS0FBSztRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM5QixDQUFDO0lBQ0wsQ0FBQztJQUVELE9BQU87UUFDSCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQXFCO1lBQ3pDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNsQixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBRXBCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0FBRUwsQ0FBQztBQTNIWSx3QkFBZ0IsbUJBMkg1QixDQUFBIiwiZmlsZSI6InZpZXcvdmlld1NlbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
