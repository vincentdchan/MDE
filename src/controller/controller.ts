import {TextModel, LineModel, TextEdit, TextEditType, 
     Position, BufferState} from "../model"
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

export class MDE implements IDisposable {

    private _buffers: TextModel[] = [];
    private _current_buffer: number;

    private _buffer_state: BufferState;
    private _position: Position;
    private _menu: MainMenuView;
    private _view: WindowView = null;

    private _composition_start_pos : Position;
    private _composition_update_pos : Position;

    constructor() {

        this._menu = new MainMenuView();
        this._menu.on("menuClick", (evt: MenuClickEvent) => {
            this.handleMenuClick(evt);
        });
        this._menu.setApplicationMenu();


        this._buffer_state = new BufferState();

        this._view = new WindowView();
        this._view.bind(this._buffer_state);

    }

    private reloadBuffer(buffer: BufferState) {
        this._buffer_state.dispose();
        this._buffer_state = buffer;

        this._view.unbind();
        this._view.bind(this._buffer_state);
    }

    private handleMenuClick(evt: MenuClickEvent) {
        switch(evt.buttonType) {
            case MenuButtonType.NewFile:
                this.handleNewFile();
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

    private handleNewFile() {
        let newBuffer = new BufferState();
        this.reloadBuffer(newBuffer);
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

            let newBuffer = new BufferState(filename);
            await newBuffer.readFileContentToModel();

            this.reloadBuffer(newBuffer);
        }
    }

    private async handleSaveFile(_saveFilter) {
        let filename = await Host.showOpenDialog({
            title: "Save File",
            filters: _saveFilter,
        });

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

    /*
    applyTextEdit(_textEdit: TextEdit): Position {
        let result = this._model.applyTextEdit(_textEdit);

        return result;
    }
    */

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
