import {DomHelper, IDisposable} from "../util"

export class ToolbarView extends DomHelper.FixedElement implements IDisposable {

    public static readonly DefaultHeight = 36;

    constructor() {
        super("div", "mde-toolbar");

        this.height = ToolbarView.DefaultHeight;
        this._dom.style.background = "grey";
    }

    dispose() {
        if (this._dom != null) {
            this._dom.remove();
            this._dom = null;
        }
    }

}
