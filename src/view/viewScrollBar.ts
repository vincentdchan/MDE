import {DomHelper, IDisposable} from "../util"

export class ScrollBarView 
    extends DomHelper.AppendableDomWrapper implements IDisposable {

    public static readonly DefaultWidth = 18;

    private _rectElem: HTMLDivElement = null;

    private _width: number = 0;
    private _height: number = 0;

    constructor() {
        super("div", "mde-scrollbar");

        this._rectElem = this.generateRectElem();
        this._dom.appendChild(this._rectElem);
        this._dom.style.background = "lightgrey";
        this._dom.style.position = "fixed";
        this.width = ScrollBarView.DefaultWidth;
    }

    private generateRectElem() {
        let elem = <HTMLDivElement>DomHelper.elem("div", "mde-scrollbar-rect");
        elem.style.opacity = "0.5";
        return elem;
    }

    get height() {
        return this._height;
    }

    get width() {
        return this._width;
    }

    set height(h: number) {
        if (h !== this._height) {
            this._height = h;
            this._dom.style.height = h + "px";
        }
    }

    set width(w: number) {
        if (w !== this._width) {
            this._width = w;
            this._dom.style.width = w + "px";
        }
    }

    get top() {
        let v = this._dom.style.top;
        return v == "" ? 0 : parseInt(v);
    }

    set top(v : number) {
        this._dom.style.top = v + "px";
    }

    get right() {
        let v = this._dom.style.right;
        return v == "" ? 0 : parseInt(v);
    }

    set right(v: number) {
        this._dom.style.right = v + "px";
    }

    dispose() {
        if (this._dom !== null) {
            this._dom.remove();
            this._dom = null;
        }
    }

}
