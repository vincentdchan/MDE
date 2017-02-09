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
    var Generic;
    (function (Generic) {
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
        Generic.elem = elem;
        function isIDOMWrapper(object) {
            return (typeof object === "object")
                && (object.element && object.addEventListener && object.appendTo)
                && (typeof object.element === "function"
                    && typeof object.addEventListener === "function"
                    && typeof object.appendTo === "function");
        }
        Generic.isIDOMWrapper = isIDOMWrapper;
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
        Generic.AppendableDomWrapper = AppendableDomWrapper;
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
        Generic.ResizableElement = ResizableElement;
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
        Generic.FixedElement = FixedElement;
        class AbsoluteElement extends PositionElement {
            constructor(elemName, className, props) {
                super(elemName, className, props);
                this._dom.style.position = "absolute";
            }
        }
        Generic.AbsoluteElement = AbsoluteElement;
    })(Generic = DomHelper.Generic || (DomHelper.Generic = {}));
})(DomHelper = exports.DomHelper || (exports.DomHelper = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,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
