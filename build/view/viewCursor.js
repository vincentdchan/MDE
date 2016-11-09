"use strict";
const dom_1 = require("../util/dom");
class CursorView {
    constructor() {
        this._dom = dom_1.elem("div", "editor-cursor");
        this._dom.style.position = "absolute";
        this._dom.style.height = "1em";
        this._dom.style.width = "0.2em";
        this._dom.style.background = "black";
        this.initializeBlinking();
    }
    initializeBlinking() {
        let showed = true;
        setInterval(() => {
            if (showed) {
                this._dom.style.opacity = "1";
            }
            else {
                this._dom.style.opacity = "0";
            }
            showed = !showed;
        }, 500);
    }
    setPostition(coordinate) {
        this._dom.style.left = coordinate.x + "px";
        this._dom.style.top = coordinate.y + "px";
    }
    element() {
        return this._dom;
    }
    on(name, listener, useCapture) {
        this._dom.addEventListener(name, listener, useCapture);
    }
    dispose() {
        if (this._dom) {
            this._dom.parentElement.removeChild(this._dom);
            this._dom = null;
        }
    }
}
exports.CursorView = CursorView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdDdXJzb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNCQUFnQyxhQUNoQyxDQUFDLENBRDRDO0FBSTdDO0lBSUk7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLFVBQUksQ0FBQyxLQUFLLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztRQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7UUFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQztRQUVyQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRU8sa0JBQWtCO1FBRXRCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztRQUNsQixXQUFXLENBQUM7WUFDUixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNULElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7WUFDbEMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7WUFDbEMsQ0FBQztZQUNELE1BQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUNyQixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFFWixDQUFDO0lBRUQsWUFBWSxDQUFDLFVBQXNCO1FBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUMzQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsVUFBVSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDOUMsQ0FBQztJQUVELE9BQU87UUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRUQsRUFBRSxDQUFDLElBQVksRUFBRSxRQUE0QyxFQUFFLFVBQW9CO1FBQy9FLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQsT0FBTztRQUNILEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNyQixDQUFDO0lBQ0wsQ0FBQztBQUVMLENBQUM7QUFoRFksa0JBQVUsYUFnRHRCLENBQUEiLCJmaWxlIjoidmlldy92aWV3Q3Vyc29yLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
