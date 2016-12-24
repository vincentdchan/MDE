"use strict";
const util_1 = require("../util");
const viewDocument_1 = require("./viewDocument");
const viewScrollBar_1 = require("./viewScrollBar");
const viewToolbar_1 = require("./viewToolbar");
function lastCharactor(str) {
    return str[str.length - 1];
}
function clonePosition(pos) {
    return {
        line: pos.line,
        offset: pos.offset
    };
}
let toolbarButtons = [
    {
        name: "bold",
        text: "Bold",
        icon: "fa fa-bold",
    },
    {
        name: "italic",
        text: "Italic",
        icon: "fa fa-italic",
    },
    {
        name: "underline",
        text: "Underline",
        icon: "fa fa-underline",
    },
    {
        name: "orderedlist",
        text: "Ordered List",
        icon: "fa fa-list-ol",
    },
    {
        name: "unorderedlist",
        text: "Unordered List",
        icon: "fa fa-list-ul",
    }
];
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
            text: "Toogle Preview",
            icon: "fa fa-eye",
            onClick: (e) => {
                let evt = new TooglePreviewEvent();
                editorView.element().dispatchEvent(evt);
            }
        }
    ];
}
class EditorView extends util_1.DomHelper.FixedElement {
    constructor() {
        super("div", "mde-editor");
        this._model = null;
        this._toolbar = new viewToolbar_1.ToolbarView(toolbarButtons, generateRightButtons(this));
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
        this.stylish();
        this._scrollbar.on("trainMove", this.handleScrollBarTrainMove.bind(this));
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
    stylish() {
        this._dom.style.overflowY = "hidden";
        this._dom.style.fontSize = EditorView.PxPerLine + "px";
        this._dom.style.fontFamily = "微软雅黑";
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
    get documentView() {
        return this._document;
    }
    set width(w) {
        super.width = w;
        this._toolbar.width = w;
        this._document.width = w - this._scrollbar.width;
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
    dispose() {
        this._document.dispose();
        this._scrollbar.dispose();
        this._toolbar.dispose();
    }
}
EditorView.PxPerLine = 16;
EditorView.DefaultLineMarginWidth = 40;
EditorView.MinWidth = 100;
exports.EditorView = EditorView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdFZGl0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHVCQUFxQyxTQUNyQyxDQUFDLENBRDZDO0FBRTlDLCtCQUEyQixnQkFDM0IsQ0FBQyxDQUQwQztBQUUzQyxnQ0FBNEMsaUJBQzVDLENBQUMsQ0FENEQ7QUFHN0QsOEJBQTBCLGVBQzFCLENBQUMsQ0FEd0M7QUFLekMsdUJBQXVCLEdBQVc7SUFDOUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQy9CLENBQUM7QUFFRCx1QkFBdUIsR0FBYTtJQUNoQyxNQUFNLENBQUM7UUFDSCxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUk7UUFDZCxNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU07S0FDckIsQ0FBQztBQUNOLENBQUM7QUFFRCxJQUFJLGNBQWMsR0FBb0I7SUFDbEM7UUFDSSxJQUFJLEVBQUUsTUFBTTtRQUNaLElBQUksRUFBRSxNQUFNO1FBQ1osSUFBSSxFQUFFLFlBQVk7S0FDckI7SUFDRDtRQUNJLElBQUksRUFBRSxRQUFRO1FBQ2QsSUFBSSxFQUFFLFFBQVE7UUFDZCxJQUFJLEVBQUUsY0FBYztLQUN2QjtJQUNEO1FBQ0ksSUFBSSxFQUFFLFdBQVc7UUFDakIsSUFBSSxFQUFFLFdBQVc7UUFDakIsSUFBSSxFQUFFLGlCQUFpQjtLQUMxQjtJQUNEO1FBQ0ksSUFBSSxFQUFFLGFBQWE7UUFDbkIsSUFBSSxFQUFFLGNBQWM7UUFDcEIsSUFBSSxFQUFFLGVBQWU7S0FDeEI7SUFDRDtRQUNJLElBQUksRUFBRSxlQUFlO1FBQ3JCLElBQUksRUFBRSxnQkFBZ0I7UUFDdEIsSUFBSSxFQUFFLGVBQWU7S0FDeEI7Q0FDSixDQUFBO0FBRUQsaUNBQXdDLEtBQUs7SUFFekM7UUFDSSxNQUFNLGVBQWUsQ0FBQyxDQUFDO0lBQzNCLENBQUM7QUFFTCxDQUFDO0FBTlksMEJBQWtCLHFCQU05QixDQUFBO0FBRUQsOEJB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QUFHLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELElBQUksTUFBTTtRQUNOLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFJLFVBQVUsQ0FBQyxFQUFVO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVELE9BQU87UUFDSCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM1QixDQUFDO0FBRUwsQ0FBQztBQWpKMEIsb0JBQVMsR0FBRyxFQUFFLENBQUM7QUFDZixpQ0FBc0IsR0FBRyxFQUFFLENBQUM7QUFDNUIsbUJBQVEsR0FBRyxHQUFHLENBQUM7QUFMN0Isa0JBQVUsYUFvSnRCLENBQUEiLCJmaWxlIjoidmlldy92aWV3RWRpdG9yLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
