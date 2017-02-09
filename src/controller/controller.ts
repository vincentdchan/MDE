import {TextModel, LineModel, TextEdit, TextEditType, 
     Position, PositionUtil, BufferState} from "../model"
import {EditorView, Coordinate, WindowView} from "../view"
import {IDisposable, Host, KeyCode, i18n as $, StringFormat} from "../util"
import {configurationThunk} from "./configuration"
import {shell, remote, ipcRenderer} from "electron"
import {MainMenuView, MenuClickEvent, MenuButtonType} from "../view/menu"
import {SearchBox, SearchEvent, ReplaceEvent} from "./searchBox"
const {Menu, MenuItem} = remote
import * as Electron from "electron"

const config = {
    "version": "0.0.3"
}

const SaveFilter = [
    { name: "Markdown", extensions: ["md"] },
    { name: "Text", extensions: ["txt"] },
    { name: "All Files", extensions: ["*"] }
];

let _aboutMsg : string;

function getAboutMessageString() : string {
    if (_aboutMsg === undefined) {
        _aboutMsg = [
            StringFormat($.getString("about.version"), config["version"]),
            StringFormat($.getString("about.releaseDate"), "2017/1/1"),
            StringFormat($.getString("about.nodeVersion"), "6.5"),
        ].join("\n\r");
    }
    return _aboutMsg;
}

export class MDE implements IDisposable {

    private _buffers: TextModel[] = [];
    private _current_buffer: number;

    private _buffer_state: BufferState;
    private _position: Position;
    private _menu: MainMenuView;
    private _view: WindowView = null;
    private _searchBox: SearchBox;

    private _composition_start_pos : Position;
    private _composition_update_pos : Position;

    constructor() {

        this._menu = new MainMenuView();
        this._menu.on("menuClick", (evt: MenuClickEvent) => {
            this.handleMenuClick(evt);
        });
        this._menu.setApplicationMenu();

        let argv = remote.process.argv;
        if (argv.length >= 2 && argv[1].endsWith(".md")) {
            this._buffer_state = new BufferState(argv[1]);
            this._buffer_state.readFileContentToModelSync();
        } else {
            this._buffer_state = new BufferState();
        }

        this._view = new WindowView();
        this._view.bind(this._buffer_state);
        this._view.configView.bind(configurationThunk(this));

        this._searchBox = SearchBox.GetOne();
        this._searchBox.closeButton.addEventListener("click", (e: MouseEvent) => {
            this._view.editorView.documentView.selectionManager.focus();
        })
        this._searchBox.onSearchEvent(this.handleSearch.bind(this));
        this._searchBox.onReplaceEvent(this.handleReplace.bind(this));

        window.onbeforeunload = (e: Event) => {
            if (this._buffer_state.isModified) {

                let result = this.confirmSaveFile();
                
                switch(result) {
                    case 0:
                        this.handleSyncSaveFile(SaveFilter);
                        break;
                    case 1:
                        break;
                    case 2:
                        e.returnValue = false;
                        break;
                }
                // let result = window.confirm(StringFormat($.getString("window.fileNotSaved"), this._buffer_state.filename));
            }
        };

        this._view.on("keydown", (e: KeyboardEvent) => {

            if (e.ctrlKey) {
                switch(e.keyCode) {
                    case KeyCode.$F:
                        this._searchBox.display = true;
                        if (e.shiftKey) {
                            this._searchBox.replaceInput.focus();
                        } else {
                            this._searchBox.searchInput.focus();
                        }
                        break;
                    case KeyCode.$S:
                        try {
                            if (this._buffer_state.isModified)
                                this.handleSaveFile(SaveFilter);
                        } catch (e) {
                            console.log(e);
                        }
                        break;
                }
            }

        });

    }

    private reloadBuffer(buffer: BufferState) {
        this._buffer_state.dispose();
        this._buffer_state = buffer;

        this._view.unbind();
        this._view.bind(this._buffer_state);
    }

    /**
     *  2016-12-15 Chen Xiao once said he is awesome
     */
    private handleMenuClick(evt: MenuClickEvent) {
        switch(evt.buttonType) {
            case MenuButtonType.NewFile:
                this.handleNewFile();
                break;
            case MenuButtonType.OpenFile:
                this.handleOpenFile();
                break;
            case MenuButtonType.Save:
                try {
                    this.handleSaveFile(SaveFilter);
                } catch (e) {
                    console.log(e);
                }
                break;
            case MenuButtonType.SaveAs:
                this.handleSaveAsFile(SaveFilter);
                break;
            case MenuButtonType.Preference:
                this._view.configView.toggle();
                break;
            case MenuButtonType.OpenDevTools:
                Host.openDevTools();
                break;
            case MenuButtonType.Redo:
                this._view.editorView.redo();
                break;
            case MenuButtonType.Undo:
                this._view.editorView.undo();
                break;
            case MenuButtonType.WhiteTheme:
                this._view.themeFilename = "white-theme.css"
                break;
            case MenuButtonType.BlackTheme:
                this._view.themeFilename = "black-theme.css"
                break;
            case MenuButtonType.Copy:
                this._view.editorView.copyToClipboard();
                break;
            case MenuButtonType.Paste:
                this._view.editorView.pasteToDocument();
                break;
            case MenuButtonType.Cut:
                this._view.editorView.cutToClipboard();
                break;
            case MenuButtonType.Reload:
                Host.reload();
                break;
            case MenuButtonType.Documentation:
                shell.openExternal("http://mde.diverse.space")
                break;
            case MenuButtonType.About:
                this.showAboutMessage();
                break;
        }
    }

