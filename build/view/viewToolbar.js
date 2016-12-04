"use strict";
const util_1 = require("../util");
const viewButton_1 = require("./viewButton");
class ToolbarView extends util_1.DomHelper.FixedElement {
    constructor(options) {
        super("div", "mde-toolbar");
        this.height = ToolbarView.DefaultHeight;
        this._dom.style.overflowX = "scroll";
        this._dom.style.overflowY = "hidden";
        this._dom.style.whiteSpace = "nowrap";
        this.buttonContainer = util_1.DomHelper.elem("div", "toolbar-button-container");
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
        });
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdUb29sYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx1QkFBcUMsU0FDckMsQ0FBQyxDQUQ2QztBQUM5Qyw2QkFBeUIsY0FDekIsQ0FBQyxDQURzQztBQUd2QywwQkFBaUMsZ0JBQVMsQ0FBQyxZQUFZO0lBUW5ELFlBQVksT0FBdUI7UUFDL0IsTUFBTSxLQUFLLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFFNUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUMsYUFBYSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUNyQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO1FBRXRDLElBQUksQ0FBQyxlQUFlLEdBQW1CLGdCQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO1FBQ3pGLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUU1QyxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksR0FBRyxFQUFrQixDQUFDO1FBQ2hELE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFtQixFQUFFLEtBQVk7WUFDOUMsSUFBSSxFQUFFLEdBQUcsSUFBSSx1QkFBVSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBRTlFLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUUvQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBRTNDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQTtZQUN4QyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN0QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxvQkFBb0IsQ0FBQyxLQUFhO1FBQzlCLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO1lBQzlDLE1BQU0sSUFBSSxLQUFLLENBQUMsMkRBQTJELEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDekYsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELG1CQUFtQixDQUFDLElBQVk7UUFDNUIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUMsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQztZQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQyxJQUFJO1lBQ0EsTUFBTSxJQUFJLEtBQUssQ0FBQywrQkFBK0IsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQsa0JBQWtCLENBQUMsSUFBWTtRQUMzQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxLQUFhO1FBQzdCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELE9BQU87SUFDUCxDQUFDO0FBRUwsQ0FBQztBQTNEMEIseUJBQWEsR0FBRyxFQUFFLENBQUM7QUFGakMsbUJBQVcsY0E2RHZCLENBQUEiLCJmaWxlIjoidmlldy92aWV3VG9vbGJhci5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
