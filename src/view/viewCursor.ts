import {IDisposable, DomHelper} from "../util"
import {Coordinate} from "."

export class CursorView extends DomHelper.AppendableDomWrapper implements IDisposable {

    private _internal : NodeJS.Timer;
    private _scrollTopThunk : () => number;

    constructor(scrollTopThunk: () => number) {
        super("div", "mde-cursor");
        this._scrollTopThunk = scrollTopThunk;

        this._dom.style.position = "absolute";
        this._dom.style.height = "22px";
        this._dom.style.width = "2px";

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
        this._dom.style.left = coordinate.x + "px";
        this._dom.style.top = coordinate.y + this._scrollTopThunk() + "px";
    }

    dispose() {
        this.clearInterval();
    }

}
