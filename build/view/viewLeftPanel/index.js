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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdMZWZ0UGFuZWwvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHVCQUFxQyxZQUNyQyxDQUFDLENBRGdEO0FBQ2pELDZCQUF5QixpQkFDekIsQ0FBQyxDQUR5QztBQUUxQyw0QkFBZ0UsZUFFaEUsQ0FBQztBQUZPLGdEQUFXO0FBQXFCLDREQUF1QztBQUUvRSxNQUFNLDZCQUE2QixHQUFvQjtJQUNuRDtRQUNJLElBQUksRUFBRSxjQUFjO1FBQ3BCLElBQUksRUFBRSxlQUFlO1FBQ3JCLElBQUksRUFBRSxZQUFZO0tBQ3JCO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsU0FBUztRQUNmLElBQUksRUFBRSxTQUFTO1FBQ2YsSUFBSSxFQUFFLFdBQVc7S0FDcEI7Q0FDSixDQUFDO0FBTUYsNkJBQTZCLGdCQUFTLENBQUMsZUFBZTtJQUtsRCxZQUFZLEtBQWEsRUFBRSxNQUFjLEVBQUUsT0FBdUI7UUFDOUQsTUFBTSxLQUFLLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztRQUgvQixlQUFVLEdBQW9CLElBQUksQ0FBQztRQUt2QyxLQUFLLEdBQUcsS0FBSyxJQUFHLENBQUMsR0FBRyxLQUFLLEdBQUcsY0FBYyxDQUFDLFlBQVksQ0FBQztRQUN4RCxNQUFNLEdBQUcsTUFBTSxJQUFHLENBQUMsR0FBRyxNQUFNLEdBQUcsY0FBYyxDQUFDLFlBQVksQ0FBQztRQUUzRCxJQUFJLENBQUMsVUFBVSxHQUFtQixnQkFBUyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsOEJBQThCLENBQUMsQ0FBQztRQUN4RixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLGNBQWMsQ0FBQyxZ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
