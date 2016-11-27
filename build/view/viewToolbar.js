"use strict";
const util_1 = require("../util");
class ToolbarView extends util_1.DomHelper.FixedElement {
    constructor() {
        super("div", "mde-toolbar");
        this.height = ToolbarView.DefaultHeight;
        this._dom.style.background = "grey";
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdUb29sYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx1QkFBcUMsU0FFckMsQ0FBQyxDQUY2QztBQUU5QywwQkFBaUMsZ0JBQVMsQ0FBQyxZQUFZO0lBSW5EO1FBQ0ksTUFBTSxLQUFLLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFFNUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUMsYUFBYSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7SUFDeEMsQ0FBQztJQUVELE9BQU87UUFDSCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNyQixDQUFDO0lBQ0wsQ0FBQztBQUVMLENBQUM7QUFoQjBCLHlCQUFhLEdBQUcsRUFBRSxDQUFDO0FBRmpDLG1CQUFXLGNBa0J2QixDQUFBIiwiZmlsZSI6InZpZXcvdmlld1Rvb2xiYXIuanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
