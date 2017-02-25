"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util");
const viewDocument_1 = require("./viewDocument");
const viewScrollBar_1 = require("./viewScrollBar");
const viewToolbar_1 = require("./viewToolbar");
const model_1 = require("../model");
class TooglePreviewEvent extends Event {
    constructor() {
        super("tooglePreview");
    }
}
exports.TooglePreviewEvent = TooglePreviewEvent;
function generateRightButtons(editorView) {
    return [
        {
            name: "tooglePreview",
            text: util_1.i18n.getString("toolbar.tooglePreview"),
            icon: "fa fa-eye",
            onClick: (e) => {
                let evt = new TooglePreviewEvent();
                editorView.element().dispatchEvent(evt);
            }
        }
    ];
}
class EditorView extends util_1.DomWrapper.FixedElement {
    constructor() {
        super("div", "mde-editor");
        this._model = null;
        this._dom.addEventListener("mousemove", (e) => this.handleMouseMove(e));
        this._toolbar = new viewToolbar_1.ToolbarView(this.generateToolbarMenus(), generateRightButtons(this));
        this._toolbar.top = 0;
        this._document = new viewDocument_1.DocumentView();
        this._document.top = this._toolbar.height;
        this._document.on("scroll", this.handleDocumentScroll.bind(this));
        this._document.on("scrollHeightChanged", this.handleDocumentScrollHeightChanged.bind(this));
        this._scrollbar = new viewScrollBar_1.ScrollBarView();
        this._scrollbar.top = this._toolbar.height;
        this._scrollbar.right = 0;
        this._toolbar.appendTo(this._dom);
        this._document.appendTo(this._dom);
        this._scrollbar.appendTo(this._dom);
        this._scrollbar.on("trainMove", this.handleScrollBarTrainMove.bind(this));
        this.isDisplay = true;
        setTimeout(() => {
            this._scrollbar.trainHeightPercentage = this.getScrollTrainHeightPercentage();
        }, 10);
    }
    copyToClipboard() {
        this._document.copyToClipboard();
    }
    pasteToDocument() {
        this._document.pasteToDocument();
    }
    cutToClipboard() {
        this._document.cutToClipboard();
    }
    undo() {
        this._document.undo();
    }
    redo() {
        this._document.redo();
    }
    bind(model) {
        this._model = model;
        this._document.bind(this._model);
        setTimeout(() => {
            this._scrollbar.trainHeightPercentage = this.getScrollTrainHeightPercentage();
        }, 10);
    }
    unbind() {
        this._document.unbind();
        this._model = null;
    }
    snippetBold() {
        if (this._document.selectionManager.length > 0) {
            let majorSelection = this._document.selectionManager.selectionAt(0);
            let pos = model_1.PositionUtil.clonePosition(majorSelection.beginPosition);
            if (majorSelection.collapsed) {
                let textEdit = new model_1.TextEdit(model_1.TextEditType.InsertText, majorSelection.beginPosition, "****");
                this._document.applyTextEdit(textEdit);
            }
            else {
                let textEdit = new model_1.TextEdit(model_1.TextEditType.ReplaceText, {
                    begin: majorSelection.beginPosition,
                    end: majorSelection.endPosition
                }, "****");
                this._document.applyTextEdit(textEdit);
            }
            setTimeout(() => {
                let tmp = model_1.PositionUtil.clonePosition(pos);
                tmp.offset += 2;
                majorSelection.beginPosition = majorSelection.endPosition = tmp;
                majorSelection.repaint();
                majorSelection.focus();
            }, 25);
        }
    }
    snippetItalic() {
        if (this._document.selectionManager.length > 0) {
            let majorSelection = this._document.selectionManager.selectionAt(0);
            let pos = model_1.PositionUtil.clonePosition(majorSelection.beginPosition);
            if (majorSelection.collapsed) {
                let textEdit = new model_1.TextEdit(model_1.TextEditType.InsertText, majorSelection.beginPosition, "**");
                this._document.applyTextEdit(textEdit);
            }
            else {
                let textEdit = new model_1.TextEdit(model_1.TextEditType.ReplaceText, {
                    begin: majorSelection.beginPosition,
                    end: majorSelection.endPosition
                }, "**");
                this._document.applyTextEdit(textEdit);
            }
            setTimeout(() => {
                let tmp = model_1.PositionUtil.clonePosition(pos);
                tmp.offset += 1;
                majorSelection.beginPosition = majorSelection.endPosition = tmp;
                majorSelection.repaint();
                majorSelection.focus();
            }, 25);
        }
    }
    snippetUnderline() {
        if (this._document.selectionManager.length > 0) {
            let majorSelection = this._document.selectionManager.selectionAt(0);
            let pos = model_1.PositionUtil.clonePosition(majorSelection.beginPosition);
            if (majorSelection.collapsed) {
                let textEdit = new model_1.TextEdit(model_1.TextEditType.InsertText, majorSelection.beginPosition, "____");
                this._document.applyTextEdit(textEdit);
            }
            else {
                let textEdit = new model_1.TextEdit(model_1.TextEditType.ReplaceText, {
                    begin: majorSelection.beginPosition,
                    end: majorSelection.endPosition
                }, "____");
                this._document.applyTextEdit(textEdit);
            }
            setTimeout(() => {
                let tmp = model_1.PositionUtil.clonePosition(pos);
                tmp.offset += 2;
                majorSelection.beginPosition = majorSelection.endPosition = tmp;
                majorSelection.repaint();
                majorSelection.focus();
            }, 25);
        }
    }
    snippetOrderedList() {
        if (this._document.selectionManager.length > 0) {
            let majorSelection = this._document.selectionManager.selectionAt(0);
            let pos;
            if (majorSelection.collapsed) {
                let textEdit = new model_1.TextEdit(model_1.TextEditType.InsertText, majorSelection.beginPosition, "\n1. ");
                pos = this._document.applyTextEdit(textEdit);
            }
            else {
                let textEdit = new model_1.TextEdit(model_1.TextEditType.ReplaceText, {
                    begin: majorSelection.beginPosition,
                    end: majorSelection.endPosition
                }, "\n1. ");
                pos = this._document.applyTextEdit(textEdit);
            }
            setTimeout(() => {
                majorSelection.beginPosition = majorSelection.endPosition = pos;
                majorSelection.repaint();
                majorSelection.focus();
            }, 25);
        }
    }
    snippetUnorderedList() {
        if (this._document.selectionManager.length > 0) {
            let majorSelection = this._document.selectionManager.selectionAt(0);
            let pos;
            if (majorSelection.collapsed) {
                let textEdit = new model_1.TextEdit(model_1.TextEditType.InsertText, majorSelection.beginPosition, "\n- ");
                pos = this._document.applyTextEdit(textEdit);
            }
            else {
                let textEdit = new model_1.TextEdit(model_1.TextEditType.ReplaceText, {
                    begin: majorSelection.beginPosition,
                    end: majorSelection.endPosition
                }, "\n- ");
                pos = this._document.applyTextEdit(textEdit);
            }
            setTimeout(() => {
                majorSelection.beginPosition = majorSelection.endPosition = pos;
                majorSelection.repaint();
                majorSelection.focus();
            }, 25);
        }
    }
    handleScrollBarTrainMove(evt) {
        let tmp = this._document.element().scrollHeight - this._document.element().clientHeight;
        this._document.scrollTop = tmp * evt.percentage;
    }
    getScrollPercentage() {
        let scrollTop = this._document.scrollTop, scrollHeight = this._document.element().scrollHeight, clientHeight = this._document.element().clientHeight;
        return scrollTop / (scrollHeight - clientHeight);
    }
    getScrollTrainHeightPercentage() {
        let clientHeight = this._document.element().clientHeight, scrollHeight = this._document.element().scrollHeight;
        return clientHeight / scrollHeight;
    }
    handleDocumentScroll(evt) {
        this._scrollbar.trainPositionPercentage = this.getScrollPercentage();
    }
    handleDocumentScrollHeightChanged(evt) {
        this._scrollbar.trainHeightPercentage = this.getScrollTrainHeightPercentage();
        this._scrollbar.trainPositionPercentage = this.getScrollPercentage();
    }
    handleMouseMove(e) {
        let rect = this._scrollbar.element().getBoundingClientRect();
        let cursorPos = {
            x: e.screenX,
            y: e.screenY,
        };
        let presist = false;
        if (e.clientX >= rect.left && e.clientX <= rect.right &&
            e.clientY >= rect.top && e.clientY <= rect.bottom) {
            presist = true;
        }
        this._scrollbar.excite(presist);
    }
    generateToolbarMenus() {
        return [
            {
                name: "bold",
                text: util_1.i18n.getString("toolbar.bold"),
                icon: "fa fa-bold",
                onClick: (e) => {
                    this.snippetBold();
                }
            },
            {
                name: "italic",
                text: util_1.i18n.getString("toolbar.italic"),
                icon: "fa fa-italic",
                onClick: (e) => {
                    this.snippetItalic();
                }
            },
            {
                name: "underline",
                text: util_1.i18n.getString("toolbar.underline"),
                icon: "fa fa-underline",
                onClick: (e) => {
                    this.snippetUnderline();
                }
            },
            {
                name: "orderedlist",
                text: util_1.i18n.getString("toolbar.orderedList"),
                icon: "fa fa-list-ol",
                onClick: (e) => {
                    this.snippetOrderedList();
                }
            },
            {
                name: "unorderedlist",
                text: util_1.i18n.getString("toolbar.unorderedList"),
                icon: "fa fa-list-ul",
                onClick: (e) => {
                    this.snippetUnorderedList();
                }
            }
        ];
    }
    get documentView() {
        return this._document;
    }
    set width(w) {
        super.width = w;
        this._toolbar.width = w;
        this._document.width = w;
    }
    get width() {
        return super.width;
    }
    set height(h) {
        super.height = h;
        let v = h - this._toolbar.height;
        this._document.height = v;
        this._scrollbar.height = v;
    }
    get height() {
        return super.height;
    }
    set fontFamily(fm) {
        this._dom.style.fontFamily = fm;
    }
    get isDisplay() {
        return this._isDisplay;
    }
    set isDisplay(v) {
        if (v !== this._isDisplay) {
            this._isDisplay = v;
            if (v) {
                this._dom.style.display = "block";
            }
            else {
                this._dom.style.display = "none";
            }
        }
    }
    dispose() {
        this._document.dispose();
        this._scrollbar.dispose();
        this._toolbar.dispose();
    }
}
EditorView.DefaultLineMarginWidth = 40;
EditorView.MinWidth = 100;
EditorView.SnippetRegex = /\$\{\d+:\w+\}/g;
exports.EditorView = EditorView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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
