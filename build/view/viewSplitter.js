"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util");
class SplitterView extends util_1.DomWrapper.FixedElement {
    constructor(width = -1) {
        super("div", "mde-splitter");
        width = width >= 0 ? width : SplitterView.DefaultWidth;
        this.width = width;
        this.isDisplay = true;
    }
    get isDisplay() {
        return this._isDisplay;
    }
    set isDisplay(v) {
        if (this._isDisplay !== v) {
            this._isDisplay = v;
            if (v) {
                this._dom.style.display = "block";
            }
            else {
                this._dom.style.display = "none";
            }
        }
    }
    dispose() {
    }
}
SplitterView.DefaultWidth = 4;
exports.SplitterView = SplitterView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdTcGxpdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtDQUErQztBQVMvQyxrQkFBMEIsU0FBUSxpQkFBVSxDQUFDLFlBQVk7SUFNckQsWUFBWSxRQUFnQixDQUFDLENBQUM7UUFDMUIsS0FBSyxDQUFDLEtBQUssRUFBRSxjQUFjLENBQUMsQ0FBQztRQUU3QixLQUFLLEdBQUcsS0FBSyxJQUFJLENBQUMsR0FBRyxLQUFLLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQztRQUN2RCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUMxQixDQUFDO0lBRUQsSUFBSSxTQUFTO1FBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQztJQUVELElBQUksU0FBUyxDQUFDLENBQVU7UUFDcEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1lBRXBCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ0osSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztZQUN0QyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztZQUNyQyxDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFFRCxPQUFPO0lBQ1AsQ0FBQzs7QUE3QnNCLHlCQUFZLEdBQUcsQ0FBQyxDQUFDO0FBRjVDLG9DQWlDQyIsImZpbGUiOiJ2aWV3L3ZpZXdTcGxpdHRlci5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
