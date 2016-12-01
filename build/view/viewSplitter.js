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
        if (this._dom !== null) {
            this._dom.remove();
            this._dom = null;
        }
    }
}
SplitterView.DefaultWidth = 4;
exports.SplitterView = SplitterView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdTcGxpdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsdUJBQXFDLFNBRXJDLENBQUMsQ0FGNkM7QUFNOUMsMkJBQWtDLGdCQUFTLENBQUMsWUFBWTtJQUlwRCxZQUFZLEtBQUssR0FBVyxDQUFDLENBQUM7UUFDMUIsTUFBTSxLQUFLLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFFN0IsS0FBSyxHQUFHLEtBQUssSUFBSSxDQUFDLEdBQUcsS0FBSyxHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUM7UUFDdkQsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFFbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQztRQUNyQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDO0lBQzFDLENBQUM7SUFFRCxPQUFPO1FBQ0gsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDckIsQ0FBQztJQUNMLENBQUM7QUFFTCxDQUFDO0FBbkIwQix5QkFBWSxHQUFHLENBQUMsQ0FBQztBQUYvQixvQkFBWSxlQXFCeEIsQ0FBQSIsImZpbGUiOiJ2aWV3L3ZpZXdTcGxpdHRlci5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
