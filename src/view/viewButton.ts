import {DomHelper, IDisposable} from "../util"

export class AbsoluteButton extends DomHelper.AbsoluteElement implements IDisposable {

    constructor(width: number, height: number) {
        super("div", "mde-button");

        this.width = width;
        this.height = height;
        this._dom.style.display = "inline-block";
        this._dom.style.cursor = "pointer";
    }

    setText(content: string) {
        let span = <HTMLSpanElement>DomHelper.elem("span", "mde-button-content");
        span.innerHTML = content;
        this.setContent(span);
    }

    setContent(elem: HTMLSpanElement) {
        if (this._dom.children.length > 0) {
            this._dom.firstElementChild.remove();
        }
        this._dom.appendChild(elem);
    }

    get spanContent() {
        if (this._dom.children.length > 0) {
            return <HTMLSpanElement>this._dom.firstElementChild;
        }
        throw new Error("There no span content.");
    }

    get background() {
        return this._dom.style.background;
    }

    set background(content: string) {
        this._dom.style.background = content;
    }

    dispose() {
        if (this._dom !== null) {
            this._dom.remove();
            this._dom = null;
        }
    }

}
