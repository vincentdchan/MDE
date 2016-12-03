"use strict";
var DomHelper;
(function (DomHelper) {
    function elem(elemName, className, props) {
        let _elm = document.createElement(elemName);
        if (className)
            _elm.setAttribute("class", className);
        if (props && typeof props === "object") {
            for (let key in props) {
                _elm.setAttribute(key, props[key]);
            }
        }
        return _elm;
    }
    DomHelper.elem = elem;
    function isIDOMWrapper(object) {
        return (typeof object === "object")
            && (object.element && object.addEventListener && object.appendTo)
            && (typeof object.element === "function"
                && typeof object.addEventListener === "function"
                && typeof object.appendTo === "function");
    }
    DomHelper.isIDOMWrapper = isIDOMWrapper;
    class AppendableDomWrapper {
        constructor(elemName, className, props) {
            this._dom = elem(elemName, className, props);
        }
        element() {
            return this._dom;
        }
        appendTo(elem) {
            elem.appendChild(this._dom);
        }
        on(name, _fun) {
            this._dom.addEventListener(name, _fun, false);
        }
        addEventListener(name, _fun, useCapture) {
            this._dom.addEventListener(name, _fun, useCapture);
        }
        removeEventListener(name, _fun, useCapture) {
            this._dom.removeEventListener(name, _fun, useCapture);
        }
        remove() {
            this._dom.remove();
        }
    }
    DomHelper.AppendableDomWrapper = AppendableDomWrapper;
    class PositionElement extends AppendableDomWrapper {
        constructor() {
            super(...arguments);
            this._left = -1;
            this._right = -1;
            this._top = -1;
            this._bottom = -1;
            this._margin = -1;
            this._marginLeft = -1;
            this._marginRight = -1;
            this._marginTop = -1;
            this._marginBottom = -1;
            this._width = -1;
            this._height = -1;
        }
        get width() {
            return this._width;
        }
        set width(v) {
            if (this._width !== v) {
                this._width = v;
                if (v < 0)
                    this._dom.style.width = "";
                else
                    this._dom.style.width = v + "px";
            }
        }
        get height() {
            return this._height;
        }
        set height(v) {
            if (this._height !== v) {
                this._height = v;
                if (v < 0)
                    this._dom.style.height = "";
                else
                    this._dom.style.height = v + "px";
            }
        }
        get left() {
            return this._left;
        }
        set left(v) {
            if (this._left !== v) {
                this._left = v;
                if (v < 0)
                    this._dom.style.left = "";
                else
                    this._dom.style.left = v + "px";
            }
        }
        get right() {
            return this._right;
        }
        set right(v) {
            if (this._right !== v) {
                this._right = v;
                if (v < 0)
                    this._dom.style.right = "";
                else
                    this._dom.style.right = v + "px";
            }
        }
        get top() {
            return this._top;
        }
        set top(v) {
            if (this._top !== v) {
                this._top = v;
                if (v < 0)
                    this._dom.style.top = "";
                else
                    this._dom.style.top = v + "px";
            }
        }
        get bottom() {
            return this._bottom;
        }
        set bottom(v) {
            if (this._bottom !== v) {
                this._bottom = v;
                if (v < 0)
                    this._dom.style.bottom = "";
                else
                    this._dom.style.bottom = v + "px";
            }
        }
        get margin() {
            return this._margin;
        }
        set margin(v) {
            if (this._margin !== v) {
                this._margin = v;
                if (v < 0)
                    this._dom.style.margin = "";
                else
                    this._dom.style.margin = v + "px";
            }
        }
        get marginLeft() {
            return this._marginLeft;
        }
        set marginLeft(v) {
            if (this._marginLeft !== v) {
                this._marginLeft = v;
                if (v < 0)
                    this._dom.style.marginLeft = "";
                else
                    this._dom.style.marginLeft = v + "px";
            }
        }
        get marginRight() {
            return this._marginRight;
        }
        set marginRight(v) {
            if (this._marginRight !== v) {
                this._marginRight = v;
                if (v < 0)
                    this._dom.style.marginRight = "";
                else
                    this._dom.style.marginRight = v + "px";
            }
        }
        get marginTop() {
            return this._marginTop;
        }
        set marginTop(v) {
            if (this._marginTop !== v) {
                this._marginTop = v;
                if (v < 0)
                    this._dom.style.marginTop = "";
                else
                    this._dom.style.marginTop = v + "px";
            }
        }
        get marginBottom() {
            return this._marginBottom;
        }
        set marginBottom(v) {
            if (this._marginBottom !== v) {
                this._marginBottom = v;
                if (v < 0)
                    this._dom.style.marginBottom = "";
                else
                    this._dom.style.marginBottom = v + "px";
            }
        }
    }
    class FixedElement extends PositionElement {
        constructor(elemName, className, props) {
            super(elemName, className, props);
            this._dom.style.position = "fixed";
        }
    }
    DomHelper.FixedElement = FixedElement;
    class AbsoluteElement extends PositionElement {
        constructor(elemName, className, props) {
            super(elemName, className, props);
            this._dom.style.position = "absolute";
        }
    }
    DomHelper.AbsoluteElement = AbsoluteElement;
})(DomHelper = exports.DomHelper || (exports.DomHelper = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,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LENBQUM7UUFFRCxJQUFJLFNBQVM7WUFDVCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUMzQixDQUFDO1FBRUQsSUFBSSxTQUFTLENBQUMsQ0FBUztZQUNuQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO2dCQUVwQixFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7Z0JBQ25DLElBQUk7b0JBQ0EsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDN0MsQ0FBQztRQUNMLENBQUM7UUFFRCxJQUFJLFlBQVk7WUFDWixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUM5QixDQUFDO1FBRUQsSUFBSSxZQUFZLENBQUMsQ0FBUztZQUN0QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO2dCQUV2QixFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7Z0JBQ3RDLElBQUk7b0JBQ0EsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDaEQsQ0FBQztRQUNMLENBQUM7SUFFTCxDQUFDO0lBRUQsMkJBQWtDLGVBQWU7UUFFN0MsWUFBWSxRQUFnQixFQUFFLFNBQW1CLEVBQUUsS0FBWTtZQUMzRCxNQUFNLFFBQVEsRUFBRSxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFFbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN2QyxDQUFDO0lBRUwsQ0FBQztJQVJZLHNCQUFZLGVBUXhCLENBQUE7SUFFRCw4QkFBcUMsZUFBZTtRQUVoRCxZQUFZLFFBQWdCLEVBQUUsU0FBbUIsRUFBRSxLQUFZO1lBQzNELE1BQU0sUUFBUSxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUVsQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO1FBQzFDLENBQUM7SUFFTCxDQUFDO0lBUlkseUJBQWUsa0JBUTNCLENBQUE7QUFHTCxDQUFDLEVBdFJnQixTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQXNSekIiLCJmaWxlIjoidXRpbC9kb20uanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
