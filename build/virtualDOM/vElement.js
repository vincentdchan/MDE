"use strict";
class VElement {
    constructor(_tn) {
        this._tagName = _tn;
        this._props = new Map();
        this._children = new Array();
    }
    render() {
        let el = document.createElement(this._tagName);
        let props = this._props;
        for (let propName in props) {
            let propValue = props[propName];
            el.setAttribute(propName, propValue);
        }
        let children = this._children || [];
        children.forEach((child) => {
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
    set tagName(name) {
        this.tagName = name;
    }
    get props() {
        return this._props;
    }
    setProps(key, value) {
        this._props[key] = value;
    }
    getProps(key) {
        return this._props[key];
    }
    get children() {
        return this._children;
    }
    get count() {
        return this._children.length;
    }
}
exports.VElement = VElement;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aXJ0dWFsRE9NL3ZFbGVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQTtJQU1JLFlBQVksR0FBWTtRQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztRQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxFQUFrQixDQUFDO1FBQ3hDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxLQUFLLEVBQVksQ0FBQztJQUMzQyxDQUFDO0lBRUQsTUFBTTtRQUNGLElBQUksRUFBRSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9DLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFFeEIsR0FBRyxDQUFDLENBQUMsSUFBSSxRQUFRLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDaEMsRUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDekMsQ0FBQztRQUVELElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDO1FBRXBDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUF5QjtZQUN2QyxJQUFJLE9BQU8sR0FBRyxDQUFDLEtBQUssWUFBWSxRQUFRLENBQUM7a0JBQ25DLEtBQUssQ0FBQyxNQUFNLEVBQUU7a0JBQ2QsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyQyxFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFRCxJQUFJLE9BQU87UUFDUCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRUQsSUFBSSxPQUFPLENBQUMsSUFBYTtRQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUN4QixDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUVELFFBQVEsQ0FBQyxHQUFZLEVBQUUsS0FBYztRQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUM3QixDQUFDO0lBRUQsUUFBUSxDQUFDLEdBQVk7UUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELElBQUksUUFBUTtRQUNSLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7SUFDakMsQ0FBQztBQUVMLENBQUM7QUE3RFksZ0JBQVEsV0E2RHBCLENBQUEiLCJmaWxlIjoidmlydHVhbERPTS92RWxlbWVudC5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
