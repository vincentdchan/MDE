"use strict";
const util_1 = require("../util");
class InputerView extends util_1.DomWrapper.AbsoluteElement {
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
        this.dom.value = "";
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
        this.dom.style.display = "none";
    }
    show() {
        this.dom.style.display = "block";
    }
    isHidden() {
        return this.dom.style.display == "none";
    }
    get dom() {
        return this._dom;
    }
    get value() {
        return this.dom.value;
    }
    set value(content) {
        this.dom.value = content;
    }
}
exports.InputerView = InputerView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdJbnB1dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxrQ0FBK0M7QUFHL0MsaUJBQXlCLFNBQVEsaUJBQVUsQ0FBQyxlQUFlO0lBT3ZEO1FBQ0ksS0FBSyxDQUFDLFVBQVUsRUFBRSxhQUFhLENBQUMsQ0FBQztRQU43QixhQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLG1CQUFjLEdBQVksS0FBSyxDQUFDO1FBRWhDLDRCQUF1QixHQUFvQixFQUFFLENBQUM7UUFLbEQsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFlO1lBQ2hELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFBO1FBRUYsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFlO1lBQy9DLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFBO1FBRUYsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLEdBQVU7WUFDdEQsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixFQUFFLENBQUMsR0FBVTtZQUNwRCxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztnQkFDekMsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7WUFDaEMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDLENBQUMsQ0FBQTtJQUVOLENBQUM7SUFFRCxZQUFZO1FBQ1IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxxQkFBcUIsQ0FBQyxVQUFzQjtRQUN4QyxJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCxTQUFTO1FBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUVELGdCQUFnQjtRQUNaLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQy9CLENBQUM7SUFFRCxPQUFPO1FBQ0gsSUFBSSxDQUFDLHVCQUF1QixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQWU7WUFDakQsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELElBQUk7UUFDQSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQ3BDLENBQUM7SUFFRCxJQUFJO1FBQ0EsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUNyQyxDQUFDO0lBRUQsUUFBUTtRQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDO0lBQzVDLENBQUM7SUFFRCxJQUFZLEdBQUc7UUFDWCxNQUFNLENBQXNCLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDMUMsQ0FBQztJQUVELElBQUksS0FBSztRQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztJQUMxQixDQUFDO0lBRUQsSUFBSSxLQUFLLENBQUMsT0FBZTtRQUNyQixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7SUFDN0IsQ0FBQztDQUVKO0FBN0VELGtDQTZFQyIsImZpbGUiOiJ2aWV3L3ZpZXdJbnB1dGVyLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
