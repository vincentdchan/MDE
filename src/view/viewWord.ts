import {IVirtualElement, Coordinate} from "."
import {MarkdownTokenType, DomHelper} from "../util"

function addClass(elm: HTMLElement, className: string) {
    elm.classList.add(className);
}

export class WordView {

    private _tokenType: MarkdownTokenType;
    private _text: string;
    private _dom: HTMLSpanElement = null;

    constructor(_text: string | WordView, tokenType: MarkdownTokenType = MarkdownTokenType.Text) {
        if (typeof _text == "string")
            this._text = _text;
        else if (_text instanceof WordView) {
            this._text = _text._text;
            this._tokenType = _text._tokenType;
        }

        this._tokenType = tokenType;

        this._dom = DomHelper.elem("span");

        // this._dom.innerHTML = this._text.replace(/ /g, "&nbsp;");
        let _node = document.createTextNode(this._text);
        this._dom.appendChild(_node);

        switch(this._tokenType) {
            case MarkdownTokenType.Heading1:
                addClass(this._dom, "mde-word-h1");
                break;
            case MarkdownTokenType.Heading2:
                addClass(this._dom, "mde-word-h2");
                break;
            case MarkdownTokenType.Bold:
                addClass(this._dom, "mde-word-bold");
                break;
            case MarkdownTokenType.Italic:
                addClass(this._dom, "mde-word-italic");
                break;
            case MarkdownTokenType.Pre:
                addClass(this._dom, "mde-word-pre");
                break;
            case MarkdownTokenType.ListItemStart:
                addClass(this._dom, "mde-word-listItemStart");
                break;
            case MarkdownTokenType.BlockquoteStart:
                addClass(this._dom, "mde-word-blockquoteStart");
                break;
            case MarkdownTokenType.HTMLPunct:
                addClass(this._dom, "mde-word-htmlPunct");
                break;
            case MarkdownTokenType.HTMLComment:
                addClass(this._dom, "mde-word-htmlComment");
                break;
            case MarkdownTokenType.HTMLTag:
                addClass(this._dom, "mde-word-htmlTag");
                break;
            case MarkdownTokenType.HTMLAttribute:
                addClass(this._dom, "mde-word-htmlAttribute");
                break;
            case MarkdownTokenType.HTMLString:
                addClass(this._dom, "mde-word-htmlString");
                break;
            case MarkdownTokenType.SquareBracket:
                addClass(this._dom, "mde-word-squareBracket");
                break;
        }

    }

    getCoordinate(offset: number) : Coordinate {
        if (offset > this.length)
            throw new Error("Index out of range. offset:" + offset);
        let domRange = document.createRange();
        domRange.setStart(this._dom.firstChild, offset);
        domRange.setEnd(this._dom.firstChild, offset);
        let rect = domRange.getBoundingClientRect();
        return {
            x: rect.left,
            y: rect.top,
        }
    }

    element() {
        return this._dom;
    }

    appendTo(elm: HTMLElement) {
        elm.appendChild(this._dom);
    }

    get length() {
        return this._text.length;
    }

    get text() {
        return this._text;
    }

    get tokenType() {
        return this._tokenType;
    }

}
