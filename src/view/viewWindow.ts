import {DomHelper, IDisposable} from "../util"
import {LeftPanelView} from "./viewLeftPanel"
import {EditorView} from "./viewEditor"
import {TextModel} from "../model"

export class WindowView extends DomHelper.AppendableDomWrapper implements IDisposable {

    public static readonly leftPadWidth = 250;

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
                this.requestWindowSize();
                this.updateLayout();
            }, 20);

        });

        this._model = _model;

        this._leftPanel = new LeftPanelView(WindowView.leftPadWidth, this._height);
        this._leftPanel.appendTo(this._dom);

        this._editor = new EditorView(this._model);
        this._editor.appendTo(this._dom);
        this.updateLayout();
    }

    private updateLayout() {
        if (this._width < WindowView.leftPadWidth * 1.5) {
            this._leftPanel.width = 0;
        } else {
            this._leftPanel.width = WindowView.leftPadWidth;
        }
        this._leftPanel.height = this._height;

        this._editor.width = (this._width - this._leftPanel.width);
        this._editor.height = this._height;
        this._editor.element().style.marginLeft = this._leftPanel.width + "px";
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    get leftPanelView() {
        return this._leftPanel
    }

    private requestWindowSize() {
        // this._width = window.innerWidth;
        // this._height = window.innerHeight;
        this._width = document.documentElement.clientWidth;
        this._height = document.documentElement.clientHeight;
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
