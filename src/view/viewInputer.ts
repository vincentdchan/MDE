import {elem, IDOMWrapper} from "../util/dom"
import {Coordinate} from "."

export class InputerView implements IDOMWrapper {

    private _dom: HTMLTextAreaElement;
    private _focused: boolean = false;
    private _isCompositing: boolean = false;;

    constructor() {
        this._dom = <HTMLTextAreaElement>elem("textarea", "mde-inputer");
        this._dom.style.position = "absolute";
        this._dom.style.height = "1em";
        this._dom.style.width = "1px";
        this._dom.style.opacity = "0.3";

        this._dom.addEventListener("focus", (evt: FocusEvent) => {
            this._focused = true;
        })

        this._dom.addEventListener("blur", (evt: FocusEvent) => {
            this._focused = false;
        })

        this._dom.addEventListener("compositionstart", (evt: Event) => {
            this._isCompositing = true;
        });

        this._dom.addEventListener("compositionend", (evt: Event) => {
            setTimeout(() => {
                this._isCompositing = false;
            },20);
        })

    }

    clearContent() {
        this._dom.value = "";
    }

    setPostition(coordinate: Coordinate) {
        let scrollTop = document.body.scrollTop;
        this._dom.style.left = coordinate.x + "px";
        this._dom.style.top = coordinate.y + scrollTop + "px";
    }

    isFosused() {
        return this._focused;
    }

    isCompositioning() {
        return this._isCompositing;
    }

    on(name: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean) {
        this._dom.addEventListener(name, listener, useCapture);
    }

    element() {
        return this._dom;
    }

    get value() {
        return this._dom.value;
    }

    set value(content: string) {
        this._dom.value = content;
    }

}
