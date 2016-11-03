
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
