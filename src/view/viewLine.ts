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

export class LineView extends DomHelper.AppendableDomWrapper implements IDisposable {

    private _content: string;
    private _words: WordView[]; 
    private _state: MarkdownLexerState;
    private _line_content_dom: HTMLElement = null;

    constructor() {
        super("div", "mde-line");

        this._state =  new MarkdownLexerState();
    }

    private generateContentDom() : HTMLElement {
        return DomHelper.elem("p", "mde-line-content");
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
    }

    private appendWord(content: string, ranges? : Set<HighlightingType>) {
        let wordView = new WordView(content, ranges);
        this._words.push(wordView);
        this._line_content_dom.appendChild(wordView.element());
    }

    getCoordinate(offset: number) : Coordinate {
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
            }
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
