import {DomHelper, IDisposable, Vector2} from "../util"
import {LeftPanelView} from "./viewLeftPanel"
import {EditorView} from "./viewEditor"
import {SplitterView} from "./viewSplitter"
import {TextModel} from "../model"

export class WindowView extends DomHelper.AppendableDomWrapper implements IDisposable {

    public static readonly leftPadWidth = 220;

    private _model : TextModel;

    private _width : number;
    private _height: number;

    private _leftPanel : LeftPanelView;
    private _splitter : SplitterView;
    private _editor : EditorView;

    constructor(_model : TextModel) {
        super("div", "mde-window");

        this.requestWindowSize();

        let updateLayoutThunk = () => {
            let size = this.requestWindowSize();
            this.width = size.x;
            this.height = size.y;
        }

        window.addEventListener("resize", (e : Event) => {

            setTimeout(updateLayoutThunk, 20);

        });

        this._model = _model;

        this._leftPanel = new LeftPanelView(WindowView.leftPadWidth, this._height);
        this._leftPanel.appendTo(this._dom);

        this._splitter = new SplitterView();
        this._splitter.appendTo(this._dom);

        this._editor = new EditorView(this._model);
        this._editor.appendTo(this._dom);

        updateLayoutThunk.call(this);

        this._splitter.marginLeft = this._leftPanel.width - this._splitter.width;
        this._splitter.element().style.opacity = "0.5";
        this._splitter.on("mousedown", this.handleSplitterMouseDown.bind(this));

        window.addEventListener("mouseup", this.handleWindowMouseUp.bind(this), true);

        this._editor.marginLeft = this._leftPanel.width;

        this._leftPanel.on("collapsed", (evt: Event) => {
            this._splitter.element().style.display = "none";
        });

        this._leftPanel.on("expanded", (evt: Event) => {
            this._splitter.element().style.display = "block";
        });

        this._leftPanel.navView.on("click", (evt: MouseEvent) => {
            if (this._leftPanel.collapsed) {
                this._leftPanel.collapsed = false;
                this._leftPanel.width = WindowView.leftPadWidth;

                let v = this.requestWindowSize();
                this.forceSetWidth(v.x);
                this.forceSetHeight(v.y);
            } else {
                this._leftPanel.collapsed = true;

                let v = this.requestWindowSize();
                this.forceSetWidth(v.x);
                this.forceSetHeight(v.y);
            }
        });
    }

    reaload(_model: TextModel) {
        this._model = _model;

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
        let offsetX = evt.clientX;

        if (offsetX < LeftPanelView.MinWidth) {
            this._leftPanel.collapsed = true;

            this._editor.width = this._width - this._leftPanel.width;
            this._editor.marginLeft = this._leftPanel.width;
        } else if (offsetX >= LeftPanelView.MinWidth && offsetX <= this._width - EditorView.MinWidth) {
            if (this._leftPanel.collapsed)
                this._leftPanel.collapsed = false;
            this._leftPanel.width = offsetX;
            this._splitter.marginLeft = offsetX - this._splitter.width;
            this._editor.width = this._width - offsetX;
            this._editor.marginLeft = offsetX;
        }
    }

    get width() {
        return this._width;
    }

    set width(w: number) {
        if (w !== this._width) {
            this.forceSetWidth(w);
        }
    }

    private forceSetWidth(w: number) {
        this._width = w;

        this._editor.width = this._width - this._leftPanel.width;
        this._editor.marginLeft = this._leftPanel.width;
        this._splitter.marginLeft = this._leftPanel.width - this._splitter.width;
    }

    get height() {
        return this._height;
    }

    set height(h: number) {
        if (h !== this._height) {
            this.forceSetHeight(h);
        }
    }

    private forceSetHeight(h: number) {
        this._height = h;
        this._leftPanel.height = h;
        this._splitter.height = h;
        this._editor.height = h;
    }

    get leftPanelView() {
        return this._leftPanel
    }

    private requestWindowSize() : Vector2 {
        return {
            x: document.documentElement.clientWidth,
            y: document.documentElement.clientHeight,
        }
    }

    get editorView() : EditorView {
        return this._editor;
    }

    get splitterView() : SplitterView {
        return this._splitter;
    }

    dispose() {
        this._leftPanel.dispose();
        this._splitter.dispose();
        this._editor.dispose();

        this._leftPanel = null;
        this._splitter = null;
        this._editor = null;
    }

}
