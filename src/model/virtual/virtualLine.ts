import {VirtualWord} from "./virtualWord"

export class VirtualLine {

    private _line: number;
    private _words: VirtualWord[]; 
    constructor(line: number, words?: VirtualWord[]) {
        this._line = line;
        if (words)
            this._words = words;
        else
            this._words = [];
    }

    get lineNumber() {
        return this._line;
    }

    get words() {
        return this._words;
    }

}
