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
    }

    dispose() {
    }

}
