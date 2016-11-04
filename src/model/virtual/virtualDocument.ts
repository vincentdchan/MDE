import {VirtualLine} from "./virtualLine"

export class VirtualDocument {

    private _lines: VirtualLine[];

    constructor() {
        this._lines = [];
    }

    get lines() {
        return this._lines;
    }

}
