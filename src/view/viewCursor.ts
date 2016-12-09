import {IDisposable, DomHelper, TickTockPair, TickTockUtil} from "../util"
import {Coordinate, IHidable} from "."

export class CursorView extends DomHelper.AppendableDomWrapper implements IDisposable, IHidable {

    // private _internal : NodeJS.Timer;
    private _ticktock: TickTockUtil;
    private _tick_thunk: () => void;
    private _tock_thunk: () => void;
    private _ticktock_pair: TickTockPair;

    constructor(ticktock: TickTockUtil) {
        super("div", "mde-cursor");

        this._ticktock = ticktock;
        this._dom.style.position = "absolute";
        this._dom.style.height = "22px";
        this._dom.style.width = "2px";

        this.initializeBlinking();
    }

    private initializeBlinking() {

        this._ticktock_pair = {
            tick: () => { this._dom.style.opacity = "1" },
            tock: () => { this._dom.style.opacity = "0" },
        }

        this._ticktock.register(this._ticktock_pair);

    }

    private clearInterval() {
        this._ticktock.unregister(this._ticktock_pair);
    }

    hide() {
        this._dom.style.display = "none";
    }

    show() {
        this._dom.style.display = "block";
    }

    isHidden() {
        return this._dom.style.display == "none"; 
    }

    excite() {
        this.clearInterval();
        this._dom.style.opacity = "1";
        this.initializeBlinking();
    }

    setOff() {
        this.clearInterval();
        this._dom.style.opacity = "0"
    }

    setAbsoluteCoordinate(coordinate: Coordinate) {
        this._dom.style.left = coordinate.x + "px";
        this._dom.style.top = coordinate.y + "px";
    }

    dispose() {
        this.clearInterval();
    }

}
