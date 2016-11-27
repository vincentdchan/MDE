import {DomHelper, IDisposable} from "../util"

export class ScrollBarView 
    extends DomHelper.FixedElement implements IDisposable {

    public static readonly DefaultWidth = 18;

    private _rectElem: HTMLDivElement = null;

    constructor() {
        super("div", "mde-scrollbar");

        this._rectElem = this.generateRectElem();
        this._dom.appendChild(this._rectElem);
        this._dom.style.background = "lightgrey";

        this.width = ScrollBarView.DefaultWidth;
    }

    private generateRectElem() {
        let elem = <HTMLDivElement>DomHelper.elem("div", "mde-scrollbar-rect");
        elem.style.opacity = "0.5";
        return elem;
    }

    dispose() {
        if (this._dom !== null) {
            this._dom.remove();
            this._dom = null;
        }
    }

}
