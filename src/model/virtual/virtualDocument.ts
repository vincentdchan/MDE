import {VirtualLine} from "./virtualLine"
import {IVirtualElement} from "."
import {elem} from "../../util/dom"

export class VirtualDocument implements IVirtualElement {

    private _lines: VirtualLine[];

    constructor() {
        this._lines = [];
    }

    render(): HTMLElement {
        let frame = elem("div", "editor-document");
        this._lines.forEach((li: VirtualLine) => {
            frame.appendChild(li.render());
        })
        return frame;
    }

    get lines() {
        return this._lines;
    }

}
