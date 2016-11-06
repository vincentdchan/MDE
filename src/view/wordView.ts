
import {ImmutableArray} from "../util"
import {IVirtualElement} from "."
import {elem} from "../util/dom"

// Immutable
export class WordView implements IVirtualElement {

    private _classList: ImmutableArray<string>
    private _text: string;

    constructor(_text: string | WordView, _classList?: ImmutableArray<string>) {
        if (typeof _text == "string")
            this._text = _text;
        else if (_text instanceof WordView) {
            this._text = _text._text;
            this._classList = new ImmutableArray(_text._classList);
        }

        this._classList = _classList;
    }

    render(): HTMLElement {
        let dom = elem("span");
        dom.innerText = this._text;
        this._classList.forEach((e: string)=> {
            dom.classList.add(e);
        })
        return dom;
    }

    get text() {
        return this._text;
    }

    get classList() {
        return this._classList;
    }

}
