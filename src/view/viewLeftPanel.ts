import {DomHelper, IDisposable} from "../util"

export class LeftPanelView extends DomHelper.FixedElement implements IDisposable {

    constructor(width: number, height: number) {
        super("div", "mde-left-panel");

        this._dom.style.background = "lightgrey";
        this._dom.style.cssFloat = "left";

        this.width = width;
        this.height = height;
    }

    dispose() {
        if (this._dom != null) {
            this._dom.parentElement.removeChild(this._dom);
            this._dom = null;
        }
    }

}
