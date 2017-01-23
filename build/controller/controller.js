"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const model_1 = require("../model");
const view_1 = require("../view");
const util_1 = require("../util");
const electron_1 = require("electron");
const menu_1 = require("../view/menu");
const { Menu, MenuItem } = electron_1.remote;
const config = {
    "version": "0.0.2"
};
const SaveFilter = [
    { name: "Markdown", extensions: ["md"] },
    { name: "Text", extensions: ["txt"] },
    { name: "All Files", extensions: ["*"] }
];
let _aboutMsg;
function getAboutMessageString() {
    if (_aboutMsg === undefined) {
        _aboutMsg = [
            util_1.StringFormat(util_1.i18n.getString("about.version"), config["version"]),
            util_1.StringFormat(util_1.i18n.getString("about.releaseDate"), "2017/1/1"),
            util_1.StringFormat(util_1.i18n.getString("about.nodeVersion"), "6.5"),
        ].join("\n\r");
    }
    return _aboutMsg;
}
class MDE {
    constructor() {
        this._buffers = [];
        this._view = null;
        this._menu = new menu_1.MainMenuView();
        this._menu.on("menuClick", (evt) => {
            this.handleMenuClick(evt);
        });
        this._menu.setApplicationMenu();
        this._buffer_state = new model_1.BufferState();
        this._view = new view_1.WindowView();
        this._view.bind(this._buffer_state);
        window.onbeforeunload = (e) => {
            if (this._buffer_state.isModified) {
                let result = this.confirmSaveFile();
                switch (result) {
                    case 0:
                        this.handleSyncSaveFile(SaveFilter);
                        break;
                    case 1:
                        break;
                    case 2:
                        e.returnValue = false;
                        break;
                }
            }
        };
        this._view.on("keydown", (e) => {
            if (e.ctrlKey) {
                switch (e.keyCode) {
                    case util_1.KeyCode.$S:
                        try {
                            if (this._buffer_state.isModified)
                                this.handleSaveFile(SaveFilter);
                        }
                        catch (e) {
                            console.log(e);
                        }
                        break;
                }
            }
        });
    }
    reloadBuffer(buffer) {
        this._buffer_state.dispose();
        this._buffer_state = buffer;
        this._view.unbind();
        this._view.bind(this._buffer_state);
    }
    handleMenuClick(evt) {
        switch (evt.buttonType) {
            case menu_1.MenuButtonType.NewFile:
                this.handleNewFile();
                break;
            case menu_1.MenuButtonType.OpenFile:
                this.handleOpenFile();
                break;
            case menu_1.MenuButtonType.Save:
                try {
                    this.handleSaveFile(SaveFilter);
                }
                catch (e) {
                    console.log(e);
                }
                break;
            case menu_1.MenuButtonType.SaveAs:
                this.handleSaveAsFile(SaveFilter);
                break;
            case menu_1.MenuButtonType.Preference:
                this._view.settingView.toggle();
                break;
            case menu_1.MenuButtonType.OpenDevTools:
                util_1.Host.openDevTools();
                break;
            case menu_1.MenuButtonType.Redo:
                this._view.editorView.redo();
                break;
            case menu_1.MenuButtonType.Undo:
                this._view.editorView.undo();
                break;
            case menu_1.MenuButtonType.WhiteTheme:
                this._view.themeFilename = "white-theme.css";
                break;
            case menu_1.MenuButtonType.BlackTheme:
                this._view.themeFilename = "black-theme.css";
                break;
            case menu_1.MenuButtonType.Copy:
                this._view.editorView.copyToClipboard();
                break;
            case menu_1.MenuButtonType.Paste:
                this._view.editorView.pasteToDocument();
                break;
            case menu_1.MenuButtonType.Cut:
                this._view.editorView.cutToClipboard();
                break;
            case menu_1.MenuButtonType.Reload:
                util_1.Host.reload();
                break;
            case menu_1.MenuButtonType.About:
                this.showAboutMessage();
                break;
        }
    }
    showAboutMessage() {
        electron_1.remote.dialog.showMessageBox(electron_1.remote.getCurrentWindow(), {
            type: "info",
            message: getAboutMessageString(),
            buttons: [util_1.i18n.getString("ok")],
        });
    }
    handleNewFile() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._buffer_state.isModified) {
                let id = yield this.confirmSaveFile();
                switch (id) {
                    case 0:
                        yield this.handleSaveFile(SaveFilter);
                    case 1:
                        let newBuffer = new model_1.BufferState();
                        this.reloadBuffer(newBuffer);
                        break;
                    case 2:
                        break;
                }
            }
        });
    }
    confirmSaveFile() {
        let id = electron_1.remote.dialog.showMessageBox({
            buttons: [util_1.i18n.getString("save"), util_1.i18n.getString("notSave"), util_1.i18n.getString("cancel")],
            title: util_1.i18n.getString("window.name"),
            message: util_1.StringFormat(util_1.i18n.getString("window.fileNotSaved"), this._buffer_state.filename),
        });
        return id;
    }
    handleOpenFile() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._buffer_state && this._buffer_state.isModified) {
                let result = this.confirmSaveFile();
                switch (result) {
                    case 0:
                        this.handleSyncSaveFile(SaveFilter);
                        break;
                    case 1:
                        break;
                    case 2:
                        return;
                }
            }
            let filenames = electron_1.remote.dialog.showOpenDialog(electron_1.remote.getCurrentWindow(), {
                title: "Open File",
                filters: [
                    { name: "Markdown", extensions: ["md"] },
                    { name: "HTML", extensions: ["html", "htm"] },
                    { name: "Text", extensions: ["txt"] },
                ],
            });
            if (filenames === undefined || filenames === null) {
                throw new Error("Can not get the filename you want to open.");
            }
            else if (filenames.length > 0) {
                let filename = filenames[0];
                let newBuffer = new model_1.BufferState(filename);
                yield newBuffer.readFileContentToModel();
                this.reloadBuffer(newBuffer);
            }
        });
    }
    handleSaveFile(_saveFilter) {
        return __awaiter(this, void 0, void 0, function* () {
            let path;
            if (!this._buffer_state.absolutePath) {
                let paths = yield util_1.Host.showSaveDialog({
                    title: "Save",
                    filters: _saveFilter,
                });
                if (paths) {
                    this._buffer_state.absolutePath = paths;
                }
                else {
                    throw new Error("Illegal path.");
                }
            }
            let result = yield this._buffer_state.writeContentToFile(this._buffer_state.absolutePath);
        });
    }
    handleSyncSaveFile(_saveFilter) {
        let path;
        if (!this._buffer_state.absolutePath) {
            let paths = electron_1.remote.dialog.showSaveDialog({
                title: "Save",
                filters: _saveFilter,
            });
            if (paths) {
                this._buffer_state.absolutePath = paths;
            }
            else {
                throw new Error("Illegal path.");
            }
        }
        let result = this._buffer_state.syncWriteContentToFile(this._buffer_state.absolutePath);
    }
    handleSaveAsFile(_saveFilter) {
        return __awaiter(this, void 0, void 0, function* () {
            let paths = yield util_1.Host.showSaveDialog({
                title: "Save",
                filters: _saveFilter
            });
            if (paths) {
                let result = yield this._buffer_state.writeContentToFile(paths);
                if (result) {
                    this._buffer_state.absolutePath = paths;
                }
            }
        });
    }
    findLineAncestor(node) {
        let elm = node.parentElement;
        while (true) {
            if (elm.classList.contains("editor-line")) {
                return elm;
            }
            else if (elm === document.body) {
                throw new Error("Element not found.");
            }
            elm = elm.parentElement;
        }
    }
    appendTo(_elem) {
        _elem.appendChild(this._view.element());
    }
    openFile(filename) {
        electron_1.ipcRenderer.send("file-readFile", filename);
    }
    handleFileReadError(event, err) {
        console.log(err);
    }
    dispose() {
        if (this._buffer_state) {
            this._buffer_state.dispose();
            this._buffer_state = null;
        }
        this._view.dispose();
        this._view = null;
    }
    get editorView() {
        return this._view.editorView;
    }
    get documentView() {
        return this._view.editorView.documentView;
    }
    get view() {
        return this._view;
    }
    get buffer() {
        return this._buffer_state;
    }
}
exports.MDE = MDE;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyL2NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsd0JBQ2lDLFVBQ2pDLENBQUMsQ0FEMEM7QUFDM0MsdUJBQWlELFNBQ2pELENBQUMsQ0FEeUQ7QUFDMUQsdUJBQWtFLFNBQ2xFLENBQUMsQ0FEMEU7QUFDM0UsMkJBQWtDLFVBQ2xDLENBQUMsQ0FEMkM7QUFDNUMsdUJBQTJELGNBQzNELENBQUMsQ0FEd0U7QUFDekUsTUFBTSxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsR0FBRyxpQkFBTSxDQUFBO0FBRy9CLE1BQU0sTUFBTSxHQUFHO0lBQ1gsU0FBUyxFQUFFLE9BQU87Q0FDckIsQ0FBQTtBQUVELE1BQU0sVUFBVSxHQUFHO0lBQ2YsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO0lBQ3hDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRTtJQUNyQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUU7Q0FDM0MsQ0FBQztBQUVGLElBQUksU0FBa0IsQ0FBQztBQUV2QjtJQUNJLEVBQUUsQ0FBQyxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQzFCLFNBQVMsR0FBRztZQUNSLG1CQUFZLENBQUMsV0FBQyxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDN0QsbUJBQVksQ0FBQyxXQUFDLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLEVBQUUsVUFBVSxDQUFDO1lBQzFELG1CQUFZLENBQUMsV0FBQyxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLEtBQUssQ0FBQztTQUN4RCxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNuQixDQUFD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Q0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM3QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUM5QixDQUFDO1FBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0lBRUQsSUFBSSxVQUFVO1FBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO0lBQ2pDLENBQUM7SUFFRCxJQUFJLFlBQVk7UUFDWixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDO0lBQzlDLENBQUM7SUFFRCxJQUFJLElBQUk7UUFDSixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUE7SUFDN0IsQ0FBQztBQUVMLENBQUM7QUF2VFksV0FBRyxNQXVUZixDQUFBIiwiZmlsZSI6ImNvbnRyb2xsZXIvY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
