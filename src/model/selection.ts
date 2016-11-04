import {Position, Range, isPosition, isRange} from "."

export class Selection {

    private _ranges: Range[];

    constructor() {
        this._ranges;
    }

    get ranges() {
        return this._ranges;
    }

}
