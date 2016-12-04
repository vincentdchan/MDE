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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsL2RvbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsSUFBaUIsU0FBUyxDQW9qQnpCO0FBcGpCRCxXQUFpQixTQUFTLEVBQUMsQ0FBQztJQUV4QixjQUFxQixRQUFpQixFQUFFLFNBQWtCLEVBQUUsS0FBVztRQUNuRSxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTVDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUNWLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRTFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLENBQUM7UUFDTCxDQUFDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBYmUsY0FBSSxPQWFuQixDQUFBO0lBaUJELHVCQUE4QixNQUFXO1FBQ3JDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sTUFBTSxLQUFLLFFBQVEsQ0FBQztlQUM1QixDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDLGdCQUFnQixJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUM7ZUFDOUQsQ0FBQyxPQUFPLE1BQU0sQ0FBQyxPQUFPLEtBQUssVUFBVTttQkFDakMsT0FBTyxNQUFNLENBQUMsZ0JBQWdCLEtBQUssVUFBVTttQkFDN0MsT0FBTyxNQUFNLENBQUMsUUFBUSxLQUFLLFVBQVUsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFOZSx1QkFBYSxnQkFNNUIsQ0FBQTtJQUVEO1FBSUksWUFBWSxRQUFnQixFQUFFLFNBQW1CLEVBQUUsS0FBWTtZQUMzRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2pELENBQUM7UUFFRCxPQUFPO1lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDckIsQ0FBQztRQUVELFFBQVEsQ0FBQyxJQUFrQjtZQUN2QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxDQUFDO1FBRUQsRUFBRSxDQUFDLElBQVksRUFBRSxJQUFtQjtZQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbEQsQ0FBQztRQUVELGdCQUFnQixDQUFDLElBQVksRUFBRSxJQUF3QyxFQUFFLFVBQW9CO1lBQ3pGLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztRQUN2RCxDQUFDO1FBRUQsbUJBQW1CLENBQUMsSUFBWSxFQUFFLElBQXdDLEVBQUUsVUFBb0I7WUFDNUYsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzFELENBQUM7UUFFRCxNQUFNO1lBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN2QixDQUFDO0lBRUwsQ0FBQztJQWhDWSw4QkFBb0IsdUJBZ0NoQyxDQUFBO0lBRUQsK0JBQXNDLG9CQUFvQjtRQUExRDtZQUFzQyxvQkFBb0I7WUFFOUMsV0FBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ1osWUFBTyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBZ0N6QixDQUFDO1FBOUJHLElBQUksS0FBSztZQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZCLENBQUM7UUFFRCxJQUFJLEtBQUssQ0FBQyxDQUFVO1lBQ2hCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7Z0JBRWhCLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDL0IsSUFBSTtvQkFDQSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUN6QyxDQUFDO1FBQ0wsQ0FBQztRQUVELElBQUksTUFBTTtZQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3hCLENBQUM7UUFFRCxJQUFJLE1BQU0sQ0FBQyxDQUFVO1lBQ2pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7Z0JBRWpCLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztnQkFDaEMsSUFBSTtvQkFDQSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUMxQyxDQUFDO1FBQ0wsQ0FBQztJQUVMLENBQUM7SUFuQ1ksMEJBQWdCLG1CQW1DNUIsQ0FBQTtJQUVELDhCQUE4QixnQkFBZ0I7UUFBOUM7WUFBOEIsb0JBQWdCO1lBRWxDLFVBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNYLFdBQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNaLFNBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNWLFlBQU8sR0FBRyxDQUFDLENBQUMsQ0FBQztZQUViLFlBQU8sR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNiLGdCQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDakIsaUJBQVksR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNsQixlQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDaEIsa0JBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQztRQXlJL0IsQ0FBQztRQXZJRyxJQUFJLElBQUk7WUFDSixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDO1FBRUQsSUFBSSxJQUFJLENBQUMsQ0FBVTtZQUNmLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBRWYsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDTixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO2dCQUM5QixJQUFJO29CQUNBLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ3hDLENBQUM7UUFDTCxDQUFDO1FBRUQsSUFBSSxLQUFLO1lBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkIsQ0FBQztRQUVELElBQUksS0FBSyxDQUFDLENBQVU7WUFDaEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFFaEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDTixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO2dCQUMvQixJQUFJO29CQUNBLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ3pDLENBQUM7UUFDTCxDQUFDO1FBRUQsSUFBSSxHQUFHO1lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDckIsQ0FBQztRQUVELElBQUksR0FBRyxDQUFDLENBQVU7WUFDZCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO2dCQUVkLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztnQkFDN0IsSUFBSTtvQkFDQSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUN2QyxDQUFDO1FBQ0wsQ0FBQztRQUVELElBQUksTUFBTTtZQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3hCLENBQUM7UUFFRCxJQUFJLE1BQU0sQ0FBQyxDQUFVO1lBQ2pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7Z0JBRWpCLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztnQkFDaEMsSUFBSTtvQkFDQSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUMxQyxDQUFDO1FBQ0wsQ0FBQztRQUVELElBQUksTUFBTTtZQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3hCLENBQUM7UUFFRCxJQUFJLE1BQU0sQ0FBQyxDQUFTO1lBQ2hCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7Z0JBRWpCLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztnQkFDaEMsSUFBSTtvQkFDQSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUMxQyxDQUFDO1FBQ0wsQ0FBQztRQUVELElBQUksVUFBVTtZQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzVCLENBQUM7UUFFRCxJQUFJLFVBQVUsQ0FBQyxDQUFTO1lBQ3BCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7Z0JBRXJCLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztnQkFDcEMsSUFBSTtvQkFDQSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUM5QyxDQUFDO1FBQ0wsQ0FBQztRQUVELElBQUksV0FBVztZQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzdCLENBQUM7UUFFRCxJQUFJLFdBQVcsQ0FBQyxDQUFTO1lBQ3JCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7Z0JBRXRCLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztnQkFDckMsSUFBSTtvQkFDQSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUMvQyxDQUFDO1FBQ0wsQ0FBQztRQUVELElBQUksU0FBUztZQUNULE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzNCLENBQUM7UUFFRCxJQUFJLFNBQVMsQ0FBQyxDQUFTO1lBQ25CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7Z0JBRXBCLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztnQkFDbkMsSUFBSTtvQkFDQSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUM3QyxDQUFDO1FBQ0wsQ0FBQztRQUVELElBQUksWUFBWTtZQUNaLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzlCLENBQUM7UUFFRCxJQUFJLFlBQVksQ0FBQyxDQUFTO1lBQ3RCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7Z0JBRXZCLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztnQkFDdEMsSUFBSTtvQkFDQSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUNoRCxDQUFDO1FBQ0wsQ0FBQztJQUVMLENBQUM7SUFFRCwyQkFBa0MsZUFBZTtRQUU3QyxZQUFZLFFBQWdCLEVBQUUsU0FBbUIsRUFBRSxLQUFZO1lBQzNELE1BQU0sUUFBUSxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUVsQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ3ZDLENBQUM7SUFFTCxDQUFDO0lBUlksc0JBQVksZUFReEIsQ0FBQTtJQUVELDhCQUFxQyxlQUFlO1FBRWhELFlBQVksUUFBZ0IsRUFBRSxTQUFtQixFQUFFLEtBQVk7WUFDM0QsTUFBTSxRQUFRLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBRWxDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7UUFDMUMsQ0FBQztJQUVMLENBQUM7SUFSWSx5QkFBZSxrQkFRM0IsQ0FBQTtJQUVELElBQWlCLE9BQU8sQ0F5UnZCO0lBelJELFdBQWlCLE9BQU8sRUFBQyxDQUFDO1FBRXRCLGNBQTRDLFFBQWlCLEVBQUUsU0FBa0IsRUFBRSxLQUFXO1lBQzFGLElBQUksSUFBSSxHQUFNLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFL0MsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDO2dCQUNWLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBRTFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNwQixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDdkMsQ0FBQztZQUNMLENBQUM7WUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFiZSxZQUFJLE9BYW5CLENBQUE7UUFpQkQsdUJBQThCLE1BQVc7WUFDckMsTUFBTSxDQUFDLENBQUMsT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDO21CQUM1QixDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDLGdCQUFnQixJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUM7bUJBQzlELENBQUMsT0FBTyxNQUFNLENBQUMsT0FBTyxLQUFLLFVBQVU7dUJBQ2pDLE9BQU8sTUFBTSxDQUFDLGdCQUFnQixLQUFLLFVBQVU7dUJBQzdDLE9BQU8sTUFBTSxDQUFDLFFBQVEsS0FBSyxVQUFVLENBQUMsQ0FBQztRQUN0RCxDQUFDO1FBTmUscUJBQWEsZ0JBTTVCLENBQUE7UUFFRDtZQUlJLFlBQVksUUFBZ0IsRUFBRSxTQUFtQixFQUFFLEtBQVk7Z0JBQzNELElBQUksQ0FBQyxJQUFJLEdBQU0sSUFBSSxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDcEQsQ0FBQztZQUVELE9BQU87Z0JBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDckIsQ0FBQztZQUVELFFBQVEsQ0FBQyxJQUFrQjtnQkFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEMsQ0FBQztZQUVELEVBQUUsQ0FBQyxJQUFZLEVBQUUsSUFBbUI7Z0JBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNsRCxDQUFDO1lBRUQsZ0JBQWdCLENBQUMsSUFBWSxFQUFFLElBQXdDLEVBQUUsVUFBb0I7Z0JBQ3pGLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztZQUN2RCxDQUFDO1lBRUQsbUJBQW1CLENBQUMsSUFBWSxFQUFFLElBQXdDLEVBQUUsVUFBb0I7Z0JBQzVGLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztZQUMxRCxDQUFDO1lBRUQsTUFBTTtnQkFDRixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3ZCLENBQUM7UUFFTCxDQUFDO1FBaENZLDRCQUFvQix1QkFnQ2hDLENBQUE7UUFFRCwrQkFBNkQsb0JBQW9CO1lBQWpGO2dCQUE2RCxvQkFBdUI7Z0JBRXhFLFdBQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDWixZQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFnQ3pCLENBQUM7WUE5QkcsSUFBSSxLQUFLO2dCQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3ZCLENBQUM7WUFFRCxJQUFJLEtBQUssQ0FBQyxDQUFVO2dCQUNoQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO29CQUVoQixFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7b0JBQy9CLElBQUk7d0JBQ0EsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBQ3pDLENBQUM7WUFDTCxDQUFDO1lBRUQsSUFBSSxNQUFNO2dCQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ3hCLENBQUM7WUFFRCxJQUFJLE1BQU0sQ0FBQyxDQUFVO2dCQUNqQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO29CQUVqQixFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7b0JBQ2hDLElBQUk7d0JBQ0EsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBQzFDLENBQUM7WUFDTCxDQUFDO1FBRUwsQ0FBQztRQW5DWSx3QkFBZ0IsbUJBbUM1QixDQUFBO1FBRUQsOEJBQXFELGdCQUFnQjtZQUFyRTtnQkFBcUQsb0JBQW1CO2dCQUU1RCxVQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsV0FBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNaLFNBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDVixZQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBRWIsWUFBTyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNiLGdCQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLGlCQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLGVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDaEIsa0JBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQztZQXlJL0IsQ0FBQztZQXZJRyxJQUFJLElBQUk7Z0JBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDdEIsQ0FBQztZQUVELElBQUksSUFBSSxDQUFDLENBQVU7Z0JBQ2YsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztvQkFFZixFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7b0JBQzlCLElBQUk7d0JBQ0EsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBQ3hDLENBQUM7WUFDTCxDQUFDO1lBRUQsSUFBSSxLQUFLO2dCQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3ZCLENBQUM7WUFFRCxJQUFJLEtBQUssQ0FBQyxDQUFVO2dCQUNoQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO29CQUVoQixFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7b0JBQy9CLElBQUk7d0JBQ0EsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBQ3pDLENBQUM7WUFDTCxDQUFDO1lBRUQsSUFBSSxHQUFHO2dCQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3JCLENBQUM7WUFFRCxJQUFJLEdBQUcsQ0FBQyxDQUFVO2dCQUNkLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDbEIsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7b0JBRWQsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDTixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO29CQUM3QixJQUFJO3dCQUNBLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUN2QyxDQUFDO1lBQ0wsQ0FBQztZQUVELElBQUksTUFBTTtnQkFDTixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUN4QixDQUFDO1lBRUQsSUFBSSxNQUFNLENBQUMsQ0FBVTtnQkFDakIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztvQkFFakIsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDTixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO29CQUNoQyxJQUFJO3dCQUNBLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUMxQyxDQUFDO1lBQ0wsQ0FBQztZQUVELElBQUksTUFBTTtnQkFDTixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUN4QixDQUFDO1lBRUQsSUFBSSxNQUFNLENBQUMsQ0FBUztnQkFDaEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztvQkFFakIsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDTixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO29CQUNoQyxJQUFJO3dCQUNBLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUMxQyxDQUFDO1lBQ0wsQ0FBQztZQUVELElBQUksVUFBVTtnQkFDVixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUM1QixDQUFDO1lBRUQsSUFBSSxVQUFVLENBQUMsQ0FBUztnQkFDcEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN6QixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztvQkFFckIsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDTixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO29CQUNwQyxJQUFJO3dCQUNBLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUM5QyxDQUFDO1lBQ0wsQ0FBQztZQUVELElBQUksV0FBVztnQkFDWCxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUM3QixDQUFDO1lBRUQsSUFBSSxXQUFXLENBQUMsQ0FBUztnQkFDckIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMxQixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztvQkFFdEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDTixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO29CQUNyQyxJQUFJO3dCQUNBLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUMvQyxDQUFDO1lBQ0wsQ0FBQztZQUVELElBQUksU0FBUztnQkFDVCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUMzQixDQUFDO1lBRUQsSUFBSSxTQUFTLENBQUMsQ0FBUztnQkFDbkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztvQkFFcEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDTixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO29CQUNuQyxJQUFJO3dCQUNBLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUM3QyxDQUFDO1lBQ0wsQ0FBQztZQUVELElBQUksWUFBWTtnQkFDWixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztZQUM5QixDQUFDO1lBRUQsSUFBSSxZQUFZLENBQUMsQ0FBUztnQkFDdEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMzQixJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztvQkFFdkIsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDTixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO29CQUN0QyxJQUFJO3dCQUNBLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUNoRCxDQUFDO1lBQ0wsQ0FBQztRQUVMLENBQUM7UUFFRCwyQkFBeUQsZUFBZTtZQUVwRSxZQUFZLFFBQWdCLEVBQUUsU0FBbUIsRUFBRSxLQUFZO2dCQUMzRCxNQUFNLFFBQVEsRUFBRSxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBRWxDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7WUFDdkMsQ0FBQztRQUVMLENBQUM7UUFSWSxvQkFBWSxlQVF4QixDQUFBO1FBRUQsOEJBQTRELGVBQWU7WUFFdkUsWUFBWSxRQUFnQixFQUFFLFNBQW1CLEVBQUUsS0FBWTtnQkFDM0QsTUFBTSxRQUFRLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUVsQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO1lBQzFDLENBQUM7UUFFTCxDQUFDO1FBUlksdUJBQWUsa0JBUTNCLENBQUE7SUFFTCxDQUFDLEVBelJnQixPQUFPLEdBQVAsaUJBQU8sS0FBUCxpQkFBTyxRQXlSdkI7QUFFTCxDQUFDLEVBcGpCZ0IsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFvakJ6QiIsImZpbGUiOiJ1dGlsL2RvbS5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
