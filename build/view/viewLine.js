"use strict";
const viewWord_1 = require("./viewWord");
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
    constructor(lineStateManager) {
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
        this._line_state_manager = lineStateManager;
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
            let span = util_1.DomHelper.Generic.elem("span", "mde-line-number unselectable");
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
        if (content.length > 0 && content.charAt(content.length - 1) == '\n')
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
    getCoordinate(offset, safe = true) {
        let count = 0;
        for (let i = 0; i < this._words.length; i++) {
            let word = this._words[i];
            if (offset <= count + word.length) {
                return word.getCoordinate(offset);
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
