import {IDisposable, DomWrapper, TickTockPair, TickTockUtil} from "../util"
import {Coordinate, IHidable} from "."

export enum CursorState {
    Blink, AlwaysOn, AlwaysOff
}

export class CursorView extends DomWrapper.AppendableDomWrapper implements IDisposable, IHidable {

    // private _internal : NodeJS.Timer;
    private _ticktock: TickTockUtil;
    private _tick_thunk: () => void;
    private _tock_thunk: () => void;
    private _ticktock_pair: TickTockPair;
    private _isMajor: boolean;
    private _state: CursorState = CursorState.Blink;

    constructor(isMajor, ticktock: TickTockUtil) {
        super("div", "mde-cursor");

        this._isMajor = isMajor;

        this._ticktock = ticktock;
        this._dom.style.position = "absolute";
        this._dom.style.height = "22px";
        this._dom.style.width = "2px";

        if (this._isMajor) this._dom.classList.add("major");

        this.initializeBlinking();
    }

    private initializeBlinking() {

        this._ticktock_pair = {
            tick: () => { 
                if (this._state !== CursorState.AlwaysOff) this._dom.style.opacity = "1" 
            },
            tock: () => { 
                if (this._state !== CursorState.AlwaysOn) this._dom.style.opacity = "0" 
            },
        }

        this._ticktock.register(this._ticktock_pair);

    }

    private clearInterval() {
        this._ticktock.unregister(this._ticktock_pair);
    }

    get state() {
        return this._state;
    }

    set state(s: CursorState) {
        this._state = s;
    }

    hide() {
        this._dom.style.display = "none";
    }

    show() {
        this._dom.style.display = "block";
    }

    isMajor() {
        return this._isMajor;
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
