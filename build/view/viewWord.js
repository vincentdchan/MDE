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
            case util_1.MarkdownTokenType.Heading3:
                addClass(this._dom, "mde-word-h3");
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdXb3JkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSx1QkFBMkMsU0FFM0MsQ0FBQyxDQUZtRDtBQUVwRCxrQkFBa0IsR0FBZ0IsRUFBRSxTQUFpQjtJQUNqRCxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNqQyxDQUFDO0FBRUQ7SUFNSSxZQUFZLEtBQXdCLEVBQUUsU0FBUyxHQUFzQix3QkFBaUIsQ0FBQyxJQUFJO1FBRm5GLFNBQUksR0FBb0IsSUFBSSxDQUFDO1FBR2pDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxJQUFJLFFBQVEsQ0FBQztZQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxZQUFZLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQztRQUN2QyxDQUFDO1FBRUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFFNUIsSUFBSSxDQUFDLElBQUksR0FBRyxnQkFBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUduQyxJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUU3QixNQUFNLENBQUEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNyQixLQUFLLHdCQUFpQixDQUFDLFFBQVE7Z0JBQzNCLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDO2dCQUNuQyxLQUFLLENBQUM7WUFDVixLQUFLLHdCQUFpQixDQUFDLFFBQVE7Z0JBQzNCLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDO2dCQUNuQyxLQUFLLENBQUM7WUFDVixLQUFLLHdCQUFpQixDQUFDLFFBQVE7Z0JBQzNCLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDO2dCQUNuQyxLQUFLLENBQUM7WUFDVixLQUFLLHdCQUFpQixDQUFDLElBQUk7Z0JBQ3ZCLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxDQUFDO2dCQUNyQyxLQUFLLENBQUM7WUFDVixLQUFLLHdCQUFpQixDQUFDLE1BQU07Z0JBQ3pCLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLGlCQUFpQixDQUFDLENBQUM7Z0JBQ3ZDLEtBQUssQ0FBQztZQUNWLEtBQUssd0JBQWlCLENBQUMsR0FBRztnQkFDdEIsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7Z0JBQ3BDLEtBQUssQ0FBQztZQUNWLEtBQUssd0JBQWlCLENBQUMsYUFBYTtnQkFDaEMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztnQkFDOUMsS0FBSyxDQUFDO1FBQ2QsQ0FBQztJQUVMLENBQUM7SUFFRCxhQUFhLENBQUMsTUFBYztRQUN4QixFQUFFLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUNyQixNQUFNLElBQUksS0FBSyxDQUFDLDZCQUE2QixHQUFHLE1BQU0sQ0FBQyxDQUFDO1FBQzVELEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQzdDLE1BQU0sQ0FBQztnQkFDSCxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUk7Z0JBQ1osQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHO2FBQ2QsQ0FBQTtRQUNMLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN0QyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ2hELFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDOUMsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDNUMsTUFBTSxDQUFDO2dCQUNILENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDWixDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUc7YUFDZCxDQUFBO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFFRCxPQUFPO1FBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVELFFBQVEsQ0FBQyxHQUFnQjtRQUNyQixHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQzdCLENBQUM7SUFFRCxJQUFJLElBQUk7UUFDSixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBRUQsSUFBSSxTQUFTO1FBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQztBQUVMLENBQUM7QUF6RlksZ0JBQVEsV0F5RnBCLENBQUEiLCJmaWxlIjoidmlldy92aWV3V29yZC5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
