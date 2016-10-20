import {elem} from "../util/dom"

export class Cursor {

    private _element : HTMLDivElement;

    constructor() {
        this._element = <HTMLDivElement>elem("div", "cursor");

        this._element.style.height = "1em";
        this._element.style.width = "0.5em";
        this._element.style.background = "black";
        this._element.style.position = "absolute";

        let _cursor_shown = true;
        setInterval(() => {

            if (_cursor_shown) {
                this._element.style.opacity = "0";
            }
            else {
                this._element.style.opacity = "1";
            }
            _cursor_shown = !_cursor_shown;

        }, 500);

    }

    setCoordinate(x: number, y : number) {
        this._element.style.left = x + "px";
        this._element.style.top = y + "px";
    }

    get element() {
        return this._element;
    }

}
