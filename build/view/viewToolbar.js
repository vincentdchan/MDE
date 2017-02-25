"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdUb29sYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0NBQStDO0FBQy9DLDZDQUF1QztBQUV2QywrREFBd0M7QUFFeEMsaUJBQXlCLFNBQVEsaUJBQVUsQ0FBQyxZQUFZO0lBUXBELFlBQVksT0FBdUIsRUFBRSxZQUE2QjtRQUM5RCxLQUFLLENBQUMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBRTVCLElBQUksQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDLGFBQWEsQ0FBQztRQUN4QyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQztRQUV0QyxJQUFJLENBQUMsZUFBZSxHQUFHLDBCQUFHLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRTVDLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxHQUFHLEVBQWtCLENBQUM7UUFFaEQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQW1CLEVBQUUsS0FBWTtZQUM5QyxJQUFJLEVBQUUsR0FBRyxJQUFJLHVCQUFVLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7WUFFOUUsRUFBRSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRS9CLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFD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
