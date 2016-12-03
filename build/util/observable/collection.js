"use strict";
const events_1 = require("events");
const _1 = require(".");
(function (CollectionChangedAction) {
    CollectionChangedAction[CollectionChangedAction["Add"] = 0] = "Add";
    CollectionChangedAction[CollectionChangedAction["Move"] = 1] = "Move";
    CollectionChangedAction[CollectionChangedAction["Remove"] = 2] = "Remove";
    CollectionChangedAction[CollectionChangedAction["Replace"] = 3] = "Replace";
    CollectionChangedAction[CollectionChangedAction["Reset"] = 4] = "Reset";
})(exports.CollectionChangedAction || (exports.CollectionChangedAction = {}));
var CollectionChangedAction = exports.CollectionChangedAction;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsL29ic2VydmFibGUvY29sbGVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEseUJBQTJCLFFBQzNCLENBQUMsQ0FEa0M7QUFDbkMsbUJBQTJELEdBRTNELENBQUMsQ0FGNkQ7QUFFOUQsV0FBWSx1QkFBdUI7SUFDL0IsbUVBQUcsQ0FBQTtJQUNILHFFQUFJLENBQUE7SUFDSix5RUFBTSxDQUFBO0lBQ04sMkVBQU8sQ0FBQTtJQUNQLHVFQUFLLENBQUE7QUFDVCxDQUFDLEVBTlcsK0JBQXVCLEtBQXZCLCtCQUF1QixRQU1sQztBQU5ELElBQVksdUJBQXVCLEdBQXZCLCtCQU1YLENBQUE7QUFFRCxxQ0FBNEMsS0FBSztJQVE3QyxZQUFZLE1BQStCLEVBQy9CLFFBQWUsRUFDZixnQkFBd0IsRUFDeEIsUUFBZSxFQUNmLGdCQUF3QjtRQUNoQyxNQUFNLG1CQUFtQixDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDMUIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGdCQUFnQixDQUFDO1FBQzFDLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzFCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxnQkFBZ0IsQ0FBQztJQUM5QyxDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQUVELElBQUksUUFBUTtRQUNSLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFRCxJQUFJLGdCQUFnQjtRQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ2xDLENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDUixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRUQsSUFBSSxnQkFBZ0I7UUFDaEIs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RCxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCxJQUFJLENBQUMsQ0FBUyxFQUFFLENBQVM7UUFDckIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFFckIsSUFBSSxZQUFZLEdBQUcsSUFBSSx1QkFBb0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4RSxJQUFJLGlCQUFpQixHQUFHLElBQUksc0JBQXNCLENBQzlDLHVCQUF1QixDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQ2pELENBQUM7UUFFRixJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUM3QixRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUUzQixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUVqQixJQUFJLFlBQVksR0FBRyxJQUFJLHVCQUFvQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxFQUN2RSxZQUFZLEdBQUcsSUFBSSx1QkFBb0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2xFLElBQUksaUJBQWlCLEdBQUcsSUFBSSxzQkFBc0IsQ0FDOUMsdUJBQXVCLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FDekQsQ0FBQztJQUNOLENBQUM7QUFFTCxDQUFDO0FBcEZZLDRCQUFvQix1QkFvRmhDLENBQUEiLCJmaWxlIjoidXRpbC9vYnNlcnZhYmxlL2NvbGxlY3Rpb24uanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
