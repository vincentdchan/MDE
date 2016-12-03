import {EventEmitter} from "events"
export {ObservableCollection} from "./collection"

export class PropertyChangedEvent extends Event {

    private _propsName: string;
    private _oldValue: any;
    private _newValue: any;

    constructor(_propsName: string, _newValue, _oldValue?) {
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

export interface INotifyPropertyChanged {
    on(name: "propertyChanged", listener: (e : PropertyChangedEvent) => void);
    addListener(name: "propertyChanged", listener: (e : PropertyChangedEvent) => void);
}

export class ObservableObject extends EventEmitter implements INotifyPropertyChanged {

    protected OnPropertyChanged(propName: string, newValue: any, oldValue?: any) {
        let evt = new PropertyChangedEvent(propName, newValue, oldValue);
        this.emit("propertyChanged", evt);
    }

}
