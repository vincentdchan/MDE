import {DomHelper, IDisposable} from "../util"

export class LineMarginView extends DomHelper.FixedElement implements IDisposable {

    public static readonly DefaultWidth = 30;

    constructor() {
        super("div", "mde-line-margin");

        this.width = LineMarginView.DefaultWidth;
    }

    dispose() {
        if (this._dom != null) {
            this._dom.remove();
            this._dom = null;
        }
    }

}
