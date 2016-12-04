"use strict";
const viewWord_1 = require("./viewWord");
const _1 = require(".");
const util_1 = require("../util");
const queue_1 = require("../util/queue");
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
class LeftMargin extends util_1.DomHelper.ResizableElement {
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
class LineView extends util_1.DomHelper.AppendableDomWrapper {
    constructor() {
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
        this._state = new _1.MarkdownLexerState();
    }
    generateContentDom() {
        let elem = util_1.DomHelper.elem("span", "mde-line-content");
        elem.style.marginLeft = this._leftMargin.width + "px";
        elem.style.width = "auto";
        elem.style.display = "block";
        return elem;
    }
    static splitArr(hlr_arr) {
        let result = [];
        hlr_arr.sort((a, b) => {
            return a.begin - b.begin;
        });
        let deque = new queue_1.Deque(hlr_arr);
        while (!deque.empty()) {
            let first = deque.pop_front();
            if (deque.empty()) {
                result.push(first);
                break;
            }
            else {
                let second = deque.pop_front();
                if (first.begin === second.begin) {
                    if (first.end > second.end) {
                        let pushOne = {
                            begin: first.begin,
                            end: second.end,
                            types: mergeSet(first.types, second.types),
                        }, returnOne = {
                            begin: second.end,
                            end: first.end,
                            types: first.types,
                        };
                        result.push(pushOne);
                        deque.push_front(returnOne);
                    }
                    else if (first.end < second.end) {
                        let pushOne = {
                            begin: first.begin,
                            end: first.end,
                            types: mergeSet(first.types, second.types),
                        }, returnOne = {
                            begin: first.end,
                            end: second.end,
                            types: second.types,
                        };
                        result.push(pushOne);
                        deque.push_front(returnOne);
                    }
                    else {
                        result.push({
                            begin: first.begin,
                            end: first.end,
                            types: mergeSet(first.types, second.types),
                        });
                    }
                }
                else {
                    if (first.end <= second.begin) {
                        result.push(first);
                        deque.push_front(second);
                    }
                    else {
                        result.push({
                            begin: first.begin,
                            end: second.begin,
                            types: first.types,
                        });
                        deque.push_front({
                            begin: second.begin,
                            end: first.end,
                            types: first.types,
                        });
                    }
                }
            }
        }
        return result;
    }
    renderLineNumber(num) {
        if (num !== this._rendered_lineNumber) {
            let span = util_1.DomHelper.elem("span", "mde-line-number");
            this._leftMargin.clearAll();
            let node = document.createTextNode(num.toString());
            span.appendChild(node);
            this._leftMargin.element().appendChild(span);
            this._rendered_lineNumber = num;
            let evt = new RenderNumberEvent(num);
            this._dom.dispatchEvent(evt);
        }
    }
    render(content, hlr_arr) {
        hlr_arr = hlr_arr ? LineView.splitArr(hlr_arr) : [];
        this._words = [];
        content = content.slice(0, content.length - 1);
        if (this._line_content_dom) {
            this._dom.removeChild(this._line_content_dom);
        }
        this._line_content_dom = this.generateContentDom();
        if (hlr_arr.length == 0) {
            let wordView = new viewWord_1.WordView(content);
            this._words.push(wordView);
            this._line_content_dom.appendChild(wordView.element());
        }
        else {
            function arrayStream(arr) {
                let index = 0;
                return function () {
                    if (index >= length)
                        return null;
                    else
                        return arr[index++];
                };
            }
            let stream = arrayStream(hlr_arr);
            let nextSlice = stream();
            let pos = 0;
            while (pos < content.length) {
                if (nextSlice === null) {
                    let _slice = content.slice(pos);
                    this.appendWord(_slice);
                    pos = content.length;
                }
                else if (pos < nextSlice.begin) {
                    let _slice = content.slice(pos, nextSlice.begin);
                    this.appendWord(_slice);
                    pos = nextSlice.begin;
                    nextSlice = stream();
                }
                else if (pos === nextSlice.begin) {
                    let _slice = content.slice(nextSlice.begin, nextSlice.end);
                    this.appendWord(_slice, nextSlice.types);
                    pos = nextSlice.end;
                    nextSlice = stream();
                }
            }
        }
        this._dom.appendChild(this._line_content_dom);
        let evt = new RenderTextEvent(content);
        this._dom.dispatchEvent(evt);
    }
    appendWord(content, ranges) {
        let wordView = new viewWord_1.WordView(content, ranges);
        this._words.push(wordView);
        this._line_content_dom.appendChild(wordView.element());
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
        throw new Error("Index out of Range. offset: " + offset);
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
    get state() {
        return this._state;
    }
}
LineView.DefaultLeftMarginWidth = 40;
exports.LineView = LineView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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
