"use strict";
const util_1 = require("../util");
class SplitterView extends util_1.DomHelper.FixedElement {
    constructor(width = -1) {
        super("div", "mde-splitter");
        width = width >= 0 ? width : SplitterView.DefaultWidth;
        this.width = width;
        this._dom.style.background = "black";
        this._dom.style.cursor = "col-resize";
    }
    dispose() {
    }
}
SplitterView.DefaultWidth = 4;
exports.SplitterView = SplitterView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdTcGxpdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsdUJBQXFDLFNBRXJDLENBQUMsQ0FGNkM7QUFNOUMsMkJBQWtDLGdCQUFTLENBQUMsWUFBWTtJQUlwRCxZQUFZLEtBQUssR0FBVyxDQUFDLENBQUM7UUFDMUIsTUFBTSxLQUFLLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFFN0IsS0FBSyxHQUFHLEtBQUssSUFBSSxDQUFDLEdBQUcsS0FBSyxHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUM7UUFDdkQsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFFbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQztRQUNyQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDO0lBQzFDLENBQUM7SUFFRCxPQUFPO0lBQ1AsQ0FBQztBQUVMLENBQUM7QUFmMEIseUJBQVksR0FBRyxDQUFDLENBQUM7QUFGL0Isb0JBQVksZUFpQnhCLENBQUEiLCJmaWxlIjoidmlldy92aWV3U3BsaXR0ZXIuanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
