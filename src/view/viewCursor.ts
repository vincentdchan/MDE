import {IDOMWrapper, elem} from "../util/dom"
import {IDisposable} from "../util"
import {Coordinate} from "."

export class CursorView implements IDOMWrapper, IDisposable {

    private _dom : HTMLElement;

    constructor() {
        this._dom = elem("div", "editor-cursor");
        this._dom.style.position = "absolute";
        this._dom.style.height = "1em";
        this._dom.style.width = "0.2em";
        this._dom.style.background = "black";

        this.initializeBlinking();
    }

    private initializeBlinking() {

        let showed = true;
        setInterval(()=> {
            if (showed) {
                this._dom.style.opacity = "1";
            } else {
                this._dom.style.opacity = "0";
            }
            showed = !showed;
        }, 500);

    }

    setPostition(coordinate: Coordinate) {
        this._dom.style.left = coordinate.x + "px";
        this._dom.style.top = coordinate.y + "px";
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
