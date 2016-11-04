import {VirtualWord} from "./virtualWord"
import {IVirtualElement} from "."
import {elem} from "../../util/dom"

export class VirtualLine implements IVirtualElement {

    private _line: number;
    private _words: VirtualWord[]; 
    constructor(line: number, words?: VirtualWord[]) {
        this._line = line;
        if (words)
            this._words = words;
        else
            this._words = [];
    }

    render(): HTMLElement {
        let dom = elem("div");
        dom.setAttribute("data-lineId", this._line.toString());
        this._words.forEach((e: VirtualWord)=> {
            dom.appendChild(e.render());
        });
        return dom;
    }

    get lineNumber() {
        return this._line;
    }

    get words() {
        return this._words;
    }

}
