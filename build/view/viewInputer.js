"use strict";
const dom_1 = require("../util/dom");
class InputerView {
    constructor() {
        this._focused = false;
        this._isCompositing = false;
        this._dom = dom_1.elem("textarea", "mde-inputer");
        this._dom.style.position = "absolute";
        this._dom.style.height = "1em";
        this._dom.style.width = "1px";
        this._dom.style.opacity = "0.3";
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
            setTimeout(() => {
                this._isCompositing = false;
            }, 20);
        });
    }
    ;
    clearContent() {
        this._dom.value = "";
    }
    setPostition(coordinate) {
        this._dom.style.left = coordinate.x + "px";
        this._dom.style.top = coordinate.y + "px";
    }
    isFosused() {
        return this._focused;
    }
    isCompositioning() {
        return this._isCompositing;
    }
    on(name, listener, useCapture) {
        this._dom.addEventListener(name, listener, useCapture);
    }
    element() {
        return this._dom;
    }
    get value() {
        return this._dom.value;
    }
    set value(content) {
        this._dom.value = content;
    }
}
exports.InputerView = InputerView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdJbnB1dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQkFBZ0MsYUFDaEMsQ0FBQyxDQUQ0QztBQUc3QztJQU1JO1FBSFEsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixtQkFBYyxHQUFZLEtBQUssQ0FBQztRQUdwQyxJQUFJLENBQUMsSUFBSSxHQUF3QixVQUFJLENBQUMsVUFBVSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7UUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFFaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFlO1lBQ2hELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFBO1FBRUYsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFlO1lBQy9DLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFBO1FBRUYsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLEdBQVU7WUFDdEQsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixFQUFFLENBQUMsR0FBVTtZQUNwRCxVQUFVLENBQUM7Z0JBQ1AsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7WUFDaEMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ1YsQ0FBQyxDQUFDLENBQUE7SUFFTixDQUFDOztJQUVELFlBQVk7UUFDUixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELFlBQVksQ0FBQyxVQUFzQjtRQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLFVBQVUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQzlDLENBQUM7SUFFRCxTQUFTO1FBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUVELGdCQUFnQjtRQUNaLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQy9CLENBQUM7SUFFRCxFQUFFLENBQUMsSUFBWSxFQUFFLFFBQTRDLEVBQUUsVUFBb0I7UUFDL0UsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRCxPQUFPO1FBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVELElBQUksS0FBSztRQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUMzQixDQUFDO0lBRUQsSUFBSSxLQUFLLENBQUMsT0FBZTtRQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7SUFDOUIsQ0FBQztBQUVMLENBQUM7QUFsRVksbUJBQVcsY0FrRXZCLENBQUEiLCJmaWxlIjoidmlldy92aWV3SW5wdXRlci5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