    private showAboutMessage() {
        remote.dialog.showMessageBox(remote.getCurrentWindow(), {
            type: "info",
            message: getAboutMessageString(),
            buttons: [$.getString("ok")],
        });
    }

    private async handleNewFile() {
        if (this._buffer_state.isModified) {
            let id = await this.confirmSaveFile();

            switch(id) {
                case 0:
                    await this.handleSaveFile(SaveFilter);
                case 1:
                    let newBuffer = new BufferState();
                    this.reloadBuffer(newBuffer);
                    break;
                case 2:
                    break;
            }
        }
    }

    private handleSearch(e: SearchEvent) {
        let textModel = this.textModel;
        let selectionManager = this._view.editorView.documentView.selectionManager;

        if (selectionManager.length > 0) {
            let currentPos: Position = PositionUtil.clonePosition(
                this._view.editorView.documentView.selectionManager.selectionAt(0).endPosition);

            if (e.isNext) {
                let currentOffset: number = textModel.offsetAt(currentPos),
                    allContent: string = textModel.reportAll(),
                    tail = allContent.slice(currentOffset),
                    targetIndex = tail.indexOf(e.content);

                if (targetIndex >= 0) {
                    let targetBeginPos = textModel.positionAt(currentOffset + targetIndex),
                        targetEndPos = textModel.positionAt(currentOffset + targetIndex + e.content.length);

                    selectionManager.clearAll();
                    selectionManager.beginSelect(targetBeginPos);
                    selectionManager.moveCursorTo(targetEndPos);
                    selectionManager.endSelecting();
                } else {
                    console.log(e.content, "not found");
                }
            } else {
                throw new Error("Not implemented");
            }
        }
    }

    private handleReplace(e: ReplaceEvent) {

    }

    /**
      * @returns 0 for **save** file, 
      *         1 for **not save** file, 2 for **cancel**
      */
    private confirmSaveFile() : number {

        let id = remote.dialog.showMessageBox({
            buttons: [$.getString("save"), $.getString("notSave"), $.getString("cancel")],
            title: $.getString("window.name"),
            message: StringFormat($.getString("window.fileNotSaved"), this._buffer_state.filename),
        });

        return id;
    }

    private async handleOpenFile() {
        if (this._buffer_state && this._buffer_state.isModified) {
            let result = this.confirmSaveFile();
            switch(result) {
                case 0:
                    this.handleSyncSaveFile(SaveFilter);
                    break;
                case 1:
                    break;
                case 2:
                    return;
            }
        }
        let filenames: string[] = remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
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

            let newBuffer = new BufferState(filename);
            await newBuffer.readFileContentToModel();

            this.reloadBuffer(newBuffer);
        }
    }

    private async handleSaveFile(_saveFilter) {

        let path: string;
        if (!this._buffer_state.absolutePath) {
            let paths = await Host.showSaveDialog({
                title: "Save",
                filters: _saveFilter,
            });

            if (paths) {
                this._buffer_state.absolutePath = paths;
            } else {
                throw new Error("Illegal path.");
            }
        }

        let result = await this._buffer_state.writeContentToFile(
            this._buffer_state.absolutePath
        );

    }

    private handleSyncSaveFile(_saveFilter) {

        let path: string;
        if (!this._buffer_state.absolutePath) {
            let paths = remote.dialog.showSaveDialog({
                title: "Save",
                filters: _saveFilter,
            });

            if (paths) {
                this._buffer_state.absolutePath = paths;
            } else {
                throw new Error("Illegal path.");
            }
        }

        let result = this._buffer_state.syncWriteContentToFile(
            this._buffer_state.absolutePath
        );

    }

    private async handleSaveAsFile(_saveFilter) {

        let paths = await Host.showSaveDialog({
            title: "Save",
            filters: _saveFilter
        });

        if (paths) {
            let result = await this._buffer_state.writeContentToFile(paths);
            if (result) {
                this._buffer_state.absolutePath = paths;
            }
        } 

    }

    private findLineAncestor(node: Node) : HTMLElement {
        let elm: HTMLElement = node.parentElement;
        while (true) {
            if (elm.classList.contains("editor-line")) {
                return elm;
            } else if (elm === document.body) {
                throw new Error("Element not found.");
            }
            elm = elm.parentElement;
        }
    }

    appendTo(_elem: HTMLElement) {
        _elem.appendChild(this._view.element());
    }

    openFile(filename: string) {
        ipcRenderer.send("file-readFile", filename);
    }

    handleFileReadError(event: Electron.IpcRendererEvent, err: NodeJS.ErrnoException) {
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

    get textModel(): TextModel {
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
        return this._buffer_state
    }

}
