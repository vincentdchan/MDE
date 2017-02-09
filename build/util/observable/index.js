"use strict";
const events_1 = require("events");
var collection_1 = require("./collection");
exports.ObservableCollection = collection_1.ObservableCollection;
class PropertyChangedEvent extends Event {
    constructor(_propsName, _newValue, _oldValue) {
        super("propertyChanged");
        this._propsName = _propsName;
        this._newValue = _newValue;
        this._oldValue = _oldValue;
    }
    get propsName() {
        return this._propsName;
    }
    get oldValue() {
        return this._oldValue;
    }
    get newValue() {
        return this._newValue;
    }
}
exports.PropertyChangedEvent = PropertyChangedEvent;
class ObservableObject extends events_1.EventEmitter {
    OnPropertyChanged(propName, newValue, oldValue) {
        let evt = new PropertyChangedEvent(propName, newValue, oldValue);
        this.emit("propertyChanged", evt);
    }
}
exports.ObservableObject = ObservableObject;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsL29ic2VydmFibGUvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG1DQUFtQztBQUNuQywyQ0FBaUQ7QUFBekMsNENBQUEsb0JBQW9CLENBQUE7QUFFNUIsMEJBQWtDLFNBQVEsS0FBSztJQU0zQyxZQUFZLFVBQWtCLEVBQUUsU0FBUyxFQUFFLFNBQVU7UUFDakQsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDL0IsQ0FBQztJQUVELElBQUksU0FBUztRQUNULE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzNCLENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDUixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztDQUVKO0FBekJELG9EQXlCQztBQU9ELHNCQUE4QixTQUFRLHFCQUFZO0lBRXBDLGlCQUFpQixDQUFDLFFBQWdCLEVBQUUsUUFBYSxFQUFFLFFBQWM7UUFDdkUsSUFBSSxHQUFHLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDdEMsQ0FBQztDQUVKO0FBUEQsNENBT0MiLCJmaWxlIjoidXRpbC9vYnNlcnZhYmxlL2luZGV4LmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
