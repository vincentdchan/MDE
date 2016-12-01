"use strict";
const util_1 = require("../util");
const viewLeftPanel_1 = require("./viewLeftPanel");
const viewEditor_1 = require("./viewEditor");
const viewSplitter_1 = require("./viewSplitter");
class WindowView extends util_1.DomHelper.AppendableDomWrapper {
    constructor(_model) {
        super("div", "mde-window");
        this._mouseMoveHandler = null;
        this.requestWindowSize();
        let updateLayoutThunk = () => {
            let size = this.requestWindowSize();
            this.width = size.x;
            this.height = size.y;
        };
        window.addEventListener("resize", (e) => {
            setTimeout(updateLayoutThunk, 20);
        });
        this._model = _model;
        this._leftPanel = new viewLeftPanel_1.LeftPanelView(WindowView.leftPadWidth, this._height);
        this._leftPanel.appendTo(this._dom);
        this._splitter = new viewSplitter_1.SplitterView();
        this._splitter.appendTo(this._dom);
        this._editor = new viewEditor_1.EditorView(this._model);
        this._editor.appendTo(this._dom);
        updateLayoutThunk.call(this);
        this._splitter.marginLeft = this._leftPanel.width - this._splitter.width;
        this._splitter.element().style.opacity = "0.5";
        this._splitter.on("mousedown", this.handleSplitterMouseDown.bind(this));
        window.addEventListener("mouseup", this.handleWindowMouseUp.bind(this), true);
        this._editor.marginLeft = this._leftPanel.width;
        this._leftPanel.on("collapsed", (evt) => {
            this._splitter.element().style.display = "none";
        });
        this._leftPanel.on("expanded", (evt) => {
            this._splitter.element().style.display = "block";
        });
        this._leftPanel.navView.on("click", (evt) => {
            if (this._leftPanel.collapsed) {
                this._leftPanel.collapsed = false;
                this._leftPanel.width = WindowView.leftPadWidth;
                let v = this.requestWindowSize();
                this.forceSetWidth(v.x);
                this.forceSetHeight(v.y);
            }
            else {
                this._leftPanel.collapsed = true;
                let v = this.requestWindowSize();
                this.forceSetWidth(v.x);
                this.forceSetHeight(v.y);
            }
        });
    }
    handleSplitterMouseDown(evt) {
        evt.preventDefault();
        this._mouseMoveHandler = this.handleWindowMouseMove.bind(this);
        window.addEventListener("mousemove", this._mouseMoveHandler, true);
    }
    handleWindowMouseUp(evt) {
        if (this._mouseMoveHandler !== null) {
            window.removeEventListener("mousemove", this._mouseMoveHandler, true);
        }
    }
    handleWindowMouseMove(evt) {
        let offsetX = evt.clientX;
        if (offsetX < viewLeftPanel_1.LeftPanelView.MinWidth) {
            this._leftPanel.collapsed = true;
            this._editor.width = this._width - this._leftPanel.width;
            this._editor.marginLeft = this._leftPanel.width;
        }
        else if (offsetX >= viewLeftPanel_1.LeftPanelView.MinWidth && offsetX <= this._width - viewEditor_1.EditorView.MinWidth) {
            if (this._leftPanel.collapsed)
                this._leftPanel.collapsed = false;
            this._leftPanel.width = offsetX;
            this._splitter.marginLeft = offsetX - this._splitter.width;
            this._editor.width = this._width - offsetX;
            this._editor.marginLeft = offsetX;
        }
    }
    get width() {
        return this._width;
    }
    set width(w) {
        if (w !== this._width) {
            this.forceSetWidth(w);
        }
    }
    forceSetWidth(w) {
        this._width = w;
        this._editor.width = this._width - this._leftPanel.width;
        this._editor.marginLeft = this._leftPanel.width;
        this._splitter.marginLeft = this._leftPanel.width - this._splitter.width;
    }
    get height() {
        return this._height;
    }
    set height(h) {
        if (h !== this._height) {
            this.forceSetHeight(h);
        }
    }
    forceSetHeight(h) {
        this._height = h;
        this._leftPanel.height = h;
        this._splitter.height = h;
        this._editor.height = h;
    }
    get leftPanelView() {
        return this._leftPanel;
    }
    requestWindowSize() {
        return {
            x: document.documentElement.clientWidth,
            y: document.documentElement.clientHeight,
        };
    }
    get editorView() {
        return this._editor;
    }
    get splitterView() {
        return this._splitter;
    }
    dispose() {
        if (this._editor != null) {
            this._editor.dispose();
            this._editor = null;
        }
    }
}
WindowView.leftPadWidth = 220;
exports.WindowView = WindowView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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
