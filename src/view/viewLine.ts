import {WordView} from "./viewWord"
import {IVirtualElement, Coordinate, MarkdownLexerState} from "."
import {elem, IDOMWrapper} from "../util/dom"
import {IDisposable} from "../util"

export class LineView implements IDOMWrapper, IDisposable {

    private _content: string;
    private _words: WordView[]; 
    private _state: MarkdownLexerState;
    private _dom: HTMLElement = null;
    private _line_content_dom: HTMLElement = null;

    constructor() {
        this._state =  new MarkdownLexerState();

        this._dom = elem("div", "mde-line");
    }

    private generateContentDom() : HTMLElement {
        return elem("pre", "mde-line-content");
    }

    render(content: string) {
        this._words = [];
        content = content.slice(0, content.length - 1);
        if (this._line_content_dom) {
            this._dom.removeChild(this._line_content_dom);
        }
        this._line_content_dom = this.generateContentDom();

        let wordView = new WordView(content);
        this._words.push(wordView);

        this._line_content_dom.appendChild(wordView.element());
        this._dom.appendChild(this._line_content_dom);
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

    element() {
        return this._dom;
    }

    on(name: string, callback: EventListenerOrEventListenerObject, useCapture?: boolean) {
        this._dom.addEventListener(name, callback, useCapture);
    }

    get words() {
        return this._words;
    }

    get state() {
        return this._state;
    }

}
