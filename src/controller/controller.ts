import {TextModel, LineModel, TextEdit, TextEditType, 
    TextEditApplier, Position} from "../model"
import {EditorView, Coordinate, WindowView} from "../view"
import {IDisposable} from "../util"
import {menuGenerator} from "./menu"
import {remote, ipcRenderer} from "electron"
const {Menu, MenuItem} = remote

export class MDE implements IDisposable, TextEditApplier {

    private _model : TextModel = null;
    private _position: Position;
    private _menu: Electron.Menu;
    private _view: WindowView = null;

    private _composition_start_pos : Position;
    private _composition_update_pos : Position;

    constructor(content? : string) {
        content = content? content : "";

        this._menu = menuGenerator(this);
        Menu.setApplicationMenu(this._menu);

        this._model = new TextModel(content);

        this._view = new WindowView(this._model);

        // this.documentView.addEventListener("click", this.handleClientEvent.bind(this));

        /*
        this.inputerView.addEventListener("keydown", (evt: KeyboardEvent) => {
            setTimeout(() => {
                this.handleInputerKeyDown(evt);
            }, 20);
        });
        */

        /*
        this.inputerView.addEventListener("compositionstart", 
            this.handleInputerCompositionStart.bind(this), false);
        this.inputerView.addEventListener("compositionend", 
            this.handleInputerCompositionEnd.bind(this), false);
        this.inputerView.addEventListener("compositionupdate", 
            this.handleInputerCompositionUpdate.bind(this), false);
            */

        ipcRenderer.on("file-readFile-error", this.handleFileReadError.bind(this));
        ipcRenderer.on("file-readFile-success", this.handleFileRead.bind(this));
    }

    reloadText(content: string) {
        this._model = new TextModel(content);
        this._view.reaload(this._model);
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
    private handleInputerCompositionStart(evt: Event) {
        this._composition_start_pos = clonePosition(this._position);
        this._composition_update_pos = clonePosition(this._position);
    }

    private handleInputerCompositionUpdate(evt: any) {
    }

    private handleInputerCompositionEnd(evt: any) {
        let updateData : string = evt.data;

        updateData = updateData.replace("\n", "");

        setTimeout(() => {
            this.inputerView.value = "";
        }, 5);

        this._position = clonePosition(this._composition_start_pos);
        this._position.offset += updateData.length
        this.updateCursor(this._position);
    }

    private isInputerCompositing() {
        return this.inputerView.isCompositioning();
    }

    private handleCompositionKeydown(evt: KeyboardEvent) {

        let updateData : string = this.inputerView.element().value;

        updateData = updateData.replace("\n", "");

        let textEdit = new TextEdit(TextEditType.ReplaceText, {
            begin: this._composition_start_pos,
            end: this._composition_update_pos,
        }, updateData);

        this.applyTextEdit(textEdit);

        this._composition_update_pos = clonePosition(this._composition_start_pos);
        this._composition_update_pos.offset += updateData.length

        this.updateCursor(this._composition_update_pos);

    }
    */

    applyTextEdit(_textEdit: TextEdit) {
        this._model.applyTextEdit(_textEdit);

        this._view.editorView.applyTextEdit(_textEdit);
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

    get inputerView() {
        return this._view.editorView.inputerView;
    }

    get cursorView() {
        return this._view.editorView.cursorView;
    }

    get view() {
        return this._view;
    }

    get model() {
        return this._model;
    }

}
