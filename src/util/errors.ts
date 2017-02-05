
/**
 * Not in range error
 */
export class NotInRangeError<T> extends Error {

    private _max: T;
    private _min: T;
    private _data: T;

    constructor(data: T, max?: T, min?: T) {
        super("Not in range.")
        this._data = data;
        this._max = max;
        this._min = min;
        this.message = "<NotInRange " +
            "max=" + this._max +
            " min=" + this._min +
            " data=" + this._data +
            ">";
    }

    get maxBound(): T {
        return this._max;
    }

    get minBound(): T {
        return this._min;
    }
    
    get data(): T {
        return this._data;
    }

}
