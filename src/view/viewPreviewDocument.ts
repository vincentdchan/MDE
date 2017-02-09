import {IDisposable, DomHelper, KeyCode, i18n as $} from "../util"
import {TextModel, TextEditEvent, TextEdit} from "../model"
import * as marked  from "marked"
import * as Electron from "electron"
import {remote, clipboard, shell} from "electron"

export class PreviewDocumentView extends DomHelper.AbsoluteElement implements IDisposable {

    private _model: TextModel;
    private _container: HTMLDivElement;

    constructor()  {
        super("div", "mde-preview-document");

        this._dom.style.overflow = "scroll";

        this._dom.addEventListener("mouseup", (evt: MouseEvent) => {
            this.handleDocMouseUp(evt);
        }, false);

    }

    bind(model: TextModel) {
        this._model = model;

        this._container = DomHelper.Generic.elem<HTMLDivElement>("div", "mde-preview-document-container");
        this._dom.appendChild(this._container);
        this.renderImd();

        let elems = this._dom.getElementsByTagName("A");
        let arr = [...elems];
        arr.forEach((a: Element) => {
            a.addEventListener("click", (evt: Event) => {
                evt.preventDefault();

                let anchor = <HTMLAnchorElement>a;
                shell.openExternal(anchor.href);
            })
        })
    }

    ///
    /// the container maybe very huge,
    /// clear it.
    ///
    unbind() {
        this._model = null;
        this._dom.removeChild(this._container);
    }

    renderImd() {
        let content = this._model.reportAll();
        this._container.innerHTML = marked(content);
    }

    private handleDocMouseUp(evt: MouseEvent) {
        switch(evt.which) {
            case 3: 
                this.handleContextMenu(evt);
                return;
        }
    }

    private handleContextMenu(evt: MouseEvent) {
        evt.preventDefault();

        let options: Electron.MenuItemOptions[] = [
            {
                label: $.getString("contextmenu.copy"),
                accelerator: "Control+C",
                click: () => { this.copyToClipboard() }
            },
        ]

        let menu = remote.Menu.buildFromTemplate(options);

        menu.popup(remote.getCurrentWindow());
    }

    copyToClipboard() {
        let sel = window.getSelection();
        clipboard.writeText(sel.toString());
    }

    dispose() {
        if (this._model) {
            this.unbind();
        }
    }

}
