"use strict";
const events_1 = require("events");
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsL29ic2VydmFibGUvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHlCQUEyQixRQUUzQixDQUFDLENBRmtDO0FBRW5DLG1DQUEwQyxLQUFLO0lBTTNDLFlBQVksVUFBa0IsRUFBRSxTQUFTLEVBQUUsU0FBVTtRQUNqRCxNQUFNLGlCQUFpQixDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDL0IsQ0FBQztJQUVELElBQUksU0FBUztRQUNULE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzNCLENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDUixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztBQUVMLENBQUM7QUF6QlksNEJBQW9CLHVCQXlCaEMsQ0FBQTtBQU9ELCtCQUFzQyxxQkFBWTtJQUVwQyxpQkFBaUIsQ0FBQyxRQUFnQixFQUFFLFFBQWEsRUFBRSxRQUFjO1FBQ3ZFLElBQUksR0FBRyxHQUFHLElBQUksb0JBQW9CLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7QUFFTCxDQUFDO0FBUFksd0JBQWdCLG1CQU81QixDQUFBIiwiZmlsZSI6InV0aWwvb2JzZXJ2YWJsZS9pbmRleC5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
