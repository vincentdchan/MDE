import {DomWrapper, IDisposable} from "../util"

export interface MouseEventListener {
    (idom: DomWrapper.IDOMWrapper,evt: MouseEvent) : void;
}

/**
 * - add `isDisplay` property at v0.1.0
 */
export class SplitterView extends DomWrapper.FixedElement implements IDisposable {

    public static readonly DefaultWidth = 4;

    private _isDisplay: boolean;

    constructor(width: number = -1) {
        super("div", "mde-splitter");

        width = width >= 0 ? width : SplitterView.DefaultWidth;
        this.width = width;
        this.isDisplay = true;
    }

    get isDisplay() {
        return this._isDisplay;
    }

    set isDisplay(v: boolean) {
        if (this._isDisplay !== v) {
            this._isDisplay = v;

            if (v) {
                this._dom.style.display = "block";
            } else {
                this._dom.style.display = "none";
            }
        }
    }

    dispose() {
    }

}
