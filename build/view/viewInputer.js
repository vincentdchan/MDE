"use strict";
const util_1 = require("../util");
class InputerView extends util_1.DomHelper.Generic.AbsoluteElement {
    constructor() {
        super("textarea", "mde-inputer");
        this._focused = false;
        this._isCompositing = false;
        this._isComposintThunkTimers = [];
        this._dom.addEventListener("focus", (evt) => {
            this._focused = true;
        });
        this._dom.addEventListener("blur", (evt) => {
            this._focused = false;
        });
        this._dom.addEventListener("compositionstart", (evt) => {
            this._isCompositing = true;
        });
        this._dom.addEventListener("compositionend", (evt) => {
            this._isComposintThunkTimers.push(setTimeout(() => {
                this._isCompositing = false;
            }, 5));
        });
    }
    clearContent() {
        this._dom.value = "";
    }
    setAbsoluteCoordinate(coordinate) {
        this.left = coordinate.x;
        this.top = coordinate.y;
    }
    isFosused() {
        return this._focused;
    }
    isCompositioning() {
        return this._isCompositing;
    }
    dispose() {
        this._isComposintThunkTimers.forEach((t) => {
            clearTimeout(t);
        });
    }
    hide() {
        this._dom.style.display = "none";
    }
    show() {
        this._dom.style.display = "block";
    }
    isHidden() {
        return this._dom.style.display == "none";
    }
    get value() {
        return this._dom.value;
    }
    set value(content) {
        this._dom.value = content;
    }
}
exports.InputerView = InputerView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdJbnB1dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxrQ0FBOEM7QUFHOUMsaUJBQXlCLFNBQ3pCLGdCQUFTLENBQUMsT0FBTyxDQUFDLGVBQW9DO0lBT2xEO1FBQ0ksS0FBSyxDQUFDLFVBQVUsRUFBRSxhQUFhLENBQUMsQ0FBQztRQU43QixhQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLG1CQUFjLEdBQVksS0FBSyxDQUFDO1FBRWhDLDRCQUF1QixHQUFvQixFQUFFLENBQUM7UUFLbEQsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFlO1lBQ2hELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFBO1FBRUYsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFlO1lBQy9DLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFBO1FBRUYsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLEdBQVU7WUFDdEQsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixFQUFFLENBQUMsR0FBVTtZQUNwRCxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztnQkFDekMsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7WUFDaEMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDLENBQUMsQ0FBQTtJQUVOLENBQUM7SUFFRCxZQUFZO1FBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxxQkFBcUIsQ0FBQyxVQUFzQjtRQUN4QyxJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCxTQUFTO1FBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUVELGdCQUFnQjtRQUNaLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQy9CLENBQUM7SUFFRCxPQUFPO1FBQ0gsSUFBSSxDQUFDLHVCQUF1QixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQWU7WUFDakQsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELElBQUk7UUFDQSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQ3JDLENBQUM7SUFFRCxJQUFJO1FBQ0EsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN0QyxDQUFDO0lBRUQsUUFBUTtRQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDO0lBQzdDLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDM0IsQ0FBQztJQUVELElBQUksS0FBSyxDQUFDLE9BQWU7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDO0lBQzlCLENBQUM7Q0FFSjtBQTFFRCxrQ0EwRUMiLCJmaWxlIjoidmlldy92aWV3SW5wdXRlci5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
