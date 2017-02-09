"use strict";
const events_1 = require("events");
const _1 = require(".");
var CollectionChangedAction;
(function (CollectionChangedAction) {
    CollectionChangedAction[CollectionChangedAction["Add"] = 0] = "Add";
    CollectionChangedAction[CollectionChangedAction["Move"] = 1] = "Move";
    CollectionChangedAction[CollectionChangedAction["Remove"] = 2] = "Remove";
    CollectionChangedAction[CollectionChangedAction["Replace"] = 3] = "Replace";
    CollectionChangedAction[CollectionChangedAction["Reset"] = 4] = "Reset";
})(CollectionChangedAction = exports.CollectionChangedAction || (exports.CollectionChangedAction = {}));
class CollectionChangedEvent extends Event {
    constructor(action, newItems, newStartingIndex, oldItems, oldStartingIndex) {
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
exports.CollectionChangedEvent = CollectionChangedEvent;
class ObservableCollection extends events_1.EventEmitter {
    constructor() {
        super();
        this._array = [];
    }
    add(obj) {
        let oldCount = this._array.length;
        this._array.push(obj);
        let itemsChangedEvent = new _1.PropertyChangedEvent("items", this._array, null);
        let countChangedEvent = new _1.PropertyChangedEvent("count", this._array.length, oldCount);
        let collectionChangedEvent = new CollectionChangedEvent(CollectionChangedAction.Add, [obj], this._array.length - 1, null, null);
        this.emit("propertyChanged", itemsChangedEvent);
        this.emit("propertyChanged", countChangedEvent);
        this.emit("collectionChanged", collectionChangedEvent);
    }
    remove(obj) {
        let index = 0;
        for (; index < this._array.length; index++) {
            if (this._array[index] === obj)
                break;
        }
        if (index === this._array.length)
            throw new Error("This object doesn't exisit. It can not be removed.");
        this.removeAt(index);
    }
    removeAt(index) {
        let oldCount = this._array.length;
        let that = this._array[index];
        let prefix = this._array.slice(0, index);
        let postfix = this._array.slice(index + 1);
        this._array = prefix.concat(postfix);
        let itemsChanged = new _1.PropertyChangedEvent("items", this._array, null);
        let countChanged = new _1.PropertyChangedEvent("count", oldCount, this._array.length);
        let collectionChanged = new CollectionChangedEvent(CollectionChangedAction.Remove, null, null, [that], index);
        this.emit("propertyChanged", itemsChanged);
        this.emit("propertyChanged", countChanged);
        this.emit("collectionChanged", collectionChanged);
    }
    move(a, b) {
        let tmp = this._array[b];
        this._array[b] = this._array[a];
        this._array[a] = tmp;
        let itemsChanged = new _1.PropertyChangedEvent("items", this._array, null);
        let collectionChanged = new CollectionChangedEvent(CollectionChangedAction.Move, null, a, null, b);
        this.emit("propertyChanged", itemsChanged);
        this.emit("collectionChanged", collectionChanged);
    }
    clearAll() {
        let oldCount = this._array.length, oldItems = this._array;
        this._array = [];
        let itemsChanged = new _1.PropertyChangedEvent("items", this._array, oldItems), countChanged = new _1.PropertyChangedEvent("count", 0, oldCount);
        let collectionChanged = new CollectionChangedEvent(CollectionChangedAction.Reset, null, null, oldItems, 0);
    }
}
exports.ObservableCollection = ObservableCollection;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsL29ic2VydmFibGUvY29sbGVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsbUNBQW1DO0FBQ25DLHdCQUE4RDtBQUU5RCxJQUFZLHVCQU1YO0FBTkQsV0FBWSx1QkFBdUI7SUFDL0IsbUVBQUcsQ0FBQTtJQUNILHFFQUFJLENBQUE7SUFDSix5RUFBTSxDQUFBO0lBQ04sMkVBQU8sQ0FBQTtJQUNQLHVFQUFLLENBQUE7QUFDVCxDQUFDLEVBTlcsdUJBQXVCLEdBQXZCLCtCQUF1QixLQUF2QiwrQkFBdUIsUUFNbEM7QUFFRCw0QkFBb0MsU0FBUSxLQUFLO0lBUTdDLFlBQVksTUFBK0IsRUFDL0IsUUFBZSxFQUNmLGdCQUF3QixFQUN4QixRQUFlLEVBQ2YsZ0JBQXdCO1FBQ2hDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzFCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxnQkFBZ0IsQ0FBQztRQUMxQyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUMxQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsZ0JBQWdCLENBQUM7SUFDOUMsQ0FBQztJQUVELElBQUksTUFBTTtRQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDUixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRUQsSUFBSSxnQkFBZ0I7UUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNsQyxDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUVELElBQUksZ0JBQWdCO1FBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENB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WSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELElBQUksQ0FBQyxDQUFTLEVBQUUsQ0FBUztRQUNyQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUVyQixJQUFJLFlBQVksR0FBRyxJQUFJLHVCQUFvQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3hFLElBQUksaUJBQWlCLEdBQUcsSUFBSSxzQkFBc0IsQ0FDOUMsdUJBQXVCLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FDakQsQ0FBQztRQUVGLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCxRQUFRO1FBQ0osSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQzdCLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBRTNCLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBRWpCLElBQUksWUFBWSxHQUFHLElBQUksdUJBQW9CLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLEVBQ3ZFLFlBQVksR0FBRyxJQUFJLHVCQUFvQixDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDbEUsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLHNCQUFzQixDQUM5Qyx1QkFBdUIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUN6RCxDQUFDO0lBQ04sQ0FBQztDQUVKO0FBcEZELG9EQW9GQyIsImZpbGUiOiJ1dGlsL29ic2VydmFibGUvY29sbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
