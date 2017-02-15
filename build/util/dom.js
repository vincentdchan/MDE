"use strict";
const typescript_domhelper_1 = require("typescript-domhelper");
var DomHelper;
(function (DomHelper) {
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
    DomHelper.AppendableDomWrapper = AppendableDomWrapper;
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
    DomHelper.ResizableElement = ResizableElement;
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
    DomHelper.FixedElement = FixedElement;
    class AbsoluteElement extends PositionElement {
        constructor(elemName, className, props) {
            super(elemName, className, props);
            this._dom.style.position = "absolute";
        }
    }
    DomHelper.AbsoluteElement = AbsoluteElement;
})(DomHelper = exports.DomHelper || (exports.DomHelper = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,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
