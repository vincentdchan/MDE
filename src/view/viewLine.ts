import {WordView} from "./viewWord"
import {IVirtualElement, Coordinate, MarkdownLexerState, 
    HighlightingRange, HighlightingType} from "."
import {IDisposable, DomHelper} from "../util"
import {Deque} from "../util/queue"

function getItem<T>(arr : T[], index: number) : T {
    if (arr === undefined || index >= arr.length || index < 0) return null;
    return arr[index];
}

function mergeSet<T>(a: Set<T>, b: Set<T>) {
    let result = new Set<T>();

    function addToResult(e : T) {
        result.add(e);
    }

    a.forEach(addToResult);
    b.forEach(addToResult);

    return result;
}

export class RenderTextEvent extends Event {

    private _text: string;

    constructor(text: string) {
        super("renderText");

        this._text = text;
    }

    get text() {
        return this._text;
    }

}

export class RenderNumberEvent extends Event {

    private _num: number;

    constructor(num: number) {
        super("renderNumber");

        this._num = num;
    }

    get number() {
        return this._num;
    }

}

class LeftMargin extends DomHelper.ResizableElement implements IDisposable {

    constructor(width: number) {
        super("div", "mde-line-leftMargin");

        this._dom.style.display = "block";
        this._dom.style.cssFloat = "left";
        this.width = width;
    }

    removeChild(node: Node) {
        this._dom.removeChild(node);
    }

    clearAll() {
        while(this._dom.children.length > 0) {
            this._dom.removeChild(this._dom.lastChild);
        }
    }

    dispose() {
    }

}

export class LineView extends DomHelper.AppendableDomWrapper implements IDisposable {

    public static readonly DefaultLeftMarginWidth = 40;

    private _leftMargin: LeftMargin;
    private _content: string;
    private _words: WordView[]; 
    private _state: MarkdownLexerState;
    private _rendered_lineNumber: number = 0;
    private _line_content_dom: HTMLElement = null;

    constructor() {
        super("p", "mde-line");

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

        this._state =  new MarkdownLexerState();
    }

    private generateContentDom() : HTMLElement {
        let elem = DomHelper.elem("span", "mde-line-content");
        elem.style.marginLeft = this._leftMargin.width + "px";
        elem.style.width = "auto";
        // elem.style.width = "100%";
        elem.style.display = "block";
        return elem;
    }

    private static splitArr(hlr_arr : HighlightingRange[]) {

        let result : HighlightingRange[] = [];

        hlr_arr.sort((a : HighlightingRange, b : HighlightingRange) => {
            return a.begin - b.begin;
        });

        let deque = new Deque<HighlightingRange>(hlr_arr);

        while(!deque.empty()) {
            let first = deque.pop_front();
            if (deque.empty()) {
                result.push(first);
                break;
            }
            else {
                let second = deque.pop_front();

                if (first.begin === second.begin) {
                    if (first.end > second.end) {

                        let pushOne : HighlightingRange = {
                            begin: first.begin,
                            end: second.end,
                            types: mergeSet(first.types, second.types),
                        },
                        returnOne : HighlightingRange = {
                            begin: second.end,
                            end: first.end,
                            types: first.types,
                        };

                        result.push(pushOne);
                        deque.push_front(returnOne);
                    } else if (first.end < second.end) {

                        let pushOne : HighlightingRange = {
                            begin: first.begin,
                            end: first.end,
                            types: mergeSet(first.types, second.types),
                        },
                        returnOne : HighlightingRange = {
                            begin: first.end,
                            end: second.end,
                            types: second.types,
                        };

                        result.push(pushOne);
                        deque.push_front(returnOne);

                    } else { // first.end === second.end

                        result.push({
                            begin: first.begin,
                            end: first.end,
                            types: mergeSet(first.types, second.types),
                        });

                    }
                } else { // first.begin > second.begin

                    if (first.end <= second.begin) {
                        result.push(first);
                        deque.push_front(second);
                    } else {

                        result.push({
                            begin: first.begin,
                            end: second.begin,
                            types: first.types,
                        })

                        deque.push_front({
                            begin: second.begin,
                            end: first.end,
                            types: first.types,
                        })

                    }

                }
            }
        }

        return result;
    }

    renderLineNumber(num: number) {
        if (num !== this._rendered_lineNumber) {
            let span = DomHelper.Generic.elem<HTMLSpanElement>("span", 
                "mde-line-number unselectable");

            this._leftMargin.clearAll();

            let node = document.createTextNode(num.toString());
            span.appendChild(node);

            this._leftMargin.element().appendChild(span);
            this._rendered_lineNumber = num;

            let evt = new RenderNumberEvent(num);
            this._dom.dispatchEvent(evt);
        }
    }

    render(content: string, hlr_arr? : HighlightingRange[]) {
        hlr_arr = hlr_arr ? LineView.splitArr(hlr_arr) : [];

        this._words = [];
        content = content.slice(0, content.length - 1);
        if (this._line_content_dom) {
            this._dom.removeChild(this._line_content_dom);
        }
        this._line_content_dom = this.generateContentDom();

        if (hlr_arr.length == 0) {
            let wordView = new WordView(content);
            this._words.push(wordView);
            this._line_content_dom.appendChild(wordView.element());
        } else {

            function arrayStream<T>(arr: T[]) {
                let index = 0;
                return function () {
                    if (index >= length)
                        return null;
                    else
                        return arr[index++];
                }
            }

            let stream = arrayStream(hlr_arr);

            let nextSlice = stream();

            let pos = 0;
            while (pos < content.length) {
                if (nextSlice === null) {
                    let _slice = content.slice(pos);
                    this.appendWord(_slice);
                    pos = content.length;
                } else if (pos < nextSlice.begin) {
                    let _slice = content.slice(pos, nextSlice.begin);
                    this.appendWord(_slice);
                    pos = nextSlice.begin;
                    nextSlice = stream();
                } else if (pos === nextSlice.begin) {
                    let _slice = content.slice(nextSlice.begin, nextSlice.end);
                    this.appendWord(_slice, nextSlice.types)
                    pos = nextSlice.end;
                    nextSlice = stream();
                }
            }

        }

        this._dom.appendChild(this._line_content_dom);

        let evt = new RenderTextEvent(content);
        this._dom.dispatchEvent(evt);
    }

    private appendWord(content: string, ranges? : Set<HighlightingType>) {
        let wordView = new WordView(content, ranges);
        this._words.push(wordView);
        this._line_content_dom.appendChild(wordView.element());
    }

    ///
    /// get coordinate of the alphabet in the specific offset
    /// if "safe" parameter is set to true, it will throw a Error
    ///     if the offset is not in range.
    ///
    getCoordinate(offset: number, safe: boolean = true) : Coordinate {
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
        } else {
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

    get state() {
        return this._state;
    }

}
