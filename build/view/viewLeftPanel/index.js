"use strict";
const util_1 = require("../../util");
const viewButton_1 = require("./../viewButton");
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
class CollapseEvent {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdMZWZ0UGFuZWwvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHVCQUFxQyxZQUNyQyxDQUFDLENBRGdEO0FBQ2pELDZCQUF5QixpQkFDekIsQ0FBQyxDQUR5QztBQUcxQyxNQUFNLDZCQUE2QixHQUFvQjtJQUNuRDtRQUNJLElBQUksRUFBRSxjQUFjO1FBQ3BCLElBQUksRUFBRSxlQUFlO1FBQ3JCLElBQUksRUFBRSxZQUFZO0tBQ3JCO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsU0FBUztRQUNmLElBQUksRUFBRSxTQUFTO1FBQ2YsSUFBSSxFQUFFLFdBQVc7S0FDcEI7Q0FDSixDQUFDO0FBTUYsNkJBQTZCLGdCQUFTLENBQUMsZUFBZTtJQUtsRCxZQUFZLEtBQWEsRUFBRSxNQUFjLEVBQUUsT0FBdUI7UUFDOUQsTUFBTSxLQUFLLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztRQUgvQixlQUFVLEdBQW9CLElBQUksQ0FBQztRQUt2QyxLQUFLLEdBQUcsS0FBSyxJQUFHLENBQUMsR0FBRyxLQUFLLEdBQUcsY0FBYyxDQUFDLFlBQVksQ0FBQztRQUN4RCxNQUFNLEdBQUcsTUFBTSxJQUFHLENBQUMsR0FBRyxNQUFNLEdBQUcsY0FBYyxDQUFDLFlBQVksQ0FBQztRQUUzRCxJQUFJLENBQUMsVUFBVSxHQUFtQixnQkFBUyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsOEJBQThCLENBQUMsQ0FBQztRQUN4RixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLGNBQWMsQ0FBQyxZQUFZLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQztRQUNwRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDO1FBRXBDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxZQUFZO1lBQ3pCLElBQUksRUFBRSxHQUFHLElBQUksdUJBQVUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDdEMsRUFBRSxDQUFDLG9CQUFvQixDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3RDLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELE9BQU87UUFDSCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNyQixDQUFDO0lBQ0wsQ0FBQztBQUVMLENBQUM7QUEvQjBCLDJCQUFZLEdBQUcsRUFBRSxDQStCM0M7QUFFRCwrQkFBK0IsZ0JBQVMsQ0FBQyxlQUFlO0lBRXBEO1FBQ0ksTUFBTSxLQUFLLEVBQUUsa0NBQWtDLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBSUQsWUFBWTtRQUNSLE9BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQy9DLENBQUM7SUFDTCxDQUFDO0lBRUQsV0FBVyxDQUFDLElBQWtDO1FBQzFDLEVBQUUsQ0FBQyxDQUFDLElBQUksWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE1BQU0sSUFBSSxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUNqRCxDQUFDO0lBQ0wsQ0FBQztJQUVELE9BQU87UUFDSCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNyQixDQUFDO0lBQ0wsQ0FBQztBQUVMLENBQUM7QUFFRDtBQUVBLENBQUM7QUFRRCw0QkFBbUMsZ0JBQVMsQ0FBQyxZQUFZO0lBUXJELFlBQVksS0FBYSxFQUFFLE1BQWM7UUFDckMsTUFBTSxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQU4zQixjQUFTLEdBQW9CLElBQUksQ0FBQztRQUNsQyxlQUFVLEdBQXNCLElBQUksQ0FBQztRQUNyQyxlQUFVLEdBQWEsS0FBSyxDQUFDO1FBTWpDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxXQUFXLENBQUM7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztRQUVsQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUNsQyxNQUFNLEVBQUUsNkJBQTZCLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFbkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7UUFDbEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXBDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBRXpCLENBQUM7SUFFRCxJQUFJLFNBQVM7UUFDVCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDO0lBRUQsSUFBSSxTQUFTLENBQUMsQ0FBVztRQUNyQixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7WUFFcEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDbEMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztnQkFFbEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztnQkFFakQsSUFBSSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7Z0JBRWxELElBQUksR0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQyxDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFFRCxJQUFJLEtBQUssQ0FBQyxDQUFTO1FBQ2YsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO0lBQ3JELENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDTCxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSSxNQUFNLENBQUMsQ0FBUztRQUNoQixLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxJQUFJLE1BQU07UUFDTixNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUN4QixDQUFDO0lBRUQsSUFBSSxPQUFPO1FBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUVELE9BQU87UUFDSCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNyQixDQUFDO0lBQ0wsQ0FBQztBQUVMLENBQUM7QUFqRjBCLHNCQUFRLEdBQUcsR0FBRyxDQUFDO0FBRjdCLHFCQUFhLGdCQW1GekIsQ0FBQSIsImZpbGUiOiJ2aWV3L3ZpZXdMZWZ0UGFuZWwvaW5kZXguanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
