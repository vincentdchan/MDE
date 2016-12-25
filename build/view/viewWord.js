"use strict";
const util_1 = require("../util");
function addClass(elm, className) {
    elm.classList.add(className);
}
class WordView {
    constructor(_text, tokenType = util_1.MarkdownTokenType.Text) {
        this._dom = null;
        if (typeof _text == "string")
            this._text = _text;
        else if (_text instanceof WordView) {
            this._text = _text._text;
            this._tokenType = _text._tokenType;
        }
        this._tokenType = tokenType;
        this._dom = util_1.DomHelper.elem("span");
        let _node = document.createTextNode(this._text);
        this._dom.appendChild(_node);
        switch (this._tokenType) {
            case util_1.MarkdownTokenType.Heading1:
                addClass(this._dom, "mde-word-h1");
                break;
            case util_1.MarkdownTokenType.Heading2:
                addClass(this._dom, "mde-word-h2");
                break;
            case util_1.MarkdownTokenType.Bold:
                addClass(this._dom, "mde-word-bold");
                break;
            case util_1.MarkdownTokenType.Italic:
                addClass(this._dom, "mde-word-italic");
                break;
            case util_1.MarkdownTokenType.Pre:
                addClass(this._dom, "mde-word-pre");
                break;
            case util_1.MarkdownTokenType.ListItemStart:
                addClass(this._dom, "mde-word-listItemStart");
                break;
            case util_1.MarkdownTokenType.BlockquoteStart:
                addClass(this._dom, "mde-word-blockquoteStart");
                break;
            case util_1.MarkdownTokenType.HTMLPunct:
                addClass(this._dom, "mde-word-htmlPunct");
                break;
            case util_1.MarkdownTokenType.HTMLComment:
                addClass(this._dom, "mde-word-htmlComment");
                break;
            case util_1.MarkdownTokenType.HTMLTag:
                addClass(this._dom, "mde-word-htmlTag");
                break;
            case util_1.MarkdownTokenType.HTMLAttribute:
                addClass(this._dom, "mde-word-htmlAttribute");
                break;
            case util_1.MarkdownTokenType.HTMLString:
                addClass(this._dom, "mde-word-htmlString");
                break;
            case util_1.MarkdownTokenType.SquareBracket:
                addClass(this._dom, "mde-word-squareBracket");
                break;
        }
    }
    getCoordinate(offset) {
        if (offset > this.length)
            throw new Error("Index out of range. offset:" + offset);
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
    element() {
        return this._dom;
    }
    appendTo(elm) {
        elm.appendChild(this._dom);
    }
    get length() {
        return this._text.length;
    }
    get text() {
        return this._text;
    }
    get tokenType() {
        return this._tokenType;
    }
}
exports.WordView = WordView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdXb3JkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSx1QkFBMkMsU0FFM0MsQ0FBQyxDQUZtRDtBQUVwRCxrQkFBa0IsR0FBZ0IsRUFBRSxTQUFpQjtJQUNqRCxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNqQyxDQUFDO0FBRUQ7SUFNSSxZQUFZLEtBQXdCLEVBQUUsU0FBUyxHQUFzQix3QkFBaUIsQ0FBQyxJQUFJO1FBRm5GLFNBQUksR0FBb0IsSUFBSSxDQUFDO1FBR2pDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxJQUFJLFFBQVEsQ0FBQztZQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxZQUFZLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQztRQUN2QyxDQUFDO1FBRUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFFNUIsSUFBSSxDQUFDLElBQUksR0FBRyxnQkFBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUduQyxJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUU3QixNQUFNLENBQUEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNyQixLQUFLLHdCQUFpQixDQUFDLFFBQVE7Z0JBQzNCLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDO2dCQUNuQyxLQUFLLENBQUM7WUFDVixLQUFLLHdCQUFp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QyxJQUFJO2dCQUNaLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRzthQUNkLENBQUE7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUVELE9BQU87UUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRUQsUUFBUSxDQUFDLEdBQWdCO1FBQ3JCLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxJQUFJLE1BQU07UUFDTixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDN0IsQ0FBQztJQUVELElBQUksSUFBSTtRQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUFJLFNBQVM7UUFDVCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDO0FBRUwsQ0FBQztBQTNHWSxnQkFBUSxXQTJHcEIsQ0FBQSIsImZpbGUiOiJ2aWV3L3ZpZXdXb3JkLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
