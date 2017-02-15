"use strict";
const util_1 = require("../util");
var CursorState;
(function (CursorState) {
    CursorState[CursorState["Blink"] = 0] = "Blink";
    CursorState[CursorState["AlwaysOn"] = 1] = "AlwaysOn";
    CursorState[CursorState["AlwaysOff"] = 2] = "AlwaysOff";
})(CursorState = exports.CursorState || (exports.CursorState = {}));
class CursorView extends util_1.DomWrapper.AppendableDomWrapper {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdDdXJzb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGtDQUEyRTtBQUczRSxJQUFZLFdBRVg7QUFGRCxXQUFZLFdBQVc7SUFDbkIsK0NBQUssQ0FBQTtJQUFFLHFEQUFRLENBQUE7SUFBRSx1REFBUyxDQUFBO0FBQzlCLENBQUMsRUFGVyxXQUFXLEdBQVgsbUJBQVcsS0FBWCxtQkFBVyxRQUV0QjtBQUVELGdCQUF3QixTQUFRLGlCQUFVLENBQUMsb0JBQW9CO0lBVTNELFlBQVksT0FBTyxFQUFFLFFBQXNCO1FBQ3ZDLEtBQUssQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFIdkIsV0FBTSxHQUFnQixXQUFXLENBQUMsS0FBSyxDQUFDO1FBSzVDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBRXhCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7UUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBRTlCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7WUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFcEQsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVPLGtCQUFrQjtRQUV0QixJQUFJLENBQUMsY0FBYyxHQUFHO1lBQ2xCLElBQUksRUFBRTtnQkFDRixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLFdBQVcsQ0FBQyxTQUFTLENBQUM7b0JBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQTtZQUM1RSxDQUFDO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssV0FBVyxDQUFDLFFBQVEsQ0FBQztvQkFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFBO1lBQzNFLENBQUM7U0FDSixDQUFBO1FBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBRWpELENBQUM7SUFFTyxhQUFhO1FBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQUksS0FBSyxDQUFDLENBQWM7UUFDcEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUVELElBQUk7UUFDQSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQ3JDLENBQUM7SUFFRCxJQUFJO1FBQ0EsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN0QyxDQUFDO0lBRUQsT0FBTztRQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxRQUFRO1FBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxNQUFNLENBQUM7SUFDN0MsQ0FBQztJQUVELE1BQU07UUFDRixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztRQUM5QixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFBO0lBQ2pDLENBQUM7SUFFRCxxQkFBcUIsQ0FBQyxVQUFzQjtRQUN4QyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLFVBQVUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQzlDLENBQUM7SUFFRCxPQUFPO1FBQ0gsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7Q0FFSjtBQXhGRCxnQ0F3RkMiLCJmaWxlIjoidmlldy92aWV3Q3Vyc29yLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
