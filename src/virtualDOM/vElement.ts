
export class VElement {

    private _tagName : string;    
    private _props : Map<string, string>;
    private _children : Array<VElement | string>; // VElement or string

    constructor(_tn : string) {
        this._tagName = _tn;
        this._props = new Map<string, string>();
        this._children = new Array<VElement>();
    }

    render(): HTMLElement {
        let el = document.createElement(this._tagName);
        let props = this._props;

        for (let propName in props) {
            let propValue = props[propName];
            el.setAttribute(propName, propValue);
        }

        let children = this._children || [];

        children.forEach((child : VElement | string) => {
            let childEl = (child instanceof VElement)
                ? child.render()
                : document.createTextNode(child);
            el.appendChild(childEl);
        });
        
        return el;
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

    get count() {
        return this._children.length;
    }

}
