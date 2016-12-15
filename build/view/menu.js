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
                        click: () => { this.emitMenuClickEvent(MenuButtonType.NewFile); }
                    },
                    {
                        type: "separator",
                    },
                    {
                        label: "Open",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.OpenFile); }
                    },
                    {
                        label: "Save",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Save); }
                    },
                    {
                        label: "Save as",
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
                        role: "undo",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Undo); }
                    },
                    {
                        role: "redo",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Redo); }
                    },
                    {
                        type: "separator"
                    },
                    {
                        role: "cut",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Cut); }
                    },
                    {
                        role: "copy",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Copy); }
                    },
                    {
                        role: "paste",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Paste); }
                    },
                    {
                        role: "selectall",
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
