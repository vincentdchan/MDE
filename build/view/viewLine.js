"use strict";
const _1 = require(".");
const dom_1 = require("../util/dom");
class LineView {
    constructor(line, state, words) {
        this._dom = null;
        this._line = line;
        this._state = state ? state.clone() : new _1.MarkdownLexerState();
        this._words = words ? words : [];
        this._dom = dom_1.elem("div", "editor-line");
    }
    render() {
        this._words.forEach((e) => {
            this._dom.appendChild(e.render());
        });
        return this._dom;
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
    get lineNumber() {
        return this._line;
    }
    get words() {
        return this._words;
    }
    get state() {
        return this._state;
    }
}
exports.LineView = LineView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdMaW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxtQkFBa0QsR0FDbEQsQ0FBQyxDQURvRDtBQUNyRCxzQkFBbUIsYUFDbkIsQ0FBQyxDQUQrQjtBQUdoQztJQVFJLFlBQVksSUFBWSxFQUFFLEtBQTBCLEVBQUUsS0FBa0I7UUFGaEUsU0FBSSxHQUFnQixJQUFJLENBQUM7UUFHN0IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFFbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLEdBQUUsS0FBSyxDQUFDLEtBQUssRUFBRSxHQUFHLElBQUkscUJBQWtCLEVBQUUsQ0FBQztRQUM5RCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssR0FBRSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBRWhDLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBSSxDQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBVztZQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUN0QyxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxPQUFPO1FBQ0gsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLENBQUM7SUFDTCxDQUFDO0lBRUQsSUFBSSxPQUFPO1FBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVELElBQUksVUFBVTtRQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztBQUVMLENBQUM7QUEvQ1ksZ0JBQVEsV0ErQ3BCLENBQUEiLCJmaWxlIjoidmlldy92aWV3TGluZS5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
