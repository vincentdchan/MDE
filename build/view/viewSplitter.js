"use strict";
const util_1 = require("../util");
class SplitterView extends util_1.DomHelper.FixedElement {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdTcGxpdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsa0NBQThDO0FBUzlDLGtCQUEwQixTQUFRLGdCQUFTLENBQUMsWUFBWTtJQU1wRCxZQUFZLFFBQWdCLENBQUMsQ0FBQztRQUMxQixLQUFLLENBQUMsS0FBSyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBRTdCLEtBQUssR0FBRyxLQUFLLElBQUksQ0FBQyxHQUFHLEtBQUssR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDO1FBQ3ZELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQzFCLENBQUM7SUFFRCxJQUFJLFNBQVM7UUFDVCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDO0lBRUQsSUFBSSxTQUFTLENBQUMsQ0FBVTtRQUNwQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7WUFFcEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDSixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQ3RDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1lBQ3JDLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUVELE9BQU87SUFDUCxDQUFDOztBQTdCc0IseUJBQVksR0FBRyxDQUFDLENBQUM7QUFGNUMsb0NBaUNDIiwiZmlsZSI6InZpZXcvdmlld1NwbGl0dGVyLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
