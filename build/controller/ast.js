"use strict";
class Node {
}
exports.Node = Node;
class HeaderNode extends Node {
    constructor(_level, _text) {
        super();
        this._level = _level | 1;
        this._text = _text;
    }
    set level(l) {
        this._level = l;
    }
    get level() {
        return this._level;
    }
    set text(t) {
        this._text = t;
    }
    get text() {
        return this._text;
    }
}
exports.HeaderNode = HeaderNode;
class ParagraphNode extends Node {
    constructor(_text) {
        super();
        this._text = _text;
    }
    get text() {
        return this._text;
    }
    set text(_text) {
        this._text = _text;
    }
}
exports.ParagraphNode = ParagraphNode;
class OrderListNode extends Node {
    constructor() {
        super();
        this._dict = new Map();
    }
    setValue(_index, _node) {
        this._dict[_index] = _node;
    }
    getValue(_index) {
        return this._dict[_index];
    }
    get dict() {
        return this._dict;
    }
}
exports.OrderListNode = OrderListNode;
class UnorderListNode extends Node {
    constructor() {
        super();
        this._array = new Array();
    }
    push(_node) {
        this._array.push(_node);
    }
    setValue(_index, _node) {
        if (_index >= this.length) {
            throw new Error("Input out of range");
        }
        this._array[_index] = _node;
    }
    getValue(_index) {
        if (_index >= this.length) {
            throw new Error("Input out of range");
        }
        return this._array[_index];
    }
    get length() {
        return this._array.length;
    }
    get array() {
        return this._array;
    }
}
exports.UnorderListNode = UnorderListNode;
class AnchorNode extends Node {
    constructor(_text, _link) {
        super();
        this._text = _text;
        this._link = _link;
    }
    get text() {
        return this._text;
    }
    set text(_text) {
        this._text = _text;
    }
    get link() {
        return this._link;
    }
    set link(_link) {
        this._link = _link;
    }
}
exports.AnchorNode = AnchorNode;
class BlockQuoteNode extends Node {
    constructor(_text) {
        super();
        this._text = _text;
    }
    get text() {
        return this._text;
    }
    set text(_text) {
        this._text = _text;
    }
}
exports.BlockQuoteNode = BlockQuoteNode;
class RawNode extends Node {
    constructor(_text) {
        super();
        this._text = _text;
    }
    get text() {
        return this._text;
    }
    set text(_text) {
        this._text = _text;
    }
}
exports.RawNode = RawNode;
class HTMLElementNode extends Node {
    constructor(_text) {
        super();
        this._text = _text;
    }
    get text() {
        return this._text;
    }
    set text(_text) {
        this._text = _text;
    }
}
exports.HTMLElementNode = HTMLElementNode;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyL2FzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0E7QUFFQSxDQUFDO0FBRlksWUFBSSxPQUVoQixDQUFBO0FBRUQseUJBQWdDLElBQUk7SUFJaEMsWUFBWSxNQUFlLEVBQUUsS0FBYztRQUN2QyxPQUFPLENBQUM7UUFDUixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQUksS0FBSyxDQUFDLENBQVU7UUFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUVELElBQUksS0FBSztRQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFJLElBQUksQ0FBQyxDQUFVO1FBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVELElBQUksSUFBSTtRQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7QUFFTCxDQUFDO0FBMUJZLGtCQUFVLGFBMEJ0QixDQUFBO0FBRUQsNEJBQW1DLElBQUk7SUFJbkMsWUFBWSxLQUFjO1FBQ3RCLE9BQU8sQ0FBQTtRQUNQLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFJLElBQUk7UUFDSixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQTtJQUNyQixDQUFDO0lBRUQsSUFBSSxJQUFJLENBQUMsS0FBYztRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0FBRUwsQ0FBQztBQWpCWSxxQkFBYSxnQkFpQnpCLENBQUE7QUFFRCw0QkFBbUMsSUFBSTtJQUluQztRQUNJLE9BQU8sQ0FBQztRQUNSLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxHQUFHLEVBQWdCLENBQUM7SUFDekMsQ0FBQztJQUVELFFBQVEsQ0FBQyxNQUFlLEVBQUUsS0FBWTtRQUNsQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUMvQixDQUFDO0lBRUQsUUFBUSxDQUFDLE1BQWU7UUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELElBQUksSUFBSTtRQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7QUFFTCxDQUFDO0FBckJZLHFCQUFhLGdCQXFCekIsQ0FBQTtBQUVELDhCQUFxQyxJQUFJO0lBSXJDO1FBQ0ksT0FBTyxDQUFDO1FBQ1IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEtBQUssRUFBUSxDQUFDO0lBQ3BDLENBQUM7SUFFRCxJQUFJLENBQUMsS0FBWTtRQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCxRQUFRLENBQUMsTUFBZSxFQUFFLEtBQVk7UUFDbEMsRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUMxQyxDQUFDO1FBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUM7SUFDaEMsQ0FBQztJQUVELFFBQVEsQ0FBQyxNQUFlO1FBQ3BCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN4QixNQUFNLElBQUksS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDMUMsQ0FBQztRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxJQUFJLE1BQU07UUFDTixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDOUIsQ0FBQztJQUVELElBQUksS0FBSztRQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7QUFFTCxDQUFDO0FBckNZLHVCQUFlLGtCQXFDM0IsQ0FBQTtBQUVELHlCQUFnQyxJQUFJO0lBS2hDLFlBQVksS0FBYSxFQUFFLEtBQWM7UUFDckMsT0FBTyxDQUFDO1FBQ1IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQUksSUFBSTtRQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUFJLElBQUksQ0FBQyxLQUFjO1FBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFJLElBQUk7UUFDSixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBRUQsSUFBSSxJQUFJLENBQUMsS0FBYztRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0FBRUwsQ0FBQztBQTNCWSxrQkFBVSxhQTJCdEIsQ0FBQTtBQUVELDZCQUFvQyxJQUFJO0lBSXBDLFlBQVksS0FBYztRQUN0QixPQUFPLENBQUM7UUFDUixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSSxJQUFJO1FBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQUksSUFBSSxDQUFDLEtBQWM7UUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQztBQUVMLENBQUM7QUFqQlksc0JBQWMsaUJBaUIxQixDQUFBO0FBRUQsc0JBQTZCLElBQUk7SUFJN0IsWUFBWSxLQUFjO1FBQ3RCLE9BQU8sQ0FBQztRQUNSLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFJLElBQUk7UUFDSixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBRUQsSUFBSSxJQUFJLENBQUMsS0FBYztRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0FBRUwsQ0FBQztBQWpCWSxlQUFPLFVBaUJuQixDQUFBO0FBRUQsOEJBQXFDLElBQUk7SUFJckMsWUFBWSxLQUFjO1FBQ3RCLE9BQU8sQ0FBQztRQUNSLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFJLElBQUk7UUFDSixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBRUQsSUFBSSxJQUFJLENBQUMsS0FBYztRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0FBRUwsQ0FBQztBQWpCWSx1QkFBZSxrQkFpQjNCLENBQUEiLCJmaWxlIjoiY29udHJvbGxlci9hc3QuanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
