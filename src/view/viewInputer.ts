import {DomHelper, IDisposable} from "../util"
import {Coordinate} from "."

export class InputerView extends 
DomHelper.Generic.AbsoluteElement<HTMLTextAreaElement> implements IDisposable {

    private _focused: boolean = false;
    private _isCompositing: boolean = false;

    private _scrollTopThunk : () => number;
    private _isComposintThunkTimers : NodeJS.Timer[] = [];

    constructor(scrollTopThunk : () => number) {
        super("textarea", "mde-inputer");
        this._scrollTopThunk = scrollTopThunk;

        this._dom.style.height = "0.1px";
        this._dom.style.width = "0.1px";
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
        this.left = coordinate.x;
        this.top = coordinate.y + this._scrollTopThunk()
    }

    isFosused() {
        return this._focused;
    }

    isCompositioning() {
        return this._isCompositing;
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
