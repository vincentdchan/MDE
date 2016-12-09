"use strict";
const util_1 = require("../util");
class CursorView extends util_1.DomHelper.AppendableDomWrapper {
    constructor(isMajor, ticktock) {
        super("div", "mde-cursor");
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
            tick: () => { this._dom.style.opacity = "1"; },
            tock: () => { this._dom.style.opacity = "0"; },
        };
        this._ticktock.register(this._ticktock_pair);
    }
    clearInterval() {
        this._ticktock.unregister(this._ticktock_pair);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdDdXJzb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHVCQUFpRSxTQUNqRSxDQUFDLENBRHlFO0FBRzFFLHlCQUFnQyxnQkFBUyxDQUFDLG9CQUFvQjtJQVMxRCxZQUFZLE9BQU8sRUFBRSxRQUFzQjtRQUN2QyxNQUFNLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQztRQUUzQixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUV4QixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUU5QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXBELElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFTyxrQkFBa0I7UUFFdEIsSUFBSSxDQUFDLGNBQWMsR0FBRztZQUNsQixJQUFJLEVBQUUsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFBLENBQUMsQ0FBQztZQUM3QyxJQUFJLEVBQUUsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFBLENBQUMsQ0FBQztTQUNoRCxDQUFBO1FBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBRWpELENBQUM7SUFFTyxhQUFhO1FBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsSUFBSTtRQUNBLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDckMsQ0FBQztJQUVELElBQUk7UUFDQSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxPQUFPO1FBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUVELFFBQVE7UUFDSixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLE1BQU0sQ0FBQztJQUM3QyxDQUFDO0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1FBQzlCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCxNQUFNO1FBQ0YsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUE7SUFDakMsQ0FBQztJQUVELHFCQUFxQixDQUFDLFVBQXNCO1FBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUMzQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsVUFBVSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDOUMsQ0FBQztJQUVELE9BQU87UUFDSCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDekIsQ0FBQztBQUVMLENBQUM7QUEzRVksa0JBQVUsYUEyRXRCLENBQUEiLCJmaWxlIjoidmlldy92aWV3Q3Vyc29yLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
