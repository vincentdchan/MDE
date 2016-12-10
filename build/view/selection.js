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
    collapse() {
        throw new Error("Not implemented.");
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
            }
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
    set documentWidth(w) {
        if (w != this._docWidth) {
            this._docWidth = w;
            this.repaint();
        }
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
class SelectionManager {
    constructor(lineMargin, docWidth, absCoGetter, blinkTime) {
        this._father_dom = null;
        this._handlers = [];
        this._line_margin = lineMargin;
        this._doc_width = docWidth;
        this._abslute_getter = absCoGetter;
        this._cursor_ticktock = new util_1.TickTockUtil(blinkTime);
    }
    bind(dom) {
        this._father_dom = dom;
        this._handlers.forEach((sel) => {
            sel.bind(this._father_dom);
        });
    }
    unbind() {
        this.clearAll();
        this._father_dom = null;
    }
    beginSelect(pos) {
        let isMajor = this._handlers.length === 0;
        this._focused_handler = new SelectionHandler(isMajor, this._line_margin, this._doc_width, this._abslute_getter, this._cursor_ticktock);
        this._focused_handler.setBegin(pos);
        this._focused_handler.setEnd(pos);
        if (this._father_dom)
            this._focused_handler.bind(this._father_dom);
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
    dispose() {
        this._handlers.forEach((sel) => {
            sel.dispose();
        });
        this._handlers = [];
        this._cursor_ticktock.dispose();
    }
}
exports.SelectionManager = SelectionManager;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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
