"use strict";
const util_1 = require("../util");
const viewEditor_1 = require("./viewEditor");
const viewSplitter_1 = require("./viewSplitter");
const viewPreview_1 = require("./viewPreview");
const viewConfig_1 = require("./viewConfig");
const os = require("os");
class WindowView extends util_1.DomHelper.AppendableDomWrapper {
    constructor(themeFilename) {
        super("div", "mde-window");
        this._buffer_state = null;
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
        this._splitter.on("mousedown", (e) => { this.handleSplitterMouseDown(e); });
        window.addEventListener("mouseup", (e) => { this.handleWindowMouseUp(e); }, true);
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
            this._width = w;
            let leftMargin = Math.floor(w * (srcEditorWidth / srcWidth));
            this._editor.width = leftMargin;
            this._splitter.marginLeft = leftMargin;
            this._preview.marginLeft = leftMargin;
            this._preview.width = w - leftMargin;
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
    get splitterView() {
        return this._splitter;
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
exports.WindowView = WindowView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdXaW5kb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHVCQUFrRSxTQUNsRSxDQUFDLENBRDBFO0FBQzNFLDZCQUE2QyxjQUM3QyxDQUFDLENBRDBEO0FBQzNELCtCQUEyQixnQkFDM0IsQ0FBQyxDQUQwQztBQUMzQyw4QkFBMEIsZUFDMUIsQ0FBQyxDQUR3QztBQUV6Qyw2QkFBeUIsY0FDekIsQ0FBQyxDQURzQztBQUl2QyxNQUFZLEVBQUUsV0FBTSxJQUNwQixDQUFDLENBRHVCO0FBSXhCLHlCQUFnQyxnQkFBUyxDQUFDLG9CQUFvQjtJQXNCMUQsWUFBWSxhQUF1QjtRQUMvQixNQUFNLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQztRQW5CdkIsa0JBQWEsR0FBZ0IsSUFBSSxDQUFDO1FBNk5sQyxzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUF6TTdCLElBQUksQ0FBQyxlQUFlLEdBQUcsYUFBYSxHQUFHLGFBQWEsR0FBRyxpQkFBaUIsQ0FBQztRQUN6RSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFcEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxpQkFBaUIsR0FBRztZQUNwQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUNwQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLENBQUMsQ0FBQTtRQUVELElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFTO1lBQzdCLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN0QyxDQUFDLENBQUM7UUFFRixNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUV4RCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksdUJBQVUsRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQVFqQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksdUJBQVUsRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFxQjtZQUNuRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBUTtZQUM1QyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsRUFDN0MsYUFBYSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3pELElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxTQUFTLEdBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNuRixhQUFhLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLENBQUMsYUFBYSxDQUFDLFlBQVksR0FBRyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUNqSCxDQUFDLENBQUMsQ0FBQTtRQUVGLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSwyQkFBWSxFQUFFLENBQUM7UUFDcEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRW5DLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSx5QkFBVyxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBRTVCLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUU3QixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUMvQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQy9DLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQWEsT0FBTyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV2RixNQUFNLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBYSxPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUU3RixVQUFVLENBQUM7WUFDUCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQztZQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUM7WUFDL0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQzlCLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVQLE1BQU0sQ0FBQSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbkIsS0FBSyxPQUFPO2dCQUNSLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdEIsS0FBSyxDQUFDO1lBQ1YsS0FBSyxRQUFRO2dCQUNULElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDbEIsS0FBSyxDQUFDO1lBQ1YsS0FBSyxPQUFPO2dCQUNSLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDcEIsS0FBSyxDQUFDO1FBQ2QsQ0FBQztJQUNMLENBQUM7SUFFTyxjQUFjO1FBQ2xCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7WUFDM0IsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDcEQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztRQUNwQyxDQUFDO1FBRUQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsZUFBZSxHQUFHLGtCQUFrQixDQUFDLENBQUM7UUFDcEYsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVPLFlBQVk7UUFDaEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztZQUMzQixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO1FBQ3BDLENBQUM7UUFFRCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxlQUFlLEdBQUcsb0JBQW9CLENBQUMsQ0FBQztRQUN0RixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRU8sVUFBVTtRQUNkLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7WUFDM0IsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDcEQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztRQUNwQyxDQUFDO1FBRUQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsZUFBZSxHQUFHLGtCQUFrQixDQUFDLENBQUM7UUFDcEYsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVPLFdBQVc7UUFDZixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ2hELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7WUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO0lBQ2hDLENBQUM7SUFFTyxZQUFZO1FBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDL0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztJQUNqQyxDQUFDO0lBRU8sWUFBWTtRQUNoQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNuQixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDNUIsQ0FBQztRQUVELElBQUksQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDOUUsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxJQUFJLENBQUMsTUFBbUI7UUFDcEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7UUFFNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVqRCxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLEdBQXVCO1lBQ2hFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQzNCLElBQUk7Z0JBQ0EsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxHQUF5QjtZQUNwRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxDQUFDLENBQUM7UUFFSCxVQUFVLENBQUM7WUFDUCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ1osQ0FBQztJQUVELGFBQWE7UUFDVCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNoQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3BELENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUVuQixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQ2pELElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7WUFDekIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQztZQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQztRQUNsRCxDQUFDO0lBQ0wsQ0FBQztJQUVPLGVBQWU7UUFDbkIsVUFBVSxDQUFDO1lBQ1AsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUNyRCxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDWixDQUFDO0lBRU8sYUFBYTtRQUNqQixVQUFVLENBQUM7WUFDUCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ1osQ0FBQztJQUVPLFFBQVEsQ0FBQyxPQUFlO1FBQzVCLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxPQUFPLFFBQVEsQ0FBQztJQUNwQyxDQUFDO0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDdEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFM0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFFMUIsVUFBVSxDQUFDO1lBQ1AsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDdkIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUdPLHVCQUF1QixDQUFDLEdBQWU7UUFDM0MsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9ELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFTyxtQkFBbUIsQ0FBQyxHQUFlO1FBQ3ZDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzFFLENBQUM7SUFDTCxDQUFDO0lBRU8scUJBQXFCLENBQUMsR0FBZTtRQUN6QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUVwQyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsRUFDckMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTFDLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7UUFDMUIsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLFFBQVEsSUFBSSxPQUFPLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQztZQUU3QyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7WUFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDO1lBRXBDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDO1lBQzVDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQztRQUV2QyxDQUFDO0lBQ0wsQ0FBQztJQUVELElBQUksVUFBVTtRQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFJLGFBQWE7UUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsSUFBSSxhQUFhLENBQUMsUUFBZ0I7UUFDOUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxRQUFRLENBQUM7UUFDaEMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDTCxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztJQUMxQixDQUFDO0lBRUQsSUFBSSxLQUFLLENBQUMsS0FBYTtRQUNuQixRQUFRLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUMzQixDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQUksS0FBSyxDQUFDLENBQVM7UUFDZixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQixDQUFDO0lBQ0wsQ0FBQztJQUVELElBQUksTUFBTTtRQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFJLE1BQU0sQ0FBQyxDQUFTO1FBQ2hCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLENBQUM7SUFDTCxDQUFDO0lBRU8sYUFBYSxDQUFDLENBQVM7UUFDM0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDdkIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFDdEIsY0FBYyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBRXhDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBRWhCLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsY0FBYyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDN0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztZQUV2QyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7WUFDdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLFVBQVUsQ0FBQztRQUN6QyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDM0IsQ0FBQztJQUNMLENBQUM7SUFFTyxjQUFjLENBQUMsQ0FBUztRQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUM7WUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDNUIsQ0FBRTtRQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25CLENBQUM7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFFMUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRU8saUJBQWlCO1FBQ3JCLE1BQU0sQ0FBQztZQUNILENBQUMsRUFBRSxNQUFNLENBQUMsVUFBVTtZQUNwQixDQUFDLEVBQUUsTUFBTSxDQUFDLFdBQVc7U0FDeEIsQ0FBQTtJQUNMLENBQUM7SUFFRCxJQUFJLFVBQVU7UUFDVixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBRUQsSUFBSSxZQUFZO1FBQ1osTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUVELE9BQU87UUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUV4QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUVyQixNQUFNLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUUzRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNsQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMxRSxDQUFDO0lBQ0wsQ0FBQztBQUVMLENBQUM7QUF0VzBCLHVCQUFZLEdBQUcsR0FBRyxDQUFDO0FBRmpDLGtCQUFVLGFBd1d0QixDQUFBIiwiZmlsZSI6InZpZXcvdmlld1dpbmRvdy5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
