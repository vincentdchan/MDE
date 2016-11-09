import {Deque} from "./queue"

export interface IStack<T> {

    push(T);
    pop(): T;
    empty(): boolean;
    size(): number;

}

export class FixSizeStack<T> implements IStack<T> {

    private _fix_size;
    private _deque : Deque<T>;

    constructor(_fix_size: number) {
        this._fix_size = _fix_size;
        this._deque = new Deque<T>();
    }

    push(obj: T) {
        this._deque.push_back(obj);

        while (this._deque.size() > this._fix_size) {
            this._deque.pop_front();
        }
    }

    pop() : T {
        return this._deque.pop_back();
    }

    size() : number {
        return this._deque.size();
    }

    empty() : boolean {
        return this._deque.size() == 0;
    }

}
