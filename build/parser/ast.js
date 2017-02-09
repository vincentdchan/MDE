"use strict";
class Node {
    get beginLine() {
        return this._beginLine;
    }
    get endLine() {
        return this._beginLine;
    }
}
exports.Node = Node;
class TextNode extends Node {
    constructor() {
        super();
        this._children = [];
    }
    get children() {
        return this._children;
    }
}
exports.TextNode = TextNode;
class NormalTextNode extends Node {
    constructor(_text) {
        super();
        this._text = _text;
    }
    get text() {
        return this._text;
    }
}
exports.NormalTextNode = NormalTextNode;
class BoldTextNode extends Node {
    constructor(_text) {
        super();
        this._text = _text;
    }
    get text() {
        return this._text;
    }
}
exports.BoldTextNode = BoldTextNode;
class ItalicTextNode extends Node {
    constructor(_text) {
        super();
        this._text = _text;
    }
    get text() {
        return this._text;
    }
}
exports.ItalicTextNode = ItalicTextNode;
class HeaderNode extends Node {
    constructor(_level, _content) {
        super();
        this._level = _level;
        this._content = _content;
    }
    get level() {
        return this._level;
    }
    get content() {
        return this._content;
    }
}
exports.HeaderNode = HeaderNode;
class ListNode extends Node {
    get isNumbered() {
        return this._isNumbered;
    }
}
exports.ListNode = ListNode;
class HtmlNode extends Node {
    constructor(_content) {
        super();
        this._content = _content;
    }
    get content() {
        return this._content;
    }
}
exports.HtmlNode = HtmlNode;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wYXJzZXIvYXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQTtJQUtJLElBQUksU0FBUztRQUNULE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzNCLENBQUM7SUFFRCxJQUFJLE9BQU87UUFDUCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDO0NBRUo7QUFiRCxvQkFhQztBQUVELGNBQXNCLFNBQVEsSUFBSTtJQUk5QjtRQUNJLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELElBQUksUUFBUTtRQUNSLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7Q0FFSjtBQWJELDRCQWFDO0FBRUQsb0JBQTRCLFNBQVEsSUFBSTtJQUlwQyxZQUFZLEtBQWM7UUFDdEIsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSSxJQUFJO1FBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztDQUVKO0FBYkQsd0NBYUM7QUFFRCxrQkFBMEIsU0FBUSxJQUFJO0lBSWxDLFlBQVksS0FBYztRQUN0QixLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFJLElBQUk7UUFDSixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0NBRUo7QUFiRCxvQ0FhQztBQUVELG9CQUE0QixTQUFRLElBQUk7SUFJcEMsWUFBWSxLQUFjO1FBQ3RCLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQUksSUFBSTtRQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7Q0FFSjtBQWJELHdDQWFDO0FBRUQsZ0JBQXdCLFNBQVEsSUFBSTtJQUtoQyxZQUFZLE1BQWUsRUFBRSxRQUFpQjtRQUMxQyxLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzdCLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSSxPQUFPO1FBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztDQUVKO0FBbkJELGdDQW1CQztBQUVELGNBQXNCLFNBQVEsSUFBSTtJQUs5QixJQUFJLFVBQVU7UUFDVixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFDO0NBRUo7QUFURCw0QkFTQztBQUVELGNBQXNCLFNBQVEsSUFBSTtJQUk5QixZQUFZLFFBQWlCO1FBQ3pCLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDN0IsQ0FBQztJQUVELElBQUksT0FBTztRQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7Q0FDSjtBQVpELDRCQVlDIiwiZmlsZSI6InBhcnNlci9hc3QuanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
