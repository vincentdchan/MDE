
class ImmutableArrayIterator<T> implements Iterator<T> {

    private _array: ImmutableArray<T>;
    private _index: number;

    constructor(_array: ImmutableArray<T>) {
        this._array = _array;
        this._index = 0;
    }

    next(): IteratorResult<T> {
        let _done = this._index < this._array.length;
        let _result =  {
            done: _done,
            value: _done? null : this._array.get(this._index),
        }
        this._index++;
        return _result;
    }

}

export class ImmutableArray<T> implements Iterable<T> {

    private _arr : T[];

    constructor(_obj?: ImmutableArray<T> | Array<T>) {
        if (_obj instanceof ImmutableArray) {
            this._arr = [..._obj._arr];
        } else if (_obj instanceof Array) {
            this._arr = [..._obj];
        } else {
            this._arr = []
        }
    }

    push(_elm: T): ImmutableArray<T> {
        let newIm = new ImmutableArray<T>(this);
        newIm._arr.push(_elm);
        return newIm
    }

    pop(): ImmutableArray<T> {
        let newIm = new ImmutableArray<T>(this);
        newIm._arr.pop();
        return newIm;
    }

    get(index: number) {
        return this._arr[index];
    }

    set(index: number, elm: T) {
        let newIm = new ImmutableArray<T>(this);
        newIm._arr[index] = elm;
    }

    slice(begin: number, end?: number) {
        let newIm = new ImmutableArray<T>(this);
        if (end) {
            newIm._arr = newIm._arr.slice(begin, end);
        } else {
            newIm._arr = newIm._arr.slice(begin);
        }
        return newIm;
    }

    resize(size: number) {
        let newIm = new ImmutableArray<T>(this);
        newIm._arr.length = size;
        return newIm;
    }

    get length() {
        return this._arr.length;
    }

    forEach(_fun: (T) => any) {
        this._arr.forEach(_fun);
    }

    [Symbol.iterator](): Iterator<T> {
        return new ImmutableArrayIterator(this);
    }

}
