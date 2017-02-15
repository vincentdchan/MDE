"use strict";
const util_1 = require("../util");
const viewButton_1 = require("./viewButton");
const typescript_domhelper_1 = require("typescript-domhelper");
class ToolbarView extends util_1.DomWrapper.FixedElement {
    constructor(options, rightOptions) {
        super("div", "mde-toolbar");
        this.height = ToolbarView.DefaultHeight;
        this._dom.style.overflowX = "scroll";
        this._dom.style.overflowY = "hidden";
        this._dom.style.whiteSpace = "nowrap";
        this.buttonContainer = typescript_domhelper_1.Dom.Div("toolbar-button-container");
        this._dom.appendChild(this.buttonContainer);
        this.buttonViews = [];
        this.buttonNamesMap = new Map();
        options.forEach((value, index) => {
            let bv = new viewButton_1.ButtonView(ToolbarView.DefaultHeight, ToolbarView.DefaultHeight);
            bv.setContentFromOption(value);
            this.buttonViews.push(bv);
            this.buttonNamesMap.set(value.name, index);
            bv.element().style.position = "relative";
            bv.appendTo(this.buttonContainer);
            if (value.onClick) {
                bv.on("click", (e) => {
                    value.onClick(e);
                });
            }
        });
        if (rightOptions) {
            rightOptions.forEach((value, index) => {
                let bv = new viewButton_1.ButtonView(ToolbarView.DefaultHeight, ToolbarView.DefaultHeight);
                bv.setContentFromOption(value);
                this.buttonViews.push(bv);
                this.buttonNamesMap.set(value.name, index);
                bv.element().style.position = "relative";
                bv.element().style.cssFloat = "right";
                bv.appendTo(this.buttonContainer);
                if (value.onClick) {
                    bv.on("click", (e) => {
                        value.onClick(e);
                    });
                }
            });
        }
    }
    getButtonViewByIndex(index) {
        if (index < 0 || index >= this.buttonViews.length)
            throw new Error("Index out of range, can not find the button view. #Index:" + index);
        return this.buttonViews[index];
    }
    getButtonViewByName(name) {
        let index = this.buttonNamesMap.get(name);
        if (index !== undefined)
            return this.buttonViews[index];
        else
            throw new Error("Button doesn't exisit. #Name:" + name);
    }
    removeButtonByName(name) {
        let button = this.getButtonViewByName(name);
        button.dispose();
    }
    removeButtonByIndex(index) {
        let button = this.getButtonViewByIndex(index);
        button.dispose();
    }
    dispose() {
    }
}
ToolbarView.DefaultHeight = 36;
exports.ToolbarView = ToolbarView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdUb29sYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxrQ0FBK0M7QUFDL0MsNkNBQXVDO0FBRXZDLCtEQUF3QztBQUV4QyxpQkFBeUIsU0FBUSxpQkFBVSxDQUFDLFlBQVk7SUFRcEQsWUFBWSxPQUF1QixFQUFFLFlBQTZCO1FBQzlELEtBQUssQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFFNUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUMsYUFBYSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUNyQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO1FBRXRDLElBQUksQ0FBQyxlQUFlLEdBQUcsMEJBQUcsQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFNUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLEdBQUcsRUFBa0IsQ0FBQztRQUVoRCxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBbUIsRUFBRSxLQUFZO1lBQzlDLElBQUksRUFBRSxHQUFHLElBQUksdUJBQVUsQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUU5RSxFQUFFLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFL0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztZQUUzQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUE7WUFDeEMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7WUFFbEMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLEVBQUUsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBYTtvQkFDekIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckIsQ0FBQyxDQUFDLENBQUE7WUFDTixDQUFDO1FBRUwsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ2YsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQW1CLEVBQUUsS0FBYTtnQkFDcEQsSUFBSSxFQUFFLEdBQUcsSUFBSSx1QkFBVSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUU5RSxFQUFFLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRS9CLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUMxQixJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUUzQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUE7Z0JBQ3hDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztnQkFDdEMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBRWxDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUNoQixFQUFFLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQWE7d0JBQ3pCLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3JCLENBQUMsQ0FBQyxDQUFBO2dCQUNOLENBQUM7WUFFTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7SUFFTCxDQUFDO0lBRUQsb0JBQW9CLENBQUMsS0FBYTtRQUM5QixFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztZQUM5QyxNQUFNLElBQUksS0FBSyxDQUFDLDJEQUEyRCxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQ3pGLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxJQUFZO1FBQzVCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUM7WUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkMsSUFBSTtZQUNBLE1BQU0sSUFBSSxLQUFLLENBQUMsK0JBQStCLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVELGtCQUFrQixDQUFDLElBQVk7UUFDM0IsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsbUJBQW1CLENBQUMsS0FBYTtRQUM3QixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxPQUFPO0lBQ1AsQ0FBQzs7QUF4RnNCLHlCQUFhLEdBQUcsRUFBRSxDQUFDO0FBRjlDLGtDQTRGQyIsImZpbGUiOiJ2aWV3L3ZpZXdUb29sYmFyLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
