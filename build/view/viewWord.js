"use strict";
const util_1 = require("../util");
const dom_1 = require("../util/dom");
class WordView {
    constructor(_text, _classList) {
        this._dom = null;
        if (typeof _text == "string")
            this._text = _text;
        else if (_text instanceof WordView) {
            this._text = _text._text;
            this._classList = new util_1.ImmutableArray(_text._classList);
        }
        this._classList = _classList ? _classList : new util_1.ImmutableArray();
        this._dom = dom_1.elem("span");
        this._dom.innerText = this._text;
        this._classList.forEach((e) => {
            this._dom.classList.add(e);
        });
    }
    getCoordinate(offset) {
        if (offset >= this.length)
            throw new Error("Index out of range.");
        if (offset === 0) {
            let rect = this._dom.getBoundingClientRect();
            return {
                x: rect.left,
                y: rect.top,
            };
        }
        else {
            let domRange = document.createRange();
            domRange.setStart(this._dom.firstChild, offset);
            domRange.setEnd(this._dom.firstChild, offset);
            let rect = domRange.getBoundingClientRect();
            return {
                x: rect.left,
                y: rect.top,
            };
        }
    }
    dispose() {
        this._dom.parentElement.removeChild(this._dom);
        this._dom = null;
    }
    element() {
        return this._dom;
    }
    get length() {
        return this._text.length;
    }
    get text() {
        return this._text;
    }
    get classList() {
        return this._classList;
    }
}
exports.WordView = WordView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdXb3JkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSx1QkFBNkIsU0FDN0IsQ0FBQyxDQURxQztBQUV0QyxzQkFBbUIsYUFDbkIsQ0FBQyxDQUQrQjtBQUloQztJQU1JLFlBQVksS0FBd0IsRUFBRSxVQUFtQztRQUZqRSxTQUFJLEdBQW9CLElBQUksQ0FBQztRQUdqQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssSUFBSSxRQUFRLENBQUM7WUFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssWUFBWSxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztZQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUkscUJBQWMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDM0QsQ0FBQztRQUVELElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxHQUFFLFVBQVUsR0FBRyxJQUFJLHFCQUFjLEVBQVUsQ0FBQztRQUV4RSxJQUFJLENBQUMsSUFBSSxHQUFHLFVBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBUztZQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsYUFBYSxDQUFDLE1BQWM7UUFDeEIsRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDdEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQzNDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQzdDLE1BQU0sQ0FBQztnQkFDSCxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUk7Z0JBQ1osQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHO2FBQ2QsQ0FBQTtRQUNMLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN0QyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ2hELFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDOUMsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDNUMsTUFBTSxDQUFDO2dCQUNILENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDWixDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUc7YUFDZCxDQUFBO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFFRCxPQUFPO1FBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRUQsT0FBTztRQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxJQUFJLE1BQU07UUFDTixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDN0IsQ0FBQztJQUVELElBQUksSUFBSTtRQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUFJLFNBQVM7UUFDVCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDO0FBRUwsQ0FBQztBQWpFWSxnQkFBUSxXQWlFcEIsQ0FBQSIsImZpbGUiOiJ2aWV3L3ZpZXdXb3JkLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
