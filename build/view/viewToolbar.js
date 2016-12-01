"use strict";
const util_1 = require("../util");
const viewButton_1 = require("./viewButton");
class ToolbarView extends util_1.DomHelper.FixedElement {
    constructor(options) {
        super("div", "mde-toolbar");
        this.height = ToolbarView.DefaultHeight;
        this._dom.style.background = "grey";
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
        if (this._dom != null) {
            this._dom.remove();
            this._dom = null;
        }
    }
}
ToolbarView.DefaultHeight = 36;
exports.ToolbarView = ToolbarView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdUb29sYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx1QkFBcUMsU0FDckMsQ0FBQyxDQUQ2QztBQUM5Qyw2QkFBeUIsY0FDekIsQ0FBQyxDQURzQztBQUd2QywwQkFBaUMsZ0JBQVMsQ0FBQyxZQUFZO0lBUW5ELFlBQVksT0FBdUI7UUFDL0IsTUFBTSxLQUFLLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFFNUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUMsYUFBYSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7UUFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUNyQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7UUFFdEMsSUFBSSxDQUFDLGVBQWUsR0FBbUIsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLDBCQUEwQixDQUFDLENBQUM7UUFDekYsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRTVDLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxHQUFHLEVBQWtCLENBQUM7UUFDaEQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQW1CLEVBQUUsS0FBWTtZQUM5QyxJQUFJLEVBQUUsR0FBRyxJQUFJLHVCQUFVLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7WUFFOUUsRUFBRSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRS9CLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFFM0MsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFBO1lBQ3hDLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3RDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELG9CQUFvQixDQUFDLEtBQWE7UUFDOUIsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7WUFDOUMsTUFBTSxJQUFJLEtBQUssQ0FBQywyREFBMkQsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUN6RixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsbUJBQW1CLENBQUMsSUFBWTtRQUM1QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDO1lBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25DLElBQUk7WUFDQSxNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxJQUFZO1FBQzNCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELG1CQUFtQixDQUFDLEtBQWE7UUFDN0IsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsT0FBTztRQUNILEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLENBQUM7SUFDTCxDQUFDO0FBRUwsQ0FBQztBQWhFMEIseUJBQWEsR0FBRyxFQUFFLENBQUM7QUFGakMsbUJBQVcsY0FrRXZCLENBQUEiLCJmaWxlIjoidmlldy92aWV3VG9vbGJhci5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
