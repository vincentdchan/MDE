import {IDisposable, DomHelper} from "../util"
import {Coordinate} from "."

export class CursorView extends DomHelper.AppendableDomWrapper implements IDisposable {

    private _internal : NodeJS.Timer;

    constructor() {
        super("div", "mde-cursor");
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
        let scrollY  = window.scrollY
        this._dom.style.left = coordinate.x + "px";
        this._dom.style.top = coordinate.y + scrollY + "px";
    }

    dispose() {
        if (this._dom) {
            this._dom.parentElement.removeChild(this._dom);
            this._dom = null;
        }
    }

}
