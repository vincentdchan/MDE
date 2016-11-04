"use strict";
const util_1 = require("../../util");
const dom_1 = require("../../util/dom");
class VirtualWord {
    constructor(_text, _classList) {
        if (typeof _text == "string")
            this._text = _text;
        else if (_text instanceof VirtualWord) {
            this._text = _text._text;
            this._classList = new util_1.ImmutableArray(_text._classList);
        }
        this._classList = _classList;
    }
    render() {
        let dom = dom_1.elem("span");
        dom.innerText = this._text;
        this._classList.forEach((e) => {
            dom.classList.add(e);
        });
        return dom;
    }
    get text() {
        return this._text;
    }
    get classList() {
        return this._classList;
    }
}
exports.VirtualWord = VirtualWord;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2RlbC92aXJ0dWFsL3ZpcnR1YWxXb3JkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx1QkFBNkIsWUFDN0IsQ0FBQyxDQUR3QztBQUV6QyxzQkFBbUIsZ0JBR25CLENBQUMsQ0FIa0M7QUFHbkM7SUFLSSxZQUFZLEtBQTJCLEVBQUUsVUFBbUM7UUFDeEUsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLElBQUksUUFBUSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLFlBQVksV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7WUFDekIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLHFCQUFjLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzNELENBQUM7UUFFRCxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUNqQyxDQUFDO0lBRUQsTUFBTTtRQUNGLElBQUksR0FBRyxHQUFHLFVBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2QixHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFTO1lBQzlCLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFBO1FBQ0YsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRCxJQUFJLElBQUk7UUFDSixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBRUQsSUFBSSxTQUFTO1FBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQztBQUVMLENBQUM7QUFqQ1ksbUJBQVcsY0FpQ3ZCLENBQUEiLCJmaWxlIjoibW9kZWwvdmlydHVhbC92aXJ0dWFsV29yZC5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
