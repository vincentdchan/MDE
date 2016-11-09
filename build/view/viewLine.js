"use strict";
const viewWord_1 = require("./viewWord");
const _1 = require(".");
const dom_1 = require("../util/dom");
class LineView {
    constructor() {
        this._dom = null;
        this._line_content_dom = null;
        this._state = new _1.MarkdownLexerState();
        this._dom = dom_1.elem("div", "editor-line");
    }
    generateContentDom() {
        return dom_1.elem("div", "editor-line-content");
    }
    render(content) {
        this._words = [];
        content = content.slice(0, content.length - 1);
        if (this._line_content_dom) {
            this._dom.removeChild(this._line_content_dom);
        }
        this._line_content_dom = this.generateContentDom();
        let wordView = new viewWord_1.WordView(content);
        this._words.push(wordView);
        this._line_content_dom.appendChild(wordView.element());
        this._dom.appendChild(this._line_content_dom);
    }
    getCoordinate(offset) {
        let count = 0;
        for (let i = 0; i < this._words.length; i++) {
            let word = this._words[i];
            if (offset < count + word.length) {
                return word.getCoordinate(offset);
            }
            count += word.length;
        }
        if (count == offset) {
            let rect = this._words[this._words.length - 1].element().getBoundingClientRect();
            return {
                x: rect.left + rect.width,
                y: rect.top,
            };
        }
        throw new Error("Index out of Range.");
    }
    dispose() {
        if (this._dom) {
            this._dom.parentNode.removeChild(this._dom);
            this._dom = null;
        }
    }
    element() {
        return this._dom;
    }
    on(name, callback, useCapture) {
        this._dom.addEventListener(name, callback, useCapture);
    }
    get words() {
        return this._words;
    }
    get state() {
        return this._state;
    }
}
exports.LineView = LineView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdMaW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwyQkFBdUIsWUFDdkIsQ0FBQyxDQURrQztBQUNuQyxtQkFBOEQsR0FDOUQsQ0FBQyxDQURnRTtBQUNqRSxzQkFBZ0MsYUFDaEMsQ0FBQyxDQUQ0QztBQUc3QztJQVFJO1FBSFEsU0FBSSxHQUFnQixJQUFJLENBQUM7UUFDekIsc0JBQWlCLEdBQWdCLElBQUksQ0FBQztRQUcxQyxJQUFJLENBQUMsTUFBTSxHQUFJLElBQUkscUJBQWtCLEVBQUUsQ0FBQztRQUV4QyxJQUFJLENBQUMsSUFBSSxHQUFHLFVBQUksQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVPLGtCQUFrQjtRQUN0QixNQUFNLENBQUMsVUFBSSxDQUFDLEtBQUssRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxNQUFNLENBQUMsT0FBZTtRQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNqQixPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMvQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ2xELENBQUM7UUFDRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFFbkQsSUFBSSxRQUFRLEdBQUcsSUFBSSxtQkFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTNCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELGFBQWEsQ0FBQyxNQUFjO1FBQ3hCLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNkLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUMxQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3RDLENBQUM7WUFDRCxLQUFLLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN6QixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDbEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQ2pGLE1BQU0sQ0FBQztnQkFDSCxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSztnQkFDekIsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHO2FBQ2QsQ0FBQTtRQUNMLENBQUM7UUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELE9BQU87UUFDSCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDckIsQ0FBQztJQUNMLENBQUM7SUFFRCxPQUFPO1FBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVELEVBQUUsQ0FBQyxJQUFZLEVBQUUsUUFBNEMsRUFBRSxVQUFvQjtRQUMvRSxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELElBQUksS0FBSztRQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0FBRUwsQ0FBQztBQTNFWSxnQkFBUSxXQTJFcEIsQ0FBQSIsImZpbGUiOiJ2aWV3L3ZpZXdMaW5lLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
