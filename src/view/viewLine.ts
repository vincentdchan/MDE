import {WordView} from "./viewWord"
import {IVirtualElement, MarkdownLexerState} from "."
import {elem} from "../util/dom"
import {IDisposable} from "../util"

export class LineView implements IDisposable {

    private _content: string;
    private _words: WordView[]; 
    private _state: MarkdownLexerState;
    private _dom: HTMLElement = null;
    private _line_content_dom: HTMLElement = null;

    constructor() {
        this._state =  new MarkdownLexerState();
        this._words = [];

        this._dom = elem("div", "editor-line");
    }

    private generateContentDom() : HTMLElement {
        return elem("div", "editor-line-content");
    }

    render(content: string) {
        if (this._line_content_dom) {
            this._dom.removeChild(this._line_content_dom);
        }
        this._line_content_dom = this.generateContentDom();

        let span = elem("span", "editor-word");
        span.innerText = content;

        this._line_content_dom.appendChild(span);
        this._dom.appendChild(this._line_content_dom);
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
