import {IDOMWrapper, elem} from "../util/dom"
import {IDisposable} from "../util"
import {Coordinate} from "."

export class CursorView implements IDOMWrapper, IDisposable {

    private _dom : HTMLElement;
    private _internal : NodeJS.Timer;

    constructor() {
        this._dom = elem("div", "mde-cursor");
        this._dom.style.position = "absolute";
        this._dom.style.height = "1em";
        this._dom.style.width = "0.2em";
        this._dom.style.background = "black";

        this.initializeBlinking();
    }

    private initializeBlinking() {
        this.setInterval();
    }

    private setInterval() {

        let showed = true;
        this._internal = setInterval(()=> {
            if (showed) {
                this._dom.style.opacity = "1";
            } else {
                this._dom.style.opacity = "0";
            }
            showed = !showed;
        }, 500);

    }

    private clearInterval() {
        clearInterval(this._internal);
    }

    excite() {
        this.clearInterval();
        this._dom.style.opacity = "1";
        this.setInterval();
    }

    setOff() {
        this.clearInterval();
        this._dom.style.opacity = "0"
    }

    setPostition(coordinate: Coordinate) {
        let scrollTop = document.body.scrollTop;
        this._dom.style.left = coordinate.x + "px";
        this._dom.style.top = coordinate.y + scrollTop + "px";
    }

    element() {
        return this._dom;
    }

    on(name: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean) {
        this._dom.addEventListener(name, listener, useCapture);
    }

    dispose() {
        if (this._dom) {
            this._dom.parentElement.removeChild(this._dom);
            this._dom = null;
        }
    }

}
