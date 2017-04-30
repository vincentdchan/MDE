"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../model");
const view_1 = require("../view");
const util_1 = require("../util");
const configuration_1 = require("./configuration");
const electron_1 = require("electron");
const menu_1 = require("../view/menu");
const searchBox_1 = require("./searchBox");
const { Menu, MenuItem } = electron_1.remote;
const config = {
    "version": "0.1.2"
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
            util_1.StringFormat(util_1.i18n.getString("about.releaseDate"), "2017/5/1"),
            util_1.StringFormat(util_1.i18n.getString("about.nodeVersion"), process.version),
        ].join("\n\r");
    }
    return _aboutMsg;
}
class MDE {
    constructor() {
        this._buffers = [];
        this._view = null;
        this._config = configuration_1.configurationThunk(this);
        model_1.ConfigurationUtil.loadConfigFromDefaultPath(this._config);
        util_1.i18n.InitializeI18n(this._config['general'].items['language'].value);
        model_1.ConfigurationUtil.completeLabel(this._config);
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
        this._view.configView.bind(this._config);
        this._view.configView.onTabItemChanged((e) => {
            model_1.ConfigurationUtil.saveConfigToDefaultPath(this._config);
        });
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
                        let selectionManager = this._view.editorView.documentView.selectionManager, dataString;
                        if (selectionManager.length > 0 && !selectionManager.selectionAt(0).collapsed) {
                            let range = selectionManager.report(0);
                            dataString = this.textModel.report(range);
                        }
                        if (e.shiftKey) {
                            this.enableReplacePanel(dataString);
                        }
                        else {
                            this.enableSearchPanel(dataString);
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
        this.triggerOnStart();
    }
    triggerOnStart() {
        for (let tabName in this._config) {
            let configTab = this._config[tabName];
            for (let itemName in configTab.items) {
                let configItem = configTab.items[itemName];
                if (configItem.triggerOnStart) {
                    configItem.onChanged(configItem.value, null);
                }
            }
        }
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
            case menu_1.MenuButtonType.ExportHTML:
                this.handleExportHTML();
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
    handleExportHTML() {
        let data = this._view.previewView.HTMLContent;
        util_1.Host.exportHTML(data);
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
            let currentPos, currentOffset, allContent = textModel.reportAll(), targetIndex;
            if (e.isNext) {
                currentPos = model_1.PositionUtil.clonePosition(this._view.editorView.documentView.selectionManager.selectionAt(0).endPosition);
                currentOffset = textModel.offsetAt(currentPos);
                let tail = allContent.slice(currentOffset);
                targetIndex = tail.indexOf(e.content);
            }
            else {
                currentPos = model_1.PositionUtil.clonePosition(this._view.editorView.documentView.selectionManager.selectionAt(0).beginPosition);
                currentOffset = textModel.offsetAt(currentPos);
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
                console.log(e.content, "not found");
            }
        }
    }
    handleReplace(e) {
        let textModel = this.textModel, allContent = textModel.reportAll(), selectionManager = this._view.editorView.documentView.selectionManager;
        selectionManager.clearAll();
        if (e.isAll) {
            let result = allContent.replace(new RegExp(e.sourceContent, "g"), e.targetContent);
            let textEdit = new model_1.TextEdit(model_1.TextEditType.ReplaceText, {
                begin: textModel.beginPosition,
                end: textModel.endPosition
            }, result);
            this._view.editorView.documentView.applyTextEdit(textEdit);
        }
        else {
            let begin_index = allContent.indexOf(e.sourceContent), end_index = begin_index + e.sourceContent.length;
            if (begin_index > 0) {
                let begin_pos = textModel.positionAt(begin_index), end_pos = textModel.positionAt(end_index);
                let textEdit = new model_1.TextEdit(model_1.TextEditType.ReplaceText, {
                    begin: begin_pos,
                    end: end_pos,
                }, e.targetContent);
                this._view.editorView.documentView.applyTextEdit(textEdit);
                setTimeout(() => {
                    selectionManager.beginSelect(begin_pos);
                    selectionManager.moveCursorTo(textModel.positionAt(begin_index + e.targetContent.length));
                    selectionManager.endSelecting();
                    selectionManager.focus();
                }, 10);
            }
            else {
                console.log(e.sourceContent, "not found.");
            }
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyL2NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLG9DQUNvRztBQUNwRyxrQ0FBMEQ7QUFDMUQsa0NBQTJFO0FBQzNFLG1EQUFrRDtBQUNsRCx1Q0FBbUQ7QUFDbkQsdUNBQXlFO0FBQ3pFLDJDQUFnRTtBQUNoRSxNQUFNLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxHQUFHLGlCQUFNLENBQUE7QUFHL0IsTUFBTSxNQUFNLEdBQUc7SUFDWCxTQUFTLEVBQUUsT0FBTztDQUNyQixDQUFBO0FBRUQsTUFBTSxVQUFVLEdBQUc7SUFDZixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7SUFDeEMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFO0lBQ3JDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRTtDQUMzQyxDQUFDO0FBRUYsSUFBSSxTQUFrQixDQUFDO0FBRXZCO0lBQ0ksRUFBRSxDQUFDLENBQUMsU0FBUyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsU0FBUyxHQUFHO1lBQ1IsbUJBQVksQ0FBQyxXQUFDLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM3RCxtQkFBWSxDQUFDLFdBQUMsQ0FBQyxTQUFTLENBQUMsbUJBQW1CLENBQUMsRUFBRSxVQUFVLENBQUM7WUFDMUQsbUJBQVksQ0FBQyxXQUFDLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQztTQUNsRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBQ0QsTUFBTSxDQUFDLFNBQVMsQ0FBQztBQUNyQixDQUFDO0FBT0Q7SUFnQkk7UUFkUSxhQUFRLEdBQWdCLEVBQUUsQ0FBQztRQVEzQixVQUFLLEdBQWUsSUFBSSxDQUFDO1FBTzdCLElBQUksQ0FBQyxPQUFPLEdBQUcsa0NBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEMseUJBQWlCLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTFELFdBQUMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEUseUJBQWlCLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUU5QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQW1CO1lBQzNDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFFaEMsSUFBSSxJQUFJLEdBQUcsaUJBQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQy9CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxtQkFBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxhQUFhLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztRQUNwRCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksbUJBQVcsRUFBRSxDQUFDO1FBQzNDLENBQUM7UUFFRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksaUJBQVUsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztZQUNyQyx5QkFBaUIsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUQsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsVUFBVSxHQUFHLHFCQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBYTtZQUNoRSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDaEUsQ0FBQyxDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFOUQsTUFBTSxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQVE7WUFDN0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUVoQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBRXBDLE1BQU0sQ0FBQSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQ1osS0FBSyxDQUFDO3dCQUNGLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQzt3QkFDcEMsS0FBSyxDQUFDO29CQUNWLEtBQUssQ0FBQzt3QkFDRixLQUFLLENBQUM7b0JBQ1YsS0FBSyxDQUFDO3dCQUNGLENBQUMsQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO3dCQUN0QixLQUFLLENBQUM7Z0JBQ2QsQ0FBQztZQUVMLENBQUM7UUFDTCxDQUFDLENBQUM7UUFFRixJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFnQjtZQUV0QyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDWixNQUFNLENBQUEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDZixLQUFLLGNBQU8sQ0FBQyxFQUFFO3dCQUNYLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLGdCQUFnQixFQUN0RSxVQUFrQixDQUFDO3dCQUN2QixFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7NEJBQzVFLElBQUksS0FBSyxHQUFHLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDdkMsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUM5QyxDQUFDO3dCQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOzRCQUNiLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQzt3QkFDeEMsQ0FBQzt3QkFBQyxJQUFJLENBQUMsQ0FBQzs0QkFDSixJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUM7d0JBQ3ZDLENBQUM7d0JBQ0QsS0FBSyxDQUFDO29CQUNWLEtBQUssY0FBTyxDQUFDLEVBQUU7d0JBQ1gsSUFBSSxDQUFDOzRCQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDO2dDQUM5QixJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO3dCQUN4QyxDQUFDO3dCQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDbkIsQ0FBQzt3QkFDRCxLQUFLLENBQUM7Z0JBQ2QsQ0FBQztZQUNMLENBQUM7UUFFTCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBU08sY0FBYztRQUNsQixHQUFHLENBQUMsQ0FBQyxJQUFJLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUMvQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRXRDLEdBQUcsQ0FBQyxDQUFDLElBQUksUUFBUSxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLFVBQVUsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUUzQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztvQkFDNUIsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNqRCxDQUFDO1lBQ0wsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0lBRU8sWUFBWSxDQUFDLE1BQW1CO1FBQ3BDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7UUFFNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVPLGlCQUFpQixDQUFDLFVBQW1CO1FBQ3pDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUMvQixFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsR0FBRyxVQUFVLENBQUM7UUFDcEQsQ0FBQztRQUNELElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFTyxrQkFBa0IsQ0FBQyxVQUFtQjtRQUMxQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDL0IsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNiLElBQUksQ0FBQyxVQUFVLENBQUMsa0JBQWtCLEdBQUcsVUFBVSxDQUFDO1FBQ3BELENBQUM7UUFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBS08sZUFBZSxDQUFDLEdBQW1CO1FBQ3ZDLE1BQU0sQ0FBQSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLEtBQUsscUJBQWMsQ0FBQyxPQUFPO2dCQUN2QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3JCLEtBQUssQ0FBQztZQUNWLEtBQUsscUJBQWMsQ0FBQyxRQUFRO2dCQUN4QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3RCLEtBQUssQ0FBQztZQUNWLEtBQUsscUJBQWMsQ0FBQyxJQUFJO2dCQUNwQixJQUFJLENBQUM7b0JBQ0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDcEMsQ0FBQztnQkFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLENBQUM7Z0JBQ0QsS0FBSyxDQUFDO1lBQ1YsS0FBSyxxQkFBYyxDQUFDLE1BQU07Z0JBQ3RCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDbEMsS0FBSyxDQUFDO1lBQ1YsS0FBSyxxQkFBYyxDQUFDLFVBQVU7Z0JBQzFCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2dCQUN4QixLQUFLLENBQUM7WUFDVixLQUFLLHFCQUFjLENBQUMsVUFBVTtnQkFDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQy9CLEtBQUssQ0FBQztZQUNWLEtBQUsscUJBQWMsQ0FBQyxZQUFZO2dCQUM1QixXQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQ3BCLEtBQUssQ0FBQztZQUNWLEtBQUsscUJBQWMsQ0FBQyxJQUFJO2dCQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDN0IsS0FBSyxDQUFDO1lBQ1YsS0FBSyxxQkFBYyxDQUFDLElBQUk7Z0JBQ3BCLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUM3QixLQUFLLENBQUM7WUFDVixLQUFLLHFCQUFjLENBQUMsVUFBVTtnQkFDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEdBQUcsaUJBQWlCLENBQUE7Z0JBQzVDLEtBQUssQ0FBQztZQUNWLEtBQUsscUJBQWMsQ0FBQyxVQUFVO2dCQUMxQixJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsR0FBRyxpQkFBaUIsQ0FBQTtnQkFDNUMsS0FBSyxDQUFDO1lBQ1YsS0FBSyxxQkFBYyxDQUFDLElBQUk7Z0JBQ3BCLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUN4QyxLQUFLLENBQUM7WUFDVixLQUFLLHFCQUFjLENBQUMsS0FBSztnQkFDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ3hDLEtBQUssQ0FBQztZQUNWLEtBQUsscUJBQWMsQ0FBQyxHQUFHO2dCQUNuQixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdkMsS0FBSyxDQUFDO1lBQ1YsS0FBSyxxQkFBYyxDQUFDLE1BQU07Z0JBQ3RCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2dCQUN6QixLQUFLLENBQUM7WUFDVixLQUFLLHFCQUFjLENBQUMsT0FBTztnQkFDdkIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7Z0JBQzFCLEtBQUssQ0FBQztZQUNWLEtBQUsscUJBQWMsQ0FBQyxNQUFNO2dCQUN0QixXQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2QsS0FBSyxDQUFDO1lBQ1YsS0FBSyxxQkFBYyxDQUFDLGFBQWE7Z0JBQzdCLGdCQUFLLENBQUMsWUFBWSxDQUFDLDBCQUEwQixDQUFDLENBQUE7Z0JBQzlDLEtBQUssQ0FBQztZQUNWLEtBQUsscUJBQWMsQ0FBQyxLQUFLO2dCQUNyQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDeEIsS0FBSyxDQUFDO1FBQ2QsQ0FBQztJQUNMLENBQUM7SUFFTyxnQkFBZ0I7UUFDcEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDO1FBQzlDLFdBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVPLGdCQUFnQjtRQUNwQixpQkFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsaUJBQU0sQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFO1lBQ3BELElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLHFCQUFxQixFQUFFO1lBQ2hDLE9BQU8sRUFBRSxDQUFDLFdBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDL0IsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVhLGFBQWE7O1lBQ3ZCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxFQUFFLEdBQUcsTUFBTSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBRXRDLE1BQU0sQ0FBQSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ1IsS0FBSyxDQUFDO3dCQUNGLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDMUMsS0FBSyxDQUFDO3dCQUNGLElBQUksU0FBUyxHQUFHLElBQUksbUJBQVcsRUFBRSxDQUFDO3dCQUNsQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUM3QixLQUFLLENBQUM7b0JBQ1YsS0FBSyxDQUFDO3dCQUNGLEtBQUssQ0FBQztnQkFDZCxDQUFDO1lBQ0wsQ0FBQztRQUNMLENBQUM7S0FBQTtJQUVPLFlBQVksQ0FBQyxDQUFjO1FBQy9CLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDL0IsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUM7UUFFM0UsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsSUFBSSxVQUFvQixFQUNwQixhQUFxQixFQUNyQixVQUFVLEdBQVcsU0FBUyxDQUFDLFNBQVMsRUFBRSxFQUMxQyxXQUFtQixDQUFDO1lBRXhCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNYLFVBQVUsR0FBRyxvQkFBWSxDQUFDLGFBQWEsQ0FDbkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDcEYsYUFBYSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQy9DLElBQUksSUFBSSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQzNDLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMxQyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osVUFBVSxHQUFHLG9CQUFZLENBQUMsYUFBYSxDQUNuQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUN0RixhQUFhLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxJQUFJLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUM7Z0JBQzlDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM5QyxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLElBQUksY0FBd0IsRUFDeEIsWUFBc0IsQ0FBQztnQkFFM0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQ1gsY0FBYyxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQzt3QkFDbEUsWUFBWSxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUMsYUFBYSxHQUFHLFdBQVcsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN4RixDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLGNBQWMsR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQzt3QkFDbEQsWUFBWSxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3hFLENBQUM7Z0JBRUQsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQzVCLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDN0MsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUM1QyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDaEMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDN0IsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztZQUN4QyxDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFFTyxhQUFhLENBQUMsQ0FBZTtRQUNqQyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUMxQixVQUFVLEdBQUcsU0FBUyxDQUFDLFNBQVMsRUFBRSxFQUNsQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUM7UUFFM0UsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFNUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFFVixJQUFJLE1BQU0sR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ25GLElBQUksUUFBUSxHQUFHLElBQUksZ0JBQVEsQ0FBQyxvQkFBWSxDQUFDLFdBQVcsRUFBRTtnQkFDbEQsS0FBSyxFQUFFLFNBQVMsQ0FBQyxhQUFhO2dCQUM5QixHQUFHLEVBQUUsU0FBUyxDQUFDLFdBQVc7YUFDN0IsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUVYLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0QsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBRUosSUFBSSxXQUFXLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLEVBQ2pELFNBQVMsR0FBRyxXQUFXLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7WUFFckQsRUFBRSxDQUFDLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLElBQUksU0FBUyxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEVBQzdDLE9BQU8sR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUU5QyxJQUFJLFFBQVEsR0FBRyxJQUFJLGdCQUFRLENBQUMsb0JBQVksQ0FBQyxXQUFXLEVBQUU7b0JBQ2xELEtBQUssRUFBRSxTQUFTO29CQUNoQixHQUFHLEVBQUUsT0FBTztpQkFDZixFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFFcEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFFM0QsVUFBVSxDQUFDO29CQUNQLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDeEMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDMUYsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLENBQUM7b0JBQ2hDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUM3QixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDWCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsYUFBYSxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQy9DLENBQUM7UUFFTCxDQUFDO0lBRUwsQ0FBQztJQU1PLGVBQWU7UUFFbkIsSUFBSSxFQUFFLEdBQUcsaUJBQU0sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDO1lBQ2xDLE9BQU8sRUFBRSxDQUFDLFdBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsV0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRSxXQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzdFLEtBQUssRUFBRSxXQUFDLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQztZQUNqQyxPQUFPLEVBQUUsbUJBQVksQ0FBQyxXQUFDLENBQUMsU0FBUyxDQUFDLHFCQUFxQixDQUFDLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7U0FDekYsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFYSxjQUFjOztZQUN4QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDdEQsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUNwQyxNQUFNLENBQUEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUNaLEtBQUssQ0FBQzt3QkFDRixJQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLENBQUM7d0JBQ3BDLEtBQUssQ0FBQztvQkFDVixLQUFLLENBQUM7d0JBQ0YsS0FBSyxDQUFDO29CQUNWLEtBQUssQ0FBQzt3QkFDRixNQUFNLENBQUM7Z0JBQ2YsQ0FBQztZQUNMLENBQUM7WUFDRCxJQUFJLFNBQVMsR0FBYSxpQkFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsaUJBQU0sQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFO2dCQUM5RSxLQUFLLEVBQUUsV0FBVztnQkFDbEIsT0FBTyxFQUFFO29CQUNMLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDeEMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsRUFBRTtvQkFDN0MsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFO2lCQUN4QzthQUNKLENBQUMsQ0FBQztZQUNILEVBQUUsQ0FBQyxDQUFDLFNBQVMsS0FBSyxTQUFTLElBQUksU0FBUyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2hELE1BQU0sSUFBSSxLQUFLLENBQUMsNENBQTRDLENBQUMsQ0FBQztZQUNsRSxDQUFDO1lBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUIsSUFBSSxRQUFRLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUU1QixJQUFJLFNBQVMsR0FBRyxJQUFJLG1CQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzFDLE1BQU0sU0FBUyxDQUFDLHNCQUFzQixFQUFFLENBQUM7Z0JBRXpDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDakMsQ0FBQztRQUNMLENBQUM7S0FBQTtJQUVhLGNBQWMsQ0FBQyxXQUFXOztZQUVwQyxJQUFJLElBQVksQ0FBQztZQUNqQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDbkMsSUFBSSxLQUFLLEdBQUcsTUFBTSxXQUFJLENBQUMsY0FBYyxDQUFDO29CQUNsQyxLQUFLLEVBQUUsTUFBTTtvQkFDYixPQUFPLEVBQUUsV0FBVztpQkFDdkIsQ0FBQyxDQUFDO2dCQUVILEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ1IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO2dCQUM1QyxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQ3JDLENBQUM7WUFDTCxDQUFDO1lBRUQsSUFBSSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUNwRCxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FDbEMsQ0FBQztRQUVOLENBQUM7S0FBQTtJQUVPLGtCQUFrQixDQUFDLFdBQVc7UUFFbEMsSUFBSSxJQUFZLENBQUM7UUFDakIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDbkMsSUFBSSxLQUFLLEdBQUcsaUJBQU0sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDO2dCQUNyQyxLQUFLLEVBQUUsTUFBTTtnQkFDYixPQUFPLEVBQUUsV0FBVzthQUN2QixDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNSLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUM1QyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osTUFBTSxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNyQyxDQUFDO1FBQ0wsQ0FBQztRQUVELElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsc0JBQXNCLENBQ2xELElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUNsQyxDQUFDO0lBRU4sQ0FBQztJQUVhLGdCQUFnQixDQUFDLFdBQVc7O1lBRXRDLElBQUksS0FBSyxHQUFHLE1BQU0sV0FBSSxDQUFDLGNBQWMsQ0FBQztnQkFDbEMsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsT0FBTyxFQUFFLFdBQVc7YUFDdkIsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDUixJQUFJLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2hFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO2dCQUM1QyxDQUFDO1lBQ0wsQ0FBQztRQUVMLENBQUM7S0FBQTtJQUVPLGdCQUFnQixDQUFDLElBQVU7UUFDL0IsSUFBSSxHQUFHLEdBQWdCLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDMUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztZQUNWLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEMsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUNmLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixNQUFNLElBQUksS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDMUMsQ0FBQztZQUNELEdBQUcsR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDO1FBQzVCLENBQUM7SUFDTCxDQUFDO0lBRUQsUUFBUSxDQUFDLEtBQWtCO1FBQ3ZCLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxRQUFRLENBQUMsUUFBZ0I7UUFDckIsc0JBQVcsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxLQUFnQyxFQUFFLEdBQTBCO1FBQzVFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVELE9BQU87UUFDSCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzdCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzlCLENBQUM7UUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUFJLFNBQVM7UUFDVCxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7SUFDcEMsQ0FBQztJQUVELElBQUksVUFBVTtRQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztJQUNqQyxDQUFDO0lBRUQsSUFBSSxZQUFZO1FBQ1osTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQztJQUM5QyxDQUFDO0lBRUQsSUFBSSxJQUFJO1FBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQUksTUFBTTtRQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFBO0lBQzdCLENBQUM7Q0FFSjtBQXRmRCxrQkFzZkMiLCJmaWxlIjoiY29udHJvbGxlci9jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
