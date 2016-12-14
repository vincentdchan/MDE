import {TextModel, LineModel, TextEdit, TextEditType, 
    TextEditApplier, Position} from "../model"
import {EditorView, Coordinate, WindowView} from "../view"
import {IDisposable, Host} from "../util"
import {remote, ipcRenderer} from "electron"
import {MainMenuView, MenuClickEvent, MenuButtonType} from "../view/menu"
const {Menu, MenuItem} = remote
import * as Electron from "electron"

const SaveFilter = [
    { name: "Markdown", extensions: ["md"] },
    { name: "Text", extensions: ["txt"] },
    { name: "All Files", extensions: ["*"] }
];

export class MDE implements IDisposable, TextEditApplier {

    private _buffers: TextModel[] = [];
    private _current_buffer: number;

    private _model : TextModel = null;
    private _position: Position;
    private _menu: MainMenuView;
    private _view: WindowView = null;

    private _composition_start_pos : Position;
    private _composition_update_pos : Position;

    constructor(content? : string) {
        content = content? content : "";

        this._menu = new MainMenuView();
        this._menu.on("menuClick", (evt: MenuClickEvent) => {
            this.handleMenuClick(evt);
        });
        this._menu.setApplicationMenu();

        this._model = new TextModel(content);

        this._view = new WindowView();
        this._view.bind(this._model);

        ipcRenderer.on("file-readFile-error", this.handleFileReadError.bind(this));
        ipcRenderer.on("file-readFile-success", this.handleFileRead.bind(this));
    }

    reloadText(content: string) {
        this._model = new TextModel(content);

        this._view.unbind();
        this._view.bind(this._model);
    }

    private handleMenuClick(evt: MenuClickEvent) {
        switch(evt.buttonType) {
            case MenuButtonType.NewFile:
                break;
            case MenuButtonType.OpenFile:
                this.handleOpenFile();
                break;
            case MenuButtonType.Save:
                this.handleSaveFile(SaveFilter);
                break;
            case MenuButtonType.SaveAs:
                break;
            case MenuButtonType.Preference:
                break;
            case MenuButtonType.OpenDevTools:
                Host.openDevTools();
                break;
            case MenuButtonType.Reload:
                Host.reload();
                break;
        }
    }

    private async handleOpenFile() {
        let filenames: string[] = await Host.showOpenDialog({
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
            let content = await Host.readFile(filename, "UTF-8");

            this.reloadText(content);
        }
    }

    private async handleSaveFile(_saveFilter) {
        let filename = await Host.showOpenDialog({
            title: "Save File",
            filters: _saveFilter,
        });

        let content = this._model.reportAll();
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

    applyTextEdit(_textEdit: TextEdit): Position {
        let result = this._model.applyTextEdit(_textEdit);

        return result;
    }

    appendTo(_elem: HTMLElement) {
        _elem.appendChild(this._view.element());
    }

    openFile(filename: string) {
        ipcRenderer.send("file-readFile", filename);
    }

    handleFileRead(event: Electron.IpcRendererEvent, data: string) {
        this.reloadText(data);
    }

    handleFileReadError(event: Electron.IpcRendererEvent, err: NodeJS.ErrnoException) {
        console.log(err);
    }

    dispose() {
        this._model = null;
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

    get model() {
        return this._model;
    }

}
