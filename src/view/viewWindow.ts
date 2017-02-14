import {DomHelper, IDisposable, Vector2, KeyCode, i18n as $} from "../util"
import {EditorView, TooglePreviewEvent} from "./viewEditor"
import {SplitterView} from "./viewSplitter"
import {PreviewView} from "./viewPreview"
import {TrainMoveEvent} from "./viewScrollbar"
import {ConfigView} from "./viewConfig"
import {TextModel, BufferState, BufferStateChanged, BufferAbsPathChanged, Snippet} from "../model"
import * as Electron from "electron"
import {remote} from "electron"
import * as os from "os"
import * as fs from "fs";
import * as path from "path";

/**
 * ## add narrow mode support at v0.0.4
 * 
 *  the window will turn into **narrow mode** when the window
 *  width is smaller than `ResponsiveWidth`
 * 
 */
export class WindowView extends DomHelper.AppendableDomWrapper implements IDisposable {

    public static readonly leftPadWidth = 220;
    public static readonly ResponsiveWidth = 485;

    private _buffer_state: BufferState = null;

    private _width : number;
    private _height: number;

    private _splitScale: number;
    private _narrowMode: boolean = false;

    // private _leftPanel : LeftPanelView;
    private _editor : EditorView;
    private _splitter : SplitterView;
    private _preview : PreviewView;
    private _config: ConfigView;

    private _preview_opened: boolean;
    private _resize_handler: (e: Event) => void;

    private _cssElement: HTMLElement;
    private _platformCssElement: HTMLElement;
    private _theme_filename: string;

    constructor(themeFilename? : string) {
        super("div", "mde-window");
        this._theme_filename = themeFilename ? themeFilename : "white-theme.css";
        this.loadThemeCss();

        this.requestWindowSize();
        let updateLayoutThunk = () => {
            let size = this.requestWindowSize();
            this.width = size.x;
            this.height = size.y;
        }

        this._resize_handler = (e : Event) => {
            setTimeout(updateLayoutThunk, 10);
        };

        window.addEventListener("resize", this._resize_handler);

        this._config = new ConfigView();
        this._config.appendTo(this._dom);

        // ============================================
        // let defaultSnippet = path.join(__dirname, "../../snippets/", "default.json");

        // let snippetMapper : Snippet.ISnippetMap = JSON.parse(fs.readFileSync(defaultSnippet, "utf8"));
        // this._editor = new EditorView(snippetMapper);
        // ============================================
        this._editor = new EditorView();
        this._editor.appendTo(this._dom);
        this._editor.on("tooglePreview", (e: TooglePreviewEvent) => {
            this.tooglePreview();
        })
        this._editor.documentView.on("scroll", (e: Event) => {
            let docElem = this._editor.documentView.element(),
                renderDocElem = this._preview.documentView.element();
            let percentage = docElem.scrollTop / (docElem.scrollHeight - docElem.clientHeight);
            renderDocElem.scrollTop = Math.floor(percentage * (renderDocElem.scrollHeight - renderDocElem.clientHeight));
        })

        this._splitter = new SplitterView();
        this._splitter.appendTo(this._dom);

        this._preview = new PreviewView();
        this._preview.appendTo(this._dom);
        this._preview_opened = true;

        updateLayoutThunk.call(this);

        this._splitter.marginLeft = this._editor.width;
        this._splitter.element().style.opacity = "0.5";
        this._splitter.on("mousedown", (e: MouseEvent) => { this.handleSplitterMouseDown(e) });

        window.addEventListener("mouseup", (e: MouseEvent) => { this.handleWindowMouseUp(e) }, true);

        setTimeout(() => {
            let tmp = this._dom.clientWidth / 2;
            this._editor.width = tmp;
            this._splitter.marginLeft = tmp;
            this._preview.marginLeft = tmp;
            this._preview.width = tmp;
        }, 10);

        switch(os.platform()) {
            case "win32":
                this.loadWindowsCss();
                break;
            case "darwin":
                this.loadMacCss();
                break;
            case "linux":
                this.loadLinuxCss();
                break;
        }
    }

    private loadWindowsCss() {
        if (this._platformCssElement) {
            document.head.removeChild(this._platformCssElement);
            this._platformCssElement = null;
        }

        this._platformCssElement = document.createElement("link");
        this._platformCssElement.setAttribute("rel", "stylesheet");
        this._platformCssElement.setAttribute("href", "./styles/css/" + "platform-win.css");
        document.head.appendChild(this._platformCssElement);
    }

