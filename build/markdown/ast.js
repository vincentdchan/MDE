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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYXJrZG93bi9hc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBO0FBRUEsQ0FBQztBQUZZLFlBQUksT0FFaEIsQ0FBQTtBQUVELHlCQUFnQyxJQUFJO0lBSWhDLFlBQVksTUFBZSxFQUFFLEtBQWM7UUFDdkMsT0FBTyxDQUFDO1FBQ1IsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFJLEtBQUssQ0FBQyxDQUFVO1FBQ2hCLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSSxJQUFJLENBQUMsQ0FBVTtRQUNmLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFRCxJQUFJLElBQUk7UUFDSixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0FBRUwsQ0FBQztBQTFCWSxrQkFBVSxhQTBCdEIsQ0FBQTtBQUVELDRCQUFtQyxJQUFJO0lBSW5DLFlBQVksS0FBYztRQUN0QixPQUFPLENBQUE7UUFDUCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSSxJQUFJO1FBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUE7SUFDckIsQ0FBQztJQUVELElBQUksSUFBSSxDQUFDLEtBQWM7UUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQztBQUVMLENBQUM7QUFqQlkscUJBQWEsZ0JBaUJ6QixDQUFBO0FBRUQsNEJBQW1DLElBQUk7SUFJbkM7UUFDSSxPQUFPLENBQUM7UUFDUixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksR0FBRyxFQUFn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S0FBSyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSSxJQUFJO1FBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQUksSUFBSSxDQUFDLEtBQWM7UUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQztBQUVMLENBQUM7QUFqQlksZUFBTyxVQWlCbkIsQ0FBQTtBQUVELDhCQUFxQyxJQUFJO0lBSXJDLFlBQVksS0FBYztRQUN0QixPQUFPLENBQUM7UUFDUixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSSxJQUFJO1FBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQUksSUFBSSxDQUFDLEtBQWM7UUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQztBQUVMLENBQUM7QUFqQlksdUJBQWUsa0JBaUIzQixDQUFBIiwiZmlsZSI6Im1hcmtkb3duL2FzdC5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
