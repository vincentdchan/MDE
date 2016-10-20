
export class Selection {

    private _beginLine : number;
    private _beginOffset : number;
    private _endLine : number;
    private _endOffset : number;

    constructor(_beginLine : number, _beginOffset, _endLine : number, _endOffset : number) {
        this._beginLine = _beginLine;
        this._beginOffset = _beginOffset;
        this._endLine = _endLine;
        this._endOffset = _endOffset;
    }

    get beginLine() {
        return this._beginLine
    }

    get endLine() {
        return this._endLine
    }

    get beginOffset() {
        return this._beginOffset;
    }

    get endOffset() {
        return this._endOffset;
    }

}
