
import {ImmutableArray} from "../util"
import {IVirtualElement, Coordinate} from "."
import {elem} from "../util/dom"
import {IDisposable} from "../util"

// Immutable
export class WordView implements IDisposable {

    private _classList: ImmutableArray<string>
    private _text: string;
    private _dom: HTMLSpanElement = null;

    constructor(_text: string | WordView, _classList?: ImmutableArray<string>) {
        if (typeof _text == "string")
            this._text = _text;
        else if (_text instanceof WordView) {
            this._text = _text._text;
            this._classList = new ImmutableArray(_text._classList);
        }

        this._classList = _classList? _classList : new ImmutableArray<string>();

        this._dom = elem("span");
        this._dom.innerText = this._text;
        this._classList.forEach((e: string)=> {
            this._dom.classList.add(e);
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
