"use strict";
const util_1 = require("../../util");
const viewButton_1 = require("./../viewButton");
var viewSetting_1 = require("./viewSetting");
exports.SettingView = viewSetting_1.SettingView;
exports.SettingOptionType = viewSetting_1.SettingOptionType;
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
class CollapseEvent {
}
class LeftPanelView extends util_1.DomHelper.FixedElement {
    constructor(width, height) {
        super("div", "mde-left-panel");
        this._nav_view = null;
        this._container = null;
        this._collapsed = false;
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
                let evt = new Event("collapsed");
                this._dom.dispatchEvent(evt);
            }
            else {
                this.width = this._remember_width;
                this._container.element().style.display = "block";
                let evt = new Event("expanded");
                this._dom.dispatchEvent(evt);
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
    get navView() {
        return this._nav_view;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdMZWZ0UGFuZWwvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHFDQUFpRDtBQUNqRCxnREFBMEM7QUFFMUMsNkNBQStFO0FBQXZFLG9DQUFBLFdBQVcsQ0FBQTtBQUFxQiwwQ0FBQSxpQkFBaUIsQ0FBQTtBQUV6RCxNQUFNLDZCQUE2QixHQUFvQjtJQUNuRDtRQUNJLElBQUksRUFBRSxjQUFjO1FBQ3BCLElBQUksRUFBRSxlQUFlO1FBQ3JCLElBQUksRUFBRSxZQUFZO0tBQ3JCO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsU0FBUztRQUNmLElBQUksRUFBRSxTQUFTO1FBQ2YsSUFBSSxFQUFFLFdBQVc7S0FDcEI7Q0FDSixDQUFDO0FBTUYsb0JBQXFCLFNBQVEsZ0JBQVMsQ0FBQyxlQUFlO0lBS2xELFlBQVksS0FBYSxFQUFFLE1BQWMsRUFBRSxPQUF1QjtRQUM5RCxLQUFLLENBQUMsS0FBSyxFQUFFLG9CQUFvQixDQUFDLENBQUM7UUFIL0IsZUFBVSxHQUFvQixJQUFJLENBQUM7UUFLdkMsS0FBSyxHQUFHLEtBQUssSUFBRyxDQUFDLEdBQUcsS0FBSyxHQUFHLGNBQWMsQ0FBQyxZQUFZLENBQUM7UUFDeEQsTUFBTSxHQUFHLE1BQU0sSUFBRyxDQUFDLEdBQUcsTUFBTSxHQUFHLGNBQWMsQ0FBQyxZQUFZLENBQUM7UUFFM0QsSUFBSSxDQUFDLFVBQVUsR0FBbUIsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLDhCQUE4QixDQUFDLENBQUM7UUFDeEYsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXZDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxjQUFjLENBQUMsWUFBWSxHQUFHLEdBQUcs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QUcsQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztJQUNyRCxDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ0wsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQUksTUFBTSxDQUFDLENBQVM7UUFDaEIsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ04sTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDeEIsQ0FBQztJQUVELElBQUksT0FBTztRQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFRCxPQUFPO1FBQ0gsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDckIsQ0FBQztJQUNMLENBQUM7O0FBOUVzQixzQkFBUSxHQUFHLEdBQUcsQ0FBQztBQUYxQyxzQ0FrRkMiLCJmaWxlIjoidmlldy92aWV3TGVmdFBhbmVsL2luZGV4LmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
