import {DomHelper, IDisposable} from "../util"

export class LeftPanelView extends DomHelper.AppendableDomWrapper implements IDisposable {

    private _width: number;
    private _height: number;

    constructor(width: number, height: number) {
        super("div", "mde-left-panel");
        this._dom.style.position = "fixed";
        this._dom.style.background = "lightgrey";
        this._dom.style.cssFloat = "left";

        this._width = width;
        this._height = height;
        this.updateSize();
    }

    private updateSize() {
        this._dom.style.width = this._width + "px";
        this._dom.style.height = this._height + "px";
    }

    dispose() {
        if (this._dom != null) {
            this._dom.parentElement.removeChild(this._dom);
            this._dom = null;
        }
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    set width(w: number) {
        this._width = w;
        this.updateSize();
    }

    set height(w: number) {
        this._height = w;
        this.updateSize();
    }

}
