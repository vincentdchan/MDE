"use strict";
const util_1 = require("../util");
const viewButton_1 = require("./viewButton");
const DefaultLeftPanelButtonOptions = [
    {
        name: "textAnalyzer",
        text: "Text Analyzer",
        icon: "fa fa-code",
    },
    {
        name: "setting",
        text: "Setting",
        icon: "fa fa-cog",
    }
];
class NavigationView extends util_1.DomHelper.AbsoluteElement {
    constructor(width, height, options) {
        super("div", "mde-left-panel-nav");
        this._container = null;
        width = width >= 0 ? width : NavigationView.DefaultWidth;
        height = height >= 0 ? height : NavigationView.DefaultWidth;
        this._container = util_1.DomHelper.elem("div", "mde-left-panel-nav-container");
        this._dom.appendChild(this._container);
        this.width = width;
        this.height = height;
        this._dom.style.fontSize = NavigationView.DefaultWidth * 0.6 + "px";
        this._dom.style.background = "grey";
        options.forEach((ButtonOption) => {
            let bv = new viewButton_1.ButtonView(width, width);
            bv.setContentFromOption(ButtonOption);
            bv.appendTo(this._container);
        });
    }
    dispose() {
        if (this._dom != null) {
            this._dom.remove();
            this._dom = null;
        }
    }
}
NavigationView.DefaultWidth = 48;
class ContentContainer extends util_1.DomHelper.AbsoluteElement {
    constructor() {
        super("div", "mde-left-panel-content-container");
    }
    clearContent() {
        while (this._dom.lastChild) {
            this._dom.removeChild(this._dom.lastChild);
        }
    }
    appendChild(elem) {
        if (elem instanceof Node) {
            this._dom.appendChild(elem);
        }
        else if (util_1.DomHelper.isIDOMWrapper(elem)) {
            elem.appendTo(this._dom);
        }
        else {
            throw new Error("Appending the wrong type.");
        }
    }
    dispose() {
        if (this._dom !== null) {
            this._dom.remove();
            this._dom = null;
        }
    }
}
class LeftPanelView extends util_1.DomHelper.FixedElement {
    constructor(width, height) {
        super("div", "mde-left-panel");
        this._nav_view = null;
        this._container = null;
        this._collapsed = false;
        this._dom.style.background = "lightgrey";
        this._dom.style.cssFloat = "left";
        this._nav_view = new NavigationView(-1, height, DefaultLeftPanelButtonOptions);
        this._nav_view.appendTo(this._dom);
        this._container = new ContentContainer();
        this._container.marginLeft = this._nav_view.width;
        this._container.appendTo(this._dom);
        this.width = width;
        this.height = height;
    }
    get collapsed() {
        return this._collapsed;
    }
    set collapsed(v) {
        if (v !== this._collapsed) {
            this._collapsed = v;
            if (this._collapsed) {
                this._remember_width = this.width;
                this.width = this._nav_view.width;
                this._container.element().style.display = "none";
            }
            else {
                this.width = this._remember_width;
                this._container.element().style.display = "block";
            }
        }
    }
    set width(w) {
        super.width = w;
        this._container.width = w - this._nav_view.width;
    }
    get width() {
        return super.width;
    }
    set height(h) {
        super.height = h;
        this._nav_view.height = h;
        this._container.height = h;
    }
    get height() {
        return super.height;
    }
    dispose() {
        if (this._dom != null) {
            this._dom.parentElement.removeChild(this._dom);
            this._dom = null;
        }
    }
}
LeftPanelView.MinWidth = 100;
exports.LeftPanelView = LeftPanelView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdMZWZ0UGFuZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHVCQUFxQyxTQUNyQyxDQUFDLENBRDZDO0FBQzlDLDZCQUF5QixjQUN6QixDQUFDLENBRHNDO0FBR3ZDLE1BQU0sNkJBQTZCLEdBQW9CO0lBQ25EO1FBQ0ksSUFBSSxFQUFFLGNBQWM7UUFDcEIsSUFBSSxFQUFFLGVBQWU7UUFDckIsSUFBSSxFQUFFLFlBQVk7S0FDckI7SUFDRDtRQUNJLElBQUksRUFBRSxTQUFTO1FBQ2YsSUFBSSxFQUFFLFNBQVM7UUFDZixJQUFJLEVBQUUsV0FBVztLQUNwQjtDQUNKLENBQUM7QUFFRiw2QkFBNkIsZ0JBQVMsQ0FBQyxlQUFlO0lBS2xELFlBQVksS0FBYSxFQUFFLE1BQWMsRUFBRSxPQUF1QjtRQUM5RCxNQUFNLEtBQUssRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1FBSC9CLGVBQVUsR0FBb0IsSUFBSSxDQUFDO1FBS3ZDLEtBQUssR0FBRyxLQUFLLElBQUcsQ0FBQyxHQUFHLEtBQUssR0FBRyxjQUFjLENBQUMsWUFBWSxDQUFDO1FBQ3hELE1BQU0sR0FBRyxNQUFNLElBQUcsQ0FBQyxHQUFHLE1BQU0sR0FBRyxjQUFjLENBQUMsWUFBWSxDQUFDO1FBRTNELElBQUksQ0FBQyxVQUFVLEdBQW1CLGdCQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSw4QkFBOEIsQ0FBQyxDQUFDO1FBQ3hGLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUV2QyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsY0FBYyxDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDO1FBQ3BFLElBQUksQ0FBQyxJQUFJLENBQUMs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dkIsQ0FBQztJQUVELElBQUksTUFBTSxDQUFDLENBQVM7UUFDaEIsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ04sTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDeEIsQ0FBQztJQUVELE9BQU87UUFDSCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNyQixDQUFDO0lBQ0wsQ0FBQztBQUVMLENBQUM7QUF0RTBCLHNCQUFRLEdBQUcsR0FBRyxDQUFDO0FBRjdCLHFCQUFhLGdCQXdFekIsQ0FBQSIsImZpbGUiOiJ2aWV3L3ZpZXdMZWZ0UGFuZWwuanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
