import {IDisposable, DomWrapper, KeyCode, i18n as $} from "../util"
import {TextModel, TextEditEvent, TextEdit} from "../model"
import * as marked  from "marked"
import * as Electron from "electron"
import {remote, clipboard, shell} from "electron"
import {Dom} from "typescript-domhelper"

/**
 * ## Update at v0.1.0
 * 
 *  - add `HTMLContent` property
 * 
 */
export class PreviewDocumentView extends DomWrapper.AbsoluteElement implements IDisposable {

    private _model: TextModel;
    private _HTMLContent: string;
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

        this._container = Dom.Div("mde-preview-document-container");
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

    /**
     * the container maybe very huge,
     * clear it.
     */ 
    unbind() {
        this._model = null;
        this._dom.removeChild(this._container);
    }

    renderImd() {
        let content = this._model.reportAll();
        this._HTMLContent = marked(content);
        this._container.innerHTML = this._HTMLContent;
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

    get HTMLContent() {
        return this._HTMLContent;
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
