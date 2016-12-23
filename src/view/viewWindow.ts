import {DomHelper, IDisposable, Vector2} from "../util"
import {EditorView} from "./viewEditor"
import {SplitterView} from "./viewSplitter"
import {PreviewView} from "./viewPreview"
import {TextModel, BufferState, BufferStateChanged, BufferAbsPathChanged} from "../model"
import * as Electron from "electron"
import {remote} from "electron"

export class WindowView extends DomHelper.AppendableDomWrapper implements IDisposable {

    public static readonly leftPadWidth = 220;

    private _buffer_state: BufferState = null;

    private _width : number;
    private _height: number;

    // private _leftPanel : LeftPanelView;
    private _editor : EditorView;
    private _splitter : SplitterView;
    private _preview : PreviewView;

    constructor() {
        super("div", "mde-window");

        this.requestWindowSize();

        let updateLayoutThunk = () => {
            let size = this.requestWindowSize();
            this.width = size.x;
            this.height = size.y;
        }

        window.addEventListener("resize", (e : Event) => {
            setTimeout(updateLayoutThunk, 10);
        });

        this._editor = new EditorView();
        this._editor.appendTo(this._dom);

        this._splitter = new SplitterView();
        this._splitter.appendTo(this._dom);

        this._preview = new PreviewView();
        this._preview.appendTo(this._dom);

        updateLayoutThunk.call(this);

        this._splitter.marginLeft = this._editor.width;
        this._splitter.element().style.opacity = "0.5";
        this._splitter.on("mousedown", this.handleSplitterMouseDown.bind(this));

        window.addEventListener("mouseup", this.handleWindowMouseUp.bind(this), true);

        window.onbeforeunload = (e: Event) => {
            if (this._buffer_state.isModified) {
                let result = window.confirm("File not saved, sure to close?");

                if (!result) e.returnValue = false;
            }
        };

        setTimeout(() => {
            let rect = this._dom.getBoundingClientRect();

            let tmp = rect.width / 2;
            this._editor.width = tmp;
            this._splitter.marginLeft = tmp;
            this._preview.marginLeft = tmp;
            this._preview.width = tmp;
        }, 10);
    }

    bind(buffer: BufferState) {
        this._buffer_state = buffer;

        this._editor.bind(this._buffer_state.model);
        this._preview.bind(this._buffer_state.model);

        this._buffer_state.on("bufferStateChanged", (evt: BufferStateChanged) => {
            if (evt.bufferStateChanged)
                this.setUnsavedState();
            else
                this.setSavedState();
        });

        this._buffer_state.on("bufferAbsPathChanged", (evt: BufferAbsPathChanged) => {
            this.setTitle(this._buffer_state.filename);
        });

        setTimeout(() => {
            this.setTitle(this._buffer_state.filename);
        }, 100);
    }

    private setUnsavedState() {
        setTimeout(() => {
            this.setTitle(`*${this._buffer_state.filename}`);
        }, 100);
    }

    private setSavedState() {
        setTimeout(() => {
            this.setTitle(this._buffer_state.filename);
        }, 100);
    }

    private setTitle(content: string) {
        this.title = `${content} - MDE`;
    }

    unbind() {
        this._editor.unbind();
        this._preview.unbind();

        this._buffer_state = null;

        setTimeout(() => {
            this.title = "MDE";
        }, 10);
    }

    private _mouseMoveHandler = null;
    private handleSplitterMouseDown(evt: MouseEvent) {
        evt.preventDefault();
        this._mouseMoveHandler = this.handleWindowMouseMove.bind(this);
        window.addEventListener("mousemove", this._mouseMoveHandler, true);
    }

    private handleWindowMouseUp(evt: MouseEvent) {
        if (this._mouseMoveHandler !== null) {
            window.removeEventListener("mousemove", this._mouseMoveHandler, true);
        }
    }

    private handleWindowMouseMove(evt: MouseEvent) {
        let size = this.requestWindowSize();

        let minWidth = Math.floor(size.x * (2/5)),
            maxWidth = Math.floor(size.x * (4/5));

        let offsetX = evt.clientX;
        if (offsetX >= minWidth && offsetX <= maxWidth) {

            this._editor.width = offsetX;
            this._splitter.marginLeft = offsetX;

            this._preview.width = this._width - offsetX;
            this._preview.marginLeft = offsetX;

        }
    }

    get title() {
        return document.title;
    }

    set title(title: string) {
        document.title = title;
    }

    get width() {
        return this._width;
    }

    set width(w: number) {
        if (w !== this._width) {
            this.forceSetWidth(w);
        }
    }

    get height() {
        return this._height;
    }

    set height(h: number) {
        if (this._height !== h) {
            this.forceSetHeight(h);
        }
    }

    private forceSetWidth(w: number) {
        let srcWidth = this._width,
            srcEditorWidth = this._editor.width;

        this._width = w;

        let leftMargin = Math.floor(w * (srcEditorWidth / srcWidth));
        this._editor.width = leftMargin;
        this._splitter.marginLeft = leftMargin;
        this._preview.marginLeft = leftMargin;
        this._preview.width = w - leftMargin;
    }

    private forceSetHeight(h: number) {
        this._height = h;
        try {
            this._editor.height = h;
        } catch (e) {
            console.log(e);
        }
        this._splitter.height = h;
        this._preview.height = h;
    }

    private requestWindowSize() : Vector2 {
        return {
            x: window.innerWidth,
            y: window.innerHeight,
        }
    }

    get editorView() : EditorView {
        return this._editor;
    }

    get splitterView() : SplitterView {
        return this._splitter;
    }

    dispose() {
        this._editor.dispose();
        this._splitter.dispose();
        this._preview.dispose();

        this._editor = null;
        this._splitter = null;
        this._preview = null;

        if (this._mouseMoveHandler !== null) {
            window.removeEventListener("mousemove", this._mouseMoveHandler, true);
        }
    }

}
