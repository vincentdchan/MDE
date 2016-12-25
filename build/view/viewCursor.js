"use strict";
const util_1 = require("../util");
(function (CursorState) {
    CursorState[CursorState["Blink"] = 0] = "Blink";
    CursorState[CursorState["AlwaysOn"] = 1] = "AlwaysOn";
    CursorState[CursorState["AlwaysOff"] = 2] = "AlwaysOff";
})(exports.CursorState || (exports.CursorState = {}));
var CursorState = exports.CursorState;
class CursorView extends util_1.DomHelper.AppendableDomWrapper {
    constructor(isMajor, ticktock) {
        super("div", "mde-cursor");
        this._state = CursorState.Blink;
        this._isMajor = isMajor;
        this._ticktock = ticktock;
        this._dom.style.position = "absolute";
        this._dom.style.height = "22px";
        this._dom.style.width = "2px";
        if (this._isMajor)
            this._dom.classList.add("major");
        this.initializeBlinking();
    }
    initializeBlinking() {
        this._ticktock_pair = {
            tick: () => {
                if (this._state !== CursorState.AlwaysOff)
                    this._dom.style.opacity = "1";
            },
            tock: () => {
                if (this._state !== CursorState.AlwaysOn)
                    this._dom.style.opacity = "0";
            },
        };
        this._ticktock.register(this._ticktock_pair);
    }
    clearInterval() {
        this._ticktock.unregister(this._ticktock_pair);
    }
    get state() {
        return this._state;
    }
    set state(s) {
        this._state = s;
    }
    hide() {
        this._dom.style.display = "none";
    }
    show() {
        this._dom.style.display = "block";
    }
    isMajor() {
        return this._isMajor;
    }
    isHidden() {
        return this._dom.style.display == "none";
    }
    excite() {
        this.clearInterval();
        this._dom.style.opacity = "1";
        this.initializeBlinking();
    }
    setOff() {
        this.clearInterval();
        this._dom.style.opacity = "0";
    }
    setAbsoluteCoordinate(coordinate) {
        this._dom.style.left = coordinate.x + "px";
        this._dom.style.top = coordinate.y + "px";
    }
    dispose() {
        this.clearInterval();
    }
}
exports.CursorView = CursorView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdDdXJzb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHVCQUFpRSxTQUNqRSxDQUFDLENBRHlFO0FBRzFFLFdBQVksV0FBVztJQUNuQiwrQ0FBSyxDQUFBO0lBQUUscURBQVEsQ0FBQTtJQUFFLHVEQUFTLENBQUE7QUFDOUIsQ0FBQyxFQUZXLG1CQUFXLEtBQVgsbUJBQVcsUUFFdEI7QUFGRCxJQUFZLFdBQVcsR0FBWCxtQkFFWCxDQUFBO0FBRUQseUJBQWdDLGdCQUFTLENBQUMsb0JBQW9CO0lBVTFELFlBQVksT0FBTyxFQUFFLFFBQXNCO1FBQ3ZDLE1BQU0sS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBSHZCLFdBQU0sR0FBZ0IsV0FBVyxDQUFDLEtBQUssQ0FBQztRQUs1QyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUV4QixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUU5QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXBELElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFTyxrQkFBa0I7UUFFdEIsSUFBSSxDQUFDLGNBQWMsR0FBRztZQUNsQixJQUFJLEVBQUU7Z0JBQ0YsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxXQUFXLENBQUMsU0FBUyxDQUFDO29CQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUE7WUFDNUUsQ0FBQztZQUNELElBQUksRUFBRTtnQkFDRixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLFdBQVcsQ0FBQyxRQUFRLENBQUM7b0JBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQTtZQUMzRSxDQUFDO1NBQ0osQ0FBQTtRQUVELElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUVqRCxDQUFDO0lBRU8sYUFBYTtRQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELElBQUksS0FBSztRQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFJLEtBQUssQ0FBQyxDQUFjO1FBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUFFRCxJQUFJO1FBQ0EsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUNyQyxDQUFDO0lBRUQsSUFBSTtRQUNBLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDdEMsQ0FBQztJQUVELE9BQU87UUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRUQsUUFBUTtRQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDO0lBQzdDLENBQUM7SUFFRCxNQUFNO1FBQ0YsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7UUFDOUIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVELE1BQU07UUFDRixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQTtJQUNqQyxDQUFDO0lBRUQscUJBQXFCLENBQUMsVUFBc0I7UUFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQzNDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUM5QyxDQUFDO0lBRUQsT0FBTztRQUNILElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN6QixDQUFDO0FBRUwsQ0FBQztBQXhGWSxrQkFBVSxhQXdGdEIsQ0FBQSIsImZpbGUiOiJ2aWV3L3ZpZXdDdXJzb3IuanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
