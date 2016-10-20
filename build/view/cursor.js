"use strict";
const dom_1 = require("../util/dom");
class Cursor {
    constructor() {
        this._element = dom_1.elem("div", "cursor");
        this._element.style.height = "1em";
        this._element.style.width = "0.5em";
        this._element.style.background = "black";
        this._element.style.position = "absolute";
        let _cursor_shown = true;
        setInterval(() => {
            if (_cursor_shown) {
                this._element.style.opacity = "0";
            }
            else {
                this._element.style.opacity = "1";
            }
            _cursor_shown = !_cursor_shown;
        }, 500);
    }
    setCoordinate(x, y) {
        this._element.style.left = x + "px";
        this._element.style.top = y + "px";
    }
    get element() {
        return this._element;
    }
}
exports.Cursor = Cursor;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L2N1cnNvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0JBQW1CLGFBRW5CLENBQUMsQ0FGK0I7QUFFaEM7SUFJSTtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQW1CLFVBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFdEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNuQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUM7UUFDekMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztRQUUxQyxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDekIsV0FBVyxDQUFDO1lBRVIsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztZQUN0QyxDQUFDO1lBQ0QsSUFBSSxDQUFDLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztZQUN0QyxDQUFDO1lBQ0QsYUFBYSxHQUFHLENBQUMsYUFBYSxDQUFDO1FBRW5DLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUVaLENBQUM7SUFFRCxhQUFhLENBQUMsQ0FBUyxFQUFFLENBQVU7UUFDL0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDcEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDdkMsQ0FBQztJQUVELElBQUksT0FBTztRQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7QUFFTCxDQUFDO0FBcENZLGNBQU0sU0FvQ2xCLENBQUEiLCJmaWxlIjoidmlldy9jdXJzb3IuanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
