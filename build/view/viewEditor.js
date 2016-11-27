"use strict";
const util_1 = require("../util");
const viewDocument_1 = require("./viewDocument");
const viewLineMargin_1 = require("./viewLineMargin");
const viewScrollBar_1 = require("./viewScrollBar");
const viewCursor_1 = require("./viewCursor");
const viewInputer_1 = require("./viewInputer");
const viewToolbar_1 = require("./viewToolbar");
class EditorView extends util_1.DomHelper.FixedElement {
    constructor(_model) {
        super("div", "mde-editor");
        this._toolbar = new viewToolbar_1.ToolbarView();
        this._toolbar.top = 0;
        this._model = _model;
        this._document = new viewDocument_1.DocumentView(_model);
        this._document.top = this._toolbar.height;
        this._document.marginLeft = EditorView.DefaultLineMarginWidth;
        this._document.render();
        this._marginMargin = new viewLineMargin_1.LineMarginView();
        this._marginMargin.top = this._toolbar.height;
        this._marginMargin.width = EditorView.DefaultLineMarginWidth;
        this._scrollbar = new viewScrollBar_1.ScrollBarView();
        this._scrollbar.top = this._toolbar.height;
        this._scrollbar.right = 0;
        let thk = () => {
            return this._document.scrollTop;
        };
        this._cursor = new viewCursor_1.CursorView(thk);
        this._inputer = new viewInputer_1.InputerView(thk);
        this._cursor.appendTo(this._dom);
        this._inputer.appendTo(this._dom);
        this._toolbar.appendTo(this._dom);
        this._marginMargin.appendTo(this._dom);
        this._document.appendTo(this._dom);
        this._scrollbar.appendTo(this._dom);
        this.stylish();
        this._inputer.addEventListener("focus", this.handleInputerFocused.bind(this));
        this._inputer.addEventListener("blur", this.handleInputerBlur.bind(this));
    }
    stylish() {
        this._dom.style.position = "fixed";
        this._dom.style.overflowY = "hidden";
        this._dom.style.fontSize = EditorView.PxPerLine + "px";
        this._dom.style.fontFamily = "微软雅黑";
    }
    handleInputerFocused(evt) {
        this._cursor.excite();
    }
    handleInputerBlur(evt) {
        this._cursor.setOff();
    }
    get inputerView() {
        return this._inputer;
    }
    get documentView() {
        return this._document;
    }
    get cursorView() {
        return this._cursor;
    }
    set width(w) {
        super.width = w;
        this._toolbar.width = w;
        this._document.width = w - this._marginMargin.width - this._scrollbar.width;
    }
    set height(h) {
        super.height = h;
        let v = h - this._toolbar.height;
        this._marginMargin.height = v;
        this._document.height = v;
        this._scrollbar.height = v;
    }
    set fontFamily(fm) {
        this._dom.style.fontFamily = fm;
    }
    dispose() {
        this._document.dispose();
        this._cursor.dispose();
    }
}
EditorView.PxPerLine = 16;
EditorView.DefaultLineMarginWidth = 40;
exports.EditorView = EditorView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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UUFDakIsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7UUFFaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxJQUFJLFVBQVUsQ0FBQyxFQUFVO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVELE9BQU87UUFDSCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDM0IsQ0FBQztBQUVMLENBQUM7QUF6RzBCLG9CQUFTLEdBQUcsRUFBRSxDQUFDO0FBQ2YsaUNBQXNCLEdBQUcsRUFBRSxDQUFDO0FBSDFDLGtCQUFVLGFBMkd0QixDQUFBIiwiZmlsZSI6InZpZXcvdmlld0VkaXRvci5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
