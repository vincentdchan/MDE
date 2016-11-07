
export interface IStack<T> {

    push(T);
    pop(): T;
    empty(): boolean;
    size(): number;

}

export class FixSizeStack<T> implements IStack<T> {

    private _fix_size : number;
    private _size : number = 0;
    private _frame_begin : number = 0;
    private _frame_end : number = 0;   
    private _capacity : number = 64;
    private _arr: T[];

    constructor(_fix_size: number) {
        this._fix_size = _fix_size;

        this._arr = [];
        this._arr.length = this._capacity;
    }
    
    private realloc(size: number) {
        this._arr.length = size;
    }

    push(obj: T) {

        if (this._frame_end == this._capacity) {
            this._capacity *= 2;
            this.realloc(this._capacity);
        }

        this._arr[this._frame_end++] = obj;

        if (this._frame_end - this._frame_begin > this._fix_size) {
            this._frame_begin = this._frame_begin - this._fix_size;

            if (this._frame_begin >= this._capacity) {
                let shit = this._arr.slice(0, this._frame_begin);
                this._arr = this._arr.slice(this._frame_begin);
                this._capacity = this._arr.length;

                this._frame_end = this._frame_end - this._frame_begin;
                this._frame_begin = 0;
            }
        }
    }

    pop() : T {
        if (this._frame_begin == this._frame_end)
            throw new Error("The stack is empty.");
        if (this._frame_end <= this._capacity / 4) {
            this._capacity /= 2;
            this.realloc(this._capacity);
        }
        return this._arr[--this._frame_end]
    }

    size() : number {
        return this._frame_end - this._frame_begin;
    }

    empty() : boolean {
        return this._frame_begin == this._frame_end;
    }

}
