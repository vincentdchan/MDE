"use strict";
const typescript_domhelper_1 = require("typescript-domhelper");
var DomWrapper;
(function (DomWrapper) {
    function isIDOMWrapper(object) {
        return (typeof object === "object")
            && (object.element && object.addEventListener && object.appendTo)
            && (typeof object.element === "function"
                && typeof object.addEventListener === "function"
                && typeof object.appendTo === "function");
    }
    DomWrapper.isIDOMWrapper = isIDOMWrapper;
    class AppendableDomWrapper {
        constructor(elemName, className, props) {
            this._dom = typescript_domhelper_1.elem(elemName, className, props);
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
    DomWrapper.AppendableDomWrapper = AppendableDomWrapper;
    class ResizableElement extends AppendableDomWrapper {
        constructor() {
            super(...arguments);
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
    }
    DomWrapper.ResizableElement = ResizableElement;
    class PositionElement extends ResizableElement {
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
    DomWrapper.FixedElement = FixedElement;
    class AbsoluteElement extends PositionElement {
        constructor(elemName, className, props) {
            super(elemName, className, props);
            this._dom.style.position = "absolute";
        }
    }
    DomWrapper.AbsoluteElement = AbsoluteElement;
})(DomWrapper = exports.DomWrapper || (exports.DomWrapper = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,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
