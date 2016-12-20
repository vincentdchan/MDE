import {WordView} from "./viewWord"
import {IVirtualElement, Coordinate} from "."
import {LineRenderer, MarkdownToken} from "../controller"
import {IDisposable, DomHelper} from "../util"
import {Deque} from "../util/queue"

function getItem<T>(arr : T[], index: number) : T {
    if (arr === undefined || index >= arr.length || index < 0) return null;
    return arr[index];
}

function mergeSet<T>(a: Set<T>, b: Set<T>) {
    let result = new Set<T>();

    function addToResult(e : T) {
        result.add(e);
    }

    a.forEach(addToResult);
    b.forEach(addToResult);

    return result;
}

export class RenderTextEvent extends Event {

    private _text: string;

    constructor(text: string) {
        super("renderText");

        this._text = text;
    }

    get text() {
        return this._text;
    }

}

export class RenderNumberEvent extends Event {

    private _num: number;

    constructor(num: number) {
        super("renderNumber");

        this._num = num;
    }

    get number() {
        return this._num;
    }

}

class LeftMargin extends DomHelper.ResizableElement implements IDisposable {

    constructor(width: number) {
        super("div", "mde-line-leftMargin");

        this._dom.style.display = "block";
        this._dom.style.cssFloat = "left";
        this.width = width;
    }

    removeChild(node: Node) {
        this._dom.removeChild(node);
    }

    clearAll() {
        while(this._dom.children.length > 0) {
            this._dom.removeChild(this._dom.lastChild);
        }
    }

    dispose() {
    }

}

export class LineView extends DomHelper.AppendableDomWrapper implements IDisposable {

    public static readonly DefaultLeftMarginWidth = 45;

    private _line_renderer: LineRenderer;

    private _line_index: number;
    private _leftMargin: LeftMargin;
    private _content: string;
    private _words: WordView[]; 
    private _rendered_lineNumber: number = 0;
    private _line_content_dom: HTMLElement = null;

    constructor(index: number, lineRenderer: LineRenderer) {
        super("p", "mde-line");

        this._leftMargin = new LeftMargin(LineView.DefaultLeftMarginWidth);
        this._leftMargin.appendTo(this._dom);

        this._dom.style.whiteSpace = "pre-wrap";
        this._dom.style.minHeight = "16px";
        this._dom.style.position = "relative";
        this._dom.style.width = "inherit";
        this._dom.style.paddingTop = "5px";
        this._dom.style.paddingBottom = "5px";
        this._dom.style.margin = "0";
        this._dom.style.cursor = "text";

        this._line_index = index;
        this._line_renderer = lineRenderer;

        this._line_renderer.register(index, (tokens: MarkdownToken[]) => {
            this.renderMethod(tokens);
        });

        this.renderLineNumber(index);
    }

    private renderMethod(tokens: MarkdownToken[]) {

        this._words = [];

        if (this._line_content_dom) {
            this._dom.removeChild(this._line_content_dom);
            this._line_content_dom = null;
        }
        this._line_content_dom = this.generateContentDom();

        tokens.forEach((token: MarkdownToken, index: number) => {
            let wordView = new WordView(token.text, token.type);
            this._words.push(wordView);
            wordView.appendTo(this._line_content_dom);
        });

        this._dom.appendChild(this._line_content_dom);
    }

    private generateContentDom() : HTMLElement {
        let elem = DomHelper.Generic.elem<HTMLSpanElement>("span", "mde-line-content");
        elem.style.marginLeft = this._leftMargin.width + "px";
        elem.style.width = "auto";
        elem.style.display = "block";
        return elem;
    }

    private renderLineNumber(num: number) {
        if (num !== this._rendered_lineNumber) {
            let span = DomHelper.Generic.elem<HTMLSpanElement>("span", 
                "mde-line-number unselectable");

            this._leftMargin.clearAll();

            let node = document.createTextNode(num.toString());
            span.appendChild(node);

            this._leftMargin.element().appendChild(span);
            this._rendered_lineNumber = num;

            let evt = new RenderNumberEvent(num);
            this._dom.dispatchEvent(evt);
        }
    }

    render(content: string) {

        this._words = [];
        if (content.length > 0 && content.charAt(content.length - 1) == '\n')
            content = content.slice(0, content.length - 1);
        if (this._line_content_dom) {
            this._dom.removeChild(this._line_content_dom);
        }
        this._line_content_dom = this.generateContentDom();

        let wordView = new WordView(content);
        this._words.push(wordView);
        this._line_content_dom.appendChild(wordView.element());

        this._dom.appendChild(this._line_content_dom);

        let evt = new RenderTextEvent(content);
        this._dom.dispatchEvent(evt);
    }

    ///
    /// get coordinate of the alphabet in the specific offset
    /// if "safe" parameter is set to true, it will throw a Error
    ///     if the offset is not in range.
    ///
    getCoordinate(offset: number, safe: boolean = true) : Coordinate {
        let count = 0;
        for (let i = 0; i < this._words.length; i++) {
            let word = this._words[i];
            if (offset < count + word.length) {
                return word.getCoordinate(offset - count);
            }
            count += word.length;
        }
        if (safe) {
            throw new Error("Index out of Range. offset: " + offset);
        } else {
            let lastWord = this._words[this._words.length - 1];
            return lastWord.getCoordinate(lastWord.length);
        }
    }

    dispose() {
        this._leftMargin.dispose();
        this._line_renderer.ungister(this._line_index);
    }

    get leftMargin() {
        return this._leftMargin;
    }

    get contentContainerElement() {
        return this._line_content_dom;
    }

    get words() {
        return this._words;
    }

}
