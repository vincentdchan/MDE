
export function elem(elemName : string, className : string) {
    let _elm = document.createElement(elemName);
    _elm.setAttribute("class", className);
    return _elm;
}

export interface IElement {

    appendTo(elem: HTMLElement);
    getElement() : HTMLElement;

}
