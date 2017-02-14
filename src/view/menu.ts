import {remote} from "electron"
const {Menu, MenuItem} = remote
import {MDE} from "../controller"
import {EventEmitter} from "events"
import * as Electron from "electron"
import {i18n as $} from "../util"

export enum MenuButtonType {
    NewFile, OpenFile, Save, SaveAs, Preference, ExportHTML,
    Exit, Undo, Redo, Cut, Copy, Paste, SelectAll, Search, Replace,
    OpenDevTools, Reload, Documentation, About, WhiteTheme, BlackTheme,
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

        this.buildMenu();
    }

    private buildMenu() {

        let options: Electron.MenuItemOptions[] = [
            {
                label: $.getString("file"),
                submenu: [
                    {
                        label: $.getString("file.newFile"),
                        accelerator: "Ctrl+N",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.NewFile) }
                    },
                    {
                        type: "separator",
                    },
                    {
                        label: $.getString("file.open"),
                        accelerator: "Ctrl+O",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.OpenFile) }
                    },
                    {
                        label: $.getString("file.save"),
                        accelerator: "Ctrl+S",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Save) }
                    },
                    {
                        label: $.getString("file.saveAs"),
                        accelerator: "Ctrl+Shift+S",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.SaveAs) }
                    },
                    {
                        label: $.getString("file.preference"),
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Preference) }
                    },
                    {
                        type: "separator"
                    },
                    {
                        label: $.getString("file.export"),
                        submenu: [
                            {
                                label: $.getString("file.export.HTML"),
                                click: () => { this.emitMenuClickEvent(MenuButtonType.ExportHTML) }
                            }
                        ]
                    },
                    {
                        type: "separator"
                    },
                    {
                        label: $.getString("file.exit"),
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Exit) }
                    }
                ]
            },
            {
                label: $.getString("edit"),
                submenu: [
                    {
                        label: $.getString("edit.undo"),
                        accelerator: "Ctrl+Z",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Undo) }
                    },
                    {
                        label: $.getString("edit.redo"),
                        accelerator: "Ctrl+Shift+Z",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Redo) }
                    },
                    {
                        type: "separator"
                    }, 
                    {
                        label: $.getString("edit.cut"),
                        accelerator: "Ctrl+X",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Cut) }
                    },
                    {
                        label: $.getString("edit.copy"),
                        accelerator: "Ctrl+C",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Copy) }
                    },
                    {
                        label: $.getString("edit.paste"),
                        accelerator: "Ctrl+V",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Paste) }
                    },
                    {
                        type: "separator"
                    }, 
                    {
                        label: $.getString("edit.search"),   
                        accelerator: "Ctrl+F",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Search) }
                    },
                    {
                        label: $.getString("edit.replace"),
                        accelerator: "Ctrl+Shift+F",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Replace) }
                    },
                    {
                        type: "separator"
                    }, 
                    {
                        label: $.getString("edit.selectAll"),
                        accelerator: "Ctrl+A",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.SelectAll) }
                    },
                ]
            },
            {
                label: $.getString("view"),
                submenu: [
                    {
                        label: $.getString("view.whiteTheme"),
                        click: () => { this.emitMenuClickEvent(MenuButtonType.WhiteTheme) },
                    },
                    {
                        label: $.getString("view.blackTheme"),
                        click: () => { this.emitMenuClickEvent(MenuButtonType.BlackTheme) }
                    },
                    {
                        type: "separator"
                    }, 
                    {
                        label: $.getString("view.openDevTools"),
                        click: () => { this.emitMenuClickEvent(MenuButtonType.OpenDevTools) }
                    },
                    {
                        label: $.getString("view.reload"),
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Reload) }
                    }
                ]
            },
            {
                label: $.getString("help"),
                submenu: [
                    {
                        label: $.getString("help.documentation"),
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Documentation) }
                    },
                    {
                        type: "separator"
                    },
                    {
                        label: $.getString("help.about"),
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
