"use strict";
const dom_1 = require("../util/dom");
class ViewLine {
    constructor(_m) {
        this._elem = dom_1.elem("div", "render-line");
        this._model = _m;
        this._elem.innerText = _m.text;
        this._clickEventHandler = new Array();
        this._elem.addEventListener('click', (e) => {
            this.fireClickEvent(this, e);
        });
    }
    fireClickEvent(vl, e) {
        for (let i = 0; i < this._clickEventHandler.length; i++) {
            this._clickEventHandler[i](vl, e);
        }
    }
    onClickEvent(fun) {
        this._clickEventHandler.push(fun);
    }
    get element() {
        return this._elem;
    }
    get lineNumber() {
        return this._model.number;
    }
    get coordinate() {
        return this.element.getBoundingClientRect();
    }
}
exports.ViewLine = ViewLine;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdMaW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxzQkFBbUIsYUFDbkIsQ0FBQyxDQUQrQjtBQUdoQztJQWFJLFlBQVksRUFBYztRQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLFVBQUksQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFFakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQztRQUUvQixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxLQUFLLEVBQXNDLENBQUM7UUFFMUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFjO1lBQ2hELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRWpDLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQWxCTyxjQUFjLENBQUMsRUFBYSxFQUFFLENBQWM7UUFDaEQsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDdEQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN0QyxDQUFDO0lBQ0wsQ0FBQztJQWdCRCxZQUFZLENBQUMsR0FBd0M7UUFDakQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsSUFBSSxPQUFPO1FBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQUksVUFBVTtRQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUM5QixDQUFDO0lBRUQsSUFBSSxVQUFVO1FBQ1YsTUFBTSxDQUFFLElBQUksQ0FBQyxPQUFPLENBQUMscUJBQXFCLEVBQUUsQ0FBQztJQUNqRCxDQUFDO0FBRUwsQ0FBQztBQTNDWSxnQkFBUSxXQTJDcEIsQ0FBQSIsImZpbGUiOiJ2aWV3L3ZpZXdMaW5lLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
