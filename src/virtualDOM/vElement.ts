
export class VElement {

    private _tagName : string;    
    private _props : Map<string, string>;
    private _children : Array<VElement | string>; // VElement or string

    constructor(_tn : string, _props: Map<string, string> | any, _children: Array<VElement | string>) {
        this._tagName = _tn;

        if (_props instanceof Map)
            this._props = _props
        else if (typeof _props === "object") {
            this._props = new Map<string, string>();
            for (let key in _props) {
                this._props.set(key, _props[key]);
            }
        }
        else
            this._props = new Map<string, string>();

        this._children = _children;

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
        let _count = 0;
        this._children.forEach((child: VElement | string, i: number) => {
            if (child instanceof VElement)
                _count += child.count;
            else
                this._children[i] = <string>child;
            _count++;
        })
        return _count;
    }

}
