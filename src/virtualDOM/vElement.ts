
export class VElement {

    private _tagName : string;    
    private _props : Map<string, string>;
    private _children : Array<VElement>;

    constructor(_tn : string) {
        this._tagName = _tn;
        this._props = new Map<string, string>();
        this._children = new Array<VElement>();
    }

    get tagName() {
        return this._tagName;
    }

    set tagName(name : string) {
        this.tagName = name;
    }

    get props() {
        return this._props;
    }

    setProps(key : string, value : string) {
        this._props[key] = value;
    }

    getProps(key : string) {
        return this._props[key];
    }

    get children() {
        return this._children;
    }

}
