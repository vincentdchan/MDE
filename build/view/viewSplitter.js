"use strict";
const util_1 = require("../util");
class SplitterView extends util_1.DomHelper.FixedElement {
    constructor(width = -1) {
        super("div", "mde-splitter");
        width = width >= 0 ? width : SplitterView.DefaultWidth;
        this.width = width;
    }
    dispose() {
    }
}
SplitterView.DefaultWidth = 4;
exports.SplitterView = SplitterView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdTcGxpdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsdUJBQXFDLFNBRXJDLENBQUMsQ0FGNkM7QUFNOUMsMkJBQWtDLGdCQUFTLENBQUMsWUFBWTtJQUlwRCxZQUFZLEtBQUssR0FBVyxDQUFDLENBQUM7UUFDMUIsTUFBTSxLQUFLLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFFN0IsS0FBSyxHQUFHLEtBQUssSUFBSSxDQUFDLEdBQUcsS0FBSyxHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUM7UUFDdkQsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQztJQUVELE9BQU87SUFDUCxDQUFDO0FBRUwsQ0FBQztBQVowQix5QkFBWSxHQUFHLENBQUMsQ0FBQztBQUYvQixvQkFBWSxlQWN4QixDQUFBIiwiZmlsZSI6InZpZXcvdmlld1NwbGl0dGVyLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
