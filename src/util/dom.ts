
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

        addEventListener(name: string, _fun: EventListenerOrEventListenerObject, useCapture?: boolean) {
            this._dom.addEventListener(name, _fun, useCapture);
        }

    }

}
