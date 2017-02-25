"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util");
const model_1 = require("../model");
const viewInputer_1 = require("./viewInputer");
const viewCursor_1 = require("./viewCursor");
class SelectionAtom extends util_1.DomWrapper.AbsoluteElement {
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
            this._inputer.on("focus", (e) => {
                this._cursor.state = viewCursor_1.CursorState.Blink;
            });
            this._inputer.on("blur", (e) => {
                this._cursor.state = viewCursor_1.CursorState.AlwaysOn;
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
class SelectionManager extends util_1.DomWrapper.AppendableDomWrapper {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdTZWxlY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrQ0FBc0U7QUFDdEUsb0NBQXNEO0FBRXRELCtDQUF5QztBQUN6Qyw2Q0FBb0Q7QUFFcEQsbUJBQTJCLFNBQVEsaUJBQVUsQ0FBQyxlQUFlO0lBRXpELFlBQVksT0FBZ0I7UUFDeEIsS0FBSyxDQUFDLEtBQUssRUFBRSw2QkFBNkIsQ0FBQyxDQUFDO1FBRTVDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ2xDLENBQUM7Q0FFSjtBQVRELHNDQVNDO0FBRUQseUJBQWdDLEdBQXFCLEVBQUUsR0FBYTtJQUNoRSxHQUFHLENBQUMsYUFBYSxHQUFHLEdBQUcsQ0FBQztJQUN4QixHQUFHLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztJQUN0QixHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDbEIsQ0FBQztBQUpELDBDQUlDO0FBRUQ7SUFxQkksWUFBWSxPQUFnQixFQUFFLFVBQWtCLEVBQUUsUUFBZ0IsRUFDOUQsV0FBMEMsRUFBRSxRQUFzQjtRQWxCOUQsZUFBVSxHQUFhLElBQUksQ0FBQztRQUM1QixhQUFRLEdBQWEsSUFBSSxDQUFDO1FBUTFCLGNBQVMsR0FBa0IsSUFBSSxDQUFDO1FBQ2hDLGlCQUFZLEdBQWtCLElBQUksQ0FBQztRQUNuQyxjQUFTLEdBQWtCLElBQUksQ0FBQztRQUdoQyxZQUFPLEdBQWUsSUFBSSxDQUFDO1FBQzNCLGFBQVEsR0FBZ0IsSUFBSSxDQUFDO1FBS2pDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBRXhCLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO1FBQzlCLElBQUksQ0FBQyxTQUFT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