    private loadLinuxCss() {
        if (this._platformCssElement) {
            document.head.removeChild(this._platformCssElement);
            this._platformCssElement = null;
        }

        this._platformCssElement = document.createElement("link");
        this._platformCssElement.setAttribute("rel", "stylesheet");
        this._platformCssElement.setAttribute("href", "./styles/css/" + "platform-linux.css");
        document.head.appendChild(this._platformCssElement);
    }

    private loadMacCss() {
        if (this._platformCssElement) {
            document.head.removeChild(this._platformCssElement);
            this._platformCssElement = null;
        }

        this._platformCssElement = document.createElement("link");
        this._platformCssElement.setAttribute("rel", "stylesheet");
        this._platformCssElement.setAttribute("href", "./styles/css/" + "platform-mac.css");
        document.head.appendChild(this._platformCssElement);
    }

    private openPreview() {
        this._preview.element().style.display = "block";
        if (this._buffer_state) this._preview.bind(this._buffer_state.model);
        this._preview_opened = true;
    }

    private closePreview() {
        this._preview.element().style.display = "none";
        this._preview.unbind();
        this._preview_opened = false;
    }

    private loadThemeCss() {
        if (this._cssElement) {
            document.head.removeChild(this._cssElement);
            this._cssElement = null;
        }

        this._cssElement = document.createElement("link");
        this._cssElement.setAttribute("rel", "stylesheet");
        this._cssElement.setAttribute("href", "./styles/css/" + this._theme_filename);
        document.head.appendChild(this._cssElement);
    }

    bind(buffer: BufferState) {
        this._buffer_state = buffer;

        this._editor.bind(this._buffer_state.model);
        if (this._preview)
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

    tooglePreview() {
        if (this._preview_opened) {
            this.closePreview();
            this._editor.width = this.width;
            this._splitter.element().style.display = "none";
        } else {
            this.openPreview();

            this._splitter.element().style.display = "block";
            let mid = Math.floor(window.innerWidth / 2);
            this._editor.width = mid;
            this._splitter.marginLeft = mid;
            this._preview.marginLeft = mid;
            this._preview.width = window.innerWidth - mid;
        }
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
        if (this._preview)
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

    get configView() {
        return this._config;
    }

    get themeFilename() {
        return this._theme_filename;
    }

    set themeFilename(filename: string) {
        this._theme_filename = filename;
        this.loadThemeCss();
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
        if (this._preview_opened) {
            let srcWidth = this._width,
                srcEditorWidth = this._editor.width;
            if (!this._narrowMode) {
                this._splitScale = srcEditorWidth / srcWidth;
                this._splitScale = this._splitScale < 0.1 || this._splitScale > 1 || isNaN(this._splitScale)? 
                    0.5 : this._splitScale;
            }

            if (w <= WindowView.ResponsiveWidth) {
                this._narrowMode = true;
                this._splitter.isDisplay = false;
                this._editor.isDisplay = false;

                this._preview.width = w;
                this._preview.marginLeft = 0;
            } else {
                this._narrowMode = false;
                this._splitter.isDisplay = true;
                this._editor.isDisplay = true;

                this._width = w;

                let leftMargin = Math.floor(w * this._splitScale);
                this._editor.width = leftMargin;
                this._splitter.marginLeft = leftMargin;

                this._preview.marginLeft = leftMargin;
                this._preview.width = w - leftMargin;
            }
        } else {
            this._width = w;
            this._editor.width = w;
        }
    }

    private forceSetHeight(h: number) {
        this._height = h;
        try {
            this._editor.height = h;
        } catch (e) {
            console.log(e);
        }
        this._splitter.height = h;

        if (this._preview)
            this._preview.height = h;
    }

    private requestWindowSize() : Vector2 {
        return {
            x: window.innerWidth,
            y: window.innerHeight,
        }
    }

    get editorView(): EditorView {
        return this._editor;
    }

    get splitterView(): SplitterView {
        return this._splitter;
    }

    get narrowMode() {
        return this._narrowMode;
    }

    dispose() {
        this._editor.dispose();
        this._splitter.dispose();
        this._preview.dispose();

        this._editor = null;
        this._splitter = null;
        this._preview = null;

        window.removeEventListener("resize", this._resize_handler);

        if (this._mouseMoveHandler !== null) {
            window.removeEventListener("mousemove", this._mouseMoveHandler, true);
        }
    }

}
