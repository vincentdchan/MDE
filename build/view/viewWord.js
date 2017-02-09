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
        if (this._text.length === 0) {
            let rect = this._dom.getBoundingClientRect();
            return {
                x: rect.left,
                y: rect.top,
            };
        }
        let domRange = document.createRange();
        domRange.setStart(this._dom.firstChild, offset);
        domRange.setEnd(this._dom.firstChild, offset);
        let rect = domRange.getBoundingClientRect();
        return {
            x: rect.left,
            y: rect.top,
        };
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdXb3JkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxrQ0FBb0Q7QUFFcEQsa0JBQWtCLEdBQWdCLEVBQUUsU0FBaUI7SUFDakQsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDakMsQ0FBQztBQUVEO0lBTUksWUFBWSxLQUF3QixFQUFFLFlBQStCLHdCQUFpQixDQUFDLElBQUk7UUFGbkYsU0FBSSxHQUFvQixJQUFJLENBQUM7UUFHakMsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLElBQUksUUFBUSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLFlBQVksUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7WUFDekIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDO1FBQ3ZDLENBQUM7UUFFRCxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUU1QixJQUFJLENBQUMsSUFBSSxHQUFHLGdCQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBR25DLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTdCLE1BQU0sQ0FBQSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLEtBQUssd0JBQWlCLENBQUMsUUFBUTtnQkFDM0IsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7Z0JBQ25DLEtBQUssQ0FBQztZQUNWLEtBQUssd0JBQWlCLENBQUMsUUFBUTtnQkFDM0IsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7Z0JBQ25DLEtBQUssQ0FBQztZQUNWLEtBQUssd0JBQWlCLENBQUMsSUFBSTtnQkFDdkIsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsZUFBZSxDQUFDLENBQUM7Z0JBQ3JDLEtBQUssQ0FBQztZQUNWLEtBQUssd0JBQWlCLENBQUMsTUFBTTtnQkFDekIsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztnQkFDdkMsS0FBSyxDQUFDO1lBQ1YsS0FBSyx3QkFBaUIsQ0FBQyxHQUFHO2dCQUN0QixRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQztnQkFDcEMsS0FBSyxDQUFDO1lBQ1YsS0FBSyx3QkFBaUIsQ0FBQyxhQUFhO2dCQUNoQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO2dCQUM5QyxLQUFLLENBQUM7WUFDVixLQUFLLHdCQUFpQixDQUFDLGVBQWU7Z0JBQ2xDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLDBCQUEwQixDQUFDLENBQUM7Z0JBQ2hELEtBQUssQ0FBQztZQUNWLEtBQUssd0JBQWlCLENBQUMsU0FBUztnQkFDNUIsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztnQkFDMUMsS0FBSyxDQUFDO1lBQ1YsS0FBSyx3QkFBaUIsQ0FBQyxXQUFXO2dCQUM5QixRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO2dCQUM1QyxLQUFLLENBQUM7WUFDVixLQUFLLHdCQUFpQixDQUFDLE9BQU87Z0JBQzFCLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLGtCQUFrQixDQUFDLENBQUM7Z0JBQ3hDLEtBQUssQ0FBQztZQUNWLEtBQUssd0JBQWlCLENBQUMsYUFBYTtnQkFDaEMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztnQkFDOUMsS0FBSyxDQUFDO1lBQ1YsS0FBSyx3QkFBaUIsQ0FBQyxVQUFVO2dCQUM3QixRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO2dCQUMzQyxLQUFLLENBQUM7WUFDVixLQUFLLHdCQUFpQixDQUFDLGFBQWE7Z0JBQ2hDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLHdCQUF3QixDQUFDLENBQUM7Z0JBQzlDLEtBQUssQ0FBQztRQUNkLENBQUM7SUFFTCxDQUFDO0lBRUQsYUFBYSxDQUFDLE1BQWM7UUFDeEIsRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDckIsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsR0FBRyxNQUFNLENBQUMsQ0FBQztRQUM1RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUM3QyxNQUFNLENBQUM7Z0JBQ0gsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJO2dCQUNaLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRzthQUNkLENBQUE7UUFDTCxDQUFDO1FBQ0QsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3RDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDaEQsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM5QyxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUM1QyxNQUFNLENBQUM7WUFDSCxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDWixDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUc7U0FDZCxDQUFBO0lBQ0wsQ0FBQztJQUVELE9BQU87UUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRUQsUUFBUSxDQUFDLEdBQWdCO1FBQ3JCLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxJQUFJLE1BQU07UUFDTixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDN0IsQ0FBQztJQUVELElBQUksSUFBSTtRQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUFJLFNBQVM7UUFDVCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDO0NBRUo7QUExR0QsNEJBMEdDIiwiZmlsZSI6InZpZXcvdmlld1dvcmQuanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
