"use strict";
const util_1 = require("../util");
const viewDocument_1 = require("./viewDocument");
const viewLineMargin_1 = require("./viewLineMargin");
const viewCursor_1 = require("./viewCursor");
const viewInputer_1 = require("./viewInputer");
class EditorView extends util_1.DomHelper.AppendableDomWrapper {
    constructor(_model) {
        super("div", "mde-editor");
        this._model = _model;
        this._document = new viewDocument_1.DocumentView(_model);
        this._document.marginLeft = EditorView.DefaultLineMarginWidth;
        this._document.render();
        this._margin = new viewLineMargin_1.LineMarginView();
        this._margin.width = EditorView.DefaultLineMarginWidth;
        let thk = () => {
            return this.scrollTop;
        };
        this._cursor = new viewCursor_1.CursorView(thk);
        this._inputer = new viewInputer_1.InputerView(thk);
        this._cursor.appendTo(this._dom);
        this._inputer.appendTo(this._dom);
        this._margin.appendTo(this._dom);
        this._document.appendTo(this._dom);
        this.stylish();
        this._inputer.addEventListener("focus", this.handleInputerFocused.bind(this));
        this._inputer.addEventListener("blur", this.handleInputerBlur.bind(this));
    }
    stylish() {
        this._dom.style.position = "fixed";
        this._dom.style.overflowY = "scroll";
        this._dom.style.fontSize = EditorView.PxPerLine + "px";
        this._dom.style.fontFamily = "Consolas";
    }
    handleInputerFocused(evt) {
        this._cursor.excite();
    }
    handleInputerBlur(evt) {
        this._cursor.setOff();
    }
    get scrollTop() {
        return this._dom.scrollTop;
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
    get width() {
        let rect = this._dom.getBoundingClientRect();
        return rect.width;
    }
    get height() {
        let rect = this._dom.getBoundingClientRect();
        return rect.height;
    }
    set width(w) {
        this._dom.style.width = w + "px";
    }
    set height(h) {
        this._dom.style.height = h + "px";
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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
