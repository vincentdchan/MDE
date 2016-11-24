
import {ImmutableArray} from "../util"
import {IVirtualElement, Coordinate, HighlightingType} from "."
import {elem} from "../util/dom"
import {IDisposable} from "../util"

export class WordView implements IDisposable {

    private _classList: Set<HighlightingType>;
    private _text: string;
    private _dom: HTMLSpanElement = null;

    constructor(_text: string | WordView, _classList?: Set<HighlightingType>) {
        if (typeof _text == "string")
            this._text = _text;
        else if (_text instanceof WordView) {
            this._text = _text._text;
            this._classList = _text._classList;
        }

        this._classList = _classList? new Set(_classList) : new Set<HighlightingType>();

        this._dom = elem("span");
        this._dom.innerText = this._text;

        this._classList.forEach((e: HighlightingType)=> {
            switch(e) {
                case HighlightingType.Bold:
                    this._dom.classList.add("mde-word-bold");
                    break;
                case HighlightingType.Underline:
                    this._dom.classList.add("mde-word-underline");
                    break;
                case HighlightingType.Italic:
                    this._dom.classList.add("mde-word-italic");
                    break;
            }
            this._dom.classList.add(e.toString());
        })
    }

    getCoordinate(offset: number) : Coordinate {
        if (offset >= this.length)
            throw new Error("Index out of range.");
        if (offset === 0) {
            let rect = this._dom.getBoundingClientRect();
            return {
                x: rect.left,
                y: rect.top,
            }
        } else {
            let domRange = document.createRange();
            domRange.setStart(this._dom.firstChild, offset);
            domRange.setEnd(this._dom.firstChild, offset);
            let rect = domRange.getBoundingClientRect();
            return {
                x: rect.left,
                y: rect.top,
            }
        }
    }

    dispose() {
        this._dom.parentElement.removeChild(this._dom);
        this._dom = null;
    }

    element() {
        return this._dom;
    }

    get length() {
        return this._text.length;
    }

    get text() {
        return this._text;
    }

    get classList() {
        return this._classList;
    }

}
