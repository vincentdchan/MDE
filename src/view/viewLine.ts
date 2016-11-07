import {WordView} from "./viewWord"
import {IVirtualElement, MarkdownLexerState} from "."
import {elem} from "../util/dom"
import {IDisposable} from "../util"

export class LineView implements IDisposable {

    private _line: number;
    private _content: string;
    private _words: WordView[]; 
    private _state: MarkdownLexerState;
    private _dom: HTMLElement = null;

    constructor(line: number, state?: MarkdownLexerState, words?: WordView[]) {
        this._line = line;

        this._state = state? state.clone() : new MarkdownLexerState();
        this._words = words? words : [];

        this._dom = elem("div", "editor-line");
    }

    render(): HTMLElement {
        this._words.forEach((e: WordView)=> {
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
