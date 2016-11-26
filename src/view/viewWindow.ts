import {DomHelper} from "../util"

export class WindowView extends DomHelper.AppendableDomWrapper {

    private _width : number;
    private _height: number;

    constructor() {
        super("div");

        this.requestWindowSize();

        window.addEventListener("resize", (e : Event) => {

            this.requestWindowSize();

        });
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    private requestWindowSize() {
        this._width = window.innerWidth;
        this._height = window.innerHeight;
    }

}
