import {DomHelper, IDisposable} from "../util"
import {Coordinate} from "."

export class InputerView implements DomHelper.IDOMWrapper, IDisposable {

    private _dom: HTMLTextAreaElement;
    private _focused: boolean = false;
    private _isCompositing: boolean = false;

    private _scrollTopThunk : () => number;
    private _isComposintThunkTimers : NodeJS.Timer[] = [];

    constructor(scrollTopThunk : () => number) {
        this._scrollTopThunk = scrollTopThunk;

        this._dom = <HTMLTextAreaElement>DomHelper.elem("textarea", "mde-inputer");
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
            this._isComposintThunkTimers.push(setTimeout(() => {
                this._isCompositing = false;
            }, 5));
        })

    }

    clearContent() {
        this._dom.value = "";
    }

    setPostition(coordinate: Coordinate) {
        let scrollY = window.scrollY;
        this._dom.style.left = coordinate.x + "px";
        this._dom.style.top = coordinate.y + this._scrollTopThunk() + "px";
    }

    isFosused() {
        return this._focused;
    }

    isCompositioning() {
        return this._isCompositing;
    }

    addEventListener(name: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean) {
        this._dom.addEventListener(name, listener, useCapture);
    }

    element() {
        return this._dom;
    }

    appendTo(elem: HTMLElement) {
        elem.appendChild(this._dom);
    }

    dispose() {
        this._isComposintThunkTimers.forEach((t: NodeJS.Timer) => {
            clearTimeout(t);
        });
    }

    get value() {
        return this._dom.value;
    }

    set value(content: string) {
        this._dom.value = content;
    }

}
