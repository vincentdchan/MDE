import {DomHelper, IDisposable} from "../util"
import {ButtonOption} from "."

export class ButtonView extends DomHelper.AppendableDomWrapper implements IDisposable {

    private _width : number = -1;
    private _height : number;
    private _isActive : boolean;

    private _container: HTMLDivElement;
    private _hover: boolean = false;

    constructor(width: number, height: number) {
        super("div", "mde-button");

        this._dom.style.display = "inline-block";
        this._dom.style.cursor = "pointer";
        this._dom.style.overflow = "hidden";

        this._container = <HTMLDivElement>DomHelper.elem("div", "mde-button-container");
        this._dom.appendChild(this._container);

        this._container.style.display = "flex";
        this._container.style.justifyContent = "center";
        this._container.style.alignItems = "center";

        this._container.setAttribute("title","tooltip");

        this.width = width;
        this.height = height;
    }

    setText(content: string) {
        let span = <HTMLSpanElement>DomHelper.elem("span", "mde-button-content");
        span.innerHTML = content;
        this.setContent(span);
    }

    setContent(elem: HTMLSpanElement) {
        if (this._container.children.length > 0) {
            this._container.firstElementChild.remove();
        }
        this._container.appendChild(elem);
    }

    setContentFromOption(option: ButtonOption) {

        if (option.spanClass) {
            let span = <HTMLSpanElement>DomHelper.elem("span", option.spanClass);
            this.setContent(span);

            if (option.text) {
                this.setTooltip(option.text);
            }
        } else if(option.icon) {
            this.setIcon(option.icon);

            if (option.text) {
                this.setTooltip(option.text);
            }
        } else if (option.text) {
            this.setText(option.text);
        } else {
            this.setText(option.name);
        }

    }

    setIcon(content: string) {
        if (this._container.children.length > 0) {
            this._container.firstElementChild.remove();
        }
        let i = DomHelper.elem("i", content);
        this._container.appendChild(i);
    }

    setTooltip(content: string) {
        this._container.setAttribute("title", content);
    }

    get spanContent() {
        if (this._container.children.length > 0) {
            return <HTMLSpanElement>this._container.firstElementChild;
        }
        throw new Error("There no span content.");
    }

    get background() {
        return this._dom.style.background;
    }

    set background(content: string) {
        this._dom.style.background = content;
    }

    get height() {
        return this._height;
    }

    set height(h : number) {
        if (h !== this._height) {
            this._height = h;

            if (h < 0)
                this._container.style.height = "";
            else
                this._container.style.height = h + "px";
        }
    }

    get active() {
        return this._isActive;
    }

    set active(v : boolean) {
        if (v !== this._isActive) {
            this._isActive = v;
            if (v) {
                this._dom.classList.add("active");
            } else {
                this._dom.classList.remove("active");
            }
        }
    }

    get width() {
        return this._width;
    }

    set width(w : number) {
        if (w !== this._width) {
            this._width = w;

            if (w < 0)
                this._container.style.width = "";
            else
                this._container.style.width = w + "px";
        }
    }

    dispose() {
    }

}
