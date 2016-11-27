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
class LineView extends util_1.DomHelper.AppendableDomWrapper {
    constructor() {
        super("div", "mde-line");
        this._line_content_dom = null;
        this._state = new _1.MarkdownLexerState();
    }
    generateContentDom() {
        let elem = util_1.DomHelper.elem("p", "mde-line-content");
        elem.style.width = "100%";
        elem.style.display = "block";
        elem.style.boxSizing = "border-box";
        elem.style.paddingTop = "5px";
        elem.style.paddingBottom = "5px";
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
        throw new Error("Index out of Range.");
    }
    dispose() {
        if (this._dom) {
            this._dom.parentNode.removeChild(this._dom);
            this._dom = null;
        }
    }
    get words() {
        return this._words;
    }
    get state() {
        return this._state;
    }
}
exports.LineView = LineView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQsYUFBYSxDQUFDLE1BQWM7UUFDeEIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQzFDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDL0IsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdEMsQ0FBQztZQUNELEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3pCLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNsQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDakYsTUFBTSxDQUFDO2dCQUNILENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLO2dCQUN6QixDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUc7YUFDZCxDQUFBO1FBQ0wsQ0FBQztRQUNELE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsT0FBTztRQUNILEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNyQixDQUFDO0lBQ0wsQ0FBQztJQUVELElBQUksS0FBSztRQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0FBRUwsQ0FBQztBQTdNWSxnQkFBUSxXQTZNcEIsQ0FBQSIsImZpbGUiOiJ2aWV3L3ZpZXdMaW5lLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
