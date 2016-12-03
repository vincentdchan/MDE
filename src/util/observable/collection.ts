import {EventEmitter} from "events"
import {PropertyChangedEvent, INotifyPropertyChanged} from "."

export enum CollectionChangedAction {
    Add,
    Move,
    Remove,
    Replace,
    Reset,
}

export class CollectionChangedEvent extends Event {

    private _action: CollectionChangedAction;
    private _newItems: any[];
    private _newStartingIndex: number;
    private _oldItems: any[];
    private _oldStartingIndex: number;

    constructor(action: CollectionChangedAction,
                newItems: any[],
                newStartingIndex: number,
                oldItems: any[],
                oldStartingIndex: number) {
        super("collectionChanged");
        this._action = action;
        this._newItems = newItems;
        this._newStartingIndex = newStartingIndex;
        this._oldItems = oldItems;
        this._oldStartingIndex = oldStartingIndex;
    }

    get action() {
        return this._action;
    }

    get newItems() {
        return this._newItems;
    }

    get newStartingIndex() {
        return this._newStartingIndex;
    }

    get oldItems() {
        return this._oldItems;
    }

    get oldStartingIndex() {
        return this._oldStartingIndex;
    }

}

export interface ICollectionChanged {
    on(name: "collectionChanged", listener: (evt: CollectionChangedEvent) => void);
    addListener(name: "collectionChanged", listener: (evt: CollectionChangedEvent) => void);
}

export class ObservableCollection<T> extends EventEmitter 
    implements ICollectionChanged, INotifyPropertyChanged {

    private _array : T[] = [];

    constructor() {
        super();
    }

    add(obj: T) {
        let oldCount = this._array.length;

        this._array.push(obj);

        let itemsChangedEvent = new PropertyChangedEvent("items", this._array, null);
        let countChangedEvent = new PropertyChangedEvent("count", this._array.length, oldCount);

        let collectionChangedEvent = new CollectionChangedEvent(
            CollectionChangedAction.Add, [obj], this._array.length - 1, null, null
        );

        this.emit("propertyChanged", itemsChangedEvent);
        this.emit("propertyChanged", countChangedEvent);
        this.emit("collectionChanged", collectionChangedEvent);
    }

    remove(obj: T) {
        let index = 0;
        for (; index < this._array.length; index++) {
            if (this._array[index] === obj)
                break;
        }
        if (index === this._array.length)
            throw new Error("This object doesn't exisit. It can not be removed.");
        this.removeAt(index);
    }

    removeAt(index: number) {
        let oldCount = this._array.length;

        let that = this._array[index];
        let prefix = this._array.slice(0, index);
        let postfix = this._array.slice(index + 1);

        this._array = prefix.concat(postfix);

        let itemsChanged = new PropertyChangedEvent("items", this._array, null);
        let countChanged = new PropertyChangedEvent("count", oldCount, this._array.length);
        let collectionChanged = new CollectionChangedEvent(
            CollectionChangedAction.Remove , null, null, [that], index
        )

        this.emit("propertyChanged", itemsChanged);
        this.emit("propertyChanged", countChanged);
        this.emit("collectionChanged", collectionChanged);
    }

    move(a: number, b: number) {
        let tmp = this._array[b];
        this._array[b] = this._array[a];
        this._array[a] = tmp;

        let itemsChanged = new PropertyChangedEvent("items", this._array, null);
        let collectionChanged = new CollectionChangedEvent(
            CollectionChangedAction.Move, null, a, null, b
        );

        this.emit("propertyChanged", itemsChanged);
        this.emit("collectionChanged", collectionChanged);
    }

    clearAll() {
        let oldCount = this._array.length,
            oldItems = this._array;
        
        this._array = [];

        let itemsChanged = new PropertyChangedEvent("items", this._array, oldItems),
            countChanged = new PropertyChangedEvent("count", 0, oldCount);
        let collectionChanged = new CollectionChangedEvent(
            CollectionChangedAction.Reset, null, null, oldItems, 0
        );
    }

}

