import {DomHelper, IDisposable} from "../util"

export interface MouseEventListener {
    (idom: DomHelper.IDOMWrapper,evt: MouseEvent) : void;
}

export class SplitterView extends DomHelper.FixedElement implements IDisposable {

    public static readonly DefaultWidth = 4;

    constructor(width: number = -1) {
        super("div", "mde-splitter");

        width = width >= 0 ? width : SplitterView.DefaultWidth;
        this.width = width;

        this._dom.style.background = "black";
        this._dom.style.cursor = "col-resize";
    }

    dispose() {
        if (this._dom !== null) {
            this._dom.remove();
            this._dom = null;
        }
    }

}
