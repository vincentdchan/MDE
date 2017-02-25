"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const viewWord_1 = require("./viewWord");
const util_1 = require("../util");
const typescript_domhelper_1 = require("typescript-domhelper");
function getItem(arr, index) {
    if (arr === undefined || index >= arr.length || index < 0)
        return null;
    return arr[index];
}
function mergeSet(a, b) {
    let result = new Set();
    function addToResult(e) {
        result.add(e);
    }
    a.forEach(addToResult);
    b.forEach(addToResult);
    return result;
}
class RenderTextEvent extends Event {
    constructor(text) {
        super("renderText");
        this._text = text;
    }
    get text() {
        return this._text;
    }
}
exports.RenderTextEvent = RenderTextEvent;
class RenderNumberEvent extends Event {
    constructor(num) {
        super("renderNumber");
        this._num = num;
    }
    get number() {
        return this._num;
    }
}
exports.RenderNumberEvent = RenderNumberEvent;
class LeftMargin extends util_1.DomWrapper.ResizableElement {
    constructor(width) {
        super("div", "mde-line-leftMargin");
        this._dom.style.display = "block";
        this._dom.style.cssFloat = "left";
        this.width = width;
    }
    removeChild(node) {
        this._dom.removeChild(node);
    }
    clearAll() {
        while (this._dom.children.length > 0) {
            this._dom.removeChild(this._dom.lastChild);
        }
    }
    dispose() {
    }
}
class LineView extends util_1.DomWrapper.AppendableDomWrapper {
    constructor(index) {
        super("p", "mde-line");
        this._rendered_lineNumber = 0;
        this._line_content_dom = null;
        this._leftMargin = new LeftMargin(LineView.DefaultLeftMarginWidth);
        this._leftMargin.appendTo(this._dom);
        this._dom.style.whiteSpace = "pre-wrap";
        this._dom.style.minHeight = "16px";
        this._dom.style.position = "relative";
        this._dom.style.width = "inherit";
        this._dom.style.paddingTop = "5px";
        this._dom.style.paddingBottom = "5px";
        this._dom.style.margin = "0";
        this._dom.style.cursor = "text";
        this._line_index = index;
        this.renderLineNumber(index);
    }
    renderTokens(tokens) {
        this._words = [];
        if (this._line_content_dom) {
            this._dom.removeChild(this._line_content_dom);
            this._line_content_dom = null;
        }
        this._line_content_dom = this.generateContentDom();
        tokens.forEach((token, index) => {
            let wordView = new viewWord_1.WordView(token.text, token.type);
            this._words.push(wordView);
            wordView.appendTo(this._line_content_dom);
        });
        this._dom.appendChild(this._line_content_dom);
    }
    renderLineNumber(num) {
        if (num !== this._rendered_lineNumber) {
            let span = typescript_domhelper_1.Dom.Span("mde-line-number unselectable");
            this._leftMargin.clearAll();
            let node = document.createTextNode(num.toString());
            span.appendChild(node);
            this._leftMargin.element().appendChild(span);
            this._rendered_lineNumber = num;
            let evt = new RenderNumberEvent(num);
            this._dom.dispatchEvent(evt);
        }
    }
    generateContentDom() {
        let elem = typescript_domhelper_1.Dom.Span("mde-line-content");
        elem.style.marginLeft = this._leftMargin.width + "px";
        elem.style.width = "auto";
        elem.style.display = "block";
        return elem;
    }
    renderPlainText(content) {
        this._words = [];
        if (content.length > 0 && content.charAt(content.length - 1) == '\n')
            content = content.slice(0, content.length - 1);
        if (this._line_content_dom) {
            this._dom.removeChild(this._line_content_dom);
        }
        this._line_content_dom = this.generateContentDom();
        let wordView = new viewWord_1.WordView(content);
        this._words.push(wordView);
        this._line_content_dom.appendChild(wordView.element());
        this._dom.appendChild(this._line_content_dom);
        let evt = new RenderTextEvent(content);
        this._dom.dispatchEvent(evt);
    }
    getCoordinate(offset, safe = true) {
        let count = 0;
        for (let i = 0; i < this._words.length; i++) {
            let word = this._words[i];
            if (offset < count + word.length) {
                return word.getCoordinate(offset - count);
            }
            count += word.length;
        }
        if (safe) {
            throw new Error("Index out of Range. offset: " + offset);
        }
        else {
            let lastWord = this._words[this._words.length - 1];
            return lastWord.getCoordinate(lastWord.length);
        }
    }
    dispose() {
        this._leftMargin.dispose();
    }
    get leftMargin() {
        return this._leftMargin;
    }
    get contentContainerElement() {
        return this._line_content_dom;
    }
    get words() {
        return this._words;
    }
}
LineView.DefaultLeftMarginWidth = 45;
exports.LineView = LineView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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
