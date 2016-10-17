

export interface IDeque<T> {
    push_back(value : T) : void;
    push_front(value : T) : void;
    pop_back() : T;
    pop_front() : T;
    size() : number;
}

class DequeNode<T> {
    
    private _prev: DequeNode<T>;
    private _next: DequeNode<T>;
    private _value : T;
    
    constructor() {

    }
    
    set value(v : T) {
        this._value = v;
    }
    
    get value() : T {
        return this._value;
    }
    
    set prev(v : DequeNode<T>) {
        this._prev = v;
    }
   
    get prev() : DequeNode<T> {
        return this._prev;
    }
    
    set next(v : DequeNode<T>) {
        this._next = v;
    }
    
    get next() : DequeNode<T> {
        return this._next;
    }

}

export class Deque<T> implements IDeque<T> {
    
    private begin : DequeNode<T> = null;
    private end : DequeNode<T> = null;
    private _size : number = 0;
    
    constructor() {
        
    }
    
    push_back(v : T) : void {
        var new_node = new DequeNode<T>();
        new_node.value = v;
        
        if (this.end === null) {
            this.begin = this.end = new_node;
        } else {
            this.end.next = new_node;
            new_node.prev = this.end;
            this.end = new_node;
        }
        this._size++;
    }
    
    push_front(v : T) : void {
        var new_node = new DequeNode<T>();
        new_node.value = v;
        
        if (this.begin === null) {
            this.begin = this.end = new_node;
        } else {
            this.begin.prev = new_node;
            new_node.next = this.begin;
            this.begin = new_node;
        }
        this._size++;
    }
    
    pop_back() : T {
        if (this.end === null) {
            throw new Error("The deque is emtpy.");
        }
        var last = this.end;
        this.end = this.end.prev;
        
        if (this.end !== null) {
            this.end.next = null;
        } else {
            this.begin = null;
        }
        
        this._size--;
        return last.value;
    }
    
    pop_front() : T {
        if (this.end === null) {
            throw new Error("The deque is emtpy.");
        }
        var first = this.begin;
        this.begin = this.begin.next;
        
        if (this.begin !== null) {
            this.begin.prev = null;
        } else {
            this.end = null;
        }
        
        this._size--;
        return first.value;
    }
    
    size() : number {
        
        return this._size;
    }

}
