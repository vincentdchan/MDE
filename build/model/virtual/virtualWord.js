"use strict";
const util_1 = require("../../util");
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
    get text() {
        return this._text;
    }
    get classList() {
        return this._classList;
    }
}
exports.VirtualWord = VirtualWord;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2RlbC92aXJ0dWFsL3ZpcnR1YWxXb3JkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx1QkFBNkIsWUFHN0IsQ0FBQyxDQUh3QztBQUd6QztJQUtJLFlBQVksS0FBMkIsRUFBRSxVQUFtQztRQUN4RSxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssSUFBSSxRQUFRLENBQUM7WUFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssWUFBWSxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztZQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUkscUJBQWMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDM0QsQ0FBQztRQUVELElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0lBQ2pDLENBQUM7SUFFRCxJQUFJLElBQUk7UUFDSixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBRUQsSUFBSSxTQUFTO1FBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQztBQUVMLENBQUM7QUF4QlksbUJBQVcsY0F3QnZCLENBQUEiLCJmaWxlIjoibW9kZWwvdmlydHVhbC92aXJ0dWFsV29yZC5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
