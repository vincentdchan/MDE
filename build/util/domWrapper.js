"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
