"use strict";
const electron_1 = require("electron");
const { Menu, MenuItem } = electron_1.remote;
const events_1 = require("events");
(function (MenuButtonType) {
    MenuButtonType[MenuButtonType["NewFile"] = 0] = "NewFile";
    MenuButtonType[MenuButtonType["OpenFile"] = 1] = "OpenFile";
    MenuButtonType[MenuButtonType["Save"] = 2] = "Save";
    MenuButtonType[MenuButtonType["SaveAs"] = 3] = "SaveAs";
    MenuButtonType[MenuButtonType["Preference"] = 4] = "Preference";
    MenuButtonType[MenuButtonType["Exit"] = 5] = "Exit";
    MenuButtonType[MenuButtonType["Undo"] = 6] = "Undo";
    MenuButtonType[MenuButtonType["Redo"] = 7] = "Redo";
    MenuButtonType[MenuButtonType["Cut"] = 8] = "Cut";
    MenuButtonType[MenuButtonType["Copy"] = 9] = "Copy";
    MenuButtonType[MenuButtonType["Paste"] = 10] = "Paste";
    MenuButtonType[MenuButtonType["SelectAll"] = 11] = "SelectAll";
    MenuButtonType[MenuButtonType["OpenDevTools"] = 12] = "OpenDevTools";
    MenuButtonType[MenuButtonType["Reload"] = 13] = "Reload";
    MenuButtonType[MenuButtonType["Documentation"] = 14] = "Documentation";
    MenuButtonType[MenuButtonType["About"] = 15] = "About";
})(exports.MenuButtonType || (exports.MenuButtonType = {}));
var MenuButtonType = exports.MenuButtonType;
class MenuClickEvent extends Event {
    constructor(buttonType) {
        super("menuClick");
        this._type = buttonType;
    }
    get buttonType() {
        return this._type;
    }
}
exports.MenuClickEvent = MenuClickEvent;
class MainMenuView extends events_1.EventEmitter {
    constructor() {
        super();
        let options = [
            {
                label: "File",
                submenu: [
                    {
                        label: "New File",
                        accelerator: "Ctrl+N",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.NewFile); }
                    },
                    {
                        type: "separator",
                    },
                    {
                        label: "Open",
                        accelerator: "Ctrl+O",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.OpenFile); }
                    },
                    {
                        label: "Save",
                        accelerator: "Ctrl+S",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Save); }
                    },
                    {
                        label: "Save as",
                        accelerator: "Ctrl+Shift+S",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.SaveAs); }
                    },
                    {
                        label: "Preference",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Preference); }
                    },
                    {
                        type: "separator"
                    },
                    {
                        label: "Exit",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Exit); }
                    }
                ]
            },
            {
                label: "Edit",
                submenu: [
                    {
                        label: "Undo",
                        accelerator: "Ctrl+Z",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Undo); }
                    },
                    {
                        label: "Redo",
                        accelerator: "Ctrl+Shift+Z",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Redo); }
                    },
                    {
                        type: "separator"
                    },
                    {
                        label: "Cut",
                        accelerator: "Ctrl+X",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Cut); }
                    },
                    {
                        label: "Copy",
                        accelerator: "Ctrl+C",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Copy); }
                    },
                    {
                        label: "Paste",
                        accelerator: "Ctrl+V",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Paste); }
                    },
                    {
                        label: "Select All",
                        accelerator: "Ctrl+A",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.SelectAll); }
                    },
                ]
            },
            {
                label: "View",
                submenu: [
                    {
                        label: "Open dev tools",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.OpenDevTools); }
                    },
                    {
                        label: "Reload",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Reload); }
                    }
                ]
            },
            {
                label: "Help",
                submenu: [
                    {
                        label: "Documentation",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Documentation); }
                    },
                    {
                        type: "separator"
                    },
                    {
                        label: "About",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.About); }
                    }
                ]
            }
        ];
        this._menu = Menu.buildFromTemplate(options);
    }
    emitMenuClickEvent(_type) {
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
exports.MainMenuView = MainMenuView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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
