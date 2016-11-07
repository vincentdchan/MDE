"use strict";
const _1 = require(".");
const dom_1 = require("../util/dom");
class LineView {
    constructor() {
        this._dom = null;
        this._line_content_dom = null;
        this._state = new _1.MarkdownLexerState();
        this._words = [];
        this._dom = dom_1.elem("div", "editor-line");
    }
    generateContentDom() {
        return dom_1.elem("div", "editor-line-content");
    }
    render(content) {
        if (this._line_content_dom) {
            this._dom.removeChild(this._line_content_dom);
        }
        this._line_content_dom = this.generateContentDom();
        let span = dom_1.elem("span", "editor-word");
        span.innerText = content;
        this._line_content_dom.appendChild(span);
    }
    dispose() {
        if (this._dom) {
            this._dom.parentNode.removeChild(this._dom);
            this._dom = null;
        }
    }
    get element() {
        return this._dom;
    }
    get words() {
        return this._words;
    }
    get state() {
        return this._state;
    }
}
exports.LineView = LineView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdMaW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxtQkFBa0QsR0FDbEQsQ0FBQyxDQURvRDtBQUNyRCxzQkFBbUIsYUFDbkIsQ0FBQyxDQUQrQjtBQUdoQztJQVFJO1FBSFEsU0FBSSxHQUFnQixJQUFJLENBQUM7UUFDekIsc0JBQWlCLEdBQWdCLElBQUksQ0FBQztRQUcxQyxJQUFJLENBQUMsTUFBTSxHQUFJLElBQUkscUJBQWtCLEVBQUUsQ0FBQztRQUN4QyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUVqQixJQUFJLENBQUMsSUFBSSxHQUFHLFVBQUksQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVPLGtCQUFrQjtRQUN0QixNQUFNLENBQUMsVUFBSSxDQUFDLEtBQUssRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxNQUFNLENBQUMsT0FBZTtRQUNsQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ2xELENBQUM7UUFDRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFFbkQsSUFBSSxJQUFJLEdBQUcsVUFBSSxDQUFDLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztRQUV6QixJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCxPQUFPO1FBQ0gsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLENBQUM7SUFDTCxDQUFDO0lBRUQsSUFBSSxPQUFPO1FBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVELElBQUksS0FBSztRQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0FBRUwsQ0FBQztBQWxEWSxnQkFBUSxXQWtEcEIsQ0FBQSIsImZpbGUiOiJ2aWV3L3ZpZXdMaW5lLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
