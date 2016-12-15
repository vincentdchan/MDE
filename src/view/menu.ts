import {remote} from "electron"
const {Menu, MenuItem} = remote
import {MDE} from "../controller"
import {EventEmitter} from "events"
import * as Electron from "electron"

export enum MenuButtonType {
    NewFile, OpenFile, Save, SaveAs, Preference,
    Exit, Undo, Redo, Cut, Copy, Paste, SelectAll,
    OpenDevTools, Reload, Documentation, About,
}

export class MenuClickEvent extends Event {

    private _type: MenuButtonType

    constructor(buttonType: MenuButtonType) {
        super("menuClick");

        this._type = buttonType;
    }

    get buttonType() {
        return this._type;
    }

}

export class MainMenuView extends EventEmitter {

    private _menu: Electron.Menu;

    constructor() {
        super();

        let options: Electron.MenuItemOptions[] = [
            {
                label: "File",
                submenu: [
                    {
                        label: "New File",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.NewFile) }
                    },
                    {
                        type: "separator",
                    },
                    {
                        label: "Open",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.OpenFile) }
                    },
                    {
                        label: "Save",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Save) }
                    },
                    {
                        label: "Save as",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.SaveAs) }
                    },
                    {
                        label: "Preference",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Preference) }
                    },
                    {
                        type: "separator"
                    },
                    {
                        label: "Exit",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Exit) }
                    }
                ]
            },
            {
                label: "Edit",
                submenu: [
                    {
                        role: "undo",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Undo) }
                    },
                    {
                        role: "redo",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Redo) }
                    },
                    {
                        type: "separator"
                    }, 
                    {
                        role: "cut",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Cut) }
                    },
                    {
                        role: "copy",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Copy) }
                    },
                    {
                        role: "paste",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Paste) }
                    },
                    {
                        role: "selectall",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.SelectAll) }
                    },
                ]
            },
            {
                label: "View",
                submenu: [
                    {
                        label: "Open dev tools",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.OpenDevTools) }
                    },
                    {
                        label: "Reload",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Reload) }
                    }
                ]
            },
            {
                label: "Help",
                submenu: [
                    {
                        label: "Documentation",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Documentation) }
                    },
                    {
                        type: "separator"
                    },
                    {
                        label: "About",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.About) }
                    }
                ]
            }
        ]

        this._menu = Menu.buildFromTemplate(options);

    }

    private emitMenuClickEvent(_type: MenuButtonType) {
        let evt = new MenuClickEvent(_type);
        this.emit("menuClick", evt);
    }

    setApplicationMenu() {
        Menu.setApplicationMenu(this._menu);
    }

    get electronMenu() {
        return this._menu;
    }

}
