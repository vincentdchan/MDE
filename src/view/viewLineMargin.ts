import {DomHelper, IDisposable} from "../util"

export class LineMarginView extends DomHelper.AppendableDomWrapper implements IDisposable {

    constructor() {
        super("div", "mde-line-margin");

        this._dom.style.width = 30 + "px";
    }

    dispose() {
        if (this._dom != null) {
            this._dom.remove();
            this._dom = null;
        }
    }

    get width() {
        let str = this._dom.style.width;
        return str == "" ? 0 : parseInt(str);
    }

    set width(w : number) {
        this._dom.style.width = w + "px";
    }

}
