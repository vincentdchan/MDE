"use strict";
const dom_1 = require("../../util/dom");
class VirtualLine {
    constructor(line, words) {
        this._line = line;
        if (words)
            this._words = words;
        else
            this._words = [];
    }
    render() {
        let dom = dom_1.elem("div");
        dom.setAttribute("data-lineId", this._line.toString());
        this._words.forEach((e) => {
            dom.appendChild(e.render());
        });
        return dom;
    }
    get lineNumber() {
        return this._line;
    }
    get words() {
        return this._words;
    }
}
exports.VirtualLine = VirtualLine;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2RlbC92aXJ0dWFsL3ZpcnR1YWxMaW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxzQkFBbUIsZ0JBRW5CLENBQUMsQ0FGa0M7QUFFbkM7SUFJSSxZQUFZLElBQVksRUFBRSxLQUFxQjtRQUMzQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDTixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJO1lBQ0EsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELE1BQU07UUFDRixJQUFJLEdBQUcsR0FBRyxVQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEIsR0FBRyxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBYztZQUMvQixHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRCxJQUFJLFVBQVU7UUFDVixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztBQUVMLENBQUM7QUE3QlksbUJBQVcsY0E2QnZCLENBQUEiLCJmaWxlIjoibW9kZWwvdmlydHVhbC92aXJ0dWFsTGluZS5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
