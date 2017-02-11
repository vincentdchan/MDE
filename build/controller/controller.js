"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const model_1 = require("../model");
const view_1 = require("../view");
const util_1 = require("../util");
const configuration_1 = require("./configuration");
const electron_1 = require("electron");
const menu_1 = require("../view/menu");
const searchBox_1 = require("./searchBox");
const { Menu, MenuItem } = electron_1.remote;
const config = {
    "version": "0.0.3"
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
        let argv = electron_1.remote.process.argv;
        if (argv.length >= 2 && argv[1].endsWith(".md")) {
            this._buffer_state = new model_1.BufferState(argv[1]);
            this._buffer_state.readFileContentToModelSync();
        }
        else {
            this._buffer_state = new model_1.BufferState();
        }
        this._view = new view_1.WindowView();
        this._view.bind(this._buffer_state);
        this._view.configView.bind(configuration_1.configurationThunk(this));
        this._searchBox = searchBox_1.SearchBox.GetOne();
        this._searchBox.closeButton.addEventListener("click", (e) => {
            this._view.editorView.documentView.selectionManager.focus();
        });
        this._searchBox.onSearchEvent(this.handleSearch.bind(this));
        this._searchBox.onReplaceEvent(this.handleReplace.bind(this));
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
                    case util_1.KeyCode.$F:
                        if (e.shiftKey) {
                            this.enableReplacePanel();
                        }
                        else {
                            this.enableSearchPanel();
                        }
                        break;
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
    enableSearchPanel(searchData) {
        this._searchBox.display = true;
        if (searchData) {
            this._searchBox.searchInputContent = searchData;
        }
        this._searchBox.searchInput.focus();
    }
    enableReplacePanel(searchData) {
        this._searchBox.display = true;
        if (searchData) {
            this._searchBox.searchInputContent = searchData;
        }
        this._searchBox.replaceInput.focus();
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
                this._view.configView.toggle();
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
            case menu_1.MenuButtonType.Search:
                this.enableSearchPanel();
                break;
            case menu_1.MenuButtonType.Replace:
                this.enableReplacePanel();
                break;
            case menu_1.MenuButtonType.Reload:
                util_1.Host.reload();
                break;
            case menu_1.MenuButtonType.Documentation:
                electron_1.shell.openExternal("http://mde.diverse.space");
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
    handleSearch(e) {
        let textModel = this.textModel;
        let selectionManager = this._view.editorView.documentView.selectionManager;
        if (selectionManager.length > 0) {
            let currentPos = model_1.PositionUtil.clonePosition(this._view.editorView.documentView.selectionManager.selectionAt(0).endPosition), currentOffset = textModel.offsetAt(currentPos), allContent = textModel.reportAll(), targetIndex;
            if (e.isNext) {
                let tail = allContent.slice(currentOffset);
                targetIndex = tail.indexOf(e.content);
            }
            else {
                let head = allContent.slice(0, currentOffset);
                targetIndex = head.lastIndexOf(e.content);
            }
            if (targetIndex >= 0) {
                let targetBeginPos, targetEndPos;
                if (e.isNext) {
                    targetBeginPos = textModel.positionAt(currentOffset + targetIndex),
                        targetEndPos = textModel.positionAt(currentOffset + targetIndex + e.content.length);
                }
                else {
                    targetBeginPos = textModel.positionAt(targetIndex),
                        targetEndPos = textModel.positionAt(targetIndex + e.content.length);
                }
                selectionManager.clearAll();
                selectionManager.beginSelect(targetBeginPos);
                selectionManager.moveCursorTo(targetEndPos);
                selectionManager.endSelecting();
                selectionManager.focus();
            }
            else {
                console.log(e.content, " not found");
            }
        }
    }
    handleReplace(e) {
        let textModel = this.textModel, allContent = textModel.reportAll();
        if (e.isAll) {
            let result = allContent.replace(new RegExp(e.sourceContent, "g"), e.targetContent);
            let textEdit = new model_1.TextEdit(model_1.TextEditType.ReplaceText, {
                begin: textModel.beginPosition,
                end: textModel.endPosition
            }, result);
            this._view.editorView.documentView.applyTextEdit(textEdit);
        }
        else {
            let selectionManager = this._view.editorView.documentView.selectionManager;
            let begin_index = allContent.indexOf(e.sourceContent), end_index = begin_index + e.sourceContent.length;
            let begin_pos = textModel.positionAt(begin_index), end_pos = textModel.positionAt(end_index);
            let textEdit = new model_1.TextEdit(model_1.TextEditType.ReplaceText, {
                begin: begin_pos,
                end: end_pos,
            }, e.targetContent);
            this._view.editorView.documentView.applyTextEdit(textEdit);
            setTimeout(() => {
                selectionManager.clearAll();
                selectionManager.beginSelect(begin_pos);
                selectionManager.moveCursorTo(textModel.positionAt(begin_index + e.targetContent.length));
                selectionManager.endSelecting();
                selectionManager.focus();
            }, 10);
        }
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
    get textModel() {
        return this._buffer_state.model;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyL2NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsb0NBQ3lEO0FBQ3pELGtDQUEwRDtBQUMxRCxrQ0FBMkU7QUFDM0UsbURBQWtEO0FBQ2xELHVDQUFtRDtBQUNuRCx1Q0FBeUU7QUFDekUsMkNBQWdFO0FBQ2hFLE1BQU0sRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLEdBQUcsaUJBQU0sQ0FBQTtBQUcvQixNQUFNLE1BQU0sR0FBRztJQUNYLFNBQVMsRUFBRSxPQUFPO0NBQ3JCLENBQUE7QUFFRCxNQUFNLFVBQVUsR0FBRztJQUNmLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtJQUN4QyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUU7SUFDckMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFO0NBQzNDLENBQUM7QUFFRixJQUFJLFNBQWtCLENBQUM7QUFFdkI7SUFDSSxFQUFFLENBQUMsQ0FBQyxTQUFTLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztRQUMxQixTQUFTLEdBQUc7WUFDUixtQkFBWSxDQUFDLFdBQUMsQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzdELG1CQUFZLENBQUMsV0FBQyxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLFVBQVUsQ0FBQztZQUMxRCxtQkFBWSxDQUFDLFdBQUMsQ0FBQyxTQUFTLENBQUMsbUJBQW1CLENBQUMsRUFBRSxLQUFLLENBQUM7U0FDeEQsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUNELE1BQU0sQ0FBQyxTQUFTLENBQUM7QUFDckIsQ0FBQztBQUVEO0lBY0k7UUFaUSxhQUFRLEdB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QztZQUNyQixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzdCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzlCLENBQUM7UUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUFJLFNBQVM7UUFDVCxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7SUFDcEMsQ0FBQztJQUVELElBQUksVUFBVTtRQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztJQUNqQyxDQUFDO0lBRUQsSUFBSSxZQUFZO1FBQ1osTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQztJQUM5QyxDQUFDO0lBRUQsSUFBSSxJQUFJO1FBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQUksTUFBTTtRQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFBO0lBQzdCLENBQUM7Q0FFSjtBQTdiRCxrQkE2YkMiLCJmaWxlIjoiY29udHJvbGxlci9jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
