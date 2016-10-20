import {Selection} from "./selection"

export enum ChangeOperation {
    INSERT,
    REMOVE,
}

export class Change {

    private _opreation : ChangeOperation;
    private _selection : Selection;
    private _text : string;
    private _next : Change;
    private _prev : Change;

    constructor(_operation : ChangeOperation, _selection : Selection, _text : string) {
        this._opreation = _operation;
        this._selection = _selection;
        this._text = _text;
        this._next = null;
        this._prev = null;
    }

    get operation() {
        return this._opreation;
    }

    get selection() {
        return this._selection;
    }

    get text() {
        return this._text;
    }

    get next() {
        return this._next;
    }

    set next(_next : Change) {
        this._next = _next;
    }

    get prev() {
        return this._prev;
    }

    set prev(_prev : Change) {
        this._prev = _prev;
    }

}
