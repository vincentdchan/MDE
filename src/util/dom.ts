
export namespace DomHelper {

    export function elem(elemName : string, className?: string, props?: any) {
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

    export interface IElement {

        appendTo(elem: HTMLElement);
        getElement() : HTMLElement;

    }

    export interface IDOMWrapper {

        element() : HTMLElement;
        addEventListener(name: string, _fun: EventListenerOrEventListenerObject, useCapture?: boolean);
        appendTo(elem: HTMLElement);

    }

    export function isIDOMWrapper(object: any) : object is IDOMWrapper {
        return (typeof object === "object") 
            && (object.element && object.addEventListener && object.appendTo)
            && (typeof object.element === "function" 
                && typeof object.addEventListener === "function"
                && typeof object.appendTo === "function");
    }

    export class AppendableDomWrapper implements IDOMWrapper {

        protected _dom : HTMLElement;

        constructor(elemName: string, className? : string, props? : any) {
            this._dom = elem(elemName, className, props);
        }

        element() {
            return this._dom;
        }

        appendTo(elem : HTMLElement) {
            elem.appendChild(this._dom);
        }

        on(name: string, _fun: EventListener) {
            this._dom.addEventListener(name, _fun, false);
        }

        addEventListener(name: string, _fun: EventListenerOrEventListenerObject, useCapture?: boolean) {
            this._dom.addEventListener(name, _fun, useCapture);
        }

        removeEventListener(name: string, _fun: EventListenerOrEventListenerObject, useCapture?: boolean) {
            this._dom.removeEventListener(name, _fun, useCapture);
        }

        remove() {
            this._dom.remove();
        }

    }

    export class ResizableElement extends AppendableDomWrapper {

        private _width = -1;
        private _height = -1;

        get width() {
            return this._width;
        }

        set width(v : number) {
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

        set height(v : number) {
            if (this._height !== v) {
                this._height = v;

                if (v < 0)
                    this._dom.style.height = "";
                else
                    this._dom.style.height = v + "px";
            }
        }

    }

    class PositionElement extends ResizableElement {

        private _left = -1;
        private _right = -1;
        private _top = -1;
        private _bottom = -1;

        private _margin = -1;
        private _marginLeft = -1;
        private _marginRight = -1;
        private _marginTop = -1;
        private _marginBottom = -1;

        get left() {
            return this._left;
        }

        set left(v : number) {
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

        set right(v : number) {
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

        set top(v : number) {
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

        set bottom(v : number) {
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

        set margin(v: number) {
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

        set marginLeft(v: number) {
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

        set marginRight(v: number) {
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

        set marginTop(v: number) {
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

        set marginBottom(v: number) {
            if (this._marginBottom !== v) {
                this._marginBottom = v;

                if (v < 0)
                    this._dom.style.marginBottom = "";
                else
                    this._dom.style.marginBottom = v + "px";
            }
        }

    }

    export class FixedElement extends PositionElement {

        constructor(elemName: string, className? : string, props? : any) {
            super(elemName, className, props);

            this._dom.style.position = "fixed";
        }

    }

    export class AbsoluteElement extends PositionElement {

        constructor(elemName: string, className? : string, props? : any) {
            super(elemName, className, props);

            this._dom.style.position = "absolute";
        }

    }


}

