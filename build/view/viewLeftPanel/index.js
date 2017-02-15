"use strict";
const util_1 = require("../../util");
const viewButton_1 = require("./../viewButton");
var viewSetting_1 = require("./viewSetting");
exports.SettingView = viewSetting_1.SettingView;
exports.SettingOptionType = viewSetting_1.SettingOptionType;
const typescript_domhelper_1 = require("typescript-domhelper");
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
class NavigationView extends util_1.DomWrapper.AbsoluteElement {
    constructor(width, height, options) {
        super("div", "mde-left-panel-nav");
        this._container = null;
        width = width >= 0 ? width : NavigationView.DefaultWidth;
        height = height >= 0 ? height : NavigationView.DefaultWidth;
        this._container = typescript_domhelper_1.Dom.Div("mde-left-panel-nav-container");
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
class ContentContainer extends util_1.DomWrapper.AbsoluteElement {
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
        else if (util_1.DomWrapper.isIDOMWrapper(elem)) {
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
class LeftPanelView extends util_1.DomWrapper.FixedElement {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdMZWZ0UGFuZWwvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHFDQUFrRDtBQUNsRCxnREFBMEM7QUFFMUMsNkNBQStFO0FBQXZFLG9DQUFBLFdBQVcsQ0FBQTtBQUFxQiwwQ0FBQSxpQkFBaUIsQ0FBQTtBQUN6RCwrREFBd0M7QUFFeEMsTUFBTSw2QkFBNkIsR0FBb0I7SUFDbkQ7UUFDSSxJQUFJLEVBQUUsY0FBYztRQUNwQixJQUFJLEVBQUUsZUFBZTtRQUNyQixJQUFJLEVBQUUsWUFBWTtLQUNyQjtJQUNEO1FBQ0ksSUFBSSxFQUFFLFNBQVM7UUFDZixJQUFJLEVBQUUsU0FBUztRQUNmLElBQUksRUFBRSxXQUFXO0tBQ3BCO0NBQ0osQ0FBQztBQU1GLG9CQUFxQixTQUFRLGlCQUFVLENBQUMsZUFBZTtJQUtuRCxZQUFZLEtBQWEsRUFBRSxNQUFjLEVBQUUsT0FBdUI7UUFDOUQsS0FBSyxDQUFDLEtBQUssRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1FBSC9CLGVBQVUsR0FBb0IsSUFBSSxDQUFDO1FBS3ZDLEtBQUssR0FBRyxLQUFLLElBQUcsQ0FBQyxHQUFHLEtBQUssR0FBRyxjQUFjLENBQUMsWUFBWSxDQUFDO1FBQ3hELE1BQU0sR0FBRyxNQUFNLElBQUcsQ0FBQyxHQUFHLE1BQU0sR0FBRyxjQUFjLENBQUMsWUFBWSxDQUFDO1FBRTNELElBQUksQ0FBQyxVQUFVLEdBQUcsMEJBQUcsQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLGNBQWMsQ0FBQyxZQUFZLEdBQUcsR0FB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R0FBRyxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO0lBQ3JELENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDTCxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSSxNQUFNLENBQUMsQ0FBUztRQUNoQixLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxJQUFJLE1BQU07UUFDTixNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUN4QixDQUFDO0lBRUQsSUFBSSxPQUFPO1FBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUVELE9BQU87UUFDSCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNyQixDQUFDO0lBQ0wsQ0FBQzs7QUE5RXNCLHNCQUFRLEdBQUcsR0FBRyxDQUFDO0FBRjFDLHNDQWtGQyIsImZpbGUiOiJ2aWV3L3ZpZXdMZWZ0UGFuZWwvaW5kZXguanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
