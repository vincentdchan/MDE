import {Coordinate} from "."

export class ScrollHeightChangedEvent extends Event {

    private _scroll_height: number;
    private _old_height: number;

    constructor(newHeight: number, oldHeight?: number) {
        super("scrollHeightChanged");

        this._scroll_height = newHeight;
        this._old_height = oldHeight;
    }

    get newHeight() {
        return this._scroll_height;
    }

    get oldHeight() {
        return this._old_height;
    }

}

export class CursorMoveEvent extends Event {

    private _pos: Position;
    private _co: Coordinate;

    constructor(pos: Position, abs_co: Coordinate) {
        super("cursorMove");
        this._pos = pos;
        this._co = abs_co;
    }

    get position() {
        return this._pos;
    }

    get absoluteCoordinate() {
        return this._co;
    }

}
