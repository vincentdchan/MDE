"use strict";
const util_1 = require("../util");
class LineMarginView extends util_1.DomHelper.FixedElement {
    constructor() {
        super("div", "mde-line-margin");
        this.width = LineMarginView.DefaultWidth;
    }
    dispose() {
        if (this._dom != null) {
            this._dom.remove();
            this._dom = null;
        }
    }
}
LineMarginView.DefaultWidth = 30;
exports.LineMarginView = LineMarginView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdMaW5lTWFyZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx1QkFBcUMsU0FFckMsQ0FBQyxDQUY2QztBQUU5Qyw2QkFBb0MsZ0JBQVMsQ0FBQyxZQUFZO0lBSXREO1FBQ0ksTUFBTSxLQUFLLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUVoQyxJQUFJLENBQUMsS0FBSyxHQUFHLGNBQWMsQ0FBQyxZQUFZLENBQUM7SUFDN0MsQ0FBQztJQUVELE9BQU87UUFDSCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNyQixDQUFDO0lBQ0wsQ0FBQztBQUVMLENBQUM7QUFmMEIsMkJBQVksR0FBRyxFQUFFLENBQUM7QUFGaEMsc0JBQWMsaUJBaUIxQixDQUFBIiwiZmlsZSI6InZpZXcvdmlld0xpbmVNYXJnaW4uanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
