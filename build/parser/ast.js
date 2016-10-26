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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUssR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQUksSUFBSTtRQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUFJLElBQUksQ0FBQyxLQUFjO1FBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7QUFFTCxDQUFDO0FBakJZLGVBQU8sVUFpQm5CLENBQUE7QUFFRCw4QkFBcUMsSUFBSTtJQUlyQyxZQUFZLEtBQWM7UUFDdEIsT0FBTyxDQUFDO1FBQ1IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQUksSUFBSTtRQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUFJLElBQUksQ0FBQyxLQUFjO1FBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7QUFFTCxDQUFDO0FBakJZLHVCQUFlLGtCQWlCM0IsQ0FBQSIsImZpbGUiOiJwYXJzZXIvYXN0LmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
