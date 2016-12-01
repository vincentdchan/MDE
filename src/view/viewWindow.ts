import {DomHelper, IDisposable} from "../util"
import {LeftPanelView} from "./viewLeftPanel"
import {EditorView} from "./viewEditor"
import {TextModel} from "../model"

interface ISize {
    width: number;
    height: number;
}

export class WindowView extends DomHelper.AppendableDomWrapper implements IDisposable {

    public static readonly leftPadWidth = 220;

    private _model : TextModel;

    private _width : number;
    private _height: number;

    private _leftPanel : LeftPanelView;
    private _editor : EditorView;

    constructor(_model : TextModel) {
        super("div", "mde-window");

        this.requestWindowSize();

        window.addEventListener("resize", (e : Event) => {

            setTimeout(() => {
                let size = this.requestWindowSize();
                this.height = size.height;
                this.width = size.width;
            }, 20);

        });

        this._model = _model;

        this._leftPanel = new LeftPanelView(WindowView.leftPadWidth, this._height);
        this._leftPanel.appendTo(this._dom);

        this._editor = new EditorView(this._model);
        this._editor.appendTo(this._dom);

        let _size = this.requestWindowSize();
        this.width = _size.width;
        this.height = _size.height;

        this._editor.marginLeft = this._leftPanel.width;
    }

/*
    private updateLayout() {
        if (this._width < WindowView.leftPadWidth * 1.5) {
            this._leftPanel.width = 0;
        } else {
            this._leftPanel.width = WindowView.leftPadWidth;
        }
        this._leftPanel.height = this._height;

        this._editor.width = (this._width - this._leftPanel.width);
        this._editor.height = this._height;
        this._editor.marginLeft = this._leftPanel.width;
    }
    */

    get width() {
        return this._width;
    }

    set width(w: number) {
        if (w !== this._width) {
            this._width = w;

            if (this._width < WindowView.leftPadWidth * 2) {
                this._leftPanel.collapsed = true;
                // this._leftPanel.width = 0;
            } else {
                this._leftPanel.collapsed = false;
                // this._leftPanel.width = WindowView.leftPadWidth;
            }
            this._editor.width = this._width - this._leftPanel.width;
            this._editor.marginLeft = this._leftPanel.width;
        }
    }

    get height() {
        return this._height;
    }

    set height(h: number) {
        if (h !== this._height) {
            this._height = h;
            this._leftPanel.height = h;
            this._editor.height = h;
        }
    }

    get leftPanelView() {
        return this._leftPanel
    }

    private requestWindowSize() : ISize {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
        }
    }

    get editorView() : EditorView {
        return this._editor;
    }

    dispose() {
        if (this._editor != null) {
            this._editor.dispose();
            this._editor = null;
        }
    }

}
