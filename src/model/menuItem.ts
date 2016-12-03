import {Observable} from "../util"

class MenuItem extends Observable.ObservableObject {

    private _name: string;

    constructor(name: string) {
        super();
        this._name = name;
    }

    get name() {
        return this._name;
    }

}
