"use strict";
const util_1 = require("../util");
const viewDocument_1 = require("./viewDocument");
const viewLineMargin_1 = require("./viewLineMargin");
const viewScrollBar_1 = require("./viewScrollBar");
const viewCursor_1 = require("./viewCursor");
const viewInputer_1 = require("./viewInputer");
const viewToolbar_1 = require("./viewToolbar");
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
class EditorView extends util_1.DomHelper.FixedElement {
    constructor(_model) {
        super("div", "mde-editor");
        this._timers = [];
        this._toolbar = new viewToolbar_1.ToolbarView(toolbarButtons);
        this._toolbar.top = 0;
        this._model = _model;
        this._document = new viewDocument_1.DocumentView(_model);
        this._document.top = this._toolbar.height;
        this._document.marginLeft = EditorView.DefaultLineMarginWidth;
        this._document.on("scroll", this.handleDocumentScroll.bind(this));
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
        this._scrollbar.on("trainMove", this.handleScrollBarTrainMove.bind(this));
        this._timers.push(setTimeout(() => {
            this._scrollbar.trainHeightPercentage = this.getScrollTrainHeightPercentage();
        }, 10));
    }
    reload(_model) {
        this.documentView.reload(_model);
        this.documentView.render();
        this._scrollbar.trainHeightPercentage = this.getScrollTrainHeightPercentage();
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
    get width() {
        return super.width;
    }
    set height(h) {
        super.height = h;
        let v = h - this._toolbar.height;
        this._marginMargin.height = v;
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
        this._marginMargin.dispose();
        this._cursor.dispose();
        this._inputer.dispose();
        this._timers.forEach((e) => {
            clearTimeout(e);
        });
    }
}
EditorView.PxPerLine = 16;
EditorView.DefaultLineMarginWidth = 40;
EditorView.MinWidth = 100;
exports.EditorView = EditorView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdFZGl0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHVCQUFxQyxTQUNyQyxDQUFDLENBRDZDO0FBQzlDLCtCQUEyQixnQkFDM0IsQ0FBQyxDQUQwQztBQUMzQyxpQ0FBNkIsa0JBQzdCLENBQUMsQ0FEOEM7QUFDL0MsZ0NBQTRDLGlCQUM1QyxDQUFDLENBRDREO0FBQzdELDZCQUF5QixjQUN6QixDQUFDLENBRHNDO0FBQ3ZDLDhCQUEwQixlQUMxQixDQUFDLENBRHdDO0FBQ3pDLDhCQUEwQixlQUMxQixDQUFDLENBRHdDO0FBSXpDLElBQUksY0FBYyxHQUFvQjtJQUNsQztRQUNJLElBQUksRUFBRSxNQUFNO1FBQ1osSUFBSSxFQUFFLE1BQU07UUFDWixJQUFJLEVBQUUsWUFBWTtLQUNyQjtJQUNEO1FBQ0ksSUFBSSxFQUFFLFFBQVE7UUFDZCxJQUFJLEVBQUUsUUFBUTtRQUNkLElBQUksRUFBRSxjQUFjO0tBQ3ZCO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsV0FBVztRQUNqQixJQUFJLEVBQUUsV0FBVztRQUNqQixJQUFJLEVBQUUsaUJBQWlCO0tBQzFCO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsYUFBYTtRQUNuQixJQUFJLEVBQUUsY0FBYztRQUNwQixJQUFJLEVBQUUsZUFBZTtLQUN4QjtJQUNEO1FBQ0ksSUFBSSxFQUFFLGVBQWU7UUFDckIsSUFBSSxFQUFFLGdCQUFnQjtRQUN0QixJQUFJLEVBQUUsZUFBZTtLQUN4QjtDQUNKLENBQUE7QUFFRCx5QkFBZ0MsZ0JBQVMsQ0FBQyxZQUFZO0lBZWxELFlBQVksTUFBaUI7UUFDekIsTUFBTSxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFIdkIsWUFBTyxHQUFtQixFQUFFLENBQUM7UUFLakMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLHlCQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FB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
