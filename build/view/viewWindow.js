"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util");
const viewEditor_1 = require("./viewEditor");
const viewSplitter_1 = require("./viewSplitter");
const viewPreview_1 = require("./viewPreview");
const viewConfig_1 = require("./viewConfig");
const os = require("os");
class WindowView extends util_1.DomWrapper.AppendableDomWrapper {
    constructor(themeFilename) {
        super("div", "mde-window");
        this._buffer_state = null;
        this._narrowMode = false;
        this._mouseMoveHandler = null;
        this._theme_filename = themeFilename ? themeFilename : "white-theme.css";
        this.loadThemeCss();
        this.requestWindowSize();
        let updateLayoutThunk = () => {
            let size = this.requestWindowSize();
            this.width = size.x;
            this.height = size.y;
        };
        this._resize_handler = (e) => {
            setTimeout(updateLayoutThunk, 10);
        };
        window.addEventListener("resize", this._resize_handler);
        this._config = new viewConfig_1.ConfigView();
        this._config.appendTo(this._dom);
        this._editor = new viewEditor_1.EditorView();
        this._editor.appendTo(this._dom);
        this._editor.on("tooglePreview", (e) => {
            this.tooglePreview();
        });
        this._editor.documentView.on("scroll", (e) => {
            let docElem = this._editor.documentView.element(), renderDocElem = this._preview.documentView.element();
            let percentage = docElem.scrollTop / (docElem.scrollHeight - docElem.clientHeight);
            renderDocElem.scrollTop = Math.floor(percentage * (renderDocElem.scrollHeight - renderDocElem.clientHeight));
        });
        this._splitter = new viewSplitter_1.SplitterView();
        this._splitter.appendTo(this._dom);
        this._preview = new viewPreview_1.PreviewView();
        this._preview.appendTo(this._dom);
        this._preview_opened = true;
        updateLayoutThunk.call(this);
        this._splitter.marginLeft = this._editor.width;
        this._splitter.element().style.opacity = "0.5";
        this._splitter.on("mousedown", (e) => this.handleSplitterMouseDown(e));
        window.addEventListener("mouseup", (e) => this.handleWindowMouseUp(e), true);
        setTimeout(() => {
            let tmp = this._dom.clientWidth / 2;
            this._editor.width = tmp;
            this._splitter.marginLeft = tmp;
            this._preview.marginLeft = tmp;
            this._preview.width = tmp;
        }, 10);
        switch (os.platform()) {
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
    loadWindowsCss() {
        if (this._platformCssElement) {
            document.head.removeChild(this._platformCssElement);
            this._platformCssElement = null;
        }
        this._platformCssElement = document.createElement("link");
        this._platformCssElement.setAttribute("rel", "stylesheet");
        this._platformCssElement.setAttribute("href", "./styles/css/" + "platform-win.css");
        document.head.appendChild(this._platformCssElement);
    }
    loadLinuxCss() {
        if (this._platformCssElement) {
            document.head.removeChild(this._platformCssElement);
            this._platformCssElement = null;
        }
        this._platformCssElement = document.createElement("link");
        this._platformCssElement.setAttribute("rel", "stylesheet");
        this._platformCssElement.setAttribute("href", "./styles/css/" + "platform-linux.css");
        document.head.appendChild(this._platformCssElement);
    }
    loadMacCss() {
        if (this._platformCssElement) {
            document.head.removeChild(this._platformCssElement);
            this._platformCssElement = null;
        }
        this._platformCssElement = document.createElement("link");
        this._platformCssElement.setAttribute("rel", "stylesheet");
        this._platformCssElement.setAttribute("href", "./styles/css/" + "platform-mac.css");
        document.head.appendChild(this._platformCssElement);
    }
    openPreview() {
        this._preview.element().style.display = "block";
        if (this._buffer_state)
            this._preview.bind(this._buffer_state.model);
        this._preview_opened = true;
    }
    closePreview() {
        this._preview.element().style.display = "none";
        this._preview.unbind();
        this._preview_opened = false;
    }
    loadThemeCss() {
        if (this._cssElement) {
            document.head.removeChild(this._cssElement);
            this._cssElement = null;
        }
        this._cssElement = document.createElement("link");
        this._cssElement.setAttribute("rel", "stylesheet");
        this._cssElement.setAttribute("href", "./styles/css/" + this._theme_filename);
        document.head.appendChild(this._cssElement);
    }
    bind(buffer) {
        this._buffer_state = buffer;
        this._editor.bind(this._buffer_state.model);
        if (this._preview)
            this._preview.bind(this._buffer_state.model);
        this._buffer_state.on("bufferStateChanged", (evt) => {
            if (evt.bufferStateChanged)
                this.setUnsavedState();
            else
                this.setSavedState();
        });
        this._buffer_state.on("bufferAbsPathChanged", (evt) => {
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
        }
        else {
            this.openPreview();
            this._splitter.element().style.display = "block";
            let mid = Math.floor(window.innerWidth / 2);
            this._editor.width = mid;
            this._splitter.marginLeft = mid;
            this._preview.marginLeft = mid;
            this._preview.width = window.innerWidth - mid;
        }
    }
    setUnsavedState() {
        setTimeout(() => {
            this.setTitle(`*${this._buffer_state.filename}`);
        }, 100);
    }
    setSavedState() {
        setTimeout(() => {
            this.setTitle(this._buffer_state.filename);
        }, 100);
    }
    setTitle(content) {
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
    handleSplitterMouseDown(evt) {
        evt.preventDefault();
        this._mouseMoveHandler = this.handleWindowMouseMove.bind(this);
        window.addEventListener("mousemove", this._mouseMoveHandler, true);
    }
    handleWindowMouseUp(evt) {
        if (this._mouseMoveHandler !== null) {
            window.removeEventListener("mousemove", this._mouseMoveHandler, true);
        }
    }
    handleWindowMouseMove(evt) {
        let size = this.requestWindowSize();
        let minWidth = Math.floor(size.x * (2 / 5)), maxWidth = Math.floor(size.x * (4 / 5));
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
    set themeFilename(filename) {
        this._theme_filename = filename;
        this.loadThemeCss();
    }
    get title() {
        return document.title;
    }
    set title(title) {
        document.title = title;
    }
    get width() {
        return this._width;
    }
    set width(w) {
        if (w !== this._width) {
            this.forceSetWidth(w);
        }
    }
    get height() {
        return this._height;
    }
    set height(h) {
        if (this._height !== h) {
            this.forceSetHeight(h);
        }
    }
    forceSetWidth(w) {
        if (this._preview_opened) {
            let srcWidth = this._width, srcEditorWidth = this._editor.width;
            if (!this._narrowMode) {
                this._splitScale = srcEditorWidth / srcWidth;
                this._splitScale = this._splitScale < 0.1 || this._splitScale > 1 || isNaN(this._splitScale) ?
                    0.5 : this._splitScale;
            }
            if (w <= WindowView.ResponsiveWidth) {
                this._narrowMode = true;
                this._splitter.isDisplay = false;
                this._editor.isDisplay = false;
                this._preview.width = w;
                this._preview.marginLeft = 0;
            }
            else {
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
        }
        else {
            this._width = w;
            this._editor.width = w;
        }
    }
    forceSetHeight(h) {
        this._height = h;
        try {
            this._editor.height = h;
        }
        catch (e) {
            console.log(e);
        }
        this._splitter.height = h;
        if (this._preview)
            this._preview.height = h;
    }
    requestWindowSize() {
        return {
            x: window.innerWidth,
            y: window.innerHeight,
        };
    }
    get editorView() {
        return this._editor;
    }
    get previewView() {
        return this._preview;
    }
    get splitterView() {
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
WindowView.leftPadWidth = 220;
WindowView.ResponsiveWidth = 485;
exports.WindowView = WindowView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUMzQixDQUFDO0lBQ0wsQ0FBQztJQUVPLGNBQWMsQ0FBQyxDQUFTO1FBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQztZQUNELElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUM1QixDQUFDO1FBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkIsQ0FBQztRQUNELElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUUxQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFTyxpQkFBaUI7UUFDckIsTUFBTSxDQUFDO1lBQ0gsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxVQUFVO1lBQ3BCLENBQUMsRUFBRSxNQUFNLENBQUMsV0FBVztTQUN4QixDQUFBO0lBQ0wsQ0FBQztJQUVELElBQUksVUFBVTtRQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFJLFdBQVc7UUFDWCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRUQsSUFBSSxZQUFZO1FBQ1osTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUVELElBQUksVUFBVTtRQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzVCLENBQUM7SUFFRCxPQUFPO1FBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFFckIsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFM0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDbEMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDMUUsQ0FBQztJQUNMLENBQUM7O0FBbFlzQix1QkFBWSxHQUFHLEdBQUcsQ0FBQztBQUNuQiwwQkFBZSxHQUFHLEdBQUcsQ0FBQztBQUhqRCxnQ0FzWUMiLCJmaWxlIjoidmlldy92aWV3V2luZG93LmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
